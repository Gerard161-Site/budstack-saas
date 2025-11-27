'use client'

import Link from 'next/link';
import { Mail, MapPin } from "lucide-react";

interface FooterProps {
  businessName: string;
  consultationUrl: string;
  productsUrl: string;
  contactUrl: string;
}

const Footer = ({ businessName, consultationUrl, productsUrl, contactUrl }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="text-white" style={{ backgroundColor: 'hsl(var(--section-color))' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-10 sm:py-12 border-b border-white/10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <div className="inline-block mb-4">
                <div className="text-white font-bold text-lg" style={{ fontFamily: 'var(--tenant-font-heading)' }}>{businessName}</div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontFamily: 'var(--tenant-font-base)' }}>
                Leading UK medical cannabis provider with MHRA-approved facilities. Committed to excellence, compliance, and patient care.
              </p>
              <div className="flex items-start gap-2 text-white/60 text-xs mb-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span style={{ fontFamily: 'var(--tenant-font-base)' }}>
                  United Kingdom<br />
                  MHRA-Approved Facilities
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href={contactUrl} className="hover:text-white transition-colors" style={{ fontFamily: 'var(--tenant-font-base)' }}>
                  Contact Us
                </a>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              
              {/* Company */}
              <div>
                <h4 className="font-pharma font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
                  Company
                </h4>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/about-us" className="font-body text-sm text-white/60 hover:text-white transition-colors inline-block">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/what-we-do" className="font-body text-sm text-white/60 hover:text-white transition-colors inline-block">
                      Our Standards
                    </Link>
                  </li>
                  <li>
                    <Link href="/research" className="font-body text-sm text-white/60 hover:text-white transition-colors inline-block">
                      Research
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-pharma font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
                  Resources
                </h4>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/contact" className="font-body text-sm text-white/60 hover:text-white transition-colors inline-block">
                      Patient Access
                    </Link>
                  </li>
                  <li>
                    <Link href="/research" className="font-body text-sm text-white/60 hover:text-white transition-colors inline-block">
                      Healthcare Professionals
                    </Link>
                  </li>
                  <li>
                    <Link href="/#news" className="font-body text-sm text-white/60 hover:text-white transition-colors inline-block">
                      News & Updates
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-pharma font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
                  Legal
                </h4>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/privacy-policy" className="font-body text-sm text-white/60 hover:text-white transition-colors inline-block">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-service" className="font-body text-sm text-white/60 hover:text-white transition-colors inline-block">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="font-body text-sm text-white/60 hover:text-white transition-colors inline-block">
                      Compliance
                    </Link>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-xs" style={{ fontFamily: 'var(--tenant-font-base)' }}>
              © {currentYear} {businessName}. All rights reserved.
            </p>
            <p className="text-white/40 text-xs" style={{ fontFamily: 'var(--tenant-font-base)' }}>
              Committed to advancing UK medical cannabis
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
