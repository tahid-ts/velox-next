import React from "react";
import AdvancedStackedCards from "../../ui/AdvancedStackedCards";
import { serviceSection_two } from "@/data/data";
import Container from "../../container/Container";
import SectionHeader from "../sectionHeader/SectionHeader";
import Title from "../../ui/Title";

const ServicesSection_two = () => {
  return (
    <Container>
      <div className="grid grid-cols-5 items-start">
        <div className="col-span-2 sticky top-40 z-10">
          <SectionHeader title="Services" />
          <Title
            title={
              "Quality solutions from\n local exchange to\n worldwide remittance"
            }
          />
        </div>
        <div className="col-span-3 ">
          <AdvancedStackedCards cards={serviceSection_two} />
        </div>
      </div>
    </Container>
  );
};

export default ServicesSection_two;
