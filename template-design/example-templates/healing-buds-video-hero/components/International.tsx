'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface InternationalProps {
  contactUrl: string;
}

/**
 * International Component
 * 
 * Compliance and certification information.
 */
export function International({ contactUrl }: InternationalProps) {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-primary-light" aria-labelledby="standards-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 id="standards-heading" className="responsive-heading font-bold text-primary mb-6">
            International Standards
          </h2>
          <p className="responsive-body text-gray-700 mb-8 leading-relaxed">
            We maintain compliance with INFARMED regulations and EU-GMP standards,
            ensuring the highest quality and safety for our patients.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm">
              <span className="font-semibold text-primary">INFARMED</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm">
              <span className="font-semibold text-primary">EU-GMP</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm">
              <span className="font-semibold text-primary">ISO 9001</span>
            </div>
          </div>

          <Link
            href={contactUrl}
            className="inline-block mt-8 px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
