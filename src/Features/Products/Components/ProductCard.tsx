/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import {
  faArrowsRotate,
  faEye,
  faHeart,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Product } from "../Types/product.type";
import { addProductToCart, getCartInfo } from "@/Features/Cart/Server/Cart.action";
import { toast } from "react-toastify";
import { setCartInfo } from "@/Features/Cart/Store/CartSlice";
import { useAppDispatch } from "@/Store/store";
import { addProductToWhishList, getWhishListInfo } from "@/Features/WhishList/Server/whishList.action";
import { setWishlist } from "@/Features/WhishList/Store/WishlistSlice";

export default function ProductCard({ info }: { info: Product }) {
  const {
    id,
    category,
    imageCover,
    title,
    price,
    ratingsQuantity,
    ratingsAverage,
    priceAfterDiscount,
  } = info;

  const dispatch = useAppDispatch()

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const onAverage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

    const handleAddToWhishList = async()=>{
      try{
        const response = await addProductToWhishList({productId:id})
        if(response.status=="success"){
            toast.success(response.message);
            const whishListInfo = await getWhishListInfo() ;
            dispatch(setWishlist(whishListInfo)) ;
        }
      }catch(error){
        throw error ; 
        toast.error("failed to add to Whishlist")
      }
    }

     const handleAddToCart= async ()=>{
      try{
        
          const response = await addProductToCart({productId : id});
          console.log(response) ;
           if(response.status=="success"){
            toast.success(response.message);
           const cartInfo = await getCartInfo()
           dispatch(setCartInfo(cartInfo)) 
           }
        
      }catch(error){
       throw error
        toast.error("failed to add to cart")
      }
      
    }
  return (
    <>
      <div className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-400/30 rounded-lg">
        <div className="relative">
          <img src={imageCover} alt={title} className="h-60 w-full object-contain bg-white" />
          <div className="absolute top-3 left-3">
           {onSale && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{onAverage}%
            </span>}
          </div>
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button className="size-8 bg-white rounded-full flex justify-center items-center text-gray-600 hover:text-green-500  hover:shadow" onClick={handleAddToWhishList}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="size-8 bg-white rounded-full flex justify-center items-center text-gray-600 hover:text-green-500  hover:shadow">
              <FontAwesomeIcon icon={faArrowsRotate} />
            </button>

            <Link
              href={`/products/${id}`}
              className="size-8 bg-white rounded-full flex justify-center items-center text-gray-600 hover:text-green-500  hover:shadow"
            >
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-gray-400 text-[12px]">{category.name}</h2>
          <h3 className="text-sm truncate">{title}</h3>
          <div className="flex">
            <div className="flex text-amber-400 mr-2">

            </div>
            <span>{ratingsAverage} ({ratingsQuantity})</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
                <span className="text-green-600 font-bold text-lg">{priceAfterDiscount||price} EGP</span>
                {onSale && <span className="text-gray-500 line-through text-sm">{price} EGP</span>}
            </div>
            <button className="  cursor-pointer bg-green-600 size-10 rounded-full text-white hover:bg-green-700" onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
