import { ReactNode } from "react";
import "../Styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles";

import Navbar from "@/Components/Shared/Navbar";
import Providers from "@/Components/providers/providers";
import { verifyToken } from "@/Features/Auth/Servers/auth.action";
import { cartState } from "@/Features/Cart/Store/CartSlice";
import { getCartInfo } from "@/Features/Cart/Server/Cart.action";
import { WishlistState } from "@/Features/WhishList/Types/Whishlist.type";
import Footer from "@/Components/Shared/Footer";



const defaultWishlistState: WishlistState = {
  products: [],
  count: 0,
  loading: false,
  error: null,
};




const defaultCartState: cartState = {
  numberOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
  isGuest: false 
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authValues = await verifyToken();
  let CartState = defaultCartState;
  if (authValues.isAuthenticated) {
    try {
      const cartResponse = await getCartInfo();
      CartState = {
        numberOfCartItems: cartResponse.numOfCartItems,
        cartId: cartResponse.cartId,
        products: cartResponse.data.products,
        totalCartPrice: cartResponse.data.totalCartPrice,
        isLoading: false,
        error: null,
        isGuest: false ,
        
      };
    } catch {}
  }
  return (
    <>
      <html lang="en">
        <body>
          <Providers preloadedState={{ auth: authValues, cart: CartState , wishlist: defaultWishlistState}}>
            <Navbar />
            {children}
            <Footer/>
          </Providers>
        </body>
      </html>
    </>
  );
}
