import { faUser , faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CartSummaryProps = {
  numberOfCartItems: number;
  totalCartPrice: number;
};

export default function CartSummary({
  numberOfCartItems,
  totalCartPrice,
}: CartSummaryProps) {
  const subTotal = totalCartPrice;
  const shipping = subTotal > 500 ? 0 : 100;
  const total = Math.round(subTotal + shipping);

  const router = useRouter()

  return (
    <div className="lg:col-span-1">
      <div className="rounded-xl bg-white shadow-sm lg:sticky lg:top-8">
        <div className="bg-gray-900 text-white px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-semibold">Order Summary</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between text-gray-700">
            <span>
              Subtotal ({numberOfCartItems}{" "}
              {numberOfCartItems === 1 ? "item" : "items"})
            </span>
            <span className="font-medium">{subTotal} EGP</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span className="text-green-600 text-md font-bold">
              {subTotal >= 500 ? "Free" : shipping}
            </span>
          </div>

          <div className="border-t border-t-gray-400/30 pt-4 mt-2">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Estimated Total</span>
              <span className="text-green-600">{total} EGP</span>
            </div>
          </div>

          <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition flex items-center justify-center gap-1"
          onClick={()=>{
            
            router.push("/Checkout")
          }}
          >
            <FontAwesomeIcon icon={faLock} />
            <span>Secure Checkout</span>
          </button>


          <ul className="mt-8 space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-lg">✔</span> Your cart items
              will be saved
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-lg">✔</span> Track your
              orders easily
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-lg">✔</span> Access exclusive
              member deals
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}