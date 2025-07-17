"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkBanner from "@/components/CommonComponents/DarkBanner/DarkBanner";
import { OverlayCard } from "@/components/CommonComponents/OverlayCard/OverlayCard";
import { SideImageCard } from "@/components/CommonComponents/SideImageCard/SideImageCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";
import { Typography } from "@/components/CommonComponents/Typography/Typography";

gsap.registerPlugin(ScrollTrigger);
type Tab = {
  id: string;
  label: string;
  model?: string;
};

const tabs: Tab[] = [
  { id: "capture", label: "Capture Every Detail in 4K", model: "VREC-Z820DC" },
  { id: "display", label: "Larger Display", model: "VREC-H520DC" },
  { id: "gps", label: "GPS Tracking and Safety Alerts", model: "VREC-H320SC" },
  { id: "compact", label: "Compact Design", model: "VREC-H120SC" },
];

const contentMap = {
  capture: {
    banner: {
      title: "Hard to see on unlit roads?",
      description: `Ever missed something on a dark road or under harsh headlights?\nThe AI night vision picks up details clearly, even in low light or \nrainy evening drives.`,
      imageSrc: "/modelImages/VREC-Z820DC/image1.png",
      buttonLabel: "Learn More",
      buttonLink: "/products/night-vision-dashcam",
      imageWidth: 700,
      imagePositionClass: "bottom-0 left-[50%] right-6" 
    },
    overlay: {
      image: "/modelImages/VREC-Z820DC/image2.png",
      title: `Blurry when\nit counts?`,
      description: `Frustrated with blurry footage\nwhen it matters most?\nThis one records in true 4K, so\nnumber plates and road signs\nstay sharp, even when you're\ndriving fast.`,
    },
    sideCard: {
      image: "/modelImages/VREC-Z820DC/image3.png",
      title: `Glare ruining\nyour footage?`,
      description: `City lights, tunnels, and glare\ncan mess with footage. The\nSTARVIS sensor handles all\nthat smoothly, so your video\nalways comes out clear.`,
    },
  },
  display: {
    banner: {
      title: `Struggling to catch fine \ndetails on the road?`,
      description: `Records in crisp 2K with HDR and ideal for\n capturing fine details like plates and street signs.`,
      imageSrc: "/modelImages/VREC-H520DC/image1.png",
      buttonLabel: "Explore",
      buttonLink: "/products/wide-display",
      imagePositionClass: "bottom-0 left-[42%]" 
    },
    overlay: {
      image: "/modelImages/VREC-H520DC/image2.png",
      title: `Feel like you're\n not seeing \nenough?`,
      description: `A wider field of vision\n paired with a large screen\nmakes it easy to see more\n of every drive.`,
    },
    sideCard: {
      image: "/modelImages/VREC-H520DC/image3.png",
      title: `Can’t trust\n your cam after\n sunset?`,
      description: `Enhanced night vision with\n STARVIS 2 delivers clear\n footage even in low-light \nconditions.`,
    },
  },
  gps: {
    banner: {
      title: `Worried about missing \nthings in traffic?`,
      description: `ADAS alerts help you stay on track and aware of\n surroundings in city traffic or highways.`,
      imageSrc: "/modelImages/VREC-H320SC/image1.png",
      buttonLabel: "See How",
      buttonLink: "/products/gps-dashcam",
      imagePositionClass: "bottom-0 left-[42%]" 
    },
    overlay: {
      image: "/modelImages/VREC-H320SC/image2.png",
      title: `Dealing with\n sudden light\n changes while\n driving?`,
      description: `WDR automatically adjusts\n exposure in tunnels, shadows\n and bright sunlight.`,
    },
    sideCard: {
      image: "/modelImages/VREC-H320SC/image3.png",
      title: "Find tiny \n screens\n frustrating?",
      description: `Large display gives you better\n visual feedback while\n reviewing footage or adjusting \nsettings.`,
    },
  },
  compact: {
    banner: {
      title: `Hate the bulky setups\n on your dash?`,
      description: `A sleek, minimal design that doesn’t take up\n space, perfect for discreet installs.`,
      imageSrc: "/modelImages/VREC-H120SC/image1.png",
      buttonLabel: "Check It Out",
      buttonLink: "/products/compact-dashcam",
      imagePositionClass: "bottom-0 left-[40%]" 
    },
    overlay: {
      image: "/modelImages/VREC-H120SC/image2.png",
      title: `Not a tech \nperson?`,
      description: `Quick setup and app-based \ncontrol make it beginner-friendly \nfrom day one.`,
      imageClassName:"w-[100%]  h-[100%] mt-2"
    },
    sideCard: {
      image: "/modelImages/VREC-H120SC/image3.png",
      title: "Ever wish your \n footage looked\n sharper?",
      description: `1.5K recording gives you \nsharper footage without the bulk\n of bigger cams.`,
      imageClassName:"w-[90%]  h-[80%]"
    },
  },
};

export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState("capture");
  const currentContent = contentMap[activeTab as keyof typeof contentMap];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-10px", once: false });

  return (
    <section className="relative min-h-screen py-12 px-4 text-white max-w-6xl xl:max-w-[90%] mt-20  mx-auto">
       <Typography variant="card-heading" className="!font-medium  text-center text-white  px-6">
        What Matters Most When You Drive?
      </Typography>
      <Typography variant="card-body" className="text-[#ABABAB] xl:pt-[0.8em] lg:xl:pt-[0.6em]  text-center !font-normal ">Choose features for your drive</Typography>

      {/* Tabs */}
      <div className="max-w-7xl xl:max-w-[90%] w-full mx-auto mb-44 xl:mt-12">
        <div className="flex  justify-between items-center">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium transition-colors duration-300 border-b-2 border-transparent cursor-pointer relative ${
                activeTab === tab.id ? "text-white" : "text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center relative z-10">
                <div className="md:block hidden text-[17px] font-bold">{tab.label}</div>
                <div className="md:hidden block text-[12px] font-bold">{tab.model}</div>
                <AnimatePresence mode="wait" >
                  {tab.model && activeTab === tab.id && (
                    <motion.div
                      key="model"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-sm text-[#ABABAB]/80 mt-1 hidden md:block"
                    >
                      {tab.model}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Animated underline */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    duration: 0.4,
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="relative mx-auto">
        <div ref={sectionRef}>
          <AnimatePresence mode="wait">
            <DarkBanner {...currentContent.banner} />
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {(() => {
            const currentModel = tabs.find((t) => t.id === activeTab)?.model;

            if (currentModel === "VREC-H520DC") {
              return (
                <>
                  <SideImageCard {...currentContent.sideCard} />
                  <OverlayCard {...currentContent.overlay} />
                </>
              );
            } else if (currentModel === "VREC-H120SC") {
              return (
                <>
                  <SideImageCard {...currentContent.overlay} />
                  <SideImageCard {...currentContent.sideCard} />
                </>
              );
            }

            return (
              <>
                <OverlayCard {...currentContent.overlay} />
                <SideImageCard {...currentContent.sideCard} />
              </>
            );
          })()}
        </div>
      </div>
      <AnimatePresence>
        {isInView && (
          <motion.a
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed bottom-8 left-1/2 md:w-auto w-[100%] px-auto flex items-center gap-5 transform -translate-x-1/2 z-50 bg-[#262626] text-white font-medium pl-[24px] pr-4 py-[15px] rounded-full shadow-xl hover:bg-gray-200 transition-all text-[18px] md:text-base lg:text-[14px] xl:text-[17px]"
            href={currentContent.banner.buttonLink}
          >
            Explore the {tabs.find((t) => t.id === activeTab)?.model} Now{" "}
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
