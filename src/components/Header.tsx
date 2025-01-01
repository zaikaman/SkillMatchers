'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-black gradient-text">💘 SkillMatchers</div>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/#how-it-works" 
            className="text-gray-600 hover:text-[--primary-color] transition-colors"
          >
            How It Works
          </Link>
          <Link 
            href="/about" 
            className={`text-gray-600 hover:text-[--primary-color] transition-colors ${
              pathname === '/about' ? 'text-[--primary-color]' : ''
            }`}
          >
            About Us
          </Link>
          <Link 
            href="/contact" 
            className={`text-gray-600 hover:text-[--primary-color] transition-colors ${
              pathname === '/contact' ? 'text-[--primary-color]' : ''
            }`}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/signup" className="btn-primary">Sign Up</Link>
          <Link href="/login" className="btn-secondary">Login</Link>
        </div>
      </div>
    </header>
  )
} 