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
      
      {/* <Model4LensOverlayText /> */}
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
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "Designed for the Details",
            compareSubheading:
              "Most dashcams blur the truth at night. The Z820DC, equipped with night vision AI and a STARVIS sensor, captures license plates, movements and moments even in low light.",
            tabtitle: "Drive Late?",
            image1: "/images/GLOW_BEFORE.webp",
            image2: "/images/GLOW_AFTER.webp",
          },
          {
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "Clarity That Keeps Up With Your Commute ",
            compareSubheading:
              "From sharp sunlight to shadowy underpasses, the Sony STARVIS sensor adapts in real time — handling glare, contrast and light shifts with ease for clear and consistent footage in every driving condition.",
            tabtitle: "On The Road Daily?",
            image1: "/images/NOISE_BEFORE.webp",
            image2: "/images/NOISE_AFTER.webp",
          },
          {
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "Clarity That Keeps Up With Your Commute",
            compareSubheading:
              "From sharp sunlight to shadowy underpasses, the Sony STARVIS sensor adapts in real time — handling glare, contrast and light shifts with ease for clear and consistent footage in every driving condition.",
            tabtitle: "Prefer Dual 4K Coverage?",
            image2: "/comparisionImages/car-was-broken-car-accident 1.png",
            image1: "/images/page1Images/frontCamera2.webp",
          },
        ]}
      />
      <ZenVue />
      <section className="bg-black">
        <ProductFeatureTable products={defaultProducts} priorityProductIndex={0} />
      </section>
      <EverythingNeedToKnow faqData={faqData.set1} />
      <DriveSmarter
        subText="Drive with confidence, capture every moment, & stay protected. Explore what the Z820DC brings to every drive."
        image="/modelImages/VREC-Z820DC/00571.webp"
      />
      <Footer />
    </section>
  );
};

export default Page;
