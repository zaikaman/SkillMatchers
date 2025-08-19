# 🚀 Setup SkillMatch Project từ đầu

## ✅ Checklist Setup

### 1. Google OAuth Setup
- [ ] Tạo OAuth Client ID trong Google Console
- [ ] Thêm Authorized JavaScript origins
- [ ] Thêm Authorized redirect URIs  
- [ ] Lấy Client ID và Client Secret

### 2. Supabase Authentication Setup
- [ ] Vào Supabase Dashboard → Authentication → Providers
- [ ] Enable Google provider
- [ ] Nhập Client ID và Client Secret từ Google
- [ ] Cấu hình redirect URLs

### 3. Database Migration
- [ ] Chạy migration để tạo tables
- [ ] Kiểm tra tables đã được tạo
- [ ] Test kết nối database

### 4. Environment Variables
- [ ] Cập nhật .env với thông tin mới
- [ ] Verify all keys are correct

### 5. Testing
- [ ] Test Google login
- [ ] Test signup flow
- [ ] Test dashboard access

## 📋 URLs cần nhớ

### Google Console URLs:
- JavaScript origins: 
  - `http://localhost:3000`
  - `https://kuxpnvivpvkipyisssku.supabase.co`

### Redirect URIs:
- `https://kuxpnvivpvkipyisssku.supabase.co/auth/v1/callback`
- `http://localhost:3000/auth/callback`

### Supabase URLs:
- Dashboard: https://kuxpnvivpvkipyisssku.supabase.co
- Auth Callback: https://kuxpnvivpvkipyisssku.supabase.co/auth/v1/callback

## 🔑 Thông tin cần lưu:
- [ ] Google Client ID: `_________________`
- [ ] Google Client Secret: `_________________`
- [ ] Supabase JWT Secret: `_________________`
