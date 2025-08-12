'use client'

import React, { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../app/utils/Firestore/firebaseConfig' // adjust the path based on your folder structure

type FAQItem = {
  question: string;
  answer: string;
  disclaimer?:string
};

type Props = {
  collectionName: string; // e.g. 'faq_detailed_specs_Z820DC'
};

export default function EverythingNeedToKnow({ collectionName }: Props) {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data: FAQItem[] = querySnapshot.docs.map(doc => doc.data() as FAQItem);
        setFaqData(data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFAQ();
  }, [collectionName]); // refetch when the prop changes

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-black text-white px-4 py-12 md:px-20 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-20 items-start max-w-6xl mx-auto">
        <div className="min-h-full">
          <h2 className="text-[32px] md:text-[40px] text-center lg:text-[48px] font-bold leading-tight text-[#E2E2E2] max-w-sm lg:top-6 sticky top-5 self-start">
            Everything You Need to Know
          </h2>
        </div>

        <div className="divide-y divide-gray-700 w-full">
          {faqData.map((item, index) => (
            <div key={index} className="py-4 mt-5">
              <button
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <span className="text-[18px] w-2/3 md:text-[20px] font-semibold text-[#E2E2E2]">
                  {item.question}
                </span>
                <span className="ml-4">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 md:w-6 md:h-6 text-[#ABABAB]" />
                  ) : (
                    <Plus className="w-5 h-5 md:w-6 md:h-6 text-[#ABABAB]" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-[16px] mt-5 md:text-[18px] text-[#ABABAB]">
                  {item.answer}
                </p>
                 {item.disclaimer&&(
                   <p className="text-[11px] mt-5 md:text-[12px] tracking-wide text-[#ABABAB]">
                    Disclaimer:  {item.disclaimer}
                </p>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
