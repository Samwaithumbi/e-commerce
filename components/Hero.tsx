import { ChevronRight } from "lucide-react"
import Link from "next/link"

const Hero = () => {
  return (
    <section
      className="relative min-h-[78vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/necklace.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl text-white">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
          Timeless Elegance
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-200">
          Discover refined pieces crafted to elevate your everyday style.
        </p>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 
                     bg-white text-black text-sm font-medium 
                     rounded-md hover:bg-gray-200 transition"
        >
          Shop Collection
          <ChevronRight size={18} />
        </Link>

      </div>
    </section>
  )
}

export default Hero
