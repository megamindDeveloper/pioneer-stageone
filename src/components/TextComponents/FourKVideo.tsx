type FourKVideoProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
};

export default function FourKVideo({ highlightedText, heading, subheading }: FourKVideoProps) {
  return (
    <>
      <section className="relative min-h-screen text-white flex items-center justify-center px-4">
        <div className="text-center  max-w-4xl px-4">
          {/* Red Subheading */}
          <p className="
      text-[#AD2239] font-bold
      xxs:text-[10px]
      xs:text-[10px]
      sm:text-[11px]
      md:text-[13px]
      lg:text-[18px]
      lg2:text-[16px]
      xl:text-[22px]
      2xl:text-[34px]
      mb-3
    ">
            {highlightedText}
          </p>

          {/* Main Heading */}
          <h2 className="
      font-semibold leading-tight xxs:w-xs   xs:w-sm sm:w-sm md:w-lg lg2:max-w-4xl xl:w-2xl mb-1 2xl:w-5xl 
      xxs:text-[25px]
      xs:text-[25px]
      sm:text-[32px]
      md:text-[42px]
      lg:text-[54px]
      lg2:text-[43px]
      xl:text-[58px]
      2xl:text-[92px]
    ">

            {heading}
          </h2>

          {/* Description */}
          <p className="
      text-[#ABABAB] px-3 xxs:w-xs md:w-lg text-center 2xl:w-4xl xl:w-2xl  leading-relaxed
      xxs:text-[12px]
      xs:text-[10px]
      sm:text-[11px]
      md:text-[14px]
      lg:text-[18px]
      lg2:text-[16px]
      xl:text-[24px]
      2xl:text-[36px]
    ">
            {subheading}
          </p>
        </div>
      </section>

    </>
  );
}
