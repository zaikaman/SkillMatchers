import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// API route này có thể được gọi bởi cron service bên ngoài như Vercel Cron, cron-job.org, v.v.
export async function GET(request: Request) {
  try {
    // Kiểm tra authorization header (tùy chọn để bảo mật)
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.CRON_SECRET_TOKEN
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Ping database với multiple queries để đảm bảo kết nối
    const pingPromises = [
      // Query 1: Check profiles table
      supabase.from('profiles').select('count').limit(1),
      
      // Query 2: Check jobs table  
      supabase.from('jobs').select('count').limit(1),
      
      // Query 3: Simple version check
      supabase.rpc('version' as any)
    ]

    const startTime = Date.now()
    const results = await Promise.allSettled(pingPromises)
    const endTime = Date.now()
    const duration = endTime - startTime

    const successful = results.filter(result => result.status === 'fulfilled').length
    const failed = results.filter(result => result.status === 'rejected').length

    // Log kết quả
    const logMessage = `Cron ping database: ${successful}/${results.length} queries successful, duration: ${duration}ms`
    console.log(logMessage)

    if (failed > 0) {
      console.warn(`${failed} database queries failed:`, 
        results
          .filter(result => result.status === 'rejected')
          .map(result => (result as PromiseRejectedResult).reason)
      )
    }

    // Ghi log vào database (tùy chọn)
    try {
      await supabase
        .from('system_logs')
        .insert({
          type: 'database_ping',
          message: logMessage,
          metadata: {
            successful_queries: successful,
            failed_queries: failed,
            duration_ms: duration,
            timestamp: new Date().toISOString()
          }
        })
    } catch (logError) {
      // Không làm fail cron job nếu không ghi được log
      console.warn('Could not write ping log to database:', logError)
    }

    return NextResponse.json({
      success: true,
      message: 'Database cron ping completed',
      stats: {
        successful_queries: successful,
        failed_queries: failed,
        duration_ms: duration,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Cron database ping failed:', errorMessage)
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}

// Cũng hỗ trợ POST method cho flexibility
export async function POST(request: Request) {
  return GET(request)
}
