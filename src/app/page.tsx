import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-pink-50 via-purple-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container px-4 text-center max-w-4xl mx-auto relative">
          <div className="slide-in">
            <h1 className="heading-xl gradient-text mb-4 md:mb-6 text-3xl md:text-5xl">
              Find Your Perfect <br/> Skill Match
            </h1>
            <p className="body-lg text-gray-600 mb-6 md:mb-8 text-sm md:text-base">Swipe right on skills that match your goals. Connect with mentors and collaborators who complement your journey.</p>
            <Link href="/get-started" className="btn-primary text-sm md:text-base">Start Matching Now</Link>
          </div>
          
          <div className="mt-8 md:mt-16 relative">
            <div className="absolute -left-10 md:-left-20 top-1/2 transform -translate-y-1/2 w-20 md:w-40 h-20 md:h-40 bg-pink-200 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -right-10 md:-right-20 top-1/2 transform -translate-y-1/2 w-20 md:w-40 h-20 md:h-40 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
            <div className="floating-animation px-4 md:px-0">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                alt="Team collaboration"
                width={800}
                height={500}
                className="rounded-2xl md:rounded-3xl mx-auto shadow-xl md:shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white relative" id="how-it-works">
        <div className="container px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="heading-lg gradient-text mb-3 md:mb-4 text-2xl md:text-4xl">How It Works</h2>
            <p className="body-lg text-gray-600 text-sm md:text-base">Simple steps to find your perfect skill match</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="feature-card group p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 gradient-bg rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl">👥</span>
              </div>
              <h3 className="heading-md mb-2 md:mb-3 text-lg md:text-xl">Create Your Profile</h3>
              <p className="body-base text-gray-600 text-sm md:text-base">Add your skills, interests, and what you&apos;re looking to learn or teach.</p>
            </div>
            <div className="feature-card group p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 gradient-bg rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl">💫</span>
              </div>
              <h3 className="heading-md mb-2 md:mb-3 text-lg md:text-xl">Swipe & Match</h3>
              <p className="body-base text-gray-600 text-sm md:text-base">Find people with complementary skills and shared interests.</p>
            </div>
            <div className="feature-card group p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 gradient-bg rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl">🚀</span>
              </div>
              <h3 className="heading-md mb-2 md:mb-3 text-lg md:text-xl">Grow Together</h3>
              <p className="body-base text-gray-600 text-sm md:text-base">Connect, collaborate, and level up your skills together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-pink-50 relative">
        <div className="container px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="heading-lg gradient-text mb-3 md:mb-4 text-2xl md:text-4xl">Success Stories</h2>
            <p className="body-lg text-gray-600 text-sm md:text-base">Hear from our happy matches</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="testimonial-card bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="relative w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                  alt="Emily Johnson"
                  fill
                  className="rounded-full object-cover shadow-lg md:shadow-xl"
                />
                <div className="absolute -right-2 -bottom-2 w-6 h-6 md:w-8 md:h-8 gradient-bg rounded-full flex items-center justify-center text-white">
                  ❤️
                </div>
              </div>
              <h4 className="heading-md mb-2 text-lg md:text-xl">Emily Johnson</h4>
              <p className="body-base text-gray-600 italic text-sm md:text-base">&quot;Found my perfect mentor match! They helped me transition into UX design seamlessly.&quot;</p>
            </div>
            <div className="testimonial-card bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="relative w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                  alt="Mark Spencer"
                  fill
                  className="rounded-full object-cover shadow-lg md:shadow-xl"
                />
                <div className="absolute -right-2 -bottom-2 w-6 h-6 md:w-8 md:h-8 gradient-bg rounded-full flex items-center justify-center text-white">
                  ❤️
                </div>
              </div>
              <h4 className="heading-md mb-2 text-lg md:text-xl">Mark Spencer</h4>
              <p className="body-base text-gray-600 italic text-sm md:text-base">&quot;Met an amazing co-founder through SkillMatchers. Our skills perfectly complement each other!&quot;</p>
            </div>
            <div className="testimonial-card bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="relative w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                  alt="Sarah Lee"
                  fill
                  className="rounded-full object-cover shadow-lg md:shadow-xl"
                />
                <div className="absolute -right-2 -bottom-2 w-6 h-6 md:w-8 md:h-8 gradient-bg rounded-full flex items-center justify-center text-white">
                  ❤️
                </div>
              </div>
              <h4 className="heading-md mb-2 text-lg md:text-xl">Sarah Lee</h4>
              <p className="body-base text-gray-600 italic text-sm md:text-base">&quot;The matching algorithm is incredible! Found the perfect study group for coding.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-pink-50 to-purple-50 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container px-4 text-center max-w-3xl mx-auto relative">
          <div className="slide-in">
            <h2 className="heading-lg gradient-text mb-4 md:mb-6 text-2xl md:text-4xl">Ready to Find Your Match?</h2>
            <p className="body-lg text-gray-600 mb-6 md:mb-8 text-sm md:text-base">Join thousands of people finding their perfect skill matches every day.</p>
            <Link href="/join" className="btn-primary text-sm md:text-base">Start Matching</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
