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

import Model1TextOverlay from '@/components/Model1Components/Textoverlay/Textoverlay';

import Blender2JSPage from '../page4/page';
import Model4TextOverlay from '@/components/Model4Components/Textoverlay/Textoverlay';


const page = () => {
  const [modelReady, setModelReady] = useState(false);
  return (
    <div className='bg-black'>
     
      {/* <Blender2JSPage/> */}
      <Model4TextOverlay />
      <Compare
        tabs={[
          {
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "A Compact Fit for Every Drive",
            compareSubheading:
              "This model fits neatly into your windshield space without blocking your view. A clean look with no distractions, just smart recording.",
            tabtitle: "Need something compact?",
            image1: "/productPageImages/comparisionImages/h120sc/120-Compact -1CARD.webp",
            image2: "/productPageImages/comparisionImages/h120sc/120-Compact -1CARD.webp",
          },
          {
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "Built for Beginners",
            compareSubheading:
              "The VREC-H120SC keeps things simple with clear recording and no complicated setup, making it ideal if you're new to dashcams.",
            tabtitle: "First dashcam?",
            image1: "/productPageImages/comparisionImages/h120sc/120-1st  (1).webp",
            image2: "/productPageImages/comparisionImages/h120sc/120-1st  (1).webp",
          },
          {
            heading: "See What Most Cameras Miss",
            subheading: "Real footage in real conditions. The VREC-Z820DC doesn’t just record, it gives you clarity and context.",
            compareHeading: "Clarity That Keeps Up With Your Commute",
            compareSubheading:
              "The VREC-H120SC records in 1296p with a 2MP sensor, giving you sharper footage that makes it easier to read plates, spot signs and review details when it matters.",
            tabtitle: "Want a simple setup?",
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
        image="/homePageImages/productDetailsImage/h120scImages/0057 3 (3).png"
      />
      <Footer />
    </div>
  )
}

export default page
