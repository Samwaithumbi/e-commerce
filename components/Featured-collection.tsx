import { jewelryProducts } from "@/_lib/jewelry"
import Image from "next/image"
import Link from "next/link"
import { Award, ChevronRight, LucideIcon, ShieldCheck, Truck } from "lucide-react"

const FeaturedCollection = () => {

  type Feature = {
    icon: LucideIcon
    title: string
    description: string
  }

  const features: Feature[] = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $500",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "Encrypted transactions",
    },
    {
      icon: Award,
      title: "Lifetime Warranty",
      description: "Crafted to last forever",
    },
  ]

  return (
    <>
      {/* PRODUCTS SECTION */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-semibold">
              Featured Collection
            </h2>
            <p className="mt-4 text-gray-600">
              Handpicked pieces that reflect refined craftsmanship and timeless design.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid gap-10 mt-14 sm:grid-cols-2 md:grid-cols-3">
            {jewelryProducts.slice(0,3).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-72 object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-medium">
                    {product.name}
                  </h3>
                  <p className="text-gray-700 font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              View All Products
              <ChevronRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid gap-10 md:grid-cols-3 text-center">

            {features.map((feature, index) => {
              const Icon = feature.icon

              return (
                <div key={index} className="space-y-4">
                  <Icon className="mx-auto w-6 h-6 text-gray-700" />
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}

          </div>
        </div>
      </section>
    </>
  )
}

export default FeaturedCollection;
