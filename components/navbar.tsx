"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const previewActive = pathname === "/preview.html";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#0A1A33]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="inline-flex items-center gap-3">
          <Link
            href="/preview.html"
            className={`focus-ring hidden rounded-md border px-3 py-1.5 text-xs font-semibold transition sm:inline-flex ${
              previewActive
                ? "border-[var(--color-gold)] bg-[#132748] text-[var(--color-gold)]"
                : "border-slate-500 text-slate-100 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            }`}
            onClick={() => setOpen(false)}
          >
            Beni oku Ali Fuat!
          </Link>
          <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-sm" onClick={() => setOpen(false)}>
            <span className="font-[var(--font-serif)] text-lg text-white">Finansal Günlük</span>
            <span className="h-5 w-px bg-[var(--color-gold)]" aria-hidden="true" />
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Ana Menü">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-md px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#132748] text-[var(--color-gold)]"
                    : "text-slate-100 hover:bg-[#132748] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="focus-ring inline-flex rounded-md border border-slate-500 px-3 py-2 text-sm text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Menüyü aç veya kapat"
        >
          Menu
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-slate-700 bg-[#0A1A33] px-4 py-3 md:hidden" aria-label="Mobil Menü">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`focus-ring block rounded-md px-3 py-2 text-sm font-medium ${
                      active ? "bg-[#132748] text-[var(--color-gold)]" : "text-white hover:bg-[#132748]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/preview.html"
                onClick={() => setOpen(false)}
                className={`focus-ring block rounded-md px-3 py-2 text-sm font-medium ${
                  previewActive ? "bg-[#132748] text-[var(--color-gold)]" : "text-white hover:bg-[#132748]"
                }`}
              >
                Beni oku Ali Fuat!
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
