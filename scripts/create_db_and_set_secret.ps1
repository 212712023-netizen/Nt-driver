# Create DB user and database, set DATABASE_URL secret, restart app, collect logs
$ErrorActionPreference = 'Stop'
$pw = ([guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')).Substring(0,20)
$user = 'appuser'
$db = 'appdb'
Write-Output "Generated password for ${user}: ${pw}"
$sql = "CREATE USER $user WITH PASSWORD '$pw'; CREATE DATABASE $db OWNER $user;"
Write-Output 'Creating user and DB on Postgres machine...'
& flyctl machine exec e827943f0d3738 -a nt-driver-db -- "psql -U postgres -c \"$sql\""

Write-Output 'Setting DATABASE_URL secret on nt-driver...'
$dburl = 'postgres://' + $user + ':' + $pw + '@e827943f0d3738.vm.nt-driver-db.internal:5433/' + $db + '?sslmode=verify-full'
& flyctl secrets set "DATABASE_URL=$dburl" -a nt-driver

Write-Output 'Restarting app machine...'
& flyctl machines restart d894615f425248 -a nt-driver
Start-Sleep -Seconds 8

Write-Output 'Collecting app logs...'
& flyctl logs -a nt-driver --no-tail | Out-File -FilePath .\nt-driver.post-update.logs.txt -Encoding utf8

Write-Output "Done. DATABASE_URL=$dburl"
