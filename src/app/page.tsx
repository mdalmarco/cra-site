import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MapPin, Footprints, HandHeart, Medal } from "lucide-react";

export default async function HomePage() {
  const supabase = createClient();

  const [{ data: stats }, { data: cities }, { data: upcomingEvents }, { data: challenge }, { data: rankingRows }] =
    await Promise.all([
      supabase.from("public_community_stats").select("member_count, city_count, checkin_count").maybeSingle(),
      supabase.from("city_stats").select("slug, name, member_count").order("name"),
      supabase
        .from("events")
        .select("id, name, city, start_at, location")
        .in("status", ["scheduled", "checkin_open"])
        .gte("start_at", new Date().toISOString())
        .order("start_at", { ascending: true })
        .limit(3),
      supabase
        .from("challenges")
        .select("id, name, start_date, end_date")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase.from("ranking_view").select("city, total_points"),
    ]);

  // Progresso real do desafio (tempo decorrido), nao numero inventado
  let challengeProgress = 0;
  if (challenge) {
    const start = new Date(challenge.start_date).getTime();
    const end = new Date(challenge.end_date).getTime();
    const now = Date.now();
    challengeProgress = Math.min(100, Math.max(0, Math.round(((now - start) / (end - start)) * 100)));
  }

  const cityPoints = new Map<string, number>();
  for (const r of rankingRows ?? []) {
    if (!r.city) continue;
    cityPoints.set(r.city, (cityPoints.get(r.city) ?? 0) + Number(r.total_points ?? 0));
  }
  const leaderCity = Array.from(cityPoints.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <>
      {/* Hero — tela quase inteira, tom mais humano, CTA com desejo */}
      <section className="cra-photo-placeholder relative flex min-h-[92svh] items-end px-4 pb-14 pt-24 text-white sm:items-center sm:justify-center sm:text-center">
        <div className="max-w-xl">
          <h1 className="font-[family-name:var(--font-display)] text-5xl leading-none tracking-wide sm:text-6xl">
            CORRA.
            <br />
            PERTENÇA.
          </h1>
          <p className="mt-4 text-lg text-neutral-200">
            Toda semana, gente de todo tipo sai de casa pra correr junto. Você só precisa aparecer.
          </p>
          <Link
            href="/cidades"
            className="mt-6 inline-block rounded-full bg-[var(--cra-yellow)] px-8 py-4 text-base font-bold text-black transition-transform hover:scale-105"
          >
            Quero correr com o CRA →
          </Link>
        </div>
      </section>

      {/* Prova social — logo apos o hero, so numero real */}
      <section className="border-y border-neutral-200 bg-white py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-2 px-4 text-center text-sm text-[var(--cra-ink-muted)]">
          <span>
            <strong className="text-[var(--cra-black)]">{stats?.member_count ?? 0}+</strong> cadastrados
          </span>
          <span>
            <strong className="text-[var(--cra-black)]">{stats?.city_count ?? cities?.length ?? 0}</strong> cidades
          </span>
          <span>
            <strong className="text-[var(--cra-black)]">{stats?.checkin_count ?? 0}+</strong> treinos realizados
          </span>
          <span className="font-semibold text-[var(--cra-lime-ink)]">100% gratuito</span>
        </div>
      </section>

      {/* Desafio atual — gamificacao, dados reais */}
      {challenge && (
        <section className="mx-auto max-w-3xl px-4 py-10">
          <div className="cra-photo-placeholder rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--cra-yellow)]">
                Desafio atual
              </p>
              {leaderCity && (
                <span className="text-xs text-neutral-300">🏆 Cidade líder: {leaderCity}</span>
              )}
            </div>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl tracking-wide">
              {challenge.name}
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[var(--cra-yellow)]" style={{ width: `${challengeProgress}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-neutral-300">
              <span>{challengeProgress}% do período</span>
              <Link href="/desafios" className="underline">
                Ver detalhes →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Como funciona — icones, nao numero */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--cra-black)]">
          COMO FUNCIONA
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          <div>
            <MapPin className="h-8 w-8 text-[var(--cra-gold)]" />
            <p className="mt-2 font-semibold">Ache sua cidade</p>
            <p className="text-sm text-[var(--cra-ink-muted)]">Veja onde e quando o CRA se encontra perto de você.</p>
          </div>
          <div>
            <Footprints className="h-8 w-8 text-[var(--cra-gold)]" />
            <p className="mt-2 font-semibold">Apareça</p>
            <p className="text-sm text-[var(--cra-ink-muted)]">
              Não precisa saber correr, nem se inscrever antes.
            </p>
          </div>
          <div>
            <HandHeart className="h-8 w-8 text-[var(--cra-gold)]" />
            <p className="mt-2 font-semibold">Faça amigos</p>
            <p className="text-sm text-[var(--cra-ink-muted)]">Comunidade de verdade, ninguém corre sozinho.</p>
          </div>
        </div>
      </section>

      {/* Proximos encontros */}
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
                  className="min-w-[240px] rounded-2xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-md"
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

      {/* Cidades — com contagem real de membros */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[var(--cra-black)]">
          NOSSAS CIDADES
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {(cities ?? []).map((c) => (
            <Link
              key={c.slug}
              href={`/cidades/${c.slug}`}
              className="rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-[var(--cra-yellow)]"
            >
              <p className="flex items-center gap-1.5 font-medium">
                <MapPin className="h-4 w-4 text-[var(--cra-gold)]" /> {c.name}
              </p>
              {c.member_count > 0 && (
                <p className="mt-1 text-xs text-[var(--cra-ink-muted)]">{c.member_count} corredores</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="cra-photo-placeholder px-4 py-16 text-center text-white">
        <Medal className="mx-auto h-8 w-8 text-[var(--cra-yellow)]" />
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-wide">
          AGORA É A SUA VEZ
        </h2>
        <Link
          href="/cidades"
          className="mt-5 inline-block rounded-full bg-[var(--cra-yellow)] px-8 py-4 text-base font-bold text-black transition-transform hover:scale-105"
        >
          Quero correr com o CRA →
        </Link>
      </section>
    </>
  );
}
