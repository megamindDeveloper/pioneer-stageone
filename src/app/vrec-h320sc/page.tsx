import React from 'react'

import { Compare } from '@/components/ProductPageComponents/ComparasionComponent/ComparasionComponent';
import ZenVue from '@/components/ProductPageComponents/ZenVue/ZenVue';
import ProductFeatureTable from '@/components/ProductPageComponents/ProductFeatureTable/ProductFeatureTable';
import { defaultProducts } from '../utils/ProductData/ProductData';
import EverythingNeedToKnow from '@/components/ProductPageComponents/EverythingNeedToKnow/EverythingNeedToKnow';
import { faqData } from '../utils/FaqData/FaqData';
import DriveSmarter from '@/components/ProductPageComponents/DriveSmarter/DriveSmarter';
import Footer from '@/components/CommonComponents/Footer';


import Blender2JSPage from '../page3/page';
import Model3textOverlay from '@/components/Mode3Components/Model4textOverlay/Model3textOverlay';
const page = () => {
  return (
    <div>
      <Blender2JSPage/>
      <Model3textOverlay />
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
      {/* <div
        id="model2-scroll-container"
        style={{ height: "1000vh", position: "relative" }}
      >
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <CarCameraScene />
        </div>
      </div> */}
      {/* <Compare />
      <ZenVue />
      <ProductFeatureTable />
      <EverythingNeedToKnow />
      <DriveSmarter /> */}
      <Footer />
    </div>
  )
}

export default page
