"use server";

import axios from "axios";
import { z } from "zod";

const verifySchema = z.object({
  email: z.string().email("Invalid email"),
  resetCode: z.string().min(4, "Code is too short").max(8, "Code is too long"),
});

export async function verifyResetCodeAction(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const result = verifySchema.safeParse(raw);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });
    return { success: false, errors, message: "Invalid code or email" };
  }

  try {
    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        email: result.data.email,
        resetCode: result.data.resetCode,
      }
    );

    if (data.message === "Reset code verified") {
      return {
        success: true,
        message: "Code verified successfully",
        email: result.data.email,
      };
    }

    return { success: false, message: data.message || "Invalid or expired code" };
  } catch (error) {
    throw error
    
  }
}