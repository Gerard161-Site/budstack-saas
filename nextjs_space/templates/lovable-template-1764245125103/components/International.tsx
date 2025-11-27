'use client';

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, TrendingUp } from "lucide-react";

const countries = [
  {
    id: 'portugal',
    name: 'Portugal',
    status: 'operational' as const,
    description: 'Our flagship European operations with state-of-the-art cultivation and processing facilities.',
    locations: ['Quarteira', 'Lisbon']
  },
  {
    id: 'spain',
    name: 'Spain',
    status: 'planned' as const,
    description: 'Upcoming expansion into the Spanish market with focus on medical cannabis distribution.',
    locations: ['Madrid']
  },
  {
    id: 'germany',
    name: 'Germany',
    status: 'planned' as const,
    description: 'Strategic entry into one of Europe\'s largest medical cannabis markets.',
    locations: ['Berlin', 'Frankfurt']
  }
];

export default function International() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-700 border-emerald-300/50';
      default:
        return 'bg-gradient-to-r from-slate-500/20 to-slate-600/20 text-slate-700 border-slate-300/50';
    }
  };

  return (
    <div className="px-2 mt-8">
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden rounded-2xl sm:rounded-3xl" style={{ backgroundColor: 'hsl(var(--section-color))' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none" />
      
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                Global Presence
              </h2>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Strategic expansion across three countries, building a comprehensive medical cannabis network
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 relative z-10">
              {countries.map((country, idx) => (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountry(selectedCountry === country.id ? null : country.id)}
                  className={`
                    group relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden
                    ${
                      selectedCountry === country.id 
                        ? 'border-primary/60 shadow-2xl scale-[1.03] bg-gradient-to-br from-card via-card to-primary/5' 
                        : 'border-border/30 bg-gradient-to-br from-card to-card/95 hover:border-primary/50 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1'
                    }
                  `}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
                    selectedCountry === country.id 
                      ? 'from-primary/10 via-transparent to-secondary/10 opacity-100' 
                      : 'from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100'
                  }`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg
                          ${
                            selectedCountry === country.id 
                              ? 'bg-gradient-to-br from-primary to-primary/80 scale-110 rotate-3' 
                              : 'bg-gradient-to-br from-muted to-muted/80 group-hover:from-primary/20 group-hover:to-primary/10 group-hover:scale-105'
                          }
                        `}>
                          <MapPin 
                            className={`w-7 h-7 transition-all duration-500 ${
                              selectedCountry === country.id 
                                ? 'text-white' 
                                : 'text-muted-foreground group-hover:text-primary'
                            }`} 
                            strokeWidth={2.5} 
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors duration-300">
                            {country.name}
                          </h3>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`font-bold tracking-wider text-[10px] px-3 py-1 rounded-full border-2 shadow-lg transition-all duration-300 ${getStatusColor(country.status)}`}
                      >
                        {country.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 min-h-[60px]">
                      {country.description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-xs">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-foreground transition-all duration-300 group-hover:bg-muted">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{country.locations.length} Locations</span>
                      </div>
                      {country.status === 'operational' && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500/15 to-emerald-600/15 text-emerald-700 border border-emerald-300/50">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-bold">Active</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}