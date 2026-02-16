import Filter from "@/components/filter-products";

const Products = () => {
    return ( 
        <>
         <div>
            <div className="text-center space-y-0">
               <h1 className="text-2xl font-semibold">Our Collection</h1>
               <p className="text-lg text-gray-800">Explore our carefully curated selection of fine jewelry</p>
            </div>
              <Filter/>
         </div>
        </>
     );
}
 
export default Products;