'use client'

import { MapPin, Building2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InternationalProps {
  businessName: string;
  contactUrl: string;
}

const International = ({ businessName, contactUrl }: InternationalProps) => {
  const countries = [
    {
      code: "GB",
      name: "United Kingdom",
      status: "operational",
      description: "Headquarters and primary operations",
      locations: ["London", "Manchester"]
    },
    {
      code: "IE",
      name: "Ireland",
      status: "operational",
      description: "European distribution hub",
      locations: ["Dublin"]
    },
    {
      code: "PT",
      name: "Portugal",
      status: "planned",
      description: "Cultivation partnership",
      locations: ["Lisbon"]
    }
  ];

  return (
    <section 
      className="py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: 'var(--tenant-color-background)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-light mb-4" 
            style={{ 
              fontFamily: 'var(--tenant-font-heading)',
              color: 'var(--tenant-color-heading)',
              letterSpacing: '0.01em', 
              lineHeight: '1.5' 
            }}
          >
            {businessName} International Presence
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--tenant-font-base)',
              color: 'var(--tenant-color-text)' 
            }}
          >
            Expanding access to quality medical cannabis across Europe
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {countries.map((country) => (
            <div
              key={country.code}
              className="border rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
              style={{ 
                borderColor: 'var(--tenant-color-border)',
                backgroundColor: 'var(--tenant-color-surface)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" style={{ color: 'var(--tenant-color-primary)' }} />
                  <h3 
                    className="font-semibold text-lg"
                    style={{ 
                      fontFamily: 'var(--tenant-font-heading)',
                      color: 'var(--tenant-color-heading)' 
                    }}
                  >
                    {country.name}
                  </h3>
                </div>
                {country.status === 'operational' && (
                  <Badge variant="default" style={{ backgroundColor: 'var(--tenant-color-success)', color: '#ffffff' }}>
                    Active
                  </Badge>
                )}
                {country.status === 'planned' && (
                  <Badge variant="secondary">Planned</Badge>
                )}
              </div>
              
              <p 
                className="text-sm mb-4"
                style={{ 
                  fontFamily: 'var(--tenant-font-base)',
                  color: 'var(--tenant-color-text)' 
                }}
              >
                {country.description}
              </p>
              
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--tenant-color-text)' }}>
                <Building2 className="w-4 h-4" />
                <span>{country.locations.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={contactUrl}
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: 'var(--tenant-color-primary)',
              color: '#ffffff',
              fontFamily: 'var(--tenant-font-base)'
            }}
          >
            Contact Us About Expansion
          </a>
        </div>
      </div>
    </section>
  );
};

export default International;
