'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  businessName: string;
  tagline?: string;
  videoUrl?: string;
  imageUrl?: string;
  logoUrl?: string;
  heroType?: 'video' | 'image';
}

/**
 * Hero Component
 * 
 * Immersive full-screen hero with video or image background.
 * Features parallax scrolling and smooth scroll indicators.
 */
export function Hero({ 
  businessName, 
  tagline, 
  videoUrl, 
  imageUrl,
  logoUrl,
  heroType = 'video'
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current && heroType === 'video' && videoUrl) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [videoUrl, heroType]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center overflow-hidden pt-28 sm:pt-36 md:pt-44"
      aria-label="Hero section"
    >
      {/* Background Media with Parallax */}
      <motion.div 
        style={{ y: mediaY }}
        className="absolute left-2 right-2 sm:left-4 sm:right-4 top-24 sm:top-32 md:top-40 bottom-4 rounded-2xl sm:rounded-3xl overflow-hidden z-0 shadow-2xl"
      >
        {heroType === 'video' && videoUrl ? (
          <>
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
              aria-hidden="true"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1F2A25]/60 to-[#13303D]/55 video-overlay" />
          </>
        ) : imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1F2A25]/60 to-[#13303D]/55" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1F2A25] to-[#13303D]" />
        )}
      </motion.div>
      
      {/* Hero Content */}
      <motion.div 
        style={{ y: contentY, opacity }}
        className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24 md:py-32"
      >
        <div className="max-w-5xl text-left relative">
          <h1 className="font-pharma responsive-heading font-semibold text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight drop-shadow-lg">
            Welcome to{" "}
            <span className="block mt-3">{businessName}</span>
          </h1>
          
          {/* Optional Logo Overlay */}
          {logoUrl && (
            <div className="hidden md:block absolute -right-8 md:right-4 lg:right-12 top-1/2 -translate-y-1/2 w-[380px] md:w-[480px] lg:w-[560px] opacity-15 pointer-events-none">
              <Image 
                src={logoUrl} 
                alt="" 
                width={560}
                height={560}
                className="object-contain"
              />
            </div>
          )}
          
          {/* Tagline */}
          {tagline && (
            <p className="responsive-subheading text-white/90 mb-8 max-w-2xl font-light leading-relaxed drop-shadow-md">
              {tagline}
            </p>
          )}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/80 hover:text-white transition-all duration-300 scroll-indicator cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-2"
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-8 h-8" aria-hidden="true" />
      </button>
    </section>
  );
}
