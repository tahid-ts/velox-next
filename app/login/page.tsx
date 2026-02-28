import Inner_pageLayout from "@/components/layout/Inner_pageLayout";
import LogInSection from "@/components/logIn/LogInSection";
import React from "react";

const page = () => {
  return (
    <Inner_pageLayout title="Log In">
      <LogInSection />
    </Inner_pageLayout>
  );
};

export default page;
