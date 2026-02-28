/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import { CardDataType, CardPositionConfig } from "./carousel";
import CardMask from "./CardMask";

const BREAKPOINTS = {
  mobile: 0,
  tablet: 640,
  desktop: 1024,
  desktopLarge: 1280,
} as const;

const createConfig = (
  overrides?: Partial<CardPositionConfig>,
): CardPositionConfig => ({
  opacity: 1,
  scale: 0,
  zIndex: 10,
  isActive: false,
  showGradient: false,
  notchWidth: 100,
  notchHeight: 100,
  showCornerContent: true,
  growOnHover: false,
  translateY: 0,
  width: "100%",
  ...overrides,
});

const MOBILE_CONFIGS: CardPositionConfig[] = [
  createConfig({
    isActive: true,
    height: 320,
    notchWidth: 120,
    notchHeight: 120,
    showGradient: true,
    position: "topLeft",
  }),
];

const TABLET_CONFIGS: CardPositionConfig[] = [
  createConfig({
    isActive: true,
    height: 350,
    notchWidth: 120,
    notchHeight: 120,
    zIndex: 20,
    showGradient: true,
    position: "topLeft",
  }),
  createConfig({
    isActive: true,
    height: 350,
    notchWidth: 120,
    notchHeight: 120,
    zIndex: 10,
    showGradient: true,
    position: "topLeft",
  }),
];

const DESKTOP_CONFIGS: CardPositionConfig[] = [
  createConfig({
    isActive: true,
    notchWidth: 120,
    notchHeight: 120,
    zIndex: 30,
    showGradient: true,
  }),
  createConfig({
    isActive: true,
    notchWidth: 110,
    notchHeight: 110,
    zIndex: 20,
    showGradient: true,
  }),
];

const DESKTOP_LARGE_CONFIGS: CardPositionConfig[] = [
  createConfig({
    isActive: false,
    effect: "always",
    height: 350,
    zIndex: 30,
    notchWidth: 120,
    notchHeight: 120,
    showGradient: true,
    position: "bottomLeft",
  }),
  createConfig({
    isActive: true,
    effect: "always",
    height: 312,
    width: 485,
    translateY: 0,
    zIndex: 20,
    notchWidth: 120,
    notchHeight: 120,
    showGradient: true,
    position: "topLeft",
  }),
  createConfig({
    isActive: false,
    effect: "always",
    height: 350,
    translateY: 0,
    zIndex: 10,
    notchWidth: 110,
    notchHeight: 110,
    showGradient: true,
    position: "bottomRight",
  }),
];

interface ServiceCardCarouselProps {
  data?: CardDataType[];
}

export const ServiceCardCarousel: React.FC<ServiceCardCarouselProps> = ({
  data = [],
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);

  const getConfigsBySPV = useCallback(() => {
    if (slidesPerView === 1) return MOBILE_CONFIGS;
    if (slidesPerView === 2 && window.innerWidth < BREAKPOINTS.desktop)
      return TABLET_CONFIGS;
    if (slidesPerView === 2) return DESKTOP_CONFIGS;
    return DESKTOP_LARGE_CONFIGS;
  }, [slidesPerView]);

  const positionConfigs = getConfigsBySPV();

  const cardPositions = useMemo(() => {
    return data.map((_, index) => {
      const relative = (index - activeIndex + data.length) % data.length;
      return relative % slidesPerView;
    });
  }, [data, activeIndex, slidesPerView]);

  const slides = useMemo(
    () =>
      data.map((item, index) => {
        const position = cardPositions[index] ?? 0;
        const config = positionConfigs[position] ?? createConfig();
        const isHovered = hoveredIndex === index;

        return (
          <SwiperSlide key={`${item.id}-${index}`}>
            <div
              className="transition-all duration-500 cursor-pointer"
              style={{
                transform: `translateY(${config.translateY}px)`,
                zIndex: isHovered ? 100 : config.zIndex,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => swiperRef.current?.slideToLoop(index)}
            >
              <CardMask
                position={config.position}
                effect={config.effect}
                isActive={config.isActive}
                isHovered={isHovered}
                growOnHover={true}
                cornerContent={
                  config.isActive ? (
                    <>
                      <div className="flex items-center justify-center bg-white text-teal w-25 h-25 rounded-full">
                        <h1 className="heading-lg">0{item.id}</h1>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-[#ffffff25] p-5 rounded-full">
                        <div className="flex items-center justify-center bg-white text-teal w-25 h-25 rounded-full">
                          <h1 className="heading-lg">0{item.id}</h1>
                        </div>
                      </div>
                    </>
                  )
                }
                height={config.height}
                width={config.width}
                notchHeight={config.notchHeight}
                notchWidth={config.notchWidth}
                notchRadius={80}
                borderRadius={20}
                className="w-full h-full"
              >
                {config.isActive && (
                  <div className="bg-white h-full flex flex-col items-center justify-center px-8 py-10">
                    <div className="flex items-end justify-end  w-full">
                      <img src={item.icon} alt="" className="h-20 w-20" />
                    </div>
                    <div className=" h-full flex items-end">
                      <div className="flex flex-col items-start gap-2">
                        <h1 className="heading-sm">{item.title}</h1>
                        <p className="paragraph-md text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardMask>
            </div>
          </SwiperSlide>
        );
      }),
    [data, cardPositions, hoveredIndex, positionConfigs],
  );

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  }, []);

  return (
    <div className="relative max-w-299.25 overflow-hidden mx-auto">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={data.length >= 2}
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          [BREAKPOINTS.mobile]: { slidesPerView: 1, spaceBetween: 10 },
          [BREAKPOINTS.tablet]: { slidesPerView: 2, spaceBetween: 15 },
          [BREAKPOINTS.desktop]: { slidesPerView: 2, spaceBetween: 15 },
          [BREAKPOINTS.desktopLarge]: { slidesPerView: 3, spaceBetween: 30 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setSlidesPerView(swiper.params.slidesPerView as number);
        }}
        onBreakpoint={(swiper) =>
          setSlidesPerView(swiper.params.slidesPerView as number)
        }
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides}
      </Swiper>
    </div>
  );
};
