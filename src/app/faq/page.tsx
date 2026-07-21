import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Perguntas frequentes — CRA",
  description: "Tudo que você precisa saber antes de aparecer num encontro do CRA.",
};

const faqs = [
  { q: "O que é o CRA?", a: "Corredores de Rua Anônimos é uma comunidade gratuita de corrida, nascida em Blumenau/SC. Não é assessoria, não vende planilha, não tem mensalidade." },
  { q: "Preciso saber correr pra participar?", a: "Não. O CRA recebe desde quem nunca correu até quem já fez maratona. Cada um no seu ritmo." },
  { q: "Quanto custa participar do CRA?", a: "Nada. Os encontros semanais e treinões são 100% gratuitos. Só o Desafio CRA (opcional, pra quem quer competir e acumular pontos) tem uma taxa simbólica." },
  { q: "Onde o CRA corre?", a: "Hoje em Blumenau e Indaial/SC, com encontros toda semana. Veja o dia e horário na página de cada cidade." },
  { q: "Preciso me inscrever antes de ir?", a: "Não. É só aparecer no horário do encontro da sua cidade." },
  { q: "Como funciona o Desafio CRA?", a: "É um sistema de pontos opcional pra quem participa dos encontros e provas usando a camisa/equipe CRA. Tem ranking, conquistas e prêmios ao longo do ano." },
  { q: "Quem pode participar?", a: "Qualquer pessoa — iniciantes, intermediários, experientes, famílias. Não existe exigência de nível." },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--cra-black)]">
        PERGUNTAS FREQUENTES
      </h1>

      <div className="mt-8 space-y-6">
        {faqs.map((f) => (
          <div key={f.q} className="border-b border-neutral-200 pb-6">
            <p className="font-semibold text-[var(--cra-black)]">{f.q}</p>
            <p className="mt-1 text-sm text-[var(--cra-ink-muted)]">{f.a}</p>
          </div>
        ))}
      </div>

      <Link
        href="/cidades"
        className="mt-10 inline-block rounded-full bg-[var(--cra-yellow)] px-8 py-4 text-base font-bold text-black"
      >
        Achar meu grupo →
      </Link>

      {/* FAQPage schema — AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}
