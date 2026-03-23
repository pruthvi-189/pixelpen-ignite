import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Plus, Pencil, Trash2 } from "lucide-react";

const Events = () => {

  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();

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

  // Split events into upcoming + completed
  const today = new Date();

  const upcomingEvents = events.filter(
    (event) => new Date(event.event_date) >= today
  );

  const completedEvents = events.filter(
    (event) => new Date(event.event_date) < today
  );

  return (

    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-display font-semibold">
          Events
        </h2>

      {/* Create Event Button */}
        <button
          onClick={() => navigate("/admin/events/create")}
          className="
            flex items-center gap-2
            px-8 py-3
            rounded-lg
            bg-primary
            text-black
            font-semibold
            transition-all duration-300
            hover:-translate-y-1
            hover:scale-[1.02]
            hover:shadow-[0_0_25px_rgba(255,215,0,0.45)]
          "
        >
          <Plus className="h-4 w-4" />
          Create Event
        </button>

      </div>


      {/* Upcoming Events */}
      <div className="mb-6">
        <h3 className="text-2xl font-display font-semibold text-foreground">
          Upcoming Events
        </h3>

        {/* Gold underline */}
        <div className="mt-2 h-[3px] w-16 rounded-full bg-primary"></div>
      </div>


      {/* Upcoming Events Grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {["Event 1", "Event 2", "Event 3", "Event 4"].map((title, index) => (

          <div
            key={index}
            className="
              group relative overflow-hidden rounded-lg
              border border-gold/20
              bg-card
              p-6
              transition-all duration-500
              hover:glow-gold hover:-translate-y-2 hover:scale-[1.02]
            "
            style={{ background: "var(--gradient-card)" }}
          >

            {/* Gold accent left strip */}
            <div className="
              absolute left-0 top-0 h-full w-[4px]
              bg-primary opacity-0
              transition-opacity duration-500
              group-hover:opacity-100
            " />

            {/* Event Title */}
            <div className="mb-4 flex items-start justify-between">
              <h3
                className="
                  font-display text-lg font-semibold
                  text-foreground transition-colors duration-300
                  group-hover:text-primary
                "
              >
                {title}
              </h3>

              <div className="flex items-center gap-3">

                <button className="text-primary hover:scale-110 transition">
                  <Pencil className="h-4 w-4" />
                </button>

                <button className="text-primary hover:scale-110 transition">
                  <Trash2 className="h-4 w-4" />
                </button>

              </div>

            </div>


            {/* Event Details */}
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Coming Soon</span>
              </div>


              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>BTI Campus, Bangalore</span>
              </div>

            </div>

          </div>

        ))}

      </div>


      {/* Completed Events */}
      <div className="mb-6 mt-12">
        <h3 className="text-2xl font-display font-semibold text-foreground">
          Completed Events
        </h3>

        {/* Gold underline */}
        <div className="mt-2 h-[3px] w-16 rounded-full bg-primary"></div>
      </div>


      {/* Completed Events Grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {[
          "Role of AI/ML in Indian Startups",
          "Artificial Intelligence Workshop",
          "Side Hustles with AI",
          "Ivy League Roadmap Session"
        ].map((title, index) => (

          <div
            key={index}
            className="
              group relative overflow-hidden rounded-lg
              border border-gold/20
              bg-card
              p-6
              transition-all duration-500
              hover:glow-gold hover:-translate-y-2 hover:scale-[1.02]
            "
            style={{ background: "var(--gradient-card)" }}
          >

            {/* Gold accent strip */}
            <div className="
              absolute left-0 top-0 h-full w-[4px]
              bg-primary opacity-0
              transition-opacity duration-500
              group-hover:opacity-100
            " />

            {/* Event Title */}
            <div className="mb-4 flex items-start justify-between">
              <h3
                className="
                  font-display text-lg font-semibold
                  text-foreground transition-colors duration-300
                  group-hover:text-primary
                "
              >
                {title}
              </h3>

              <div className="flex items-center gap-3">

                <button className="text-primary hover:scale-110 transition">
                  <Pencil className="h-4 w-4" />
                </button>

                <button className="text-primary hover:scale-110 transition">
                  <Trash2 className="h-4 w-4" />
                </button>

              </div>

            </div>

            {/* Event Details */}
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Completed</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>BTI Campus, Bangalore</span>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Events;