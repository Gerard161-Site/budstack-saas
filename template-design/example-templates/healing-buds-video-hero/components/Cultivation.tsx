'use client';

import { motion } from 'framer-motion';

/**
 * Cultivation Component
 * 
 * Information about cultivation process and quality standards.
 * This is a placeholder - replace with actual tenant content.
 */
export function Cultivation() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white" aria-labelledby="cultivation-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="cultivation-heading" className="responsive-heading font-bold text-primary mb-6">
              Pharmaceutical-Grade Cultivation
            </h2>
            <p className="responsive-body text-gray-700 mb-4 leading-relaxed">
              Our cultivation facilities meet the highest pharmaceutical standards,
              ensuring consistent quality and purity in every product.
            </p>
            <p className="responsive-body text-gray-700 leading-relaxed">
              We employ advanced growing techniques, rigorous testing protocols,
              and strict quality control measures throughout the entire production process.
            </p>
          </motion.div>

          {/* Placeholder Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center"
          >
            <p className="text-gray-500 text-sm">Cultivation Image Placeholder</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
