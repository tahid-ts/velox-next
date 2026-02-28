/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ServiceCardCarousel } from "../../carousel/ServiceCardCarousel";
import { cards } from "@/data/data";
import Container from "../../container/Container";
import Title from "../../ui/Title";
import SectionTitle from "../../ui/SectionTitle";

const ServiceCarouselSection = () => {
  return (
    <div
      className="bg-[url('/image/service-card/banner.png')]
        bg-cover
        bg-center
        bg-no-repeat"
    >
      <Container mainClassName="relative">
        <div className="absolute inset-0 bg-teal" />
        <SectionTitle title="How To Get Service" position="center" white />
        <div className="flex items-center justify-center pb-17">
          <Title
            title={" How We Stand Out with\n Smarter Exchange Solutions"}
            white
          />
        </div>
        <div className="relative z-10">
          <ServiceCardCarousel data={cards} />
        </div>

        <img
          src="/image/service card/curve.png"
          alt=""
          className="absolute -bottom-30 left-1/2 -translate-x-1/2 opacity-70"
        />
      </Container>
    </div>
  );
};

export default ServiceCarouselSection;
