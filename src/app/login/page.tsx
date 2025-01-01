import Link from 'next/link'
import Image from 'next/image'

export default function Login() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 flex flex-col lg:flex-row items-stretch max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Left side - Form */}
          <div className="w-full lg:w-[45%] p-8">
            <div className="max-w-md mx-auto">
              <h1 className="heading-lg gradient-text mb-2">Welcome Back</h1>
              <p className="body-base text-gray-600 mb-8">Continue your learning journey</p>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[--primary-color] focus:ring-[--primary-color] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <Link href="/forgot-password" className="text-sm text-[--primary-color] hover:text-[--secondary-color]">
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Log In
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
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                    <Image src="/google.svg" alt="Google" width={20} height={20} />
                    <span className="ml-2">Google</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                    <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
                    <span className="ml-2">LinkedIn</span>
                  </button>
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-[--primary-color] hover:text-[--secondary-color] font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-[55%] bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center lg:text-left mb-8">
                <h2 className="heading-md gradient-text mb-4">Welcome Back to SkillMatchers</h2>
                <p className="body-base text-gray-600">Continue your journey of growth and connection</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                    <span className="text-xl">💫</span>
                  </div>
                  <h3 className="font-bold mb-1 text-sm">Your Matches</h3>
                  <p className="text-gray-600 text-sm">Connect with mentors and peers</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                    <span className="text-xl">📚</span>
                  </div>
                  <h3 className="font-bold mb-1 text-sm">Learning Progress</h3>
                  <p className="text-gray-600 text-sm">Track your achievements</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                    <span className="text-xl">💬</span>
                  </div>
                  <h3 className="font-bold mb-1 text-sm">Messages</h3>
                  <p className="text-gray-600 text-sm">Continue conversations</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                    <span className="text-xl">🎯</span>
                  </div>
                  <h3 className="font-bold mb-1 text-sm">Goals</h3>
                  <p className="text-gray-600 text-sm">Update objectives</p>
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