

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartResponse } from "../Types/Cart.Type";

export interface cartState {
  isGuest: boolean;
  cartId: string | null;
  numberOfCartItems: number;
  products: CartItem[];
  totalCartPrice: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: cartState = {
  isGuest: true,
  cartId: null,
  numberOfCartItems: 0,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};

const saveGuestCart = (products: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("guest_cart", JSON.stringify(products));
  }
};

const loadGuestCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("guest_cart");
  return data ? JSON.parse(data) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
  
    setCartInfo(state, action: PayloadAction<CartResponse>) {
      state.isGuest = false;
      state.cartId = action.payload.cartId;
      state.numberOfCartItems = action.payload.numOfCartItems;
      state.products = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
      state.isLoading = false;
      state.error = null;

  
      if (typeof window !== "undefined") {
        localStorage.removeItem("guest_cart");
      }
    },

 
    updateGuestCart(state, action: PayloadAction<CartItem[]>) {
      state.isGuest = true;
      state.cartId = null;
      state.products = action.payload;
      state.numberOfCartItems = action.payload.length;
      state.totalCartPrice = action.payload.reduce(
        (sum, item) => sum + item.price * item.count,
        0
      );
      state.isLoading = false;
      state.error = null;

      saveGuestCart(action.payload);
    },


    removeProduct(state, action: PayloadAction<{ id: string }>) {
      const productId = action.payload.id;
      const itemToRemove = state.products.find(
        (item) => item.product.id === productId
      );

      if (itemToRemove) {
        state.products = state.products.filter(
          (item) => item.product.id !== productId
        );
        state.numberOfCartItems = state.products.length;
        state.totalCartPrice -= itemToRemove.price * itemToRemove.count;

   
        if (state.isGuest) {
          saveGuestCart(state.products);
        }
      }
    },

    clearCart:function(state){
      state.cartId = null ; 
      state.numberOfCartItems = 0 ;
      state.products = [] ; 
      state.totalCartPrice = 0;
        } ,


    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  setCartInfo,
  updateGuestCart,
  removeProduct,
  clearCart ,
  setLoading

} = cartSlice.actions;