/* eslint-disable @next/next/no-img-element */
import React from "react";
import Container from "../../container/Container";

// import TextReveal from "@/components/animation/TextReveal";
import Title from "../../ui/Title";
import { Button } from "../../ui/Button";
import SectionTitle from "../../ui/SectionTitle";

const MobileAppSection_one = () => {
  return (
    <Container mainClassName=" bg-artboard">
      <div className="relative">
        <img src="/image/mobile app/mobile-app.png" alt="" />
        <div className="absolute inset-0 z-10 w-full">
          <div className="grid md:grid-cols-2 grid-cols-1  w-full h-full">
            <div className="flex flex-col h-full justify-center items-center lg:ml-33">
              <div>
                <SectionTitle title="Mobile App" white />
                <Title
                  position="left"
                  title={"Your Currency\n Exchange on Mobile"}
                  white
                />

                <p className="text-white paragraph-md mt-6 mb-10">
                  Manage your transfers, track rates, and exchange currencies{" "}
                  <br />
                  instantly from your phone.
                </p>
                <div>
                  <Button text="Download App" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img src="/image/mobile app/mockup-img.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MobileAppSection_one;
