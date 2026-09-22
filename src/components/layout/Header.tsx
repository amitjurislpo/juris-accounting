"use client";

import { Link } from "@/components/ui/AppLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { primaryNav, site, type NavItem } from "@/content/site";
import { cn } from "@/lib/cn";

function isItemActive(item: NavItem, pathname: string) {
  if (pathname === item.href) return true;
  if (item.children?.some((child) => pathname === child.href)) return true;
  return false;
}

const DROPDOWN_WIDTH = 544; // matches w-[34rem]
const VIEWPORT_MARGIN = 16;

export function Header() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [dropdownAlign, setDropdownAlign] = useState<"left" | "right">("left");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenIndex(null);
    setMobileOpen(false);
  }

  function toggleDropdown(index: number) {
    if (openIndex === index) {
      setOpenIndex(null);
      return;
    }
    // Anchor the panel to whichever side keeps it inside the viewport —
    // a fixed left-0 anchor works for a trigger near the left edge (like
    // "Services") but runs a wide panel off-screen for anything further
    // right (like "Industries"), which is what made it look "not
    // responsive" rather than just narrow.
    const el = itemRefs.current[index];
    if (el) {
      const rect = el.getBoundingClientRect();
      const overflowsRight = rect.left + DROPDOWN_WIDTH > window.innerWidth - VIEWPORT_MARGIN;
      setDropdownAlign(overflowsRight ? "right" : "left");
    }
    setOpenIndex(index);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-ivory/95 backdrop-blur-md transition-shadow duration-300",
        solid ? "border-hairline shadow-sm" : "border-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl text-forest">
            <span className="font-sans not-italic">{site.name.charAt(0)}</span>
            {site.name.slice(1)}
          </span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal-soft">
            Bookkeeping &middot; Accounting &middot; Taxation
          </span>
        </Link>

        <div ref={navRef} className="hidden items-center gap-1 lg:flex">
          <nav className="flex items-center gap-1" aria-label="Primary">
            {primaryNav.map((item, index) => {
              const hasChildren = !!item.children?.length;
              const isOpen = openIndex === index;
              const isActive = isItemActive(item, pathname);
              return (
                <div
                  key={item.label}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="relative"
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1 rounded-sm border-b-2 border-transparent px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:text-forest",
                        (isOpen || isActive) && "text-forest",
                        isActive && "border-forest",
                      )}
                      aria-expanded={isOpen}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => toggleDropdown(index)}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn("transition-transform", isOpen && "rotate-180")}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block rounded-sm border-b-2 border-transparent px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:text-forest",
                        isActive && "border-forest text-forest",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {hasChildren && isOpen && (
                    <div
                      className={cn(
                        "absolute top-full z-50 mt-2 w-[34rem] max-w-[calc(100vw-2rem)] rounded-sm border border-hairline bg-surface p-4 shadow-2xl",
                        dropdownAlign === "right" ? "right-0" : "left-0",
                      )}
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {item.children!.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              aria-current={childActive ? "page" : undefined}
                              className={cn(
                                "block rounded-sm px-3 py-2.5 hover:bg-cream",
                                childActive && "bg-cream",
                              )}
                            >
                              <span
                                className={cn(
                                  "block text-sm font-medium",
                                  childActive ? "text-forest" : "text-charcoal",
                                )}
                              >
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="mt-0.5 block text-xs text-charcoal-soft">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                      {item.footer && (
                        <div className="mt-3 flex items-center justify-between gap-4 border-t border-hairline pt-3">
                          <p className="text-xs text-charcoal-soft">{item.footer.note}</p>
                          <Link
                            href={item.footer.href}
                            className="shrink-0 rounded-sm border border-hairline px-3 py-1.5 text-xs font-medium text-charcoal transition-colors hover:border-forest hover:text-forest"
                          >
                            {item.footer.label}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-sm p-2 text-charcoal lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-hairline bg-ivory lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {primaryNav.map((item) => {
              const isActive = isItemActive(item, pathname);
              return (
                <div key={item.label} className="border-b border-hairline/70 py-2">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block py-2 text-base font-medium",
                      isActive ? "text-forest" : "text-charcoal",
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-3 flex flex-col gap-1 pb-2">
                      {item.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            aria-current={childActive ? "page" : undefined}
                            className={cn(
                              "py-1.5 text-sm",
                              childActive ? "font-medium text-forest" : "text-charcoal-soft",
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}
