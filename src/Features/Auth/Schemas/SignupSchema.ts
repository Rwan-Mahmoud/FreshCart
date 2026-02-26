

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { email, z } from "zod";
 
export const signupSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must be at most 25 characters"),
  email: z.string().nonempty("Email is required").pipe(z.email("Email is invalid ")),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^(\+2)?01[0125][0-9]{8}$/, "Only Egyptian phone numbers"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase")
    .regex(/[a-z]/, "Password must contain at least one lowercase")
    .regex(/[0-9]/, " Password must comtain at least one number")
    .regex(/[!@#$%^&*()_+{}]/, "Password must contain at least one special character"),

    rePassword : z.string().nonempty("Re-password is required"),
    terms:z.boolean().refine((value)=>
    value==true, {
        message:'You must accept Terms and conditions'
    }
    )
}).refine((data)=>
data.password==data.rePassword ,{
   path:["repassword"],
    error:"Password and confirm must match",
}
)
export type signupFormType = z.infer<typeof signupSchema>