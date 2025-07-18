"use client";

import Image from "next/image";

export default function ZenVue() {
  return (
    //   <section className="relative w-full min-h-screen bg-gradient-to-b from-[#0D0D0D] via-[#a82137] to-[#00000] text-white overflow-hidden">

    //       <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row  justify-between">
    //         {/* Left Content */}
    //         <div className="flex-1 space-y-6 text-center  lg:text-left">
    //           <p className="text-sm text-white/70">Control at Your Fingertips</p>
    //           <h1 className="text-[260px] leading-none  mt-10 font-bold text-white">Zen</h1>
    //           <p className="text-white/80 text-base max-w-md mx-auto lg:mx-0">
    //             The Pioneer ZenVue Dash Camera App gives you instant access to your recordings,
    //             making it easy to view, download, and share footage on the go. With its intuitive,
    //             user-friendly interface, the experience is seamless from start to finish.
    //           </p>

    //         </div>
    // {/* center Image */}
    // <div className="img">

    // </div>
    //         {/* Right Title */}
    //         <div className="hidden lg:block mt-20 flex-1 text-right">
    //           <h1 className="text-[260px] leading-none font-bold text-white">Vue</h1>
    //         </div>

    //       </div>

    //       {/* Center Phone Image - Absolute Positioned */}
    //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] z-20">
    //         <Image
    //           src="/mobilebg.png" // Replace with correct image path
    //           alt="Mobile Device"
    //           width={3000}
    //           height={3000}
    //           className="drop-shadow-2xl"
    //         />
    //       </div>
    //     </section>
    <section className="relative w-full min-h-screen bg-gradient-to-b  pt-32 from-[#020202ff] via-[#a82137] to-transparent text-white ">
      {/* Main Content */}
      <div className="relative z-10 max-w-[screen] mx-auto px-[9rem] py-20 flex flex-col lg:flex-row justify-between gap-20 items-start lg:items-center">
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <p className="text-sm  text-white/70">Control at Your Fingertips</p>
          <h1 className="text-[260px] leading-none mt-10 font-bold text-white">Zen</h1>
          <p className="text-white/80 text-base max-w-md mx-auto lg:mx-0">
            The Pioneer ZenVue Dash Camera App gives you instant access to your recordings, making it easy to view, download, and share footage on the
            go. With its intuitive, user-friendly interface, the experience is seamless from start to finish.
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-[52%] -translate-y-[51%] z-20 w-[480px] h-[650px] flex items-center justify-center">
          <Image
            src="/images/zenVueIMg.png" // Replace with your actual transparent background image
            alt="Mobile Device"
            width={1000}
            height={1000}
            className="drop-shadow-3xl w-full h-full object-cover opacity "
          />
        </div>
        {/* Right Title */}
        <div className="hidden lg:flex flex-col items-end mt-[-3.5rem] flex-2 text-right space-y-4">
          <h1 className="text-[260px] ml-5 mt-[5.3rem] leading-none font-bold text-white">Vue</h1>
          <p className="text-sm text-white/70 mr-6">Available on</p>
          <div className="flex gap-3  space-x-1 mt-0 mr-6">
            <Image
              src="/images/googlePlay.png" // Add this image to your public/images folder
              alt="Google Play"
              width={15}
              height={45}
              className="object-contain"
            />
            <p>Google play</p>
            <Image
              src="/images/appStore.png" // Add this image to your public/images folder
              alt="App Store"
              width={15}
              height={45}
              className="object-contain"
            />{" "}
            <p>App Store</p>
          </div>
        </div>
      </div>

      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#00000] via-[#a82137] to-[#000000] w-full h-full">

</div> */}

      {/* Center Phone Image - Positioned Perfectly */}
    </section>
  );
}
