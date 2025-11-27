'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface AboutHeroProps {
  businessName: string;
  description?: string;
  consultationUrl: string;
}

/**
 * AboutHero Component
 * 
 * Brief introduction section with CTA to consultation.
 */
export function AboutHero({ 
  businessName, 
  description, 
  consultationUrl 
}: AboutHeroProps) {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 
            id="about-heading"
            className="responsive-heading font-bold mb-6 text-primary"
          >
            About {businessName}
          </h2>
          
          {description && (
            <p className="responsive-body text-gray-700 mb-8 leading-relaxed">
              {description}
            </p>
          )}
          
          <Link
            href={consultationUrl}
            className="inline-block px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Book a Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
