'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const countries = [
  {
    id: 'portugal',
    name: 'Portugal',
    status: 'LIVE' as const,
    order: 1,
    description: 'EU GMP-certified cultivation and processing facilities with comprehensive operations and sales.',
    locations: ['Quarteira']
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    status: 'LIVE' as const,
    order: 2,
    description: 'Medical cannabis clinics and pharmacy network serving patients nationwide.',
    locations: ['London', 'Manchester']
  },
  {
    id: 'australia',
    name: 'Australia',
    status: 'NEXT' as const,
    order: 3,
    description: 'Strategic partnerships for advanced delivery systems and patient access programs.',
    locations: ['Sydney']
  },
  {
    id: 'canada',
    name: 'Canada',
    status: 'LIVE' as const,
    order: 4,
    description: 'Pharmaceutical-grade production and research collaboration with leading institutions.',
    locations: ['Toronto', 'Vancouver']
  },
  {
    id: 'germany',
    name: 'Germany',
    status: 'UPCOMING' as const,
    order: 5,
    description: 'Preparing market entry with EU-compliant products and distribution networks.',
    locations: ['Berlin']
  },
];

const getStatusColor = (status: 'LIVE' | 'NEXT' | 'UPCOMING') => {
  switch (status) {
    case 'LIVE':
      return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20';
    case 'NEXT':
      return 'bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20';
    case 'UPCOMING':
      return 'bg-slate-500/10 text-slate-600 border-slate-200 hover:bg-slate-500/20';
  }
};

export function International({ contactUrl }: { contactUrl: string }) {
  return (
    <section className="py-16 sm:py-20 md:py-24" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-pharma mb-4 tracking-tight" style={{ color: '#111827' }}>
                Global Presence
              </h2>
              <p className="text-lg sm:text-xl font-body max-w-2xl mx-auto leading-relaxed" style={{ color: '#4b5563' }}>
                Strategic expansion across five countries, building a comprehensive medical cannabis network
              </p>
            </div>
          </motion.div>

          {/* Country List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {countries.map((country, idx) => (
                <div
                  key={country.id}
                  className="group relative p-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-teal-300 hover:shadow-md hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-teal-50 flex items-center justify-center transition-all duration-300">
                        <MapPin className="w-6 h-6 text-gray-600" strokeWidth={2} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold font-pharma text-gray-900">
                          {country.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-body">
                          Stage {country.order}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`font-pharma font-semibold tracking-wide text-[10px] px-2.5 py-0.5 ${getStatusColor(country.status)}`}
                    >
                      {country.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 font-body leading-relaxed mb-4">
                    {country.description}
                  </p>

                  <div className="flex gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Building2 className="w-3.5 h-3.5" />
                      <span className="font-body">{country.locations.length} Locations</span>
                    </div>
                    {country.status === 'LIVE' && (
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="font-body font-medium">Active</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-200">
              <h4 className="text-sm font-bold font-pharma text-gray-900 mb-4 tracking-wide uppercase">
                Operation Types
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
                  <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: '#2C5F4F' }} />
                  <span className="text-sm text-gray-900 font-body font-medium">Operations & Sales</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
                  <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: '#13303D' }} />
                  <span className="text-sm text-gray-900 font-body font-medium">Export Sales Only</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
                  <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: '#6B7280' }} />
                  <span className="text-sm text-gray-900 font-body font-medium">Operations Only</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href={contactUrl}
              className="inline-block px-8 py-4 rounded-full font-body font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#0d9488', color: '#ffffff' }}
            >
              Contact Us About Expansion
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
