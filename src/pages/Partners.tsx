import btiLogo from "@/assets/bti.avif";
import igniteLogo from "@/assets/ignite.jpeg";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const partners = [
  {
    name: "Bangalore Technological Institute",
    logo: btiLogo,
    description:
      "Bangalore Technological Institute (BTI) has been the foundational pillar behind PixelPen’s journey. As a premier institution fostering academic excellence and innovation, BTI provides a dynamic ecosystem that encourages research, entrepreneurship, and technological advancement. Its continuous academic and infrastructural support has played a vital role in shaping our vision into reality.",
  },
  {
    name: "BTI Ignite Incubation Council",
    logo: igniteLogo,
    description:
      "BTI Ignite Incubation Council has been instrumental in guiding PixelPen from concept to execution. As the official incubation center of BTI, Ignite offers structured mentorship, startup strategy support, networking opportunities, and entrepreneurial guidance. Their continuous support empowered us to build, validate, and scale our startup with confidence.",
  },
];

export default function Partners() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Section Header */}
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

        {/* Partner Cards */}
        <div className="grid gap-10 sm:grid-cols-2 items-stretch">
          {partners.map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ scale: 1.03, y: -6 }}
                className="group relative flex h-full flex-col items-center rounded-xl border border-gold/20 p-10 text-center transition-all duration-300 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)]"
                style={{
                  background: "var(--gradient-card)",
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  const rotateX = ((y - centerY) / centerY) * 12;
                  const rotateY = ((x - centerX) / centerX) * -12;

                  e.currentTarget.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.03)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
                }}
              >
                {/* Logo */}
                <div className="mb-6 mt-6 h-24 w-24 overflow-hidden rounded-full border border-gold/30">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Partner Name */}
                <h3 className="mb-4 font-display text-xl font-semibold text-foreground text-center">
                  {p.name}
                </h3>

                {/* Description */}
                <p className="px-4 pb-4 text-sm leading-7 text-muted-foreground text-justify flex-grow">
                  {p.description}
                </p>

              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Quote Section */}
        <AnimatedSection className="mt-20 text-center" delay={0.3}>
          <div className="glass mx-auto max-w-2xl rounded-xl p-8">
            <p className="font-display text-lg text-foreground">
              "PixelPen is incubated at the{" "}
              <span className="text-primary font-semibold">
                BTI Ignite Incubation Council
              </span>
              , part of Bangalore Technological Institute's innovation ecosystem."
            </p>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
