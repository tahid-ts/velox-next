// import React from "react";

import { services } from "@/data/data";
import Container from "../shared/container/Container";
import { Button } from "../shared/ui/Button";
import SectionTitle from "../shared/ui/SectionTitle";
import Title from "../shared/ui/Title";
import ServiceCard from "../shared/card/ServicesCard";

const MoreService = () => {
  return (
    <Container>
      <div className="grid lg:grid-cols-7 grid-cols-1 mb-15">
        <div className="col-span-5">
          <SectionTitle title="Services" />
          <Title title={"More Solutions for You"} />
        </div>
        <div className="col-span-2 flex justify-start lg:justify-end lg:items-center">
          <Button text="All Service" variant="teal" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {services.slice(0, 3).map((service) => (
          <ServiceCard
            key={service.id}
            image={service.image}
            title={service.title}
            link="/"
            description={service.description}
          />
        ))}
      </div>
    </Container>
  );
};

export default MoreService;
