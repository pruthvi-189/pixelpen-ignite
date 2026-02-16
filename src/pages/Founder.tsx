 import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import founderImg from "@/assets/founder.jpg";
import { Mail, Linkedin, Instagram, Globe } from "lucide-react";

export default function Founder() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Leadership
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-6xl">
            Meet the <span className="text-gradient-gold">Founder</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-gold/20 p-10 text-center glow-gold"
            style={{ background: "var(--gradient-card)" }}
          >
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 h-40 w-40 overflow-hidden rounded-full border-2 border-gold/40 animate-pulse-gold"
            >
              <img
                src={founderImg}
                alt="Pruthvi Narayana Reddy"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Name */}
            <h2 className="mb-1 font-display text-2xl font-bold text-foreground">
              Pruthvi Narayana Reddy
            </h2>

            {/* Role */}
            <p className="mb-6 text-sm font-medium text-primary">
              Founder & CEO, PixelPen
            </p>

            {/* Description */}
            <p className="mb-8 max-w-md text-muted-foreground leading-relaxed">
              An undergraduate student specializing in AI & Machine Learning,
              Pruthvi is an EdTech visionary, speaker, and workshop organizer
              passionate about empowering students with industry-ready skills and
              real-world tech experience.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-6">
              {/* Email */}
              <a
                href="mailto:pruthvinarayanareddy@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full border border-gold/30 p-3 transition-all duration-300 hover:scale-110 hover:bg-gold/10"
              >
                <Mail className="h-5 w-5 text-primary transition group-hover:text-gold" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/pruthvi-narayana-reddy"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full border border-gold/30 p-3 transition-all duration-300 hover:scale-110 hover:bg-gold/10"
              >
                <Linkedin className="h-5 w-5 text-primary transition group-hover:text-gold" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full border border-gold/30 p-3 transition-all duration-300 hover:scale-110 hover:bg-gold/10"
              >
                <Instagram className="h-5 w-5 text-primary transition group-hover:text-gold" />
              </a>

              {/* Portfolio */}
              <a
                href="https://pruthvinarayanareddy.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full border border-gold/30 p-3 transition-all duration-300 hover:scale-110 hover:bg-gold/10"
              >
                <Globe className="h-5 w-5 text-primary transition group-hover:text-gold" />
              </a>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
}
