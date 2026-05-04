import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import EventCard from "@/components/EventCard";

const events = [
  { title: "Role of AI/ML in Indian Startups", date: "6 March 2025", venue: "BTI Campus, Bangalore" },
  { title: "Artificial Intelligence Workshop", date: "6 March 2025", venue: "BTI Campus, Bangalore" },
  { title: "Side Hustles with AI", date: "13 May 2025", venue: "BTI Campus, Bangalore" },
  { title: "Ivy League Roadmap Session", date: "16 May 2025", venue: "BTI Campus, Bangalore" },
];

export default function Events() {
  const today = new Date();

  // Convert string date into actual Date object
  const parseDate = (dateString: string) => {
    return new Date(dateString);
  };

  const completedEvents = events.filter(
    (event) => parseDate(event.date) < today
  );

  const upcomingEvents = events.filter(
    (event) => parseDate(event.date) >= today
  );

  // ── 3-D tilt for the teaser card ──
  const teaserRef = useRef<HTMLDivElement>(null);
  const rawTX = useMotionValue(0);
  const rawTY = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 18, mass: 0.6 };
  const tX = useSpring(rawTX, springCfg);
  const tY = useSpring(rawTY, springCfg);
  const tRotateX = useTransform(tY, [-0.5, 0.5], [10, -10]);
  const tRotateY = useTransform(tX, [-0.5, 0.5], [-10, 10]);
  const tScale   = useSpring(1, { stiffness: 220, damping: 22 });
  const tShineX  = useTransform(tX, [-0.5, 0.5], ["0%", "100%"]);
  const tShineY  = useTransform(tY, [-0.5, 0.5], ["0%", "100%"]);

  function handleTeaserMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = teaserRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawTX.set((e.clientX - left) / width - 0.5);
    rawTY.set((e.clientY - top) / height - 0.5);
    tScale.set(1.02);
  }

  function handleTeaserLeave() {
    rawTX.set(0);
    rawTY.set(0);
    tScale.set(1);
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* ================= Header ================= */}
        <AnimatedSection className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Workshops & Events
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-6xl">
            PixelPen <span className="text-gradient-gold">Events</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Immersive, hands-on sessions designed to equip students with cutting-edge skills.
          </p>
        </AnimatedSection>

        {/* ================= Upcoming Events ================= */}
        {upcomingEvents.length > 0 && (
          <>
            <AnimatedSection className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                Upcoming Events
              </h2>
              <div className="mt-2 h-1 w-16 bg-primary rounded-full" />
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2 mb-20">
              {upcomingEvents.map((event, i) => (
                <EventCard
                  key={event.title + event.date}
                  {...event}
                  index={i}
                />
              ))}
            </div>
          </>
        )}

        {/* ================= Completed Events ================= */}
        {completedEvents.length > 0 && (
          <>
            <AnimatedSection className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                Completed Events
              </h2>
              <div className="mt-2 h-1 w-16 bg-primary/70 rounded-full" />
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2">
              {completedEvents.map((event, i) => (
                <EventCard
                  key={event.title + event.date}
                  {...event}
                  index={i}
                  isCompleted
                />
              ))}
            </div>
          </>
        )}
        {/* ================= More Events Teaser ================= */}
        <AnimatedSection className="mt-24">
          <style>{`
            @keyframes borderGlow {
              0%, 100% { box-shadow: 0 0 18px 2px rgba(212,175,55,0.25), inset 0 0 30px rgba(212,175,55,0.04); }
              50%       { box-shadow: 0 0 38px 8px rgba(212,175,55,0.50), inset 0 0 50px rgba(212,175,55,0.10); }
            }
            @keyframes pulseDot {
              0%, 100% { opacity: 1; transform: scale(1); }
              50%       { opacity: 0.4; transform: scale(1.6); }
            }
            @keyframes shimmer {
              0%   { background-position: -200% center; }
              100% { background-position:  200% center; }
            }
            .events-teaser-heading {
              background: linear-gradient(90deg, #d4af37 0%, #fff8dc 40%, #d4af37 60%, #a07d20 100%);
              background-size: 200% auto;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: shimmer 4s linear infinite;
            }
            .events-teaser-dot {
              animation: pulseDot 1.5s ease-in-out infinite;
            }
          `}</style>

          <motion.div
            ref={teaserRef}
            onMouseMove={handleTeaserMove}
            onMouseLeave={handleTeaserLeave}
            style={{
              rotateX: tRotateX,
              rotateY: tRotateY,
              scale: tScale,
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
              willChange: "transform",
              position: "relative",
              width: "100%",
              overflow: "hidden",
              borderRadius: "1rem",
              border: "1px solid hsl(42 48% 57% / 0.4)",
              padding: "3rem 2rem",
              textAlign: "center",
              background: "linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(28 36% 7%) 50%, hsl(0 0% 5%) 100%)",
              animation: "borderGlow 3s ease-in-out infinite",
              cursor: "default",
            }}
          >
            {/* Corner accents */}
            <span className="pointer-events-none absolute left-0 top-0 h-12 w-12 rounded-br-none rounded-tl-2xl border-l-2 border-t-2 border-primary/60" />
            <span className="pointer-events-none absolute right-0 top-0 h-12 w-12 rounded-bl-none rounded-tr-2xl border-r-2 border-t-2 border-primary/60" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 rounded-br-none rounded-tl-none rounded-bl-2xl border-b-2 border-l-2 border-primary/60" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 rounded-br-2xl border-b-2 border-r-2 border-primary/60" />

            {/* Cursor-following spotlight */}
            <motion.span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                pointerEvents: "none",
                background: useTransform(
                  [tShineX, tShineY],
                  ([sx, sy]) =>
                    `radial-gradient(circle at ${sx} ${sy}, hsl(42 48% 57% / 0.1) 0%, transparent 60%)`
                ),
              }}
            />

            {/* Live indicator */}
            <div className="mb-5 flex items-center justify-center gap-2" style={{ position: "relative", zIndex: 1 }}>
              <span
                className="events-teaser-dot inline-block h-2.5 w-2.5 rounded-full bg-primary"
                style={{ boxShadow: "0 0 8px 2px rgba(212,175,55,0.7)" }}
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                Coming Soon
              </span>
            </div>

            {/* Headline — floats forward in Z */}
            <h2
              className="events-teaser-heading mb-4 text-3xl font-bold md:text-4xl"
              style={{ transform: "translateZ(24px)", position: "relative", zIndex: 1 }}
            >
              More Events Are on Their Way
            </h2>

            {/* Sub-text */}
            <p
              className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base"
              style={{ transform: "translateZ(12px)", position: "relative", zIndex: 1 }}
            >
              Bigger workshops, exclusive masterclasses, and hands-on sessions are being crafted
              for you. Keep an eye out — you won&apos;t want to miss what&apos;s next.
            </p>

            {/* Decorative bottom rule */}
            <div
              className="mt-8 flex items-center justify-center gap-3 opacity-40"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="h-px w-16 bg-primary" />
              <span className="text-primary text-lg">✦</span>
              <div className="h-px w-16 bg-primary" />
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
}
