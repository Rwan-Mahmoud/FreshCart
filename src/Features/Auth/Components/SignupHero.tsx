import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faShieldHalved, faStar, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import Heroimage from '../../../Assets/Images/review-author.png'

export default function SignupHero() {
  return (
    <>
      <main className="p-5">
        <div className=" container space-y-6">
          <div className="">
            <h1 className=" font-bold text-3xl">
              Welcome to <span className=" text-green-600">FreshCart</span>
            </h1>
            <p className=" font-light text-gray-400" >
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to thier doorstip.
            </p>
          </div>

          <div className=" space-y-4">
            <div className="flex  items-center gap-1.5">
              <div className="icon w-8 h-8 rounded-full flex justify-center items-center bg-green-300">
                <FontAwesomeIcon icon={faLeaf} className=" text-emerald-500"/>
              </div>
              <div>
                <h2 className="font-bold">Fresh Organics</h2>
                <p className=" font-light text-gray-400">Premium qualityproducts sourced directly from farms</p>
              </div>
            </div>

            <div className=" flex items-center gap-1.5">
              <div className="icon  w-8 h-8 rounded-full flex justify-center items-center bg-geen-300">
                <FontAwesomeIcon icon={faTruckFast} className=" text-emerald-500" />
              </div>
              <div>
               <h2 className="font-bold">Fast Delivery</h2>
                <p className=" font-light text-gray-400">Same-day delivery available in most arias</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="icon  w-8 h-8 rounded-full flex justify-center items-center bg-green-300">
                <FontAwesomeIcon icon={faShieldHalved} className=" text-emerald-500" />
              </div>
              <div>
                 <h2 className="font-bold">Secure Shopping</h2>
                <p className=" font-light text-gray-400">Your data and payments are completely secure</p>
              </div>
            </div>
          </div>


          <div className=" p-4 shadow-lg">
            <div className="flex items-center gap-2.5 ">
              <div>
               <Image src={Heroimage} alt="Hero image" className="w-9 rounded-full "/>
              </div>
              <div>
                <h3>Rawan Mahmoud</h3>
                <div className="text-amber-400">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
              </div>
            </div>
            <div>
              <p className=" italic text-gray-400">
                &quot; Thank you, FreshCart, for making grocery shopping so easy and convenient!
                I really appreciate FreshCart for their fast delivery and excellent service! &quot;
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
