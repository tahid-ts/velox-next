import React from "react";
import Header_two from "../shared/header/Header_two";
import FooterSection_two from "../shared/footer/FooterSection_two";
export interface Home_twoLayoutProps {
  children: React.ReactNode;
  hiddenFotterTop?: boolean;
}
const Home_twoLayout = ({ children }: Home_twoLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header_two />
      {children}
      <FooterSection_two />
    </div>
  );
};

export default Home_twoLayout;
