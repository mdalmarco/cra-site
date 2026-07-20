import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Site publico, sem autenticacao de usuario — usa a mesma base do CorreCRA
// (somente leitura de dados publicos: events, challenges, city_pages).
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
