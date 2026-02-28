import React from "react";
import FooterSection_two from "../shared/footer/FooterSection_two";
import Header_one from "../shared/header/Header_one";
import PageHeader from "../shared/ui/PageHeader";
export interface Inner_pageLayoutProps {
  title?: string;
  children: React.ReactNode;
  hiddenFotterTop?: boolean;
}
const Inner_pageLayout = ({
  children,
  title = "Page Title",
}: Inner_pageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header_one />
      <PageHeader title={title} />
      {children}
      <FooterSection_two />
    </div>
  );
};

export default Inner_pageLayout;
