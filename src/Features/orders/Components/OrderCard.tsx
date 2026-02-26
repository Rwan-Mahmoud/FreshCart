"use client "

import {
  faChevronDown,
  faChevronUp,
  faCreditCard,
  faLocationDot,
  faMoneyBill,
  faMoneyBill1,
  faPhone,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function OrderCard({ orderInfo }: { orderInfo: Order }) {

    const [isExpanded , setIsExpanded] = useState(false) 

  return (
    <>
      <div
        className="
      bg-white rounded-xl shadow-md overflow-hidden 
      border border-gray-200/70
      w-full max-w-4xl mx-auto
    "
      >
        {/* Header - Status + Order Number + Total */}
        <div className="bg-linear-to-rrom-blue-600 to-indigo-600 px-5 py-4 text-white">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="text-white text-lg"
                />
              </div>
              <div>
                <div className="font-semibold text-lg flex items-center gap-2">
                  On the Way
                  <span className="text-xs bg-white/30 px-2 py-0.5 rounded-full">
                    Shipping
                  </span>
                </div>
                <div className="text-sm opacity-90 flex items-center gap-2 mt-0.5">
                  {/* <span className="text-green-500">{orderInfo._id}</span> */}
                  <span>•</span>
                  <span>city</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold">total order price</div>
              <div className="text-lg">EGP</div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-5">
          {/* Order Items section (collapsible feel) */}
          <button className="space-x-2" onClick={()=>{setIsExpanded(!isExpanded)}}>
                <span className="font-medium text-green-800">Order Items</span>
              <FontAwesomeIcon
                icon={isExpanded?faChevronUp:faChevronDown}
                className="text-green-700 text-sm"
              />
          </button>
          
          <div className="mb-6">
            {isExpanded&&<div
            
              className="
            flex items-center justify-between 
            bg-green-50 border border-green-200 
            px-4 py-3 rounded-lg mb-3
          "
            >
          

         <div className="flex flex-col gap-3 divide-y divide-gray-100">
  {orderInfo?.cartItems?.map((item) => (
    <div key={item._id} className="pt-4 first:pt-0">
      <div className="flex items-center gap-2">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 ">
          <img
            src={item.product.imageCover}
            alt={item.product.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <p className="font-medium">{item.product.title}</p>
          <p className="text-sm text-gray-600 mt-0.5">
            {item.count} × {item.price.toLocaleString()} EGP
          </p>
        </div>
      </div>
      <p className="mt-2 text-right font-bold text-lg">
        {(item.count * item.price).toLocaleString()} EGP
      </p>
    </div>
  ))}
</div>
            </div>}
            

            <div
              className="
            flex items-center gap-4 p-7
            bg-gray-50/70 rounded-lg border border-gray-200
          "
            >
              <div className="relative w-27 h-27  rounded-md overflow-hidden shrink-0 bg-gray-100">
                {orderInfo.cartItems[0] && (
                  <img
                    src={orderInfo.cartItems[0].product.imageCover}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                )}

                {orderInfo.cartItems.length > 1 && (
                  <div className="absolute top-2 right-2 w-6 h-6 p-2 rounded-full  bg-black text-white flex items-center justify-center">
                    +{orderInfo.cartItems.length - 1}
                  </div>
                )}

                {/* Placeholder - replace with real image */}
                {/* <div className="w-full h-full bg-linear-to-br from-purple-500/30 to-blue-500/30" /> */}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {/* <span className="font-bold text-base">#76188</span> */}
                  <span className="text-gray-400">•</span>
                  <span className="text-indigo-600 font-medium">
                    {orderInfo.shippingAddress.city} City
                  </span>
                </div>

                <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-x-3">
                  <span>
                    {new Date(orderInfo.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>
                    {" "}
                    {orderInfo.cartItems.reduce(
                      (access, el) => (access += el.count),
                      0,
                    )}{" "}
                    item
                  </span>
                  <span>•</span>
                  <span>{orderInfo.shippingAddress.city} City</span>
                </div>

                <div className="mt-2">
                  <span className="text-lg font-bold text-emerald-600">
                    {orderInfo.totalOrderPrice} EGP
                  </span>
                </div>
              </div>

              {/* <button className="
              text-sm px-4 py-1.5 
              bg-blue-600 hover:bg-blue-700 
              text-white rounded-md transition
            ">
              Details
            </button> */}

              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 text-white">
                <FontAwesomeIcon
                  icon={
                    orderInfo.paymentMethodType == "card"
                      ? faCreditCard
                      : faMoneyBill1
                  }
                />
              </div>
            </div>
          </div>

          {/* Delivery Address + Order Summary side by side */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Delivery Address */}
            <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-blue-600"
                />
                Delivery Address
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>city : {orderInfo.shippingAddress.city}</p>
                <p>address : {orderInfo.shippingAddress.details}</p>
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-gray-500 text-xs"
                  />
                  phone : {orderInfo.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div
              className="
            bg-linear-to-r from-indigo-50 to-blue-50 
            border border-indigo-200 rounded-lg p-4
          "
            >
              <h3 className="font-semibold text-indigo-800 mb-3">
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium">{orderInfo.totalOrderPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">{orderInfo.shippingPrice == 0?"Free" : orderInfo.shippingPrice}</span>
                  <span className="font-medium">Shipping Price</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-300 font-semibold">
                  <span>{orderInfo.totalOrderPrice + orderInfo.shippingPrice}</span>
                  <span className="text-indigo-700">Total Price</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
