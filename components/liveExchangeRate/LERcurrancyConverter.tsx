/* eslint-disable @next/next/no-img-element */
import React from "react";
import Container from "../shared/container/Container";
import CurrencyConverter from "../shared/currencyConverter/CurrancyConverter";

const LERcurrancyConverter = () => {
  return (
    <Container>
      <div className="flex lg:flex-row flex-col gap-8">
        <div>
          <img src="/image/live exchange rate/left-img.png" alt="" />
        </div>
        <div>
          <CurrencyConverter className="md:grid-cols-1! gap-5!" />
        </div>
      </div>
    </Container>
  );
};

export default LERcurrancyConverter;
