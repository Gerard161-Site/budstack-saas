'use client';

import './styles.css';

import React from 'react';
import { Tenant } from '@/types/client';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import LifestyleSection from './components/LifestyleSection';
import ConsultationCTA from './components/ConsultationCTA';

interface TemplateProps {
  tenant: Tenant;
  consultationUrl: string;
  productsUrl: string;
  contactUrl: string;
  heroImageUrl?: string | null;
  logoUrl?: string | null;
}

export default function GTACannabisTemplate({ tenant, consultationUrl, productsUrl, contactUrl }: TemplateProps) {
  const settings = (tenant.settings as any) || {};
  const pageContent = settings.pageContent || {};

  return (
    <div className="gta-template overflow-x-hidden">
      <Hero
        businessName={tenant.businessName}
        title={pageContent.homeHeroTitle}
        subtitle={pageContent.homeHeroSubtitle}
        heroImagePath={settings.heroImagePath}
        logoPath={settings.logoPath}
        consultationUrl={consultationUrl}
      />

      <ProductShowcase
        businessName={tenant.businessName}
        productsUrl={productsUrl}
      />

      <LifestyleSection
        businessName={tenant.businessName}
      />

      <ConsultationCTA
        businessName={tenant.businessName}
        consultationUrl={consultationUrl}
      />
    </div>
  );
}
