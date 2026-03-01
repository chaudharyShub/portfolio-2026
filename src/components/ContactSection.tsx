import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-block">Contact</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Let's work <span className="text-gradient-primary">together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        {/* <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"> */}
        <div className="gap-8 max-w-5xl mx-auto">
          {/* Left info cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 w-full grid grid-cols-1 lg:grid-cols-2 lg:space-y-0 lg:gap-4"
          >
            {[
              { icon: Mail, label: "Email", value: "sc07807cs@gmail.com" },
              { icon: MapPin, label: "Location", value: "Available Worldwide" },
              { icon: Clock, label: "Response Time", value: "Within 24 hours" },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="card-glass p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              </div>
            ))}

            <div className="card-glass p-5">
              <p className="text-sm text-muted-foreground mb-3">Find me online</p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "https://github.com/chaudharyShub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/shubham-chaudhary-4398bba8 " },
                  { icon: Mail, href: "mailto:sc07807cs@gmail.com" },
                ].map((Icon, i) => (
                  <a
                    key={i}
                    target="_blank"
                    href={Icon.href}
                    className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    <Icon.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          {/* <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-glass p-6 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-foreground mb-1.5 block">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-foreground mb-1.5 block">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-foreground mb-1.5 block">Subject</label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-foreground mb-1.5 block">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg font-bold text-white flex items-center justify-center gap-2 bg-[#4589ff] hover:bg-[#3273dc] transition-all shadow-[0_0_15px_rgba(69,137,255,0.2)]"
            >
              <Send size={16} />
              Send Message
            </button>
          </motion.form> */}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
