import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function CidadePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createClient();

  const { data: city } = await supabase
    .from("city_pages")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (!city) notFound();

  const { data: events } = await supabase
    .from("events")
    .select("id, name, start_at, location")
    .ilike("city", city.name)
    .in("status", ["scheduled", "checkin_open"])
    .gte("start_at", new Date().toISOString())
    .order("start_at", { ascending: true })
    .limit(6);

  return (
    <div>
      <div className="cra-photo-placeholder px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-wide">
            {city.name.toUpperCase()}
          </h1>
          {city.description && <p className="mt-3 max-w-md text-neutral-200">{city.description}</p>}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--cra-black)]">
          PRÓXIMOS ENCONTROS
        </h2>
        <div className="mt-4 space-y-3">
          {(events ?? []).map((ev) => (
            <div key={ev.id} className="rounded-xl border border-neutral-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--cra-gold)]">
                {new Date(ev.start_at).toLocaleDateString("pt-BR", { weekday: "long" })}
              </p>
              <p className="font-medium">{ev.name}</p>
              <p className="text-sm text-[var(--cra-ink-muted)]">
                {ev.location} —{" "}
                {new Date(ev.start_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          ))}
          {(events ?? []).length === 0 && (
            <p className="text-[var(--cra-ink-muted)]">Nenhum encontro agendado no momento.</p>
          )}
        </div>

        {city.whatsapp_link ? (
          <a
            href={city.whatsapp_link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block rounded-full bg-[var(--cra-yellow)] py-4 text-center text-base font-bold text-black"
          >
            Entrar no grupo do WhatsApp
          </a>
        ) : (
          <p className="mt-6 rounded-xl border border-dashed border-neutral-300 p-4 text-center text-sm text-[var(--cra-ink-muted)]">
            Link do grupo de {city.name} ainda não cadastrado.
          </p>
        )}
      </div>
    </div>
  );
}
