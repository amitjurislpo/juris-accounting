"use client";

import { Link } from "@/components/ui/AppLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeftRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Building2,
  ChartLine,
  ChevronDown,
  Compass,
  HardHat,
  HeartPulse,
  History,
  Landmark,
  MonitorCog,
  Receipt,
  Rocket,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { usePresence } from "@/components/motion/usePresence";
import { footerNav, primaryNav, site, type NavChild, type NavItem } from "@/content/site";
import { cn } from "@/lib/cn";

const HOVER_CLOSE_DELAY = 220;
const EXIT_MS = 260;

// Presentation-only icon per destination (content stays in content/site.ts).
const ICONS: Record<string, LucideIcon> = {
  "/bookkeeping": BookOpen,
  "/catch-up-bookkeeping": History,
  "/accounting": ChartLine,
  "/taxation": Receipt,
  "/controller-services": ShieldCheck,
  "/cfo-services": Compass,
  "/payroll": Wallet,
  "/compliance": Scale,
  "/accounts-payable-receivable": ArrowLeftRight,
  "/sales-tax-compliance": Landmark,
  "/bookkeeping-software-support": MonitorCog,
  "/industries/saas-startups": Rocket,
  "/industries/ecommerce-dtc": ShoppingBag,
  "/industries/healthcare-practices": HeartPulse,
  "/industries/real-estate-property": Building2,
  "/industries/construction-trades": HardHat,
  "/industries/agencies-consultancies-law-firms": Briefcase,
};

function isItemActive(item: NavItem, pathname: string) {
  if (pathname === item.href) return true;
  return !!item.children?.some((child) => pathname === child.href);
}

function indexStyle(i: number) {
  return { "--i": i } as CSSProperties;
}

/** Brand lockup, right-aligned. Deliberately static. */
function Wordmark() {
  return (
    <Link href="/" className="flex items-center" aria-label={`${site.name} home`}>
      <Logo />
    </Link>
  );
}

function MegaPanel({ item, id, open, pathname }: { item: NavItem; id: string; open: boolean; pathname: string }) {
  const [preview, setPreview] = useState<NavChild | null>(null);
  const children = item.children!;
  const PreviewIcon = preview ? ICONS[preview.href] : null;

  return (
    <div id={id} data-state={open ? "open" : "closed"} className="menu-panel absolute inset-x-0 top-full z-50">
      <div className="relative border-y border-line bg-canvas shadow-float">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <Container className="relative grid gap-10 py-8 lg:grid-cols-[16rem_1fr]">
          {/* Preview rail — shows the hovered destination */}
          <div className="flex min-h-[12rem] flex-col border-r border-line pr-8">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">
              <span className="h-1 w-1 rounded-full bg-signal" aria-hidden />
              {item.label}
            </p>
            <div key={preview?.href ?? "default"} className="recommendation-fade mt-6">
              {PreviewIcon && (
                <span className="icon-draw mb-4 block text-silver" aria-hidden>
                  <PreviewIcon size={22} />
                </span>
              )}
              <p className="text-xl leading-snug tracking-[-0.03em] text-fg">
                {preview ? preview.label : (item.footer?.note ?? item.label)}
              </p>
              {preview?.description && (
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{preview.description}</p>
              )}
            </div>
            {item.footer && (
              <Link
                href={item.footer.href}
                className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-fg"
              >
                <span className="link-draw">{item.footer.label}</span>
                <ArrowUpRight
                  size={15}
                  className="text-fg-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            )}
          </div>

          <ul
            className={cn(
              "menu-stagger grid content-start gap-x-6 gap-y-1",
              children.length > 6 ? "grid-cols-2 xl:grid-cols-3" : "grid-cols-2",
            )}
            onPointerLeave={() => setPreview(null)}
          >
            {children.map((child, i) => {
              const childActive = pathname === child.href;
              const Icon = ICONS[child.href] ?? ArrowUpRight;
              return (
                <li key={child.href} style={indexStyle(i)}>
                  <Link
                    href={child.href}
                    aria-current={childActive ? "page" : undefined}
                    onPointerEnter={() => setPreview(child)}
                    onFocus={() => setPreview(child)}
                    className={cn(
                      "group relative flex items-start gap-4 rounded-control border border-transparent px-3.5 py-3.5 transition-[background-color,border-color] duration-300 hover:border-line hover:bg-white/[0.035]",
                      childActive && "border-line bg-white/[0.035]",
                    )}
                  >
                    <span
                      className="icon-draw grid h-9 w-9 shrink-0 place-items-center border border-line bg-white/[0.02] text-fg-muted transition-[color,border-color] duration-500 group-hover:border-white/25 group-hover:text-fg"
                      aria-hidden
                    >
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-sm font-medium text-fg">
                        {child.label}
                        {childActive && <span className="h-1 w-1 rounded-full bg-signal" aria-hidden />}
                      </span>
                      {child.description && (
                        <span className="mt-1 block text-xs leading-relaxed text-fg-subtle transition-colors duration-300 group-hover:text-fg-muted">
                          {child.description}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </div>
  );
}

function DesktopItem({
  item,
  index,
  isOpen,
  pathname,
  onOpen,
  onClose,
  onToggle,
  onHighlight,
}: {
  item: NavItem;
  index: number;
  isOpen: boolean;
  pathname: string;
  onOpen: (index: number, via: "hover" | "click") => void;
  onClose: (index: number) => void;
  onToggle: (index: number) => void;
  onHighlight: (el: HTMLElement) => void;
}) {
  const isActive = isItemActive(item, pathname);
  const mounted = usePresence(isOpen, EXIT_MS);
  const closeTimer = useRef<number | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = `mega-${index}`;

  const itemClasses = cn(
    "relative z-10 flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[13px] tracking-[0.01em] transition-colors duration-300 hover:text-fg",
    isActive || isOpen ? "text-fg" : "text-fg-muted",
  );
  const label = (
    <>
      {item.label}
      {isActive && <span className="h-1 w-1 rounded-full bg-signal" aria-hidden />}
    </>
  );

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={itemClasses}
        onPointerEnter={(e) => onHighlight(e.currentTarget)}
        onFocus={(e) => onHighlight(e.currentTarget)}
      >
        {label}
      </Link>
    );
  }

  return (
    <div
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        window.clearTimeout(closeTimer.current);
        onOpen(index, "hover");
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        closeTimer.current = window.setTimeout(() => onClose(index), HOVER_CLOSE_DELAY);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose(index);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && isOpen) {
          e.stopPropagation();
          onClose(index);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={itemClasses}
        aria-expanded={isOpen}
        aria-controls={mounted ? panelId : undefined}
        aria-current={isActive ? "page" : undefined}
        onClick={() => onToggle(index)}
        onPointerEnter={(e) => onHighlight(e.currentTarget)}
        onFocus={(e) => onHighlight(e.currentTarget)}
      >
        {label}
        <ChevronDown
          size={13}
          className={cn("text-fg-subtle transition-transform duration-500 ease-lux", isOpen && "rotate-180 text-fg")}
          aria-hidden
        />
      </button>
      {mounted && <MegaPanel item={item} id={panelId} open={isOpen} pathname={pathname} />}
    </div>
  );
}

function IndexGroup({
  item,
  index,
  pathname,
  defaultOpen,
}: {
  item: NavItem;
  index: number;
  pathname: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isActive = isItemActive(item, pathname);
  const groupId = `index-group-${index}`;

  return (
    <li className="border-b border-line" style={indexStyle(index)}>
      <div className="flex items-center justify-between gap-4">
        <Link
          href={item.href}
          aria-current={pathname === item.href ? "page" : undefined}
          className="group flex flex-1 items-baseline gap-4 py-3.5 text-[1.45rem] leading-none tracking-[-0.03em] text-fg md:text-[1.75rem]"
        >
          <span className="transition-transform duration-500 ease-lux group-hover:translate-x-2">{item.label}</span>
          {isActive && <span className="h-1.5 w-1.5 self-center rounded-full bg-signal" aria-hidden />}
        </Link>
        {item.children && (
          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-line text-fg-muted transition-colors hover:border-white/30 hover:text-fg"
            aria-expanded={open}
            aria-controls={groupId}
            aria-label={`${open ? "Hide" : "Show"} ${item.label} pages`}
            onClick={() => setOpen((v) => !v)}
          >
            <ChevronDown
              size={18}
              className={cn("transition-transform duration-500 ease-lux", open && "rotate-180")}
              aria-hidden
            />
          </button>
        )}
      </div>
      {item.children && (
        <div
          id={groupId}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-lux",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="grid gap-x-8 pb-6 sm:grid-cols-2">
              {item.children.map((child) => {
                const childActive = pathname === child.href;
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      aria-current={childActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2 border-b border-line py-2 text-sm transition-colors",
                        childActive ? "text-fg" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {child.label}
                      {childActive && <span className="h-1 w-1 rounded-full bg-signal" aria-hidden />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openedVia, setOpenedVia] = useState<"hover" | "click" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [highlight, setHighlight] = useState<{ left: number; width: number } | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuMounted = usePresence(menuOpen, 340);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenIndex(null);
    setMenuOpen(false);
  }

  function openDropdown(index: number, via: "hover" | "click") {
    setOpenIndex(index);
    setOpenedVia(via);
  }

  function toggleDropdown(index: number) {
    // A click right after hover-opening pins the panel open rather than
    // closing what the pointer just revealed.
    if (openIndex === index && openedVia === "hover") {
      setOpenedVia("click");
      return;
    }
    if (openIndex === index) {
      setOpenIndex(null);
      return;
    }
    openDropdown(index, "click");
  }

  // Only closes `index` if it's still the open one — a delayed hover-close
  // from one trigger must not close a sibling the pointer has moved onto.
  function closeDropdown(index: number) {
    setOpenIndex((current) => (current === index ? null : current));
  }

  // Moving highlight behind the hovered/focused nav item.
  function highlightItem(el: HTMLElement) {
    const header = headerRef.current;
    if (!header) return;
    const h = header.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setHighlight({ left: r.left - h.left, width: r.width });
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenIndex(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpenIndex(null);
      if (menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Lock page scroll behind the open index overlay.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen || openIndex !== null;
  const activeGroup = primaryNav.findIndex((item) => item.children && isItemActive(item, pathname));

  return (
    <header ref={headerRef} className="sticky top-0 z-40 text-fg">
      {/* Glass on its own layer so the header never becomes a containing
          block for the fixed index overlay. */}
      <div
        className={cn(
          "absolute inset-0 -z-10 border-b transition-[background-color,border-color] duration-700",
          solid ? "border-line bg-canvas/80 backdrop-blur-xl" : "border-transparent bg-canvas/0",
        )}
        aria-hidden
      />
      <span
        key={pathname}
        className="route-sweep pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
        aria-hidden
      />
      {highlight && (
        <span
          className="pointer-events-none absolute top-[1.125rem] hidden h-9 rounded-control border border-line bg-white/[0.04] transition-[left,width] duration-500 ease-lux lg:block"
          style={{ left: highlight.left, width: highlight.width }}
          aria-hidden
        />
      )}

      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        {/* LEFT — index trigger + primary navigation */}
        <div className="flex items-center gap-4 lg:-ml-3">
          <button
            ref={toggleRef}
            type="button"
            className="group flex h-10 items-center gap-3 border border-line px-3.5 text-fg transition-colors hover:border-white/30 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={menuMounted ? "site-index" : undefined}
            onClick={() => {
              setOpenIndex(null);
              setMenuOpen((v) => !v);
            }}
          >
            <span className="burger-lines flex w-[18px] flex-col gap-[5px]" aria-hidden>
              <span className="burger-line block h-px w-[18px] bg-current" />
              <span className="burger-line block h-px w-3 bg-current" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted" aria-hidden>
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>

          <div ref={navRef} className="hidden lg:flex">
            <nav className="flex items-center" aria-label="Primary" onPointerLeave={() => setHighlight(null)}>
              {primaryNav.map((item, index) => (
                <DesktopItem
                  key={item.label}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  pathname={pathname}
                  onOpen={openDropdown}
                  onClose={closeDropdown}
                  onToggle={toggleDropdown}
                  onHighlight={highlightItem}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* RIGHT — brand */}
        <Wordmark />
      </Container>

      {menuMounted && (
        <div
          id="site-index"
          data-state={menuOpen ? "open" : "closed"}
          className="menu-panel fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto overscroll-contain border-t border-line bg-canvas"
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div
            className="ambient-drift pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-[0.06] blur-3xl"
            style={{ background: "radial-gradient(closest-side, #fff, transparent)" }}
            aria-hidden
          />
          <Container className="relative grid min-h-full gap-10 pb-10 pt-6 lg:grid-cols-[1fr_18rem] lg:pt-10">
            <nav aria-label="Site index">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">Index</p>
              <ul className="menu-stagger flex flex-col border-t border-line">
                {primaryNav.map((item, index) => (
                  <IndexGroup
                    key={item.label}
                    item={item}
                    index={index}
                    pathname={pathname}
                    defaultOpen={activeGroup === -1 ? index === 0 : activeGroup === index}
                  />
                ))}
              </ul>
            </nav>
            <aside className="flex flex-col gap-8 lg:border-l lg:border-line lg:pl-10">
              <div className="enter" style={{ "--enter-delay": "0.3s" } as CSSProperties}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">Also here</p>
                <ul className="mt-4 flex flex-col">
                  {footerNav.resources.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between border-b border-line py-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-auto max-w-[16rem] font-serif text-xl italic leading-snug text-fg-muted">
                {site.tagline}
              </p>
            </aside>
          </Container>
        </div>
      )}
    </header>
  );
}
