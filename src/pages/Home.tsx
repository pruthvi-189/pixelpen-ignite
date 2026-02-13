import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Wrench, Users, Rocket } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import logo from "@/assets/new logo for startup.png";

const HeroScene = lazy(() => import("@/components/HeroScene"));

const features = [
  { icon: Brain, title: "AI & ML Workshops", desc: "Deep-dive into artificial intelligence and machine learning with industry practitioners." },
  { icon: Wrench, title: "Hands-On Training", desc: "Build real projects with modern tools and frameworks used by top startups." },
  { icon: Users, title: "Industry Expert Sessions", desc: "Learn directly from founders, engineers, and leaders shaping the tech landscape." },
  { icon: Rocket, title: "Career & Skill Development", desc: "Accelerate your career with portfolio-worthy projects and professional mentoring." },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/80 to-background" />

        <motion.div
          className="relative z-10 flex flex-col items-center px-6 text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={logo}
            alt="PixelPen Logo"
            className="mb-8 h-24 w-24 animate-float"
            variants={fadeUp}
          />
          <motion.h1
            className="mb-6 max-w-3xl font-display text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl"
            variants={fadeUp}
          >
            Empowering Students Through{" "}
            <span className="text-gradient-gold">Hands-On Tech & AI</span>{" "}
            Education
          </motion.h1>
          <motion.p
            className="mb-10 max-w-xl text-lg text-muted-foreground"
            variants={fadeUp}
          >
            PixelPen bridges the gap between academic learning and industry-ready skills.
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-4" variants={fadeUp}>
            <Link
              to="/events"
              className="group relative overflow-hidden rounded-lg bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:glow-gold-intense"
            >
              <span className="relative z-10">Explore Workshops</span>
            </Link>
            <Link
              to="/about"
              className="rounded-lg border border-gold/30 px-8 py-3 font-body text-sm font-medium text-foreground transition-all duration-300 hover:border-gold/60 hover:glow-gold"
            >
              About PixelPen
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              What We Do
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
              Building Tomorrow's <span className="text-gradient-gold">Tech Leaders</span>
            </h2>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group h-full rounded-lg border border-gold/15 bg-card p-8 transition-shadow duration-500 hover:glow-gold"
                  style={{ background: "var(--gradient-card)" }}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 font-display text-lg font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
