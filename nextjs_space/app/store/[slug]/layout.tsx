
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TenantThemeProvider } from '@/components/tenant-theme-provider';
import { getCurrentTenant } from '@/lib/tenant';
import { getFileUrl } from '@/lib/s3';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { Footer as HealingBudsFooter } from '@/templates/healing-buds-video/components/Footer';
import GTACannabisFooter from '@/templates/gta-cannabis/components/Footer';
import WellnessFooter from '@/templates/wellness-nature/components/Footer';
import HealingBudsUKFooter from '@/templates/healingbuds-uk/components/Footer';
import LovableFooter from '@/templates/lovable-template-1764245125103/components/Footer';
import { Navigation as HealingBudsNavigation } from '@/templates/healing-buds-video/components/Navigation';
import { Navigation as GTACannabisNavigation } from '@/templates/gta-cannabis/components/Navigation';
import { default as WellnessNavigation } from '@/templates/wellness-nature/components/Navigation';
import LovableNavigation from '@/templates/lovable-template-1764245125103/components/Navigation';

export default async function TenantStoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const tenant = await getCurrentTenant();

  if (!tenant) {
    notFound();
  }

  // Fetch tenant with template relation
  const tenantWithTemplate = await prisma.tenant.findUnique({
    where: { id: tenant.id },
    include: { template: true }
  });

  if (!tenantWithTemplate) {
    notFound();
  }

  // Get logo URL if uploaded
  const settings = (tenantWithTemplate.settings as any) || {};
  let logoUrl: string | null = null;
  
  if (settings.logoPath) {
    // If logoPath starts with '/', it's a public folder path - use directly
    if (settings.logoPath.startsWith('/')) {
      logoUrl = settings.logoPath;
    } else {
      // Otherwise it's an S3 path - fetch the signed URL
      try {
        logoUrl = await getFileUrl(settings.logoPath);
      } catch (error) {
        console.error('Error fetching logo from S3:', error);
      }
    }
  }

  // Determine which footer to render based on template
  const templateSlug = tenantWithTemplate.template?.slug;
  const subdomain = tenantWithTemplate.subdomain;

  // Prepare URLs for template footers
  const consultationUrl = `/store/${subdomain}/consultation`;
  const productsUrl = `/store/${subdomain}/products`;
  const contactUrl = `/store/${subdomain}/contact`;
  const aboutUrl = `/store/${subdomain}/about`;

  // Extract contact info from settings
  const contactEmail = settings.contactEmail || 'info@example.com';
  const contactPhone = settings.contactPhone || '+1 234 567 890';
  const address = settings.address || 'Your Business Address';
  const socialLinks = settings.socialMedia || {};

  // Render template-specific navigation function
  const renderNavigation = () => {
    if (templateSlug === 'healing-buds-video') {
      return (
        <HealingBudsNavigation
          businessName={tenantWithTemplate.businessName}
          subdomain={subdomain}
          logoUrl={logoUrl}
        />
      );
    } else if (templateSlug === 'gta-cannabis') {
      return (
        <GTACannabisNavigation
          businessName={tenantWithTemplate.businessName}
          subdomain={subdomain}
          logoUrl={logoUrl}
        />
      );
    } else if (templateSlug === 'wellness-nature') {
      return (
        <WellnessNavigation
          businessName={tenantWithTemplate.businessName}
          logoUrl={logoUrl}
          tenant={tenantWithTemplate}
        />
      );
    } else if (templateSlug === 'lovable-template-1764245125103') {
      return (
        <LovableNavigation
          businessName={tenantWithTemplate.businessName}
          subdomain={subdomain}
          logoUrl={logoUrl}
        />
      );
    } else {
      // Default platform navigation for other templates
      return <Navigation tenant={tenantWithTemplate} logoUrl={logoUrl} />;
    }
  };

  // Render template-specific footer function
  const renderFooter = () => {
    if (templateSlug === 'healing-buds-video') {
      return (
        <HealingBudsFooter
          businessName={tenantWithTemplate.businessName}
          logoUrl={logoUrl}
          contactEmail={contactEmail}
          contactPhone={contactPhone}
          address={address}
          aboutUrl={aboutUrl}
          productsUrl={productsUrl}
          contactUrl={contactUrl}
          socialLinks={socialLinks}
        />
      );
    } else if (templateSlug === 'gta-cannabis') {
      return (
        <GTACannabisFooter
          businessName={tenantWithTemplate.businessName}
          consultationUrl={consultationUrl}
          productsUrl={productsUrl}
          contactUrl={contactUrl}
        />
      );
    } else if (templateSlug === 'wellness-nature') {
      return (
        <WellnessFooter
          businessName={tenantWithTemplate.businessName}
          consultationUrl={consultationUrl}
          productsUrl={productsUrl}
          contactUrl={contactUrl}
        />
      );
    } else if (templateSlug === 'healingbuds-uk') {
      return (
        <HealingBudsUKFooter
          businessName={tenantWithTemplate.businessName}
          consultationUrl={consultationUrl}
          productsUrl={productsUrl}
          contactUrl={contactUrl}
        />
      );
    } else if (templateSlug === 'lovable-template-1764245125103') {
      return (
        <LovableFooter
          businessName={tenantWithTemplate.businessName}
          consultationUrl={consultationUrl}
          productsUrl={productsUrl}
          contactUrl={contactUrl}
          logoUrl={logoUrl}
        />
      );
    } else {
      // Default platform footer for other templates
      return <Footer tenant={tenantWithTemplate} logoUrl={logoUrl} />;
    }
  };

  return (
    <TenantThemeProvider tenant={tenantWithTemplate}>
      <div className="min-h-screen">
        {renderNavigation()}
        <main>{children}</main>
        {renderFooter()}
      </div>
    </TenantThemeProvider>
  );
}
