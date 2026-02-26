"use client"

import { faBagShopping, faBoxOpen, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserOrders } from "../Server/orders.action";
import OrderCard from "../Components/OrderCard";
import { useAppSelector } from "@/Store/store";
import { useEffect, useState } from "react";
import Link from "next/link";


export default  function OdersScreen() {
  const [orders ,setOrders] = useState<OrdersResponse|null> (null) ;


    const {userInfo} = useAppSelector((state)=>state.auth)




  useEffect(()=>{
      if(!userInfo){
    return ;
  }
  const fetchOrders = async ()=>{
    const response = await getUserOrders({id : userInfo.id})
    setOrders(response)
  }; 

  fetchOrders()
} , [])
  
if(!orders){
  return <>
  <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <FontAwesomeIcon 
            icon={faBoxOpen} 
            className="text-4xl text-gray-400" 
          />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No orders yet
        </h2>
        
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          When you place orders, they will appear here<br />
          so you can track them.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3.5 px-8 rounded-full font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faShoppingBag} />
          Start Shopping
        </Link>
      </div>
    </div>
  </>
}
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
    
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-green-600 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">Orders</span>
        </div>


        <h1 className="mb-8 flex items-center gap-3 text-3xl font-bold text-gray-900">
       <FontAwesomeIcon icon={faBagShopping}  className="bg-green-500 text-white p-2 rounded-lg"/>
          <span className="text-4xl">My Orders</span>
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Track and manage your {orders.length} {orders.length==1 ?"order" : "orders"}
        </p>
        </div>
          <div className="grid grid-cols-1 gap-4">
           {orders.map((order)=>(
            <OrderCard key={order.id} orderInfo={order}/>
           ))}
          </div>
        </div>
    </>
  )
}
