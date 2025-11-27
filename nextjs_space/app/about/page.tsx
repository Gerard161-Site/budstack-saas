
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Shield, Award, Users, Globe, Heart, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
                About HealingBuds
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Leading Portugal's medical cannabis revolution with safe, legal, and compassionate care.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-green-900 mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  HealingBuds is dedicated to providing safe, legal access to medical cannabis for patients across Portugal. 
                  We believe in the therapeutic potential of cannabis and are committed to helping patients find relief 
                  through evidence-based treatment plans.
                </p>
                <p className="text-gray-700 mb-4">
                  Operating under full INFARMED regulation, we ensure every patient receives personalized care from 
                  licensed healthcare professionals who understand the complexities of medical cannabis treatment.
                </p>
                <p className="text-gray-700">
                  Our platform combines cutting-edge technology with compassionate healthcare to make medical cannabis 
                  accessible, affordable, and stigma-free for all eligible patients in Portugal.
                </p>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                  <Heart className="w-32 h-32 text-white opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-green-900 text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Shield className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-3">Safety & Compliance</h3>
                <p className="text-gray-600">
                  Fully regulated by INFARMED and compliant with all Portuguese and EU medical cannabis laws.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Award className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-3">Quality Excellence</h3>
                <p className="text-gray-600">
                  EU-GMP certified products sourced from trusted, pharmaceutical-grade suppliers only.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Users className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-3">Patient-Centered Care</h3>
                <p className="text-gray-600">
                  Every treatment plan is personalized to your unique medical needs and conditions.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Globe className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-3">Accessibility</h3>
                <p className="text-gray-600">
                  Online consultations make medical cannabis accessible to patients throughout Portugal.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Heart className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-3">Compassion</h3>
                <p className="text-gray-600">
                  We treat every patient with dignity, respect, and understanding in a stigma-free environment.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Clock className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-3">Efficiency</h3>
                <p className="text-gray-600">
                  Fast consultations, quick prescriptions, and reliable delivery directly to your door.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Compliance */}
        <section className="py-16 bg-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Regulatory Compliance</h2>
              <p className="text-green-100 text-lg mb-8">
                HealingBuds operates in full compliance with Portuguese law and INFARMED regulations governing 
                medical cannabis. Our platform is designed to meet the highest standards of healthcare delivery 
                and patient safety.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  INFARMED Regulated
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  EU-GMP Certified
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  GDPR Compliant
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  Blockchain Secured
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-green-900 text-center mb-4">Our Expert Team</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Our multidisciplinary team includes licensed physicians, pharmacists, patient care specialists, 
              and technology experts dedicated to your wellbeing.
            </p>
            <div className="text-center">
              <p className="text-gray-700 text-lg">
                All consultations are conducted by licensed Portuguese healthcare professionals with specialized 
                training in medical cannabis therapeutics.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
