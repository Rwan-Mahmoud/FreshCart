"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { forgotPasswordAction } from "../Servers/forgotPassword.action";
import { verifyResetCodeAction } from "../Servers/verifyResetCode.action";
import { resetPasswordAction } from "../Servers/resetPassword.action";

// ──────────────────────────────────────────────
// Schemas (ممكن تحطيها في ملف schemas منفصل لو عايزة)
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const codeSchema = z.object({
  resetCode: z
    .string()
    .min(4, "Verification code is too short")
    .max(8, "Verification code is too long"),
});

const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  // لو عايزة confirm password تضيفيها هنا
  // confirmPassword: z.string().refine((val, ctx) => val === ctx.parent.newPassword, {
  //   message: "Passwords do not match",
  //   path: ["confirmPassword"],
  // }),
});

// ──────────────────────────────────────────────
// Types
type EmailForm = z.infer<typeof emailSchema>;
type CodeForm = z.infer<typeof codeSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

// ──────────────────────────────────────────────
export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [savedEmail, setSavedEmail] = useState<string>("");

  // Form 1: Email
  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  // Form 2: Verification Code
  const codeForm = useForm<CodeForm>({
    resolver: zodResolver(codeSchema),
    defaultValues: { resetCode: "" },
  });

  // Form 3: New Password
  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: "" },
  });

  // ─── Handler: Send reset code ────────────────────────────────
  const onSendEmail = emailForm.handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);

    const res = await forgotPasswordAction(formData);

    if (res.success) {
      toast.success(res.message || "Reset code sent to your email");
      setSavedEmail(res.email || data.email);
      setStep(2);
    } else {
      toast.error(res.message || "Failed to send reset code");
      if (res.errors?.email) {
        emailForm.setError("email", { message: res.errors.email });
      }
    }
  });

  // ─── Handler: Verify code ────────────────────────────────────
  const onVerifyCode = codeForm.handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("email", savedEmail);
    formData.append("resetCode", data.resetCode);

    const res = await verifyResetCodeAction(formData);

    if (res.success) {
      toast.success(res.message || "Code verified successfully");
      setStep(3);
    } else {
      toast.error(res.message || "Invalid or expired code");
      if (res.errors?.resetCode) {
        codeForm.setError("resetCode", { message: res.errors.resetCode });
      }
      if (res.errors?.email) {
        codeForm.setError("resetCode", { message: res.errors.email }); // fallback
      }
    }
  });

  // ─── Handler: Reset password ─────────────────────────────────
  const onResetPassword = passwordForm.handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("email", savedEmail);
    formData.append("newPassword", data.newPassword);

    const res = await resetPasswordAction(formData);

    if (res.success) {
      toast.success(res.message || "Password has been reset successfully");
      setTimeout(() => {
        router.push("/Login");
      }, 2200);
    } else {
      toast.error(res.message || "Failed to reset password");
      if (res.errors?.newPassword) {
        passwordForm.setError("newPassword", { message: res.errors.newPassword });
      }
    }
  });

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white shadow-lg rounded-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        Reset Your Password
      </h1>

      {/* Step 1 – Email */}
      {step === 1 && (
        <form onSubmit={onSendEmail} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="you@example.com"
              {...emailForm.register("email")}
            />
            {emailForm.formState.errors.email && (
              <p className="text-red-600 text-sm mt-1.5">
                {emailForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={emailForm.formState.isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {emailForm.formState.isSubmitting ? "Sending code..." : "Send Reset Code"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={onVerifyCode} className="space-y-6">
          {/* <input type="hidden" value={savedEmail} {...codeForm.register("email")} /> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="Enter the code sent to your email"
              {...codeForm.register("resetCode")}
            />
            {codeForm.formState.errors.resetCode && (
              <p className="text-red-600 text-sm mt-1.5">
                {codeForm.formState.errors.resetCode.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={codeForm.formState.isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {codeForm.formState.isSubmitting ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      )}

      {/* Step 3 – New Password */}
      {step === 3 && (
        <form onSubmit={onResetPassword} className="space-y-6">
          {/* <input type="hidden" value={savedEmail} {...passwordForm.register("email")} /> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="Enter your new password"
              {...passwordForm.register("newPassword")}
            />
            {passwordForm.formState.errors.newPassword && (
              <p className="text-red-600 text-sm mt-1.5">
                {passwordForm.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          {/* لو عايزة حقل تأكيد كلمة المرور، أضيفيه هنا */}

          <button
            type="submit"
            disabled={passwordForm.formState.isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {passwordForm.formState.isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}