"use client"

import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useActionState, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ShippingAdressSchema, ShippingAdressValues } from "../Schemas/Checkout.schema";
import ShippingForm from "../Components/ShippingForm";
import PaymentMethod from "../Components/PaymentMethod";
import { useAppDispatch, useAppSelector } from "@/Store/store";
import { createCashOrder, createOnlineOrder } from "../Server/Shipping.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart } from "@/Features/Cart/Store/CartSlice";

export default function CheckoutScreen() {
  const router = useRouter() ; 
  const dispatch = useAppDispatch()
  const{cartId} = useAppSelector ((state)=>state.cart)

  const[paymentMethod , setPaymentMethod]  = useState<'cash' | 'card'>('cash')

    const {register , handleSubmit ,reset,  formState:{errors}} = useForm({
        defaultValues:{
            details :"" , 
            phone:"" , 
            city:""
        },
        resolver : zodResolver(ShippingAdressSchema) , 
        
    })

    const onSubmit:SubmitHandler<ShippingAdressValues> = async (values)=> {
        console.log(values) ; 
      
        try{

            if(!cartId){
          return;
        }

          if(paymentMethod=='cash'){
           const response= await createCashOrder({cartId , shippingAddress:values})
           console.log(response)  ;
           if(response.status=="success"){
            dispatch(clearCart())
             toast.success("Order created successfully") ; 
           reset()
           setTimeout(()=>{
            router.push("/orders")
           },3000)
           }
           
          }else{
            const response = await createOnlineOrder({cartId , shippingAddress : values , url:location.origin})
           console.log(response)  ;
           if(response.status == "success"){
            dispatch(clearCart())
             toast.loading("Redirecting you to payment gate") ; 
           reset()
           setTimeout(()=>{
            location.href = response.session.url
           },3000)
           }
           

          }
          
        }catch(error){
          throw error ; 
        }
    }

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans">
        <div className="container">
          {/* Breadcrumb */}
          <div className="px-8 pt-6 pb-2">
            <nav className="text-sm text-gray-400">
              <span className="hover:text-gray-600 cursor-pointer" onClick={()=>{router.push("/")}}>Home</span>
              <span className="mx-2">/</span>
              <span className="hover:text-gray-600 cursor-pointer" onClick={()=>{router.push("/cart")}}>Cart</span>
              <span className="mx-2">/</span>
              <span className="text-gray-700 font-semibold">Checkout</span>
            </nav>
          </div>

          {/* Header */}
          <div className="px-8 pt-4 pb-6 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                  <FontAwesomeIcon icon={faClipboardCheck} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Complete Your Order
                </h1>
              </div>
              <p className="text-sm text-gray-400 mt-1 ml-0">
                Review your items and complete your purchase
              </p>
            </div>

            {/* Back to Cart */}
            <button className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mt-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Cart
            </button>
          </div>

          {/* Main Content Grid */}
          <form onSubmit={handleSubmit(onSubmit)} >
          <div className="px-8 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            

            {/* ✅ Left side - Shipping Form */}
            <div className="lg:col-span-2 ">
              
                <ShippingForm register={register} errors={errors}/>
                <PaymentMethod selectedMethod={paymentMethod} changeMethod={setPaymentMethod}/>
              
            </div>

            {/* Right side - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* Header */}
                <div className=" bg-linear-to-r from-green-700 to-green-500 px-5 py-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h2 className="text-white font-semibold text-base">Order Summary</h2>
                </div>

                {/* Body */}
                <div className="px-5 py-5 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-800">500 EGP</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
                        <circle cx="5.5" cy="18.5" r="1.5" />
                        <circle cx="18.5" cy="18.5" r="1.5" />
                      </svg>
                      <span>Shipping</span>
                    </div>
                    <span className="font-semibold text-green-500">FREE</span>
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-100" />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800 text-base">Total</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-green-500">600</span>
                      <span className="text-xs text-gray-400 font-medium">EGP</span>
                    </div>
                  </div>

                  {/* Proceed to Payment Button */}
                  <button className="w-full bg-linear-to-r  from-green-700 to-green-500  text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm mt-2 hover:from-green-900 hover:to-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Proceed to Payment
                  </button>

                  {/* Trust badges */}
                  <div className="flex justify-center items-center gap-5 pt-1">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                      Secure
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                      Fast Delivery
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                      Easy Returns
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          </form>
        </div>
      </div>
    </>
  );
}