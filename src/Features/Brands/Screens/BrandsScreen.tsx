import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import getBrands from "../Server/brands.action";
import BrandCard from "../Components/BrandCard";
import { IBrand } from "../Types/brands.types";


export default async function BrandsScreen() {
    const response = await getBrands()
    console.log(response)
  return (
    <>
     <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="w-full bg-linear-to-r from-purple-600 to-purple-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Link href={"/"} className="text-white/70 text-sm my-8">
            Home 
          </Link>
          <span className="mx-2 text-white font-medium">/</span> 
          <span className="text-white font-medium">Brands</span>
          {/* Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
             <FontAwesomeIcon icon={faTags}  className="text-white text-lg"/>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Top Brands</h1>
              <p className="text-white/75 text-sm mt-1">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands card */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
           {response.data.map((brand:IBrand)=>(
            <BrandCard key={brand._id} info={brand}/>
           ))}
        </div>
      </div>
    </div>
    </>
  )
}
