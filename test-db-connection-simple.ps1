# Script test ket noi database PostgreSQL moi
# PowerShell script de test connection

param(
    [string]$ConnectionString = "postgresql://postgres.kuxpnvivpvkipyisssku:Lovelybaby*93@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"
)

Write-Host "Dang kiem tra ket noi database..." -ForegroundColor Yellow

try {
    # Kiem tra psql
    $psqlPath = Get-Command psql -ErrorAction SilentlyContinue
    
    if (-not $psqlPath) {
        Write-Host "PostgreSQL client (psql) khong duoc tim thay. Vui long cai dat PostgreSQL client." -ForegroundColor Red
        Write-Host "Ban co the tai tu: https://www.postgresql.org/download/" -ForegroundColor Blue
        exit 1
    }

    # Test ket noi
    Write-Host "Dang thuc hien test ket noi..." -ForegroundColor Blue
    
    $testQuery = "SELECT version();"
    $result = psql $ConnectionString -c $testQuery 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Ket noi database thanh cong!" -ForegroundColor Green
        Write-Host "Database version: $result" -ForegroundColor Gray
        
        # Kiem tra cac bang hien co
        Write-Host "Kiem tra cac bang hien co..." -ForegroundColor Blue
        $tablesQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
        $tables = psql $ConnectionString -c $tablesQuery -t 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Cac bang hien co:" -ForegroundColor Green
            $tables | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }
        }
        
    } else {
        Write-Host "Khong the ket noi database!" -ForegroundColor Red
        Write-Host "Loi: $result" -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "Loi khi thuc hien test: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "Hoan thanh kiem tra ket noi!" -ForegroundColor Green
