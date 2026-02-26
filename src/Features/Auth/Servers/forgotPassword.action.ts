"use server";

import axios from "axios";
import { z } from "zod";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export async function forgotPasswordAction(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const result = forgotSchema.safeParse(raw);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });

    return { success: false, errors, message: "Invalid email format" };
  }

  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      { email: result.data.email }
    );

    if (data.message === "Reset code sent to your email") {
      return {
        success: true,
        message: "Reset code sent to your email",
        email: result.data.email,
      };
    }

    return { success: false, message: data.message || "Failed to send reset code" };
  } catch (error) {
    throw error
  }
}