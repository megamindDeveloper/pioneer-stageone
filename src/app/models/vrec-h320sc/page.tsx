import { faqData } from "@/app/utils/FaqData/FaqData";
import { defaultProducts } from "@/app/utils/ProductData/ProductData";
import Footer from "@/components/CommonComponents/Footer";
import HeroScrollScene from "@/components/HeroScrollScene";
import ImageScrollScene from "@/components/ImageScrollScene";
import Model3 from "@/components/ProductPageComponents/320SCModel/320SCModel";
import CameraToCarScene from "@/components/ProductPageComponents/529CDModel/520CDModel";
import CameraSceneModel1 from "@/components/ProductPageComponents/820DCModel/820DCModel";
import CarCameraScene from "@/components/ProductPageComponents/carModel/carModel";
import CarOverlayContentDivs from "@/components/ProductPageComponents/CarOverlay";
import { Compare } from "@/components/ProductPageComponents/ComparasionComponent/ComparasionComponent";
import DriveSmarter from "@/components/ProductPageComponents/DriveSmarter/DriveSmarter";
import EverythingNeedToKnow from "@/components/ProductPageComponents/EverythingNeedToKnow/EverythingNeedToKnow";
import HeroOverlayText from "@/components/ProductPageComponents/HeroOverlayText";
import LensOverlayText from "@/components/ProductPageComponents/LensOverlayText";
import Model3LensOverlayText from "@/components/ProductPageComponents/Model3LensOverlayText";
import ProductFeatureTable from "@/components/ProductPageComponents/ProductFeatureTable/ProductFeatureTable";
import ZenVue from "@/components/ProductPageComponents/ZenVue/ZenVue";
import React from "react";

const Page = () => {
  return (
    <section>
      <HeroOverlayText
      overlays={{
        s1: {
          title: "Precision in Motion",
          heading: "Full HD Recording",
          description:
            "The front camera records in crisp 1080p, giving you sharp visuals for everyday drives, traffic incidents or unexpected moments.",
        },
      }}
    />

      <div id="model0-scroll-container" style={{ position: "relative" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <HeroScrollScene
            heading="Every Drive Backed by Proof"
            subheading="The VREC‑H320SC combines real-time driver alerts with built-in G Sensor for emergency recording."
              imageSrc="/images/lens.webp"
          />
        </div>
      </div>

      <Model3LensOverlayText />

      <div id="model1-scroll-container" style={{  position: "relative", backgroundColor: "balck" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "balck" }}>
          <Model3 />
        </div>
      </div>
      <Compare
        tabs={[
          {
            tabtitle: "Want Driving Alerts?",

            heading: "Get More from Your Daily Drive",
            subheading: "The VREC-H320SC adds smart driving support, automatic event recording and clear video built for real road conditions.",
            compareHeading: "Helps You Focus on the Drive",
            compareSubheading: "Built-in alerts respond to sudden shifts and lane drifts, giving you a second set of eyes when the road gets busy.",
            image1: "/images/GLOW_BEFORE.webp",
            image2: "/images/GLOW_AFTER.webp",
          },
          {
            tabtitle: "Prefer Auto Recording?",

            heading: "Get More from Your Daily Drive",
            subheading: "The VREC-H320SC adds smart driving support, automatic event recording and clear video built for real road conditions.",
            compareHeading: "Always Ready to Record",
            compareSubheading:
              "When motion or impact is detected, the VREC-320SC begins recording automatically. With parking mode enabled, it helps to capture unexpected incidents even while your car is parked.",
            image1: "/images/NOISE_BEFORE.webp",
            image2: "/images/NOISE_AFTER.webp",
          },
          {
            tabtitle: "Need Clear Footage?  ",
            heading: "Get More from Your Daily Drive",
            subheading: "The VREC-H320SC adds smart driving support, automatic event recording and clear video built for real road conditions.",
            compareHeading: "Built for Shifting Light Conditions",
            compareSubheading: "From harsh sunlight to shaded corners, WDR and Full HD work together to keep your video balanced and clear.",
            image2: "/images/CarBroken.png",
            image1: "/images/page1Images/frontCamera2.webp",
          },
        ]}
      />
      <ZenVue />
      <ProductFeatureTable products={defaultProducts} priorityProductIndex={3} />
      <EverythingNeedToKnow faqData={faqData.set3} />
      <DriveSmarter
        subText="Drive with confidence, capture every moment, & stay protected. Explore what the H320SC brings to every drive."
               image="/modelImages/VREC-H320SC/image1.webp"
      />
      <Footer />
    </section>
  );
};

export default Page;
