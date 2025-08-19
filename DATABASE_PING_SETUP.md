# Hướng Dẫn Setup Database Ping

Tài liệu này hướng dẫn cách cấu hình và sử dụng hệ thống ping database mỗi phút để duy trì kết nối.

## 🎯 Tổng Quan

Đã tạo 3 giải pháp ping database:

1. **Client-side Ping** - Ping khi có người dùng truy cập
2. **Admin Dashboard** - Giao diện quản lý và giám sát
3. **Server-side Cron** - Ping tự động ngay cả khi không có người dùng

## 🚀 Cách Sử Dụng

### 1. Client-side Ping (Tự động)

Database sẽ được ping mỗi phút khi có người dùng truy cập website:

- ✅ **Tự động hoạt động** - Không cần setup gì thêm
- ✅ **Hiển thị status** - Indicator ở góc trên phải màn hình
- ✅ **Error handling** - Tự động tạm dừng khi có nhiều lỗi
- ✅ **Smart retry** - Tự động khôi phục sau khi lỗi

**Xem trạng thái:** Indicator nhỏ ở góc trên phải có các trạng thái:
- `✅` Kết nối thành công  
- `❌` Có lỗi kết nối
- `🔄` Đang ping
- `⏸️` Tạm dừng

### 2. Admin Dashboard

Truy cập trang admin để xem chi tiết và quản lý:

```
http://localhost:3000/admin/database-monitor
```

**Tính năng:**
- 📊 Thống kê chi tiết ping
- 📝 Log ping history  
- ⏯️ Bật/tắt ping manual
- 🔧 Ping thủ công

### 3. Server-side Cron (Nâng cao)

Để ping database ngay cả khi không có người dùng truy cập, bạn có thể setup cron job bên ngoài.

#### Sử dụng cron-job.org (Miễn phí)

1. Truy cập [cron-job.org](https://cron-job.org)
2. Đăng ký tài khoản miễn phí
3. Tạo cron job mới:
   - **URL:** `https://yourdomain.com/api/cron/ping-database`
   - **Schedule:** `*/1 * * * *` (mỗi phút)
   - **Method:** GET

#### Sử dụng Vercel Cron (Với Vercel Pro)

Thêm vào `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/ping-database",
      "schedule": "*/1 * * * *"
    }
  ]
}
```

#### Bảo mật Cron Endpoint

Thêm vào `.env`:

```env
CRON_SECRET_TOKEN=your-super-secret-token-here
```

Sau đó gọi API với header:

```bash
curl -H "Authorization: Bearer your-super-secret-token-here" \
  https://yourdomain.com/api/cron/ping-database
```

## 🔧 Cấu Hình

### Thay đổi interval ping

Trong `src/hooks/useDatabasePing.ts`:

```typescript
// Đổi từ 1 phút thành 30 giây
intervalMs: 30000 

// Đổi thành 2 phút  
intervalMs: 120000
```

### Thay đổi số lỗi trước khi tạm dừng

Trong `src/hooks/useDatabasePing.ts`:

```typescript
// Đổi từ 5 lỗi thành 3 lỗi
if (consecutiveErrors >= 3) {
```

### Thay đổi thời gian tạm dừng

```typescript
// Đổi từ 5 phút thành 10 phút
setTimeout(() => {
  setIsActive(true)
  setConsecutiveErrors(0)
}, 10 * 60 * 1000) // 10 phút
```

## 📊 Monitoring & Logging

### Xem logs trong browser console

Ping logs sẽ hiển thị trong browser console:

```
✅ Database ping successful: 2024-01-20T10:30:00.000Z
❌ Database ping failed: Connection timeout
```

### Xem logs trên server

Server cron logs trong server console:

```
Cron ping database: 3/3 queries successful, duration: 150ms
```

### Thêm database logging (Tùy chọn)

Tạo bảng `system_logs` để lưu ping history:

```sql
CREATE TABLE system_logs (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🛠️ Troubleshooting

### Ping không hoạt động

1. **Kiểm tra console errors** - Mở Developer Tools > Console
2. **Kiểm tra network tab** - Xem có request đến `/api/ping-db` không
3. **Kiểm tra .env** - Đảm bảo database credentials đúng

### Quá nhiều lỗi ping

1. **Kiểm tra database connection** - Chạy test script:
   ```bash
   .\test-db-connection.ps1
   ```

2. **Kiểm tra Supabase status** - Truy cập [status.supabase.com](https://status.supabase.com)

3. **Tăng timeout** - Thêm timeout vào API call

### Cron job không hoạt động

1. **Kiểm tra URL** - Đảm bảo endpoint accessible công khai
2. **Kiểm tra logs** - Xem logs của cron service
3. **Test manual** - Gọi API trực tiếp để test

## 📱 Best Practices

### Production Setup

1. **Sử dụng cả client-side và server-side ping**
2. **Setup monitoring alerts** khi ping failed
3. **Backup ping methods** với multiple cron services
4. **Rate limiting** để tránh abuse

### Development Setup

1. **Chỉ dùng client-side ping** cho development
2. **Disable cron job** trong development
3. **Lower interval** cho testing (30s thay vì 1 phút)

### Performance Considerations

1. **Lightweight queries** - Chỉ ping với queries đơn giản
2. **Connection pooling** - Supabase đã handle
3. **Error handling** - Tránh infinite retry loops
4. **Smart scheduling** - Tránh ping khi đang maintenance

## 🔄 Migration Notes

Nếu cần chuyển sang database khác:

1. Update connection string trong `.env`
2. Update ping query trong `/api/ping-db/route.ts`
3. Test với script `test-db-connection.ps1`
4. Update monitoring dashboard nếu cần

## 🆘 Support

Nếu gặp vấn đề:

1. Kiểm tra logs trong browser console và server
2. Test database connection manual
3. Kiểm tra Supabase dashboard và status
4. Xem documentation của hosting provider về cron jobs
