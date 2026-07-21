import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://cra-site.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/cidades",
    "/agenda",
    "/desafios",
    "/como-participar",
    "/sobre",
    "/faq",
    "/blog",
    "/parceiros",
    "/contato",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const [{ data: cities }, { data: posts }] = await Promise.all([
    supabase.from("city_pages").select("slug").eq("active", true),
    supabase.from("blog_posts").select("slug, published_at").eq("published", true),
  ]);

  const cityRoutes: MetadataRoute.Sitemap = (cities ?? []).map((c) => ({
    url: `${BASE_URL}/cidades/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.published_at ?? undefined,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...cityRoutes, ...postRoutes];
}
