/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/refs */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import Container from "../../container/Container";
import SectionTitle from "../../ui/SectionTitle";
import Title from "../../ui/Title";

interface Review {
  id: number;
  name: string;
  title: string;
  image: string;
  review: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    name: "Joseph Johnson",
    title: "Head Of Design",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    review:
      "Experience smooth and secure global currency conversions with real-time rates, quick processing, and transparent fees designed to support both personal and business transactions across borders.",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    title: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    review:
      "Outstanding service with exceptional attention to detail. The platform has transformed how we handle international transactions, making everything seamless and efficient.",
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    review:
      "The best currency conversion solution we've used. Fast, reliable, and incredibly user-friendly. Highly recommend for businesses of all sizes.",
  },
  {
    id: 4,
    name: "Michael Chen 1",
    title: "CEO & Founder new",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    review:
      "The best currency conversion solution we've used. Fast, reliable, and incredibly user-friendly. Highly recommend for businesses of all sizes.",
  },
];

const TestemonialsSection_one = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const handlePrevClick = () => {
    if (mainSwiper) {
      const newIndex =
        activeIndex === 0 ? reviewsData.length - 1 : activeIndex - 1;
      mainSwiper.slideTo(newIndex);
      setActiveIndex(newIndex);
    }
  };

  const handleNextClick = () => {
    if (mainSwiper) {
      const newIndex = (activeIndex + 1) % reviewsData.length;
      mainSwiper.slideTo(newIndex);
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    if (mainSwiper) {
      mainSwiper.on("slideChange", () => {
        setActiveIndex(mainSwiper.activeIndex);
      });
    }
  }, [mainSwiper]);

  const getThumbnailIndices = () => {
    const indices = [];
    const length = reviewsData.length;

    indices.push((activeIndex - 1 + length) % length);
    indices.push(activeIndex);
    indices.push((activeIndex + 1) % length);

    return indices;
  };

  const thumbnailIndices = getThumbnailIndices();

  return (
    <Container>
      <div className="">
        <SectionTitle title="Testemonials" position="center" />
        <Title title={"What Our Clients Say"} position="center" />
        <div className="relative">
          <Swiper
            modules={[Navigation, Thumbs, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            onSwiper={setMainSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== "boolean") {
                const navigation = swiper.params.navigation;
                if (navigation) {
                  navigation.prevEl = prevRef.current;
                  navigation.nextEl = nextRef.current;
                }
              }
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            className="reviewer-slider"
          >
            {reviewsData.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="flex items-center justify-center">
                  <div className="h-100 hidden absolute bottom-0 lg:flex items-end justify-between w-full  ">
                    <div className="flex justify-between w-full px-9 py-6.25 bg-teal/30 z-10 rounded-lg">
                      <button
                        ref={prevRef}
                        onClick={handlePrevClick}
                        className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 shrink-0 z-10"
                        aria-label="Previous slide"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <button
                        ref={nextRef}
                        onClick={handleNextClick}
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 z-10"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center lg:items-end  mx-auto lg:ml-32 gap-10 lg:gap-0 justify-center w-full ">
                    <div className="relative shrink-0 ">
                      <div className="w-64 h-80 lg:w-97 lg:h-115 rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-6 py-6 rounded-b-2xl z-30">
                        <h3 className="text-white text-2xl font-bold mb-1">
                          {review.name}
                        </h3>
                        <p className="text-white/90 text-sm font-light">
                          {review.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-10 ">
                      <div className="border-b-teal/50 border mx-10 h-px hidden lg:block"></div>
                      <div className="flex items-center bg-[#1a7a72] rounded-lg p-8 lg:p-12  relative -mt-6 lg:mt-0  lg:z-10 h-85">
                        <div className="mb-6">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            className="text-[#2d9b92]"
                          >
                            <path
                              d="M12 24C12 20.6863 14.6863 18 18 18V14C12.4772 14 8 18.4772 8 24H12ZM18 18C21.3137 18 24 20.6863 24 24H28C28 18.4772 23.5228 14 18 14V18ZM12 24C12 27.3137 14.6863 30 18 30V34C12.4772 34 8 29.5228 8 24H12ZM18 30C21.3137 30 24 27.3137 24 24H28C28 29.5228 23.5228 34 18 34V30Z"
                              fill="currentColor"
                            />
                            <path
                              d="M28 24C28 20.6863 30.6863 18 34 18V14C28.4772 14 24 18.4772 24 24H28ZM34 18C37.3137 18 40 20.6863 40 24H44C44 18.4772 39.5228 14 34 14V18ZM28 24C28 27.3137 30.6863 30 34 30V34C28.4772 34 24 29.5228 24 24H28ZM34 30C37.3137 30 40 27.3137 40 24H44C44 29.5228 39.5228 34 34 34V30Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        {/* Review Text */}
                        <p className="text-white text-lg lg:text-xl leading-relaxed font-light">
                          {review.review}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex flex-col items-center h-115 gap-6 shrink-0">
                    <div className="relative h-85 w-32 flex flex-col items-center justify-start gap-0 mt-8">
                      {/* Fixed Thumbnail Stack - Always shows 3 images */}
                      {thumbnailIndices.map((index, position) => {
                        const review = reviewsData[index];
                        let sizeClass = "";
                        let positionClass = "";
                        const isActive = position === 1;

                        if (position === 0) {
                          sizeClass =
                            "  w-22 h-22 ring-4 ring-[#1a7a72] opacity-90";
                          positionClass = "mb-5";
                        } else if (position === 1) {
                          sizeClass = "w-16 h-16  shadow-lg z-10";
                          positionClass = "";
                        } else {
                          sizeClass = "w-14 h-14 opacity-80";
                          positionClass = "mt-5";
                        }

                        return (
                          <div
                            key={`thumb-${review.id}-${position}`}
                            className={`flex items-center justify-center transition-all duration-300 ${positionClass} ${
                              isActive
                                ? "cursor-default"
                                : "cursor-pointer hover:scale-105"
                            }`}
                            onClick={() => {
                              if (!isActive && mainSwiper) {
                                mainSwiper.slideTo(index);
                              }
                            }}
                          >
                            <div
                              className={`rounded-full overflow-hidden bg-white ${sizeClass}`}
                            >
                              <img
                                src={review.image}
                                alt={review.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex lg:hidden justify-center gap-4 mt-8">
            <button
              onClick={handlePrevClick}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
              aria-label="Previous slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={handleNextClick}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
              aria-label="Next slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .reviewer-slider .swiper-slide {
          opacity: 0 !important;
          transition: opacity 0.5s ease-in-out;
        }

        .reviewer-slider .swiper-slide-active {
          opacity: 1 !important;
        }
      `}</style>
    </Container>
  );
};
export default TestemonialsSection_one;
