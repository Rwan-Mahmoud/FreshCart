

import SignupForm from "../Components/SignupForm";
import SignupHero from "../Components/SignupHero";


export default function SignupScreen(){
  return <>
  <div>
    <div className="container grid lg:grid-cols-2 items-center mt-4 p-10 space-x-10 mx-auto">
      <SignupHero/>
      <SignupForm/>
    </div>
  </div>
  </>
}