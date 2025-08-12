

// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import React, { useEffect } from 'react';

// interface SpecsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   specs: { label: string; value: string }[]; // <-- NEW prop
// }

// export const SpecsModal: React.FC<SpecsModalProps> = ({ isOpen, onClose, specs }) => {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 bg-black/10 backdrop-blur-md border border-white/20 flex items-center justify-center px-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-[#0D0D0D] border-white/20 border-[0.5px] text-white rounded-2xl w-full max-w-3xl h-[90vh] relative overflow-hidden"
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 24 }}
//           >
//             {/* Close Button */}
//             <button
//               onClick={onClose}
//               className="absolute  top-6 right-6 p-2 rounded-full cursor-pointer transition z-10"
//               aria-label="Close"
//             >
//               <img src="/svgs/closeIcon.svg" className='w-10 h-12' alt="Close" />
//             </button>

//             {/* Scrollable Content */}
//             <div
//               className="overflow-y-auto h-full px-4 md:px-[6rem] py-8 md:py-12 bg-none"
//               style={{
//                 scrollbarWidth: 'none', // Firefox
//                 msOverflowStyle: 'none', // IE 10+
//               }}
//             >
//               <style jsx>{`
//                 div::-webkit-scrollbar {
//                   display: none;
//                 }
//               `}</style>

//               <h2 className="text-[22px] md:text-[37px] font-semibold mt-4 mb-8 md:mt-12 md:mb-17 text-center md:text-left">
//                 Detailed Specifications
//               </h2>

//               <div className="space-y-6">
//                 {specs.map((spec, index) => (
//                   <SpecRow key={index} label={spec.label} value={spec.value} />
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// const SpecRow = ({ label, value }: { label: string; value: string }) => (
//   <div className="flex justify-between items-start gap-3 md:gap-6 text-[13px] md:text-sm">
//     <span className="text-[#ABABAB] w-1/2">{label}</span>
//     <span className="text-[#E2E2E2] text- w-1/2">{value}</span>
//   </div>
// );

'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../../../app/utils/Firestore/firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelKey: string; // 👈 new prop to determine which collection to fetch from
}

export const SpecsModal: React.FC<SpecsModalProps> = ({ isOpen, onClose, modelKey }) => {
  const [specs, setSpecs] = useState<{ feature: string; value: string }[]>([]);

useEffect(() => {
  if (!isOpen || !modelKey) return;
  console.log(modelKey);

  const fetchSpecs = async () => {
    try {
      // Create query with ordering
      const q = query(
        collection(db, `detailed_specs_${modelKey}`),
        orderBy("priority", "asc") // smallest priority comes first
      );

      const snapshot = await getDocs(q);
      const specData: { feature: string; value: string; priority?: number }[] = [];
      
      snapshot.forEach(doc => {
        specData.push(doc.data() as any);
      });

      console.log("de", specData);
      setSpecs(specData);
    } catch (error) {
      console.error("Error fetching specs:", error);
    }
  };

  fetchSpecs();
}, [isOpen, modelKey]);

    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
   <AnimatePresence>
  {isOpen && (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#0D0D0D] border border-white/10 text-white rounded-2xl w-full max-w-[800px] h-[90vh] relative overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition z-10"
          aria-label="Close"
        >
          <img className="w-6 h-6" src="/svgs/closeIcon.svg" alt="Close" />
        </button>

        {/* Scrollable Content */}
        <div
          className="overflow-y-auto h-full px-6 md:px-16 py-8"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Title */}
          <h2 className="text-[28px] pt-19 pb-7 px-12 lg:text-[34px] font-semibold mb-12 text-center md:text-left">
            Detailed Specifications
          </h2>

          {/* Specs List */}
          <ul className="space-y-7">
            {specs.map((spec, index) => (
              <li
                key={index}
                className="flex px-12 flex-wrap md:flex-nowrap gap-x-40 gap-y-2 text-[#d0d0d0] text-sm"
              >
                <span className="w-full md:w-[340px] text-[#ABABAB] text-[14px] sm:text-[15px]">
                  {spec.feature}
                </span>
                <span className=" md:w-[530px] text-[14px] sm:text-[15px] text-white">
                  {spec.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
};
