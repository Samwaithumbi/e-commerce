"use client"

import { SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { jewelryProducts } from '@/_lib/jewelry';
import { useState } from "react";

type CategoryType ={
    id:number;
    category:string
}

const categories:CategoryType[] = [
    {  
        id:1,
        category:"All"
    },
     {
        id:2,
        category:"Rings"
    },{
        id:3,
        category:"Necklaces"
    },{
        id:4,
        category:"Bracelets"
    },{
        id:5,
        category:"Earrings"
    }
]

const Filter = () => {

    const [selectedCategory, setSelectedCategory] = useState("All");
    return ( 
        <>
          <div className='mx-3 text-black'>
           
            <div className="flex items-center gap-2 mt-3">
                <SlidersHorizontal size={18} className="text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">
                Filter by Category
                </h3>
            </div>

            <div
    className="flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-thin"
    role="group"
    aria-label="Product categories"
  >
    {categories.map((item) => {
      const isActive = selectedCategory === item.category;

      return (
        <button
          key={item.id || item.category}
          onClick={() => setSelectedCategory(item.category)}
          className={`
            px-4 py-2 rounded-full text-lg font-medium whitespace-nowrap
            transition-all duration-200
            border 
            ${
              isActive
                ? "bg-yellow-600 text-white "
                : "bg-white  border-gray-300 hover:bg-gray-600"
            }
            focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2
          `}
        >
          {item.category}
        </button>
      );
    })}
  </div>
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
          
        </>
     );
}
 
export default Filter;