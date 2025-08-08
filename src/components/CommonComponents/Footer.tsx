"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo/image.png";

// Desktop link data (your original)
const linkGroups = [
  ["Dashcam Manual", "Software & Firmware"],
  ["Service Centres", "Distributors"],
  ["Dashcam EULA Document", "Dashcam Privacy Policy"],
  ["Product Manuals", "Product Catalogues"],
];

const bottomLinks = [
  "Our Products",
  "Our History",
  "Pioneer Global",
  "Contact Us",
];

// Mobile accordion link data
const mobileLinks = [
  {
    title: "Support & Resources",
    links: [
      "Dashcam Manual",
      "Software & Firmware",
      "Service Centres",
      "Distributors",
    ],
  },
  {
    title: "User Agreement & Privacy",
    links: ["Dashcam EULA Document", "Dashcam Privacy Policy"],
  },
  {
    title: "Guides to Pioneer Products",
    links: ["Product Manuals", "Product Catalogues"],
  },
  {
    title: "More from Pioneer Global",
    links: ["Our Products", "Our History", "Pioneer Global"],
  },
  {
    title: "Contact Us",
    links: [],
  },
];

export default function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <footer className="bg-gradient-to-t from-[#AD2239] to-[#00000000] text-white">
      {/* ---------- DESKTOP / LAPTOP VERSION ---------- */}
      <div className="hidden md:block pt-20 pb-8">
        <div className="max-w-6xl mx-auto w-full px-4 flex flex-col justify-center min-h-[300px]">
          {/* Top Link Groups */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-[14px] text-white/90 mb-16 justify-items-center">
            {linkGroups.map((group, i) => (
              <div key={i} className="space-y-2 text-center sm:text-left">
                {group.map((link, idx) => (
                  <Link
                    href="#"
                    key={idx}
                    className="hover:text-white transition font-medium block"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Logo + Bottom Links + Social Icons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 mt-8">
            {/* Left Side */}
            <div className="flex flex-col md:flex-row md:items-center gap-12">
              <Image
                src={logo}
                alt="Pioneer"
                width={180}
                height={42}
                className="object-contain"
              />
              <div className="flex gap-12 flex-wrap text-[13px] text-white/80">
                {bottomLinks.map((link, i) => (
                  <Link
                    href="#"
                    key={i}
                    className="hover:text-white transition"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4 md:mt-0">
              <Link href="#" aria-label="Instagram">
                <Image
                  src="/svgs/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </Link>
              <Link href="#" aria-label="Other">
                <Image
                  src="/svgs/meta.svg"
                  alt="Meta"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 mb-6" />

          {/* Copyright */}
          <div className="text-center text-white/60 text-[11px]">
            © 2025 Pioneer Gulf FZE. All Rights Reserved
          </div>
        </div>
      </div>


{/* ---------- MOBILE VERSION ---------- */}
<div className="md:hidden bg-gradient-to-t from-[#AD2239] to-[#00000000] px-9 pt-8 pb-6">
  {/* Logo */}
  <Image
    src={logo}
    alt="Pioneer"
    width={180}
    className="mb-8 mt-12" // matches spacing in screenshot
  />

  {/* Accordion */}
  <div className="space-y-[2px] mb-6 " >
    {mobileLinks.map((group, i) => {
      // Special case: "Contact Us" — no accordion
      if (group.title === "Contact Us") {
        return (
          <div
            key={i}
            className="py-3 border-b border-white/20 text-[19px] font-medium"
          >
            <Link href="#" className="block hover:text-white">
              {group.title}
            </Link>
          </div>
        );
      }

      return (
        <div key={i}>
          {/* Accordion Header */}
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center py-3 border-b border-white/20 text-[19px] font-medium"
          >
            {group.title}
            <span
              className={`transition-transform duration-300 text-[18px] font-light ${
                openIndex === i ? "rotate-180" : "rotate-0"
              }`}
            >
              {openIndex === i ? "–" : "+"}
            </span>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out`}
            style={{
              maxHeight:
                openIndex === i ? `${group.links.length * 36}px` : "0",
            }}
          >
            <div className="pl-3 py-2 space-y-[6px] text-white/80 text-[16px]">
              {group.links.map((link, idx) => (
                <Link key={idx} href="#" className="block hover:text-white">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    })}
  </div>

  {/* Follow Us */}
<div className="flex justify-between">

    <p className="text-[18px] mb-3">Follow Us</p>
  <div className="flex gap-4 mb-5">
    <Link href="#">
      <Image
        src="/svgs/instagram.svg"
        alt="Instagram"
        width={20}
        height={20}
      />
    </Link>
    <Link href="#">
      <Image src="/svgs/meta.svg" alt="Meta" width={20} height={20} />
    </Link>
  </div>
</div>


  {/* Copyright */}
  <div className="border-t border-white/20 pt-3">
    <p className="text-[10px] text-white/60 leading-snug">
      © 2025 Pioneer Gulf FZE. All Rights Reserved
    </p>
    <p className="text-[10px] text-white/60 leading-snug">
      Powered by Megamind Advertising Private Limited
    </p>
  </div>
</div>


    </footer>
  );
}
