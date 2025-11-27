'use client';

import { motion } from 'framer-motion';
import { Sprout, Users, FlaskConical } from 'lucide-react';

// Force rebuild - fixed colors v2
// Timestamp: 2025-11-24 20:30 UTC - Deployment fix attempt

const values = [
  {
    icon: Sprout,
    title: "Superior Quality",
    description: "Every stage from cultivation through extraction to final production is meticulously managed with unwavering attention to detail. Our EU GMP-certified products meet the highest international standards, earning trust across borders.",
  },
  {
    icon: Users,
    title: "Expanding Access",
    description: "Our mission is to ensure medical cannabis reaches those who need it most. Through evidence-based advocacy and education, we are reducing barriers, challenging misconceptions, and creating pathways to safe, legal access.",
  },
  {
    icon: FlaskConical,
    title: "Research-Driven Innovation",
    description: "Collaborating with world-class research institutions including Imperial College London and University of Pennsylvania, we advance scientific knowledge of cannabis therapeutics. Research excellence is the foundation of everything we pursue.",
  },
];

export function ValueProps({ consultationUrl }: { consultationUrl: string }) {
  return (
    <section 
      className="py-12 sm:py-16 md:py-20" 
      style={{ backgroundColor: '#0F1A1E' }}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-pharma text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 px-4 tracking-tight">
              Growing more than medicine
            </h2>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <value.icon className="w-12 h-12 text-emerald-400" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-pharma text-xl sm:text-2xl font-semibold text-white mb-4 tracking-tight">
                  {value.title}
                </h3>
                <p className="font-body text-gray-300 leading-relaxed text-sm sm:text-base">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
