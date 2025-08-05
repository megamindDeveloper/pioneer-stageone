type SharpVisionProps = {
  highlightedText?: string;
  heading: string;
  subheading?: string;
};

export default function SharpVision({ highlightedText, heading, subheading }: SharpVisionProps) {
  return (
    <>
      <section className="flex min-h-screen flex-col justify-end sm:justify-end items-center px-4 py-12 sm:p-1">
        <div className="flex flex-col items-center justify-center text-center w-full max-w-xl gap-4">
          {/* Subtitle */}
          <p className="text-[#AD2239] text-[16px]  font-bold">{highlightedText}</p>

          {/* Heading */}
          <h1 className="text-[48px] text-white font-medium whitespace-nowrap leading-tight">{heading}</h1>

          {/* Description */}
          <div className="max-w-xl text-[#ABABAB] text-[16px] leading-relaxed w-2xl px-2 sm:px-0">
            <p>{subheading}</p>
          </div>
        </div>
      </section>
    </>
  );
}
