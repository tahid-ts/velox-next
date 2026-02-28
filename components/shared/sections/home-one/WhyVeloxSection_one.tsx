/* eslint-disable @next/next/no-img-element */
import React from "react";
import Container from "../../container/Container";
import Title from "../../ui/Title";
import { whyVeloxCard } from "@/data/data";
import SectionTitle from "../../ui/SectionTitle";

const WhyVeloxSection_one = () => {
  return (
    <Container>
      <SectionTitle title="Why Velox" position="center" />
      <Title
        title={" How We Stand Out with\nSmarter Exchange Solutions"}
        position="center"
      />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-15">
        <div className="flex flex-col gap-8">
          {whyVeloxCard.slice(0, 2).map((item) => {
            return (
              <div key={item.id}>
                <div className="bg-white border border-gray-300 p-8 rounded-xl flex flex-col items-center justify-center text-center group hover:bg-teal">
                  <img src={item.image} alt="" />
                  <h1 className="heading-sm mt-4 mb-2 group-hover:text-white">
                    {item.title}
                  </h1>
                  <p className="paragraph-md group-hover:text-white">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/image/why velox/abstract-3d-geometric-shapes 1.png"
            alt={"image"}
            className="mb-4"
          />
        </div>
        <div className="flex flex-col gap-8">
          {whyVeloxCard.slice(2, 4).map((item) => {
            return (
              <div key={item.id}>
                <div className="bg-white border border-gray-300 p-8 rounded-xl flex flex-col items-center justify-center text-center group hover:bg-teal">
                  <img src={item.image} alt="" />
                  <h1 className="heading-sm mt-4 mb-2 group-hover:text-white">
                    {item.title}
                  </h1>
                  <p className="paragraph-md group-hover:text-white">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default WhyVeloxSection_one;
