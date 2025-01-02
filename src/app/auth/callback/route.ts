import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      await supabase.auth.exchangeCodeForSession(code)
      
      // Check if user has confirmed their email
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user?.email_confirmed_at) {
        // Check if user has completed onboarding
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, has_completed_onboarding')
          .eq('id', user.id)
          .single()

        if (!profile?.has_completed_onboarding) {
          // If onboarding is not completed, redirect to onboarding page
          return NextResponse.redirect(new URL('/onboarding', request.url))
        }
        
        // If onboarding is completed, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url))
      } else {
        // If email is not confirmed, redirect to verify page
        return NextResponse.redirect(new URL('/auth/verify', request.url))
      }
    } catch {
      // If there's an error, redirect to login page
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If no code is present, redirect to login page
  return NextResponse.redirect(new URL('/login', request.url))
} 
