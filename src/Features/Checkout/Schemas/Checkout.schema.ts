import z from "zod";

export const ShippingAdressSchema = z.object({
  details: z
    .string()
    .nonempty("Please enter your address in detail")
    .min(10, "Address must be at least 10 characters long")
    .max(200, "Address must be at most 200 characters long"),

  phone: z
    .string()
    .nonempty("Please enter your phone number")
    .regex(/^(?:\+2)?01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),

  city: z
    .string()
    .nonempty("Please enter your city ")
    .min(2, "City must be at least 2 characters long")
    .max(50, "City must be at most 50 characters long"),
});


export type ShippingAdressValues  =z.infer<typeof ShippingAdressSchema>