/* eslint-disable react-hooks/refs */
"use client"

import { AppStore, createStore, preloadedState } from "@/Store/store";
import { ReactNode, useRef} from "react";
import { Provider} from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

type PropsProvider = {
    children : ReactNode , 
    preloadedState : preloadedState
}
export default function Providers({children , preloadedState} : PropsProvider) {
const storeRef = useRef<null | AppStore>(null)

// eslint-disable-next-line react-hooks/refs
if(!storeRef.current){
  storeRef.current =createStore(preloadedState)
}
  return (
    <>
      <Provider store={storeRef.current}>
        {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
      </Provider>
    </>
  );
}
