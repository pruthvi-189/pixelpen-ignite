import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const highlights = [
  "Incubated at BTI Ignite Incubation Council",
  "Founded on 3rd January 2025",
  "AI/ML focused curriculum",
  "Industry-driven skill development",
  "Student-first approach",
];

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Our Story
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-6xl">
            About <span className="text-gradient-gold">PixelPen</span>
          </h1>
        </AnimatedSection>

        <div className="grid items-start gap-16 md:grid-cols-2">
          <AnimatedSection direction="left">
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              <span className="text-foreground font-semibold">PixelPen</span> is an EdTech startup
              incubated at the{" "}
              <span className="text-primary font-medium">
                BTI Ignite Incubation Council
              </span>{" "}
              at Bangalore Technological Institute on 3rd January 2025.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              We focus on delivering hands-on workshops, AI/ML education, and
              industry-driven skill development programs designed for
              undergraduate students who want to stay ahead of the curve.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Our mission is to bridge the gap between theoretical knowledge and
              practical, real-world skills — empowering the next generation of
              tech innovators and entrepreneurs.
            </p>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="space-y-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4 rounded-lg border border-gold/15 bg-card p-4"
                  style={{ background: "var(--gradient-card)" }}
                >
                  <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="font-body text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
