import { type ComponentProps } from "react";

type ContainerProps = ComponentProps<"div"> & {
  as?: "div" | "section" | "main" | "header" | "footer";
  width?: "default" | "narrow" | "wide";
};

const widthClass = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  as: Tag = "div",
  width = "default",
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-5 sm:px-8 ${widthClass[width]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
