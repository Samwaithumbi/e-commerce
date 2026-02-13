const Hero = () => {
    return (
      <div 
        className="relative h-[700px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center"
        style={{ backgroundImage: "url('/necklace.jpg')" }}
      >
      
        {/* Text content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-amber-50">Timeless Elegance</h1>
          <p className="text-lg mb-6">Discover our curated collection of exquisite jewelry pieces</p>
          <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded">
            Shop Collection
          </button>
        </div>
      </div>
    );
  };
  
  export default Hero;
  