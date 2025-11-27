'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AboutHeroProps {
  businessName: string;
  description?: string | null;
  consultationUrl: string;
}

export function AboutHero({ businessName, description, consultationUrl }: AboutHeroProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  return (
    <section className="py-12 sm:py-16 md:py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl font-light mb-6 leading-tight tracking-tight" style={{ color: '#111827' }}>
                {businessName}: Advancing Global Cannabis Innovation
              </h2>
              <p className="font-inter text-base sm:text-lg leading-relaxed font-light" style={{ color: '#4b5563' }}>
                {description || "Committed to excellence in every product we create and championing worldwide cannabis acceptance through quality and integrity."}
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div ref={imageRef} className="relative overflow-hidden rounded-2xl shadow-medium">
              <motion.div
                style={{ y: imageY }}
                className="relative w-full aspect-[4/3]"
              >
                <Image 
                  src="/greenhouse-exterior-hq.jpg"
                  alt="Cannabis cultivation facility with rows of plants" 
                  fill
                  className="rounded-2xl object-cover scale-110"
                />
              </motion.div>
              {/* Decorative wave elements */}
              <svg 
                className="absolute -top-4 -right-4 w-24 h-24 text-secondary opacity-60" 
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M10 30 Q 30 10, 50 30 T 90 30" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  fill="none"
                />
                <path 
                  d="M10 50 Q 30 30, 50 50 T 90 50" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  fill="none"
                />
                <path 
                  d="M10 70 Q 30 50, 50 70 T 90 70" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  fill="none"
                />
              </svg>
              <svg 
                className="absolute -bottom-4 -left-4 w-24 h-24 text-secondary opacity-60" 
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M10 30 Q 30 10, 50 30 T 90 30" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  fill="none"
                />
                <path 
                  d="M10 50 Q 30 30, 50 50 T 90 50" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  fill="none"
                />
                <path 
                  d="M10 70 Q 30 50, 50 70 T 90 70" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
