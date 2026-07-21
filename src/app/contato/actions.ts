"use server";

import { createClient } from "@/lib/supabase/server";

export async function sendContactMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Preencha nome, e-mail e mensagem." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    subject: subject || null,
    message,
  });

  if (error) return { error: "Não foi possível enviar. Tenta de novo em instantes." };
  return { success: true };
}
