#!/usr/bin/env bash
set -euo pipefail

# Script para recriar Postgres gerenciado e redeploy da app
# Executar em Git-Bash / WSL. Uso interativo para seguir flyctl.

if ! flyctl auth whoami >/dev/null 2>&1; then
  echo "Você não está autenticado. Rode: flyctl auth login"; exit 1
fi

read -r -p "Criar Postgres gerenciado 'nt-driver-db' agora? (YES to continue): " c
if [ "${c:-}" != "YES" ]; then echo "Aborted"; exit 1; fi

flyctl postgres create --name nt-driver-db --region gru

echo "Aguardando máquina Postgres ficar disponível..."
# aguarda até encontrar uma machine started
for i in {1..60}; do
  id=$(flyctl machines list -a nt-driver-db --format "{{.ID}} {{.State}}" | awk '/started/ {print $1; exit}') || true
  if [ -n "$id" ]; then
    echo "Encontrado DB_MACHINE_ID: $id"; break
  fi
  sleep 3
done

if [ -z "${id:-}" ]; then
  echo "Não foi possível localizar DB machine em estado started. Verifique manualmente."; exit 1
fi

# gerar senha
pw=$(openssl rand -base64 15 | tr -d '=+/' | cut -c1-20)
echo "Gerada PASSWORD: $pw"

# criar user e db via ssh console non-interactive
create_sql="CREATE USER appuser WITH PASSWORD '$pw'; CREATE DATABASE appdb OWNER appuser;"

# usa ssh console --command para executar o SQL
flyctl ssh console -a nt-driver-db --machine "$id" --command "psql -U postgres -c \"$create_sql\""

# testar conexão
flyctl ssh console -a nt-driver-db --machine "$id" --command "PGPASSWORD='$pw' psql -U appuser -h 127.0.0.1 -p 5433 -c '\\conninfo'"

# criar app nt-driver (se não existir) e deploy
read -r -p "Fazer deploy da app nt-driver agora? (y/N): " deploy_now
if [[ "$deploy_now" =~ ^[Yy]$ ]]; then
  flyctl launch --name nt-driver --region gru --no-deploy || true
  flyctl deploy -a nt-driver || echo "Deploy retornou não-zero. Verifique logs: flyctl logs -a nt-driver --no-tail"
fi

# setar secret
DATABASE_URL="postgres://appuser:${pw}@${id}.vm.nt-driver-db.internal:5433/appdb?sslmode=disable"
flyctl secrets set DATABASE_URL="$DATABASE_URL" -a nt-driver || echo "Aviso: falha ao setar secret (app pode não existir)."

# reiniciar app
flyctl machines restart -a nt-driver || echo "Aviso: falha ao reiniciar máquinas da app. Verifique manualmente."

echo "Concluído. Monitorar logs: flyctl logs -a nt-driver --no-tail"
