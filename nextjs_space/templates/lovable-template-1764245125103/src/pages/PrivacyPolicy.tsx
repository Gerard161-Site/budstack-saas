import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import BackToTop from "@/components/BackToTop";
import { Shield, Lock, Eye, FileText, Users, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Shield className="w-16 h-16 text-primary" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground text-lg">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8 text-foreground/90">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">Introduction</h2>
                </div>
                <p className="leading-relaxed mb-4">
                  Dr. Green NFT ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our website and NFT-based cannabis fulfillment services.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">Information We Collect</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Name, email address, and contact information</li>
                      <li>Wallet addresses and blockchain transaction data</li>
                      <li>Medical documentation and eligibility information</li>
                      <li>Age verification and identification documents</li>
                      <li>Payment and billing information</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Automatically Collected Information</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>IP address, browser type, and device information</li>
                      <li>Usage data and analytics</li>
                      <li>Cookies and tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">How We Use Your Information</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To provide and maintain our NFT platform and fulfillment services</li>
                  <li>To verify eligibility and comply with cannabis regulations</li>
                  <li>To process transactions and manage NFT keys</li>
                  <li>To communicate with you about your account and services</li>
                  <li>To ensure blockchain traceability and compliance</li>
                  <li>To improve our services and develop new features</li>
                  <li>To prevent fraud and maintain security</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">Information Sharing</h2>
                </div>
                <p className="leading-relaxed mb-4">We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Licensed Partners:</strong> Cannabis cultivation and fulfillment providers</li>
                  <li><strong>Regulatory Authorities:</strong> As required by applicable cannabis laws</li>
                  <li><strong>Service Providers:</strong> Third-party vendors who assist our operations</li>
                  <li><strong>Blockchain Networks:</strong> Transaction data recorded on public blockchains</li>
                  <li><strong>Legal Requirements:</strong> When required by law or legal process</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">Data Security</h2>
                </div>
                <p className="leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Secure blockchain infrastructure</li>
                  <li>Regular security audits and assessments</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Compliance with GDPR and other data protection regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">Your Rights</h2>
                <p className="leading-relaxed mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate data</li>
                  <li>Deletion of your data (subject to legal obligations)</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                  <li>Withdrawal of consent</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">Blockchain Considerations</h2>
                <p className="leading-relaxed">
                  Please note that information recorded on blockchain networks is public and permanent. While we use blockchain for transparency and compliance, this means certain transaction data cannot be deleted or modified once recorded.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">International Transfers</h2>
                <p className="leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">Children's Privacy</h2>
                <p className="leading-relaxed">
                  Our services are not intended for individuals under the age of 18 (or the legal age for cannabis use in your jurisdiction). We do not knowingly collect information from minors.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="bg-card p-6 rounded-lg border border-border">
                <h2 className="font-display text-2xl font-bold mb-4">Contact Us</h2>
                <p className="leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@drgreennft.com</p>
                  <p><strong>Address:</strong> Dr. Green NFT Headquarters</p>
                </div>
              </section>
            </div>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;
