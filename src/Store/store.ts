import { authReducer, authState } from "@/Features/Auth/Store/auth.slice"
import { cartReducer, cartState } from "@/Features/Cart/Store/CartSlice"
import { wishlistReducer } from "@/Features/WhishList/Store/WishlistSlice";
import { WishlistState } from "@/Features/WhishList/Types/Whishlist.type";
import {configureStore} from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";



export type  preloadedState ={
    auth : authState ;
    cart: cartState ; 
    wishlist:WishlistState ;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createStore (preloadedState : preloadedState){
     const store = configureStore({
    reducer:{
       auth : authReducer , 
       cart:cartReducer , 
       wishlist: wishlistReducer,
    },

    preloadedState
})

return store
}



export type AppStore = ReturnType <typeof createStore> ; 
export type AppState = ReturnType<AppStore['getState']> ;
export const useAppSelector = useSelector.withTypes<AppState>();

export type AppDispatch = AppStore['dispatch'] ; 
export const useAppDispatch = useDispatch. withTypes<AppDispatch>()