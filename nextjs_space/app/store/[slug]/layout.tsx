
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TenantThemeProvider } from '@/components/tenant-theme-provider';
import { getCurrentTenant } from '@/lib/tenant';
import { getFileUrl } from '@/lib/s3';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
// Import template registry
import { TEMPLATE_NAVIGATION, TEMPLATE_FOOTER } from '@/lib/template-registry';

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
    const SpecificNavigation = templateSlug ? TEMPLATE_NAVIGATION[templateSlug] : null;

    if (SpecificNavigation) {
      return (
        <SpecificNavigation
          businessName={tenantWithTemplate.businessName}
          logoUrl={logoUrl}
          tenant={tenantWithTemplate}
          subdomain={subdomain}
        />
      );
    }

    // Default platform navigation for other templates or if no specific navigation exists
    return <Navigation tenant={tenantWithTemplate} logoUrl={logoUrl} />;
  };

  // Render template-specific footer function
  const renderFooter = () => {
    const SpecificFooter = templateSlug ? TEMPLATE_FOOTER[templateSlug] : null;

    if (SpecificFooter) {
      return (
        <SpecificFooter
          businessName={tenantWithTemplate.businessName}
          logoUrl={logoUrl}
          tenant={tenantWithTemplate}
          consultationUrl={consultationUrl}
          productsUrl={productsUrl}
          contactUrl={contactUrl}
        />
      );
    }

    // Default platform footer for other templates or if no specific footer exists
    return <Footer tenant={tenantWithTemplate} logoUrl={logoUrl} />;
  };

  // Determine template class for CSS variable inheritance
  const getTemplateClass = () => {
    switch (templateSlug) {
      case 'wellness-nature':
        return 'wellness-template';
      case 'gta-cannabis':
        return 'gta-template';
      case 'healingbuds':
        return 'template-healingbuds';
      default:
        return '';
    }
  };

  return (
    <TenantThemeProvider tenant={tenantWithTemplate}>
      <div className={`min-h-screen ${getTemplateClass()}`}>
        {renderNavigation()}
        <main>{children}</main>
        {renderFooter()}
      </div>
    </TenantThemeProvider>
  );
}
