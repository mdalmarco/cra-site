import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Como participar — CRA",
  description: "Não precisa saber correr nem pagar nada. Veja como aparecer no seu primeiro encontro do CRA.",
};

const faqs = [
  {
    q: "Preciso saber correr pra participar?",
    a: "Não. O CRA recebe desde quem nunca correu até quem já fez maratona. Você vai no seu ritmo.",
  },
  {
    q: "Preciso pagar alguma coisa?",
    a: "Não. O CRA é uma comunidade gratuita, sem mensalidade. O único custo opcional é a inscrição no Desafio CRA, pra quem quiser competir e acumular pontos.",
  },
  {
    q: "Preciso me inscrever antes de ir?",
    a: "Não. É só aparecer no dia e horário do encontro da sua cidade.",
  },
  {
    q: "E se eu não conseguir acompanhar o ritmo do grupo?",
    a: "Os encontros do CRA não são treino de performance — cada um corre no seu ritmo, e sempre tem gente pra fazer companhia.",
  },
];

export default function ComoParticiparPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--cra-black)]">
        COMO PARTICIPAR
      </h1>
      <p className="mt-3 text-[var(--cra-ink-muted)]">
        O CRA nasceu em Blumenau como uma comunidade gratuita de corrida — sem assessoria, sem
        planilha, sem mensalidade. Qualquer pessoa pode participar, do jeito que estiver.
      </p>

      <div className="mt-10 space-y-6">
        {faqs.map((f) => (
          <div key={f.q}>
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
    </div>
  );
}
