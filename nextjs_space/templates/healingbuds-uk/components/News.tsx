'use client'

import Image from 'next/image';
import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NewsProps {
  businessName: string;
}

const newsItems = [
  {
    id: 1,
    category: "Company Updates",
    title: "MHRA Approval Milestone Achieved",
    excerpt: "Our UK facilities receive full regulatory approval, marking a significant step in bringing quality medical cannabis to British patients...",
    image: "/news-award.jpg",
    date: "2024-11-15"
  },
  {
    id: 2,
    category: "Product Innovation",
    title: "New UK-Specific Product Line Launch",
    excerpt: "Introducing our range of medical cannabis products specifically formulated for UK patient needs, developed in partnership with leading clinicians...",
    image: "/news-inhaler.jpg",
    date: "2024-10-28"
  },
  {
    id: 3,
    category: "Industry Insights",
    title: "UK Cannabis Conference Participation",
    excerpt: "Industry leaders gather to discuss regulatory frameworks, clinical evidence, and quality standards for medical cannabis in the United Kingdom...",
    image: "/news-conference.jpg",
    date: "2024-10-10"
  }
];

const News = ({ businessName }: NewsProps) => {
  return (
    <section 
      className="py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: 'var(--tenant-color-surface)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-light" 
            style={{ 
              fontFamily: 'var(--tenant-font-heading)',
              color: 'var(--tenant-color-heading)',
              letterSpacing: '0.01em', 
              lineHeight: '1.5' 
            }}
          >
            Latest News from {businessName}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg group"
              style={{ 
                borderColor: 'var(--tenant-color-border)',
                backgroundColor: 'var(--tenant-color-background)'
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--tenant-color-text)' }}>
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                
                <h3 
                  className="font-semibold text-lg mb-3 line-clamp-2"
                  style={{ 
                    fontFamily: 'var(--tenant-font-heading)',
                    color: 'var(--tenant-color-heading)' 
                  }}
                >
                  {item.title}
                </h3>
                
                <p 
                  className="text-sm line-clamp-3 mb-4"
                  style={{ 
                    fontFamily: 'var(--tenant-font-base)',
                    color: 'var(--tenant-color-text)' 
                  }}
                >
                  {item.excerpt}
                </p>
                
                <div 
                  className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                  style={{ color: 'var(--tenant-color-primary)' }}
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
