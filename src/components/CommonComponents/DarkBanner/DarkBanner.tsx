import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../Typography/Typography";

interface DarkBannerProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  buttonLabel: string;
  buttonLink: string;
  className?: string;
  imageWidth?: number;
  imagePositionClass?: string; // ✅ new
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
  imagePositionClass = "bottom-0 left-[48%]"
}) => {
  return (
    <section
      className={`relative bg-black py-12 mt-0 xl:mt-32 pl-12 text-white bottom-0 rounded-xl  flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 ${className}`}
    >
      {/* Image */}
      <motion.div
        key={imageSrc}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={`absolute z-10 ${imagePositionClass}`} 
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
        <h2 className="!font-medium text-[41px] leading-12 whitespace-pre-line">
          {title}
        </h2>
        <Typography variant="label">
          {description}
        </Typography>
        <Link href={buttonLink}>
          <p className="bg-white text-black text-sm font-bold px-4 py-2 mt-16 rounded hover:bg-gray-200 transition inline-block w-fit">
            Learn More
          </p>
        </Link>
      </motion.div>

      <div className="flex-1" />
    </section>
  );
};

export default DarkBanner;
