/* eslint-disable @next/next/no-img-element */

import React from "react";
import Container from "../../container/Container";
import SectionHeader from "../sectionHeader/SectionHeader";
import Title from "../../ui/Title";
import Marquee from "react-fast-marquee";
import { payment_gateway } from "@/data/data";
import CurrencyRateTable from "./CurrencyRateTable";
import Decoration from "../../decoration/Decoration";

const MarketInsightsSection_two = () => {
  return (
    <Container mainClassName="bg-artboard relative">
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-29.5">
        <div className="flex flex-col">
          <SectionHeader title="Market Insights" />
          <Title
            title={
              "Get real-time exchange rates and\n trusted market data for clearer transfer decisions."
            }
          />
          <p className="pt-6 pb-15">
            Access reliable, market-verified exchange insights that help you
            better understand currency trends and make smarter transfers.
          </p>
          <Marquee>
            <div className="flex flex-col justify-center items-center w-full">
              <div className="grid grid-cols-4 place-items-center gap-4">
                {payment_gateway.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className="flex  items-center gap-2 px-6 py-3 bg-linear-to-r from-[#033425] to-[#033425] rounded-full"
                  >
                    <h1 className="text-white">{item.name}</h1>
                    <img src={item.img} alt={item.name} />
                  </div>
                ))}
              </div>
            </div>
          </Marquee>
          <div className="flex flex-col lg:flex-row gap-15 items-center justify-start pt-15">
            <div className="flex">
              <p className="text-[160px] font-plus_jakarta font-bold leading-[100%]  text-artboard [-moz-text-fill-color:[#cc76a1]] [-moz-text-stroke:5px_#033428] [-webkit-text-fill-color:[#cc76a1]] [-webkit-text-stroke:5px_#033428] [paint-order:stroke_fill] ">
                15
              </p>
              <div className="mt-5">
                <p className="font-semibold font-plus_jakarta text-[18px]">
                  K+
                </p>
                <p className="font-semibold font-plus_jakarta text-[18px]">
                  Users
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[48px] font-plus_jakarta font-bold leading-[100%]  text-artboard [-moz-text-fill-color:[#cc76a1]] [-moz-text-stroke:5px_#033428] [-webkit-text-fill-color:[#cc76a1]] [-webkit-text-stroke:5px_#033428] [paint-order:stroke_fill] tracking-widest">
                98B
              </p>
              <div className="mt-5">
                <p className="font-semibold font-plus_jakarta text-[18px] text-center text-secondary">
                  Transactionss
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[48px] font-plus_jakarta font-bold leading-[100%]  text-artboard [-moz-text-fill-color:[#cc76a1]] [-moz-text-stroke:5px_#033428] [-webkit-text-fill-color:[#cc76a1]] [-webkit-text-stroke:5px_#033428] [paint-order:stroke_fill] tracking-widest">
                99+
              </p>
              <div className="mt-5">
                <p className="font-semibold font-plus_jakarta text-[18px] text-center text-secondary">
                  Currencies
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          {/* Background Decoration */}
          <div className="absolute inset-0">
            <Decoration
              src="/image/market insights/dollar-main.png"
              preset="fullCenter"
              opacity="full"
            />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 max-w-136 ml-auto">
            <CurrencyRateTable />
          </div>
        </div>
      </div>
      <Decoration
        src="/image/market insights/vector.png"
        preset="bottomRight"
        opacity="full"
        className="mb-50 mr-70"
      />
    </Container>
  );
};

export default MarketInsightsSection_two;
