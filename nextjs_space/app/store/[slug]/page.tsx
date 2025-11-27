
import { notFound } from 'next/navigation';
import { getCurrentTenant } from '@/lib/tenant';
import { prisma } from '@/lib/db';
import { getFileUrl } from '@/lib/s3';

// Import templates
import { MedicalProfessionalTemplate } from '@/templates/medical-professional/layout';
import HealingBudsVideoTemplate from '@/templates/healing-buds-video/index';
import GTACannabisTemplate from '@/templates/gta-cannabis/index';
import WellnessNatureTemplate from '@/templates/wellness-nature/index';
import LovableTemplate from '@/templates/lovable-template-1764245125103/index';
import HealingBudsUKTemplate from '@/templates/healingbuds-uk/index';

// Import existing homepage components (fallback)
import { HeroSection } from '@/components/home/hero-section';
import { TrustBadges } from '@/components/home/trust-badges';
import { FeaturedConditions } from '@/components/home/featured-conditions';
import { ProcessSteps } from '@/components/home/process-steps';
import { EducationalContent } from '@/components/home/educational-content';
import { TestimonialsSlider } from '@/components/home/testimonials-slider';
import { CallToAction } from '@/components/home/call-to-action';

export default async function TenantStorePage() {
  const tenant = await getCurrentTenant();

  if (!tenant) {
    notFound();
  }

  // Fetch tenant with template
  const tenantWithTemplate = await prisma.tenant.findUnique({
    where: { id: tenant.id },
    include: { template: true },
  });

  if (!tenantWithTemplate) {
    notFound();
  }

  // Get hero image and logo URLs if uploaded
  const settings = (tenantWithTemplate.settings as any) || {};
  let heroImageUrl = null;
  let logoUrl = null;
  
  if (settings.heroImagePath) {
    try {
      // If it's a public template path, use it directly; otherwise get S3 signed URL
      if (settings.heroImagePath.startsWith('/templates/') || settings.heroImagePath.startsWith('/lovable-assets/') || settings.heroImagePath.startsWith('/public/')) {
        heroImageUrl = settings.heroImagePath;
      } else {
        heroImageUrl = await getFileUrl(settings.heroImagePath);
      }
    } catch (error) {
      console.error('Error fetching hero image:', error);
    }
  }

  if (settings.logoPath) {
    try {
      // If it's a public template path, use it directly; otherwise get S3 signed URL
      if (settings.logoPath.startsWith('/templates/') || settings.logoPath.startsWith('/lovable-assets/') || settings.logoPath.startsWith('/public/')) {
        logoUrl = settings.logoPath;
      } else {
        logoUrl = await getFileUrl(settings.logoPath);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  }

  const consultationUrl = `/store/${tenantWithTemplate.subdomain}/consultation`;

  // Render selected template
  if (tenantWithTemplate.template?.slug) {
    const templateSlug = tenantWithTemplate.template.slug;

    switch (templateSlug) {
      case 'medical-professional':
        return (
          <MedicalProfessionalTemplate
            tenant={tenantWithTemplate}
            heroImageUrl={heroImageUrl}
            consultationUrl={consultationUrl}
          />
        );
      case 'wellness-nature':
        return (
          <WellnessNatureTemplate
            tenant={tenantWithTemplate}
            consultationUrl={consultationUrl}
            productsUrl={`/store/${tenantWithTemplate.subdomain}/products`}
            contactUrl={`/store/${tenantWithTemplate.subdomain}/contact`}
            heroImageUrl={heroImageUrl}
            logoUrl={logoUrl}
          />
        );
      case 'healing-buds-video':
        return (
          <HealingBudsVideoTemplate
            tenant={tenantWithTemplate}
            consultationUrl={consultationUrl}
            productsUrl={`/store/${tenantWithTemplate.subdomain}/products`}
            contactUrl={`/store/${tenantWithTemplate.subdomain}/contact`}
            heroImageUrl={heroImageUrl}
            logoUrl={logoUrl}
          />
        );
      case 'gta-cannabis':
        return (
          <GTACannabisTemplate
            tenant={tenantWithTemplate}
            consultationUrl={consultationUrl}
            productsUrl={`/store/${tenantWithTemplate.subdomain}/products`}
            contactUrl={`/store/${tenantWithTemplate.subdomain}/contact`}
            heroImageUrl={heroImageUrl}
            logoUrl={logoUrl}
          />
        );
      case 'lovable-template-1764245125103':
        return (
          <LovableTemplate
            tenant={tenantWithTemplate}
            consultationUrl={consultationUrl}
            productsUrl={`/store/${tenantWithTemplate.subdomain}/products`}
            contactUrl={`/store/${tenantWithTemplate.subdomain}/contact`}
            heroImageUrl={heroImageUrl}
            logoUrl={logoUrl}
          />
        );
      case 'healingbuds-uk':
        return (
          <HealingBudsUKTemplate
            tenant={tenantWithTemplate}
            consultationUrl={consultationUrl}
            productsUrl={`/store/${tenantWithTemplate.subdomain}/products`}
            contactUrl={`/store/${tenantWithTemplate.subdomain}/contact`}
            heroImageUrl={heroImageUrl}
            logoUrl={logoUrl}
          />
        );
    }
  }

  // Default/Fallback template (original design)
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection tenant={tenantWithTemplate} heroImageUrl={heroImageUrl} consultationUrl={consultationUrl} />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Conditions */}
      <FeaturedConditions consultationUrl={consultationUrl} />

      {/* Process Steps */}
      <ProcessSteps consultationUrl={consultationUrl} />

      {/* Educational Content */}
      <EducationalContent />

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Call to Action */}
      <CallToAction tenant={tenantWithTemplate} consultationUrl={consultationUrl} />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  const tenant = await getCurrentTenant();

  if (!tenant) {
    return {
      title: 'Store Not Found',
    };
  }

  return {
    title: `${tenant.businessName} - Medical Cannabis Solutions`,
    description: `Premium medical cannabis products and consultations from ${tenant.businessName}`,
  };
}
