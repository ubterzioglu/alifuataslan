import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
<h1 className="font-[var(--font-serif)] text-4xl text-[var(--color-navy)]">Sayfa Bulunamadı</h1>
<p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--color-slate)] md:text-base">
  Aradığınız içerik taşınmış veya kaldırılmış olabilir.
</p>
<Link
  href="/"
  className="focus-ring mt-8 inline-flex rounded-md bg-[var(--color-navy)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
>
  Ana Sayfaya Dön
</Link>
    </section>
  );
}
