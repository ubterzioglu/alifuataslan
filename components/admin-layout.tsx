import Link from "next/link";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-[var(--font-serif)] text-xl font-bold text-[var(--color-navy)]">
              Admin Panel
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin/posts" className="text-slate-600 hover:text-[var(--color-navy)]">
                Yazılar
              </Link>
              <Link href="/admin/categories" className="text-slate-600 hover:text-[var(--color-navy)]">
                Kategoriler
              </Link>
              <Link href="/admin/tags" className="text-slate-600 hover:text-[var(--color-navy)]">
                Etiketler
              </Link>
              <Link href="/admin/todos" className="text-slate-600 hover:text-[var(--color-navy)]">
                İçerik Planlama
              </Link>
            </nav>
          </div>
          <Link href="/" className="text-sm text-slate-500 hover:text-[var(--color-navy)]">
            Siteye Dön
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
