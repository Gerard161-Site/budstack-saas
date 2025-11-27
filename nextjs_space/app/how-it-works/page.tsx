
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { UserPlus, FileCheck, Video, Pill, Truck, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Step 1: Register',
      description: 'Create your secure account with basic information. Our registration process takes less than 2 minutes.',
      details: [
        'Provide your name, email, and contact information',
        'Complete secure KYC verification for legal compliance',
        'All data is encrypted and GDPR compliant',
      ]
    },
    {
      icon: FileCheck,
      title: 'Step 2: Medical Assessment',
      description: 'Complete a comprehensive medical questionnaire about your condition and treatment history.',
      details: [
        'Answer questions about your medical history',
        'Describe your symptoms and previous treatments',
        'Upload any relevant medical documents (optional)',
      ]
    },
    {
      icon: Video,
      title: 'Step 3: Free Consultation',
      description: 'Consult with a licensed Portuguese physician via our secure platform - completely free.',
      details: [
        'Discuss your condition with a qualified doctor',
        'Doctor reviews your eligibility for medical cannabis',
        'Receive personalized treatment recommendations',
      ]
    },
    {
      icon: Pill,
      title: 'Step 4: Prescription',
      description: 'If approved, receive your INFARMED-compliant medical cannabis prescription.',
      details: [
        'Prescription issued directly by licensed physician',
        'Fully legal and compliant with Portuguese law',
        'Browse recommended products in our catalog',
      ]
    },
    {
      icon: Truck,
      title: 'Step 5: Delivery',
      description: 'Your medication is delivered discreetly and securely to your address.',
      details: [
        'Discreet packaging with no external branding',
        'Tracked delivery to your doorstep',
        'Pharmacist support available for questions',
      ]
    },
    {
      icon: CheckCircle,
      title: 'Step 6: Follow-Up Care',
      description: 'Ongoing support and prescription renewals as needed.',
      details: [
        'Regular check-ins with your healthcare provider',
        'Adjust treatment as your needs evolve',
        'Easy prescription renewals through the platform',
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
                How It Works
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Getting started with medical cannabis is simple, safe, and fully legal. 
                Here's your step-by-step guide to accessing treatment.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-green-900 mb-3">{step.title}</h2>
                    <p className="text-gray-700 text-lg mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16 text-white" 
          style={{ backgroundColor: '#065f46' }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg mb-8" style={{ color: '#d1fae5' }}>
              Begin your journey to relief with a free consultation from a licensed medical professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button 
                  size="lg" 
                  style={{ 
                    backgroundColor: '#ffffff', 
                    color: '#065f46' 
                  }}
                  className="hover:bg-gray-100"
                >
                  Start Free Consultation
                </Button>
              </Link>
              <Link href="/conditions">
                <Button 
                  size="lg" 
                  variant="outline" 
                  style={{ 
                    borderColor: '#ffffff',
                    color: '#ffffff',
                    backgroundColor: 'transparent'
                  }}
                  className="hover:bg-white/10"
                >
                  View Treatable Conditions
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-green-900 mb-4">Have Questions?</h2>
            <p className="text-gray-600 mb-8">
              Visit our comprehensive FAQ section for answers to common questions.
            </p>
            <Link href="/faq">
              <Button variant="outline" size="lg">
                View FAQ
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
