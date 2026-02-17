import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  venue: string;
  index: number;
  isCompleted?: boolean;
}

export default function EventCard({ title, date, venue, index, isCompleted }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative overflow-hidden rounded-lg border border-gold/20 bg-card p-6 transition-shadow duration-500 hover:glow-gold ${
        isCompleted ? "opacity-60" : ""
      }`}
      style={{ background: "var(--gradient-card)" }}
    >
      {/* Gold accent line */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <h3 className="mb-4 font-display text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{venue}</span>
        </div>
      </div>
    </motion.div>
  );
}
