"use server"

import axios, { AxiosRequestConfig } from "axios"
import { ICategoriesResponse, SubCategoriesResponse } from "../Types/categories.types";



export  async function getAllCategories ():Promise<ICategoriesResponse> {
   
   try{
    const options : AxiosRequestConfig = {
        url :"https://ecommerce.routemisr.com/api/v1/categories",
        method : "GET"
    }
    const {data} = await axios.request(options)
    return data ;
   }
    catch (error){
        throw error ; 
    }
}


export async function getSubCategories(categoryId: string) :Promise<SubCategoriesResponse>{
    try{
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories` , 
            method:"GET" , 
        }

        const{data} = await axios.request(options) ; 
        return data ; 
    }catch(error){
        throw error
    }
}