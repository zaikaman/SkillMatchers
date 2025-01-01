import Image from 'next/image'
import Link from 'next/link'

export default function VerifyEmail() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h1 className="heading-lg gradient-text mb-2">Verify Your Email</h1>
          <p className="body-base text-gray-600 mb-8">
            We've sent a verification email to your address. Please check your inbox (and spam folder) to verify your account.
          </p>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              After verifying your email, you can log in to your account.
            </p>
            
            <Link 
              href="/login"
              className="btn-primary w-full inline-block"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 