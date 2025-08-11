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
   <main className="relative h-[100%] w-[100%] overflow-hidden text-white px-4 sm:block hidden">
  {/* Background Layer */}
  <div className="absolute top-0 left-0 w-full h-full z-0" />

  {/* Centered Content */}
  <div className="relative z-20 w-full h-full flex items-center justify-between px-6 lg:px-32">
    {/* Left Side */}
    <div className="max-w-sm space-y-2 mt-26">
      {highlightedText && (
        <p className="text-[#AD2239] text-center font-bold text-sm sm:text-base md:text-md">
          {highlightedText}
        </p>
      )}
      <h1 className="text-center font-medium leading-tight text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
        {heading}
      </h1>
    </div>

    {/* Right Side */}
    <div className="max-w-md mt-24 text-[#ABABAB] leading-relaxed text-center text-sm sm:text-base md:text-md">
      <p>{subheading}</p>
    </div>
  </div>
</main>

  );
}
