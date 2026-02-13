import {  jewelryProducts } from "@/_lib/jewelry";
import Image from "next/image";
import { Award, ChevronRight, LucideIcon, ShieldHalf, Van } from 'lucide-react';

const FeaturedCollection = () => {

    type Feature = {
        icon:LucideIcon;
        title:string;
        description:string
    }

    const features: Feature[] = [
        {
          icon: Van,
          title: "Free Shipping",
          description: "On orders over $500",
        },
        {
          icon: ShieldHalf,
          title: "Secure Payment",
          description: "100% secure transactions",
        },
        {
          icon: Award,
          title: "Quality Guarantee",
          description: "Lifetime warranty on all pieces",
        },
      ];


    return ( 
        <>
          <section>
            <div className="text-center">
                <h2>Featured Collection</h2>
                <p>Handpcked pieces that exemplify our commitment to quality and design</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {jewelryProducts.map((product) => (
                    <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow hover:shadow-md transition"
                    >
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-40 object-cover rounded"
                    />
                    <h3 className="mt-2 font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
                    </div>
                ))}
                </div>
                <button className="flex p-2 border m-auto">View All Products  <ChevronRight/></button>
          </section>
         
          <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="bg-yellow-600 text-white p-4 rounded-full">
                  <Icon size={40} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
        </>
     );
}
 
export default FeaturedCollection;