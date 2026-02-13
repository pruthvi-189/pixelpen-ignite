import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, Instagram, MessageCircle, MapPin, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 XXXXX XXXXX", href: "tel:+91XXXXXXXXXX" },
  { icon: Mail, label: "Email", value: "contact@pixelpen.in", href: "mailto:contact@pixelpen.in" },
  { icon: Linkedin, label: "LinkedIn", value: "PixelPen", href: "https://linkedin.com/company/pixelpen" },
  { icon: Instagram, label: "Instagram", value: "@pixelpen.in", href: "https://instagram.com/pixelpen.in" },
  { icon: MessageCircle, label: "WhatsApp Channel", value: "Join our channel", href: "https://whatsapp.com/channel/pixelpen" },
  { icon: MapPin, label: "Location", value: "Bangalore Technological Institute, Bengaluru", href: "#" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-6xl">
            Contact <span className="text-gradient-gold">Us</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Have questions about our workshops or want to collaborate? We'd love to hear from you.
          </p>
        </AnimatedSection>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="mb-8 font-display text-2xl font-semibold text-foreground">
              Reach Out
            </motion.h2>
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="group flex items-center gap-5 rounded-lg border border-border bg-card p-5 transition-shadow duration-500 hover:glow-gold"
                  style={{ background: "var(--gradient-card)" }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="font-body text-base font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <div className="rounded-xl border border-border p-8 md:p-10" style={{ background: "var(--gradient-card)" }}>
              <h2 className="mb-8 font-display text-2xl font-semibold text-foreground">
                Send a Message
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                  const mailtoLink = `mailto:contact@pixelpen.in?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
                  window.open(mailtoLink, "_blank");
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={1000}
                    rows={5}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:glow-gold-intense"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
