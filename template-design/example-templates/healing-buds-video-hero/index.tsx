import { Tenant } from '@prisma/client';
import { Hero } from './components/Hero';
import { AboutHero } from './components/AboutHero';
import { ValueProps } from './components/ValueProps';
import { Cultivation } from './components/Cultivation';
import { International } from './components/International';
import { News } from './components/News';
import './styles.css';

interface HealingBudsTemplateProps {
  tenant: Tenant;
  consultationUrl: string;
  productsUrl: string;
  contactUrl: string;
}

/**
 * Healing Buds Video Hero Template
 * 
 * A flexible, modern template with immersive video hero and parallax scrolling.
 * Sections can be rearranged, removed, or replaced as needed.
 */
export default function HealingBudsTemplate({
  tenant,
  consultationUrl,
  productsUrl,
  contactUrl
}: HealingBudsTemplateProps) {
  // Extract tenant settings
  const settings = (tenant.settings as any) || {};
  const colors = {
    primary: settings.primaryColor || tenant.primaryColor || '#2A3D3A',
    secondary: settings.secondaryColor || tenant.secondaryColor || '#13303D',
    accent: settings.accentColor || tenant.accentColor || '#F97316',
  };

  return (
    <div 
      className="template-healing-buds"
      style={{
        '--tenant-primary': colors.primary,
        '--tenant-secondary': colors.secondary,
        '--tenant-accent': colors.accent,
        '--tenant-font-body': tenant.fontFamily || 'Inter, sans-serif',
        '--tenant-font-heading': settings.headingFont || 'Playfair Display, serif',
      } as React.CSSProperties}
    >
      {/* Hero Section - Full viewport video background */}
      <Hero 
        businessName={tenant.businessName}
        tagline={settings.tagline || tenant.description}
        videoUrl={tenant.heroVideoUrl}
        imageUrl={tenant.heroImageUrl}
        logoUrl={tenant.logoUrl}
        heroType={settings.heroType || 'video'}
      />
      
      {/* About Section - Brief introduction */}
      <AboutHero 
        businessName={tenant.businessName}
        description={tenant.description}
        consultationUrl={consultationUrl}
      />
      
      {/* Value Propositions - Key benefits */}
      <ValueProps consultationUrl={consultationUrl} />
      
      {/* Cultivation - Process and quality */}
      <Cultivation />
      
      {/* International Standards - Compliance */}
      <International contactUrl={contactUrl} />
      
      {/* News/Blog - Latest updates */}
      <News />
    </div>
  );
}
