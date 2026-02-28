import React from "react";
import Header from "../shared/header/Header_one";
import FooterSection_one from "../shared/footer/FooterSection_one";
export interface Home_oneLayoutProps {
  children: React.ReactNode;
  hiddenFotterTop?: boolean;
}
const Home_oneLayout = ({ children }: Home_oneLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      {children}
      <FooterSection_one />
    </div>
  );
};

export default Home_oneLayout;
