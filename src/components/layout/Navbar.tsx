"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Search, Sun, Volume2, VolumeX, X } from "lucide-react";
import { Container } from "./Container";
import { useApp } from "./Providers";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/breeds", label: "Breeds" },
  { href: "/compare", label: "Compare" },
  { href: "/anatomy", label: "Anatomy" },
  { href: "/map", label: "World Map" },
  { href: "/favorites", label: "Favorites" },
];

export function Navbar({ onSearch }: { onSearch?: () => void }) {
  const pathname = usePathname();
  const { theme, toggleTheme, soundEnabled, toggleSound } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "transition-all duration-300",
          scrolled ? "glass border-b border-border" : "bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="HorseVision home">
            <Logo className="h-8 w-8" />
            <span className="font-display text-lg font-semibold tracking-tight">HorseVision</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "label rounded-full px-3.5 py-2 transition-colors",
                  pathname.startsWith(l.href)
                    ? "text-text"
                    : "text-muted hover:text-text hover:bg-surface-2",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <IconBtn label="Search (⌘K)" onClick={onSearch}>
              <Search className="h-[18px] w-[18px]" />
            </IconBtn>
            <IconBtn label="Toggle sound" onClick={toggleSound}>
              {soundEnabled ? (
                <Volume2 className="h-[18px] w-[18px]" />
              ) : (
                <VolumeX className="h-[18px] w-[18px]" />
              )}
            </IconBtn>
            <IconBtn label="Toggle theme" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </IconBtn>
            <div className="hidden sm:block">
              <LinkButton href="/analyze" size="sm">
                Identify a horse
              </LinkButton>
            </div>
            <IconBtn label="Menu" onClick={() => setOpen((o) => !o)} className="md:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </IconBtn>
          </div>
        </Container>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass border-b border-border md:hidden"
          >
            <Container className="flex flex-col py-4">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="py-3 text-text">
                  {l.label}
                </Link>
              ))}
              <LinkButton href="/analyze" className="mt-2" size="sm">
                Identify a horse
              </LinkButton>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  className,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-text",
        className,
      )}
    >
      {children}
    </button>
  );
}
