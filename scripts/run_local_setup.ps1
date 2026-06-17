# Arquivo com comandos prontos para executar localmente no PowerShell
# Salve e execute no PowerShell: & 'C:\Users\souzi\Downloads\Nt driver-20260414T224639Z-3-001\Nt driver\scripts\run_local_setup.ps1'

Write-Output "Gerando comandos para criação de usuário DB e atualização do secret (sslmode=disable)..."
Write-Output "Copie/cole ou execute as linhas abaixo no PowerShell (tudo junto):"
Write-Output "--------------------- COMANDOS ---------------------"
Write-Output "$pw=([guid]::NewGuid().ToString('N')+[guid]::NewGuid().ToString('N')).Substring(0,20)"
Write-Output "$sql=\"CREATE USER appuser WITH PASSWORD '$pw'; CREATE DATABASE appdb OWNER appuser;\""
Write-Output "$remote=\"psql -U postgres -c `\"$sql`\"\""
Write-Output "flyctl machine exec e827943f0d3738 -a nt-driver-db -- $remote"
Write-Output "flyctl secrets set \"DATABASE_URL=postgres://appuser:$pw@e827943f0d3738.vm.nt-driver-db.internal:5433/appdb?sslmode=disable\" -a nt-driver"
Write-Output "flyctl machines restart -a nt-driver"
Write-Output "flyctl logs -a nt-driver --no-tail"
Write-Output "----------------------------------------------------"

Write-Output "Se preferir, rode o arquivo como script para mostrar os comandos em vez de copiar."