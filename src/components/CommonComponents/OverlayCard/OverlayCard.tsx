import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typography } from "../Typography/Typography";

interface OverlayCardProps {
  image: string;
  title: string;
  description: string;
}

export const OverlayCard: React.FC<OverlayCardProps> = ({ image, title, description }) => {
  return (
    <motion.div
      key={image + title}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden h-[300px] xl:h-[380px] rounded-xl bg-gray-900 shadow-2xl group cursor-pointer transition-transform"
    >
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill className="object-cover transition-transform" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-10 h-14" />
      <div className="absolute inset-0 bg-gradient-to-t bottom-0 from-black/40 via-black/0 to-transparent z-10" />

      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl font-medium xl:text-4xl mb-3 whitespace-pre-line">{title}</h3>
        <Typography variant="section-card-body" className="text-[#DFDFDF] whitespace-pre-line">
          {description}
        </Typography>
      </div>
    </motion.div>
  );
};
