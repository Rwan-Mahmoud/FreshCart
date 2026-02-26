"use server"

import axios, { AxiosRequestConfig } from "axios";
import { cookies, headers } from "next/headers"
import { CartResponse } from "../Types/Cart.Type";

export async function addProductToCart({productId}:{productId:string}){
    const cookieStore = await cookies() ;
    const token = cookieStore.get('token')?.value||null ; 
    if(!token){
        throw "Authentication required"

    }

    try{
        const options : AxiosRequestConfig ={
             url:"https://ecommerce.routemisr.com/api/v1/cart" , 
             method:"POST" ,
               headers:{
          token
        }, 

        data:{
           productId
        }
        }
       
        const{data} = await axios.request(options) ; 
        return data;
    }catch(error){
        throw error ;
    }
}

export async function getCartInfo():Promise<CartResponse> {
        const cookieStore = await cookies() ;
    const token = cookieStore.get('token')?.value||null ; 
    if(!token){
        throw "Authentication required"

    }

    try{
        const options : AxiosRequestConfig ={
            url:"https://ecommerce.routemisr.com/api/v1/cart", 
            method:"GET" , 
            headers:{
                token
            }
        }
        const {data} = await axios.request(options) ;
        return data ; 
    }catch(error){
        throw error
    }
}

export async function removeProductFromCart (productId:string):Promise<CartResponse>{
        const cookieStore = await cookies() ;
    const token = cookieStore.get('token')?.value||null ; 
    if(!token){
        throw "Authentication required"

    }

    try{
        const options : AxiosRequestConfig ={
            url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
            method:"delete", 
            headers:{
                token
            }
        }

        const{data} = await axios.request(options) ; 
        return data ;
    }catch(error){
        throw error
    }
}


export async function updateProductQuantity(productId:string , count:number):Promise<CartResponse>{


      const cookieStore = await cookies() ;
    const token = cookieStore.get('token')?.value||null ; 
    if(!token){
        throw "Authentication required"

    }


    try{
        const options:AxiosRequestConfig ={
            url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
            method:"PUT" , 
            headers:{
                token
            } ,
            data:{
                count
            } 
        }
        const {data} = await axios.request(options) ; 
        return data ; 
    }catch(error) {
        throw error ;
    }
}