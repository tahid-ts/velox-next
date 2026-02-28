/* eslint-disable @next/next/no-img-element */
import React from "react";
import SectionTitle from "../../ui/SectionTitle";
import Title from "../../ui/Title";
import Container from "../../container/Container";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const WhyVeloxSection_two: React.FC = () => {
  const features: Feature[] = [
    {
      icon: "/image/why velox/icon.png",
      title: "Transparent Rates",
      description:
        "No Hidden Fees – Get real-time market rates with complete clarity.",
    },
    {
      icon: "/image/why velox/icon1.png",
      title: "Global Coverage",
      description: "Speed You Can Trust – Exchange or send money in minutes.",
    },
    {
      icon: "/image/why velox/icon2.png",
      title: "Fast & Secure Transfers",
      description:
        "Worldwide Accessibility – Access more currencies and transfer globally.",
    },
  ];

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-15">
        {/* Left Side - Hero Image */}
        <div className="relative">
          <img src="/image/why velox/image1.png" alt="" />
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col justify-center">
          {/* Badge */}
          <SectionTitle title="Why Velox" />

          {/* Heading */}
          <Title title={"How We Stand Out with\n Smarter Exchange Solutions"} />

          {/* Description */}
          <p className="text-gray-600 mb-8 lg:mb-12 leading-relaxed pt-6 font-plus_jakarta">
            Delivering trusted, secure, and efficient currency exchange
            solutions that enhance your daily financial activities, simplify
            global transactions, and provide a seamless, reliable experience for
            every user.
          </p>

          {/* Features Grid */}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 hover:shadow-md  duration-300 border border-gray-100 w-89"
          >
            {/* Icon */}
            <div className="text-4xl mb-4">
              <img src={feature.icon} alt="" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-secondary leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
        <div className=" w-full h-full ">
          <img
            src="/image/why velox/abstract-3d-geometric-shapes 2.png"
            alt=""
            className="absolute -right-5 w-89 h-99 -bottom-14 object-contain"
          />
        </div>
      </div>
    </Container>
  );
};

export default WhyVeloxSection_two;
