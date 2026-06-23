import Link from "next/link";
import { Container } from "./Container";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/analyze", label: "Identify a horse" },
      { href: "/breeds", label: "Breed explorer" },
      { href: "/compare", label: "Compare breeds" },
      { href: "/anatomy", label: "Anatomy" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/map", label: "World map" },
      { href: "/favorites", label: "Favorites" },
      { href: "/about", label: "About & accuracy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Link href="/">
            <span className="font-display text-2xl italic">horsevision.</span>
          </Link>
          <p className="max-w-xs text-sm text-muted">
            AI that identifies horse breeds from a photo — and explains why. A premium,
            explainable equine vision experience.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {col.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-text">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} HorseVision. A design-led product concept.</p>
        <p>Made for horse owners, vets, breeders and enthusiasts.</p>
      </Container>
    </footer>
  );
}
