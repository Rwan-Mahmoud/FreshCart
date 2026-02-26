"use server"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { email, success } from "zod"
import { signupFormType, signupSchema } from "../Schemas/SignupSchema"
import axios, {AxiosError, AxiosRequestConfig} from "axios"

export default async function signupAction (values:signupFormType){
    const validationSubmit = signupSchema.safeParse(values)
     if(!validationSubmit.success){
        const errors:Record<string,string> = {}

        if (validationSubmit.error){
            validationSubmit.error.issues.forEach((issue)=>{
                const field = issue.path[0] as string;
                const message = issue.message;

                if(!errors[field]){
                    errors[field] = message
                }
            })

            return {
                success:false,
                message: "Validation errors", 
                errors
            }
        }
     }

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const {terms, ...requestBody} = values
     try{
        const options :AxiosRequestConfig ={
            url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
            method:"post",
            data:requestBody,
        }

        const {data} = await axios.request(options)

        if(data.message== 'success'){
            return{
                success:true, 
                message:"account created successfully", 
                data
            }
        }

        return{
            success:false, 
            message: data.message || "something went wrong"
        }
     } catch(error){
        if(error instanceof AxiosError){
            const errormessage = error.response?.data.message;
            if(errormessage=="Account Already Exists"){
                return{
                    success: false, 
                    message: "Account Already Exists",
                    errors :{
                        email:" an account with this email already exists"
                    }
                }
            }
        }

        return{
            success: false,
            message : "Something wrong"
        }
     }
}