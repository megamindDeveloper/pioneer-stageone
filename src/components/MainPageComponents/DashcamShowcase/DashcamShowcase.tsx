import VRECZ820DC from "../../CommonComponents/models/VRECZ820DC";
import VRECH520DC from "../../CommonComponents/models/VRECH520DC";
import VRECH320SC from "../../CommonComponents/models/VRECH320SC";
import VRECH120SC from "../../CommonComponents/models/VRECH120SC";
import DashcamCard from "./DashcamCard";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { useResponsiveScale } from "@/hooks/useResponsiveScale";
import { useResponsivePosition } from "@/hooks/useResponsivePosition";

export default function DashcamShowcase() {
  const scaleZ820DC = useResponsiveScale(
    [0.6, 0.6, 0.6], // xl
    [0.6, 0.6, 0.6], // lg
    [0.45, 0.45, 0.45], // md
    [0.4, 0.4, 0.4], // sm
    [0.35, 0.35, 0.35] // xs
  );
  const hoveredScaleH820SC = useResponsiveScale(
    [0.6, 0.6, 0.6], // xl
    [0.55, 0.55, 0.55], // lg
    [0.45, 0.45, 0.45], // md
    [0.4, 0.4, 0.4], // sm
    [0.35, 0.35, 0.35] // xs
  );
  
  // VREC-Z820DC
  const positionZ820DC = useResponsivePosition(
    [0, 0.6, 0], // xl
    [0, 0.9, 0], // lg
    [0, 0.45, 0], // md
    [0, 0.4, 0], // sm
    [0, 0.3, 0] // xs
  );
  const hoveredPositionZ820DC = useResponsivePosition([0.9, 0.6, 0], [0.8, 0.55, 0], [0.7, 0.45, 0], [0.6, 0.4, 0], [0.5, 0.3, 0]);

  // VREC-H520DC
  const scaleH520DC = useResponsiveScale([0.6, 0.6, 0.6], [0.7, 0.7, 0.7], [0.5, 0.5, 0.5], [0.45, 0.45, 0.45], [0.4, 0.4, 0.4]);
  const hoveredscaleH520DC = useResponsiveScale([0.6, 0.6, 0.6], [0.6, 0.6, 0.6], [0.5, 0.5, 0.5], [0.45, 0.45, 0.45], [0.4, 0.4, 0.4]);
  const positionH520DC = useResponsivePosition([0, 0.3, 0], [0, 0.5, 0], [0, 0.2, 0], [0, 0.15, 0], [0, 0.1, 0]);
  const hoveredPositionH520DC = useResponsivePosition([0.8, 0.3, 0], [0.7, 0.25, 0], [0.6, 0.2, 0], [0.5, 0.15, 0], [0.4, 0.1, 0]);

  // VREC-H320SC
  const scaleH320SC = useResponsiveScale([0.5, 0.5, 0.5], [0.6, 0.6, 0.6], [0.4, 0.4, 0.4], [0.35, 0.35, 0.35], [0.3, 0.3, 0.3]);
  const positionH320SC = useResponsivePosition([0, 0.2, 0], [0, 0.4, 0], [0, 0.1, 0], [0, 0.05, 0], [0, 0, 0]);
  const hoveredPositionH320SC = useResponsivePosition([0.8, 0.2, 0], [0.7, 0.15, 0], [0.6, 0.1, 0], [0.5, 0.05, 0], [0.4, 0, 0]);



  
  
  
  
    // VREC-H120SC
  const scaleH120SC = useResponsiveScale([0.6, 0.6, 0.6], [0.7, 0.7, 0.7], [0.5, 0.5, 0.5], [0.45, 0.45, 0.45], [0.4, 0.4, 0.4]);

  const hoveredScaleH120SC = useResponsiveScale([0.85, 0.85, 0.85], [0.8, 0.8, 0.8], [0.75, 0.75, 0.75], [0.7, 0.7, 0.7], [0.65, 0.65, 0.65]);
  const positionH120SC = useResponsivePosition([0, 0, 0], [0, 0.2, 0], [0, -0.1, 0], [0, -0.15, 0], [0, -0.2, 0]);
  const hoveredPositionH120SC = useResponsivePosition([0.8, 0, 0], [1, 0, 0], [0.6, -0.1, 0], [0.5, -0.15, 0], [0.4, -0.2, 0]);

  return (
    <section className="relative min-h-screen py-12 px-4 ">
      <Typography variant="h2" className="!font-medium mb-2 text-center text-white pb-24">
        Discover Pioneer's Smart Dashcam Range
      </Typography>

      {/* Grid container with relative positioning */}
      <div className="relative max-w-6xl xl:max-w-[90%] mx-auto h-[100vh]">
        {/* Vertical Line */}
        <div className="pointer-events-none absolute left-1/2 top-0 w-px h-full bg-gray-600 opacity-30 z-10 -translate-x-1/2" />

        {/* Horizontal Line */}
        <div className="pointer-events-none absolute top-1/2 left-0 h-px w-full bg-gray-600 opacity-30 z-10 -translate-y-1/2" />

        {/* Cards Grid */}
        <div className="relative z-20 grid grid-cols-2 grid-rows-2 gap-0 w-full h-full">
          <DashcamCard
            title="VREC-Z820DC"
            Component={<VRECZ820DC />}
            cameraPosition={[0, 1, 5]}
            description={`4K Flagship Dual Channel
              Dash Cam with Night Vision AI`}
            features={["4K Resolution\nFront Camera", "Full HD\nRear Camera", "Intelligent\nNight Vision AI", "WDR & HDR\nRecording", "ADAS\nAlerts"]}
            defaultScale={scaleZ820DC}
            hoveredScale={hoveredScaleH820SC}
            defaultPosition={positionZ820DC}
            hoveredPosition={hoveredPositionZ820DC}
            defaultRotation={[-0.2, 0, 0]}
            hoveredRotation={[-0.2, -0.75, 0]}
            featureIcons={["/icons/4kicon.svg", "/icons/fullHd.svg", "/icons/aivision.svg", "/icons/wdrhdr.svg", "/icons/adasAlert.svg"]}
          />
          <DashcamCard
            title="VREC-H520DC"
            Component={<VRECH520DC />}
            cameraPosition={[0, 1, 5]}
            description={`2K Dual Channel Dash Cam with
              ADAS Alerts`}
            features={["2K Quad HD\nFront Camera", "Full HD\nRear Camera", "Enhanced\nNight Vision", "HDR\nRecording", "ADAS\nAlerts"]}
            defaultScale={scaleH520DC}
            hoveredScale={hoveredscaleH520DC}
            defaultPosition={positionH520DC}
            hoveredPosition={hoveredPositionH520DC}
            defaultRotation={[-0.2, 0, 0]}
            hoveredRotation={[-0.2, -0.75, 0]}
            featureIcons={["/icons/2kicon.svg", "/icons/fullHd.svg", "/icons/enhanced.svg", "/icons/hdr.svg", "/icons/adasAlert.svg"]}
          />
          <DashcamCard
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
