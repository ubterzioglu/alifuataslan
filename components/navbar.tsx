"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { navItems } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const previewActive = pathname === "/preview.html";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#0A1A33]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="inline-flex items-center gap-3">
          <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-sm" onClick={() => setOpen(false)}>
            <span className="inline-flex h-11 w-11 overflow-hidden rounded-full border border-white/35 bg-white shadow-[0_6px_14px_rgba(0,0,0,0.28)]">
              <Image
                src="/images/logo.png"
                alt="Finansal GÃ¼nlÃ¼k logo"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="font-[var(--font-serif)] text-lg text-white">Finansal GÃ¼nlÃ¼k</span>
            <span className="h-5 w-px bg-[var(--color-gold)]" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Ana MenÃ¼">
            {navItems.map((item, i) => {
              const active = pathname === item.href;
              return (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    className={`focus-ring rounded-md px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-[#132748] text-[var(--color-gold)]"
                        : "text-slate-100 hover:bg-[#132748] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {i < navItems.length - 1 ? <span className="h-4 w-px bg-[var(--color-gold)]/40" /> : null}
                </React.Fragment>
              );
            })}
          </nav>

          <Link
            href="/preview.html"
            className={`focus-ring hidden rounded-md border px-3 py-1.5 text-xs font-semibold transition sm:inline-flex ${
              previewActive
                ? "border-[var(--color-gold)] bg-[#132748] text-[var(--color-gold)]"
                : "border-slate-500 text-slate-100 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            }`}
            onClick={() => setOpen(false)}
          >
            Preview
          </Link>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="focus-ring inline-flex rounded-md border border-slate-500 px-3 py-2 text-sm text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="MenÃ¼yÃ¼ aÃ§ veya kapat"
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-slate-700 bg-[#0A1A33] px-4 py-3 md:hidden" aria-label="Mobil MenÃ¼">
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
                Preview
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}