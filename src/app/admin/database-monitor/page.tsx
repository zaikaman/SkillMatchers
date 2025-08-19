'use client'

import { DatabasePingMonitor } from '@/components/DatabasePingMonitor'

export default function DatabaseMonitorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Database Connection Monitor
        </h1>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin kết nối Database</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Database Type:</span> PostgreSQL (Supabase)
              </div>
              <div>
                <span className="font-medium">Ping Interval:</span> 1 phút
              </div>
              <div>
                <span className="font-medium">Timeout:</span> 30 giây
              </div>
              <div>
                <span className="font-medium">Auto-pause:</span> Sau 5 lỗi liên tiếp
              </div>
            </div>
          </div>

          <DatabasePingMonitor 
            showDetails={true} 
            enabled={true}
            className="shadow-lg"
          />

          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Hướng dẫn sử dụng</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <span className="font-medium">✅ Thành công:</span> Database kết nối tốt
              </div>
              <div>
                <span className="font-medium">❌ Lỗi:</span> Có vấn đề với kết nối database
              </div>
              <div>
                <span className="font-medium">🔄 Đang ping:</span> Đang kiểm tra kết nối
              </div>
              <div>
                <span className="font-medium">⏸️ Tạm dừng:</span> Monitor đã được tạm dừng
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                <span className="font-medium text-yellow-800">Lưu ý:</span> 
                <span className="text-yellow-700 ml-1">
                  Monitor sẽ tự động tạm dừng 5 phút nếu có 5 lỗi liên tiếp để tránh spam database.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
