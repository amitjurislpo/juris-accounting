import { Mail, Phone } from "lucide-react";
import { site } from "@/content/site";

const items = [
  {
    icon: Mail,
    title: "Email Us",
    note: "For general inquiries & support",
    label: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    title: "Call Us",
    note: "Mon–Fri • 9 AM – 6 PM",
    label: site.phone,
    href: `tel:${site.phone.replace(/[^+\d]/g, "")}`,
  },
];

export function ContactDetails() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map(({ icon: Icon, title, note, label, href }) => (
        <a
          key={title}
          href={href}
          className="group relative flex flex-col gap-3 overflow-hidden rounded-card border border-line-strong bg-surface p-7 shadow-lift transition-[border-color,background-color] duration-300 hover:bg-surface-hover"
        >
          <div className="hairline-rule absolute inset-x-0 top-0" aria-hidden />
          <span className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-gold">
            <Icon size={20} aria-hidden />
          </span>
          <h3 className="text-xl tracking-[-0.03em] text-fg">{title}</h3>
          <p className="text-sm text-fg-muted">{note}</p>
          <p className="text-lg text-silver">{label}</p>
        </a>
      ))}
    </div>
  );
}
