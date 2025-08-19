import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Ping database với một query đơn giản
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 là lỗi "no rows returned" - vẫn là kết nối thành công
      console.error('Database ping error:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          timestamp: new Date().toISOString()
        }, 
        { status: 500 }
      )
    }

    console.log(`Database ping successful at ${new Date().toISOString()}`)
    
    return NextResponse.json({
      success: true,
      message: 'Database ping successful',
      timestamp: new Date().toISOString(),
      hasData: !!data
    })

  } catch (error) {
    console.error('Database ping failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}

// Cũng hỗ trợ POST method
export async function POST() {
  return GET()
}
