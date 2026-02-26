"use server"
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { ShippingAdressValues } from "../Schemas/Checkout.schema";

 


type shippingAddress  = {
    details : string ; 
    phone:string ; 
    address:string ;
}

export async function createCashOrder({cartId , shippingAddress }:{cartId:string , shippingAddress:ShippingAdressValues ,}) {
    
          const cookieStore = await cookies() ;
        const token = cookieStore.get('token')?.value||null ; 
        if(!token){
            throw "Authentication required"
    
        }

        try{
               const options:AxiosRequestConfig ={
        url:`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , 
        method:"POST" , 
        headers:{
            token
        },
        data:{
            shippingAddress
        }
    }

    const {data} = await axios.request(options) ; 
    return data ; 
        }catch(error){
            throw error ;
        }
 
}


export async function createOnlineOrder({cartId , shippingAddress ,  url}:{cartId:string , shippingAddress:ShippingAdressValues ,  url:string }) {
    
          const cookieStore = await cookies() ;
        const token = cookieStore.get('token')?.value||null ; 
        if(!token){
            throw "Authentication required"
    
        }

        try{
               const options:AxiosRequestConfig ={
        url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` , 
        method:"POST" , 
        headers:{
            token
        },
        data:{
            shippingAddress
        }
    }

    const {data} = await axios.request(options) ; 
    return data ; 
        }catch(error){
            throw error ;
        }
 
}