type DynamicContentProps = {

  highlightedText?: string;
  heading?: string;
  subheading?: string;
  style?: string;
}


export default function DynamicContent({ highlightedText, heading, subheading, style }: DynamicContentProps) {
  return (
    <>
      <section
        className={`flex ${style} min-h-screen px-4 py-16 sm:px-6 sm:py-20 items-end sm:items-center justify-center`}
      >
        <div className="flex flex-col w-full max-w-xl items-center justify-center text-center px-4 pb-4 sm:pb-0">
          {/* Subtitle */}
          <p className="text-[#AD2239] text-[16px] sm:text-[20px] font-bold">
            {highlightedText}
          </p>

          {/* Heading */}
          <h1 className="text-[48px] text-white font-medium leading-tight">
            {heading}
          </h1>

          {/* Description */}
          <div className="w-full max-w-xl text-[#ABABAB] text-[16px] sm:text-[18px] leading-relaxed">
            <p>{subheading}</p>
          </div>
        </div>
      </section>




    </>
  )
}