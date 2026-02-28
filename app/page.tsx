import Home_oneLayout from "@/components/layout/Home_oneLayout";
import IntroSection_one from "@/components/shared/sections/home-one/IntroSection_one";
import LiveExchangeRatesSection_one from "@/components/shared/sections/home-one/LiveExchangeRatesSection_one";
import MarketInsightsSection_one from "@/components/shared/sections/home-one/MarketInsightsSection_one";
import MobileAppSection_one from "@/components/shared/sections/home-one/MobileAppSection_one";
import ServiceCarouselSection from "@/components/shared/sections/home-one/ServiceCarouselSection";
import ServicesSection_one from "@/components/shared/sections/home-one/ServicesSection_one";
import TestemonialsSection_one from "@/components/shared/sections/home-one/TestemonialsSection_one";
import WhyVeloxSection_one from "@/components/shared/sections/home-one/WhyVeloxSection_one";

export default function Home() {
  return (
    <Home_oneLayout>
      <IntroSection_one />
      <MarketInsightsSection_one />
      <ServicesSection_one />
      <LiveExchangeRatesSection_one />
      <ServiceCarouselSection />
      <MobileAppSection_one />
      <WhyVeloxSection_one />
      <TestemonialsSection_one />
    </Home_oneLayout>
  );
}
