"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/Store/store";
import { removeProduct } from "@/Features/WhishList/Store/WishlistSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { WishlistProduct } from "@/Features/WhishList/Types/Whishlist.type";
import { removeProductFromWhishList } from "../Server/whishList.action";
import { addProductToCart, getCartInfo } from "@/Features/Cart/Server/Cart.action";
import { setCartInfo } from "@/Features/Cart/Store/CartSlice";


export default function WhishListCard({ product }: { product: WishlistProduct }) {
  const dispatch = useAppDispatch();

  const {
    id,
    title,
    imageCover,
    category,
    price,
    priceAfterDiscount,
    quantity,
  } = product;

  const isInStock = quantity > 0;

  const handleDeleteProduct = async () => {
    const result = await Swal.fire({
      html: `
        <div class="text-center py-2">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-2">Remove Item?</h3>

          <p class="text-gray-500 text-sm leading-relaxed">
            Remove 
            <span class="font-semibold text-gray-700">
              ${title.slice(0, 40)}${title.length > 40 ? "..." : ""}
            </span> 
            from your wishlist?
          </p>
        </div>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-2xl border-0 p-0",
        htmlContainer: "p-6 pb-6 pt-3 p-0",
        actions: "px-6 pb-6 pt-0 gap-4 flex flex-row-reverse",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all",
      },
    });

    if (result.isConfirmed) {
      dispatch(removeProduct(id));
      try {
        await removeProductFromWhishList({ productId: id });
        toast.success("Item removed from wishlist");
      } catch (error) {
        toast.error("Failed to remove item");
      }
    }
  };

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
    <div className="rounded-xl bg-white p-6 shadow-lg my-6">
      <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:items-start">
        <Link href={`/products/${id}`}>
          <div className="h-28 w-28 shrink-0 rounded-lg bg-gray-300/20 overflow-hidden p-4">
            <Image
              src={imageCover}
              alt={title}
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        <div className="flex-1 mx-auto text-center">
          <Link href={`/products/${id}`}>
            <h3 className="text-lg font-semibold text-gray-500 hover:text-green-600">
              {title}
            </h3>
          </Link>

          <p className="mx-auto mt-1 text-sm  bg-green-300/20 text-green-600 px-3 py-2 rounded-full w-fit">
            {category?.name || "Uncategorized"}
          </p>

          <h2 className="my-3 text-xl font-bold text-green-600">
            {priceAfterDiscount||price} EGP
          </h2>

          {priceAfterDiscount && (
            <p className="text-sm text-gray-500 line-through">{price} EGP</p>
          )}
        </div>

        <div className="flex flex-col justify-between gap-4 sm:ml-auto mt-4 sm:mt-0">
          <div className="text-right flex items-center gap-2 justify-end">
            <p className="text-lg font-bold text-gray-500">Status:</p>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                isInStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {isInStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className={`px-5 py-2 rounded-lg text-white font-medium transition cursor-pointer ${
                isInStock
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>

            <button onClick={handleDeleteProduct}>
              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer text-red-500 bg-red-300/30 border border-red-500/30 p-3 rounded-lg hover:bg-red-500 hover:text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}