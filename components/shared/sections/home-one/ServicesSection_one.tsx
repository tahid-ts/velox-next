import Container from "../../container/Container";
import { Button } from "../../ui/Button";
import { services } from "@/data/data";
import ServiceCard from "../../card/ServicesCard";
import Title from "../../ui/Title";
import SectionTitle from "../../ui/SectionTitle";

const ServicesSection_one = () => {
  return (
    <Container>
      <div className="grid lg:grid-cols-7 grid-cols-1 mb-15">
        <div className="col-span-5">
          <SectionTitle title="Services" />
          <Title
            title={
              " Quality solutions from local exchange to \n worldwide remittance"
            }
          />
        </div>
        <div className="col-span-2 flex justify-start lg:justify-end lg:items-center">
          <Button text="Contact us" variant="teal" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {services.map((service) => (
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

export default ServicesSection_one;
