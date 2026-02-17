 import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import founderImg from "@/assets/Founder.jpeg";
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
              className="mb-10 h-72 w-72 overflow-hidden rounded-full border-4 border-gold/50 animate-pulse-gold"
            >
              <img
                src={founderImg}
                alt="Pruthvi Narayana Reddy"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Name */}
            <h2 className="mb-1 font-display text-4xl md:text-4xl font-bold text-foreground tracking-wide">
              Pruthvi Narayana Reddy
            </h2>

            {/* Role */}
            <p className="mb-8 text-lg md:text-xl font-medium text-primary tracking-wide">
              Founder & CEO, PixelPen
            </p>

            {/* Description */}
            <p className="mb-10 max-w-1xl text-lg md:text-xl text-muted-foreground leading-loose text-justify mx-auto">
              An undergraduate specializing in Artificial Intelligence and Machine Learning, the founder brings a strong commitment to advancing technology-driven education. With a focus on structured workshops, industry-aligned learning initiatives, and practical implementation, the vision is to bridge the gap between academic theory and real-world application. The objective is to empower students with the technical expertise, problem-solving mindset, and hands-on experience required to thrive in today’s evolving technological landscape.
            </p>
            {/* SOCIAL ICONS */}
            <div className="flex gap-6">
              {/* Email */}
              <a
                href="mailto:pruthvinarayanareddy@gmail.com?subject=Inquiry%20from%20PixelPen%20Website"
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
                href="https://www.instagram.com/pruthvi_reddy_189?igsh=MTJiMWp6Ym02bjE1aA%3D%3D&utm_source=qr"
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
