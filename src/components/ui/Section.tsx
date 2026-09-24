import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionBackdrop } from "@/components/motion/SectionBackdrop";

type Tone = "canvas" | "raised" | "void" | "deep";

const toneClasses: Record<Tone, string> = {
  canvas: "bg-transparent text-fg",
  raised: "bg-raised/80 text-fg",
  void: "bg-void text-fg",
  deep: "bg-graphite text-fg",
};

const darkTones: Tone[] = ["void", "deep"];

export function Section({
  id,
  tone = "canvas",
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
        "relative isolate py-10 md:py-12",
        toneClasses[tone],
        border && "border-b border-line",
        className,
      )}
    >
      <SectionBackdrop />
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "canvas",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
}) {
  const dark = darkTones.includes(tone);
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em]",
        dark ? "text-fg-muted" : "text-fg-subtle",
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-signal" aria-hidden />
      <span className="h-px w-6 bg-line-strong" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "canvas",
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
  const dark = darkTones.includes(tone);
  return (
    <Reveal
      staggerChildren
      y={18}
      stagger={0.09}
      className={cn(wide ? "max-w-4xl" : "max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrow && <Eyebrow tone={dark ? "void" : "canvas"}>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "mt-5 text-[1.7rem] leading-[1.08] tracking-[-0.04em] text-balance",
          wide ? "md:text-[2.2rem] lg:whitespace-nowrap lg:text-[2.4rem]" : "md:text-[2.2rem] lg:text-[2.6rem]",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed md:text-[1.07rem]",
            dark ? "text-fg-muted" : "text-fg-muted",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
