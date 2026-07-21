import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Desafio CRA — CRA",
  description: "Como funciona o Desafio CRA: pontuação, ranking e como participar.",
};

export default async function DesafiosPage() {
  const supabase = createClient();
  const { data: challenge } = await supabase
    .from("challenges")
    .select("name, start_date, end_date, award_date, registration_fee")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: activityTypes } = await supabase
    .from("activity_types")
    .select("name, default_points")
    .eq("active", true)
    .order("default_points", { ascending: false });

  return (
    <div>
      <div className="cra-photo-placeholder px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--cra-yellow)]">
            Opcional — pra quem quer competir
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl tracking-wide">
            {challenge?.name.toUpperCase() ?? "DESAFIO CRA"}
          </h1>
          {challenge && (
            <p className="mt-2 text-neutral-300">
              {new Date(challenge.start_date).toLocaleDateString("pt-BR")} até{" "}
              {new Date(challenge.end_date).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-14">
        <p className="text-[var(--cra-ink)]">
          O Desafio CRA é opcional — a comunidade continua 100% gratuita sem ele. É pra quem quer
          um jeito extra de se engajar: acumular pontos participando dos encontros e provas com a
          camisa e a equipe CRA, disputar o ranking, e concorrer a prêmios ao longo do ano.
        </p>

        {activityTypes && activityTypes.length > 0 && (
          <div className="mt-8">
            <p className="font-semibold text-[var(--cra-black)]">Como se pontua</p>
            <div className="mt-3 space-y-2">
              {activityTypes.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3"
                >
                  <span className="text-sm">{a.name}</span>
                  <span className="font-[family-name:var(--font-display)] text-lg text-[var(--cra-gold)]">
                    {a.default_points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {challenge && challenge.registration_fee > 0 && (
          <p className="mt-6 text-sm text-[var(--cra-ink-muted)]">
            Inscrição: R$ {Number(challenge.registration_fee).toFixed(2).replace(".", ",")} — confirmada
            direto no app, sem burocracia.
          </p>
        )}

        <a
          href="https://corre-cra.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-full bg-[var(--cra-yellow)] px-8 py-4 text-base font-bold text-black"
        >
          Entrar no Desafio →
        </a>
        <p className="mt-2 text-xs text-[var(--cra-ink-muted)]">
          Abre o app CorreCRA, onde você acompanha pontuação e ranking em tempo real.
        </p>

        <Link href="/cidades" className="mt-10 block text-sm font-semibold underline">
          Ou só quero correr, sem competir — achar meu grupo →
        </Link>
      </div>
    </div>
  );
}
