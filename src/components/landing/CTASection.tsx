import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
            Medicine should never be a luxury
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Join thousands of families across India who trust GenPharma for simple, affordable,
            and reliable medication management.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Button size="lg" className="gap-2 text-base" onClick={() => navigate("/pharmacist")}>
              Get Started Free <ArrowRight size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base"
              onClick={() => window.location.href = "mailto:support@genpharma.in"}
            >
              Talk to Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
