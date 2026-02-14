import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    return (
      <div 
        className="relative h-180 bg-cover bg-center  flex flex-col justify-center items-center text-white text-center"
        style={{ backgroundImage: "url('/necklace.jpg')" }}
      >
      
        {/* Text content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-black">Timeless Elegance</h1>
          <p className="mb-6 text-gray-800">Discover our curated collection of exquisite jewelry pieces</p>
         
          <Link
            href="/products"
            className="flex bg-amber-500 p-3 text-2xl items-center justify-center mt-3 font-bold rounded-xl w-fit mx-auto"
          >
            Shop Collection
            <ChevronRight size={30} className="ml-2" />
          </Link>      
        </div>
      </div>
    );
  };
  
  export default Hero;
  