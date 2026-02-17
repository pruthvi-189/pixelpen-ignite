import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const highlights = [
  "Incubated at BTI Ignite Incubation Council",
  "Founded on 3rd January 2025",
  "AI/ML focused curriculum",
  "Industry-driven skill development",
  "Student-first approach",
];

/* ============================= */
/* 🔥 MAGNETIC 3D CARD COMPONENT */
/* ============================= */
function MagneticCard({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [hovered, setHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;

    const centerX = card.width / 2;
    const centerY = card.height / 2;

    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;

    const moveX = (x - centerX) / 15;
    const moveY = (y - centerY) / 15;

    setRotate({ x: rotateX, y: rotateY });
    setPosition({ x: moveX, y: moveY });
  };

  const reset = () => {
    setRotate({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onMouseEnter={() => setHovered(true)}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 15,
      }}
      className="relative flex items-center gap-4 rounded-lg border border-gold/15 bg-card p-4 shadow-lg"
      style={{
        transformStyle: "preserve-3d",
        background: "var(--gradient-card)",
      }}
    >
      {/* GOLD GLOW BACKGROUND */}
      <motion.div
        className="absolute -inset-2 rounded-xl blur-2xl"
        animate={{
          opacity: hovered ? 0.6 : 0.3,
          scale: hovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(212,175,55,0.6), rgba(212,175,55,0.15), transparent 70%)",
          zIndex: -1,
        }}
      />

      {/* Floating motion */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="absolute inset-0 rounded-lg"
      />

      <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
      <span className="font-body text-sm text-foreground">
        {children}
      </span>
    </motion.div>
  );
}

/* ============================= */
/* ⌨️ TYPING TEXT COMPONENT */
/* ============================= */
function TypingText({
  text,
  speed = 20,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <p className={className}>{displayedText}</p>;
}

/* ============================= */
/* 🚀 ABOUT PAGE */
/* ============================= */
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
          
          {/* LEFT CONTENT WITH TYPING */}
          <AnimatedSection direction="left">
            <TypingText
              className="mb-6 text-lg leading-relaxed text-muted-foreground"
              text="PixelPen is an EdTech startup incubated at the BTI Ignite Incubation Council at Bangalore Technological Institute on 3rd January 2025."
            />

            <TypingText
              className="mb-6 text-lg leading-relaxed text-muted-foreground"
              text="We focus on delivering hands-on workshops, AI/ML education, and industry-driven skill development programs designed for undergraduate students who want to stay ahead of the curve."
            />

            <TypingText
              className="text-lg leading-relaxed text-muted-foreground"
              text="Our mission is to bridge the gap between theoretical knowledge and practical, real-world skills — empowering the next generation of tech innovators and entrepreneurs."
            />
          </AnimatedSection>

          {/* RIGHT SIDE CARDS */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              {highlights.map((item, i) => (
                <MagneticCard key={item} delay={i * 0.2}>
                  {item}
                </MagneticCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
