'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CartDropdown } from '@/components/cart-dropdown';

interface NavigationProps {
  businessName: string;
  subdomain: string;
  logoUrl?: string | null;
}

export function Navigation({ businessName, subdomain, logoUrl }: NavigationProps) {
  const pathname = usePathname();
  const isHomePage = pathname === `/store/${subdomain}`;
  const [isScrolled, setIsScrolled] = useState(!isHomePage); // Start with white bg on non-homepage
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session } = useSession() || {};

  useEffect(() => {
    // Only use scroll-based background on homepage
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { href: `/store/${subdomain}`, label: 'Home' },
    { href: `/store/${subdomain}/how-it-works`, label: 'How It Works' },
    { href: `/store/${subdomain}/conditions`, label: 'Conditions' },
    { href: `/store/${subdomain}/products`, label: 'Products' },
    { href: `/store/${subdomain}/consultation`, label: 'Consultation' },
    { href: `/store/${subdomain}/about`, label: 'About' },
    { href: `/store/${subdomain}/contact`, label: 'Contact' },
  ];

  // Determine logo to use
  const displayLogo = logoUrl || (isScrolled ? '/hb-logo-dark.png' : '/hb-logo-white.png');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/store/${subdomain}`} className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src={displayLogo}
                alt={`${businessName} logo`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
              style={{
                fontFamily: 'var(--tenant-font-heading, inherit)',
              }}
            >
              {businessName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:opacity-80 ${
                  pathname === link.href
                    ? isScrolled
                      ? 'text-[#059669]'
                      : 'text-white font-semibold'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <CartDropdown />

            {/* User Menu */}
            {session?.user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className={isScrolled ? 'text-gray-700' : 'text-white'}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="w-5 h-5" />
                </Button>
                {isUserMenuOpen && (
                  <>
                    {/* Backdrop to close menu */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          signOut();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/auth/login">
                <Button
                  size="sm"
                  style={{
                    backgroundColor: isScrolled ? '#059669' : 'rgba(5, 150, 105, 0.9)',
                    color: '#ffffff',
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  pathname === link.href ? 'text-[#059669]' : 'text-gray-700'
                } hover:text-[#059669] transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
