import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contato — CRA",
  description: "Fale com o CRA — parceiros, organizadores ou dúvidas gerais.",
};

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--cra-black)]">
        CONTATO
      </h1>
      <p className="mt-2 text-[var(--cra-ink-muted)]">
        Parceria, dúvida, ou só quer dizer oi — manda mensagem.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
