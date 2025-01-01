import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Hero Section */}
        <div className="mt-4 md:mt-8 max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="heading-xl gradient-text mb-4 md:mb-6 text-3xl md:text-5xl">Our Mission</h1>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
              Empowering individuals to grow through meaningful connections. We&apos;re building the future of skill-based networking and mentorship.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-20">
            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl text-center">
              <div className="heading-lg gradient-text mb-1 md:mb-2 text-2xl md:text-4xl">50K+</div>
              <p className="text-gray-600 text-sm md:text-base">Active Users</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl text-center">
              <div className="heading-lg gradient-text mb-1 md:mb-2 text-2xl md:text-4xl">120+</div>
              <p className="text-gray-600 text-sm md:text-base">Countries</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl text-center">
              <div className="heading-lg gradient-text mb-1 md:mb-2 text-2xl md:text-4xl">25K+</div>
              <p className="text-gray-600 text-sm md:text-base">Successful Matches</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl text-center">
              <div className="heading-lg gradient-text mb-1 md:mb-2 text-2xl md:text-4xl">4.8/5</div>
              <p className="text-gray-600 text-sm md:text-base">User Rating</p>
            </div>
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
            <div>
              <h2 className="heading-lg gradient-text mb-4 md:mb-6 text-2xl md:text-4xl">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-sm md:text-base">
                <p>Founded in 2021 in San Francisco, SkillMatchers emerged from a simple observation: the traditional ways of finding mentors and learning new skills weren&apos;t working in our rapidly evolving digital world.</p>
                <p>Our founders, experienced tech entrepreneurs and educators, recognized that while social networks connected people based on existing relationships, there was no platform specifically designed to connect people based on complementary skills and learning goals.</p>
                <p>What started as a small community of tech professionals has now grown into a global platform, connecting learners and mentors across various industries - from technology and design to business and creative arts.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-20 md:w-40 h-20 md:h-40 bg-pink-200 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-20 md:w-40 h-20 md:h-40 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
              <Image
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80"
                alt="Our office"
                width={600}
                height={400}
                className="rounded-xl md:rounded-2xl shadow-lg md:shadow-xl"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-12 md:mb-20">
            <h2 className="heading-lg gradient-text text-center mb-8 md:mb-12 text-2xl md:text-4xl">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl">
                <div className="w-10 h-10 md:w-12 md:h-12 gradient-bg rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6">
                  <span className="text-xl md:text-2xl">🤝</span>
                </div>
                <h3 className="heading-md mb-3 md:mb-4 text-lg md:text-xl">Community First</h3>
                <p className="text-gray-600 text-sm md:text-base">We believe in the power of community. Every feature and decision is made with our users&apos; best interests in mind.</p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl">
                <div className="w-10 h-10 md:w-12 md:h-12 gradient-bg rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6">
                  <span className="text-xl md:text-2xl">🎯</span>
                </div>
                <h3 className="heading-md mb-3 md:mb-4 text-lg md:text-xl">Quality Matches</h3>
                <p className="text-gray-600 text-sm md:text-base">Our AI-powered matching system ensures meaningful connections that lead to real growth and learning.</p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl">
                <div className="w-10 h-10 md:w-12 md:h-12 gradient-bg rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6">
                  <span className="text-xl md:text-2xl">🔒</span>
                </div>
                <h3 className="heading-md mb-3 md:mb-4 text-lg md:text-xl">Trust & Safety</h3>
                <p className="text-gray-600 text-sm md:text-base">We maintain the highest standards of security and verification to create a safe environment for all users.</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12 md:mb-20">
            <h2 className="heading-lg gradient-text text-center mb-8 md:mb-12 text-2xl md:text-4xl">Leadership Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto mb-3 md:mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
                    alt="David Chen"
                    fill
                    className="rounded-xl md:rounded-2xl object-cover"
                  />
                </div>
                <h4 className="font-bold text-sm md:text-base">David Chen</h4>
                <p className="text-gray-600 text-xs md:text-sm">CEO & Co-founder</p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">Former Product Lead at LinkedIn</p>
              </div>
              <div className="text-center">
                <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto mb-3 md:mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
                    alt="Sarah Miller"
                    fill
                    className="rounded-xl md:rounded-2xl object-cover"
                  />
                </div>
                <h4 className="font-bold text-sm md:text-base">Sarah Miller</h4>
                <p className="text-gray-600 text-xs md:text-sm">CTO & Co-founder</p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">Ex-Engineering Director at Google</p>
              </div>
              <div className="text-center">
                <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto mb-3 md:mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                    alt="Michael Thompson"
                    fill
                    className="rounded-xl md:rounded-2xl object-cover"
                  />
                </div>
                <h4 className="font-bold text-sm md:text-base">Michael Thompson</h4>
                <p className="text-gray-600 text-xs md:text-sm">Head of Product</p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">Previously at Airbnb</p>
              </div>
              <div className="text-center">
                <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto mb-3 md:mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80"
                    alt="Emily Zhang"
                    fill
                    className="rounded-xl md:rounded-2xl object-cover"
                  />
                </div>
                <h4 className="font-bold text-sm md:text-base">Emily Zhang</h4>
                <p className="text-gray-600 text-xs md:text-sm">Head of AI</p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">PhD in Machine Learning, MIT</p>
              </div>
            </div>
          </div>

          {/* Investors Section */}
          <div className="text-center mb-12 md:mb-20">
            <h2 className="heading-lg gradient-text mb-8 md:mb-12 text-2xl md:text-4xl">Backed By</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
              <div className="hover:scale-105 transition-transform">
                <Image src="/sequoia.svg" alt="Sequoia Capital" width={200} height={50} className="w-full" />
              </div>
              <div className="hover:scale-105 transition-transform">
                <Image src="/accel.svg" alt="Accel" width={200} height={50} className="w-full" />
              </div>
              <div className="hover:scale-105 transition-transform">
                <Image src="/andreessen.svg" alt="Andreessen Horowitz" width={200} height={50} className="w-full" />
              </div>
              <div className="hover:scale-105 transition-transform">
                <Image src="/yc.svg" alt="Greylock Partners" width={200} height={50} className="w-full" />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white p-6 md:p-12 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl text-center">
            <h2 className="heading-lg gradient-text mb-3 md:mb-4 text-2xl md:text-4xl">Join Our Journey</h2>
            <p className="body-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
              We&apos;re always looking for passionate individuals to join our team. Check out our open positions or become a member of our growing community.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link href="/careers" className="btn-primary text-sm md:text-base">View Open Positions</Link>
              <Link href="/signup" className="btn-secondary text-sm md:text-base">Join Community</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-xs md:text-sm text-center text-gray-200 py-4">
        © 2024 SkillMatchers. All rights reserved.
      </div>
    </main>
  )
} 