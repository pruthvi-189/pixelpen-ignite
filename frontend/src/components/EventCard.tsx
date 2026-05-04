import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, ArrowRight, ExternalLink } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  venue: string;
  index: number;
  isCompleted?: boolean;
  poster_url?: string;
  location_url?: string;
  registration_fee?: number;
  mode?: string;
}

export default function EventCard({ title, date, venue, index, isCompleted, poster_url, location_url, registration_fee, mode }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw mouse position values (–0.5 → +0.5 relative to card center)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed values for buttery motion
  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  // Map mouse position → tilt degrees (max ±14°)
  const rotateX = useTransform(y, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-14, 14]);

  // Subtle scale-up when hovering
  const scale = useSpring(1, { stiffness: 250, damping: 22 });

  // Spotlight "shine" that follows the cursor
  const shineX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
    scale.set(1.03);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        /* Glassmorphic card */
        background: isCompleted
          ? "hsl(28 30% 7% / 0.45)"
          : "hsl(28 30% 9% / 0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid hsl(42 15% 18% / 0.6)",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
        opacity: isCompleted ? 0.75 : 1,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {/* ── Poster image ── */}
      {poster_url && (
        <div
          style={{
            margin: "-1.5rem -1.5rem 1.25rem -1.5rem",
            height: "160px",
            overflow: "hidden",
            borderRadius: "1rem 1rem 0 0",
          }}
        >
          <img
            src={poster_url}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* ── Glowing top border stripe ── */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: "2px",
          borderRadius: "1rem 1rem 0 0",
          background: isCompleted
            ? "linear-gradient(90deg, transparent, hsl(42 15% 35% / 0.4), transparent)"
            : "linear-gradient(90deg, transparent, hsl(42 48% 57%), hsl(42 60% 70%), hsl(42 48% 57%), transparent)",
        }}
      />

      {/* ── Cursor-following spotlight shine ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${shineX.get()} ${shineY.get()}, hsl(42 48% 57% / 0.08) 0%, transparent 65%)`,
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
        // Re-render on every frame so the shine actually tracks
        animate={{}}
      >
        {/* inner motion value subscriber — forces re-render */}
        <motion.span
          style={{
            position: "absolute",
            inset: 0,
            background: useTransform(
              [shineX, shineY],
              ([sx, sy]) =>
                `radial-gradient(circle at ${sx} ${sy}, hsl(42 48% 57% / 0.09) 0%, transparent 65%)`
            ),
            borderRadius: "inherit",
          }}
        />
      </motion.div>

      {/* ── Top row: index badge + status pill ── */}
      <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "1.75rem",
            width: "1.75rem",
            borderRadius: "9999px",
            fontSize: "0.7rem",
            fontWeight: 700,
            background: "hsl(42 48% 57% / 0.1)",
            border: "1px solid hsl(42 48% 57% / 0.3)",
            color: "hsl(var(--primary))",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {isCompleted ? (
          <span
            style={{
              fontSize: "0.625rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              padding: "0.15rem 0.75rem",
              borderRadius: "9999px",
              background: "hsl(0 0% 100% / 0.05)",
              border: "1px solid hsl(0 0% 100% / 0.1)",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            Completed
          </span>
        ) : (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.625rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              padding: "0.15rem 0.75rem",
              borderRadius: "9999px",
              background: "hsl(42 48% 57% / 0.1)",
              border: "1px solid hsl(42 48% 57% / 0.3)",
              color: "hsl(var(--primary))",
            }}
          >
            <span
              style={{
                display: "inline-block",
                height: "0.375rem",
                width: "0.375rem",
                borderRadius: "9999px",
                background: "hsl(var(--primary))",
                boxShadow: "0 0 5px hsl(42 48% 57% / 0.8)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            Upcoming
          </span>
        )}
      </div>

      {/* ── Mode + fee pills ── */}
      {(mode || registration_fee !== undefined) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem", position: "relative", zIndex: 1 }}>
          {mode && (
            <span style={{ fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", padding: "0.12rem 0.55rem", borderRadius: "9999px", background: "hsl(42 48% 57% / 0.08)", border: "1px solid hsl(42 48% 57% / 0.25)", color: "hsl(var(--primary))" }}>
              {mode}
            </span>
          )}
          {registration_fee !== undefined && (
            <span style={{ fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", padding: "0.12rem 0.55rem", borderRadius: "9999px", background: "hsl(42 48% 57% / 0.08)", border: "1px solid hsl(42 48% 57% / 0.25)", color: "hsl(var(--primary))" }}>
              {registration_fee === 0 ? "Free" : `₹${registration_fee}`}
            </span>
          )}
        </div>
      )}

      {/* ── Title (pushed slightly forward in Z for depth) ── */}
      <h3
        style={{
          marginBottom: "1.25rem",
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          fontWeight: 700,
          lineHeight: 1.35,
          color: isCompleted ? "hsl(var(--foreground) / 0.5)" : "hsl(var(--foreground))",
          transform: "translateZ(20px)",
          transition: "color 0.3s",
          position: "relative",
          zIndex: 1,
        }}
      >
        {title}
      </h3>

      {/* ── Divider ── */}
      <div
        style={{
          marginBottom: "1rem",
          height: "1px",
          background: "linear-gradient(to right, hsl(42 48% 57% / 0.25), transparent)",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* ── Meta info ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
          <Calendar
            style={{
              height: "1rem",
              width: "1rem",
              flexShrink: 0,
              color: isCompleted ? "hsl(var(--muted-foreground))" : "hsl(var(--primary))",
            }}
          />
          <span style={{ opacity: isCompleted ? 0.5 : 1 }}>{date}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
          <MapPin
            style={{
              height: "1rem",
              width: "1rem",
              flexShrink: 0,
              color: isCompleted ? "hsl(var(--muted-foreground))" : "hsl(var(--primary))",
            }}
          />
          {location_url ? (
            <a
              href={location_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                opacity: isCompleted ? 0.5 : 1,
                color: "hsl(var(--primary))",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              {venue}
              <ExternalLink style={{ height: "0.7rem", width: "0.7rem" }} />
            </a>
          ) : (
            <span style={{ opacity: isCompleted ? 0.5 : 1 }}>{venue}</span>
          )}
        </div>
      </div>

      {/* ── CTA arrow — upcoming only ── */}
      {!isCompleted && (
        <div
          style={{
            marginTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "hsl(42 48% 57% / 0.55)",
            position: "relative",
            zIndex: 1,
            transition: "color 0.3s",
          }}
        >
          <span>View details</span>
          <ArrowRight style={{ height: "0.75rem", width: "0.75rem" }} />
        </div>
      )}
    </motion.div>
  );
}
