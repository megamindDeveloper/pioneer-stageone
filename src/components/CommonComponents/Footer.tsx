import Image from "next/image";
import Link from "next/link";
import image from "../../../public/logo/image.png";
const quickLinks = [

  "Distributors",
  "Dashcam EULA Document",
  "Dashcam Privacy Policy",

];

const navLinks = ["Our Products", "Our History", "Pioneer Global", "Contact Us"];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#AD2239]/60 via- to-black text-white pt-24 pb-6 px-4  ">
      <div className="max-w-6xl  mx-auto w-full">
        {/* Top Links */}
        <div className="pl-20 grid grid-cols-2 sm:grid-cols-3 gap-6 !text-[14px] md:text-base text-white/90 mb-12 lg:mb-32 text-justify sm:text-left font-medium ">
          {quickLinks.map((link, i) => (
            <Link href="#" key={i} className="hover:text-white xl:text-[14px] transition font-['Helvetica_Neue','Helvetica','Arial','sans-serif']">
              {link}
            </Link>
          ))}
        </div>

        {/* Divider */}

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm md:text-base gap-6">
          {/* Logo & Nav Links */}
          <div className="flex flex-col md:flex-row md:items-center  gap-6">
            <Image
              src={image} // ⬅️ Replace with your actual white logo
              alt="Pioneer"
              width={150}
              height={40}
            />
            <div className="flex gap-4 pl-8 flex-wrap text-[12px] text-white/80 justify-center items-center pt-3">
              {navLinks.map((link, i) => (
                <Link href="#" key={i} className="hover:text-white transition !text-sm">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-1 justify-center md:justify-end">
            <Link href="#" aria-label="Instagram">
              <Image src="/svgs/instagram.svg" alt="Instagram" width={20} height={20} />
            </Link>
            <Link href="#" aria-label="Other">
              <Image src="/svgs/meta.svg" alt="Other Icon" width={20} height={20} />
            </Link>
          </div>
        </div>
        <div className="border-t border-white/20 my-4" />

        {/* Bottom */}
        <div className="text-center  text-white/60 mt-6">
          <strong className="text-white/90 text-[10px]">© 2025 Pioneer Gulf FZE. All Rights Reserved</strong>
          {/* <p className="mt-1 text-[12px]">Powered by Megamind Studios </p> */}
        </div>
      </div>
    </footer>
  );
}
