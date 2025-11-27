'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Tenant } from '@prisma/client';

export default function ContactPage() {
  const { t } = useLanguage();
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    // Fetch tenant data on client side
    fetch('/api/tenant/current')
      .then(res => res.json())
      .then(data => setTenant(data))
      .catch(console.error);
  }, []);

  const tenantSettings = (tenant?.settings as any) || {};
  const contactInfo = tenantSettings.contactInfo || {};

  return (
    <div 
      className="min-h-screen pt-20" 
      style={{ 
        backgroundColor: 'var(--tenant-color-background, #ffffff)',
        fontFamily: 'var(--tenant-font-base, inherit)'
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{ 
              color: 'var(--tenant-color-heading, #111827)',
              fontFamily: 'var(--tenant-font-heading, inherit)'
            }}
          >
            {t('contact.title')}
          </h1>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--tenant-color-text, #1f2937)' }}
          >
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <h2 
              className="text-2xl font-semibold mb-6"
              style={{ color: 'var(--tenant-color-heading, #111827)' }}
            >
              {t('contact.send')}
            </h2>
            <form className="space-y-4">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--tenant-color-text, #1f2937)' }}
                >
                  {t('contact.name')}
                </label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--tenant-color-text, #1f2937)' }}
                >
                  {t('contact.email')}
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--tenant-color-text, #1f2937)' }}
                >
                  {t('contact.phone')}
                </label>
                <Input id="phone" type="tel" placeholder="+351 xxx xxx xxx" />
              </div>
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--tenant-color-text, #1f2937)' }}
                >
                  {t('contact.message')}
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder={t('contact.message')}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                style={{
                  backgroundColor: 'var(--tenant-color-primary, #059669)',
                  color: '#ffffff'
                }}
              >
                {t('contact.send')}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 
              className="text-2xl font-semibold mb-6"
              style={{ color: 'var(--tenant-color-heading, #111827)' }}
            >
              {t('contact.info.title')}
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: 'var(--tenant-color-primary-light, #d1fae5)'
                  }}
                >
                  <Mail 
                    className="w-6 h-6" 
                    style={{ color: 'var(--tenant-color-primary, #059669)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ color: 'var(--tenant-color-heading, #111827)' }}
                  >
                    {t('contact.info.email')}
                  </h3>
                  <p style={{ color: 'var(--tenant-color-text, #1f2937)' }}>
                    {contactInfo.email || 'info@healingbuds.pt'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: 'var(--tenant-color-primary-light, #d1fae5)'
                  }}
                >
                  <Phone 
                    className="w-6 h-6" 
                    style={{ color: 'var(--tenant-color-primary, #059669)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ color: 'var(--tenant-color-heading, #111827)' }}
                  >
                    {t('contact.info.phone')}
                  </h3>
                  <p style={{ color: 'var(--tenant-color-text, #1f2937)' }}>
                    {contactInfo.phone || '+351 XXX XXX XXX'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: 'var(--tenant-color-primary-light, #d1fae5)'
                  }}
                >
                  <MapPin 
                    className="w-6 h-6" 
                    style={{ color: 'var(--tenant-color-primary, #059669)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ color: 'var(--tenant-color-heading, #111827)' }}
                  >
                    {t('contact.info.address')}
                  </h3>
                  <p style={{ color: 'var(--tenant-color-text, #1f2937)' }}>
                    {contactInfo.address || 'Lisbon, Portugal'}
                  </p>
                </div>
              </div>

              <div 
                className="p-6 rounded-lg mt-8"
                style={{ 
                  backgroundColor: 'var(--tenant-color-surface, #f9fafb)'
                }}
              >
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--tenant-color-heading, #111827)' }}
                >
                  {t('contact.info.hours')}
                </h3>
                <div 
                  className="space-y-1"
                  style={{ color: 'var(--tenant-color-text, #1f2937)' }}
                >
                  <p>{t('contact.hours.weekdays')}</p>
                  <p>{t('contact.hours.saturday')}</p>
                  <p>{t('contact.hours.sunday')}</p>
                </div>
              </div>

              <div 
                className="p-6 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--tenant-color-info-light, #dbeafe)'
                }}
              >
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--tenant-color-heading, #111827)' }}
                >
                  {t('contact.emergency.title')}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--tenant-color-text, #1f2937)' }}
                >
                  {t('contact.emergency.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
