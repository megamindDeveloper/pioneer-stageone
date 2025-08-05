import Image from "next/image";





 type DriveAlertProps={

  highlightedText?: string;
  heading: string;
subheading: string;
alert1Image: string;
  alert2Image: string;
  alert3Image: string;
alert1?: string;
  alert2?: string;
  alert3?: string; 
}

export default function DriveAlert({ highlightedText, heading, subheading , alert1, alert2, alert3, alert1Image, alert2Image, alert3Image }: DriveAlertProps) {
  return (
    <section className="min-h-screen  text-white flex flex-col justify-between px-4 sm:px-6 py-10 text-center">
      {/* Top Icon */}
      <div className="pt-50 sm:pt-20 animate-fastpulse">
        <Image
          src="/images/svgs/dangerIcon.svg"
          alt="Warning Icon"
          width={80} // smaller on mobile
          height={80}
          className="mx-auto sm:w-[130px] sm:h-[100px]"
        />
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col items-center space-y-12 sm:space-y-15 pb-8">
        {/* Headings */}
        <div>
          <p className="text-[#AD2239] text-[16px] sm:text-[20px] font-bold mb-5 sm:mb-3">
            {highlightedText}
          </p>
          <h2 className="text-[48px] font-medium mb-5 sm:mb-4 leading-tight sm:leading-none">
            {heading}
          </h2>
          <p className="text-[#ABABAB] text-[16px] sm:text-[18px] max-w-md sm:max-w-4xl mx-auto leading-snug sm:leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Alert Features */}
        <div className="flex flex-row sm:flex-row justify-center items-center gap-8 sm:gap-23 mt-6 sm:mt-0">
          {/* Lane Departure Alert */}
          <div className="flex flex-col items-center space-y-2">
            <Image
            
              src={alert1Image}
              alt="Lane Departure"
              width={40}
              height={40}
              className="sm:w-[60px] sm:h-[60px]"
            />
            <p className="text-white font-medium text-[10px] sm:text-sm">
              {alert1}
            </p>
          </div>

          {/* Forward Collision Alert */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={alert2Image}
              alt="Forward Collision"
              width={40}
              height={40}
              className="sm:w-[60px] sm:h-[60px]"
            />
            <p className="text-white font-medium text-[10px] sm:text-sm">
              {alert2}
            </p>
          </div>

          {/* Stop & Go Alert */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={alert3Image}
              alt="Stop and Go"
              width={40}
              height={40}
              className="sm:w-[60px] sm:h-[60px]"
            />
            <p className="text-white font-medium text-[10px] sm:text-sm">
              {alert3}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}