"use client"
import { addProductToCart, getCartInfo } from "@/Features/Cart/Server/Cart.action";
import { setCartInfo } from "@/Features/Cart/Store/CartSlice";
import { Product } from "@/Features/Products/Types/product.type";
import { useAppDispatch } from "@/Store/store";
import {
  faBolt,
  faCartArrowDown,
  faClock,
  faHouse,
  faMinus,
  faPlus,
  faShareNodes,
  faShieldHalved,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { toast } from "react-toastify";

const MAX_STARS = 5;

export default function ProductInfo({ product }: { product: Product }) {
  const {
    id,
    title,
    description,
    images,
    ratingsQuantity,
    ratingsAverage,
    price,
    priceAfterDiscount,
    category,
    subcategory,
    quantity,
    brand,
  } = product;

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const onAverage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

    const lowStock = quantity>0 && quantity<10 ;

    const [counter , setCounter] = useState(1) ;

    const dispatch = useAppDispatch()
    
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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <ul className="flex items-center space-x-2">
            <li>
              <Link href={"/"} className="hover:text-green-500 flex items-center gap-1.5">
                <FontAwesomeIcon icon={faHouse} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <span className="mx-2">›</span>
            </li>
            <li>
              <Link href={""} className="hover:text-green-500">
                {category.name}
              </Link>
            </li>
          
            <li>
              <span className="mx-2">›</span>
            </li>
            <li className="text-gray-900 font-medium">
             {title}
            </li>
          </ul>
        </nav>

        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/4">
                <div className="bg-white shadow-sm rounded-xl p-4 sticky top-4">
                  <ImageGallery items={images.map((image)=>{
                    return {
                      original: image , 
                      thumbnail: image
                    }
                  })}
                  showFullscreenButton={false}
                  showNav={false}
                  showPlayButton={false}
                  ></ImageGallery>
                </div>
              </div>
              {/* Right - Product Info */}
              <div className="w-3/4">
                   <div className="space-y-5 border-gray-400/30 shadow-lg p-4 rounded-lg">
                {/* Category & Brand */}
                <div className="flex items-center gap-3 text-sm">
                  <Link
                    href={``}
                    className="text-green-600 bg-green-300/20 py-1 px-2 rounded-full text-sm "
                  >
                    {category.name}
                  </Link>

                  <span className="font-medium text-gray-800 bg-gray-400/20 py-1 px-2 rounded-full text-sm">
                    {brand?.name}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {Array(MAX_STARS)
                      .fill(0)
                      .map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < ratingsQuantity
                              ? "text-yellow-400 text-xl"
                              : "text-gray-300 text-xl"
                          }
                        >
                          {i < ratingsQuantity ? "★" : "☆"}
                        </span>
                      ))}
                  </div>
                  <span className="text-gray-600">
                    {ratingsAverage}{" "}
                    <span className="text-gray-400">
                      ({ratingsQuantity} reviews)
                    </span>
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {priceAfterDiscount || price} EGP
                  </span>
                  {onSale && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-xl text-gray-500 line-through">
                          {price}
                        </span>
                        <span className="text-white bg-red-600 px-3 py-1 rounded-full text-sm font-medium">
                          Save {onAverage}%
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* <div className="text-green-600 font-medium flex items-center gap-2 bg-green-300/20 w-fit py-1 px-2 rounded-full text-sm">
               
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  In Stock
                </div> */}

                {/* description */}
                <div className="text-gray-700 text-sm space-y-1 border-t border-t-gray-300/30 pt-8">
                  <p>{description}</p>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold text-sm">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded-md w-fit">
                      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 " onClick={() => setCounter(counter-1)} disabled={counter<=1}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={counter}
                        onChange={(e)=>{setCounter(+e.target.value)}}
                        className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                      />
                      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100" onClick={()=>{setCounter(counter+1)}} >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500/80">
                      {quantity} available
                    </p>
                  </div>
                </div>

                {/* Total Price (for quantity 5) */}
                <div className="py-4 px-2 text-md  font-medium flex justify-between bg-gray-300/20 items-center rounded-lg">
                  <span className="text-gray-500 font-bold">Total Price</span>
                  <span className="text-green-600 font-bold">{counter * priceAfterDiscount||price} EGP</span>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                  onClick={handleAddToCart}
                    href={``}
                    className="flex-1 shadow-lg shadow-green-600/50 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faCartArrowDown} />
                    <span>Add to Cart</span>
                  </Link>
                  <Link
                    href={``}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faBolt} />
                    <span>Buy Now</span>
                  </Link>
                </div>

                {/* Wishlist + Share */}
                <div className="flex gap-4 pt-2">
                  <button className="flex-1 py-3 rounded-xl border border-gray-400/30 hover:border-green-600 text-center text-gray-600 hover:text-green-600 text-md font-semibold">
                    <span>♡ Add to Wishlist</span>
                  </button>
                  <button className=" py-3 rounded-xl border border-gray-400/30 hover:border-green-600 text-center text-gray-600 hover:text-green-600 px-3">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </button>
                </div>

                {/* Badges */}

                <div className="flex space-x-4 justify-center *:space-x-2">
                  <div>
                    <FontAwesomeIcon
                      icon={faVanShuttle}
                      className="text-emerald-500"
                    />
                    <span className="font-light text-xs text-gray-500">
                      Free Delivery
                    </span>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                      className="text-emerald-500"
                    />
                    <span className="font-light text-xs text-gray-500">
                      Secure Payment
                    </span>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-emerald-500"
                    />
                    <span className="font-light text-xs text-gray-500">
                      24/7 Support
                    </span>
                  </div>
                </div>
              </div>
              </div>
         
            </div>
          </div>
   
        </section>
      </div>
    </>
  );
}
