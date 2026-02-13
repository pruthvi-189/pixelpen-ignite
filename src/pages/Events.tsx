import AnimatedSection from "@/components/AnimatedSection";
import EventCard from "@/components/EventCard";

const events = [
  { title: "Role of AI/ML in Indian Startups", date: "6 March 2025", venue: "BTI Campus, Bangalore" },
  { title: "Artificial Intelligence Workshop", date: "6 March 2025", venue: "BTI Campus, Bangalore" },
  { title: "Side Hustles with AI", date: "13 May 2025", venue: "BTI Campus, Bangalore" },
  { title: "Ivy League Roadmap Session", date: "16 May 2025", venue: "BTI Campus, Bangalore" },
];

export default function Events() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Workshops & Events
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-6xl">
            Upcoming <span className="text-gradient-gold">Events</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Immersive, hands-on sessions designed to equip students with cutting-edge skills.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((event, i) => (
            <EventCard key={event.title + event.date} {...event} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
