'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Cultivation() {
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div ref={imageRef} className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group">
            <motion.div
              style={{ y: imageY }}
              className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]"
            >
              <Image 
                src="/indoor-grow-hq.jpg"
                alt="Indoor cannabis cultivation facility with advanced lighting" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/45 transition-opacity duration-500 group-hover:from-black/80 group-hover:to-black/40" />
            
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 md:px-16">
              <h2 className="font-pharma text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6 max-w-2xl drop-shadow-lg tracking-tight" style={{ color: '#ffffff' }}>
                Production & Processing Excellence
              </h2>
              <p className="font-body text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-6 sm:mb-8 drop-shadow-md" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                Our state-of-the-art facilities across Canada and Portugal span more than 30,000 square meters dedicated to pharmaceutical-grade cannabis production. From seed selection through harvesting and processing, we maintain rigorous oversight at every production stage. Each batch undergoes comprehensive testing, precise trimming, controlled drying and curing, and careful packaging to ensure consistent quality that meets stringent third-party standards.
              </p>
            </div>

            {/* Navigation arrows - hidden on mobile */}
            <div className="hidden sm:flex absolute bottom-8 right-8 gap-3">
              <button className="w-12 h-12 rounded-full border-2 border-white/50 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all backdrop-blur-sm">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 rounded-full border-2 border-white/50 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all backdrop-blur-sm">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
