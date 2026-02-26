import { getAllCategories } from "@/Features/Categories/Server/categories.action";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default async function OurCategories() {
  const response = await getAllCategories();
  // console.log(response);
  return (
    <>
      <section className="py-10">
        <div className="container">
          <div className="flex gap-2.5 mb-7">
            <div className="bg-linear-to-t from-green-500 to-green-950 w-2 h-7 rounded-sm "></div>
            <h2 className="font-bold text-3xl">
              Shop By <span className="text-green-600">Category</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7">
            {response.data.map((category) => (
              <Link
                href={`/Categories/${category._id}/subcategories`}
                key={category._id}
                className="bg-white rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-center items-center"
              >
                <div className="size-20 rounded-full overflow-hidden">
                  <Image width={80} height={80} src={category.image} alt={category.name} className="w-full h-full object-cover"></Image>
                </div>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
