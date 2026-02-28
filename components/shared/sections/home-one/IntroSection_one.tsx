/* eslint-disable @next/next/no-img-element */
import { avatars, IntroSection_one_Data } from "@/data/data";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import CurrencyConverter from "../../currencyConverter/CurrancyConverter";
import Decoration from "../../decoration/Decoration";
const IntroSection_one = () => {
  return (
    <div className="bg-artboard relative ">
      <div className="relative w-full max-h-260 desktop:max-h-full">
        <div className="relative desktop-lg:m-5 m-0">
          <img
            src={IntroSection_one_Data.bg1}
            className="object-center w-full h-260 desktop:h-full hidden desktop-lg:block -z-10"
            alt=""
          />

          <div className="bg-teal-800 desktop-lg:hidden block h-260"></div>
          <div className="absolute inset-y-6/12 inset-x-0 mx-auto flex flex-col items-center justify-center z-50">
            <div className="flex flex-col items-center  gap-6">
              <h1 className="text-center text-white font-bold heading-sm xl:text-[100px] lg:text-[70px] md:text-[40px] md:leading-[130%] lg:leading-27 font-plus_jakarta  mt-40 md:mt-10 xl:mt-2.5">
                Exchange Money <br /> Smarter, Faster, Better
              </h1>
              <p className="text-primary">
                Experience seamless currency conversion{" "}
                <br className="block md:hidden" /> with transparent rates and
                zero complications.
              </p>
            </div>
            <div className="flex flex-col items-center my-10 desktop:my-15">
              <div className="flex items-center gap-3">
                <div className="border-white border rounded-full px-1.5 py-1.5 flex items-center ">
                  <div className="flex -space-x-4">
                    {avatars.map((avatar, i) => (
                      <Image
                        key={i}
                        src={avatar}
                        alt={`Person ${i + 1}`}
                        width={40}
                        height={40}
                        className="md:w-13 md:h-13 w-8 h-8 rounded-full object-cover "
                      />
                    ))}
                    <div className=" bg-gray-200 rounded-full md:w-13 md:h-13 w-8 h-8 flex items-center justify-center cursor-pointer">
                      <span className="text-gray-700 text-sm font-semibold">
                        +7K
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  gap-1.5  items-start">
                  <div className="flex gap-3 items-center">
                    <div>
                      <span className=" text-sm flex text-start gap-0.5">
                        <FaStar className=" h-4 w-4 text-light-green" />
                        <FaStar className=" h-4 w-4 text-light-green" />
                        <FaStar className=" h-4 w-4 text-light-green" />
                        <FaStar className=" h-4 w-4 text-light-green" />
                        <FaStar className=" h-4 w-4 text-light-green" />
                      </span>
                    </div>
                    <span className="text-primary font-plus_jakarta">
                      Reviews
                    </span>
                  </div>
                  <div>
                    <span className="text-primary font-plus_jakarta">
                      Trusted by millions worldwide
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-1 m-5 xl:m-0">
              <CurrencyConverter />
            </div>
          </div>
        </div>
        <Decoration
          src="/image/intro/assets1.png"
          preset={"topLeft"}
          opacity="high"
          className="desktop-lg:hidden block"
        />
        <Decoration
          src="/image/intro/assets2.png"
          preset={"bottomRight"}
          opacity="full"
          className="desktop-lg:hidden block"
        />
      </div>
      <Decoration
        src="/image/intro/note1.png"
        preset={"bottomLeft"}
        opacity="high"
        className="-mb-20"
      />
      <Decoration
        src="/image/intro/note2.png"
        preset={"bottomRight"}
        opacity="full"
        className=" -mb-20 lg:-mb-40"
      />
    </div>
  );
};

export default IntroSection_one;
