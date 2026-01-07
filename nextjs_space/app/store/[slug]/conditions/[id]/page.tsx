'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Tenant } from '@/types/client';

// Condition interface matching the seeded data structure
interface ConditionDetail {
  id: string;
  name: string; // The title
  description: string; // The subtitle/intro
  image: string;
  causes: { title: string; desc: string }[] | any;
  symptoms: {
    physical: string[];
    psychological?: string[];
  } | any;
  types?: { type: string; desc: string }[] | any;
  treatments: { title: string; desc: string }[] | any;
  medicalCannabis: {
    content1: string;
    content2: string;
  } | any;
  faqs: { question: string; answer: string }[] | any;
}

export default function ConditionPage() {
  const params = useParams();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [condition, setCondition] = useState<ConditionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // For mobile tabs if needed, or just sections

  // Reuse existing state for accordions
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // 1. Fetch Tenant
    fetch('/api/tenant/current?slug=' + params.slug)
      .then(res => res.json())
      .then(data => {
        setTenant(data);
      })
      .catch(console.error);

    // 2. Fetch Condition Detail
    // params.id is the condition slug (e.g. 'anxiety')
    // params.slug is the store/tenant slug (e.g. 'healingbuds')
    if (params.id) {
      fetch(`/api/tenant/conditions/${params.id}?tenantSlug=${params.slug}`)
        .then(async (res) => {
          if (res.status === 404) return null;
          if (!res.ok) throw new Error('Failed to fetch condition');
          return res.json();
        })
        .then(data => {
          setCondition(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [params.slug, params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--tenant-color-background)' }}>
        <p className="text-lg" style={{ color: 'var(--tenant-color-text)' }}>Loading condition details...</p>
      </div>
    );
  }

  if (!tenant || !condition) {
    // If not found, show 404
    if (!loading) notFound();
    return null;
  }

  // Helper to ensure JSON fields are arrays/objects even if DB has them as generic Json
  const causes = Array.isArray(condition.causes) ? condition.causes : [];
  const symptoms = (typeof condition.symptoms === 'object' && condition.symptoms) ? condition.symptoms : { physical: [] };
  const types = Array.isArray(condition.types) ? condition.types : [];
  const treatments = Array.isArray(condition.treatments) ? condition.treatments : [];
  const faqs = Array.isArray(condition.faqs) ? condition.faqs : [];
  const medicalCannabis = (typeof condition.medicalCannabis === 'object' && condition.medicalCannabis) ? condition.medicalCannabis : { content1: '', content2: '' };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tenant-color-background)' }}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden" style={{ backgroundColor: 'var(--tenant-color-surface)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link
              href={`/store/${params.slug}/conditions`}
              className="inline-flex items-center text-sm font-medium mb-8 hover:opacity-80 transition-opacity"
              style={{ color: 'var(--tenant-color-primary)' }}
            >
              <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
              Back to Conditions
            </Link>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
              style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
            >
              {condition.name}
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl opacity-90"
              style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
            >
              {condition.description}
            </p>
          </motion.div>
        </div>

        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-l from-current to-transparent" style={{ color: 'var(--tenant-color-primary)' }} />
        </div>
      </section>

      {/* Content Navigation (Sticky on Desktop) */}
      <div className="sticky top-20 z-40 border-b hidden lg:block" style={{ backgroundColor: 'var(--tenant-color-background)', borderColor: 'var(--tenant-color-border)' }}>
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {["Causes", "Symptoms", "Types", "Treatments", "Medical Cannabis", "FAQ"].map((section) => {
              // Only show 'Types' tab if types exist
              if (section === "Types" && types.length === 0) return null;
              const id = section.toLowerCase().replace(" ", "-");
              return (
                <a
                  key={section}
                  href={`#${id}`}
                  className="py-4 text-sm font-medium border-b-2 border-transparent hover:border-current transition-colors whitespace-nowrap"
                  style={{ color: 'var(--tenant-color-text)' }}
                >
                  {section}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">

            {/* Causes Section */}
            {causes.length > 0 && (
              <section id="causes" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--tenant-color-heading)' }}>Causes & Risk Factors</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {causes.map((cause: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-xl border group hover:shadow-md transition-all" style={{ borderColor: 'var(--tenant-color-border)' }}>
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors" style={{ color: 'var(--tenant-color-heading)' }}>{cause.title}</h3>
                      <p className="text-sm opacity-80" style={{ color: 'var(--tenant-color-text)' }}>{cause.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Symptoms Section */}
            <section id="symptoms" className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--tenant-color-heading)' }}>Common Symptoms</h2>
              <div className="space-y-8">
                {symptoms.physical && symptoms.physical.length > 0 && (
                  <div className="bg-opacity-50 p-8 rounded-2xl" style={{ backgroundColor: 'var(--tenant-color-surface)' }}>
                    <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: 'var(--tenant-color-heading)' }}>
                      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: 'var(--tenant-color-primary)' }} />
                      Physical Symptoms
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {symptoms.physical.map((symptom: string, idx: number) => (
                        <li key={idx} className="flex items-start opacity-90" style={{ color: 'var(--tenant-color-text)' }}>
                          <span className="mr-2">•</span> {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {symptoms.psychological && symptoms.psychological.length > 0 && (
                  <div className="bg-opacity-50 p-8 rounded-2xl" style={{ backgroundColor: 'var(--tenant-color-surface)' }}>
                    <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: 'var(--tenant-color-heading)' }}>
                      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: 'var(--tenant-color-secondary, var(--tenant-color-primary))' }} />
                      Psychological Symptoms
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {symptoms.psychological.map((symptom: string, idx: number) => (
                        <li key={idx} className="flex items-start opacity-90" style={{ color: 'var(--tenant-color-text)' }}>
                          <span className="mr-2">•</span> {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* Types Section - Conditional */}
            {types.length > 0 && (
              <section id="types" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--tenant-color-heading)' }}>Types & Variations</h2>
                <div className="space-y-4">
                  {types.map((type: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-xl border hover:border-current transition-colors" style={{ borderColor: 'var(--tenant-color-border)', color: 'var(--tenant-color-text)' }}>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--tenant-color-heading)' }}>{type.type}</h3>
                      <p className="opacity-80 text-sm">{type.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Treatments Section */}
            {treatments.length > 0 && (
              <section id="treatments" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--tenant-color-heading)' }}>Standard Treatments</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {treatments.map((treatment: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-xl" style={{ backgroundColor: 'var(--tenant-color-surface)' }}>
                      <h3 className="font-semibold mb-3" style={{ color: 'var(--tenant-color-heading)' }}>{treatment.title}</h3>
                      <p className="text-sm opacity-80" style={{ color: 'var(--tenant-color-text)' }}>{treatment.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Medical Cannabis Section */}
            <section id="medical-cannabis" className="scroll-mt-32">
              <div className="rounded-3xl p-8 md:p-12 text-white overflow-hidden relative" style={{ backgroundColor: 'var(--tenant-color-primary)' }}>
                <div className="relative z-10 space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold">Medical Cannabis Approach</h2>
                  <p className="text-lg opacity-95 leading-relaxed">
                    {medicalCannabis.content1}
                  </p>
                  <p className="text-lg opacity-95 leading-relaxed">
                    {medicalCannabis.content2}
                  </p>
                  <div className="pt-6">
                    <Link href="/contact">
                      <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                        Consult a Specialist
                      </button>
                    </Link>
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>
            </section>

            {/* FAQ Section */}
            {faqs.length > 0 && (
              <section id="faq" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--tenant-color-heading)' }}>Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq: any, idx: number) => (
                    <div
                      key={idx}
                      className="border rounded-xl overflow-hidden transition-all duration-200"
                      style={{ borderColor: 'var(--tenant-color-border)' }}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-opacity-50 transition-colors"
                        style={{ backgroundColor: 'var(--tenant-color-surface)' }}
                      >
                        <span className="font-semibold pr-4" style={{ color: 'var(--tenant-color-heading)' }}>{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}
                          style={{ color: 'var(--tenant-color-text)' }}
                        />
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-6 pt-0 border-t" style={{ borderColor: 'var(--tenant-color-border)', color: 'var(--tenant-color-text)' }}>
                              <div className="pt-4 opacity-90 leading-relaxed">
                                {faq.answer}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar / Table of Contents for Desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-48 p-8 rounded-2xl border" style={{ borderColor: 'var(--tenant-color-border)', backgroundColor: 'var(--tenant-color-surface)' }}>
              <h3 className="font-bold mb-6" style={{ color: 'var(--tenant-color-heading)' }}>Have questions?</h3>
              <p className="text-sm mb-6 opacity-80" style={{ color: 'var(--tenant-color-text)' }}>
                Our medical team is here to help you understand if medical cannabis is right for your condition.
              </p>
              <Link href="/contact" className="block w-full text-center py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--tenant-color-primary)' }}>
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
