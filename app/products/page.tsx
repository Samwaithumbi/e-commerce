import Filter from "@/components/filter-products";

const Products = () => {
    return ( 
        <>
         <div>
            <div className="text-center space-y-0">
               <h1>Our Collection</h1>
               <p>Explore our carefully curated selection of fine jewelry</p>
            </div>
              <Filter/>
         </div>
        </>
     );
}
 
export default Products;