"use server";

import axios from "axios";
import { z } from "zod";

const resetSchema = z.object({
  email: z.string().email("Invalid email"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export async function resetPasswordAction(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const result = resetSchema.safeParse(raw);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });
    return { success: false, errors, message: "Invalid password" };
  }

  try {
    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        email: result.data.email,
        newPassword: result.data.newPassword,
      }
    );

    if (data.message === "Password updated successfully") {
      return { success: true, message: "Password changed successfully" };
    }

    return { success: false, message: data.message || "Failed to reset password" };
  } catch (error) {
     throw error
  }
}