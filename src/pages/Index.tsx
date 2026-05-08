import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollToTop from "@/components/ScrollToTop";
import { Heart } from "lucide-react";

// Sections below the fold are lazy-loaded so the hero paints fast.
const AboutSection = lazy(() => import("@/components/AboutSection"));
const TechSection = lazy(() => import("@/components/TechSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const SectionFallback = () => (
  <div
    aria-hidden
    className="min-h-[40vh] w-full"
    style={{ contain: "strict" }}
  />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TechSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
      <ScrollToTop />
      <footer className="relative py-10 border-t border-border overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 100%, hsl(var(--highlight-purple) / 0.18), transparent 70%), radial-gradient(60% 80% at 50% 100%, hsl(var(--primary) / 0.12), transparent 60%)",
          }}
        />
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight-green animate-pulse" />
            <span>
              <span className="text-muted-foreground/60">{"//"}</span>{" "}
              shubham_chaudhary
              <span className="text-muted-foreground/60">.dev</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>© 2026 — built with</span>
            <Heart
              size={11}
              className="text-highlight-pink"
              fill="currentColor"
            />
            <span>&amp;</span>
            <span className="text-highlight-purple">code</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider">
            <span>v2026</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-highlight-blue">live</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
