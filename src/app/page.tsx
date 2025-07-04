"use client";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";
import gsap from "gsap";
import Navbar from "../app/components/Navbar";
const CameraScene = dynamic(() => import("./components/CameraScene"), {
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    gsap.to("#title", {
      opacity: 1,
      delay: 2,
      duration: 0.6,
    });
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0D0D0D] to-transparent">
      <Head>
        <title>Opal C1 Clone</title>
      </Head>

      <CameraScene />


    </div>
  );
}
