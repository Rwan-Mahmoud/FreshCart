export interface ProductListResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number | null;
  };
  data: Product[];
}

export interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  id: string;
  title: string;
  slug: string;
  description?: string;
  quantity: number;
  price: number;
  priceAfterDiscount:number;
  imageCover?: string;
  category: Category;
  brand?: Brand;
  ratingsAverage?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // category id
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface singleProduct  {
  data:Product;
}

export type Products = Product[];

export default ProductListResponse;