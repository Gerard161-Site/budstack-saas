import { Tenant } from '@prisma/client';
import './styles.css';

// Import sections (simplified for now - can be expanded)
import { HeroSection } from '@/components/home/hero-section';
import { TrustBadges } from '@/components/home/trust-badges';
import { FeaturedConditions } from '@/components/home/featured-conditions';
import { ProcessSteps } from '@/components/home/process-steps';
import { EducationalContent } from '@/components/home/educational-content';
import { TestimonialsSlider } from '@/components/home/testimonials-slider';
import { CallToAction } from '@/components/home/call-to-action';

interface MedicalProfessionalTemplateProps {
  tenant: Tenant;
  heroImageUrl?: string | null;
  consultationUrl: string;
}

export function MedicalProfessionalTemplate({
  tenant,
  heroImageUrl,
  consultationUrl,
}: MedicalProfessionalTemplateProps) {
  const settings = (tenant.settings as any) || {};
  const colors = {
    primary: settings.primaryColor || '#2563eb', // More clinical blue
    secondary: settings.secondaryColor || '#10b981',
    accent: settings.accentColor || '#06b6d4',
  };

  return (
    <div
      className="template-medical-professional"
      style={{
        '--primary-color': colors.primary,
        '--secondary-color': colors.secondary,
        '--accent-color': colors.accent,
      } as React.CSSProperties}
    >
      {/* Professional Hero with credentials emphasis */}
      <HeroSection
        tenant={tenant}
        heroImageUrl={heroImageUrl}
        consultationUrl={consultationUrl}
      />

      {/* Prominent certifications */}
      <TrustBadges />

      {/* Medical conditions with clinical descriptions */}
      <FeaturedConditions consultationUrl={consultationUrl} />

      {/* Detailed clinical process */}
      <ProcessSteps consultationUrl={consultationUrl} />

      {/* Evidence-based education */}
      <EducationalContent />

      {/* Patient testimonials */}
      <TestimonialsSlider />

      {/* Professional CTA */}
      <CallToAction tenant={tenant} consultationUrl={consultationUrl} />
    </div>
  );
}
