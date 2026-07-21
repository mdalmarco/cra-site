import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Cidades — CRA",
  description: "Ache o grupo do CRA na sua cidade: dia, horário e local dos encontros semanais.",
};

export default async function CidadesPage() {
  const supabase = createClient();
  const { data: cities } = await supabase
    .from("city_pages")
    .select("slug, name, state, description")
    .eq("active", true)
    .order("name");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--cra-black)]">
        ONDE O CRA CORRE
      </h1>
      <p className="mt-2 text-[var(--cra-ink-muted)]">Ache sua cidade e veja o próximo encontro perto de você.</p>

      <div className="mt-8 space-y-3">
        {(cities ?? []).map((c) => (
          <Link
            key={c.slug}
            href={`/cidades/${c.slug}`}
            className="block rounded-2xl border border-neutral-200 bg-white p-5 hover:border-[var(--cra-yellow)]"
          >
            <p className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--cra-black)]">
              {c.name.toUpperCase()}
              {c.state ? `, ${c.state}` : ""}
            </p>
            {c.description && <p className="mt-1 text-sm text-[var(--cra-ink-muted)]">{c.description}</p>}
          </Link>
        ))}
        {(cities ?? []).length === 0 && (
          <p className="text-center text-[var(--cra-ink-muted)]">Nenhuma cidade cadastrada ainda.</p>
        )}
      </div>
    </div>
  );
}
