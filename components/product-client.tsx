"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart } from "lucide-react"

type Product = {
  name: string
  price: number
  image: string
  description: string
}

export default function ProductClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="grid md:grid-cols-2 gap-12">

      {/* Image Section */}
      <div className="relative w-ful h-125">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-6">

        <h1 className="text-3xl font-semibold">{product.name}</h1>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-medium">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-red-600 font-medium">
            Only 5 left in stock
          </p>
        </div>

        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* Size Selector */}
        <div>
          <h3 className="font-medium mb-3">Select Size</h3>
          <div className="flex gap-4">
            {[6,7,8].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md transition 
                  ${selectedSize === size 
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <h3 className="font-medium mb-3">Quantity</h3>
          <div className="flex items-center border rounded-md w-fit">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-4 py-2 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-6">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-900 transition">
            Add to Cart
          </button>
          <button className="p-3 border rounded-md hover:bg-gray-100 transition">
            <Heart size={18} />
          </button>
        </div>

        {/* Trust Signals */}
        <div className="border-t pt-6 text-sm text-gray-500 space-y-2">
          <p>✓ Free shipping on orders over $500</p>
          <p>✓ 14-day return policy</p>
          <p>✓ Secure checkout</p>
        </div>

      </div>
    </div>
  )
}
