import { siteConfig } from "@/lib/site";
import { InstagramIcon, LinkedInIcon, MailIcon, XIcon } from "@/components/social-icons";

const iconButtonClass =
  "focus-ring inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-white transition hover:opacity-90 md:h-16 md:w-16";

export function ContactCard() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="font-[var(--font-serif)] text-3xl text-[var(--color-navy)] md:text-4xl">İletişim</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--color-slate)] md:text-base">
          İş birliği, konuşma daveti ve profesyonel iletişim talepleri için aşağıdaki kanallardan ulaşabilirsiniz.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-5">
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

          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-white/90 md:h-16 md:w-16" aria-label="X (yakında)" title="X (yakında)">
            <XIcon className="h-7 w-7" />
          </span>

          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-white/90 md:h-16 md:w-16" aria-label="Instagram (yakında)" title="Instagram (yakında)">
            <InstagramIcon className="h-7 w-7" />
          </span>
        </div>
      </div>
    </section>
  );
}