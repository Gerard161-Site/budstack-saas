'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { CartDropdown } from "@/components/cart-dropdown";

interface NavigationProps {
  businessName: string;
  subdomain: string;
  logoUrl?: string | null;
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation({ businessName, subdomain, logoUrl }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession() || {};
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;
  
  const isWhatWeDoActive = [
    `/store/${subdomain}/what-we-do`,
    `/store/${subdomain}/cultivating-processing`,
    `/store/${subdomain}/manufacture-distribution`,
    `/store/${subdomain}/medical-clinics`,
    `/store/${subdomain}/online-pharmacy`
  ].includes(pathname || '');

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary origin-left z-[60]"
        style={{ 
          scaleX,
          transformOrigin: "0%"
        }}
      />
      
      <header 
        className={cn(
          "fixed top-2 left-2 right-2 z-50 backdrop-blur-xl rounded-xl transition-all duration-500 ease-out border",
          scrolled 
            ? "shadow-2xl border-white/20 scale-[0.99]" 
            : "shadow-sm border-white/10"
        )}
        style={{ 
          backgroundColor: scrolled ? 'rgba(42, 61, 58, 0.98)' : 'rgba(42, 61, 58, 0.95)',
          transition: 'background-color 0.5s ease-out, transform 0.5s ease-out'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500 ease-out",
            scrolled ? "h-16 md:h-20" : "h-20 md:h-28"
          )}>
            <Link href={`/store/${subdomain}`} className="flex items-center flex-shrink-0 group">
              {logoUrl ? (
                <Image 
                  src={logoUrl}
                  alt={`${businessName} Logo`}
                  width={scrolled ? 160 : 200}
                  height={scrolled ? 64 : 80}
                  className={cn(
                    "w-auto object-contain transition-all duration-500 ease-out group-hover:scale-105",
                    scrolled ? "h-10 sm:h-12 md:h-16" : "h-12 sm:h-16 md:h-20"
                  )}
                />
              ) : (
                <span className="text-white font-bold text-xl">{businessName}</span>
              )}
            </Link>
          
            <nav className={cn(
              "hidden md:flex items-center transition-all duration-500 ease-out",
              scrolled ? "space-x-4" : "space-x-6"
            )}>
              <div 
                className="relative"
                onMouseEnter={() => setWhatWeDoOpen(true)}
                onMouseLeave={() => setWhatWeDoOpen(false)}
              >
                <button 
                  className={cn(
                    "font-body flex items-center gap-1 font-medium transition-all duration-300 ease-out relative rounded-md hover:scale-105",
                    scrolled ? "text-sm px-2.5 py-1.5" : "text-sm px-3 py-1.5",
                    isWhatWeDoActive
                      ? "text-white bg-white/10" 
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  What We Do
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-150", whatWeDoOpen && "rotate-180")} />
                </button>
                
                <div 
                  className={cn(
                    "absolute top-full left-0 mt-2 w-72 bg-background rounded-xl shadow-card border border-border/40 overflow-hidden transition-all duration-150 z-50",
                    whatWeDoOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                  )}
                >
                  <Link
                    href={`/store/${subdomain}/cultivating-processing`}
                    className="block px-4 py-3 text-foreground hover:bg-muted transition-colors border-b border-border"
                    onClick={() => setWhatWeDoOpen(false)}
                  >
                    <div className="font-medium">Cultivating & Processing</div>
                    <div className="text-sm text-muted-foreground">Pharmaceutical-grade cultivation</div>
                  </Link>
                  <Link
                    href={`/store/${subdomain}/manufacture-distribution`}
                    className="block px-4 py-3 text-foreground hover:bg-muted transition-colors border-b border-border"
                    onClick={() => setWhatWeDoOpen(false)}
                  >
                    <div className="font-medium">Manufacture & Distribution</div>
                    <div className="text-sm text-muted-foreground">Global supply chain excellence</div>
                  </Link>
                  <Link
                    href={`/store/${subdomain}/medical-clinics`}
                    className="block px-4 py-3 text-foreground hover:bg-muted transition-colors border-b border-border"
                    onClick={() => setWhatWeDoOpen(false)}
                  >
                    <div className="font-medium">Medical Cannabis Clinics</div>
                    <div className="text-sm text-muted-foreground">Patient-centered care</div>
                  </Link>
                  <Link
                    href={`/store/${subdomain}/online-pharmacy`}
                    className="block px-4 py-3 text-foreground hover:bg-muted transition-colors"
                    onClick={() => setWhatWeDoOpen(false)}
                  >
                    <div className="font-medium">Online Medical Cannabis Pharmacy</div>
                    <div className="text-sm text-muted-foreground">Convenient access to care</div>
                  </Link>
                </div>
              </div>
              <Link 
                href={`/store/${subdomain}/research`}
                className={cn(
                  "font-body font-medium transition-all duration-300 ease-out rounded-md hover:scale-105",
                  scrolled ? "text-sm px-2.5 py-1.5" : "text-sm px-3 py-1.5",
                  isActive(`/store/${subdomain}/research`) 
                    ? "text-white bg-white/10" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                Research
              </Link>
              <Link 
                href={`/store/${subdomain}/about`}
                className={cn(
                  "font-body flex items-center gap-1 font-medium transition-all duration-300 ease-out rounded-md hover:scale-105",
                  scrolled ? "text-sm px-2.5 py-1.5" : "text-sm px-3 py-1.5",
                  isActive(`/store/${subdomain}/about`) 
                    ? "text-white bg-white/10" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                About Us
                <ChevronDown className="w-4 h-4" />
              </Link>
              <Link 
                href={`/store/${subdomain}/contact`}
                className={cn(
                  "font-body font-medium transition-all duration-300 ease-out rounded-md hover:scale-105",
                  scrolled ? "text-sm px-2.5 py-1.5" : "text-sm px-3 py-1.5",
                  isActive(`/store/${subdomain}/contact`) 
                    ? "text-white bg-white/10" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                Contact Us
              </Link>

              <div className="flex items-center gap-2">
                <CartDropdown />
                
                {session?.user && (
                  <div className="relative group">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white hover:bg-white/10"
                    >
                      <User className="w-5 h-5" />
                    </Button>
                    <div className="absolute right-0 mt-2 w-48 bg-background rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <button
              className={cn(
                "md:hidden text-white p-2 transition-all duration-300 hover:scale-110 active:scale-95",
                scrolled && "p-1.5"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={cn("transition-all duration-300", scrolled ? "w-5 h-5" : "w-6 h-6")} />
              ) : (
                <Menu className={cn("transition-all duration-300", scrolled ? "w-5 h-5" : "w-6 h-6")} />
              )}
            </button>
          </div>

          <nav 
            className={cn(
              "md:hidden overflow-y-auto max-h-[calc(100vh-140px)] transition-all duration-300 ease-in-out border-t border-white/10",
              mobileMenuOpen ? "py-4 opacity-100" : "max-h-0 py-0 opacity-0"
            )}
          >
            <div className="flex flex-col space-y-3 px-2">
              <div className="space-y-1.5">
                <div className={cn(
                  "font-normal text-sm py-1.5 font-semibold",
                  isWhatWeDoActive ? "text-white" : "text-white/80"
                )}>
                  What We Do
                </div>
                <div className="pl-3 space-y-1 border-l-2 border-white/20">
                  <Link 
                    href={`/store/${subdomain}/cultivating-processing`}
                    className="block text-xs text-white/80 hover:text-white py-1 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cultivating & Processing
                  </Link>
                  <Link 
                    href={`/store/${subdomain}/manufacture-distribution`}
                    className="block text-xs text-white/80 hover:text-white py-1 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Manufacture & Distribution
                  </Link>
                  <Link 
                    href={`/store/${subdomain}/medical-clinics`}
                    className="block text-xs text-white/80 hover:text-white py-1 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Medical Cannabis Clinics
                  </Link>
                  <Link 
                    href={`/store/${subdomain}/online-pharmacy`}
                    className="block text-xs text-white/80 hover:text-white py-1 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Online Medical Cannabis Pharmacy
                  </Link>
                </div>
              </div>
              <Link 
                href={`/store/${subdomain}/research`}
                className={cn(
                  "font-normal text-sm transition-all duration-200 py-1.5",
                  isActive(`/store/${subdomain}/research`) ? "text-white font-semibold" : "text-white/80 hover:text-white"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Research
              </Link>
              <Link 
                href={`/store/${subdomain}/about`}
                className={cn(
                  "font-normal text-sm transition-all duration-200 py-1.5",
                  isActive(`/store/${subdomain}/about`) ? "text-white font-semibold" : "text-white/80 hover:text-white"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href={`/store/${subdomain}/contact`}
                className={cn(
                  "font-normal text-sm transition-all duration-200 py-1.5",
                  isActive(`/store/${subdomain}/contact`) ? "text-white font-semibold" : "text-white/80 hover:text-white"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}