/* eslint-disable @next/next/no-img-element */
import React from "react";
import Container from "../../container/Container";
import SectionTitle from "../../ui/SectionTitle";
import Title from "../../ui/Title";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}
const HowGetServiceSection = () => {
  const steps: Step[] = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Sign up using your basic details and unlock instant access to all our transfer services for a smooth, seamless start.",
      icon: "/image/service card/icon.png",
    },
    {
      number: "02",
      title: "Verify Your Identity",
      description:
        "Complete a quick KYC verification to secure your account and enable full transaction capabilities.",
      icon: "/image/service card/icon2.png",
    },
    {
      number: "03",
      title: "Start Exchanging",
      description:
        "Choose your currencies, enter the amount, and make fast, secure exchanges anytime with complete ease.",
      icon: "/image/service card/icon3.png",
    },
  ];

  return (
    <Container mainClassName="bg-[#033428]">
      <SectionTitle title="Live Exchange Rates" position="center" white />
      <Title
        title={" How We Stand Out with Smarter  Solutions"}
        position="center"
        white
      />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-20.5 pt-15">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-8 -left-8">
                <div className="w-25 h-25 rounded-full bg-white flex items-center justify-center shadow-lg border-6 border-emerald-900">
                  <span className="text-2xl font-bold text-emerald-900 font-plus_jakarta">
                    {step.number}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center border-b border-gray-300 pb-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <div className="flex  mb-4">
                  <img src={step.icon} alt="" />
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed text-[16px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HowGetServiceSection;
