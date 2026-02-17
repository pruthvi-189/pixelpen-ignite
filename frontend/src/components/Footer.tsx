import { motion } from "framer-motion";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/pixelpen/" },
  { label: "Instagram", href: "https://www.instagram.com/pixelpen36?igsh=MThjaGNleGh2YjFubQ%3D%3D&utm_source=qr" },
  { label: "Whatsapp", href: "https://whatsapp.com/channel/0029Vb6zvxL1Hsq3aq9FZf45" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border-t border-border bg-secondary"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-foreground">
            Pixel<span className="text-gradient-gold">Pen</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Empowering students through hands-on tech education.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          PixelPen © 2025. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
