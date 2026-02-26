"use client"

import LoginForm from "../Components/LoginForm";
import LoginHero from "../Components/LoginHero";

export default function LoginScreen(){
    return <>
    <div className="container grid lg:grid-cols-2 items-center mt-4 p-10 space-x-10 mx-auto ">
        <LoginHero/>
        <LoginForm/>
    </div>
    </>
} 