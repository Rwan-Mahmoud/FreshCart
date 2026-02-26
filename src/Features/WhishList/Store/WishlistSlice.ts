// src/Features/Wishlist/Store/WishlistSlice.ts

import { WishlistProduct, WishlistResponse } from "@/Features/WhishList/Types/Whishlist.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface WishlistState {
  products: WishlistProduct[];
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  products: [],
  count: 0,
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    setWishlist(state, action: PayloadAction<WishlistResponse>) {
      state.products = action.payload.data;
      state.count = action.payload.count;
      state.loading = false;
      state.error = null;
    },

    removeProduct(state, action: PayloadAction<string>) { 
      state.products = state.products.filter(p => p.id !== action.payload);
      state.count = state.products.length; 
    },

    startLoading(state) {
      state.loading = true;
      state.error = null;
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },

    clearWishlist(state) {
      state.products = [];
      state.count = 0;
      state.error = null;
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;

export const {
  setWishlist,
  removeProduct,
  startLoading,
  setError,
  clearWishlist,
} = wishlistSlice.actions;