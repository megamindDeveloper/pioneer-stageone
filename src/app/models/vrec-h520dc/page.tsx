import { faqData } from "@/app/utils/FaqData/FaqData";
import { defaultProducts } from "@/app/utils/ProductData/ProductData";
import Footer from "@/components/CommonComponents/Footer";
import HeroScrollScene from "@/components/HeroScrollScene";
import ImageScrollScene from "@/components/ImageScrollScene";
import CameraToCarScene from "@/components/ProductPageComponents/529CDModel/520CDModel";
import CameraSceneModel1 from "@/components/ProductPageComponents/820DCModel/820DCModel";
import CarCameraScene from "@/components/ProductPageComponents/carModel/carModel";
import CarOverlayContentDivs from "@/components/ProductPageComponents/CarOverlay";
import { Compare } from "@/components/ProductPageComponents/ComparasionComponent/ComparasionComponent";
import DriveSmarter from "@/components/ProductPageComponents/DriveSmarter/DriveSmarter";
import EverythingNeedToKnow from "@/components/ProductPageComponents/EverythingNeedToKnow/EverythingNeedToKnow";
import HeroOverlayText from "@/components/ProductPageComponents/HeroOverlayText";
import LensOverlayText from "@/components/ProductPageComponents/LensOverlayText";
import Model2LensOverlayText from "@/components/ProductPageComponents/Model2LensOverlayText";
import ProductFeatureTable from "@/components/ProductPageComponents/ProductFeatureTable/ProductFeatureTable";
import ZenVue from "@/components/ProductPageComponents/ZenVue/ZenVue";
import React from "react";

const Page = () => {
  return (
    <section>
      <HeroOverlayText
        overlays={{
          s1: {
            title: "Sharp Footage in Low Light",
            heading: "AI Powered Night Vision",
            description:
              "An 8MP sensor that captures sharp, detailed video with high sensitivity, preserving image quality even during night drives and low-light conditions.",
          },
        }}
      />

      <div id="model0-scroll-container" style={{ position: "relative" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <HeroScrollScene
            heading="When Detail Matters the Most"
            subheading="VREC‑H520DC captures sharp 2K video, even in low light and on the move."
             imageSrc="/images/lens.webp"
          />
        </div>
      </div>
      {/* 
      <LensOverlayText />
      <CarOverlayContentDivs /> */}
      <Model2LensOverlayText />
      <div id="model1-scroll-container" style={{ position: "relative", backgroundColor: "balck" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "balck" }}>
          <CameraToCarScene />
        </div>
      </div>
      <Compare
        tabs={[
          {
            tabtitle: "Drive every day?",

            heading: "Discover the Tools Built for Real Roads",
            subheading:
              "Smartly built for everyday drives, the H520DC offers clear 2K HDR footage, wide-road coverage and helpful driving alerts, all tuned for real conditions.",
            compareHeading: "Clear Footage in Motion and Light",
            compareSubheading:
              "With 2K HDR recording, the H520DC keeps your video sharp across bright sun, moving traffic, and fast-changing streets.",
            image1: "/images/GLOW_BEFORE.webp",
            image2: "/images/GLOW_AFTER.webp",
          },
          {
            tabtitle: "Need Wider Visibility?",

            heading: "Discover the Tools Built for Real Roads",
            subheading:
              "Smartly built for everyday drives, the H520DC offers clear 2K HDR footage, wide-road coverage and helpful driving alerts, all tuned for real conditions.",
            compareHeading: "Built for a Broader View ",
            compareSubheading:
              "The VREC-H520DC captures a wider view with its 140-degree lens, letting you see more of the road, side lanes, and unexpected moments others often miss.",
            image1: "/images/NOISE_BEFORE.webp",
            image2: "/images/NOISE_AFTER.webp",
          },
          {
            tabtitle: "Prefer Dual Coverage?",
            heading: "Discover the Tools Built for Real Roads",
            subheading:
              "Smartly built for everyday drives, the H520DC offers clear 2K HDR footage, wide-road coverage and helpful driving alerts, all tuned for real conditions.",
            compareHeading: "Coverage That Looks Both Ways",
            compareSubheading:
              "The dual-channel Dash Cam records front and rear in high resolution, with sharp 2K footage ahead and Full HD behind for clear synchronized coverage.",
            image2: "/images/CarBroken.png",
            image1: "/images/page1Images/frontCamera2.webp",
          },
        ]}
      />
      <ZenVue />
      <ProductFeatureTable products={defaultProducts} priorityProductIndex={1} />
      <EverythingNeedToKnow faqData={faqData.set2} />
      <DriveSmarter
        subText="Drive with confidence, capture every moment, & stay protected. Explore what the H520DC brings to every drive."
           image="/modelImages/VREC-H520DC/image1.webp"
      />
      {/* <div
        id="model2-scroll-container"
        style={{ height: "1000vh", position: "relative" }}
      >
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <CarCameraScene />
        </div>
      </div> */}
      {/* <Compare />
      <ZenVue />
      <ProductFeatureTable />
      <EverythingNeedToKnow />
      <DriveSmarter /> */}
      <Footer />
    </section>
  );
};

export default Page;
