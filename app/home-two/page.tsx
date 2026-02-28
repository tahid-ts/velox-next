import Home_twoLayout from "@/components/layout/Home_twoLayout";
import LiveExchangeRatesSection_one from "@/components/shared/sections/home-one/LiveExchangeRatesSection_one";
import HowGetServiceSection from "@/components/shared/sections/home-two/HowGetServiceSection";
import IntroSection_two from "@/components/shared/sections/home-two/IntroSection_two";
import MarketInsightsSection_two from "@/components/shared/sections/home-two/MarketInsightsSection_two";
import MarqueeSection from "@/components/shared/sections/home-two/MarqueeSection";
import MobileAppSection_two from "@/components/shared/sections/home-two/MobileAppSection_two";
import ServicesSection_two from "@/components/shared/sections/home-two/ServicesSection_two";
import TestemonialsSection_two from "@/components/shared/sections/home-two/TestemonialsSection_two";
import WhyVeloxSection_two from "@/components/shared/sections/home-two/WhyVeloxSection_two";
import React from "react";

const page = () => {
  return (
    <Home_twoLayout>
      <IntroSection_two />
      <MarketInsightsSection_two />
      <MarqueeSection />
      <ServicesSection_two />
      <LiveExchangeRatesSection_one />
      <HowGetServiceSection />
      <MobileAppSection_two />
      <WhyVeloxSection_two />
      <TestemonialsSection_two />
    </Home_twoLayout>
  );
};

export default page;
