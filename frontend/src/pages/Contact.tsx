import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, Instagram, MessageCircle, MapPin, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import emailjs from "@emailjs/browser";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 7022363858", href: "tel:+917022363858" },
  {
    icon: Mail,
    label: "Email",
    value: "pixelpen36@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=pixelpen36@gmail.com&su=Contact%20from%20PixelPen%20Website&body=Hello%20PixelPen%20Team,%0A%0A",
  },
  { icon: Linkedin, label: "LinkedIn", value: "PixelPen", href: "https://www.linkedin.com/company/pixelpen/" },
  { icon: Instagram, label: "Instagram", value: "pixelpen36", href: "https://www.instagram.com/pixelpen36?igsh=MThjaGNleGh2YjFubQ%3D%3D&utm_source=qr" },
  { icon: MessageCircle, label: "WhatsApp Channel", value: "PixelPen", href: "https://whatsapp.com/channel/0029Vb6zvxL1Hsq3aq9FZf45" },
  { icon: MapPin, label: "Location", value: "Bangalore Technological Institute, Bengaluru", href: "https://maps.app.goo.gl/KEQbFyE8R8j9QPme7?g_st=iw" },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    emailjs
      .sendForm(
        "service_zyqegx9",
        "template_t8syb0h",
        form,
        "v8LVtRMNATUK1GJmK"
      )
      .then(() => {
        alert("Message sent successfully 🚀");
        form.reset();
        setLoading(false);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
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
          <div className="space-y-5">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-lg border border-border p-5 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-base font-medium text-foreground">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <div
              className="rounded-xl border border-border p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
              style={{ background: "var(--gradient-card)" }}
            >
              <h2 className="mb-8 font-display text-2xl font-semibold text-foreground">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>

              </form>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
