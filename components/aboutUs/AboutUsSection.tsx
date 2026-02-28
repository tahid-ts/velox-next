/* eslint-disable @next/next/no-img-element */
import React from "react";
import SectionTitle from "../shared/ui/SectionTitle";
import Title from "../shared/ui/Title";
import Container from "../shared/container/Container";
import { Button } from "../shared/ui/Button";
import OdoMeter from "../shared/ui/OdoMeter";

const AboutUsSection = () => {
  return (
    <Container mainClassName="bg-artboard">
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-10">
          <div>
            <SectionTitle title="Live Exchange Rates" position="left" />
            <Title
              title={
                "Velox delivers fast, secure &\ntransparent currency exchange \nand remittance services."
              }
              position="left"
            />
          </div>
          <p>
            We provide a secure and reliable currency exchange experience,
            combining competitive rates, fast processing, and complete
            transparency to help you exchange with confidence.
          </p>
          <div className="grid grid-cols-2 w-full">
            <div className="flex gap-3">
              <img
                src="/image/about us/vector-top-rated-golden-premium-quality-label-design 1.png"
                alt=""
                className="object-contain"
              />
              <div>
                <h1 className="heading-sm">Top-Rated Exchanger</h1>
                <p className="paragraph-md text-secondary">
                  Providing expert evaluation and tailored treatment plans for
                  all
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <img
                src="/image/about us/vector-top-rated-golden-premium-quality-label-design 2.png"
                alt=""
                className="object-contain"
              />
              <div>
                <h1 className="heading-sm">Trusted by Thousands</h1>
                <p className="paragraph-md text-secondary">
                  Providing expert evaluation and tailored treatment plans for
                  all
                </p>
              </div>
            </div>
          </div>
          <div>
            <Button text="More about us" variant="dark" />
          </div>
        </div>
        <div className="flex items-end justify-end">
          <img src="/image/about us/image1.png" alt="" />
        </div>
      </div>
      <Container mxpxNone>
        <div className="grid grid-cols-4">
          <div className="flex flex-col items-center">
            <OdoMeter startValue={11} endValue={15} suffix="+" />
            <p className="text-secondary font-plus_jakarta">Awards Won</p>
          </div>
          <div className="flex flex-col items-center">
            <OdoMeter startValue={99} endValue={10} suffix="+" />
            <p className="text-secondary font-plus_jakarta">Years Experiance</p>
          </div>
          <div className="flex flex-col items-center">
            <OdoMeter startValue={11} endValue={15} suffix="+" />
            <p className="text-secondary font-plus_jakarta">Happy Clients</p>
          </div>
          <div className="flex flex-col items-center">
            <OdoMeter startValue={11} endValue={15} suffix="+" />
            <p className="text-secondary font-plus_jakarta">Happy Clients</p>
          </div>
        </div>
      </Container>
      <Title title="Velox provides a smart, secure, and transparent way to exchange currency and send money across the globe. Powered by advanced financial technology, we deliver real-time accuracy, fast processing, and complete clarity at every step. Our platform is designed for simplicity, ensuring that users of all backgrounds can manage international transfers with confidence, convenience, and total peace of mind." />
    </Container>
  );
};

export default AboutUsSection;
