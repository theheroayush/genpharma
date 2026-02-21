import { motion } from "framer-motion";
import { Shield, Globe, Scan, IndianRupee, Users, Clock } from "lucide-react";

const features = [
  {
    icon: IndianRupee,
    title: "50-80% Savings",
    description: "Quality WHO-GMP certified generics at a fraction of branded prices.",
  },
  {
    icon: Scan,
    title: "Barcode Verified",
    description: "Every medicine is scanned and verified before it goes into your pouch.",
  },
  {
    icon: Globe,
    title: "10+ Languages",
    description: "Labels and reminders in Hindi, Tamil, Telugu, Bengali, and more.",
  },
  {
    icon: Shield,
    title: "Zero Expired Drugs",
    description: "Strict batch tracking and expiry management. No compromises.",
  },
  {
    icon: Users,
    title: "Family Accounts",
    description: "Manage medicines for your parents, spouse, and kids — all in one app.",
  },
  {
    icon: Clock,
    title: "Smart Reminders",
    description: "Push notifications, SMS, and even voice calls so you never miss a dose.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">
            Why GenPharma
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Healthcare That Truly Cares
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border hover:shadow-card transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary mb-5">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-display text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
