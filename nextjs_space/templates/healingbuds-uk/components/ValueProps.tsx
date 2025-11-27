'use client'

import { Sprout, Users, FlaskConical } from "lucide-react";

interface ValuePropsProps {
  consultationUrl: string;
}

const values = [
  {
    icon: Sprout,
    title: "MHRA Compliance",
    description: "Every stage from cultivation through extraction to final production is meticulously managed with unwavering attention to detail. Our MHRA-approved facilities meet the highest UK medical standards.",
  },
  {
    icon: Users,
    title: "Patient-Centered Care",
    description: "Our mission is to ensure medical cannabis reaches UK patients who need it most. Through evidence-based advocacy and education, we create pathways to safe, legal access across the United Kingdom.",
  },
  {
    icon: FlaskConical,
    title: "Research Excellence",
    description: "Collaborating with leading UK universities and research institutions, we advance scientific knowledge of cannabis therapeutics. Clinical research excellence is the foundation of everything we pursue.",
  },
];

const ValueProps = ({ consultationUrl }: ValuePropsProps) => {
  return (
    <div className="px-2">
      <section 
        className="py-12 sm:py-16 md:py-20 rounded-2xl sm:rounded-3xl"
        style={{ backgroundColor: 'var(--tenant-color-primary)' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 px-4" 
              style={{ 
                fontFamily: 'var(--tenant-font-heading)',
                letterSpacing: '0.02em', 
                lineHeight: '1.5' 
              }}
            >
              Excellence in UK Medical Cannabis
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white/10 group-hover:bg-white/15 transition-all duration-300 group-hover:scale-110">
                    <value.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 
                  className="text-xl sm:text-2xl font-semibold text-white mb-4 tracking-tight"
                  style={{ fontFamily: 'var(--tenant-font-heading)' }}
                >
                  {value.title}
                </h3>
                <p 
                  className="text-white/80 leading-relaxed text-sm sm:text-base"
                  style={{ fontFamily: 'var(--tenant-font-base)' }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValueProps;
