import { createClient } from "@/lib/supabase/server";

export default async function AgendaPage() {
  const supabase = createClient();
  const { data: events } = await supabase
    .from("events")
    .select("id, name, city, location, start_at, activity_types(name)")
    .in("status", ["scheduled", "checkin_open"])
    .gte("start_at", new Date().toISOString())
    .order("start_at", { ascending: true })
    .limit(30);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[var(--cra-black)]">
        AGENDA
      </h1>
      <p className="mt-2 text-[var(--cra-ink-muted)]">Corres semanais, treinões e eventos especiais.</p>

      <div className="mt-8 space-y-3">
        {(events ?? []).map((ev) => {
          const activity = Array.isArray(ev.activity_types) ? ev.activity_types[0] : ev.activity_types;
          return (
            <div key={ev.id} className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--cra-gold)]">
                  {new Date(ev.start_at).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </p>
                {activity?.name && (
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-[var(--cra-ink-muted)]">
                    {activity.name}
                  </span>
                )}
              </div>
              <p className="font-medium">{ev.name}</p>
              <p className="text-sm text-[var(--cra-ink-muted)]">
                {ev.location ?? ev.city} —{" "}
                {new Date(ev.start_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          );
        })}
        {(events ?? []).length === 0 && (
          <p className="text-center text-[var(--cra-ink-muted)]">Nenhum evento agendado no momento.</p>
        )}
      </div>
    </div>
  );
}
