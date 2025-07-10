import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Typography } from "../Typography/Typography";

interface SideImageCardProps {
  image: string;
  title: string;
  description: string;
  imageClassName?: string;
}

export const SideImageCard: React.FC<SideImageCardProps> = ({ image, title, description, imageClassName = " w-[100%]  h-[100%]", }) => {
  return (
    <motion.div
      key={image + title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-black rounded-xl overflow-hidden shadow-2xl xl:h-[380px]"
    >
      <div className="flex">
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl !font-medium xl:text-4xl mb-3 whitespace-pre-line">{title}</h3>
          <Typography variant="label" className="text-[#DFDFDF]">
            {description}
          </Typography>
        </div>

        <div className="flex-1 relative">
          <Image src={image} alt={title} width={800} height={500} className={imageClassName} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-black/40 z-10" />
        </div>
      </div>
    </motion.div>
  );
};
