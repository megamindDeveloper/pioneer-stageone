type FourKVideoProps = {
  highlightedText?: string;
  heading: string;
  subheading: string;
};

export default function FourKVideo({ highlightedText, heading, subheading }: FourKVideoProps) {
  return (
    <>
      <section className="relative min-h-screen  text-white flex items-center justify-center px-4">
        <div className="text-center max-w-4xl px-4">
          {/* Red Subheading */}
          <p className="text-[#AD2239] font-bold text-[16px] mb-3">{highlightedText}</p>

          {/* Main Heading */}
          <h2 className="text-[48px] font-semibold leading-tight mb-1">{heading}</h2>

          {/* Description */}
          <p className="text-[#ABABAB] text-[16px] sm:text-[16px] max-w-xl leading-relaxed">{subheading}</p>
        </div>
      </section>
    </>
  );
}
