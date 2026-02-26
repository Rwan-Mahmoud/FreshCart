"use client"
import { useDispatch } from "react-redux";
import { deleteToken } from "../Servers/auth.action";
import { setAuthInfo } from "../Store/auth.slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default  function useLogout(){
    const dispatch = useDispatch ()
    const router = useRouter()


    const  logout = async ()=> {
            await deleteToken();


    dispatch(setAuthInfo({isAuthenticated : false , userInfo : null}))
    router.push("/Login");
    router.refresh()
    toast.success("User logged out successfully")

    }


return {logout} ; 

}