import { notFound } from 'next/navigation';
import { getCurrentTenant } from '@/lib/tenant';
import { prisma } from '@/lib/db';
import { getFileUrl } from '@/lib/s3';

// Import template registry
import { TEMPLATE_COMPONENTS } from '@/lib/template-registry';

// Import theme provider
import { TenantThemeProvider } from '@/components/tenant-theme-provider';

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

  // Fetch tenant with active template
  const tenantWithTemplate = await prisma.tenant.findUnique({
    where: { id: tenant.id },
    include: {
      template: true, // Base template (legacy)
      activeTenantTemplate: {
        include: {
          baseTemplate: true,
        },
      },
    },
  });

  if (!tenantWithTemplate) {
    notFound();
  }

  // URLs for template props
  const consultationUrl = `/store/${tenantWithTemplate.subdomain}/consultation`;
  const productsUrl = `/store/${tenantWithTemplate.subdomain}/products`;
  const contactUrl = `/store/${tenantWithTemplate.subdomain}/contact`;
  const aboutUrl = `/store/${tenantWithTemplate.subdomain}/about`;

  // NEW: Check if tenant has an active TenantTemplate
  if (tenantWithTemplate.activeTenantTemplate) {
    const tenantTemplate = tenantWithTemplate.activeTenantTemplate;
    const baseTemplate = tenantTemplate.baseTemplate;

    // Fetch latest posts for the template
    const latestPosts = await prisma.post.findMany({
      where: {
        tenantId: tenant.id,
        published: true
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: { author: true }
    });

    // Get the template component
    const TemplateComponent = TEMPLATE_COMPONENTS[baseTemplate.slug!];

    if (TemplateComponent) {
      // Build template props with tenant customizations
      const templateProps = {
        tenant: tenantWithTemplate,
        consultationUrl,
        productsUrl,
        contactUrl,
        aboutUrl,
        // Pass tenant template customizations
        heroImageUrl: tenantTemplate.heroImageUrl || null,
        logoUrl: tenantTemplate.logoUrl || null,
        // Pass design system and content customizations
        designSystem: tenantTemplate.designSystem,
        pageContent: tenantTemplate.pageContent,
        navigation: tenantTemplate.navigation,
        footer: tenantTemplate.footer,
        // Pass dynamic content
        posts: latestPosts,
      };

      // Wrap in theme provider to inject CSS variables
      return (
        <TenantThemeProvider tenantTemplate={tenantTemplate}>
          <TemplateComponent {...templateProps} />
        </TenantThemeProvider>
      );
    }
  }

  // LEGACY: Fallback to old system if no TenantTemplate
  // (For existing tenants not yet migrated)
  const settings = (tenantWithTemplate.settings as any) || {};
  let heroImageUrl = null;
  let logoUrl = null;

  if (settings.heroImagePath) {
    try {
      if (
        settings.heroImagePath.startsWith('/templates/') ||
        settings.heroImagePath.startsWith('/public/')
      ) {
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
      if (
        settings.logoPath.startsWith('/templates/') ||
        settings.logoPath.startsWith('/public/')
      ) {
        logoUrl = settings.logoPath;
      } else {
        logoUrl = await getFileUrl(settings.logoPath);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  }

  // Check if there's a template assigned (legacy)
  if (tenantWithTemplate.template?.slug) {
    const templateSlug = tenantWithTemplate.template.slug;
    const TemplateComponent = TEMPLATE_COMPONENTS[templateSlug];

    if (TemplateComponent) {
      const templateProps = {
        tenant: tenantWithTemplate,
        consultationUrl,
        productsUrl,
        contactUrl,
        heroImageUrl,
        logoUrl,
      };

      return <TemplateComponent {...templateProps} />;
    }
  }

  // Default/Fallback template (original design)
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        tenant={tenantWithTemplate}
        heroImageUrl={heroImageUrl}
        consultationUrl={consultationUrl}
      />

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
