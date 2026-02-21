import { motion } from "framer-motion";
import { Camera, Package, Bell } from "lucide-react";
import medicinePacks from "@/assets/medicine-packs.jpg";

const steps = [
  {
    icon: Camera,
    title: "Upload Prescription",
    description: "Snap a photo or upload your prescription. Our pharmacists verify it within minutes.",
    color: "bg-primary text-primary-foreground",
  },
  {
    icon: Package,
    title: "We Sort & Pack",
    description: "Each medicine is placed in a labelled pouch — organized by day and time. Barcode-verified for safety.",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Bell,
    title: "Take On Time",
    description: "Get reminders in your language. Just open the right pouch at the right time. That simple.",
    color: "bg-primary text-primary-foreground",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">
            Simple as 1-2-3
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground">
            How GenPharma Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="relative">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center`}>
                  <step.icon size={28} />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-card border-2 border-border flex items-center justify-center text-xs font-bold text-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-xl text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <img
            src={medicinePacks}
            alt="Pre-sorted medicine pouches organized by morning, afternoon, and evening"
            className="rounded-2xl shadow-card"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
