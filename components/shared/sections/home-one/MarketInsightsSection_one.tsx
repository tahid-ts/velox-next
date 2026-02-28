/* eslint-disable @next/next/no-img-element */
import React from "react";
import Container from "../../container/Container";
import { payment_gateway } from "@/data/data";
import Marquee from "react-fast-marquee";
import WorldMapAnimation from "@/components/animation/WorldMapAnimation";
import CurrencyRatesTable from "./CurrencyRatesTable";
import Decoration from "../../decoration/Decoration";
import SectionHeader from "../sectionHeader/SectionHeader";
import Title from "../../ui/Title";

const MarketInsightsSection_one = () => {
  return (
    <div className="relative bg-artboard -z-20">
      <div className="z-20">
        <Container mainClassName="overflow-hidden ">
          <SectionHeader title="Market Insights" />
          <div className="grid lg:grid-cols-7 grid-cols-1">
            <div className="col-span-4">
              <Title
                title={
                  "Get real-time exchange rates and\n trusted market data for clearer transfer decisions."
                }
              />
            </div>
            <div className="col-span-3 flex items-center">
              <Marquee>
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="grid grid-cols-4 place-items-center gap-4">
                    {payment_gateway.slice(0, 4).map((item, index) => (
                      <div
                        key={index}
                        className="flex  items-center gap-2 px-6 py-3 bg-linear-to-r from-white to-transparent rounded-full"
                      >
                        <h1>{item.name}</h1>
                        <img src={item.img} alt={item.name} />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 place-items-center gap-4 justify-items-center mt-4">
                    {payment_gateway.slice(4).map((item, index) => (
                      <div
                        key={index}
                        className="flex  items-center gap-2 px-6 py-3 bg-linear-to-r from-white to-transparent rounded-full"
                      >
                        <h1>{item.name}</h1>
                        <img src={item.img} alt={item.name} />
                      </div>
                    ))}
                  </div>
                </div>
              </Marquee>
            </div>
          </div>

          <div className="mt-15">
            <div className="grid lg:grid-cols-9 grid-cols-1 overflow-hidden">
              <div className="col-span-4 place-items-baseline overflow-hidden">
                <WorldMapAnimation />
              </div>
              <div className="col-span-5 relative">
                <CurrencyRatesTable />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Decoration
        src="/image/market insights/vector.png"
        preset={"bottomRight"}
        className="mb-25 mr-70 -z-10"
        opacity="full"
      />
    </div>
  );
};

export default MarketInsightsSection_one;
