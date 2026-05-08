import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Send,
  ArrowUpRight,
  Loader2,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import TiltCard from "@/components/fx/TiltCard";
import Magnetic from "@/components/fx/Magnetic";
import SectionHeader from "@/components/fx/SectionHeader";
import { useSpotlight } from "@/hooks/useSpotlight";

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

const InfoCard = ({ item, index }: { item: InfoItem; index: number }) => {
  const spotRef = useSpotlight<HTMLDivElement>();
  const { icon: Icon, label, value, accent, accent2, href } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
    >
      <a
        href={href || "#"}
        className="group relative block"
        onClick={(e) => !href && e.preventDefault()}
      >
        <TiltCard max={4} ease={0.2} lift={3} className="relative">
          <div
            aria-hidden
            className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent2})`,
            }}
          />
          <div
            ref={spotRef}
            className="relative flex items-center gap-4 p-4 rounded-xl bg-card border border-border transition-colors duration-300 group-hover:border-transparent overflow-hidden"
            style={
              {
                "--mx": "50%",
                "--my": "-50%",
              } as React.CSSProperties
            }
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(220px circle at var(--mx) var(--my), ${accent}33, transparent 65%)`,
              }}
            />
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
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
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
        </TiltCard>
      </a>
    </motion.div>
  );
};

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

    const link = document.createElement("a");
    link.href = mailtoUrl;
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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
      description:
        "Thanks for reaching out — I'll get back to you within 24 hours.",
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

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          badge="~/contact"
          chapter="chapter 05"
          title={
            <>
              Let&apos;s work{" "}
              <span className="text-gradient-primary">together</span>
            </>
          }
          titleClassName="text-4xl md:text-5xl"
          subtitle="Have a project in mind, an opportunity to discuss, or just want to chat? My inbox is always open."
        />

        <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {infoItems.map((item, i) => (
              <InfoCard key={i} item={item} index={i} />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ delay: 0.3, duration: 0.45 }}
              className="relative bg-card border border-border rounded-xl p-5"
            >
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Find me online
              </p>
              <div className="flex gap-2.5">
                {socials.map((s, i) => (
                  <Magnetic key={i} strength={8}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="group/social relative w-10 h-10 rounded-lg border border-border bg-black/30 flex items-center justify-center text-muted-foreground transition-colors duration-300 hover:text-white overflow-hidden"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.25), hsl(var(--primary) / 0.25))",
                        }}
                      />
                      <s.icon
                        size={16}
                        className="relative z-10 transition-transform duration-300 group-hover/social:scale-125"
                      />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ delay: 0.1, duration: 0.5 }}
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

              <div className="p-5 md:p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Field
                    label="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <Field
                  label="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <Field
                  label="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                />

                <Magnetic strength={6} as="div" className="block">
                  <button
                    type="submit"
                    disabled={
                      status === "submitting" || status === "success"
                    }
                    className="group/btn w-full relative overflow-hidden rounded-lg font-bold text-white py-3.5 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-90"
                    style={{
                      background:
                        status === "success"
                          ? "linear-gradient(135deg, hsl(var(--highlight-green)), hsl(var(--highlight-cyan)))"
                          : "linear-gradient(135deg, hsl(var(--highlight-purple)), hsl(var(--primary)))",
                      boxShadow:
                        status === "success"
                          ? "0 4px 20px hsl(var(--highlight-green) / 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.12)"
                          : "0 4px 20px hsl(var(--primary) / 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.12)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/btn:translate-x-[400%] transition-transform duration-1000 ease-in-out"
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
                        <Send
                          size={16}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5"
                        />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </Magnetic>

                {!WEB3FORMS_KEY && (
                  <p className="text-[10px] font-mono text-muted-foreground/60 text-center pt-1">
                    <span className="text-muted-foreground/40">{"//"}</span> no
                    email service configured — submitting will open your mail
                    client &amp; copy the message to your clipboard
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
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <label className="block group/field">
      <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
        <span
          className={`transition-colors duration-200 ${
            focused ? "text-primary" : "text-highlight-blue"
          }`}
        >
          {label}
        </span>{" "}
        ={" "}
      </span>
      <div className="relative">
        <span
          aria-hidden
          className={`absolute -inset-px rounded-lg pointer-events-none transition-opacity duration-300 ${
            focused ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--highlight-purple) / 0.6), hsl(var(--primary) / 0.6))",
            padding: "1px",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        {rows ? (
          <textarea
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="relative w-full px-4 py-2.5 rounded-lg bg-secondary/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:bg-secondary transition-all resize-none font-mono"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="relative w-full px-4 py-2.5 rounded-lg bg-secondary/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:bg-secondary transition-all font-mono"
          />
        )}
      </div>
    </label>
  );
};

export default ContactSection;
