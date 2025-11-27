
'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I start the process?',
          a: 'Simply register on our platform, complete the medical questionnaire, and schedule your free consultation with a licensed physician. The entire process takes less than 15 minutes to initiate.'
        },
        {
          q: 'Is the consultation really free?',
          a: 'Yes! Your initial consultation with our licensed physicians is completely free with no obligation. You only pay if you decide to proceed with a prescription.'
        },
        {
          q: 'How long does it take to get approved?',
          a: 'Most patients receive a decision within 24-48 hours after their consultation. If approved, your prescription can be fulfilled within 3-5 business days.'
        },
        {
          q: 'Do I need a referral from my GP?',
          a: 'No referral is needed. Our licensed physicians can assess your eligibility and issue prescriptions directly through our platform.'
        },
      ]
    },
    {
      category: 'Legal & Compliance',
      questions: [
        {
          q: 'Is medical cannabis legal in Portugal?',
          a: 'Yes, medical cannabis has been legal in Portugal since 2018. It is regulated by INFARMED, the Portuguese health authority, and can be prescribed by licensed physicians for qualifying conditions.'
        },
        {
          q: 'Is HealingBuds regulated?',
          a: 'Yes, we operate in full compliance with INFARMED regulations and Portuguese medical cannabis laws. All our products are EU-GMP certified and our prescriptions are issued by licensed Portuguese physicians.'
        },
        {
          q: 'Can I travel with my medication?',
          a: 'You can travel within Portugal with your prescribed medication. For international travel, regulations vary by country. We recommend checking the laws of your destination and carrying your prescription documentation.'
        },
        {
          q: 'Will this affect my employment?',
          a: 'Medical cannabis prescriptions are treated as confidential medical information. However, some employers may have drug testing policies. We recommend reviewing your employment contract and discussing concerns with your physician.'
        },
      ]
    },
    {
      category: 'Medical & Treatment',
      questions: [
        {
          q: 'What conditions can be treated?',
          a: 'We treat a wide range of conditions including chronic pain, anxiety, PTSD, insomnia, multiple sclerosis, epilepsy, arthritis, fibromyalgia, cancer-related symptoms, and many others. Visit our Conditions page for a full list.'
        },
        {
          q: 'Will medical cannabis get me "high"?',
          a: 'Our physicians prescribe products based on your medical needs. Some products contain THC which may cause psychoactive effects, while high-CBD products typically don\'t. Your doctor will explain what to expect from your specific treatment.'
        },
        {
          q: 'Are there side effects?',
          a: 'Like any medication, medical cannabis can have side effects including dry mouth, drowsiness, changes in appetite, or dizziness. Your physician will discuss potential side effects and how to manage them.'
        },
        {
          q: 'Can I continue my other medications?',
          a: 'In most cases, yes. However, it\'s crucial to inform your physician about all medications you\'re taking to check for potential interactions.'
        },
        {
          q: 'How do I know which product is right for me?',
          a: 'Your physician will recommend specific products based on your condition, symptoms, and treatment goals. We offer ongoing support to adjust your treatment as needed.'
        },
      ]
    },
    {
      category: 'Ordering & Delivery',
      questions: [
        {
          q: 'How do I order my medication?',
          a: 'Once you have a valid prescription, you can browse and order products directly through our platform. Simply select your prescribed products and proceed to checkout.'
        },
        {
          q: 'How long does delivery take?',
          a: 'Standard delivery takes 3-5 business days within Portugal. Express delivery options may be available in certain areas.'
        },
        {
          q: 'Is the packaging discreet?',
          a: 'Yes, all orders are shipped in plain, unmarked packaging with no indication of the contents. Your privacy is our priority.'
        },
        {
          q: 'What if I\'m not satisfied with my order?',
          a: 'Due to the medical nature of our products, we cannot accept returns once delivered. However, if you experience issues with your treatment, contact us immediately for support and potential prescription adjustments.'
        },
      ]
    },
    {
      category: 'Pricing & Insurance',
      questions: [
        {
          q: 'How much does medical cannabis cost?',
          a: 'Prices vary by product, typically ranging from €40-€60 per product. Your physician will prescribe products that fit your budget and medical needs.'
        },
        {
          q: 'Is medical cannabis covered by insurance?',
          a: 'Currently, most Portuguese insurance plans do not cover medical cannabis. However, this is changing. Check with your insurance provider for the most current information.'
        },
        {
          q: 'Are there payment plans available?',
          a: 'We\'re working on payment plan options. Contact our support team to discuss your specific situation.'
        },
        {
          q: 'Do you accept all payment methods?',
          a: 'We accept major credit cards, debit cards, and bank transfers. All transactions are secure and encrypted.'
        },
      ]
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          q: 'How is my data protected?',
          a: 'We use bank-level encryption and are fully GDPR compliant. Your medical information is stored securely and never shared without your explicit consent.'
        },
        {
          q: 'Who can see my medical records?',
          a: 'Only your assigned physician and authorized healthcare staff can access your medical records. We never share your information with third parties.'
        },
        {
          q: 'Can I delete my account?',
          a: 'Yes, you can request account deletion at any time. We will securely erase your data in accordance with GDPR regulations, while retaining any records required by law.'
        },
      ]
    },
  ];

  const allQuestions = faqCategories.flatMap(cat => 
    cat.questions.map(q => ({ ...q, category: cat.category }))
  );

  const filteredQuestions = searchTerm 
    ? allQuestions.filter(item => 
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allQuestions;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Find answers to common questions about medical cannabis, our services, and the treatment process.
              </p>
              
              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {searchTerm ? (
              // Search Results
              <div className="space-y-4">
                <p className="text-gray-600 mb-6">
                  Found {filteredQuestions.length} result(s) for "{searchTerm}"
                </p>
                {filteredQuestions.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-xs text-green-600 font-semibold mb-2 block">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-semibold text-green-900 mb-3">
                          {item.q}
                        </h3>
                        <p className="text-gray-700">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Categories
              <div className="space-y-12">
                {faqCategories.map((category, catIndex) => (
                  <div key={catIndex}>
                    <h2 className="text-2xl font-bold text-green-900 mb-6 pb-3 border-b-2 border-green-600">
                      {category.category}
                    </h2>
                    <div className="space-y-4">
                      {category.questions.map((item, qIndex) => {
                        const globalIndex = catIndex * 100 + qIndex;
                        const isOpen = openIndex === globalIndex;
                        
                        return (
                          <div
                            key={qIndex}
                            className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            <button
                              onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                              className="w-full px-6 py-4 flex items-center justify-between text-left"
                            >
                              <span className="font-semibold text-green-900 pr-4">
                                {item.q}
                              </span>
                              <ChevronDown
                                className={`w-5 h-5 text-green-600 flex-shrink-0 transition-transform ${
                                  isOpen ? 'transform rotate-180' : ''
                                }`}
                              />
                            </button>
                            
                            {isOpen && (
                              <div className="px-6 pb-4">
                                <p className="text-gray-700">
                                  {item.a}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-green-100 text-lg mb-8">
              Our support team is here to help. Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Support
              </a>
              <a href="/auth/signup" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Start Free Consultation
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
