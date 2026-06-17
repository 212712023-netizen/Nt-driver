#!/usr/bin/env bash
set -euo pipefail

# Limpa recursos Fly.io: apaga apps e mostra volumes para remoção manual
# Use em Git-Bash / WSL. CONFIRMAÇÃO obrigatória.

echo "*** AVISO: ISTO IRÁ DESTRUIR os apps 'nt-driver' e 'nt-driver-db' e PODERÁ APAGAR DADOS ***"
read -r -p "Digite YES para confirmar e continuar: " confirm
if [ "${confirm:-}" != "YES" ]; then
  echo "Aborted by user. No changes made."; exit 1
fi

# Verifica autenticação
if ! flyctl auth whoami >/dev/null 2>&1; then
  echo "Você não está autenticado. Rode: flyctl auth login"; exit 1
fi

echo "Apagando app: nt-driver (se existir)"
flyctl apps destroy nt-driver --yes || echo "Aviso: nt-driver não foi encontrado ou já foi removido."

echo "Apagando app: nt-driver-db (se existir)"
flyctl apps destroy nt-driver-db --yes || echo "Aviso: nt-driver-db não foi encontrado ou já foi removido."

# Verifica volumes remanescentes (best-effort)
echo "Listando volumes do nt-driver-db (se houver):"
flyctl volumes list -a nt-driver-db || true

echo "Se volumes aparecerem, delete-os manualmente com: flyctl volumes delete <VOLUME-ID> -a nt-driver-db --yes"

echo "Concluído."
