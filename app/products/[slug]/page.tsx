import { jewelryProducts } from "@/_lib/jewelry"
import { notFound } from "next/navigation"

import ProductClient from "@/components/product-client"

type Props = {
  params: Promise<{
    slug: string
  }>
}


const ProductPage =async({ params }: Props)=> {
  const {slug} =await params
  const product =await jewelryProducts.find(p => p.slug === slug)

  if (!product) return notFound()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <ProductClient product={product} />
    </div>
  )
}


export default ProductPage;