import Footer from "@/components/CommonComponents/Footer";
import HeroScrollScene from "@/components/HeroScrollScene";
import ImageScrollScene from "@/components/ImageScrollScene";
import CameraSceneModel1 from "@/components/ProductPageComponents/820DCModel/820DCModel";
import CarCameraScene from "@/components/ProductPageComponents/carModel/carModel";
import CarOverlayContentDivs from "@/components/ProductPageComponents/CarOverlay";
import { Compare } from "@/components/ProductPageComponents/ComparasionComponent/ComparasionComponent";
import DriveSmarter from "@/components/ProductPageComponents/DriveSmarter/DriveSmarter";
import EverythingNeedToKnow from "@/components/ProductPageComponents/EverythingNeedToKnow/EverythingNeedToKnow";
import HeroOverlayText from "@/components/ProductPageComponents/HeroOverlayText";
import LensOverlayText from "@/components/ProductPageComponents/LensOverlayText";
import ProductFeatureTable from "@/components/ProductPageComponents/ProductFeatureTable/ProductFeatureTable";
import ZenVue from "@/components/ProductPageComponents/ZenVue/ZenVue";
import React from "react";

const Page = () => {
  return (
    <section>
      <HeroOverlayText />
      <div
        id="model0-scroll-container"
        style={{ height: "600vh", position: "relative" }}
      >
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <HeroScrollScene />
        </div>
      </div>
{/* 
      <LensOverlayText />
      <CarOverlayContentDivs /> */}

      <div
        id="model1-scroll-container"
        style={{ height: "7000vh", position: "relative" , backgroundColor:"white"}}
      >
        <div
          style={{ position: "sticky", top: 0, zIndex: 1,backgroundColor:"white" }}
        >
          <CameraSceneModel1 />
        </div>
      </div>

      {/* <div
        id="model2-scroll-container"
        style={{ height: "1000vh", position: "relative" }}
      >
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <CarCameraScene />
        </div>
      </div> */}
      <Compare />
      <ZenVue />
      <ProductFeatureTable />
      <EverythingNeedToKnow />
      <DriveSmarter />
      <Footer />
    </section>
  );
};

export default Page;
