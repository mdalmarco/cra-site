"use client";

import { useState, useTransition } from "react";
import { sendContactMessage } from "./actions";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ error?: string; success?: boolean } | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await sendContactMessage(formData);
      setResult(res);
      if (res.success) (e.target as HTMLFormElement).reset();
    });
  }

  if (result?.success) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
        <p className="font-semibold text-[var(--cra-black)]">Mensagem enviada!</p>
        <p className="mt-1 text-sm text-[var(--cra-ink-muted)]">A gente responde assim que possível.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-[var(--cra-black)]">Nome</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-base"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-[var(--cra-black)]">E-mail</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-base"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-[var(--cra-black)]">Mensagem</label>
        <textarea
          name="message"
          required
          rows={4}
          className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-base"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-[var(--cra-yellow)] py-4 text-base font-bold text-black disabled:opacity-50"
      >
        {isPending ? "Enviando..." : "Enviar mensagem"}
      </button>
      {result?.error && <p className="text-sm text-red-600">{result.error}</p>}
    </form>
  );
}
