import Link from "next/link";
import { getCategories } from "@/lib/supabase";
import { SectionHeading } from "@/components/section-heading";

export async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
      <SectionHeading
        title="Kategoriler"
        description="Icerikler, finansal okuryazarligi destekleyecek sekilde basliklandirilmistir."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/kategori/${category.slug}`}
            className="focus-ring group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-[var(--color-gold)]/60 hover:bg-[#fcfbf8]"
          >
            <h3 className="font-[var(--font-serif)] text-lg text-[var(--color-navy)]">{category.name}</h3>
            <p className="mt-2 text-sm text-[var(--color-slate)]">{category.description || "Bu kategoriye ait yazilari kesfedin."}</p>
            <span className="mt-4 inline-flex text-xs font-semibold text-[var(--color-gold)]">Yazilari goruntule</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
