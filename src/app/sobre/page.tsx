import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o CRA — Corredores de Rua Anônimos",
  description: "A história do CRA: como nasceu em Blumenau e virou uma comunidade gratuita de corrida.",
};

export default function SobrePage() {
  return (
    <div>
      <div className="cra-photo-placeholder px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-wide">
            NOSSA HISTÓRIA
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-6 px-4 py-14 text-[var(--cra-ink)]">
        <p>
          O CRA — Corredores de Rua Anônimos — nasceu em Blumenau/SC como um grupo pequeno de gente
          que queria correr acompanhada. Sem assessoria, sem planilha, sem cobrança. Só a ideia
          simples de que correr é mais fácil e mais gostoso quando tem gente do seu lado.
        </p>
        <p>
          Com o tempo, os encontros semanais viraram rotina. A rotina virou comunidade. E a
          comunidade cresceu — hoje o CRA está em mais de uma cidade, sempre do mesmo jeito: aberto
          pra qualquer pessoa, independente do ritmo ou da experiência.
        </p>
        <p>
          O CRA não vende assessoria esportiva. Não vende planilha de treino. Não cobra mensalidade.
          O que existe é um compromisso simples: toda semana, em cada cidade, alguém vai estar lá
          esperando pra correr junto.
        </p>
        <div>
          <p className="font-semibold text-[var(--cra-black)]">O que a gente acredita</p>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-[var(--cra-ink-muted)]">
            <li>• Amizade</li>
            <li>• Acolhimento</li>
            <li>• Inclusão</li>
            <li>• Diversão</li>
            <li>• Saúde</li>
            <li>• Constância</li>
            <li>• Evolução</li>
            <li>• Pertencimento</li>
          </ul>
        </div>

        <Link
          href="/cidades"
          className="mt-6 inline-block rounded-full bg-[var(--cra-yellow)] px-8 py-4 text-base font-bold text-black"
        >
          Achar meu grupo →
        </Link>
      </div>
    </div>
  );
}
