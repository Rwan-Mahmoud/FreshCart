// src/Features/Brands/Screens/BrandProducts.tsx

import ProductCard from "@/Features/Products/Components/ProductCard";
import { getProductsByBrand } from "@/Features/Products/Server/ProductsServer";

export default async function BrandProducts({ params }: { params: { id: string } }) {
  const brandId = params.id;

  let products = [];
  const error = null;

  try {
    const response = await getProductsByBrand(brandId);
    products = response.data || [];
  } catch (error) {
    throw error
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Brand Products</h1>

      {error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products available for this brand at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} info={product} />
          ))}
        </div>
      )}
    </div>
  );
}