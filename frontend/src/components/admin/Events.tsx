import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);

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

  return (
    <div className="admin-page">

      <h2>Events</h2>

      <table className="admin-table">

        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Attendance</th>
          </tr>
        </thead>

        <tbody>

          {events.map((event) => (
            <tr key={event.id}>

              <td>{event.title}</td>

              <td>{event.event_date}</td>

              <td>{event.status}</td>

              <td>{event.attendance}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Events;