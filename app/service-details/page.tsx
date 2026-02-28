import React from "react";
import ServiceDetails from "@/components/serviceDetails/ServiceDetails";
import MoreService from "@/components/serviceDetails/MoreService";
import FaqSection from "@/components/serviceDetails/FaqSection";
import Inner_pageLayout from "@/components/layout/Inner_pageLayout";

const page = () => {
  return (
    <Inner_pageLayout title="Service Details">
      <ServiceDetails />
      <MoreService />
      <FaqSection />
    </Inner_pageLayout>
  );
};

export default page;
