"use client";
import LiveExchangeRatesDataTable from "./LiveExchangeRatesDataTable";
import Container from "../../container/Container";
import Title from "../../ui/Title";
import SectionTitle from "../../ui/SectionTitle";

const LiveExchangeRatesSection_one = () => {
  return (
    <Container mainClassName="bg-artboard">
      <SectionTitle title="Live Exchange Rates" position="center" />
      <Title
        title={" Live Currency Rates\n Powered by Market Data"}
        position="center"
      />

      <div className="pt-15">
        <LiveExchangeRatesDataTable />
      </div>
    </Container>
  );
};

export default LiveExchangeRatesSection_one;
