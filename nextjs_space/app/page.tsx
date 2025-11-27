
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Store, Palette, BarChart3, Shield, Zap } from 'lucide-react';
import { prisma } from '@/lib/db';

export default async function BudStackPlatformPage() {
  // Fetch platform settings
  let settingsData = await prisma.platformSettings.findUnique({
    where: { id: 'platform' },
  });

  // Create default settings if not exists
  if (!settingsData) {
    settingsData = await prisma.platformSettings.create({
      data: { id: 'platform' },
    });
  }

  // Ensure we have non-null settings
  const settings = settingsData!;
  const platformName = settings.businessName || 'BudStack';
  const tagline = settings.tagline || 'White-Label Medical Cannabis E-Commerce Platform';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" style={{ 
      backgroundColor: settings.backgroundColor,
      color: settings.textColor,
      fontFamily: settings.fontFamily 
    }}>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {settings.logoUrl ? (
              <div className="relative w-32 h-10">
                <Image
                  src={settings.logoUrl}
                  alt={platformName}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ 
                  background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)` 
                }}>
                  <Store className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold" style={{ 
                  background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: settings.headingFontFamily
                }}>
                  {platformName}
                </h1>
              </>
            )}
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            <Link href="/onboarding">
              <Button style={{ backgroundColor: settings.primaryColor }}>Start Your Store</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-semibold" style={{ 
            backgroundColor: `${settings.primaryColor}20`,
            color: settings.primaryColor 
          }}>
            🚀 Launch Your Medical Cannabis Brand in Minutes
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ 
            background: `linear-gradient(to right, ${settings.headingColor}, ${settings.primaryColor}, ${settings.secondaryColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: settings.headingFontFamily
          }}>
            White-Label Medical Cannabis
            <br />
            E-Commerce Platform
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: settings.textColor }}>
            Launch your own branded medical cannabis dispensary with our complete SaaS solution. 
            No technical knowledge required. Fully compliant. Scale instantly.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/onboarding">
              <Button size="lg" className="text-lg px-8 py-6" style={{ backgroundColor: settings.primaryColor }}>
                Get Started with NFT License
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" style={{ borderColor: settings.primaryColor, color: settings.primaryColor }}>
                Learn More
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ✓ NFT license required • ✓ Blockchain-verified ownership • ✓ Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: settings.headingColor, fontFamily: settings.headingFontFamily }}>
          Everything You Need to Succeed
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Store className="w-8 h-8" />,
              title: "Complete Storefront",
              description: "Beautiful, conversion-optimized store with product catalog, consultation booking, and customer portal"
            },
            {
              icon: <Palette className="w-8 h-8" />,
              title: "Full Customization",
              description: "Your logo, colors, domain, and content. Make it 100% your brand with our template system"
            },
            {
              icon: <BarChart3 className="w-8 h-8" />,
              title: "Admin Dashboard",
              description: "Manage products, orders, customers, and analytics from one powerful dashboard"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Regulatory Compliance",
              description: "Built-in compliance with medical cannabis regulations and INFARMED requirements"
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Doctor Green Integration",
              description: "Seamless integration with Doctor Green's product catalog and fulfillment"
            },
            {
              icon: <CheckCircle2 className="w-8 h-8" />,
              title: "NFT Licensing",
              description: "Blockchain-based licensing system for secure, transferable business credentials"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ 
                backgroundColor: `${settings.primaryColor}15`,
                color: settings.primaryColor 
              }}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: settings.headingColor }}>{feature.title}</h3>
              <p style={{ color: settings.textColor }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: settings.headingColor, fontFamily: settings.headingFontFamily }}>
            Launch in 3 Simple Steps
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Purchase Your NFT License",
                description: "Secure your business credential with our blockchain-based licensing system"
              },
              {
                step: "2",
                title: "Customize Your Brand",
                description: "Upload your logo, set colors, choose templates, and configure your domain"
              },
              {
                step: "3",
                title: "Go Live",
                description: "Your store is ready! Start accepting consultations and selling products immediately"
              }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ 
                  background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)` 
                }}>
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: settings.headingColor }}>{step.title}</h3>
                <p style={{ color: settings.textColor }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: settings.headingColor, fontFamily: settings.headingFontFamily }}>
          Simple, Transparent Pricing
        </h2>
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg" style={{ borderWidth: '2px', borderColor: `${settings.primaryColor}40` }}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2" style={{ color: settings.headingColor }}>Professional Plan</h3>
            <div className="text-5xl font-bold mb-2" style={{ color: settings.primaryColor }}>
              €199<span className="text-xl text-gray-500">/mo</span>
            </div>
            <p className="text-gray-600">One-time NFT license fee: €4,999</p>
          </div>
          <ul className="space-y-3 mb-8">
            {[
              "Complete white-label storefront",
              "Unlimited products & orders",
              "Custom domain & branding",
              "Admin dashboard access",
              "Doctor Green API integration",
              "Customer support 24/7",
              "Regular updates & new features"
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: settings.primaryColor }} />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <Link href="/onboarding" className="block">
            <Button className="w-full" size="lg" style={{ backgroundColor: settings.primaryColor }}>Get Started Now</Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ 
        background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})` 
      }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: settings.headingFontFamily }}>
            Ready to Launch Your Medical Cannabis Brand?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the future of medical cannabis e-commerce with {platformName}
          </p>
          <Link href="/onboarding">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" style={{ 
              backgroundColor: 'white',
              color: settings.primaryColor 
            }}>
              Apply with Your NFT License
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {settings.logoUrl ? (
                  <div className="relative w-24 h-8">
                    <Image
                      src={settings.logoUrl}
                      alt={platformName}
                      fill
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ 
                      background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)` 
                    }}>
                      <Store className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-bold text-lg">{platformName}</span>
                  </>
                )}
              </div>
              <p className="text-sm">
                {tagline || 'The leading white-label platform for medical cannabis dispensaries'}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/onboarding" className="hover:text-white">Get Started</Link></li>
                <li><Link href="/super-admin" className="hover:text-white">Admin Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/super-admin" className="hover:text-white">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © 2025 {platformName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
