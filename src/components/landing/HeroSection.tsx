import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToHowItWorks = () => {
    const el = document.querySelector("#how-it-works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden pt-20">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-0">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
            <Heart size={14} className="text-secondary" />
            India's People-First Pharmacy
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground">
            Your medicines,{" "}
            <span className="text-gradient-primary">sorted by day & time</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Pre-sorted medicine packs delivered to your door. No more confusion, no more missed doses.
            Quality generics at <strong className="text-foreground">50-80% savings</strong>.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <Button size="lg" className="gap-2 text-base" onClick={() => navigate("/register")}>
              Upload Prescription <ArrowRight size={18} />
            </Button>
            <Button variant="outline" size="lg" className="text-base" onClick={scrollToHowItWorks}>
              See How It Works
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              WHO-GMP Certified
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              Free Delivery
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              10+ Languages
            </div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-elevated">
            <img
              src={heroImage}
              alt="Indian grandmother and daughter smiling with pre-sorted medicine pack"
              className="w-full h-auto object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
          </div>

          {/* Floating card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-4 md:left-auto md:-right-6 bg-card rounded-xl p-4 shadow-card border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-sm">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-card-foreground">Morning Pack Ready</p>
                <p className="text-xs text-muted-foreground">3 medicines • 8:00 AM</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
