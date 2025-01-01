import Image from 'next/image'
import Link from 'next/link'

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mt-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">Contact Us</h1>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto">
              Have questions or feedback? We&apos;d love to hear from you. Our team is always here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="heading-lg mb-6">Send us a message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[--primary-color]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[--primary-color]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[--primary-color]"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[--primary-color]"
                    placeholder="Your message here..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">Send Message</button>
              </form>
            </div>

            {/* Quick Contact */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-lg mb-6">Quick Contact</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="heading-sm mb-1">Email</h3>
                      <p className="text-gray-600">support@skillmatchers.com</p>
                      <p className="text-gray-600">business@skillmatchers.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="heading-sm mb-1">Location</h3>
                      <p className="text-gray-600">123 Innovation Street</p>
                      <p className="text-gray-600">San Francisco, CA 94103</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="heading-lg mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="heading-sm mb-2">How does matching work?</h3>
                    <p className="text-gray-600">Our AI-powered system matches users based on complementary skills, learning goals, and interests to ensure meaningful connections.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="heading-sm mb-2">Is it free to join?</h3>
                    <p className="text-gray-600">Yes, basic membership is free. We also offer premium plans with additional features for more serious learners and mentors.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="heading-sm mb-2">How can I become a mentor?</h3>
                    <p className="text-gray-600">Sign up and indicate your interest in mentoring. Complete your profile with your expertise and experience, and our team will review your application.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 