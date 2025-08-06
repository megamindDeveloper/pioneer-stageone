import React from 'react'

import { Compare } from '@/components/ProductPageComponents/ComparasionComponent/ComparasionComponent';
import ZenVue from '@/components/ProductPageComponents/ZenVue/ZenVue';
import ProductFeatureTable from '@/components/ProductPageComponents/ProductFeatureTable/ProductFeatureTable';
import { defaultProducts } from '../utils/ProductData/ProductData';
import EverythingNeedToKnow from '@/components/ProductPageComponents/EverythingNeedToKnow/EverythingNeedToKnow';
import { faqData } from '../utils/FaqData/FaqData';
import DriveSmarter from '@/components/ProductPageComponents/DriveSmarter/DriveSmarter';
import Footer from '@/components/CommonComponents/Footer';
import Blender2JSPage from '../page2/page';
import Model2textOverlay from '@/components/Model2Components/Textoverlay/Textoverlay';
const page = () => {
  return (
    <div>
      <Blender2JSPage/>
      <Model2textOverlay />
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
    </div>
  )
}

export default page
