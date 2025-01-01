import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      await supabase.auth.exchangeCodeForSession(code)
      
      // Check if user has confirmed their email
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user?.email_confirmed_at) {
        // If email is confirmed, redirect to dashboard
        return NextResponse.redirect(new URL(next, request.url))
      } else {
        // If email is not confirmed, redirect to verify page
        return NextResponse.redirect(new URL('/auth/verify', request.url))
      }
    } catch (error) {
      // If there's an error, redirect to login page
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If no code is present, redirect to login page
  return NextResponse.redirect(new URL('/login', request.url))
} 