import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  "Dashcam Manual",
  "Software & Firmware",
  "Service Centres",
  "Distributors",
  "Dashcam EULA Document",
  "Dashcam Privacy Policy",
  "Product Manuals",
  "Product Catalogues",
];

const navLinks = ["Our Products", "Our History", "Pioneer Global", "Contact Us"];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#660000] to-transparent text-white pt-12 pb-6 px-4 mt-32">
      <div className="max-w-7xl xl:max-w-[90%] mx-auto w-full">
        {/* Top Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm md:text-base text-white/90 mb-12 text-center sm:text-left">
          {quickLinks.map((link, i) => (
            <Link href="#" key={i} className="hover:text-white transition">
              {link}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-4" />

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm md:text-base gap-6">
          {/* Logo & Nav Links */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Image
              src="/logo-white.svg" // ⬅️ Replace with your actual white logo
              alt="Pioneer"
              width={100}
              height={40}
            />
            <div className="flex gap-4 flex-wrap text-white/80">
              {navLinks.map((link, i) => (
                <Link href="#" key={i} className="hover:text-white transition">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center md:justify-end">
            <Link href="#" aria-label="Instagram">
              <Image src="/icons/instagram.svg" alt="Instagram" width={20} height={20} />
            </Link>
            <Link href="#" aria-label="Other">
              <Image src="/icons/other.svg" alt="Other Icon" width={20} height={20} />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-white/60 mt-6">
          <p>© 2025 Pioneer Gulf FZE. All Rights Reserved</p>
          <p className="mt-1">
            Powered by <span className="text-white">Megamind Advertising Private Limited</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
