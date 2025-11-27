
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { Tenant } from '@prisma/client';

export default function AboutPage() {
  const { t } = useLanguage();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tenant/current')
      .then(res => res.json())
      .then(data => {
        setTenant(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  if (!tenant) {
    notFound();
  }

  const tenantSettings = (tenant.settings as any) || {};
  const customContent = tenantSettings.customContent || {};

  return (
    <div 
      className="min-h-screen pt-20" 
      style={{ 
        backgroundColor: 'var(--tenant-color-background, #ffffff)',
        fontFamily: 'var(--tenant-font-base, inherit)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
            style={{ 
              color: 'var(--tenant-color-heading, #111827)',
              fontFamily: 'var(--tenant-font-heading, inherit)'
            }}
          >
            {customContent.aboutTitle || t('about.title')}
          </h1>
          
          <div className="space-y-8">
            <p 
              className="text-lg"
              style={{ color: 'var(--tenant-color-text, #1f2937)' }}
            >
              {customContent.aboutContent || `${t('about.welcome')} ${tenant.businessName}, ${t('about.trustedPartner')}`}
            </p>

            <section>
              <h2 
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--tenant-color-heading, #111827)' }}
              >
                {t('about.mission.title')}
              </h2>
              <p style={{ color: 'var(--tenant-color-text, #1f2937)' }}>
                {t('about.mission.description')}
              </p>
            </section>

            <section>
              <h2 
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--tenant-color-heading, #111827)' }}
              >
                {t('about.whyChoose.title')}
              </h2>
              <ul 
                className="list-disc pl-6 space-y-2"
                style={{ color: 'var(--tenant-color-text, #1f2937)' }}
              >
                <li>{t('about.whyChoose.licensed')}</li>
                <li>{t('about.whyChoose.professional')}</li>
                <li>{t('about.whyChoose.quality')}</li>
                <li>{t('about.whyChoose.delivery')}</li>
                <li>{t('about.whyChoose.support')}</li>
              </ul>
            </section>

            <section>
              <h2 
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--tenant-color-heading, #111827)' }}
              >
                {t('about.qualityCommitment.title')}
              </h2>
              <p style={{ color: 'var(--tenant-color-text, #1f2937)' }}>
                {t('about.qualityCommitment.description')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
