import { motion } from "framer-motion";

const stats = [
  { value: "50-80%", label: "Savings on Medicine" },
  { value: "10+", label: "Regional Languages" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "500+", label: "Medicines Available" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-display text-primary-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-primary-foreground/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
