import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-[var(--font-serif)] text-4xl text-[var(--color-navy)]">Sayfa Bulunamadi</h1>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--color-slate)] md:text-base">
        Aradiginiz icerik tasinmis veya kaldirilmis olabilir.
      </p>
      <Link
        href="/"
        className="focus-ring mt-8 inline-flex rounded-md bg-[var(--color-navy)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
      >
        Ana Sayfaya Don
      </Link>
    </section>
  );
}
