import NextLink from "next/link";
import { forwardRef, type ComponentProps } from "react";

// Wraps next/link with prefetch disabled by default.
//
// Next.js 16's App Router prefetches an RSC payload file per linked route
// (e.g. /pricing/__next.pricing.__PAGE__.txt?_rsc=...). That scheme assumes
// the host understands Next's routing, which a plain static file server
// (or an unknown future static host) does not — it 404s on those requests
// and pollutes the console. Since this is a fully static export, the cost
// of disabling prefetch is a normal full navigation on click rather than an
// instant one; the correctness win outweighs that on an unconfirmed host.
export const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(
  function Link({ prefetch = false, ...props }, ref) {
    return <NextLink ref={ref} prefetch={prefetch} {...props} />;
  },
);
