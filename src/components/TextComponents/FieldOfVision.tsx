'use client';

type FieldOfVisionProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
};

export default function FieldOfVision({
  highlightedText,
  heading,
  subheading,
}: FieldOfVisionProps) {
  return (
    <main className="relative  h-[100%] mt-[400] w-full overflow-hidden text-white px-4 sm:block hidden ">
      {/* Background Layer */}
      <div className="absolute top-0 left-0 w-full h-full  z-0" />

      {/* Centered Content */}
      <div className="relative z-20  w-full h-full flex items-center justify-between px-6 lg:px-12">
        {/* Left Side */}
        <div className="max-w-sm space-y-2">
          {highlightedText && (
            <p className="text-[16px] text-[#AD2239] text-center font-bold">
              {highlightedText}
            </p>
          )}
          <h1 className="text-[48px] text-center font-medium leading-tight text-white">
            {heading}
          </h1>
        </div>

        {/* Right Side */}
        <div className="max-w-md text-[16px] text-[#ABABAB] leading-relaxed text-center">
          <p>{subheading}</p>
        </div>
      </div>
    </main>
  );
}
