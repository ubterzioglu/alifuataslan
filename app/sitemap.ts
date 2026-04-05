import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  const baseRoutes = ["", "/hakkimda", "/iletisim", "/yasal-uyari", "/egitimler", "/yazilar"];

  const staticEntries = baseRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const postEntries = posts.map((post) => ({
    url: `${siteConfig.url}/yazilar/${post.slug}`,
    lastModified: new Date(post.published_at!),
  }));

  return [...staticEntries, ...postEntries];
}
