import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  description?: string;
  href?: string;
  actionLabel?: string;
};

export function SectionHeading({
  title,
  description,
  href,
  actionLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
      <div>
        <h2 className="font-[var(--font-serif)] text-2xl text-[var(--color-navy)] md:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm text-[var(--color-slate)] md:text-base">{description}</p> : null}
      </div>
      {href && actionLabel ? (
        <Link
          href={href}
          className="focus-ring hidden rounded-md border border-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-[var(--color-navy)] transition hover:bg-[#f7f2ea] md:inline-flex"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
