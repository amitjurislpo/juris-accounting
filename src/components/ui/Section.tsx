import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "ivory" | "cream" | "void" | "deep";

const toneClasses: Record<Tone, string> = {
  ivory: "bg-ivory text-charcoal",
  cream: "bg-cream text-charcoal",
  void: "bg-void text-ivory",
  deep: "bg-forest-deep text-ivory",
};

const darkTones: Tone[] = ["void", "deep"];

export function Section({
  id,
  tone = "ivory",
  className,
  containerClassName,
  border = true,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  border?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-14 md:py-20",
        toneClasses[tone],
        border && !darkTones.includes(tone) && "border-b border-hairline",
        border && darkTones.includes(tone) && "border-b border-hairline-dark",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "ivory",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.22em]",
        darkTones.includes(tone) ? "text-emerald" : "text-forest",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ivory",
  as = "h2",
  wide = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  as?: "h1" | "h2";
  /** Widen the heading column so a longer title can stay on one line. */
  wide?: boolean;
}) {
  const Heading = as;
  return (
    <div className={cn(wide ? "max-w-4xl" : "max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <Eyebrow tone={darkTones.includes(tone) ? "void" : "ivory"}>{eyebrow}</Eyebrow>
      )}
      <Heading
        className={cn(
          "mt-4 text-3xl leading-[1.05]",
          wide ? "md:text-4xl lg:whitespace-nowrap lg:text-[2.75rem]" : "md:text-4xl lg:text-5xl",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            darkTones.includes(tone) ? "text-ivory-soft" : "text-charcoal-soft",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
