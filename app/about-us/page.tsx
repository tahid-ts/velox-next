import Home_oneLayout from "@/components/layout/Home_oneLayout";
import AboutUsSection from "@/components/aboutUs/AboutUsSection";
import ServiceCarouselSection from "@/components/shared/sections/home-one/ServiceCarouselSection";
import ServicesSection_one from "@/components/shared/sections/home-one/ServicesSection_one";
import WhyVeloxSection_two from "@/components/shared/sections/home-two/WhyVeloxSection_two";
import PageHeader from "@/components/shared/ui/PageHeader";
import React from "react";

const page = () => {
  return (
    <Home_oneLayout>
      <PageHeader title="About Us" />
      <AboutUsSection />
      <ServicesSection_one />
      <ServiceCarouselSection />
      <WhyVeloxSection_two />
    </Home_oneLayout>
  );
};

export default page;
