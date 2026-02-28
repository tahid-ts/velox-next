import React from "react";
import Container from "../shared/container/Container";
import SectionTitle from "../shared/ui/SectionTitle";
import Title from "../shared/ui/Title";
import LiveExchangeRatesDataTable from "../shared/sections/home-one/LiveExchangeRatesDataTable";
import { Button } from "../shared/ui/Button";
import LERcurrancyConverter from "./LERcurrancyConverter";
import FaqSection from "../serviceDetails/FaqSection";

const LiveExchangeRate = () => {
  return (
    <Container mainClassName="bg-artboard">
      <SectionTitle title="Mobile App" position="center" />
      <Title
        position="center"
        title={"Live Currency Rates\n Powered by Market Data"}
      />
      <div className="pt-15">
        <LiveExchangeRatesDataTable />
        <div className="flex items-center justify-center mt-8">
          <Button text="See More" variant="dark" />
        </div>
      </div>
      <LERcurrancyConverter />
      <FaqSection />
    </Container>
  );
};

export default LiveExchangeRate;
