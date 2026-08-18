import Link from "next/link";
import { type ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "soft" | "onDark";
type ButtonSize = "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent/30 hover:text-accent",
  soft:
    "bg-white/90 text-accent shadow-sm hover:bg-white hover:text-accent-hover",
  onDark:
    "bg-white/15 text-white ring-1 ring-white/50 hover:bg-white hover:text-accent",
  ghost: "bg-transparent text-foreground hover:text-accent",
};

const sizeClass: Record<ButtonSize, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-sm sm:text-base",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = SharedProps &
  ComponentProps<"button"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps & {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  className: string,
) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClass[variant],
    sizeClass[size],
    className,
  ].join(" ");
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    ...rest
  } = props;

  const classNames = classes(variant, size, className);

  if ("href" in rest && rest.href) {
    const { href, children, onClick } = rest;
    const external = /^https?:\/\//.test(href);

    if (external) {
      return (
        <a
          href={href}
          className={classNames}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classNames} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonAsButton;
  return <button className={classNames} {...buttonProps} />;
}
