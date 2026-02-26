"use server"

import axios, { AxiosRequestConfig } from "axios"
import ProductListResponse, { singleProduct } from "../Types/product.type";


export  async function AllProducts () : Promise<ProductListResponse>{
    try{
            const options : AxiosRequestConfig ={
        url:"https://ecommerce.routemisr.com/api/v1/products" , 
        method :"GET"
    }

    const {data} = await axios.request(options) ; 
    return data
    
    }catch(error){
        throw error
    }


}

export  async function getProductById({id} : {id:string}): Promise<singleProduct>{
    try{
        const options : AxiosRequestConfig ={
            url:`https://ecommerce.routemisr.com/api/v1/products/${id}`  , 
            method:"GET"
        }
        const{data} = await axios.request(options) ; 
        return data
    }catch(error){
        throw error
    }
}


export async function getProductsByBrand(brandId: string): Promise<ProductListResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}&limit=20`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(`Failed to fetch products for brand ${brandId}:`, error);
    throw error;
  }
}
