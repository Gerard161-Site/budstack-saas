'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Tenant } from '@/types/client';

interface Condition {
  id: string;
  name: string;
  image: string;
  category: string;
  categoryKey: string;
}

const conditionsData: Condition[] = [
  {
    id: "anxiety",
    name: "Anxiety Disorders",
    image: "/condition-anxiety.jpg",
    category: "Mental Health",
    categoryKey: "mentalHealth"
  },
  {
    id: "chronic-pain",
    name: "Chronic Pain",
    image: "/condition-chronic-pain.jpg",
    category: "Pain Management",
    categoryKey: "painManagement"
  },
  {
    id: "arthritis",
    name: "Arthritis",
    image: "/condition-arthritis.jpg",
    category: "Pain Management",
    categoryKey: "painManagement"
  },
  {
    id: "back-pain",
    name: "Back Pain",
    image: "/condition-back-pain.jpg",
    category: "Pain Management",
    categoryKey: "painManagement"
  },
  {
    id: "complex-regional-pain-syndrome",
    name: "Complex Regional Pain Syndrome (CRPS)",
    image: "/condition-crps.jpg",
    category: "Pain Management",
    categoryKey: "painManagement"
  },
  {
    id: "epilepsy",
    name: "Epilepsy",
    image: "/condition-epilepsy.jpg",
    category: "Neurological Disorders",
    categoryKey: "neurological"
  },
  {
    id: "insomnia",
    name: "Insomnia",
    image: "/condition-insomnia.jpg",
    category: "Sleep Disorders",
    categoryKey: "sleepDisorders"
  },
  {
    id: "migraines",
    name: "Migraines & Headaches",
    image: "/condition-migraines.jpg",
    category: "Pain Management",
    categoryKey: "painManagement"
  },
  {
    id: "multiple-sclerosis",
    name: "Multiple Sclerosis (MS)",
    image: "/condition-ms.jpg",
    category: "Neurological Disorders",
    categoryKey: "neurological"
  },
  {
    id: "neuropathic-pain",
    name: "Neuropathic Pain",
    image: "/condition-neuropathic-pain.jpg",
    category: "Pain Management",
    categoryKey: "painManagement"
  },
  {
    id: "parkinsons-disease",
    name: "Parkinson's Disease",
    image: "/condition-parkinsons.jpg",
    category: "Neurological Disorders",
    categoryKey: "neurological"
  },
  {
    id: "ptsd",
    name: "PTSD",
    image: "/condition-ptsd.jpg",
    category: "Mental Health",
    categoryKey: "mentalHealth"
  },
];

const categories = [
  { key: "all", label: "All Conditions" },
  { key: "painManagement", label: "Pain Management" },
  { key: "mentalHealth", label: "Mental Health" },
  { key: "neurological", label: "Neurological Disorders" },
  { key: "sleepDisorders", label: "Sleep Disorders" },
];

export default function ConditionsPage() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--tenant-color-background)' }}>
        <p className="text-lg" style={{ color: 'var(--tenant-color-text)' }}>Loading...</p>
      </div>
    );
  }

  if (!tenant) {
    notFound();
  }

  const filteredConditions = conditionsData.filter(condition => {
    const matchesCategory = selectedCategory === "all" || condition.categoryKey === selectedCategory;
    const matchesSearch = condition.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-24 lg:pb-0" style={{ backgroundColor: 'var(--tenant-color-background)' }}>
      <main className="pt-28 md:pt-32">
        {/* Hero Section */}
        <section style={{ backgroundColor: 'var(--tenant-color-background)' }} className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="max-w-5xl">
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
                  style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                >
                  Conditions We Treat
                </h1>
                <p
                  className="text-xl md:text-2xl max-w-3xl font-light mb-8"
                  style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
                >
                  Explore how medical cannabis can help manage your condition. Learn about symptoms, treatments, and personalized care options.
                </p>
                <p
                  className="text-lg max-w-3xl font-light"
                  style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
                >
                  Note: This information is for educational purposes only. Consult with our medical professionals for personalized advice.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section
          className="py-12"
          style={{ backgroundColor: 'rgba(var(--tenant-color-primary-rgb, 28, 79, 77), 0.05)' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: 'var(--tenant-color-text)', opacity: 0.5 }}
                  />
                  <input
                    type="text"
                    placeholder="Search conditions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--tenant-color-background)',
                      borderColor: 'var(--tenant-color-border, rgba(0,0,0,0.2))',
                      color: 'var(--tenant-color-text)',
                      fontFamily: 'var(--tenant-font-base)'
                    }}
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${selectedCategory === category.key
                          ? "shadow-lg"
                          : "border"
                        }`}
                      style={{
                        backgroundColor: selectedCategory === category.key ? 'var(--tenant-color-primary)' : 'var(--tenant-color-background)',
                        color: selectedCategory === category.key ? 'white' : 'var(--tenant-color-text)',
                        borderColor: selectedCategory === category.key ? 'transparent' : 'var(--tenant-color-border, rgba(0,0,0,0.2))',
                        fontFamily: 'var(--tenant-font-base)'
                      }}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Conditions Grid */}
        <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--tenant-color-background)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {filteredConditions.map((condition) => (
                  <motion.div
                    key={condition.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.3,
                      layout: { duration: 0.3 }
                    }}
                  >
                    <Link href={`conditions/${condition.id}`}>
                      <div
                        className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border"
                        style={{
                          backgroundColor: 'var(--tenant-color-surface, var(--tenant-color-background))',
                          borderColor: 'var(--tenant-color-border, rgba(0,0,0,0.2))'
                        }}
                      >
                        <div className="h-48 overflow-hidden relative">
                          <Image
                            src={condition.image}
                            alt={condition.name}
                            fill
                            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5">
                          <h3
                            className="text-xl font-semibold mb-2 group-hover:opacity-80 transition-colors"
                            style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                          >
                            {condition.name}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
                          >
                            {condition.category}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredConditions.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center py-16">
                  <p
                    className="text-xl"
                    style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
                  >
                    No conditions found matching your search.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-20 md:py-32"
          style={{ backgroundColor: 'var(--tenant-color-primary)' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="max-w-4xl mx-auto text-center">
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 tracking-tight text-white"
                  style={{ fontFamily: 'var(--tenant-font-heading)' }}
                >
                  Ready to Explore Treatment Options?
                </h2>
                <p
                  className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white opacity-90"
                  style={{ fontFamily: 'var(--tenant-font-base)' }}
                >
                  Schedule a consultation with our medical professionals to discuss personalized treatment plans.
                </p>
                <Link href="contact">
                  <button
                    className="px-8 py-3 text-lg rounded-lg font-semibold border transition-all duration-200 hover:shadow-lg"
                    style={{
                      backgroundColor: 'white',
                      color: 'var(--tenant-color-primary)',
                      fontFamily: 'var(--tenant-font-base)'
                    }}
                  >
                    Contact Us →
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
