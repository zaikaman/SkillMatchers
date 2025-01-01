import Link from 'next/link'
import Image from 'next/image'

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center space-x-2">
          <div className="text-2xl font-black gradient-text">💘 SkillMatch</div>
        </Link>

        <div className="mt-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-xl gradient-text mb-4">Get in Touch</h1>
            <p className="body-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about SkillMatch? We're here to help you connect with the perfect mentors and peers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="heading-md mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                  </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all">
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="mentorship">Mentorship Program</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="heading-md mb-6">Quick Contact</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Email Us</h3>
                      <p className="text-gray-600">support@skillmatch.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📱</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Call Us</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🌎</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Location</h3>
                      <p className="text-gray-600">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="heading-md mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">How does skill matching work?</h3>
                    <p className="text-gray-600 text-sm">Our AI-powered system analyzes your skills and goals to find the perfect mentors and peers for your learning journey.</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Is SkillMatch free?</h3>
                    <p className="text-gray-600 text-sm">We offer both free and premium plans. Basic matching and networking features are free for all users.</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">How can I become a mentor?</h3>
                    <p className="text-gray-600 text-sm">Create a profile, verify your expertise, and set your availability. Our team will review your application.</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="heading-md mb-6">Connect With Us</h2>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} className="text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Image src="/twitter.svg" alt="Twitter" width={24} height={24} className="text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Image src="/facebook.svg" alt="Facebook" width={24} height={24} className="text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Image src="/instagram.svg" alt="Instagram" width={24} height={24} className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 