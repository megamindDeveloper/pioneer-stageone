import VRECZ820DC from "../../CommonComponents/models/VRECZ820DC";
import VRECH520DC from "../../CommonComponents/models/VRECH520DC";
import VRECH320SC from "../../CommonComponents/models/VRECH320SC";
import VRECH120SC from "../../CommonComponents/models/VRECH120SC";
import DashcamCard from "./DashcamCard";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { useResponsiveScale } from "@/hooks/useResponsiveScale";
import { useResponsivePosition } from "@/hooks/useResponsivePosition";
import { useMemo } from "react";

export default function DashcamShowcase() {
  // Memoize scale arrays
  const scaleZ820DC = useResponsiveScale(
    useMemo(() => [0.6, 0.6, 0.6], []), // xl
    useMemo(() => [0.6, 0.6, 0.6], []), // lg2
    useMemo(() => [0.5, 0.5, 0.5], []), // lg
    useMemo(() => [0.4, 0.4, 0.4], []), // md
    useMemo(() => [0.35, 0.35, 0.35], []), // sm
    useMemo(() => [0.55, 0.65, 0.54], [])  // xs
  );
  const hoveredScaleZ820DC = useResponsiveScale(
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.4, 0.4, 0.4], []),
    useMemo(() => [0.35, 0.35, 0.35], []),
    useMemo(() => [0.3, 0.3, 0.3], [])
  );
  const positionZ820DC = useResponsivePosition(
    useMemo(() => [0, 0.6, 0], []),
    useMemo(() => [0, 0.6, 0], []),
    useMemo(() => [0, 0.5, 0], []),
    useMemo(() => [0, 0.4, 0], []),
    useMemo(() => [0, 0.3, 0], []),
    useMemo(() => [0, 1, 0], [])
  );
  const hoveredPositionZ820DC = useResponsivePosition(
    useMemo(() => [0.9, 0.6, 0], []),
    useMemo(() => [0.9, 0.6, 0], []),
    useMemo(() => [0.75, 0.5, 0], []),
    useMemo(() => [0.6, 0.4, 0], []),
    useMemo(() => [0.45, 0.3, 0], []),
    useMemo(() => [0.35, 0.25, 0], [])
  );

  const scaleH520DC = useResponsiveScale(
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.4, 0.4, 0.4], []),
    useMemo(() => [0.35, 0.35, 0.35], []),
    useMemo(() => [0.3, 0.3, 0.3], [])
  );
  const hoveredScaleH520DC = scaleH520DC;
  const positionH520DC = useResponsivePosition(
    useMemo(() => [0, 0.3, 0], []),
    useMemo(() => [0, 0.3, 0], []),
    useMemo(() => [0, 0.25, 0], []),
    useMemo(() => [0, 0.2, 0], []),
    useMemo(() => [0, 0.15, 0], []),
    useMemo(() => [0, 0.1, 0], [])
  );
  const hoveredPositionH520DC = useResponsivePosition(
    useMemo(() => [0.8, 0.3, 0], []),
    useMemo(() => [0.8, 0.3, 0], []),
    useMemo(() => [0.65, 0.25, 0], []),
    useMemo(() => [0.5, 0.2, 0], []),
    useMemo(() => [0.4, 0.15, 0], []),
    useMemo(() => [0.3, 0.1, 0], [])
  );

  const scaleH320SC = useResponsiveScale(
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.4, 0.4, 0.4], []),
    useMemo(() => [0.35, 0.35, 0.35], []),
    useMemo(() => [0.3, 0.3, 0.3], []),
    useMemo(() => [0.25, 0.25, 0.25], [])
  );
  const positionH320SC = useResponsivePosition(
    useMemo(() => [0, 0.2, 0], []),
    useMemo(() => [0, 0.2, 0], []),
    useMemo(() => [0, 0.15, 0], []),
    useMemo(() => [0, 0.1, 0], []),
    useMemo(() => [0, 0.05, 0], []),
    useMemo(() => [0, 0, 0], [])
  );
  const hoveredPositionH320SC = useResponsivePosition(
    useMemo(() => [0.8, 0.2, 0], []),
    useMemo(() => [0.8, 0.2, 0], []),
    useMemo(() => [0.6, 0.15, 0], []),
    useMemo(() => [0.45, 0.1, 0], []),
    useMemo(() => [0.35, 0.05, 0], []),
    useMemo(() => [0.25, 0, 0], [])
  );

  const scaleH120SC = useResponsiveScale(
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.4, 0.4, 0.4], []),
    useMemo(() => [0.35, 0.35, 0.35], []),
    useMemo(() => [0.3, 0.3, 0.3], [])
  );
  const hoveredScaleH120SC = useResponsiveScale(
    useMemo(() => [0.85, 0.85, 0.85], []),
    useMemo(() => [0.85, 0.85, 0.85], []),
    useMemo(() => [0.7, 0.7, 0.7], []),
    useMemo(() => [0.6, 0.6, 0.6], []),
    useMemo(() => [0.5, 0.5, 0.5], []),
    useMemo(() => [0.45, 0.45, 0.45], [])
  );
  const positionH120SC = useResponsivePosition(
    useMemo(() => [0, 0, 0], []),
    useMemo(() => [0, 0, 0], []),
    useMemo(() => [0, -0.05, 0], []),
    useMemo(() => [0, -0.1, 0], []),
    useMemo(() => [0, -0.15, 0], []),
    useMemo(() => [0, -0.2, 0], [])
  );
  const hoveredPositionH120SC = useResponsivePosition(
    useMemo(() => [0.8, 0, 0], []),
    useMemo(() => [0.8, 0, 0], []),
    useMemo(() => [0.6, -0.05, 0], []),
    useMemo(() => [0.5, -0.1, 0], []),
    useMemo(() => [0.4, -0.15, 0], []),
    useMemo(() => [0.3, -0.2, 0], [])
  );


  return (
    <section className="relative min-h-screen py-12 md:px-4 ">
      <Typography variant="section-heading" className="!font-medium   text-center text-white pb-12 md:pb-24 lg:text-[26px] xl:text-[32.9px]">
        Discover Pioneer's Smart Dashcam Range
      </Typography>

      {/* Grid container with relative positioning */}
      <div className="relative max-w-6xl xl:max-w-[90%] mx-auto h-[180vh] md:h-[100vh]">
        {/* Vertical Line */}
        <div className="pointer-events-none hidden md:absolute left-1/2 top-0 w-px h-full bg-white opacity-30 z-10 -translate-x-1/2" />

        {/* Horizontal Line */}
        <div className="pointer-events-none hidden md:absolute top-1/2 left-0 h-px w-full bg-white opacity-30 z-10 -translate-y-1/2" />

        {/* Cards Grid */}
        <div className="relative z-20 grid md:grid-cols-2 md:grid-rows-2 gap-0 w-full h-full">
          <DashcamCard
            cardIndex={0}
            title="VREC-Z820DC"
            Component={<VRECZ820DC />}
            cameraPosition={[0, 1, 5]}
            description={`4K Flagship Dual Channel
              Dash Cam with Night Vision AI`}
            features={["4K Resolution\nFront Camera", "Full HD\nRear Camera", "Intelligent\nNight Vision AI", "WDR & HDR\nRecording", "ADAS\nAlerts"]}
            defaultScale={scaleZ820DC}
            hoveredScale={hoveredScaleZ820DC}
            defaultPosition={positionZ820DC}
            hoveredPosition={hoveredPositionZ820DC}
            defaultRotation={[-0.2, 0, 0]}
            hoveredRotation={[-0.2, -0.75, 0]}
            featureIcons={["/icons/4kicon.svg", "/icons/fullHd.svg", "/icons/aivision.svg", "/icons/wdrhdr.svg", "/icons/adasAlert.svg"]}
          />
          <DashcamCard
            cardIndex={1}
            title="VREC-H520DC"
            Component={<VRECH520DC />}
            cameraPosition={[0, 1, 5]}
            description={`2K Dual Channel Dash Cam with
              ADAS Alerts`}
            features={["2K Quad HD\nFront Camera", "Full HD\nRear Camera", "Enhanced\nNight Vision", "HDR\nRecording", "ADAS\nAlerts"]}
            defaultScale={scaleH520DC}
            hoveredScale={hoveredScaleH520DC}
            defaultPosition={positionH520DC}
            hoveredPosition={hoveredPositionH520DC}
            defaultRotation={[-0.2, 0, 0]}
            hoveredRotation={[-0.2, -0.75, 0]}
            featureIcons={["/icons/2kicon.svg", "/icons/fullHd.svg", "/icons/enhanced.svg", "/icons/hdr.svg", "/icons/adasAlert.svg"]}
          />
          <DashcamCard
            cardIndex={2}
            title="VREC-H320SC"
            Component={<VRECH320SC />}
            cameraPosition={[0, 1, 5]}
            description={`Full HD Dash Cam
              `}
            features={["2 MP 1080P\nFront Camera", "WDR\nRecording", "In-built\nGPS Logger", "Wide Dynamic\nRange", "ADAS\nAlerts"]}
            defaultScale={scaleH320SC}
            hoveredScale={scaleH320SC}
            defaultPosition={positionH320SC}
            hoveredPosition={hoveredPositionH320SC}
            defaultRotation={[-0.2, 0, 0]}
            hoveredRotation={[-0.2, -0.75, 0]}
            featureIcons={["/icons/2kicon.svg", "/icons/wdr.svg", "/icons/inBuildGps.svg", "/icons/wideDynamic.svg", "/icons/adasAlert.svg"]}
          />
          <DashcamCard
            cardIndex={3}
            title="VREC-H120SC"
            Component={<VRECH120SC />}
            cameraPosition={[0, 1, 5]}
            description={`Ultra Compact 1.5K Dash Cam`}
            features={["1.5K Resolution\nFront Camera", "Super\nCompact", "Emergency\nRecording", "Wide Field\nView", "In-built\nG-Sensor"]}
            defaultScale={scaleH120SC}
            hoveredScale={hoveredScaleH120SC}
            defaultPosition={positionH120SC}
            hoveredPosition={hoveredPositionH120SC}
            defaultRotation={[-0.2, 0, 0]}
            hoveredRotation={[-0.2, -0.75, 0]}
            featureIcons={["/icons/1.5k.svg", "/icons/compact.svg", "/icons/emergency.svg", "/icons/wideView.svg", "/icons/inbuidSensor.svg"]}
          />
        </div>
      </div>
    </section>
  );
}
