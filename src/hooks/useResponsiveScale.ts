import { useEffect, useState } from "react";

type Scale = [number, number, number];

export function useResponsiveScale(
  xl: Scale,
  lg: Scale,
  md: Scale,
  sm: Scale,
  xs: Scale
): Scale {
  const [scale, setScale] = useState<Scale>(xl);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        setScale(xl); // xl and above
      } else if (width >= 1024) {
        setScale(lg); // lg
      } else if (width >= 768) {
        setScale(md); // md
      } else if (width >= 640) {
        setScale(sm); // sm
      } else {
        setScale(xs); // xs
      }
    };

    updateScale(); // initial
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, [xl, lg, md, sm, xs]);

  return scale;
}
