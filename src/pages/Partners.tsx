import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const partners = [
  { name: "Bangalore Technological Institute", short: "BTI" },
  { name: "BTI Ignite Incubation Council", short: "Ignite" },
];

export default function Partners() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Our Partners
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-6xl">
            Backed by <span className="text-gradient-gold">Excellence</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Proudly incubated and supported by leading institutions in Bangalore's innovation ecosystem.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2">
          {partners.map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                className="flex flex-col items-center rounded-xl border border-gold/20 p-10 text-center transition-shadow duration-500 hover:glow-gold"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-primary/10">
                  <span className="font-display text-2xl font-bold text-primary">
                    {p.short}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                  {p.name}
                </h3>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-20 text-center" delay={0.3}>
          <div className="glass mx-auto max-w-2xl rounded-xl p-8">
            <p className="font-display text-lg text-foreground">
              "PixelPen is incubated at the{" "}
              <span className="text-primary font-semibold">
                BTI Ignite Incubation Council
              </span>
              , part of Bangalore Technological Institute's innovation
              ecosystem."
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
