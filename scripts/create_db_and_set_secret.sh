#!/usr/bin/env bash
set -euo pipefail

# Create appuser and appdb on the managed Postgres instance, set DATABASE_URL secret, restart app, show logs.
# Run in WSL / Git-Bash: bash scripts/create_db_and_set_secret.sh

if ! command -v flyctl >/dev/null 2>&1; then
  echo "flyctl not found in PATH"
  exit 1
fi

pw=$(openssl rand -base64 15 | tr -d '=+/' | cut -c1-20)
sql="CREATE USER appuser WITH PASSWORD '$pw'; CREATE DATABASE appdb OWNER appuser;"

# Prepare remote command as a single argument (avoid shell splitting)
remote_cmd="bash -lc \"psql -U postgres -c \\\"$sql\\\"\""

echo "Running remote SQL on machine e827943f0d3738 (nt-driver-db)..."
echo "Remote command: $remote_cmd"

# Execute remote command (pass it as one argument after --)
flyctl machine exec e827943f0d3738 -a nt-driver-db -- "$remote_cmd"

# Set DATABASE_URL secret (sslmode=disable because server reports no SSL)
dburl="postgres://appuser:${pw}@e827943f0d3738.vm.nt-driver-db.internal:5433/appdb?sslmode=disable"
echo "Setting secret DATABASE_URL=*** (password hidden)"
flyctl secrets set DATABASE_URL="$dburl" -a nt-driver

# Restart app and stream logs
echo "Restarting app machines for nt-driver..."
flyctl machines restart -a nt-driver

echo "Streaming logs (press Ctrl-C to stop)"
flyctl logs -a nt-driver --no-tail

# Print the password and DB URL at the end (for your records)
echo "\nDone. Created user appuser with password: $pw"
echo "DATABASE_URL: $dburl"
