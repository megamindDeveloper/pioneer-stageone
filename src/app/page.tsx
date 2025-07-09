"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import DashcamShowcase from "../components/MainPageComponents/DashcamShowcase/DashcamShowcase";
import ProductDetials from "../components/MainPageComponents/ProductDetailPage/ProductDetials";
import ProductComparisonTable from "@/components/MainPageComponents/ProductComparisonTable/ProductComparisonTable";
import FeatureAccordion from "@/components/MainPageComponents/FeatureAccordion/FeatureAccordion";
import Footer from "@/components/CommonComponents/Footer";
import FadeLoader from "@/components/CommonComponents/Loader";
const CameraScene = dynamic(() => import("../components/ThreeJsComponents/CameraScene"), {
  ssr: false,
});

export default function Home() {
  const [modelReady, setModelReady] = useState(false);
  return (
    <>
      {/* ✅ Loader rendered from the page itself */}
      {!modelReady && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <FadeLoader isModelReady={false} />
        </div>
      )}
      <div className="w-full h-full bg-gradient-to-b from-[#0D0D0D] to-transparent">
        <CameraScene onModelReady={() => setModelReady(true)} />
        <DashcamShowcase />
        <ProductDetials />
        <ProductComparisonTable />
        <FeatureAccordion />
        <Footer />
        {/* <CameraScenetest/> */}
      </div>
    </>
  );
}
