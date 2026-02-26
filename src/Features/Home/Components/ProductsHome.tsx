import ProductCard from "@/Features/Products/Components/ProductCard";
import { AllProducts } from "@/Features/Products/Server/ProductsServer";

export default async function ProductsHome() {
  const response = await AllProducts();
  console.log(response)
  return <>
  <section className="py-4">
    <div className="container">
           <div className="flex gap-2.5 mb-7">
            <div className="bg-linear-to-t from-green-500 to-green-950 w-2 h-7 rounded-sm "></div>
            <h2 className="font-bold text-3xl">
              Featured <span className="text-green-600">Products</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5  gap-7">
            {response.data.map((product)=>(
                <ProductCard key={product._id} info={product} />
            ))}
          </div>
    </div>
  </section>
  
  </>;
}
