import { AxiosRequestConfig } from "axios"
import { getAllCategories } from "../Server/categories.action"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons"
import { ICategory } from "../Types/categories.types"
import CategoryCard from "../Components/CategoryCard"


export default async function AllCategories() {
    const response = await getAllCategories()
    console.log(response)
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="w-full bg-linear-to-r from-green-600 to-green-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
        
          <Link href={"/"} className="text-white/70 text-sm my-8">
            Home 
          </Link>
          <span className="mx-2 text-white font-medium">/</span> 
          <span className="text-white font-medium">Categories</span>
          {/* Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
             <FontAwesomeIcon icon={faLayerGroup} className="text-white"/>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">All Categories</h1>
              <p className="text-white/75 text-sm mt-1">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
           {response.data.map((category:ICategory)=>(
            <CategoryCard key={category._id} info={category}/>
           ))}
        </div>
      </div>
    </div>
    </>
  )
}
