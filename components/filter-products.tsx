"use client"

import { SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import { jewelryProducts } from '@/_lib/jewelry'
import { useState } from "react"
import Link from 'next/link'

type CategoryType ={
  id:number
  category:string
}

const categories:CategoryType[] = [
  { id:1, category:"All" },
  { id:2, category:"Rings" },
  { id:3, category:"Necklaces" },
  { id:4, category:"Bracelets" },
  { id:5, category:"Earrings" }
]

const Filter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter products based on category
  const filteredProducts = selectedCategory === "All"
    ? jewelryProducts
    : jewelryProducts.filter(p => p.category === selectedCategory)

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">

      {/* Filter Header */}
      <div className="mb-6 flex items-center gap-2">
        <SlidersHorizontal size={18} className="text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">
          Filter by Category
        </h3>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map(item => {
          const isActive = selectedCategory === item.category
          return (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.category)}
              className={`
                px-4 py-2 rounded-full font-medium whitespace-nowrap
                transition-all duration-200
                border
                ${isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
              `}
            >
              {item.category}
            </button>
          )
        })}
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 mt-8 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.map(product => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-gray-700 font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Filter
