'use client';

import { motion, AnimatePresence } from 'framer-motion';

import React, { useEffect } from 'react';


interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({ isOpen, onClose }) => {
  // Disable background scroll
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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-none border-gray-700/50 border-3 p text-white rounded-2xl w-full  max-w-3xl h-[90vh] relative overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition z-10"
              aria-label="Close"
            >
              {/* <X size={24} /> */}
              <img src="/images/svgs/closeIcon.svg" alt="" />
            </button>

            {/* Scrollable Content */}
            <div
              className="overflow-y-auto h-full px-[6rem] py-12  bg-none"
              style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE 10+
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              <h2 className="text-[37px] font-semibold mt-12  mb-17">
                Detailed Specifications
              </h2>

              <div className="space-y-6">
                <SpecRow  label="Resolution" value="4K, WDR + Full HD" />
                <SpecRow label="Power supply" value="5V, 2A Cigarette Charger or Hardwire Kit" />
                <SpecRow label="G sensor" value="Yes" />
                <SpecRow label="Storage" value="Micro SD card (Up to 512GB)" />
                <SpecRow label="Dimensions" value="104mm x 39mm x 43.3mm" />
                <SpecRow label="Viewing Angle" value="139° Diagonal" />
                <SpecRow
                  label="Image Sensor"
                  value="Sony STARVIS IMX415, 8MP with Super Low Light performance"
                />
                <SpecRow label="No of Cameras" value="2 (front + rear)" />
                <SpecRow label="Mounting" value="Double Sided Adhesive" />
                <SpecRow label="Display Size" value="3.2” IPS" />
                <SpecRow label="GPS" value="Inbuilt" />
                <SpecRow label="Wi-Fi" value="Inbuilt" />
                <SpecRow label="Parking Mode" value="Yes" />
                <SpecRow label="Smartphone App" value="Android + iOS" />
                <SpecRow
                  label="Advanced Driver-Assistance System (ADAS)"
                  value="FCWS, LDWS, Stop and Go"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start gap-6">
    <span className="text-[#ABABAB] text-sm w-1/2">{label}</span>
    <span className=" text-[#E2E2E2] text-md text-right w-1/2">{value}</span>
  </div>
);