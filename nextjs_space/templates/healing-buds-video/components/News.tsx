'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const newsItems = [
  {
    category: "Healing Buds News",
    title: "Healing Buds's Dr. Erridge and Dr. Sodergren Win at CIC Awards 2025!",
    description: "The Cannabis Industry Council (CIC) Awards 2025 represented the individuals driving progress, innovation and compassion...",
    image: "/award-hq.jpg",
    featured: true,
  },
  {
    category: "Healing Buds News",
    title: "Healing Buds Partners with Breathe Life Sciences to Launch Australia's First Certified Liquid Inhaler for Medical Cannabis",
    description: "",
    image: "/medical-products-hq.jpg",
    featured: false,
  },
  {
    category: "Industry News",
    title: "Reflections from PTMC 2025: Integrity, Communication, and the Future of Medicinal Cannabis",
    description: "",
    image: "/conference-hq.jpg",
    featured: false,
  },
];

export function News() {
  return (
    <section id="news" className="py-12 sm:py-16 md:py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
            <h2 className="font-pharma text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight" style={{ color: '#111827' }}>
              Latest news
            </h2>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl cursor-pointer hover:-translate-y-2 bg-white">
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  {item.featured && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A25]/90 to-[#1F2A25]/40 flex items-center justify-center">
                      <div className="text-center text-white px-4">
                        <p className="text-sm font-semibold text-emerald-400 mb-2 tracking-wider">WINNERS</p>
                        <h3 className="text-2xl font-bold leading-tight">
                          Contribution to<br/>Science Award
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <Badge 
                    variant="outline" 
                    className="font-body mb-3 border-teal-200 text-teal-700 bg-teal-50 rounded-full px-3 py-1"
                  >
                    {item.category}
                  </Badge>
                  <h3 className="font-pharma text-xl font-semibold text-gray-900 mb-2 leading-tight group-hover:text-teal-600 transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="font-body text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
