import React from "react";
import Dashboard_Layout from "@/components/layout/Dashboard_Layout";
import TransactionHistory from "@/components/transactionHistory/TransactionHistory";
import Title from "@/components/shared/ui/Title";
const page = () => {
  return (
    <Dashboard_Layout>
      <Title title="Transaction History" />
      <TransactionHistory />
    </Dashboard_Layout>
  );
};

export default page;
