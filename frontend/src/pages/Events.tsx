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
      </div>
    </div>
  );
}
