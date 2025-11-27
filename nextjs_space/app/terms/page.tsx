'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, FileText, User, Lock, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      icon: FileText,
      content: `By accessing and using the HealingBuds website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.`
    },
    {
      title: '2. Medical Disclaimer',
      icon: Shield,
      content: `HealingBuds provides access to licensed medical professionals for consultations regarding medical cannabis treatment. Our services do not replace traditional medical care. All consultations are conducted by licensed Portuguese physicians who are registered with INFARMED and comply with Portuguese medical cannabis regulations (Law 33/2018 and Decree-Law 8/2019).`
    },
    {
      title: '3. User Account',
      icon: User,
      content: `To use our services, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 18 years old to use our services.`
    },
    {
      title: '4. Privacy and Data Protection',
      icon: Lock,
      content: `We are committed to protecting your privacy and personal information in accordance with the General Data Protection Regulation (GDPR) and Portuguese data protection laws. All medical information is encrypted and stored securely. We do not sell or share your personal information with third parties without your consent, except as required by law.`
    },
    {
      title: '5. Consultation Services',
      icon: FileText,
      content: `Our online consultations are conducted via secure video conferencing. The doctor will assess your medical history, current health status, and determine if medical cannabis is appropriate for your condition. Not all consultations will result in a prescription. The decision to prescribe medical cannabis is at the sole discretion of the licensed physician.`
    },
    {
      title: '6. Payment Terms',
      icon: FileText,
      content: `Initial consultations are free. Follow-up consultations and prescription renewals are subject to fees as indicated on our website. All payments must be made in full at the time of booking. We accept various payment methods as displayed during the booking process. Refunds are subject to our cancellation policy.`
    },
    {
      title: '7. Cancellation Policy',
      icon: AlertCircle,
      content: `You may cancel or reschedule your consultation up to 24 hours before the scheduled time for a full refund. Cancellations made less than 24 hours before the scheduled time are subject to a cancellation fee. The doctor reserves the right to cancel or reschedule consultations due to unforeseen circumstances.`
    },
    {
      title: '8. Prescription Services',
      icon: FileText,
      content: `If approved, prescriptions are issued electronically and sent to your chosen pharmacy or dispensary. Prescriptions are valid as per Portuguese regulations and must be filled at licensed dispensaries. You are responsible for ensuring the pharmacy you choose is licensed to dispense medical cannabis in Portugal.`
    },
    {
      title: '9. User Conduct',
      icon: AlertCircle,
      content: `You agree not to: (a) provide false information during registration or consultation, (b) use the services for any illegal purpose, (c) attempt to obtain prescriptions fraudulently, (d) share your account credentials with others, (e) harass or abuse medical staff, or (f) violate any applicable laws or regulations.`
    },
    {
      title: '10. Intellectual Property',
      icon: FileText,
      content: `All content on the HealingBuds website, including text, graphics, logos, images, and software, is the property of HealingBuds or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.`
    },
    {
      title: '11. Limitation of Liability',
      icon: Shield,
      content: `HealingBuds and its medical professionals are not liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount you paid for the specific service that gave rise to the claim. This limitation applies to the fullest extent permitted by law.`
    },
    {
      title: '12. Regulatory Compliance',
      icon: Shield,
      content: `HealingBuds operates in full compliance with Portuguese medical cannabis regulations, including Law 33/2018 and Decree-Law 8/2019. All medical professionals are licensed by INFARMED and registered with Ordem dos Médicos. We maintain EU-GMP certification and comply with all relevant pharmaceutical standards.`
    },
    {
      title: '13. Changes to Terms',
      icon: FileText,
      content: `We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service after changes have been posted constitutes your acceptance of the modified terms. We recommend reviewing these terms periodically.`
    },
    {
      title: '14. Governing Law',
      icon: Shield,
      content: `These terms shall be governed by and construed in accordance with the laws of Portugal. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the Portuguese courts.`
    },
    {
      title: '15. Contact Information',
      icon: AlertCircle,
      content: `If you have any questions about these Terms and Conditions, please contact us through our Contact page or email us at support@healingbuds.pt. We will respond to all inquiries within 48 business hours.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Legal Information</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: October 18, 2025
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to HealingBuds. These Terms and Conditions outline the rules and regulations for the use of our website 
            and medical cannabis consultation services. By accessing this website and using our services, we assume you accept 
            these terms and conditions. Do not continue to use HealingBuds if you do not agree to all of the terms and conditions 
            stated on this page.
          </p>
          <p className="text-gray-700 leading-relaxed">
            HealingBuds is a medical cannabis consultation platform operating in Portugal in compliance with all applicable 
            Portuguese and European Union laws and regulations.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.05) }}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
            Questions About Our Terms?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you have any questions or concerns about these Terms and Conditions, please don't hesitate to reach out to us. 
            We're here to help and ensure you have a clear understanding of our policies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button 
                className="w-full px-8 py-3 rounded-lg font-semibold"
                style={{ 
                  backgroundColor: '#047857',
                  color: '#ffffff',
                  border: '2px solid #047857',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <span style={{ color: '#ffffff' }}>Contact Us</span>
              </button>
            </Link>
            <Link href="/faq" className="w-full sm:w-auto">
              <button 
                className="w-full px-8 py-3 rounded-lg font-semibold"
                style={{ 
                  backgroundColor: '#047857',
                  color: '#ffffff',
                  border: '2px solid #047857',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <span style={{ color: '#ffffff' }}>View FAQ</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <Link href="/" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
