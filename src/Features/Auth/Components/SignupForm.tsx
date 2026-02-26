"use client";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

import { faSpinner, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormType, signupSchema } from "../Schemas/SignupSchema";
import signupAction from "../Servers/signup.action";
import { toast } from "react-toastify";
// ! React hook form
export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<signupFormType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
      terms: false,
    },
    resolver: zodResolver(signupSchema),
  });

  const onValid: SubmitHandler<signupFormType> = async (values) => {
    try {
      const response = await signupAction(values);
      console.log("Server action response:", response);
      if (response?.success) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/Login");
        }, 2000);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof signupFormType, {
              message: response.errors[key],
            });
          });
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  return (
    <>
      <div className="space-y-8  shadow-2xl p-5">
        <div className=" text-center">
          <h2 className="font-bold text-4xl">Create your account</h2>
          <p className=" text-gray-400">
            Start your fresh journey with us today
          </p>
        </div>

        <div className=" justify-center *:space-x-3 *:cursor-pointer gap-2 grid sm:grid-cols-2 sm:w-full ">
          <button className=" border-[1] border-gray-300 px-10 py-2 rounded-md hover:bg-gray-200 hover:border-transparent transition-colors duration-300">
            <FontAwesomeIcon icon={faGoogle} className="text-red-600" />
            <span className="font-bold ">Google</span>
          </button>
          <button className=" border-[1] border-gray-300 px-10 py-2 rounded-md hover:bg-gray-200 hover:border-transparent transition-colors duration-300">
            <FontAwesomeIcon icon={faFacebook} className="text-blue-500" />
            <span className="font-bold">Facebook</span>
          </button>
        </div>

        <div className="text-center h-0.5 w-full bg-gray-400/20 flex justify-center items-center ">
          <span className="p-3 bg-white text-gray-500">OR</span>
        </div>

        <div>
          <form
            action=""
            className="space-y-4"
            onSubmit={handleSubmit(onValid)}
            autoComplete="off"
          >
            <div className="flex flex-col ">
              <label htmlFor="firstName"> Name*</label>
              <input
                type="text"
                id="firstName"
                placeholder="Rawan"
                className="outline-none border border-gray-400/30 py-2 pl-2 rounded-md "
                {...register("name")}
              />
            </div>

            {errors.name && (
              <p className="text-red-500 mt-0.5">{errors.name.message}</p>
            )}

            <div className="flex flex-col">
              <label htmlFor="email">Email Address*</label>
              <input
                type="email"
                id="email"
                autoComplete="new-email"
                className="outline-none border border-gray-400/30 py-2 rounded-md  pl-2"
                placeholder="Rawan@gmail.com"
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 mt-0.5">{errors.email.message}</p>
            )}

            <div className="flex flex-col">
              <label htmlFor="phone">Phone*</label>
              <input
                type="tel"
                id="phone"
                className="outline-none border border-gray-400/30 py-2 rounded-md  pl-2"
                placeholder="+2 010 967 32887"
                {...register("phone")}
              />
            </div>

            {errors.phone && (
              <p className="text-red-500 mt-0.5">{errors.phone.message}</p>
            )}

            <div className="flex flex-col">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                autoComplete="new-password"
                className="outline-none border border-gray-400/30 py-2 rounded-md pl-2 "
                placeholder="Create a strong password"
                {...register("password")}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 mt-0.5">{errors.password.message}</p>
            )}

            <div className="flex flex-col">
              <label htmlFor="repassword">Confirm Password*</label>
              <input
                type="password"
                id="repassword"
                autoComplete="off"
                className="outline-none border border-gray-400/30 py-2 rounded-md pl-2 "
                placeholder="Confirm your password"
                {...register("rePassword")}
              />
            </div>

            {errors.rePassword && (
              <p className="text-red-500 mt-0.5">{errors.rePassword.message}</p>
            )}

            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                className=" accent-emerald-400 size-4"
                {...register("terms")}
              />
              <label htmlFor="terms">
                I agree to{" "}
                <Link href={"/Terms"} className="text-green-600">
                  Terms Service
                </Link>{" "}
                and{" "}
                <Link href={"/Privacy"} className="text-green-600">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {errors.terms && (
              <p className="text-red-500 mt-0.5">{errors.terms.message}</p>
            )}

            <div className="">
              <button className=" bg-green-600 text-white  w-full rounded-md py-2 space-x-2 cursor-pointer hover:bg-green-700 transition-colors duration-500 disabled:cursor-not-allowed" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} />
                    <span className="">Creating your account </span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span className="">Create My Account</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex justify-center">
              <div className="w-75  bg-gray-400/20 h-0.5"></div>
            </div>

            <div className="text-center">
              <p className="text-gray-400">
                Already have an account{" "}
                <Link href={"/Login"} className="text-emerald-500">
                  {" "}
                  Sign In
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
