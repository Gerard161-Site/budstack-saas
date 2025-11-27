'use client'

import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface AboutHeroProps {
  businessName: string;
}

const AboutHero = ({ businessName }: AboutHeroProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  return (
    <section 
      className="py-12 sm:py-16 md:py-20 relative"
      style={{ backgroundColor: 'var(--tenant-color-background)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-light mb-6" 
              style={{ 
                fontFamily: 'var(--tenant-font-heading)',
                color: 'var(--tenant-color-heading)',
                letterSpacing: '0.01em', 
                lineHeight: '1.5' 
              }}
            >
              {businessName}: Leading UK Cannabis Innovation
            </h2>
            <p 
              className="text-base sm:text-lg leading-relaxed font-light"
              style={{ 
                fontFamily: 'var(--tenant-font-base)',
                color: 'var(--tenant-color-text)' 
              }}
            >
              Committed to excellence in every product we create and championing UK cannabis acceptance through quality, compliance, and integrity. Our MHRA-approved facilities ensure the highest standards for medical cannabis patients across the United Kingdom.
            </p>
          </div>
          
          <div>
            <div ref={imageRef} className="relative overflow-hidden rounded-2xl shadow-medium">
              <motion.div 
                style={{ y: imageY }}
                className="relative w-full h-[400px]"
              >
                <Image
                  src="/greenhouse-exterior-hq.jpg"
                  alt="Cannabis cultivation facility"
                  fill
                  className="rounded-2xl object-cover scale-110"
                />
              </motion.div>
              
              {/* Decorative wave elements */}
              <svg 
                className="absolute -top-4 -right-4 w-24 h-24 opacity-60" 
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: 'var(--tenant-color-primary)' }}
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
                className="absolute -bottom-4 -left-4 w-24 h-24 opacity-60" 
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: 'var(--tenant-color-primary)' }}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
