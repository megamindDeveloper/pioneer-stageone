import { cn } from "@/lib/utils";
import {
  ElementType,
  ReactNode,
  ComponentPropsWithoutRef,
  forwardRef,
  Ref,
  JSX,
} from "react";

const variantClasses: Record<string, string> = {
  // Hero Section
  "hero-section-heading":
    "text-[36px] lg:text-[51.6px] lg:leading-[61.9px] xl:text-[68px] xl:leading-[81.6px] font-bold",
  "hero-body":
    "text-[16px] lg:text-[21.3px] xl:text-[28px] leading-[auto] font-normal",
  "button":
    "text-[20px] lg:text-[27.3px] xl:text-[36px] font-semibold tracking-[0%]",

  // Section
  "section-heading":
    "text-[24px] lg:text-[27.3px] xl:text-[36px] leading-[auto] font-semibold",
  "section-body":
    "text-[16px] lg:text-[21.3px] xl:text-[28px] leading-[auto] xl:leading-[1.2354em] font-normal",

  // Grid View
  "grid-view-heading":
    "text-[16px] lg:text-[19.7px] xl:text-[26px] font-semibold leading-[auto]",
  "grid-view-body":
    "text-[9px] lg:text-[10.6px] xl:text-[14px] font-normal leading-[auto]",
  "grid-view-body-hovered":
    "text-[9px] xl:text-[12px] font-normal leading-[auto]",

  // Card
  "card-heading":
    "text-[28px] lg:text-[32.7px] xl:text-[43.1px] lg:leading-[39.2px] xl:leading-[38.6px] font-semibold tracking-[0.2px] xl:tracking-[0.388px]",
  "card-body":
    "text-[12px] lg:text-[12.9px] xl:text-[17px] lg:leading-[15.5px] xl:leading-[25px] font-normal",

  // Slider
  "slider-heading":
    "text-[12.9px] xl:text-[17px] leading-[15.5px] xl:leading-[25px] font-semibold",
  "slider-subtext":
    "text-[10px] xl:text-[14px] font-normal leading-[auto]",

  // Comparison Grid
  "comparison-grid-side-heading":
    "text-[15.6px] xl:text-[20.61px] lg:leading-[18.7px] xl:leading-[25px] font-semibold",
  "comparison-grid-body":
    "text-[14px] xl:text-[20px] font-normal leading-[auto]",

  // Footer
  "footer-navigation":
    "text-[10.6px] xl:text-[14px] font-medium tracking-[0%]",
  "footer-micro-text":
    "text-[8px] xl:text-[12px] font-normal tracking-[0%]",
};

// 🔠 Semantic Tag Mapping
const semanticTags: Record<string, ElementType> = {
  "hero-section-heading": "h1",
  "section-heading": "h2",
  "grid-view-heading": "h3",
  "card-heading": "h3",
  "slider-heading": "h4",
  "comparison-grid-side-heading": "h4",
  "footer-navigation": "nav",
  "footer-micro-text": "small",
  // fallback: all others → <p>
};

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: keyof typeof variantClasses;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "variant">;

export const Typography = forwardRef(function Typography<T extends ElementType>(
  { as, variant = "section-body", className, children, ...props }: TypographyProps<T>,
  ref: Ref<any>
): JSX.Element {
  const Component = as || semanticTags[variant] || "p";

  return (
    <Component
      ref={ref}
      className={cn(
        "font-['Helvetica_Neue','Helvetica','Arial','sans-serif']",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}) as <T extends ElementType>(
  props: TypographyProps<T> & { ref?: Ref<any> }
) => JSX.Element;
