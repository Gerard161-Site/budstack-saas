
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Brain, Bone, HeartPulse, Activity, Zap, Moon, Scale, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ConditionsPage() {
  const conditions = [
    {
      icon: Brain,
      category: 'Neurological Conditions',
      conditions: [
        { name: 'Chronic Pain', description: 'Relief from persistent pain conditions not responding to conventional treatments' },
        { name: 'Multiple Sclerosis', description: 'Management of spasticity, pain, and mobility issues' },
        { name: 'Epilepsy', description: 'Reduction in seizure frequency for drug-resistant cases' },
        { name: 'Parkinson\'s Disease', description: 'Help with tremors, rigidity, and motor symptoms' },
        { name: 'Migraines', description: 'Prevention and reduction of chronic migraine episodes' },
      ]
    },
    {
      icon: Activity,
      category: 'Mental Health Conditions',
      conditions: [
        { name: 'Anxiety Disorders', description: 'Management of generalized anxiety, panic, and social anxiety' },
        { name: 'PTSD', description: 'Treatment of post-traumatic stress and related symptoms' },
        { name: 'Depression', description: 'Adjunct therapy for treatment-resistant depression' },
        { name: 'Insomnia', description: 'Improvement in sleep quality and duration' },
      ]
    },
    {
      icon: Bone,
      category: 'Pain & Inflammatory Conditions',
      conditions: [
        { name: 'Arthritis', description: 'Reduction of joint inflammation and chronic pain' },
        { name: 'Fibromyalgia', description: 'Management of widespread pain and fatigue' },
        { name: 'Crohn\'s Disease', description: 'Anti-inflammatory effects for digestive conditions' },
        { name: 'Endometriosis', description: 'Relief from pelvic pain and inflammation' },
      ]
    },
    {
      icon: Shield,
      category: 'Cancer-Related Symptoms',
      conditions: [
        { name: 'Chemotherapy Side Effects', description: 'Management of nausea, vomiting, and appetite loss' },
        { name: 'Cancer Pain', description: 'Additional pain relief for cancer patients' },
        { name: 'Cachexia', description: 'Appetite stimulation for wasting conditions' },
      ]
    },
    {
      icon: Moon,
      category: 'Sleep Disorders',
      conditions: [
        { name: 'Chronic Insomnia', description: 'Improvement in sleep onset and maintenance' },
        { name: 'Sleep Apnea', description: 'Potential adjunct for certain sleep disorders' },
        { name: 'Restless Leg Syndrome', description: 'Relief from discomfort and improved sleep' },
      ]
    },
    {
      icon: Zap,
      category: 'Other Conditions',
      conditions: [
        { name: 'Glaucoma', description: 'Reduction of intraocular pressure' },
        { name: 'HIV/AIDS', description: 'Appetite stimulation and pain management' },
        { name: 'ALS', description: 'Symptom management and quality of life improvement' },
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
                Treatable Conditions
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Medical cannabis may be suitable for a wide range of conditions. Explore the conditions 
                we treat and discover if you're eligible for treatment.
              </p>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-8 bg-blue-50 border-y border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
                <p className="text-blue-800 text-sm">
                  All prescriptions are issued at the discretion of licensed physicians following a thorough 
                  medical assessment. Not all patients will be eligible for medical cannabis treatment. 
                  This list is for informational purposes only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conditions Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {conditions.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-900">{category.category}</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.conditions.map((condition, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-green-900 mb-2">{condition.name}</h3>
                        <p className="text-gray-600 text-sm">{condition.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section className="py-16 bg-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-green-900 mb-6">Am I Eligible?</h2>
            <p className="text-gray-700 text-lg mb-8">
              You may be eligible for medical cannabis treatment if you have a qualifying condition and 
              conventional treatments have been ineffective or caused significant side effects.
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-green-900 mb-4">General Eligibility Criteria:</h3>
              <ul className="text-left space-y-3 max-w-2xl mx-auto">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">You are 18 years of age or older</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">You have a qualifying medical condition</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">You have tried conventional treatments with limited success</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">You are a resident of Portugal with valid identification</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">You consent to ongoing medical monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16 text-white" 
          style={{ backgroundColor: '#065f46' }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Find Out If You Qualify</h2>
            <p className="text-lg mb-8" style={{ color: '#d1fae5' }}>
              Take the first step towards relief with a free, no-obligation consultation with a licensed physician.
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
              <Link href="/how-it-works">
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
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
