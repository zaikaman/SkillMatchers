'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp, signInWithGoogle, signInWithLinkedIn } from '@/lib/actions'

function validatePassword(password: string) {
  const minLength = password.length >= 6;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!minLength) {
    return 'Password must be at least 6 characters long';
  }
  if (!hasLowerCase || !hasUpperCase || !hasNumber || !hasSymbol) {
    return 'Password must include lowercase, uppercase letters, numbers and symbols';
  }
  return null;
}

export default function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    // Validate password before submitting
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true)
    setError('')

    try {
      await signUp(email, password, fullName)
      router.push('/auth/verify')
    } catch (error: Error) {
      setError(error.message || 'An error occurred during signup. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error: Error) {
      setError(error.message)
    }
  }

  const handleLinkedInSignIn = async () => {
    try {
      await signInWithLinkedIn()
    } catch (error: Error) {
      setError(error.message)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 flex flex-col lg:flex-row items-stretch max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Left side - Form */}
          <div className="w-full lg:w-[45%] p-8">
            <div className="max-w-md mx-auto">
              <h1 className="heading-lg gradient-text mb-2">Create Account</h1>
              <p className="body-base text-gray-600 mb-8">Join our community of learners and mentors</p>

              {error && (
                <div className="mb-4 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Password must be at least 6 characters and include lowercase, uppercase letters, numbers and symbols.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Image src="/google.svg" alt="Google" width={20} height={20} />
                    <span className="ml-2">Google</span>
                  </button>
                  <button
                    onClick={handleLinkedInSignIn}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
                    <span className="ml-2">LinkedIn</span>
                  </button>
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-[--primary-color] hover:text-[--secondary-color] font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-[55%] bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center lg:text-left mb-8">
                <h2 className="heading-md gradient-text mb-4">Join SkillMatchers Today</h2>
                <p className="body-base text-gray-600">Connect with mentors and peers who can help you grow</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                    <span className="text-xl">🎯</span>
                  </div>
                  <h3 className="font-bold mb-1 text-sm">Find Perfect Matches</h3>
                  <p className="text-gray-600 text-sm">AI-powered matching system</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                    <span className="text-xl">💡</span>
                  </div>
                  <h3 className="font-bold mb-1 text-sm">Learn & Grow</h3>
                  <p className="text-gray-600 text-sm">Exchange skills and knowledge</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                    <span className="text-xl">🤝</span>
                  </div>
                  <h3 className="font-bold mb-1 text-sm">Build Network</h3>
                  <p className="text-gray-600 text-sm">Connect with professionals</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                    <span className="text-xl">🚀</span>
                  </div>
                  <h3 className="font-bold mb-1 text-sm">Achieve Goals</h3>
                  <p className="text-gray-600 text-sm">Reach objectives together</p>
                </div>
              </div>

              <div className="mt-8 relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[--gradient-start] to-[--gradient-end] opacity-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                  alt="Learning together"
                  width={800}
                  height={400}
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 
