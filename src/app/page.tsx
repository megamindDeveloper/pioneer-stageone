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
    <>
      <Head>
        <title>Opal C1 Clone</title>
      </Head>
      <section>
        <Navbar />
        <CameraScene />
      </section>
    </>
  );
}
