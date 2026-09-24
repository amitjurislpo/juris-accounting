"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { usePresence } from "@/components/motion/usePresence";

/**
 * Bottom-anchored notification. Announced politely to screen readers,
 * auto-dismisses after `duration` ms, and animates in/out via
 * data-state (see .toast in globals.css).
 */
export function Toast({
  open,
  title,
  children,
  onClose,
  duration = 6000,
}: {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  duration?: number;
}) {
  const mounted = usePresence(open, 300);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[65] flex justify-center px-5" role="status" aria-live="polite">
      {mounted && (
        <div
          data-state={open ? "open" : "closed"}
          className="toast pointer-events-auto flex w-full max-w-md items-start gap-4 rounded-card border border-line-strong bg-surface/95 p-5 shadow-float backdrop-blur-xl"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-signal" aria-hidden />
          <div className="flex-1">
            <p className="text-sm font-medium text-fg">{title}</p>
            {children && <p className="mt-1 text-sm leading-relaxed text-fg-muted">{children}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center text-fg-subtle transition-colors hover:text-fg"
            aria-label="Dismiss notification"
          >
            <X size={15} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
