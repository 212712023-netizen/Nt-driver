#!/usr/bin/env bash
set -euo pipefail

# Script to destroy nt-driver and nt-driver-db on Fly.io and help recreate them.
# Run in Git-Bash / WSL. This WILL REMOVE DATA. You will be asked to confirm with YES.

echo "*** AVISO: ISTO IRÁ DESTRUIR os apps 'nt-driver' e 'nt-driver-db' e PODERÁ APAGAR DADOS ***"
read -r -p "Digite YES para confirmar e continuar: " confirm
if [ "${confirm:-}" != "YES" ]; then
  echo "Aborted by user. No changes made."; exit 1
fi

# Ensure flyctl auth
if ! flyctl auth whoami >/dev/null 2>&1; then
  echo "Você não está autenticado. Rode: flyctl auth login"; exit 1
fi

echo "Destruindo app nt-driver..."
flyctl apps destroy nt-driver --yes || echo "Aviso: falha ao apagar nt-driver (talvez não exista)."

echo "Destruindo app nt-driver-db..."
flyctl apps destroy nt-driver-db --yes || echo "Aviso: falha ao apagar nt-driver-db (talvez não exista)."

# Try to delete volumes (best-effort)
if flyctl volumes list -a nt-driver-db >/dev/null 2>&1; then
  echo "Verificando volumes remanescentes para nt-driver-db..."
  flyctl volumes list -a nt-driver-db || true
  echo "Se existirem volumes listados, delete-os manualmente com: flyctl volumes delete <ID> -a nt-driver-db --yes"
else
  echo "Volumes check skipped (app pode ter sido removida)."
fi

echo "\n-- PASSO: criar novo Postgres gerenciado pelo Fly (interativo) --"
echo "O comando abaixo irá iniciar a criação do Postgres gerenciado. Siga as instruções do flyctl."
read -r -p "Pressione ENTER para executar 'flyctl postgres create --name nt-driver-db --region gru' (ou Ctrl+C para sair)" _

# Start interactive create (user may need to follow prompts)
flyctl postgres create --name nt-driver-db --region gru || {
  echo "Aviso: 'flyctl postgres create' retornou não-zero. Verifique manualmente e depois execute o script novamente a partir do ponto 'Criar usuário/db'.";
}

echo "\nA criação do Postgres foi iniciada. Aguarde até que a instância esteja pronta."
read -r -p "Quando a instância Postgres estiver criada e rodando, cole o DB machine ID (ex: e827943f0d3738) e pressione Enter: " DB_MACHINE_ID
if [ -z "$DB_MACHINE_ID" ]; then
  echo "Nenhum DB_MACHINE_ID informado. Saindo."; exit 1
fi

# Generate password and create user+db on the DB machine
pw=$(openssl rand -base64 15 | tr -d '=+/' | cut -c1-20)
echo "Gerada PASSWORD: $pw"
sql="CREATE USER appuser WITH PASSWORD '$pw'; CREATE DATABASE appdb OWNER appuser;"

echo "Executando comando SQL remoto para criar usuário e banco..."
# Use ssh console to avoid Windows quoting issues
flyctl ssh console -a nt-driver-db --machine "$DB_MACHINE_ID" --command "psql -U postgres -c \"$sql\""

# Testar conexão
echo "Testando conexão como appuser..."
flyctl ssh console -a nt-driver-db --machine "$DB_MACHINE_ID" --command "PGPASSWORD='$pw' psql -U appuser -h 127.0.0.1 -p 5433 -c '\\conninfo'"

# Atualizar secret na app nt-driver
echo "Atualizando SECRET DATABASE_URL na app nt-driver..."
DATABASE_URL="postgres://appuser:${pw}@${DB_MACHINE_ID}.vm.nt-driver-db.internal:5433/appdb?sslmode=disable"
flyctl secrets set DATABASE_URL="$DATABASE_URL" -a nt-driver || echo "Aviso: falha ao setar secret (app pode não existir ainda)."

# Criar e deploy da app nt-driver (usuário decide se quer automático)
read -r -p "Deseja criar e fazer deploy da app 'nt-driver' agora? (y/N): " deploy_now
if [[ "$deploy_now" =~ ^[Yy]$ ]]; then
  echo "Criando app nt-driver (se não existir) e deploy..."
  flyctl launch --name nt-driver --region gru --no-deploy || echo "Nota: flyctl launch retornou não-zero; app talvez já exista ou seja necessário deploy manual."
  flyctl deploy -a nt-driver || echo "Aviso: deploy retornou não-zero. Verifique logs com: flyctl logs -a nt-driver --no-tail"
fi

echo "Reiniciando máquinas da app nt-driver (se existir)..."
flyctl machines restart -a nt-driver || echo "Aviso: falha ao reiniciar máquinas da app (verifique se app existe)."

echo "Agora monitorar logs: flyctl logs -a nt-driver --no-tail"

echo "Concluído (script)."