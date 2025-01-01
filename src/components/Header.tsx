'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-black gradient-text">💘 SkillMatchers</div>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/signup" className="btn-primary">Sign Up</Link>
          <Link href="/login" className="btn-secondary">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 hover:text-[--primary-color] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 w-48 py-2 mt-1 bg-white rounded-lg shadow-lg md:hidden">
            <Link 
              href="/about"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/contact"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t border-gray-100 my-2"></div>
            <Link 
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
            <Link 
              href="/signup"
              className="block px-4 py-2 text-sm text-[--primary-color] hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
} 