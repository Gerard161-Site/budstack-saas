'use client';

import { Tenant } from '@prisma/client';
import { Hero } from './components/Hero';
import { AboutHero } from './components/AboutHero';
import { ValueProps } from './components/ValueProps';
import { Cultivation } from './components/Cultivation';
import { International } from './components/International';
import { News } from './components/News';
import { useState, useEffect } from 'react';

interface HealingBudsVideoTemplateProps {
  tenant: Tenant;
  consultationUrl: string;
  productsUrl: string;
  contactUrl: string;
  heroImageUrl?: string | null;
  logoUrl?: string | null;
}

/**
 * Healing Buds Video Hero Template
 * 
 * Immersive video background template with parallax scrolling.
 * Fully customizable with tenant branding.
 */
export default function HealingBudsVideoTemplate({
  tenant,
  consultationUrl,
  productsUrl,
  contactUrl,
  heroImageUrl,
  logoUrl
}: HealingBudsVideoTemplateProps) {
  const [scrollFade, setScrollFade] = useState(0);
  
  // Extract tenant settings
  const settings = (tenant.settings as any) || {};
  
  // Get video URL from settings or use default
  const videoUrl = settings.heroVideoUrl || '/hero-video.mp4';
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeValue = Math.min(scrollY / 300, 1);
      setScrollFade(fadeValue);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Dynamic scroll-based fade overlay */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 via-background/40 to-transparent z-40 pointer-events-none transition-opacity duration-500 ease-out"
        style={{ opacity: scrollFade * 0.7 }}
      />
      
      <Hero 
        businessName={tenant.businessName}
        tagline={settings.tagline || 'Pioneering tomorrow\'s medical cannabis solutions'}
        videoUrl={videoUrl}
        imageUrl={heroImageUrl || null}
        logoUrl={logoUrl || '/hb-logo-square.png'}
      />
      
      <AboutHero 
        businessName={tenant.businessName}
        description={settings.aboutContent || settings.homeHeroSubtitle || null}
        consultationUrl={consultationUrl}
      />
      
      <ValueProps consultationUrl={consultationUrl} />
      
      <Cultivation />
      
      <International contactUrl={contactUrl} />
      
      <News />
    </>
  );
}
