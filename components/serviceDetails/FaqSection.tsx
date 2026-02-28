import React from "react";
import Container from "../shared/container/Container";
import Accordion from "../shared/accordian/Accordion";
import { feature } from "@/data/data";
import SectionTitle from "../shared/ui/SectionTitle";
import Title from "../shared/ui/Title";

const FaqSection = () => {
  return (
    <Container mainClassName="bg-artboard">
      <div className=" grid lg:grid-cols-5 grid-cols-1">
        <div className="col-span-2">
          <SectionTitle title="FAQ" />
          <Title position="left" title={"Frequently Asked\n Questions"} />
        </div>
        <Accordion data={feature} className="col-span-3" />
      </div>
    </Container>
  );
};

export default FaqSection;
