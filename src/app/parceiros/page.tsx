import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { ContactForm } from "../contato/contact-form";

export const metadata: Metadata = {
  title: "Parceiros — CRA",
  description: "Marcas e empresas que apoiam a comunidade CRA.",
};

export default async function ParceirosPage() {
  const supabase = createClient();
  const { data: partners } = await supabase
    .from("partners")
    .select("name, description, logo_url, website_url")
    .eq("active", true)
    .order("name");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--cra-black)]">
        PARCEIROS
      </h1>
      <p className="mt-2 text-[var(--cra-ink-muted)]">
        Marcas e empresas que apoiam a comunidade CRA — sem elas, boa parte do que a gente faz não
        seria possível.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {(partners ?? []).map((p) => (
          <a
            key={p.name}
            href={p.website_url ?? "#"}
            target={p.website_url ? "_blank" : undefined}
            rel="noreferrer"
            className="rounded-2xl border border-neutral-200 bg-white p-5"
          >
            {p.logo_url ? (
              <Image src={p.logo_url} alt={p.name} width={80} height={80} />
            ) : (
              <p className="font-[family-name:var(--font-display)] text-xl text-[var(--cra-black)]">{p.name}</p>
            )}
            {p.description && <p className="mt-2 text-sm text-[var(--cra-ink-muted)]">{p.description}</p>}
          </a>
        ))}
        {(partners ?? []).length === 0 && (
          <p className="text-[var(--cra-ink-muted)]">Ainda sem parceiros cadastrados.</p>
        )}
      </div>

      <div className="mt-14 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
        <p className="font-semibold text-[var(--cra-black)]">Quer ser parceiro do CRA?</p>
        <p className="mt-1 text-sm text-[var(--cra-ink-muted)]">Manda uma mensagem, a gente responde.</p>
        <div className="mt-4">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
