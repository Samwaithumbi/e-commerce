"use client"

import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen]=useState(false)
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-amber-950">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800">REY</h1>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <ShoppingCart size={28} className="text-gray-700 hover:text-gray-900 cursor-pointer transition " />
          {isMenuOpen?
               <X  size={28} className="text-gray-700 hover:text-amber-300 cursor-pointer transition" onClick={() => setIsMenuOpen(!isMenuOpen)}  /> 
               :<Menu size={28} className="text-gray-700 hover:text-gray-900 cursor-pointer transition" onClick={() => setIsMenuOpen(!isMenuOpen)} />
          }
         
        </div>

      </nav>
      <div className="px-2 text-black" >
          { isMenuOpen &&(
              <ul className="space-y-2">
                <li><Link href="/"onClick={() => setIsMenuOpen(!isMenuOpen)} className=" hover:text-yellow-300 ">Home</Link></li>
                <li><Link href="/products" onClick={() => setIsMenuOpen(!isMenuOpen)}>Shop</Link></li>
                <li><Link href="/" onClick={() => setIsMenuOpen(!isMenuOpen)}>Collections</Link></li>
                <li><Link href="/"onClick={() => setIsMenuOpen(!isMenuOpen)} >Account</Link></li>
              </ul>
           )}
        </div>
    </header>
  );
};

export default Navbar;
