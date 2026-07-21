import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog — CRA",
  description: "Histórias, guias e novidades da comunidade CRA.",
};

const clusterLabel: Record<string, string> = {
  "comecar-a-correr": "Começar a correr",
  "comunidade-cra": "Comunidade CRA",
  "desafios-e-eventos": "Desafios e eventos",
};

export default async function BlogPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, cluster, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--cra-black)]">
        BLOG
      </h1>
      <p className="mt-2 text-[var(--cra-ink-muted)]">Histórias, guias e novidades da comunidade.</p>

      <div className="mt-8 space-y-4">
        {(posts ?? []).map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block rounded-2xl border border-neutral-200 bg-white p-5 hover:border-[var(--cra-yellow)]"
          >
            {p.cluster && (
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--cra-gold)]">
                {clusterLabel[p.cluster] ?? p.cluster}
              </span>
            )}
            <p className="mt-1 font-semibold text-[var(--cra-black)]">{p.title}</p>
            {p.excerpt && <p className="mt-1 text-sm text-[var(--cra-ink-muted)]">{p.excerpt}</p>}
          </Link>
        ))}
        {(posts ?? []).length === 0 && (
          <p className="text-center text-[var(--cra-ink-muted)]">Nenhum artigo publicado ainda.</p>
        )}
      </div>
    </div>
  );
}
