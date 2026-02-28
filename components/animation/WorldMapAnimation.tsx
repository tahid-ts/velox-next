// /* eslint-disable @next/next/no-img-element */
// "use client";
// import { motion } from "framer-motion";

// type CountryDecoration = {
//   preset:
//     | "topLeft"
//     | "topRight"
//     | "leftCenter"
//     | "center"
//     | "rightCenter"
//     | "bottomLeft"
//     | "bottomRight";
//   img: string;
//   name: string;
//   className?: string;
//   x?: number;
//   y?: number;
// };

// const countries: CountryDecoration[] = [
//   {
//     preset: "topLeft",
//     img: "united-states.png",
//     name: "United States",
//     x: -120,
//     y: -120,
//   },
//   {
//     preset: "topRight",
//     img: "australia.png",
//     name: "Australia",
//     x: 150,
//     y: -100,
//   },
//   { preset: "leftCenter", img: "rush.png", name: "Russia", x: -170, y: -20 },
//   { preset: "center", img: "england.png", name: "England", x: 0, y: 0 },
//   { preset: "rightCenter", img: "canada.png", name: "Canada", x: 170, y: 20 },
//   {
//     preset: "bottomLeft",
//     img: "germany.png",
//     name: "Germany",
//     x: -130,
//     y: 110,
//   },
//   { preset: "bottomRight", img: "poland.png", name: "Poland", x: 150, y: 150 },
// ];

// export default function WorldMapAnimation() {
//   return (
//     <div className="relative w-125 h-125 mx-auto">
//       <svg
//         viewBox="0 0 500 500"
//         className="absolute -top-40 left-0 w-full h-full"
//       >
//         <path
//           id="MyPath"
//           fill="none"
//           d="M50,300 C250,50 450,300 450,300"
//           stroke="transparent"
//         />

//         <text fontSize="24" fill="black" fontWeight="bold">
//           <textPath xlinkHref="#MyPath" startOffset="50%" textAnchor="middle">
//             Trusted By Clients Worldwide
//           </textPath>
//         </text>
//       </svg>
//       <div className="absolute inset-0 flex justify-center items-center">
//         <div className="relative  flex justify-center items-center">
//           <motion.img
//             src="/image/market insights/earch-img.png"
//             alt="World"
//             className="h-97.5 w-97.5"
//             animate={{ rotate: 360 }}
//             transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
//           />

//           {countries.map((country, index) => (
//             <motion.div
//               key={index}
//               className={`absolute bg-white rounded-full px-6 py-3 flex gap-2 items-center`}
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1, x: country.x, y: country.y }}
//               transition={{
//                 delay: index * 0.3,
//                 type: "spring",
//                 stiffness: 120,
//               }}
//             >
//               <img
//                 src={`/image/market insights/${country.img}`}
//                 alt={country.name}
//                 className="w-6 h-6"
//               />
//               <p className="font-plus_jakarta font-bold text-sm">
//                 {country.name}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @next/next/no-img-element */
"use client";
import { motion, Variants } from "framer-motion";

type CountryDecoration = {
  preset:
    | "topLeft"
    | "topRight"
    | "leftCenter"
    | "center"
    | "rightCenter"
    | "bottomLeft"
    | "bottomRight";
  img: string;
  name: string;
  x: number;
  y: number;
};

const countries: CountryDecoration[] = [
  {
    preset: "topLeft",
    img: "united-states.png",
    name: "United States",
    x: -120,
    y: -120,
  },
  {
    preset: "topRight",
    img: "australia.png",
    name: "Australia",
    x: 150,
    y: -100,
  },
  { preset: "leftCenter", img: "rush.png", name: "Russia", x: -170, y: -20 },
  { preset: "center", img: "england.png", name: "England", x: 0, y: 0 },
  { preset: "rightCenter", img: "canada.png", name: "Canada", x: 170, y: 20 },
  {
    preset: "bottomLeft",
    img: "germany.png",
    name: "Germany",
    x: -130,
    y: 110,
  },
  { preset: "bottomRight", img: "poland.png", name: "Poland", x: 150, y: 150 },
];

// Motion variants for countries
const countryVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.3,
      type: "spring",
      stiffness: 120,
    },
  }),
};

export default function WorldMapAnimation() {
  return (
    <div className="mt-15 flex items-center justify-center  w-full">
      <div className="relative w-125 h-125 mx-auto">
        <svg
          viewBox="0 0 500 500"
          className="absolute -top-40 left-0 w-full h-full"
        >
          <path
            id="MyPath"
            fill="none"
            d="M50,300 C250,50 450,300 450,300"
            stroke="transparent"
          />
          <text fontSize="24" fill="black" fontWeight="bold">
            <textPath xlinkHref="#MyPath" startOffset="50%" textAnchor="middle">
              Trusted By Clients Worldwide
            </textPath>
          </text>
        </svg>

        <div className="absolute inset-x-0 flex justify-center items-center mt-14">
          <div className="relative flex justify-center items-center">
            {/* Rotating globe */}
            <motion.img
              src="/image/market insights/earch-img.png"
              alt="World"
              className="h-97.5 w-97.5"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            />

            {/* Country decorations */}
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                className="absolute bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-md"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={countryVariants}
                style={{ x: country.x, y: country.y }}
              >
                <img
                  src={`/image/market insights/${country.img}`}
                  alt={country.name}
                  className="w-6 h-6"
                />
                <p className="font-plus_jakarta font-bold text-sm">
                  {country.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
