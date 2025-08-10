"use client";
import React, { useState } from 'react'
import dynamic from "next/dynamic";
import { Compare } from '@/components/ProductPageComponents/ComparasionComponent/ComparasionComponent';
import ZenVue from '@/components/ProductPageComponents/ZenVue/ZenVue';
import ProductFeatureTable from '@/components/ProductPageComponents/ProductFeatureTable/ProductFeatureTable';
import { defaultProducts } from '../utils/ProductData/ProductData';
import EverythingNeedToKnow from '@/components/ProductPageComponents/EverythingNeedToKnow/EverythingNeedToKnow';
import { faqData } from '../utils/FaqData/FaqData';
import DriveSmarter from '@/components/ProductPageComponents/DriveSmarter/DriveSmarter';
import Footer from '@/components/CommonComponents/Footer';


import Model4TextOverlay from '@/components/Model4Components/Textoverlay/Textoverlay';
import Model1TextOverlay from '@/components/Model1Components/Textoverlay/Textoverlay';
import FadeLoader from '@/components/CommonComponents/Loader';
const Blender2JSPage = dynamic(() => import("../../components/Model1Components/MobileBlender/MobileBlender"), {
  ssr: false,
});

const page = () => {
  const [modelReady, setModelReady] = useState(false);
  return (
    <div>
      {!modelReady && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <FadeLoader isModelReady={false} />
        </div>
      )}
      <Blender2JSPage onModelReady={() => setModelReady(true)}/>
      <Model1TextOverlay />
      <Compare
        tabs={[
          {
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "Designed for the Details",
            compareSubheading:
              "Most dashcams blur the truth at night. The Z820DC, equipped with night vision AI and a STARVIS sensor, captures license plates, movements and moments even in low light.",
            tabtitle: "Drive Late?",
            image1: "/productPageImages/comparisionImages/h120sc/120-Compact -1CARD.webp",
            image2: "/productPageImages/comparisionImages/h120sc/120-Compact -1CARD.webp",
          },
          {
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "Clarity That Keeps Up With Your Commute ",
            compareSubheading:
              "From sharp sunlight to shadowy underpasses, the Sony STARVIS sensor adapts in real time — handling glare, contrast and light shifts with ease for clear and consistent footage in every driving condition.",
            tabtitle: "On The Road Daily?",
            image1: "/productPageImages/comparisionImages/h120sc/120-Drive -2CARD.webp",
            image2: "/productPageImages/comparisionImages/h120sc/120-Drive -2CARD.webp",
          },
          {
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "Clarity That Keeps Up With Your Commute",
            compareSubheading:
              "From sharp sunlight to shadowy underpasses, the Sony STARVIS sensor adapts in real time — handling glare, contrast and light shifts with ease for clear and consistent footage in every driving condition.",
            tabtitle: "Prefer Dual 4K Coverage?",
            image2: "/productPageImages/comparisionImages/h120sc/120 BEFORE.webp",
            image1: "/productPageImages/comparisionImages/h120sc/120 AFTER.webp",
            compare:true,
          },
        ]}
      />
      <ZenVue />
      <section className="bg-black">
        <ProductFeatureTable products={defaultProducts} priorityProductIndex={3} />
      </section>
      <EverythingNeedToKnow faqData={faqData.set3} />
      <DriveSmarter
        subText="Drive with confidence, capture every moment, & stay protected. Explore what the Z820DC brings to every drive."
        image="/productPageImages/driveSmarterImages/h120sc/image1.webp"
      />
      <Footer />
    </div>
  )
}

export default page
