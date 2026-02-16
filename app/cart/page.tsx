"use client"

import Image from "next/image"
import { Trash2 } from "lucide-react"
import { useState } from "react"

export default function CartPage() {
  const [quantity, setQuantity] = useState(1)
  const price = 232
  const subtotal = price * quantity

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">

          <div className="flex flex-col sm:flex-row gap-6 border rounded-xl p-6 bg-white shadow-sm">

            <div className="relative w-full sm:w-40 h-40">
              <Image
                src="/necklace.jpg"
                alt="Diamond Ring"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">

              {/* Title + Remove */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-medium text-lg">Diamond Ring</h2>
                  <p className="text-sm text-gray-500">Size 4</p>
                </div>
                <button
                  aria-label="Remove item"
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Quantity + Price */}
              <div className="flex justify-between items-center mt-6">

                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold text-lg">
                  ${price.toFixed(2)}
                </p>

              </div>
            </div>
          </div>

        </div>

        {/* Order Summary */}
        <div className="border rounded-xl p-6 h-fit bg-gray-50">

          <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

          <div className="space-y-4 text-sm">

            <div className="flex justify-between">
              <span>Subtotal ({quantity} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

          </div>

          <button className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-900 transition">
            Proceed to Checkout
          </button>

          <button className="w-full mt-3 text-sm text-gray-600 hover:underline">
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  )
}
