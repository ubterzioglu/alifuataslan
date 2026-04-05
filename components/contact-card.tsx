import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function ContactCard() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="font-[var(--font-serif)] text-3xl text-[var(--color-navy)] md:text-4xl">Iletisim</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--color-slate)] md:text-base">
          Is birligi, konusma daveti ve profesyonel iletisim talepleri icin asagidaki kanallardan ulasabilirsiniz.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-slate-200 bg-[var(--color-surface)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">E-posta</p>
            <a href={`mailto:${siteConfig.email}`} className="focus-ring mt-1 inline-flex text-[var(--color-navy)] underline-offset-4 hover:underline">
              {siteConfig.email}
            </a>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">LinkedIn</p>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="focus-ring mt-1 inline-flex text-[var(--color-navy)] underline-offset-4 hover:underline">
              Profili goruntule
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-dashed border-slate-300 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">X (Twitter)</p>
              <p className="mt-1 text-sm text-[var(--color-slate)]">Yakin zamanda eklenecek.</p>
            </div>
            <div className="rounded-lg border border-dashed border-slate-300 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Instagram</p>
              <p className="mt-1 text-sm text-[var(--color-slate)]">Yakin zamanda eklenecek.</p>
            </div>
          </div>
        </div>

        <Link href="/" className="focus-ring mt-7 inline-flex text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline">
          Ana sayfaya don
        </Link>
      </div>
    </section>
  );
}
