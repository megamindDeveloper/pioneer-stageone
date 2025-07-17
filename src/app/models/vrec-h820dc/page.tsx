
import Footer from "@/components/CommonComponents/Footer";
import HeroScrollScene from "@/components/HeroScrollScene";
import ImageScrollScene from "@/components/ImageScrollScene";
import CameraSceneModel1 from "@/components/ProductPageComponents/820DCModel/820DCModel";
import CarCameraScene from "@/components/ProductPageComponents/carModel/carModel";
import CarOverlayContentDivs from "@/components/ProductPageComponents/CarOverlay";
import { Compare } from "@/components/ProductPageComponents/ComparasionComponent/ComparasionComponent";
import DriveSmarter from "@/components/ProductPageComponents/DriveSmarter/DriveSmarter";
import EverythingNeedToKnow from "@/components/ProductPageComponents/EverythingNeedToKnow/EverythingNeedToKnow";
import LensOverlayText from "@/components/ProductPageComponents/LensOverlayText";
import ProductFeatureTable from "@/components/ProductPageComponents/ProductFeatureTable/ProductFeatureTable";
import ZenVue from "@/components/ProductPageComponents/ZenVue/ZenVue";
import React from "react";

const Page = () => {
  return (
    <section>
   <div className="h-10"></div>
      {/* <HeroScrollScene /> */}

      <LensOverlayText />
      <CarOverlayContentDivs/>
      {/* Section 1: Model 1 scroll area */}
      <div id="model1-scroll-container" style={{ height: "600vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <CameraSceneModel1 />
        </div>
      </div>

      {/* Section 2: Model 2 scroll area */}
      <div id="model2-scroll-container" style={{ height: "1000vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <CarCameraScene />
        </div>
      </div>
      <Compare/>
      <ZenVue/>
      <ProductFeatureTable/>
      <EverythingNeedToKnow/>
      <DriveSmarter/>
      <Footer/>
    </section>
  );
};

export default Page;
