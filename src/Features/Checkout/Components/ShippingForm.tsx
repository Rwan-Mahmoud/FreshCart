import { FieldErrors, UseFormRegister } from "react-hook-form"
import { ShippingAdressValues } from "../Schemas/Checkout.schema"

interface shippingAddressForm {
  register: UseFormRegister<ShippingAdressValues>
  errors: FieldErrors<ShippingAdressValues>
}

export default function ShippingForm({ register, errors }: shippingAddressForm) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden">

      {/* Header */}
      <div className="bg-linear-to-r from-green-700 to-green-500 px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75v-4.5h-4.5V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z" />
          </svg>
          <h1 className="text-white text-xl font-bold">Shipping Address</h1>
        </div>
        <p className="text-green-100 text-sm pl-8">
          Where should we deliver your order?
        </p>
      </div>

      {/* Form Body */}
      <div className="px-6 py-6 space-y-6">

        {/* Info Banner */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <div className="bg-blue-600 rounded-full p-1 mt-0.5 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
            </svg>
          </div>
          <div>
            <p className="text-blue-700 font-semibold text-sm">Delivery Information</p>
            <p className="text-blue-500 text-xs mt-0.5">
              Please ensure your address is accurate for smooth delivery
            </p>
          </div>
        </div>

        {/* City Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-800">
            City <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10.5V21M21 10.5V21M3 10.5L12 3l9 7.5M9 21v-6h6v6" />
            </svg>
            <input
              type="text"
              placeholder="e.g. Cairo, Alexandria, Giza"
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              {...register("city")}
            />
          </div>
          {errors.city && (
            <p className="text-red-500 text-xs mt-1 font-bold">*{errors.city.message}</p>
          )}
        </div>

        {/* Street Address Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-800">
            Street Address <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white min-h-24">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.75-7-11a7 7 0 1114 0c0 4.25-7 11-7 11z" />
              <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth={2} fill="none" />
            </svg>
            <textarea
              placeholder="Street name, building number, floor, apartment..."
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent resize-none"
              rows={3}
              {...register("details")}
            />
          </div>
          {errors.details && (
            <p className="text-red-500 text-xs mt-1 font-bold">*{errors.details.message}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-800">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0-.608.424-1.13 1.022-1.226a48.4 48.4 0 0119.456 0c.598.096 1.022.618 1.022 1.226v3.104a1.125 1.125 0 01-.831 1.085l-3.26.815a1.125 1.125 0 01-1.2-.453l-.892-1.338a14.25 14.25 0 00-8.134 0l-.892 1.338a1.125 1.125 0 01-1.2.453l-3.26-.815A1.125 1.125 0 012.25 9.442V6.338z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.375 15.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H5.25m1.125 0h1.125m-1.125 0v3m0-3a.375.375 0 00-.375.375v2.625m.375-3H8.25" />
            </svg>
            <input
              type="text"
              placeholder="01xxxxxxxxx"
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              {...register("phone")}
            />
            <span className="text-gray-400 text-xs whitespace-nowrap">
              Egyptian numbers only
            </span>
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 font-bold">*{errors.phone.message}</p>
          )}
        </div>

      </div>
    </div>
  )
}