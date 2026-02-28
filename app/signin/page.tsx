import Inner_pageLayout from "@/components/layout/Inner_pageLayout";
import SignInSection from "@/components/signIn/SignInSection";
import React from "react";

const page = () => {
  return (
    <Inner_pageLayout title="Sign In">
      <SignInSection />
    </Inner_pageLayout>
  );
};

export default page;
