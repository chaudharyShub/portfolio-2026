import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Send,
  Terminal,
  ArrowUpRight,
  Loader2,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACT_EMAIL = "sc07807cs@gmail.com";
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type InfoItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: string;
  accent2: string;
  href?: string;
};

const infoItems: InfoItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "sc07807cs@gmail.com",
    accent: "hsl(var(--highlight-purple))",
    accent2: "hsl(var(--highlight-pink))",
    href: "mailto:sc07807cs@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Available Worldwide",
    accent: "hsl(var(--highlight-cyan))",
    accent2: "hsl(var(--primary))",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    accent: "hsl(var(--highlight-green))",
    accent2: "hsl(var(--highlight-cyan))",
  },
];

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/chaudharyShub",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shubham-chaudhary-4398bba8",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:sc07807cs@gmail.com",
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetAfterSuccess = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    window.setTimeout(() => setStatus("idle"), 2500);
  };

  const sendViaMailtoFallback = async () => {
    const subject = encodeURIComponent(
      formData.subject || "Hello from your portfolio",
    );
    const body = encodeURIComponent(
      `Hi Shubham,\n\n${formData.message}\n\n— ${formData.name} (${formData.email})`,
    );
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    // Use a hidden anchor click — more reliable than location.href
    const link = document.createElement("a");
    link.href = mailtoUrl;
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Even if a mail client opens, also copy email to clipboard so the
    // message isn't lost if the handoff fails (very common on desktop Chrome).
    try {
      await navigator.clipboard.writeText(
        `To: ${CONTACT_EMAIL}\nSubject: ${decodeURIComponent(
          subject,
        )}\n\n${decodeURIComponent(body)}`,
      );
      toast.success("Opening your email client…", {
        description: `If nothing happens, the message has been copied to your clipboard. You can paste it into an email to ${CONTACT_EMAIL}.`,
      });
    } catch {
      toast.success("Opening your email client…", {
        description: `If nothing opens, please email me directly at ${CONTACT_EMAIL}.`,
      });
    }

    setStatus("success");
    resetAfterSuccess();
  };

  const sendViaWeb3Forms = async () => {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "New message from your portfolio",
        message: formData.message,
        replyto: formData.email,
      }),
    });

    const data = (await res.json()) as { success: boolean; message?: string };
    if (!data.success) {
      throw new Error(data.message || "Failed to send message.");
    }

    setStatus("success");
    toast.success("Message sent!", {
      description: "Thanks for reaching out — I'll get back to you within 24 hours.",
    });
    resetAfterSuccess();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Missing fields", {
        description: "Please fill in your name, email, and a message.",
      });
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailOk) {
      toast.error("Invalid email", {
        description: "Please enter a valid email address so I can reply.",
      });
      return;
    }

    setStatus("submitting");

    try {
      if (WEB3FORMS_KEY) {
        await sendViaWeb3Forms();
      } else {
        await sendViaMailtoFallback();
      }
    } catch (err) {
      console.error("Contact form failed:", err);
      setStatus("error");
      toast.error("Something went wrong", {
        description:
          err instanceof Error
            ? err.message
            : `Please email me directly at ${CONTACT_EMAIL}.`,
      });
      window.setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background ambience */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 45% at 22% 25%, hsl(var(--highlight-purple) / 0.14), transparent 70%), radial-gradient(45% 45% at 78% 75%, hsl(var(--primary) / 0.14), transparent 70%), radial-gradient(35% 35% at 50% 90%, hsl(var(--highlight-pink) / 0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Floating dots */}
      {[
        { x: "10%", y: "20%", c: "hsl(var(--highlight-purple))", d: 0 },
        { x: "92%", y: "30%", c: "hsl(var(--highlight-pink))", d: 0.6 },
        { x: "8%", y: "75%", c: "hsl(var(--highlight-cyan))", d: 1.2 },
        { x: "94%", y: "82%", c: "hsl(var(--primary))", d: 1.8 },
      ].map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: 5,
            height: 5,
            background: p.c,
            boxShadow: `0 0 10px ${p.c}, 0 0 20px ${p.c}`,
          }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.4, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, delay: p.d }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm font-mono text-xs">
            <Terminal size={12} className="text-primary" />
            <span className="text-primary">~/contact</span>
            <span className="text-muted-foreground">— chapter 05</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight text-center"
        >
          Let&apos;s work <span className="text-gradient-primary">together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto text-center mb-14"
        >
          Have a project in mind, an opportunity to discuss, or just want to
          chat? My inbox is always open.
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Left: info cards + socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {infoItems.map(
              ({ icon: Icon, label, value, accent, accent2, href }, i) => (
                <a
                  key={i}
                  href={href || "#"}
                  className="group relative block"
                  onClick={(e) => !href && e.preventDefault()}
                >
                  <div
                    aria-hidden
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                    }}
                  />
                  <div className="relative flex items-center gap-4 p-4 rounded-xl bg-card border border-border transition-colors duration-300 group-hover:border-transparent overflow-hidden">
                    {/* Hover ring */}
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        padding: "1px",
                        background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                        WebkitMask:
                          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${accent}22, ${accent2}11)`,
                        border: `1px solid ${accent}33`,
                      }}
                    >
                      <Icon size={18} style={{ color: accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {value}
                      </p>
                    </div>
                    {href && (
                      <ArrowUpRight
                        size={16}
                        className="text-muted-foreground/40 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                      />
                    )}
                  </div>
                </a>
              ),
            )}

            {/* Social card */}
            <div className="relative bg-card border border-border rounded-xl p-5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Find me online
              </p>
              <div className="flex gap-2.5">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="glass-icon-btn !w-10 !h-10 !rounded-lg"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: terminal-style contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 relative"
          >
            <div
              aria-hidden
              className="absolute -inset-2 rounded-2xl opacity-50 blur-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.35), hsl(var(--primary) / 0.35), hsl(var(--highlight-pink) / 0.25))",
              }}
            />
            <form
              onSubmit={handleSubmit}
              className="relative bg-card/80 border border-border rounded-2xl backdrop-blur-sm overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border bg-gradient-to-b from-white/[0.04] to-transparent">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-highlight-red/70 shadow-[0_0_6px_hsl(var(--highlight-red)/0.6)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-highlight-yellow/70 shadow-[0_0_6px_hsl(var(--highlight-yellow)/0.6)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-highlight-green/70 shadow-[0_0_6px_hsl(var(--highlight-green)/0.6)]" />
                  <span className="ml-2 text-highlight-green">$</span>
                  <span className="text-muted-foreground">
                    npm run reach-out
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-highlight-blue px-2 py-0.5 rounded border border-highlight-blue/30 bg-highlight-blue/10">
                  draft
                </span>
              </div>

              {/* Body */}
              <div className="p-5 md:p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="name"
                    name="name"
                    // placeholder="ada lovelace"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Field
                    label="email"
                    name="email"
                    type="email"
                    // placeholder="ada@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <Field
                  label="subject"
                  name="subject"
                  // placeholder="project inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <Field
                  label="message"
                  name="message"
                  // placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                />

                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="group/btn glass-btn-primary w-full !py-3.5 gap-2 disabled:opacity-90"
                  style={
                    status === "success"
                      ? {
                          background:
                            "linear-gradient(135deg, hsl(var(--highlight-green) / 0.45), hsl(var(--highlight-cyan) / 0.45))",
                          borderColor: "hsl(var(--highlight-green) / 0.6)",
                          boxShadow:
                            "inset 0 1px 0 hsl(0 0% 100% / 0.18), 0 8px 28px hsl(var(--highlight-green) / 0.45)",
                        }
                      : undefined
                  }
                >
                  <span className="glass-shine" aria-hidden />
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/btn:translate-x-[400%] transition-transform duration-1000 ease-in-out pointer-events-none"
                  />
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check size={16} />
                      <span>Message sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {!WEB3FORMS_KEY && (
                  <p className="text-[10px] font-mono text-muted-foreground/60 text-center pt-1">
                    <span className="text-muted-foreground/40">{"//"}</span>{" "}
                    no email service configured — submitting will open your
                    mail client &amp; copy the message to your clipboard
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  rows?: number;
}) => (
  <label className="block">
    <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
      {/* <span className="text-highlight-purple">const</span>{" "} */}
      <span className="text-highlight-blue">{label}</span> ={" "}
      {/* <span className="text-muted-foreground/60">await ask()</span> */}
    </span>
    {rows ? (
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-secondary/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 focus:bg-secondary transition-all resize-none font-mono"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-secondary/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 focus:bg-secondary transition-all font-mono"
      />
    )}
  </label>
);

export default ContactSection;
