import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f8fafc]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-[var(--font-serif)] text-xl text-[var(--color-navy)]">Finansal Gunluk</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--color-slate)]">
            Piyasa analizleri, finans tarihi ve yatirim disiplini uzerine egitsel icerikler sunan kisisel finans platformu.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[var(--color-navy)]">Hizli Linkler</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-slate)]">
            <li>
              <Link href="/" className="focus-ring rounded-sm hover:text-[var(--color-navy)]">Ana Sayfa</Link>
            </li>
            <li>
              <Link href="/hakkimda" className="focus-ring rounded-sm hover:text-[var(--color-navy)]">Hakkimda</Link>
            </li>
            <li>
              <Link href="/egitimler" className="focus-ring rounded-sm hover:text-[var(--color-navy)]">Egitimler</Link>
            </li>
            <li>
              <Link href="/yasal-uyari" className="focus-ring rounded-sm hover:text-[var(--color-navy)]">Yasal Uyari</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-[var(--color-navy)]">Iletisim</p>
          <a href={`mailto:${siteConfig.email}`} className="focus-ring mt-3 block rounded-sm text-sm text-[var(--color-slate)] hover:text-[var(--color-navy)]">
            {siteConfig.email}
          </a>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-[var(--color-navy)] hover:bg-white"
              aria-label="LinkedIn"
            >
              in
            </a>
            <span className="inline-flex h-9 items-center rounded-full border border-dashed border-slate-300 px-3 text-xs text-slate-500">X yakinda</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Finansal Gunluk. Tum haklari saklidir.
      </div>
    </footer>
  );
}
