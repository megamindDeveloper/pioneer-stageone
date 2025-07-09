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
  h3: "text-2xl md:text-3xl lg:text-[40px] font-semibold",
  h4: "text-[28px] xl:text-[28px] lg:text-[24px]  md:text-[28px] font-semibold",
  subtitle: "text-lg font-medium text-white/80",
  body: "text-base text-white/90",
  caption: "text-sm text-white/60",
  label: "text-xs uppercase tracking-wide text-white/50",
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