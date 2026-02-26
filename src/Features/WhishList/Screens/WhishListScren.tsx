"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAppSelector } from "@/Store/store";
import WhishListCard from "../Components/WhishListCard";

export default function WhishListScren() {
  const { products, count } = useAppSelector((state) => state.wishlist);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
    
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-green-600 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">Wishlist</span>
        </div>


        <h1 className="mb-8 flex items-center gap-3 text-3xl font-bold text-gray-900">
          <FontAwesomeIcon
            icon={faHeart}
            className="bg-green-500 text-white p-2 rounded-lg"
          />
          <span className="text-4xl">My Wishlist</span>
        </h1>

        <p className="mb-6 text-md text-gray-500">
          You have{" "}
          <strong className="text-green-600">
            {count} {count === 1 ? "item" : "items"}
          </strong>{" "}
          in your wishlist
        </p>

  
        {count === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Start adding your favorite products now
            </p>
            <Link
              href="/"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
            >
              ← Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
         
            {products.map((product) => (
              <WhishListCard key={product.id} product={product} />
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
        )}
      </div>
    </div>
  );
}