import AllCurrency from "@/components/allCurrency/AllCurrency";
import Dashboard_Layout from "@/components/layout/Dashboard_Layout";
import Title from "@/components/shared/ui/Title";
import React from "react";

const page = () => {
  return (
    <Dashboard_Layout>
      <Title title="All Currency" />
      <AllCurrency />
    </Dashboard_Layout>
  );
};

export default page;
