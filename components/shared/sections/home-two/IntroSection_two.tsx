/* eslint-disable @next/next/no-img-element */
import { IntroSection_two_Data } from "@/data/data";

import Decoration from "../../decoration/Decoration";
import { Button } from "../../ui/Button";
import CurrencyConverter_two from "../../currencyConverter/CurrencyConverter_two";
const IntroSection_two = () => {
  return (
    <div className="bg-artboard relative ">
      <div className="relative w-full max-h-260 desktop:max-h-full rounded-xl">
        <div className="desktop-lg:m-5 desktop-lg:-mb-5 rounded-b-4xl  m-0">
          <div className="relative ">
            <img
              src={IntroSection_two_Data.bg1}
              className="object-center w-full h-260 desktop:h-full hidden desktop-lg:block -z-10 object-scale-down"
              alt=""
            />
            <div className="bg-teal-800 desktop-lg:hidden block h-260"></div>
            <div className="absolute inset-y-6/12 inset-x-0 mx-auto flex flex-col items-center justify-center z-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 desktop-lg:max-w-380  desktop:min-w-330  laptop-xl:max-w-285 laptop-lg:max-w-240 laptop:max-w-180 tab:max-w-135  max-w-full  place-items-center">
                <div>
                  <div className="flex flex-col items-start  gap-6">
                    <h1 className="text-start text-white font-bold xl:text-[72px] lg:text-[70px] md:text-[40px] md:leading-[130%] lg:leading-27 font-plus_jakarta  mt-40 md:mt-10 xl:mt-2.5">
                      Exchange Currency with Confidence
                    </h1>
                    <p className="text-primary">
                      Experience seamless currency conversion{" "}
                      <br className="block md:hidden" /> with transparent rates
                      and zero complications.
                    </p>
                    <div className="flex gap-10 mt-12">
                      <Button text="Start exchange" />
                      <div>
                        <h1 className="text-white label-sm">Call Us</h1>
                        <span className="text-light-green paragraph-md">
                          +321 4444 0101 123
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <img
                    src={IntroSection_two_Data.png}
                    className="w-full h-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-70 z-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <CurrencyConverter_two />
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
    </div>
  );
};

export default IntroSection_two;
