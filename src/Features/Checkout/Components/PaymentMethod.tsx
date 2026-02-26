import {
  faCheck,
  faCreditCard,
  faMoneyBill,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface paymentMethodProps {
  selectedMethod: "cash" | "card";
  changeMethod: (method: "cash" | "card") => void;
}

export default function PaymentMethod({
  selectedMethod,
  changeMethod,
}: paymentMethodProps) {
  return (
    <>
      <div className="w-full mx-auto mt-7 ">
        {/* Header */}
        <div className="bg-green-700 rounded-t-xl px-5 py-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
              <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2" />
            </svg>
            <h2 className="text-white font-semibold text-base">
              Payment Method
            </h2>
          </div>
          <p className="text-green-200 text-sm mt-0.5">
            Choose how you&apos;d like to pay
          </p>
        </div>

        {/* Body */}
        <div className="bg-white border border-gray-200 rounded-b-xl p-4 space-y-6">
          {/* Cash on Delivery - Selected */}
          <button className={`w-full flex items-center justify-between border  bg-white rounded-xl px-4 py-3 cursor-pointer hover:border-green-300 transition-colors ${selectedMethod =='cash'?"border-green-500" : "border-gray-200"}`} 
          onClick={()=>{changeMethod('cash')}}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selectedMethod=='cash'?"bg-linear-to-br  from-green-500  to-blue-600 text-white" :"bg-gray-200 text-gray-400 "}`}>
                <FontAwesomeIcon icon={faMoneyBill}/>
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm text-start">
                  Cash on Delivery
                </p>
                <p className="text-gray-500 text-xs">
                  Pay when your order arrives at your doorstep
                </p>
              </div>
            </div>
            <div className={`flex justify-center items-center text-sm w-6 h-6 border-2 border-gray-300 rounded-full shrink-0 ${selectedMethod == 'cash' ? "bg-green-500 text-white" : "bg-white"}`}>
              <FontAwesomeIcon icon={faCheck} className="text-white " />
            </div>
          </button>

          {/* Pay Online - Unselected */}
          <button  className={`w-full flex items-center justify-between border  bg-white rounded-xl px-4 py-3 cursor-pointer hover:border-green-300 transition-colors ${selectedMethod =='card'?"border-green-500" : "border-gray-200"}`} 
          onClick={()=>{ changeMethod('card')}}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selectedMethod=='card'?"bg-linear-to-br  from-green-500  to-blue-600 text-white" :"bg-gray-200 text-gray-400 "}`}>
                <FontAwesomeIcon icon={faCreditCard} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm text-start">
                  Pay Online
                </p>
                <p className="text-gray-500 text-xs">
                  Secure payment with Credit/Debit Card via Stripe
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="bg-blue-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    VISA
                  </div>
                  <div className="flex">
                    <div className="w-4 h-4 bg-red-500 rounded-full opacity-90 -mr-1.5" />
                    <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-90" />
                  </div>
                  <div className="bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    AMEX
                  </div>
                </div>
              </div>
            </div>
            <div  className={`flex justify-center items-center text-sm w-6 h-6 border-2 border-gray-300 rounded-full shrink-0 ${selectedMethod == 'card' ? "bg-green-500 text-white" : "bg-white"}`}>
              <FontAwesomeIcon icon={faCheck} className="text-white" />
            </div>
          </button>

          {/* Secure & Encrypted */}
          <div className="flex items-center gap-3 border border-gray-100 bg-gray-50 rounded-xl px-4 py-3">
            <div className="w-8 h-8 text-green-500 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div>
              <p className="font-semibold text-gray-700 text-sm">
                Secure & Encrypted
              </p>
              <p className="text-green-600 text-xs">
                Your payment info is protected with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
