import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Link, DollarSign, Monitor, Upload, ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EMPTY_FORM = {
  title: "",
  event_date: "",
  venue: "",
  location_url: "",
  mode: "offline" as "offline" | "online" | "hybrid",
  registration_fee: "",
  poster_url: "",
};

export default function CreateEventModal({ isOpen, onClose, onSuccess }: CreateEventModalProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePosterChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPosterFile(file);
    setPosterPreview(URL.createObjectURL(file));
  }

  function handleClear() {
    setForm({ ...EMPTY_FORM });
    setPosterFile(null);
    setPosterPreview("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handlePost() {
    setError("");
    if (!form.title.trim()) return setError("Event name is required.");
    if (!form.event_date) return setError("Event date is required.");
    if (!form.venue.trim()) return setError("Venue is required.");

    setLoading(true);

    try {
      let poster_url = form.poster_url;

      // Upload poster to Supabase Storage if a file was chosen
      if (posterFile) {
        const ext = posterFile.name.split(".").pop();
        const fileName = `event-posters/${Date.now()}.${ext}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("event-assets")
          .upload(fileName, posterFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("event-assets")
          .getPublicUrl(uploadData.path);

        poster_url = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from("events").insert([
        {
          title: form.title.trim(),
          event_date: form.event_date,
          venue: form.venue.trim(),
          location_url: form.location_url.trim() || null,
          mode: form.mode,
          registration_fee: form.registration_fee ? Number(form.registration_fee) : 0,
          poster_url: poster_url || null,
        },
      ]);

      if (insertError) throw insertError;

      onSuccess();
      handleClear();
      onClose();
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(6px)",
              zIndex: 50,
            }}
          />

          {/* Modal wrapper — flex centering so Framer Motion doesn't fight transform */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 51,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              pointerEvents: "none",
            }}
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            style={{
              pointerEvents: "auto",
              width: "100%",
              maxWidth: "640px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "1.25rem",
              background: "linear-gradient(145deg, hsl(28 30% 7%), hsl(28 36% 9%))",
              border: "1px solid hsl(42 48% 57% / 0.35)",
              boxShadow: "0 0 60px hsl(42 48% 57% / 0.15), 0 24px 64px rgba(0,0,0,0.6)",
            }}
          >
            {/* Glowing top stripe */}
            <div
              style={{
                height: "2px",
                background: "linear-gradient(90deg, transparent, hsl(42 48% 57%), hsl(42 60% 70%), hsl(42 48% 57%), transparent)",
                borderRadius: "1.25rem 1.25rem 0 0",
              }}
            />

            <div style={{ padding: "1.75rem 2rem" }}>
              {/* ── Header row ── */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
                <div>
                  <p style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "hsl(42 48% 57% / 0.7)", marginBottom: "0.25rem" }}>
                    Admin Console
                  </p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "hsl(var(--foreground))" }}>
                    Create New Event
                  </h2>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  title="Close"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "2.25rem",
                    width: "2.25rem",
                    borderRadius: "9999px",
                    border: "1px solid hsl(42 15% 18% / 0.7)",
                    background: "hsl(0 0% 100% / 0.04)",
                    color: "hsl(var(--muted-foreground))",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "hsl(42 48% 57% / 0.15)";
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(42 48% 57% / 0.5)";
                    (e.currentTarget as HTMLElement).style.color = "hsl(var(--primary))";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "hsl(0 0% 100% / 0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(42 15% 18% / 0.7)";
                    (e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))";
                  }}
                >
                  <X style={{ height: "1rem", width: "1rem" }} />
                </button>
              </div>

              {/* ── Form fields ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

                {/* Event Name */}
                <Field label="Event Name" icon={<Calendar style={{ height: "0.9rem", width: "0.9rem" }} />}>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. AI Bootcamp 2025"
                    style={inputStyle}
                  />
                </Field>

                {/* Date + Mode row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <Field label="Event Date" icon={<Calendar style={{ height: "0.9rem", width: "0.9rem" }} />}>
                    <input
                      name="event_date"
                      type="date"
                      value={form.event_date}
                      onChange={handleChange}
                      style={{ ...inputStyle, colorScheme: "dark" }}
                    />
                  </Field>
                  <Field label="Mode" icon={<Monitor style={{ height: "0.9rem", width: "0.9rem" }} />}>
                    <select name="mode" value={form.mode} onChange={handleChange} style={inputStyle}>
                      <option value="offline">Offline</option>
                      <option value="online">Online</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </Field>
                </div>

                {/* Venue */}
                <Field label="Venue / Location Name" icon={<MapPin style={{ height: "0.9rem", width: "0.9rem" }} />}>
                  <input
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    placeholder="e.g. BTI Campus, Bangalore"
                    style={inputStyle}
                  />
                </Field>

                {/* Google Maps URL */}
                <Field label="Google Maps Link (optional)" icon={<Link style={{ height: "0.9rem", width: "0.9rem" }} />}>
                  <input
                    name="location_url"
                    value={form.location_url}
                    onChange={handleChange}
                    placeholder="https://maps.google.com/..."
                    style={inputStyle}
                  />
                </Field>

                {/* Registration Fee */}
                <Field label="Registration Fee (₹)" icon={<DollarSign style={{ height: "0.9rem", width: "0.9rem" }} />}>
                  <input
                    name="registration_fee"
                    type="number"
                    min="0"
                    value={form.registration_fee}
                    onChange={handleChange}
                    placeholder="0 for free"
                    style={inputStyle}
                  />
                </Field>

                {/* Poster Upload */}
                <Field label="Event Poster" icon={<ImageIcon style={{ height: "0.9rem", width: "0.9rem" }} />}>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: posterFile ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    <Upload style={{ height: "0.9rem", width: "0.9rem", flexShrink: 0 }} />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {posterFile ? posterFile.name : "Click to upload poster image"}
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePosterChange}
                    style={{ display: "none" }}
                  />
                </Field>

                {/* Poster Preview */}
                {posterPreview && (
                  <div style={{ borderRadius: "0.75rem", overflow: "hidden", border: "1px solid hsl(42 48% 57% / 0.3)", maxHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(0 0% 4%)" }}>
                    <img
                      src={posterPreview}
                      alt="Poster preview"
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                  </div>
                )}

                {/* Error */}
                {error && (
                  <p style={{ fontSize: "0.8rem", color: "hsl(0 84% 65%)", background: "hsl(0 84% 60% / 0.1)", border: "1px solid hsl(0 84% 60% / 0.3)", borderRadius: "0.5rem", padding: "0.5rem 0.75rem" }}>
                    ⚠ {error}
                  </p>
                )}
              </div>

              {/* ── Action buttons ── */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
                {/* Clear */}
                <button
                  onClick={handleClear}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "0.7rem 1rem",
                    borderRadius: "0.6rem",
                    border: "1px solid hsl(42 15% 18% / 0.8)",
                    background: "transparent",
                    color: "hsl(var(--muted-foreground))",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(42 48% 57% / 0.4)";
                    (e.currentTarget as HTMLElement).style.color = "hsl(var(--foreground))";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(42 15% 18% / 0.8)";
                    (e.currentTarget as HTMLElement).style.color = "hsl(var(--muted-foreground))";
                  }}
                >
                  Clear
                </button>

                {/* Post */}
                <button
                  onClick={handlePost}
                  disabled={loading}
                  style={{
                    flex: 2,
                    padding: "0.7rem 1rem",
                    borderRadius: "0.6rem",
                    border: "none",
                    background: loading ? "hsl(42 30% 35%)" : "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.25s",
                    boxShadow: loading ? "none" : "0 0 20px hsl(42 48% 57% / 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 35px hsl(42 48% 57% / 0.55)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px hsl(42 48% 57% / 0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {loading ? "Posting…" : "✦  Post Event"}
                </button>
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Helpers ─────────────────────────────────────────────────
function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", fontWeight: 600, color: "hsl(42 48% 57% / 0.8)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.85rem",
  borderRadius: "0.55rem",
  border: "1px solid hsl(42 15% 18% / 0.8)",
  background: "hsl(0 0% 4% / 0.6)",
  color: "hsl(var(--foreground))",
  fontSize: "0.875rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};
