import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { InstagramIcon, LinkedInIcon, MailIcon, XIcon } from "@/components/social-icons";

const iconButtonClass =
  "focus-ring inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-white transition hover:opacity-90";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f8fafc]">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <p className="font-[var(--font-serif)] text-xl text-[var(--color-navy)]">Finansal Günlük</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--color-slate)]">
          Piyasa analizleri, finans tarihi ve yatırım disiplini üzerine eğitsel içerikler sunan kişisel finans platformu.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-5">
          <a href={`mailto:${siteConfig.email}`} className={iconButtonClass} aria-label="E-posta" title="E-posta">
            <MailIcon className="h-7 w-7" />
          </a>

          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className={iconButtonClass}
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <LinkedInIcon className="h-7 w-7" />
          </a>

          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-white/90" aria-label="X (yakında)" title="X (yakında)">
            <XIcon className="h-7 w-7" />
          </span>

          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-white/90" aria-label="Instagram (yakında)" title="Instagram (yakında)">
            <InstagramIcon className="h-7 w-7" />
          </span>
        </div>
      </div>

      <div className="border-t border-slate-200 py-3 text-center text-sm text-[var(--color-slate)]">
        <Link href="/" className="focus-ring rounded-sm hover:text-[var(--color-navy)]">Ana Sayfa</Link>
        <span className="mx-2 text-slate-400">|</span>
        <Link href="/hakkimda" className="focus-ring rounded-sm hover:text-[var(--color-navy)]">Hakkımda</Link>
        <span className="mx-2 text-slate-400">|</span>
        <Link href="/egitimler" className="focus-ring rounded-sm hover:text-[var(--color-navy)]">Eğitimler</Link>
        <span className="mx-2 text-slate-400">|</span>
        <Link href="/yasal-uyari" className="focus-ring rounded-sm hover:text-[var(--color-navy)]">Yasal Uyarı</Link>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Finansal Günlük. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}