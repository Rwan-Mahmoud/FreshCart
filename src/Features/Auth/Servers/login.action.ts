"use server"

import { loginSchema, loginValues } from "../Schemas/Logon.schema";
import axios, { AxiosRequestConfig } from "axios";


export default async function loginAction (values:loginValues) {
   const validateResult =  loginSchema.safeParse(values);
   if (!validateResult.success){

const errors:Record<string, string> = {}
validateResult.error.issues.forEach((issue)=>{
    const key = issue.path[0] as string;
    const message = issue.message;

    if (!errors[key]){
        errors[key] = message
    }
})
    return{
        success : false, 
        message : "Valodation error",
        errors 
    }
   }

   try{
    const {rememberMe , ...requestData} = values
      const options : AxiosRequestConfig = {
        url :"https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "post",
        data: requestData
      }
      const {data} = await axios.request(options);
      if(data.message=='success'){
        return{
            success: true, 
            message:" user logged successfully",
            data 
        };
      }

      return{
        success : false , 
        message :"Login failed"
      }
   }catch{
     return{
        success : false , 
        message :"Login failed"
      }
   }
}