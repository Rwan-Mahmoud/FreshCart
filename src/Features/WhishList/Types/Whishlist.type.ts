// Category Type
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

// Subcategory Type
export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Brand Type
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Product Type (Wishlist Item)
export interface WishlistProduct {
  sold: number;
  images: string[];
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

// Wishlist API Response Type
export interface WishlistResponse {
  status: "success" | "failed";
  count: number;
  data: WishlistProduct[];
}

// Wishlist Store State Type
export interface WishlistState {
  products: WishlistProduct[];
  loading: boolean;
  error: string | null;
  count: number;
}