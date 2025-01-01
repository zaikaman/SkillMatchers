import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Header */}
      <header className="py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-black gradient-text">💘 SkillMatch</div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works" className="text-gray-600 hover:text-[--primary-color] transition-colors">How It Works</Link>
            <Link href="#about-us" className="text-gray-600 hover:text-[--primary-color] transition-colors">About Us</Link>
            <Link href="/contact" className="text-gray-600 hover:text-[--primary-color] transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/signup" className="btn-primary">Sign Up</Link>
            <Link href="/login" className="btn-secondary">Login</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-pink-50 via-purple-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container text-center max-w-4xl mx-auto relative">
          <div className="slide-in">
            <h1 className="heading-xl gradient-text mb-6">
              Find Your Perfect <br/> Skill Match
            </h1>
            <p className="body-lg text-gray-600 mb-8">Swipe right on skills that match your goals. Connect with mentors and collaborators who complement your journey.</p>
            <Link href="/get-started" className="btn-primary">Start Matching Now</Link>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
            <div className="floating-animation">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                alt="Team collaboration"
                width={800}
                height={500}
                className="rounded-3xl mx-auto shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative" id="how-it-works">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg gradient-text mb-4">How It Works</h2>
            <p className="body-lg text-gray-600">Simple steps to find your perfect skill match</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card group">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="heading-md mb-3">Create Your Profile</h3>
              <p className="body-base text-gray-600">Add your skills, interests, and what you're looking to learn or teach.</p>
            </div>
            <div className="feature-card group">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💫</span>
              </div>
              <h3 className="heading-md mb-3">Swipe & Match</h3>
              <p className="body-base text-gray-600">Find people with complementary skills and shared interests.</p>
            </div>
            <div className="feature-card group">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="heading-md mb-3">Grow Together</h3>
              <p className="body-base text-gray-600">Connect, collaborate, and level up your skills together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50 relative" id="about-us">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg gradient-text mb-4">Success Stories</h2>
            <p className="body-lg text-gray-600">Hear from our happy matches</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="testimonial-card">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                  alt="Emily Johnson"
                  fill
                  className="rounded-full object-cover shadow-xl"
                />
                <div className="absolute -right-2 -bottom-2 w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white">
                  ❤️
                </div>
              </div>
              <h4 className="heading-md mb-2">Emily Johnson</h4>
              <p className="body-base text-gray-600 italic">"Found my perfect mentor match! They helped me transition into UX design seamlessly."</p>
            </div>
            <div className="testimonial-card">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                  alt="Mark Spencer"
                  fill
                  className="rounded-full object-cover shadow-xl"
                />
                <div className="absolute -right-2 -bottom-2 w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white">
                  ❤️
                </div>
              </div>
              <h4 className="heading-md mb-2">Mark Spencer</h4>
              <p className="body-base text-gray-600 italic">"Met an amazing co-founder through SkillMatch. Our skills perfectly complement each other!"</p>
            </div>
            <div className="testimonial-card">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                  alt="Sarah Lee"
                  fill
                  className="rounded-full object-cover shadow-xl"
                />
                <div className="absolute -right-2 -bottom-2 w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white">
                  ❤️
                </div>
              </div>
              <h4 className="heading-md mb-2">Sarah Lee</h4>
              <p className="body-base text-gray-600 italic">"The matching algorithm is incredible! Found the perfect study group for coding."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-pink-50 to-purple-50 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container text-center max-w-3xl mx-auto relative">
          <div className="slide-in">
            <h2 className="heading-lg gradient-text mb-6">Ready to Find Your Match?</h2>
            <p className="body-lg text-gray-600 mb-8">Join thousands of people finding their perfect skill matches every day.</p>
            <Link href="/join" className="btn-primary">Start Matching</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-bg text-white py-12" id="contact">
        <div className="container">
          <div className="flex flex-wrap justify-between items-center">
            <div className="space-x-8">
              <Link href="/about" className="hover:text-pink-200 transition-colors">About</Link>
              <Link href="/terms" className="hover:text-pink-200 transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-pink-200 transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-pink-200 transition-colors">Contact</Link>
            </div>
            <div className="flex space-x-6">
              <Link href="https://linkedin.com" className="hover:text-pink-200 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              <Link href="https://twitter.com" className="hover:text-pink-200 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="https://facebook.com" className="hover:text-pink-200 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
