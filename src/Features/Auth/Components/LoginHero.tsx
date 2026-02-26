import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImg from "../../../Assets/Images/login.png";
import Image from "next/image";
import {
  faClock,
  faShieldHalved,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";
export default function LoginHero() {
  return (
    <>
      <section className=" ">
        <div className=" container flex justify-center ">
          <div className="w-3/4 flex flex-col justify-center items-center ">
            <div className="w-full flex flex-col items-center space-y-3">
              <div className=" w-full shadow rounded-xl overflow-hidden">
                <Image src={logoImg} alt="" className="  w-full" />
              </div>
              <h1 className=" text-center font-bold text-2xl">
                FreshCart - Your One-Stop Shop for Fresh <br />
                Products
              </h1>
              <p className="text-center text-lg text-gray-700 ">
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs
              </p>

              <div className="flex space-x-4 justify-center *:space-x-2">
                <div>
                  <FontAwesomeIcon icon={faVanShuttle}  className="text-emerald-500"/>
                  <span className="font-light text-xs text-gray-500">Free Delivery</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faShieldHalved} className="text-emerald-500" />
                  <span className="font-light text-xs text-gray-500">Secure Payment</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faClock} className="text-emerald-500" />
                  <span className="font-light text-xs text-gray-500">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
