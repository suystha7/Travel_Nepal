"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { exclusiveHolidayData } from "@/data/exclusiveHolidayData";

export default function PackageDescription() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < exclusiveHolidayData.length) setIndex(index + 1);
    else setIndex(0);
  };
  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="flex flex-row gap-10 my-[10rem] relative">
      <div className="my-10 relative flex-1">
        <p className="typography-sub-h1-regular mb-3 -mt-50 ml-[38%]">
          {exclusiveHolidayData[index].title}
        </p>
        <p className="typography-large-body-light ml-[38%]">
          {exclusiveHolidayData[index].description}
        </p>

        <div className="absolute left-0 top-0 z-30 overflow-visible">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 225}px)` }}
          >
            {exclusiveHolidayData.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                onClick={() => setIndex(i)}
                animate={
                  i === index
                    ? {
                        width: 452,
                        height: 600,
                        y: -270,
                        scale: 1,
                        x: 0,
                        zIndex: 20,
                      }
                    : {
                        width: 200,
                        height: 260,
                        y: 0,
                        x: -80,
                        scale: 1,
                        zIndex: 30,
                      }
                }
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`relative rounded-3xl overflow-hidden shadow-[0_0_12px_0_#0000003D] cursor-pointer mr-6`}
              >
                <Image
                  src={item.image}
                  alt="image"
                  fill
                  className="object-cover"
                />
                {i === index && (
                  <figcaption>
                    <h3 className="absolute bottom-12 font-semibold left-32 typography-h6-regular -translate-x-1/2 text-white px-3 py-1">
                      Mount Everest
                    </h3>
                    <p className="absolute bottom-5 left-26 font-semibold typography-large-body-regular -translate-x-1/2 text-white px-3 py-1">
                      Starting: NPR 133,333
                    </p>
                  </figcaption>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute right-4 top-40 flex gap-3 z-50">
          <button
            onClick={prevSlide}
            className="bg-white/90 text-black text-lg font-bold p-4 rounded-full shadow-lg hover:bg-white transition disabled:opacity-50"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            disabled={index >= exclusiveHolidayData.length}
            className="bg-white/90 text-black text-lg font-bold p-3 rounded-full shadow-lg hover:bg-white transition disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useState } from "react";
// import everest from "@/assest/mountEverest.png";
// import rara from "@/assest/rara.png";
// import tilicho from "@/assest/tilicho.png";

// export const FramerEg = () => {
//   const images = [everest, rara, tilicho];
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev + 1) % images.length);
//   };

//   const nextIndex = (activeIndex + 1) % images.length;

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 relative overflow-hidden">
//       {/* Active (expanded) image */}
//       <motion.div
//         key={activeIndex}
//         layout
//         animate={{
//           width: 450,
//           height: 600,
//           x: -340,
//           opacity: 1,
//           scale: 1,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 100,
//           damping: 50,
//         }}
//         className="relative rounded-xl overflow-hidden shadow-lg"
//       >
//         <Image
//           src={images[activeIndex]}
//           alt="Active mountain"
//           fill
//           className="object-cover"
//         />
//       </motion.div>

//       {/* Next (small preview) image */}
//       <motion.div
//         key={nextIndex}
//         layout
//         animate={{
//           width: 230,
//           height: 260,
//           x: -390,
//           y: 90,
//           opacity: 0.9,
//           scale: 1,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 100,
//           damping: 50,
//         }}
//         className="relative rounded-xl overflow-hidden shadow-md"
//       >
//         <Image
//           src={images[nextIndex]}
//           alt={`Image`}
//           fill
//           className="object-cover"
//         />
//         {/* </div>
//                     ))}
//                   </div> */}
//         <Image
//           src={images[nextIndex]}
//           alt="Next mountain"
//           fill
//           className="object-cover w-[230px] h-[260px]"
//         />
//       </motion.div>

//       {/* Button */}
//       <button
//         onClick={handleNext}
//         className="absolute bottom-10 px-5 py-2 bg-primary-500 text-white rounded-lg shadow-md"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useState } from "react";
// import everest from "@/assest/mountEverest.png";
// import { exclusiveHolidayData } from "@/data/exclusiveHolidayData";

// export default function FramerEg() {
//   const [index, setIndex] = useState(0);
//   const visibleCount = 4;

//   const nextSlide = () => {
//     if (index < exclusiveHolidayData.length - visibleCount) setIndex(index + 1);
//   };

//   const prevSlide = () => {
//     if (index > 0) setIndex(index - 1);
//   };

//   const mainImage = exclusiveHolidayData[index];

//   return (
//     <div className="flex flex-row gap-10 my-[10rem] relative">
//       {/* ---------------- MAIN IMAGE ---------------- */}
//       <AnimatePresence mode="wait">
//         <motion.figure
//           key={mainImage.id}
//           layout
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1, width: 450, height: 600 }}
//           exit={{ scale: 0.8, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 120, damping: 20 }}
//           className="relative w-[452px] h-[599px] z-20 rounded-3xl overflow-hidden shadow-[0_0_12px_0_#0000003D]"
//         >
//           {/*
//              <motion.div
// //         key={activeIndex}
// //         layout
// //         animate={{
// //           width: 450,
// //           height: 600,
// //           x: -340,
// //           opacity: 1,
// //           scale: 1,
// //         }}
// //         transition={{
// //           type: "spring",
// //           stiffness: 100,
// //           damping: 50,
// //         }}
// //         className="relative rounded-xl overflow-hidden shadow-lg"
// //       > */}
//           <Image
//             src={mainImage.image}
//             alt="image"
//             fill
//             className="object-cover"
//           />
//           <figcaption>
//             <h3 className="absolute bottom-12 font-semibold left-1/2 -translate-x-1/2 typography-h6-regular text-white px-3 py-1">
//               {mainImage.title}
//             </h3>
//             <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-semibold typography-large-body-regular text-white px-3 py-1">
//               Starting: {mainImage.price}
//             </p>
//           </figcaption>
//         </motion.figure>
//       </AnimatePresence>

//       {/* ---------------- DESCRIPTION + THUMBNAILS ---------------- */}
//       <div className="my-10 relative flex-1">
//         <p className="typography-sub-h1-regular mb-3">{mainImage.title}</p>
//         <p className="typography-large-body-light w-[85%]">
//           {mainImage.description}
//         </p>

//         {/* ---------------- THUMBNAILS SLIDER ---------------- */}
//         <div className="absolute -left-[120px] top-60 z-30 w-[1000px] overflow-visible">
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{ transform: `translateX(-${index * 260}px)` }}
//           >
//             {exclusiveHolidayData.map((item, i) => (
//               <div
//                 key={item.id}
//                 onClick={() => setIndex(i)}
//                 className={`min-w-[230px] h-[260px] mr-6 relative rounded-3xl overflow-hidden shadow-[0_0_12px_0_#0000003D] cursor-pointer ${
//                   i === index
//                     ? "scale-110 border-4 border-white z-20"
//                     : "scale-100 opacity-80 z-10"
//                 } transition-all duration-500`}
//               >
//                 <Image
//                   src={item.image}
//                   alt="image "
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* ---------------- BUTTONS ---------------- */}
//           <div className="absolute right-4 -bottom-20 flex gap-3 z-50">
//             <button
//               onClick={prevSlide}
//               disabled={index === 0}
//               className="bg-white/90 text-black text-lg font-bold p-3 rounded-full shadow-lg hover:bg-white transition disabled:opacity-50"
//             >
//               ←
//             </button>
//             <button
//               onClick={nextSlide}
//               disabled={index >= exclusiveHolidayData.length - visibleCount}
//               className="bg-white/90 text-black text-lg font-bold p-3 rounded-full shadow-lg hover:bg-white transition disabled:opacity-50"
//             >
//               →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useState } from "react";
// import everest from "@/assest/mountEverest.png";
// import rara from "@/assest/rara.png";

// export const FramerEg = () => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 relative overflow-hidden">
//       {/* Image container */}
//       <motion.div
//         layout
//         animate={{
//           width: expanded ? 450 : 230,
//           height: expanded ? 600 : 260,
//           x: expanded ? -200 : 0,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 100,
//           damping: 15,
//         }}
//         className="relative rounded-xl overflow-hidden shadow-lg"
//       >
//         <Image
//           src={everest}
//           alt="Mount Everest"
//           fill
//           className="object-cover"
//         />
//       </motion.div>

//       {/* Description appears on expand */}
//       {/* <AnimatePresence>
//         {expanded && (
//           <motion.div
//             key="desc"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 50 }}
//             transition={{ duration: 0.4 }}
//             className="ml-8 max-w-md"
//           >
//             <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//               Product Title
//             </h2>
//             <p className="text-gray-600">
//               This is a detailed description of the product, its story, and why
//               it matters. It appears when the image expands.
//             </p>
//           </motion.div>
//         )}
//       </AnimatePresence> */}
//       <Image
//         src={rara}
//         alt="Mount Everest"
//         width={100}
//         height={100}
//         className="object-cover h-[260px] w-[230px]"
//       />

//       {/* Toggle Button */}
//       <button
//         onClick={() => setExpanded(!expanded)}
//         className="absolute bottom-10 px-5 py-2 bg-primary-500 text-white rounded-lg shadow-md"
//       >
//         {expanded ? "Back" : "Next"}
//       </button>
//     </div>
//   );
// };
