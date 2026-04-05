import { AboutPreview } from "@/components/about-preview";
import { CategoryGrid } from "@/components/category-grid";
import { EducationPreview } from "@/components/education-preview";
import { FeaturedPosts } from "@/components/featured-posts";
import { HeroSection } from "@/components/hero-section";
import { LatestPosts } from "@/components/latest-posts";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPosts />
      <LatestPosts />
      <CategoryGrid />
      <EducationPreview />
      <AboutPreview />
    </>
  );
}
