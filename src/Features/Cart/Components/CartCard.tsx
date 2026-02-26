"use client"

import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartItem } from "../Types/Cart.Type";
import Swal from "sweetalert2";
import { removeProductFromCart, updateProductQuantity } from "../Server/Cart.action";
import { removeProduct, setCartInfo } from "../Store/CartSlice";
import { useAppDispatch } from "@/Store/store";
import { toast } from "react-toastify";

export default function CartCard({ info }: { info: CartItem }) {
  
  const { _id, count, price, product } = info;
  const { category, imageCover, quantity, title, id } = product;
  const dispatch = useAppDispatch()
  const handleDeleteProduct = async () => {
   const result= await Swal.fire({
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
      from your cart?
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
    if(result.isConfirmed){
      dispatch(removeProduct({id}))  
     const response = await removeProductFromCart(id) ;
      toast.success("Item removed from cart")
      
    }
  };

  const handleUpdate =async (newCount:number)=>{
    if(newCount<1) return ; 
    try{
      const response  = await updateProductQuantity(id,newCount) ; 
      dispatch(setCartInfo(response))
    }catch(error){
      throw error ; 
    }
  }
  return (
    <>
      <div className="rounded-xl  bg-white p-6 shadow-lg my-6">
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row  sm:items-start">
          <Link href={`/products/${id}`}>
            <div className="h-28 w-28 shrink-0 rounded-lg  bg-gray-300/20  overflow-hidden p-4 ">
              <Image
                src={imageCover || "/placeholder.png"}
                alt={title}
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
          </Link>

          <div className="flex-1 mx-auto text-center">
            <Link href={``}>
              <h3 className="text-lg font-semibold text-gray-500 hover:text-green-600 ">
                {title}
              </h3>
            </Link>
            <p className="mx-auto mt-1 text-sm bg-green-300/20 px-3 py-2 rounded-full w-fit text-green-600">
              {category.name}
            </p>

            <h2 className="my-3 text-xl font-bold text-green-600">
              {price} EGP
            </h2>

            <div className="mx-auto flex items-center border border-gray-300 rounded-md w-fit gap-2 bg-gray-300/30 py-1 ">
              <button
                className="px-2  text-gray-600  rounded-lg bg-white mx-1.5 shadow cursor-pointer "
                onClick={() => handleUpdate(count-1)}
                disabled={count <= 1}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span>{count}</span>
              <button
                className="px-2  text-gray-600  rounded-lg bg-green-600 mx-1.5 shadow cursor-pointer "
                onClick={() => {
                  handleUpdate(count+1)
                }}
                disabled={count>=quantity}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="flex flex-col  justify-between gap-4 sm:ml-auto mt-4 sm:mt-0">
            <div className="text-right flex ">
              <p className="text-lg font-bold text-gray-500">Total : </p>
              <p className="text-lg font-bold text-gray-500">
                {count * price} EGP
              </p>
            </div>
            <button className="" onClick={handleDeleteProduct}>
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 bg-red-300/30 border border-red-500/30 p-3 rounded-lg hover:bg-red-500 hover:text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
