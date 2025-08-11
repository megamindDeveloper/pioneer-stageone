"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import DashcamShowcase from "../components/MainPageComponents/DashcamShowcase/DashcamShowcase";
import ProductDetials from "../components/MainPageComponents/ProductDetailPage/ProductDetials";
import ProductComparisonTable from "@/components/MainPageComponents/ProductComparisonTable/ProductComparisonTable";
import FeatureAccordion from "@/components/MainPageComponents/FeatureAccordion/FeatureAccordion";
import Footer from "@/components/CommonComponents/Footer";
import FadeLoader from "@/components/CommonComponents/Loader";
import DashcamShowcaseMobile from "@/components/MainPageComponents/DashcamShowcase/DashcamShowcaseMobile";
const CameraScene = dynamic(() => import("../components/ThreeJsComponents/CameraScene"), {
  ssr: false,
});

export default function Home() {
  const [modelReady, setModelReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg: <1024px
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {/* ✅ Loader rendered from the page itself */}
      {!modelReady && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <FadeLoader isModelReady={false} />
        </div>
      )}
      <div className="w-full h-full bg-gradient-to-b ">
        <CameraScene onModelReady={() => setModelReady(true)} />
        {isMobile ? <DashcamShowcaseMobile /> : <DashcamShowcase />}
        <ProductDetials />
        <ProductComparisonTable />
        <FeatureAccordion />
        <Footer />
        {/* <CameraScenetest/> */}
      </div>
    </>
  );
}
