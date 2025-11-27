'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Brain, Bone, Activity, Zap, Moon, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tenant } from '@prisma/client';

export default function TenantConditionsPage() {
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!tenant) {
    notFound();
  }

  const conditions = [
    {
      icon: Brain,
      category: 'Chronic Pain',
      description: 'Fibromyalgia, arthritis, neuropathic pain, and other persistent pain conditions',
      percentage: '21% of patients'
    },
    {
      icon: Zap,
      category: 'Anxiety & Depression',
      description: 'Generalized anxiety, PTSD, depression, and mood disorders',
      percentage: '17.6% of patients'
    },
    {
      icon: Activity,
      category: 'Neurological Conditions',
      description: 'Multiple sclerosis, epilepsy, Parkinson\'s disease, and seizure disorders',
      percentage: '15% of patients'
    },
    {
      icon: Moon,
      category: 'Sleep Disorders',
      description: 'Insomnia, sleep apnea, restless leg syndrome, and other sleep issues',
      percentage: '12% of patients'
    },
    {
      icon: Bone,
      category: 'Gastrointestinal',
      description: 'Crohn\'s disease, IBS, IBD, and digestive system disorders',
      percentage: '8% of patients'
    },
    {
      icon: Shield,
      category: 'Cancer Support',
      description: 'Managing cancer treatment side effects and palliative care',
      percentage: '6% of patients'
    },
  ];

  return (
    <div 
      className="min-h-screen pt-20" 
      style={{ 
        backgroundColor: 'var(--tenant-color-background, #ffffff)',
        fontFamily: 'var(--tenant-font-base, inherit)'
      }}
    >
      {/* Hero Section */}
      <section 
        className="py-20"
        style={{ 
          background: 'linear-gradient(135deg, var(--tenant-color-surface, #f9fafb) 0%, var(--tenant-color-background, #ffffff) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-8"
              style={{ 
                color: 'var(--tenant-color-heading, #111827)',
                fontFamily: 'var(--tenant-font-heading, inherit)'
              }}
            >
              Conditions We Can Help With
            </h1>
            <p 
              className="text-xl leading-relaxed"
              style={{ color: 'var(--tenant-color-text, #1f2937)' }}
            >
              Medical cannabis has been shown to provide relief for a wide range of health conditions.
              Our doctors specialize in evaluating and treating these conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--tenant-color-surface, #f9fafb)',
                  borderColor: 'var(--tenant-color-border, #e5e7eb)',
                  borderWidth: '1px',
                  boxShadow: 'var(--tenant-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))'
                }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: 'var(--tenant-color-primary, #059669)',
                    color: '#ffffff'
                  }}
                >
                  <condition.icon className="w-8 h-8" />
                </div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: 'var(--tenant-color-heading, #111827)' }}
                >
                  {condition.category}
                </h3>
                <p 
                  className="text-sm mb-3"
                  style={{ color: 'var(--tenant-color-text, #1f2937)' }}
                >
                  {condition.description}
                </p>
                <div 
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--tenant-color-text-muted, #6b7280)' }}
                >
                  <Activity className="w-4 h-4" />
                  <span>{condition.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16"
        style={{ 
          background: 'linear-gradient(135deg, var(--tenant-color-primary, #059669) 0%, var(--tenant-color-secondary, #10b981) 100%)',
          color: '#ffffff'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#ffffff' }}>
            Find Out If You Qualify
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Take the first step towards relief with a comprehensive medical assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/store/${tenant.subdomain}/consultation`}>
              <Button 
                size="lg" 
                style={{
                  backgroundColor: '#ffffff',
                  color: 'var(--tenant-color-primary, #059669)'
                }}
              >
                Start Consultation
              </Button>
            </Link>
            <Link href={`/store/${tenant.subdomain}/how-it-works`}>
              <Button 
                size="lg" 
                variant="outline"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#ffffff',
                  borderWidth: '2px',
                  color: '#ffffff'
                }}
                className="hover:bg-white hover:text-gray-900"
              >
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
