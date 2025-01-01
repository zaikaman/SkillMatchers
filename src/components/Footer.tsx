import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="gradient-bg text-white">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-black">💘 SkillMatch</div>
            </Link>
            <p className="text-sm text-gray-200">
              Connecting passionate individuals through skills and mentorship. Join our community and grow together.
            </p>
            <div className="flex space-x-4">
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

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-pink-200 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-pink-200 transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-pink-200 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-200 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-pink-200 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-pink-200 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-pink-200 transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-pink-200 transition-colors">Security</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-200 mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-pink-200 transition-colors pr-24"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 px-4 py-1.5 rounded-lg bg-white text-[--primary-color] hover:bg-pink-200 transition-colors font-semibold text-sm"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <div className="mt-6 flex space-x-4">
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Image src="/app-store.svg" alt="Download on App Store" width={120} height={36} className="w-auto h-auto" />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Image src="/play-store.svg" alt="Get it on Google Play" width={120} height={36} className="w-auto h-auto" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/20">
          <div className="text-sm text-center text-gray-200">
            © 2024 SkillMatch. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
} 