import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin, Plus, Pencil, Trash2, ExternalLink, IndianRupee, Monitor } from "lucide-react";
import CreateEventModal from "./CreateEventModal";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: false });

    if (error) {
      console.error("Error fetching events:", error);
      return;
    }
    setEvents(data || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
  };

  // Split events into upcoming + completed
  const today = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.event_date) >= today);
  const completedEvents = events.filter((e) => new Date(e.event_date) < today);

  return (
    <div className="p-6">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-display font-semibold">Events</h2>

        <button
          onClick={() => setShowModal(true)}
          className="
            flex items-center gap-2
            px-8 py-3 rounded-lg
            bg-primary text-black font-semibold
            transition-all duration-300
            hover:-translate-y-1 hover:scale-[1.02]
            hover:shadow-[0_0_25px_rgba(255,215,0,0.45)]
          "
        >
          <Plus className="h-4 w-4" />
          Create Event
        </button>
      </div>

      {/* ── Upcoming Events ── */}
      <SectionHeading title="Upcoming Events" />
      {upcomingEvents.length === 0 ? (
        <EmptyState label="No upcoming events yet." />
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {upcomingEvents.map((event) => (
            <AdminEventCard key={event.id} event={event} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* ── Completed Events ── */}
      <SectionHeading title="Completed Events" />
      {completedEvents.length === 0 ? (
        <EmptyState label="No completed events." />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {completedEvents.map((event) => (
            <AdminEventCard key={event.id} event={event} onDelete={handleDelete} isCompleted />
          ))}
        </div>
      )}

      {/* ── Create Event Modal ── */}
      <CreateEventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchEvents}
      />
    </div>
  );
};

// ── Admin Event Card ────────────────────────────────────────
function AdminEventCard({ event, onDelete, isCompleted }: { event: any; onDelete: (id: string) => void; isCompleted?: boolean }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-gold/20 p-0 transition-all duration-500 hover:glow-gold hover:-translate-y-1"
      style={{ background: "var(--gradient-card)", opacity: isCompleted ? 0.75 : 1 }}
    >
      {/* Poster thumbnail */}
      {event.poster_url && (
        <div style={{ height: "140px", overflow: "hidden", borderRadius: "0.75rem 0.75rem 0 0" }}>
          <img
            src={event.poster_url}
            alt={event.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      <div className="p-5">
        {/* Gold accent strip */}
        <div className="absolute left-0 top-0 h-full w-[4px] bg-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Title + actions */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary leading-snug">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            <button className="text-primary hover:scale-110 transition">
              <Pencil className="h-4 w-4" />
            </button>
            <button onClick={() => onDelete(event.id)} className="text-primary hover:scale-110 transition hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {event.mode && (
            <span style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", padding: "0.15rem 0.6rem", borderRadius: "9999px", background: "hsl(42 48% 57% / 0.1)", border: "1px solid hsl(42 48% 57% / 0.3)", color: "hsl(var(--primary))" }}>
              <Monitor style={{ display: "inline", height: "0.65rem", width: "0.65rem", marginRight: "0.25rem" }} />
              {event.mode}
            </span>
          )}
          {event.registration_fee !== undefined && (
            <span style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", padding: "0.15rem 0.6rem", borderRadius: "9999px", background: "hsl(42 48% 57% / 0.1)", border: "1px solid hsl(42 48% 57% / 0.3)", color: "hsl(var(--primary))" }}>
              ₹{event.registration_fee === 0 ? "Free" : event.registration_fee}
            </span>
          )}
        </div>

        {/* Date + Location */}
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <span>
              {event.event_date
                ? new Date(event.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                : isCompleted ? "Completed" : "Coming Soon"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            {event.location_url ? (
              <a
                href={event.location_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                {event.venue}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span>{event.venue}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-display font-semibold text-foreground">{title}</h3>
      <div className="mt-2 h-[3px] w-16 rounded-full bg-primary" />
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <p className="text-muted-foreground text-sm mb-10">{label}</p>
  );
}

export default Events;