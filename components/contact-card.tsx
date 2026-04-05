import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Mail, ExternalLink, MessageCircle, Camera } from "lucide-react";

export function ContactCard() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="font-[var(--font-serif)] text-3xl text-[var(--color-navy)] md:text-4xl">İletişim</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--color-slate)] md:text-base">
          İş birliği, konuşma daveti ve profesyonel iletişim talepleri için aşağıdaki kanallardan ulaşabilirsiniz.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a
            href={`mailto:${siteConfig.email}`}
            className="focus-ring flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-[var(--color-gold)]/60 hover:bg-[#fcfbf8]"
          >
            <Mail className="h-7 w-7 text-[var(--color-navy)]" />
            <div>
              <p className="font-semibold text-[var(--color-navy)]">E-posta</p>
              <p className="text-sm text-slate-500">{siteConfig.email}</p>
            </div>
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="focus-ring flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-[var(--color-gold)]/60 hover:bg-[#fcfbf8]"
          >
            <ExternalLink className="h-7 w-7 text-[var(--color-navy)]" />
            <div>
              <p className="font-semibold text-[var(--color-navy)]">LinkedIn</p>
              <p className="text-sm text-slate-500">Profili görüntüle</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-xl border border-dashed border-slate-300 p-5">
            <MessageCircle className="h-7 w-7 text-slate-400" />
            <div>
              <p className="font-semibold text-slate-500">X (Twitter)</p>
              <p className="text-sm text-slate-400">Yakın zamanda eklenecek.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-dashed border-slate-300 p-5">
            <Camera className="h-7 w-7 text-slate-400" />
            <div>
              <p className="font-semibold text-slate-500">Instagram</p>
              <p className="text-sm text-slate-400">Yakın zamanda eklenecek.</p>
            </div>
          </div>
        </div>

        <Link href="/" className="focus-ring mt-7 inline-flex text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline">
          Ana sayfaya dön
        </Link>
      </div>
    </section>
  );
}
