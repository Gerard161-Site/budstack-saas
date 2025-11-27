'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Users, Clock } from 'lucide-react';

interface ValuePropsProps {
  consultationUrl: string;
}

const benefits = [
  {
    icon: Shield,
    title: 'Medical Grade',
    description: 'Pharmaceutical-quality cannabis products certified for medical use.'
  },
  {
    icon: Award,
    title: 'Licensed & Certified',
    description: 'Fully licensed and compliant with all regulatory requirements.'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Professional medical team available to guide your treatment.'
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Quick and discreet delivery direct to your door.'
  }
];

/**
 * ValueProps Component
 * 
 * Displays key benefits and value propositions in a grid layout.
 */
export function ValueProps({ consultationUrl }: ValuePropsProps) {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-primary-light" aria-labelledby="benefits-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 id="benefits-heading" className="responsive-heading font-bold text-primary mb-4">
            Why Choose Us
          </h2>
          <p className="responsive-body text-gray-600 max-w-2xl mx-auto">
            We provide the highest quality medical cannabis products with professional support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover-lift"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                  <Icon className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
