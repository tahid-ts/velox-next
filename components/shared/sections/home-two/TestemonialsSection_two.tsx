/* eslint-disable @next/next/no-img-element */

"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Container from "../../container/Container";
import SectionTitle from "../../ui/SectionTitle";
import Title from "../../ui/Title";

interface Testimonial {
  id: number;
  image: string;
  quote: string;
  name: string;
  position: string;
  rating: number;
}

const TestemonialsSection_two: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      image: "/image/testimonials/image1.png",
      quote:
        "Experience smooth and secure global currency conversions with real-time rates, quick processing, and transparent fees—designed to support both personal and business.",
      name: "Joseph Johnson",
      position: "Head Of Design",
      rating: 5,
    },
    {
      id: 2,
      image: "/image/testimonials/image1.png",
      quote:
        "The platform has transformed how we handle international transactions. Fast, reliable, and incredibly user-friendly.",
      name: "Sarah Mitchell",
      position: "CEO, TechCorp",
      rating: 5,
    },
    {
      id: 3,
      image: "/image/testimonials/image1.png",
      quote:
        "Outstanding service with competitive rates. The transparency and speed of transactions are unmatched in the industry.",
      name: "Michael Chen",
      position: "Financial Director",
      rating: 5,
    },
  ];

  const stats = [
    { value: "95%", label: ["Clients", "Satisfaction"] },
    { value: "4.8", label: ["Average", "Rating"] },
    { value: "5k+", label: ["5 star", "Review"] },
  ];

  return (
    <Container>
      <SectionTitle title="Testemonials" position="center" />
      <Title title={"What Our Clients Say"} position="center" />
      <div className="relative flex flex-col lg:flex-row gap-8 items-start mt-15">
        <div className="hidden lg:flex flex-col items-center justify-center  rounded-3xl w-121.25 h-135 shrink-0 relative">
          <img
            src="/image/testimonials/left-bg.png"
            alt=""
            className="absolute inset-0 w-121.25 h-135"
          />
          <div className=" w-full flex-1 flex flex-col justify-center items-center z-10">
            <div className="space-y-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center flex items-center gap-3 "
                >
                  <h3 className="heading-2xl font-bold text-white mb-3 tracking-tight">
                    {stat.value}
                  </h3>
                  <div className="flex flex-col">
                    <p className="text-white paragraph-lg">{stat.label[0]}</p>
                    <p className="text-white paragraph-lg">{stat.label[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:absolute lg:left-6/10 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-250 w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="pb-14"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-[#033428] rounded-3xl p-10 border-4 border-white">
                  <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                    {/* Image */}
                    <div className="shrink-0">
                      <div className="relative  lg:w-70 lg:h-85 rounded-xl pr-10">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between gap-6.5 h-full ">
                      <div className="flex justify-between">
                        <div>
                          <svg
                            width="66"
                            height="52"
                            viewBox="0 0 66 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M25.8441 0.00217032C25.8441 1.20466 25.9404 2.21216 25.8004 3.18499C25.7414 3.59882 25.2537 4.04298 24.8535 4.29215C22.9139 5.51198 20.808 6.48697 18.9996 7.88663C13.1478 12.4193 9.67962 18.3863 9.48937 26.1386C9.43689 28.3377 10.2547 28.8902 12.1179 28.03C17.5038 25.5557 23.2966 27.0074 26.3864 31.605C29.7562 36.623 29.2817 43.305 25.2428 47.686C20.0864 53.2803 11.5974 53.4493 5.74346 48.102C2.23809 44.8996 0.571775 40.7657 0.156291 36.0618C-1.23667 20.3081 6.73844 7.32114 21.2563 1.61633C22.693 1.053 24.1647 0.589332 25.8441 0.00217032Z"
                              fill="white"
                            />
                            <path
                              d="M63.2182 0.00217032C63.2182 1.20466 63.3144 2.21216 63.1744 3.18499C63.1154 3.59882 62.6277 4.04298 62.2276 4.29215C60.2879 5.51198 58.1821 6.48697 56.3736 7.88663C50.5218 12.4193 47.0536 18.3863 46.8634 26.1386C46.8109 28.3377 47.6288 28.8902 49.4919 28.03C54.8779 25.5557 60.6706 27.0074 63.7605 31.605C67.1303 36.623 66.6557 43.305 62.6168 47.686C57.4604 53.2803 48.9714 53.4493 43.1175 48.102C39.6121 44.8996 37.9458 40.7657 37.5303 36.0618C36.1374 20.3081 44.1125 7.32114 58.6303 1.61633C60.067 1.053 61.5387 0.589332 63.2182 0.00217032Z"
                              fill="white"
                            />
                          </svg>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1.5 mb-6 justify-center lg:justify-start">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-6 h-6 fill-yellow-400"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2L14.9389 8.4311L22.1056 9.5463L17.055 14.5689L18.2779 21.7537L12 18.4L5.72215 21.7537L6.94501 14.5689L1.89443 9.5463L9.06107 8.4311L12 2Z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div>
                        {/* Quote Text */}
                        <p className="text-white text-base lg:text-lg leading-relaxed mb-8  heading-sm font-plus_jakarta">
                          {testimonial.quote}
                        </p>

                        {/* Author */}
                        <div className="border-t border-white/20 pt-6 mt-6 flex items-center ">
                          <h4 className="text-white font-bold text-xl heading-sm font-plus_jakarta ">
                            {testimonial.name}
                          </h4>
                          <span className="text-white/70 text-2xl px-1 font-plus_jakarta">
                            /
                          </span>
                          <p className="text-white/70 text-xl leading-10 font-plus_jakarta">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="lg:hidden mt-12 grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-green rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
            <div className="w-12 h-0.5 bg-white/30 mx-auto mb-2"></div>
            <p className="text-white/90 text-xs">{stat.label[0]}</p>
            <p className="text-white/90 text-xs">{stat.label[1]}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TestemonialsSection_two;
