import { cn } from "@/lib/utils";
import {
  ElementType,
  ReactNode,
  ComponentPropsWithoutRef,
  forwardRef,
  Ref,
  JSX,
} from "react";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "subtitle"
  | "body"
  | "caption"
  | "label";

const variantClasses: Record<Variant, string> = {
  h1: "text-[48px] xl:text-[76px] lg:text-[52px] font-bold",
  h2: "text-3xl md:text-4xl font-semibold",
  h3: "text-[24px]  md:text-[32px] font-semibold",
  h4: "text-[19px] md:text-[17px] lg2:text-[21px]   font-semibold",
  subtitle: "text-lg font-medium text-white/80",
  body: "text-base lg:text-[28px] md:text-base text-white",
  caption: "text-sm text-white/60",
  label: "text-[16px] xl:text-lg font-normal text-[#DFDFDF]  mb-4 whitespace-pre-line",
};

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Typography = forwardRef(function Typography<T extends ElementType>(
  { as, variant = "body", className, children, ...props }: TypographyProps<T>,
  ref: Ref<any>
): JSX.Element {
  const Component = as || "p";

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