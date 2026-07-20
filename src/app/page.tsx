import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = createClient();

  const [{ data: stats }, { data: cities }, { data: upcomingEvents }] = await Promise.all([
    supabase.from("public_community_stats").select("member_count, city_count").maybeSingle(),
    supabase.from("city_pages").select("slug, name, state").eq("active", true).order("name"),
    supabase
      .from("events")
      .select("id, name, city, start_at, location")
      .in("status", ["scheduled", "checkin_open"])
      .gte("start_at", new Date().toISOString())
      .order("start_at", { ascending: true })
      .limit(3),
  ]);

  return (
    <>
      {/* Hero — 1 frase, sem slogan generico, CTA unico */}
      <section className="cra-photo-placeholder relative flex min-h-[80svh] items-end px-4 pb-14 pt-24 text-white sm:items-center sm:justify-center sm:text-center">
        <div className="max-w-xl">
          <h1 className="font-[family-name:var(--font-display)] text-5xl leading-none tracking-wide sm:text-6xl">
            CORRA.
            <br />
            PERTENÇA.
          </h1>
          <p className="mt-4 text-lg text-neutral-200">
            Uma comunidade gratuita de corrida. Sem mensalidade, sem cobrança, sem exigir que você
            já saiba correr.
          </p>
          <Link
            href="/cidades"
            className="mt-6 inline-block rounded-full bg-[var(--cra-yellow)] px-8 py-4 text-base font-bold text-black"
          >
            Achar meu grupo →
          </Link>
        </div>
      </section>

      {/* Estatisticas — credibilidade em 1 linha, sem numero inventado */}
      <section className="border-y border-neutral-200 bg-white py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-2 px-4 text-center text-sm text-[var(--cra-ink-muted)]">
          <span>
            <strong className="text-[var(--cra-black)]">{stats?.member_count ?? 0}+</strong> cadastrados
          </span>
          <span>
            <strong className="text-[var(--cra-black)]">{stats?.city_count ?? cities?.length ?? 0}</strong> cidades
          </span>
          <span>Sem mensalidade</span>
        </div>
      </section>

      {/* Como funciona — seguranca */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--cra-black)]">
          COMO FUNCIONA
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--cra-gold)]">1</p>
            <p className="mt-1 font-semibold">Ache sua cidade</p>
            <p className="text-sm text-[var(--cra-ink-muted)]">Veja onde e quando o CRA se encontra perto de você.</p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--cra-gold)]">2</p>
            <p className="mt-1 font-semibold">Apareça num encontro</p>
            <p className="text-sm text-[var(--cra-ink-muted)]">
              Não precisa saber correr, nem se inscrever antes. É só aparecer.
            </p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--cra-gold)]">3</p>
            <p className="mt-1 font-semibold">Faça parte</p>
            <p className="text-sm text-[var(--cra-ink-muted)]">
              Comunidade de verdade — quem quiser, entra também no Desafio CRA.
            </p>
          </div>
        </div>
      </section>

      {/* Proximos encontros — facilidade */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--cra-black)]">
              PRÓXIMOS ENCONTROS
            </h2>
            <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
              {upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="min-w-[240px] rounded-2xl border border-neutral-200 bg-white p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--cra-gold)]">
                    {new Date(ev.start_at).toLocaleDateString("pt-BR", { weekday: "long" })}
                  </p>
                  <p className="mt-1 font-semibold">{ev.name}</p>
                  <p className="mt-1 text-sm text-[var(--cra-ink-muted)]">
                    {ev.location ?? ev.city} —{" "}
                    {new Date(ev.start_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
            </div>
            <Link href="/agenda" className="mt-4 inline-block text-sm font-semibold underline">
              Ver agenda completa →
            </Link>
          </div>
        </section>
      )}

      {/* Cidades */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--cra-black)]">
          NOSSAS CIDADES
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {(cities ?? []).map((c) => (
            <Link
              key={c.slug}
              href={`/cidades/${c.slug}`}
              className="rounded-xl border border-neutral-200 bg-white p-4 font-medium hover:border-[var(--cra-yellow)]"
            >
              {c.name}
              {c.state ? `, ${c.state}` : ""}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final — pertencimento */}
      <section className="cra-photo-placeholder px-4 py-16 text-center text-white">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide">
          AGORA É A SUA VEZ
        </h2>
        <Link
          href="/cidades"
          className="mt-5 inline-block rounded-full bg-[var(--cra-yellow)] px-8 py-4 text-base font-bold text-black"
        >
          Achar meu grupo →
        </Link>
      </section>
    </>
  );
}
