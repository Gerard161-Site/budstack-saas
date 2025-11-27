'use client'

import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Award, Shield } from "lucide-react";
import { useRef } from "react";

interface CultivationProps {
  businessName: string;
}

const Cultivation = ({ businessName }: CultivationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  const features = [
    { icon: Leaf, title: "Organic Growing", description: "Natural cultivation methods" },
    { icon: Award, title: "MHRA Approved", description: "Certified excellence" },
    { icon: Shield, title: "Quality Tested", description: "Lab-verified products" }
  ];

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-16 md:py-20 relative"
      style={{ backgroundColor: 'var(--tenant-color-surface)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <motion.div 
              style={{ y: imageY }}
              className="relative w-full h-[400px]"
            >
              <Image
                src="/cultivation.jpg"
                alt={`${businessName} cultivation facility`}
                fill
                className="object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
            </motion.div>
          </div>
          
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
              State-of-the-Art Cultivation
            </h2>
            <p 
              className="text-base sm:text-lg leading-relaxed font-light mb-8"
              style={{ 
                fontFamily: 'var(--tenant-font-base)',
                color: 'var(--tenant-color-text)' 
              }}
            >
              Our MHRA-approved cultivation facilities in the UK represent the pinnacle of medical cannabis production. Every plant is monitored, every batch tested, ensuring consistent quality and safety for UK patients.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--tenant-color-primary)', opacity: 0.1 }}>
                    <feature.icon className="w-6 h-6" style={{ color: 'var(--tenant-color-primary)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cultivation;
