"use client";

// import { Typography } from "@/components/CommonComponents/Typography/Typography";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { SpecsModal } from "../modals/SpecsModal/SpecsModal";
import { ChevronRight } from "lucide-react";
import { useInView } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
const products = [
  {
    name: "VREC - Z820DC",
    image: "/modelImages/VREC-Z820DC/thumb.png", // Replace with actual image path
    link: "/products/night-vision-dashcam",
    features: ["4K", "Yes", "Front\n+\nRear", "104mm x 39mm\n x  43.3mm", "Yes", "Yes", "Ideal For Power\n  Users"],
  },
  {
    name: "VREC - H520DC",
    image: "/modelImages/VREC-H520DC/thumb.png",
    link: "/modelImages/VREC-H520DC/thumb.png",
    features: ["2K", "-", "Front\n+\nRear", "88mm x 29.3mm\n  x  55.6mm", "Yes", "Yes", "Ideal For Experienced\n  Users"],
  },
  {
    name: "VREC - H320SC",
    image: "/modelImages/VREC-H320SC/thumb.png",
    link: "/products/gps-dashcam",
    features: ["Full HD", "-", "Front \n+\n Rear (Optional)", "90mm x 34.8mm\n  x 54.25mm", "Yes", "Yes", "Ideal for Practical\n  Users"],
  },
  {
    name: "VREC - H120SC",
    image: "/modelImages/VREC-H120SC/thumb.png",
    link: "/products/compact-dashcam",
    features: ["1.5K", "-", "Front", "31.12mm x 28.8mm\n  x 37.33mm", "-", "Yes", "Ideal for First-Time\n  Users"],
  },
];

const features = [
  "Video Resolution",
  "AI Enabled Night Vision",
  "Camera Setup",
  "Model Dimensions",
  "ADAS Alerts",
  "ZenVue App Support",
  "Storage Capacity",
];

export default function ProductFeatureTable() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-10px", once: false });
  return (
    <section className="b text-white px-4 md:px-8 py-20 max-w-7xl  xl:max-w-[90%] mx-auto mt-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className=" text-center text-[48px] font-medium tracking-wide mb-2">Which One’s Built for You?</h2>
        <p className="text-[#ABABAB]/80 text-sm md:text-base">Compare the key features across each model</p>
      </div>

      <div className="overflow-x-auto" >
        <div className="min-w-[800px] grid grid-cols-[200px_repeat(4,minmax(150px,1fr))] gap-x-6 text-left">
          {/* Product Images and Links */}
          <div />
          {products.map((product, i) => (
            <div key={i} className="text-center space-y-4">
              <div ref={sectionRef} className="relative w-40 h-28 mx-auto">
                {/* Gradient Overlay */}

                {/* Product Image */}
                <Image src={product.image} alt={product.name} fill className="object-contain w-full h-full relative z-0" />
              </div>

              <h3 className="text-[17px] font-bold">{product.name}</h3>
              <div className="flex flex-col items-center">
                {product.name === "VREC - Z820DC" ? (
                  <span className="text-[#8C8C8C] text-[14px] font-medium">Currently Viewing</span>
                ) : (
                  <a href={product.link} className="text-[#AD2239] text-xs mb-1 font-extrabold">
                    Learn More &gt;
                  </a>
                )}
                <div className="my-6 w-[70%] h-[1px] bg-[#4B4B4B]/80" />
              </div>
            </div>
          ))}
          {/* Feature Rows */}
          {features.map((feature, rowIndex) => (
            <React.Fragment key={feature}>
              <div className="py-6  text-[20px] font-bold">{feature}</div>
              {products.map((product, colIndex) => (
                <div key={colIndex} className="py-6  text-[17px] text-center text-[#ABABAB] whitespace-pre-line">
                  {product.features[rowIndex]}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <SpecsModal isOpen={open} onClose={() => setOpen(false)} />

      <AnimatePresence>
        {isInView && (
          <motion.a
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed bottom-8 left-1/2 md:w-auto w-[100%] px-auto flex items-center gap-5 transform -translate-x-1/2 z-50 bg-[#262626] text-white font-medium pl-[24px] pr-4 py-[15px] rounded-full shadow-xl hover:bg-gray-200 transition-all text-[18px] md:text-base lg:text-[14px] xl:text-[17px]"
          
          >
             Detailed Specs
            <svg width="30" height="30" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.1875" y="0.317383" width="42.6269" height="42.4082" rx="21.2041" fill="#4F4C4C" />
              <path d="M19.1875 26.7256L23.8145 21.5215L19.1875 16.3174" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  );
}
