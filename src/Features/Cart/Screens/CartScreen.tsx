// app/cart/page.tsx or CartScreen.tsx

"use client";

import { useEffect } from "react";
import {
  faCartArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/Store/store";
import {
  setCartInfo,
  updateGuestCart,
  setLoading,
} from "@/Features/Cart/Store/CartSlice";
import { getCartInfo } from "../Server/Cart.action";
import CartCard from "../Components/CartCard";
import CartSammary from "../Components/CartSammary";
import { useRouter } from "next/navigation";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const {
    products,
    numberOfCartItems,
    totalCartPrice,
    isLoading = false,
  } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const initCart = async () => {
      if (products.length > 0 || isLoading) return;

      dispatch(setLoading(true));

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        try {
          const cart = await getCartInfo();
          dispatch(setCartInfo(cart));
        } catch (err) {
          console.error("Failed to load user cart", err);
          const guest = JSON.parse(localStorage.getItem("guest_cart") || "[]");
          dispatch(updateGuestCart(guest));
        }
      } else {
        const guest = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        dispatch(updateGuestCart(guest));
      }

      dispatch(setLoading(false));
    };

    initCart();
  }, [dispatch, products.length, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-green-600 cursor-pointer" onClick={()=>{router.push("/")}}>Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-green-600 cursor-pointer" onClick={()=>{router.push("/orders")}}>Orders</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900" onClick={()=>{router.push("/cart")}}>Shopping Cart</span>
        </div>

        <h1 className="mb-8 flex items-center gap-3 text-3xl font-bold text-gray-900">
          <FontAwesomeIcon
            icon={faCartArrowDown}
            className="bg-green-600 text-white p-2 rounded-lg"
          />
          <span className="text-4xl">Shopping Cart</span>
        </h1>

        <p className="mb-6 text-md text-gray-500">
          You have{" "}
          <strong className="text-green-600">
            {numberOfCartItems} {numberOfCartItems === 1 ? "item" : "items"}
          </strong>{" "}
          in your cart
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {products.map((product) => (
              <CartCard key={product._id} info={product} />
            ))}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <CartSammary
            totalCartPrice={totalCartPrice}
            numberOfCartItems={numberOfCartItems}
          />
        </div>
      </div>
    </div>
  );
}