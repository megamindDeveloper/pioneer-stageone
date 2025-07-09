import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DarkBannerProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  buttonLabel: string;
  buttonLink: string;
  className?: string;
  imageWidth?: number;
}

const DarkBanner: React.FC<DarkBannerProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = "Banner Image",
  buttonLabel,
  buttonLink,
  className,
  imageWidth = 800,
}) => {
  return (
    <section
      className={`relative bg-black h-[380px] text-white bottom-0 rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 ${className}`}
    >
      {/* Image */}
      <motion.div
        key={imageSrc}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-1/2 z-10"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={450}
          className="object-contain w-full h-auto"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        key={title + description}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.4 }}
        className="flex-1 z-20"
      >
        <h2 className="text-2xl md:text-3xl font-medium lg:text-5xl mb-3 whitespace-pre-line">
          {title}
        </h2>
        <p className="text-sm md:text-base xl:text-lg font-normal text-[#DFDFDF] mb-4 whitespace-pre-line">
          {description}
        </p>
        <Link href={buttonLink}>
          <p className="bg-white text-black text-sm font-bold px-4 py-2 mt-16 rounded hover:bg-gray-200 transition inline-block w-fit">
            {buttonLabel}
          </p>
        </Link>
      </motion.div>

      <div className="flex-1" />
    </section>
  );
};

export default DarkBanner;
