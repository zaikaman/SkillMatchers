# Hướng Dẫn Migration Database SkillMatch

## 📋 Tổng Quan
Tài liệu này hướng dẫn cách chuyển đổi từ database cũ sang database mới cho ứng dụng SkillMatch.

## ✅ Đã Hoàn Thành
1. ✅ Cập nhật file `.env` với thông tin database mới
2. ✅ Tạo script migration (`migrate-new-db.sql`)
3. ✅ Tạo script test kết nối (`test-db-connection.ps1`)

## 🔧 Các Bước Thực Hiện

### Bước 1: Kiểm tra kết nối database mới
```powershell
# Chạy script kiểm tra kết nối
.\test-db-connection.ps1
```

### Bước 2: Chạy migration trên database mới
```powershell
# Sử dụng psql để chạy migration
psql "postgresql://postgres.kuxpnvivpvkipyisssku:Lovelybaby*93@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres" -f migrate-new-db.sql
```

### Bước 3: Cập nhật JWT Secret (quan trọng!)
Bạn cần lấy JWT Secret từ Supabase dashboard mới và cập nhật trong file `.env`:
1. Truy cập https://kuxpnvivpvkipyisssku.supabase.co
2. Vào Settings > API
3. Copy JWT Secret
4. Cập nhật `SUPABASE_JWT_SECRET` trong file `.env`

### Bước 4: Khởi động lại ứng dụng
```powershell
# Khởi động lại Next.js app
npm run dev
```

## 📊 Cấu Trúc Database Đã Migration

### Bảng `profiles`
- Lưu thông tin profile người dùng
- Liên kết với `auth.users`
- Hỗ trợ role: `worker`, `employer`

### Bảng `jobs`
- Lưu thông tin công việc
- Liên kết với `profiles` (employer)
- Hỗ trợ trạng thái: `draft`, `published`, `closed`

### Bảng `matches`
- Quản lý matching giữa worker và job
- Trạng thái: `pending`, `accepted`, `rejected`

### Bảng `conversations` và `messages`
- Hệ thống chat/messaging
- RLS policies để bảo mật

## 🔒 Row Level Security (RLS)
Tất cả bảng đều được bật RLS với các policies phù hợp để đảm bảo bảo mật dữ liệu.

## ⚠️ Lưu Ý Quan Trọng
1. **Backup dữ liệu cũ** trước khi migration (nếu có)
2. **JWT Secret** phải được cập nhật đúng từ Supabase mới
3. **Test thoroughly** sau khi migration
4. **Environment variables** đã được cập nhật trong `.env`

## 🛠️ Troubleshooting

### Lỗi kết nối
- Kiểm tra connection string
- Đảm bảo firewall không block kết nối
- Verify credentials

### Lỗi migration
- Kiểm tra xem bảng đã tồn tại chưa
- Xem log lỗi chi tiết từ PostgreSQL

### Lỗi authentication
- Verify JWT Secret
- Kiểm tra ANON_KEY và SERVICE_ROLE_KEY

## 📞 Hỗ Trợ
Nếu gặp vấn đề, hãy kiểm tra:
1. Log của Next.js app
2. Supabase dashboard
3. PostgreSQL logs
