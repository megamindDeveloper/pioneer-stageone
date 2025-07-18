"use client";

import { Typography } from "@/components/CommonComponents/Typography/Typography";
import Image from "next/image";
import React from "react";

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
    link: "/products/wide-display",
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

export default function ProductComparisonTable() {
  return (
    <section className="b text-white px-4 md:px-8 py-20 max-w-7xl  xl:max-w-[90%] mx-auto mt-20">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <Typography variant="h2" className="!font-semibold mb-2 text-[40px]">
        Pick Your Level of Performance
        </Typography>
        <p className="text-[#ABABAB]/80 text-sm md:text-base ">See how each dashcam delivers on clarity, safety, and control.</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px] grid grid-cols-[200px_repeat(4,minmax(150px,1fr))] gap-x-6 text-left">
          {/* Product Images and Links */}
          <div />
          {products.map((product, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="relative w-40 h-28 mx-auto">
                {/* Gradient Overlay */}
            

                {/* Product Image */}
                <Image src={product.image} alt={product.name} fill className="object-contain w-full h-full relative z-0" />
              </div>

              <h3 className="text-[17px] font-bold">{product.name}</h3>
              <div className="flex flex-col items-center">
                <a href={product.link} className="text-[#AD2239] text-xs  mb-1 font-extrabold">
                  Learn More &gt;
                </a>
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
    </section>
  );
}
