type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  tone?: "default" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  tone = "default",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  const titleColor = tone === "light" ? "text-white" : "text-foreground";
  const descriptionColor =
    tone === "light" ? "text-white/70" : "text-muted";

  return (
    <div className={`max-w-xl ${alignment} ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${
            tone === "light" ? "text-white/75" : "text-accent"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={`text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
      >
        {title}
      </Tag>
      {description ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
