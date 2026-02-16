"use client"

import { ShoppingBag, Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold tracking-wide">
          REY
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-gray-600 transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-600 transition">
            Shop
          </Link>
          <Link href="/" className="hover:text-gray-600 transition">
            Collections
          </Link>
          <Link href="/" className="hover:text-gray-600 transition">
            Account
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingBag className="w-6 h-6 hover:text-gray-600 transition" />
            
            {/* Cart Badge */}
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-6 space-y-6 text-sm font-medium">
            <Link href="/" onClick={() => setIsOpen(false)} className="block">
              Home
            </Link>
            <Link href="/products" onClick={() => setIsOpen(false)} className="block">
              Shop
            </Link>
            <Link href="/" onClick={() => setIsOpen(false)} className="block">
              Collections
            </Link>
            <Link href="/" onClick={() => setIsOpen(false)} className="block">
              Account
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
