import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!post) return {};
  return { title: `${post.title} — CRA`, description: post.excerpt ?? undefined };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/blog" className="text-sm text-[var(--cra-ink-muted)]">
        ← Blog
      </Link>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--cra-black)]">
        {post.title}
      </h1>
      {post.published_at && (
        <p className="mt-2 text-xs text-[var(--cra-ink-muted)]">
          {new Date(post.published_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
      <div className="prose mt-8 whitespace-pre-line text-[var(--cra-ink)]">{post.content}</div>

      <Link
        href="/cidades"
        className="mt-10 inline-block rounded-full bg-[var(--cra-yellow)] px-8 py-4 text-base font-bold text-black"
      >
        Achar meu grupo →
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.published_at,
          }),
        }}
      />
    </article>
  );
}
