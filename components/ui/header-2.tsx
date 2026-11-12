"use client";
import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Mission", href: "/#about" },
  { label: "Strategy", href: "/#strategy" },
  { label: "Founders", href: "/founders" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all ease-out",
        {
          "bg-[rgba(12,15,24,0.8)] supports-[backdrop-filter]:bg-[rgba(12,15,24,0.7)] border-white/10 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.3)]":
            scrolled && !open,
          "bg-[rgba(12,15,24,0.95)]": open,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-16 w-full max-w-[1320px] mx-auto items-center justify-between px-4 sm:px-8 xl:px-16 transition-all ease-out",
          { "h-14": scrolled },
        )}
      >
        <Link href="/#main" className="flex items-center gap-2 group">
          <span className="font-bold text-lg tracking-wide text-[#f7f8fb] group-hover:text-[#50d5b7] transition-colors">
            Codzec<span className="text-[#50d5b7]"> Innovations</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link, i) => (
            <Link
              key={i}
              className={buttonVariants({
                variant: "ghost",
                className:
                  "text-[#c8c9d5] hover:text-[#f7f8fb] hover:bg-white/5 text-sm",
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#50d5b7] to-[#74f2d6] text-[#041013] font-semibold text-sm px-5 py-2 hover:opacity-90 transition-opacity"
          >
            Book a call
          </Link>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#f7f8fb] hover:bg-white/5"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <div
        className={cn(
          "bg-[rgba(12,15,24,0.95)] fixed top-16 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-t border-white/10 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex h-full w-full flex-col justify-between gap-y-2 p-6">
          <div className="grid gap-y-1">
            {links.map((link) => (
              <Link
                key={link.label}
                onClick={() => setOpen(false)}
                className="flex items-center rounded-lg px-4 py-3 text-[#c8c9d5] hover:text-[#f7f8fb] hover:bg-white/5 text-base font-medium transition-colors"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="w-full text-center inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#50d5b7] to-[#74f2d6] text-[#041013] font-bold text-base px-5 py-3"
          >
            Book a discovery call
          </Link>
        </div>
      </div>
    </header>
  );
}
