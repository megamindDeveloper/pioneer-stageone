import { motion } from "framer-motion";
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
    <section className="w-full relative">
      <div
        className={`relative z-10 grid md:grid-cols-2 items-center bg-black text-white rounded-xl py-12 xl:py-20 px-8 xl:px-16 gap-8 
        lg:h-[300px] lg2:h-[380px] ${className}`}
      >
        {/* Left: Content */}
        <motion.div
          key={title + description}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="z-20"
        >
           <h3 className="text-[20px] md:text-3xl !font-medium xl:text-4xl mb-3 whitespace-pre-line">{title}</h3>
          <Typography  variant="section-card-body">{description}</Typography>
          <Link href={buttonLink}>
            <p className="bg-white text-black text-sm font-bold px-4 py-2 mt-10 rounded hover:bg-gray-200 transition inline-block w-fit">
              Learn More
            </p>
          </Link>
        </motion.div>

        {/* Right: Empty space for visual balance (optional) */}
        <div className="relative" />
      </div>

      {/* Absolute Image Outside */}
      <motion.div
        key={imageSrc}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="absolute right-8 bottom-0 z-0"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={450}
          className="object-contain h-auto"
        />
      </motion.div>
    </section>
  );
};

export default DarkBanner;
