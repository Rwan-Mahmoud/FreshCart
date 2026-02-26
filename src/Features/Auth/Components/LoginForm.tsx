"use client";


import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faLock, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
import Link from "next/link";
import { SubmitHandler,useForm} from "react-hook-form";
 
import { loginSchema, loginValues } from "../Schemas/Logon.schema";
 
import { zodResolver } from "@hookform/resolvers/zod";
import loginAction from "../Servers/login.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { object } from "zod";
import { setToken } from "../Servers/auth.action";
import { setAuthInfo } from "../Store/auth.slice";
import { userInfo } from "os";
import { useDispatch } from "react-redux";




export default function LoginForm() {

  const router = useRouter()
  const dispatch = useDispatch()

  const{register , handleSubmit, formState:{errors}} = useForm<loginValues>({
  defaultValues:{
    email:"", 
    password: "",
    rememberMe : false ,
  } ,

  resolver :zodResolver (loginSchema),
  mode : "onSubmit", 
  reValidateMode : "onChange"

})


 const onsubmit:SubmitHandler<loginValues> = async (values)=>{
  try{
     const response = await loginAction(values);
     if(response.success){
      await setToken(response.data.token , values.rememberMe)
      dispatch(
      setAuthInfo({isAuthenticated : true , userInfo : response.data.user})

      )
      toast.success(response.message);
      setTimeout(()=>{
        router.push("/")
      }, 3000)
     }else{
      if(response.errors){
        Object.keys(response.errors).forEach((key)=>{
          setError(key as keyof loginValues , {message : response.errors[key]})
        })
      }
     }


  }catch{

  }
 }

  return (
    <>
      <main className="shadow-2xl py-2">
        <div className="container flex flex-col justify-center space-y-9 px-5">
          <div className=" text-center">
            <h2 className=" font-bold text-3xl">
              <span className="text-green-600">Fresh</span>Cart <br /> Welcome
              Back!
            </h2>
            <p className="text-gray-500">
              Sign in to continue your fresh shopping experience
            </p>
          </div>
          <div className=" justify-center *:space-x-3 *:cursor-pointer gap-2 grid sm:grid-cols-2 sm:w-full">
            <button className="space-x-1 border-[1] border-gray-300 px-10 py-2 rounded-md hover:bg-gray-200 hover:border-transparent transition-colors duration-300">
              <FontAwesomeIcon icon={faGoogle} className="text-red-600 " />
              <span className="font-bold ">Google</span>
            </button>
            <button className="space-x-1 border-[1] border-gray-300 px-10 py-2 rounded-md hover:bg-gray-200 hover:border-transparent transition-colors duration-300">
              <FontAwesomeIcon icon={faFacebook} className="text-blue-500" />
              <span className="font-bold">Facebook</span>
            </button>
          </div>

          <div className="text-center w-full bg-gray-400/20 h-0.5 flex justify-center items-center ">
            <span className="p-2 bg-white text-gray-500">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          <div>
            <form action="" className="space-y-5" onSubmit={handleSubmit(onsubmit)}>
              <div className="flex flex-col">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  autoComplete="new-email"
                  className="outline-none border border-gray-400/30 py-2 rounded-md  pl-2 focus:border-green-500"
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>

              {errors.email && <p className="text-red-500 ">{errors.email.message}</p>}

              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  className="outline-none border border-gray-400/30 py-2 rounded-md pl-2  focus:border-green-500"
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </div>

              {errors.password && <p className="text-red-500 ">{errors.password.message}</p>}
              <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                <input type="checkbox" className=" accent-emerald-400 size-4"
                {...register("rememberMe")}
                />
                <label htmlFor="terms">Keep me signed in</label>
              </div>

              <div >
                <Link href={"/ForgetPassword"} className="text-green-600 hover:text-dgreen-700 text-sm">Forget Password ?</Link>
              </div>
              </div>
            

              {errors.rememberMe && <p className="text-red-500 my-2">{errors.rememberMe.message} </p>}

              <div className="">
                <button
                  className=" bg-green-600 text-white  w-full rounded-md py-2 space-x-2 cursor-pointer hover:bg-green-700 transition-colors duration-500 disabled:cursor-not-allowed"
                 
                >
                  
                  <span className="">Sign In</span>
                </button>
              </div>
              <div className="flex justify-center">
              <div className=" w-full  bg-gray-400/20 h-0.5"></div>
            </div>

            <div>
              <p className="text-center text-gray-500">New to FreshCart? <Link href={"/signup"} className="text-green-600 hover:text-green-700 transition-colors duration-500">Create an account</Link></p>
            </div>

            <div className=" flex justify-center gap-4 text-gray-500 text-sm *:space-x-2">
              <div>
                <FontAwesomeIcon icon={faLock} />
                <span>SSL Secured</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faUsers} />
                <span>50K+ Users</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faStar} />
                <span>4.9 Rating</span>
              </div>
            </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setError(arg0: string, arg1: { message: string; }) {
  throw new Error("Function not implemented.");
}

