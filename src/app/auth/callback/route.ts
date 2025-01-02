import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      await supabase.auth.exchangeCodeForSession(code)
      return NextResponse.redirect(new URL('/onboarding', baseUrl))
    } catch {
      // If there's an error, redirect to login page
      return NextResponse.redirect(new URL('/onboarding', baseUrl))
    }
  }

  // If no code is present, redirect to login page
  return NextResponse.redirect(new URL('/onboarding', baseUrl))
} 
