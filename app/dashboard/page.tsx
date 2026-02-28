import Dashboard from "@/components/dashboard/Dashboard";
import Dashboard_Layout from "@/components/layout/Dashboard_Layout";
import React from "react";

const page = () => {
  return (
    <Dashboard_Layout>
      <Dashboard />
    </Dashboard_Layout>
  );
};

export default page;
