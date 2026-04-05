import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = ["", "/hakkimda", "/iletisim", "/yasal-uyari", "/egitimler", "/yazilar"];

  const staticEntries = baseRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const postEntries = posts.map((post) => ({
    url: `${siteConfig.url}/yazilar/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticEntries, ...postEntries];
}
