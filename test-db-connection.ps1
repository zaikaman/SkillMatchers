# Script kiểm tra kết nối database PostgreSQL mới
# PowerShell script để test connection

param(
    [string]$ConnectionString = "postgresql://postgres.kuxpnvivpvkipyisssku:Lovelybaby*93@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"
)

Write-Host "Đang kiểm tra kết nối database..." -ForegroundColor Yellow

try {
    # Cài đặt psql nếu chưa có (yêu cầu PostgreSQL client)
    $psqlPath = Get-Command psql -ErrorAction SilentlyContinue
    
    if (-not $psqlPath) {
        Write-Host "⚠️  PostgreSQL client (psql) không được tìm thấy. Vui lòng cài đặt PostgreSQL client." -ForegroundColor Red
        Write-Host "Bạn có thể tải từ: https://www.postgresql.org/download/" -ForegroundColor Blue
        exit 1
    }

    # Test kết nối
    Write-Host "🔍 Đang thực hiện test kết nối..." -ForegroundColor Blue
    
    $testQuery = "SELECT version();"
    $result = psql $ConnectionString -c $testQuery 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Kết nối database thành công!" -ForegroundColor Green
        Write-Host "Database version: $result" -ForegroundColor Gray
        
        # Kiểm tra các bảng hiện có
        Write-Host "`n🔍 Kiểm tra các bảng hiện có..." -ForegroundColor Blue
        $tablesQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
        $tables = psql $ConnectionString -c $tablesQuery -t 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "📋 Các bảng hiện có:" -ForegroundColor Green
            $tables | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }
        }
        
    } else {
        Write-Host "❌ Không thể kết nối database!" -ForegroundColor Red
        Write-Host "Lỗi: $result" -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "❌ Lỗi khi thực hiện test: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "`n✨ Hoàn thành kiểm tra kết nối!" -ForegroundColor Green
