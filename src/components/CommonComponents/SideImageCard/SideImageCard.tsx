import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Typography } from "../Typography/Typography";

interface SideImageCardProps {
  image: string;
  title: string;
  description: string;
}

export const SideImageCard: React.FC<SideImageCardProps> = ({ image, title, description }) => {
  return (
    <motion.div
      key={image + title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-black rounded-xl overflow-hidden shadow-2xl h-[380px]"
    >
      <div className="flex">
        <div className="flex-1 p-14 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-medium lg:text-4xl mb-3 whitespace-pre-line">
            {title}
          </h3>
          <Typography variant="label">
            {description}
          </Typography>
        </div>

        <div className="flex-1 relative">
          <Image
            src={image}
            alt={title}
            width={800}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
