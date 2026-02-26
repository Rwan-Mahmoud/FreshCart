"use client";
import { Navigation , Pagination , Autoplay} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "swiper/css";
import Sliderimage1 from "../../../Assets/Images/home-slider-1.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function HomeSlider() {
  return (
    <>
      <section className=" relative">
        <Swiper
        slidesPerView={1} 
        spaceBetween={0}
          modules={[Navigation , Pagination , Autoplay]}
          navigation={{
            prevEl: ".previousEL",
            nextEl: ".nextEl",
            
          }}
          pagination={{clickable : true}}
          autoplay = {{
            delay :5000
          }}
        >
          <SwiperSlide>
            <div
              className=" h-[400px] bg-center bg-cover "
              style={{ backgroundImage: `url(${Sliderimage1.src})` }}
            >
              <div className="bg-cover w-full h-full flex items-center bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container">
                  <h2 className=" font-bold text-3xl  p-4 text-white ">
                    Fresh Products Delivered <br /> to your Door
                  </h2>
                  <p className=" px-4 text-white ">
                    Get 20% off your first order
                  </p>
                  <div className="p-4 flex gap-2.5 *:cursor-pointer *:hover:scale-105 *:transition-transform duration-500 font-bold">
                    <button className="bg-white py-3 px-8 text-green-500 rounded-lg">
                      Shop Now
                    </button>
                    <button className="px-8 py-3 bg-transparent border border-white text-white rounded-lg font-bold">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className=" h-[400px] bg-center bg-cover "
              style={{ backgroundImage: `url(${Sliderimage1.src})` }}
            >
              <div className="bg-cover w-full h-full flex items-center bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container">
                  <h2 className=" font-bold text-3xl  p-4 text-white ">
                    Premium Quality Guaranteed
                  </h2>
                  <p className=" px-4 text-white ">
                    Fresh from farm to your table
                  </p>
                  <div className="p-4 flex gap-2.5 *:cursor-pointer *:hover:scale-105 *:transition-transform duration-500">
                    <button className="bg-white py-3 px-8 text-blue-500 font-bold rounded-lg">
                      Shop Now
                    </button>
                    <button className="px-8 py-3 bg-transparent font-bold border border-white text-white rounded-lg">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className=" h-[400px] bg-center bg-cover "
              style={{ backgroundImage: `url(${Sliderimage1.src})` }}
            >
              <div className="bg-cover w-full h-full flex items-center bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container">
                  <h2 className=" font-bold text-3xl  p-4 text-white ">
                    Fast & Free Delivery
                  </h2>
                  <p className=" px-4 text-white ">
                    Same day delivery available
                  </p>
                  <div className="p-4 flex gap-2.5 *:cursor-pointer *:hover:scale-105 *:transition-transform duration-500">
                    <button className="bg-white py-3 px-8 text-purple-500 font-bold rounded-lg">
                      Order Now
                    </button>
                    <button className="px-8 py-3 bg-transparent border font-bold border-white text-white rounded-lg">
                      Delivery Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <button className=" previousEL size-11 rounded-full bg-white/90 absolute left-5 top-1/2 z-10 ">
          <FontAwesomeIcon icon={faAngleLeft} className="text-green-400" />
        </button>

        <button className="nextEl size-11 rounded-full bg-white/90 absolute right-5 top-1/2 z-10 ">
          <FontAwesomeIcon icon={faAngleRight} className="text-green-400" />
        </button>
      </section>
    </>
  );
}
