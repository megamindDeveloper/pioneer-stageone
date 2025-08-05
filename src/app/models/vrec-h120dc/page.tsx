import { faqData } from "@/app/utils/FaqData/FaqData";
import { defaultProducts } from "@/app/utils/ProductData/ProductData";
import Footer from "@/components/CommonComponents/Footer";
import HeroScrollScene from "@/components/HeroScrollScene";
import ImageScrollScene from "@/components/ImageScrollScene";
import Model4 from "@/components/ProductPageComponents/120DCModel/120DCModel";
import CameraToCarScene from "@/components/ProductPageComponents/529CDModel/520CDModel";
import CameraSceneModel1 from "@/components/ProductPageComponents/820DCModel/820DCModel";
import CarCameraScene from "@/components/ProductPageComponents/carModel/carModel";
import CarOverlayContentDivs from "@/components/ProductPageComponents/CarOverlay";
import { Compare } from "@/components/ProductPageComponents/ComparasionComponent/ComparasionComponent";
import DriveSmarter from "@/components/ProductPageComponents/DriveSmarter/DriveSmarter";
import EverythingNeedToKnow from "@/components/ProductPageComponents/EverythingNeedToKnow/EverythingNeedToKnow";
import HeroOverlayText from "@/components/ProductPageComponents/HeroOverlayText";
import LensOverlayText from "@/components/ProductPageComponents/LensOverlayText";
import Model4LensOverlayText from "@/components/ProductPageComponents/Model4LensOverlayText";
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

      <div id="model0-scroll-container" style={{ height: "600vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <HeroScrollScene
            heading="Compact Design That Stays Out of the Way"
            subheading="VREC‑H120SC is a compact dash cam that captures clear 1.5K footage while staying out of the way."
          />
        </div>
      </div>
      
      <Model4LensOverlayText />
      {/* 
      <LensOverlayText />
      <CarOverlayContentDivs /> */}

      <div id="model1-scroll-container" style={{  position: "relative", backgroundColor: "balck" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "balck" }}>
          <Model4 />
        </div>
      </div>

      <Compare
        tabs={[
          {
            tabtitle: "Need something compact?",

            heading: "Designed to Keep Things Simple ",
            subheading:
              "The VREC-H120SC is built for simplicity with a clean design, Full HD clarity and essential features that fit into any drive, without getting in the way.",
            compareHeading: "A Compact Fit for Every Drive",
            compareSubheading:
              "This model fits neatly into your windshield space without blocking your view. A clean look with no distractions, just smart recording.",
            image1: "/images/GLOW_BEFORE.webp",
            image2: "/images/GLOW_AFTER.webp",
          },
          {
            tabtitle: "First dashcam?",

            heading: "Designed to Keep Things Simple ",
            subheading:
              "The VREC-H120SC is built for simplicity with a clean design, Full HD clarity and essential features that fit into any drive, without getting in the way.",
            compareHeading: "Built for Beginners",
            compareSubheading:
              "The VREC-H120SC keeps things simple with clear recording and no complicated setup, making it ideal if you're new to dashcams.",
            image1: "/images/NOISE_BEFORE.webp",
            image2: "/images/NOISE_AFTER.webp",
          },
          {
            tabtitle: "Want a simple setup? ",
            heading: "Designed to Keep Things Simple ",
            subheading:
              "The VREC-H120SC is built for simplicity with a clean design, Full HD clarity and essential features that fit into any drive, without getting in the way.",
            compareHeading: "Clarity in a minimal design ",
            compareSubheading:
              "The VREC-H120SC records in 1296p with a 2MP sensor, giving you sharper footage that makes it easier to read plates, spot signs and review details when it matters.",
            image2: "/images/CarBroken.png",
            image1: "/images/page1Images/frontCamera2.webp",
          },
        ]}
      />
      <ZenVue />
      <ProductFeatureTable products={defaultProducts} priorityProductIndex={3} />
      <EverythingNeedToKnow faqData={faqData.set3} />
      <DriveSmarter
        subText="Drive with confidence, capture every moment, & stay protected. Explore what the H120SC brings to every drive."
        image="/modelImages/VREC-H120SC/image1.webp"
      />
      <Footer />
    </section>
  );
};

export default Page;
