import Link from 'next/link'
import Image from 'next/image'

export default function SignUp() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 flex flex-col lg:flex-row items-stretch max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Left side - Form */}
          <div className="w-full lg:w-[45%] p-8">
            <div className="max-w-md mx-auto">
              <h1 className="heading-lg gradient-text mb-2">Create Account</h1>
              <p className="body-base text-gray-600 mb-8">Join our community of learners and mentors</p>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

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

                <button type="submit" className="btn-primary w-full">
                  Sign Up
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