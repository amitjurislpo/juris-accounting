import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[76rem] px-5 sm:px-6 md:px-10", className)}>
      {children}
    </div>
  );
}
