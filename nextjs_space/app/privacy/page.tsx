'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, FileText, UserCheck, Globe, AlertTriangle } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      icon: Database,
      content: `We collect several types of information to provide and improve our services:

Personal Information: Name, email address, phone number, date of birth, and address provided during account registration.

Medical Information: Medical history, current medications, symptoms, diagnoses, and treatment plans shared during consultations with our licensed physicians.

Technical Information: IP address, browser type, device information, and usage data collected automatically when you use our website.

Payment Information: Payment card details and billing information processed securely through our payment processors. We do not store complete credit card numbers on our servers.

Communication Records: Records of your interactions with our customer support, including emails and chat transcripts.`
    },
    {
      title: '2. How We Use Your Information',
      icon: FileText,
      content: `We use your information for the following purposes:

Providing Services: To facilitate medical consultations, issue prescriptions, and deliver medical cannabis treatment services.

Account Management: To create and maintain your user account, verify your identity, and provide customer support.

Communication: To send appointment reminders, prescription updates, service notifications, and respond to your inquiries.

Improvement: To analyze usage patterns, improve our services, and develop new features.

Legal Compliance: To comply with Portuguese and European Union laws, regulations, and legal obligations, including INFARMED reporting requirements.

Security: To protect against fraud, unauthorized access, and ensure the security of our platform and your data.`
    },
    {
      title: '3. Legal Basis for Processing',
      icon: Shield,
      content: `Under GDPR, we process your personal data based on the following legal grounds:

Consent: You provide explicit consent when creating an account and booking consultations.

Contractual Necessity: Processing is necessary to fulfill our contractual obligations to provide medical services.

Legal Obligation: We must process certain data to comply with Portuguese medical cannabis regulations, healthcare laws, and tax requirements.

Legitimate Interests: We process data to improve our services, prevent fraud, and ensure security, balanced against your rights and interests.`
    },
    {
      title: '4. Data Sharing and Disclosure',
      icon: UserCheck,
      content: `We do not sell your personal information. We may share your data with:

Licensed Healthcare Providers: Medical information shared with consulting physicians who are bound by medical confidentiality.

Pharmacies and Dispensaries: Prescription information sent to licensed dispensaries you select for fulfillment.

Service Providers: Third-party vendors who provide essential services (payment processing, hosting, analytics) under strict confidentiality agreements.

Regulatory Authorities: INFARMED and other regulatory bodies when required by law or regulation.

Legal Requirements: When required by court order, legal process, or to protect rights, safety, and property.

Business Transfers: In the event of a merger, acquisition, or sale of assets, with notification to affected users.`
    },
    {
      title: '5. Data Security',
      icon: Lock,
      content: `We implement comprehensive security measures to protect your information:

Encryption: All data transmitted between your device and our servers is encrypted using TLS/SSL protocols. Medical records are encrypted at rest using AES-256 encryption.

Access Controls: Strict access controls ensure only authorized personnel can access personal and medical data.

Authentication: Multi-factor authentication and secure password requirements protect your account.

Regular Audits: We conduct regular security audits and vulnerability assessments.

Employee Training: All staff undergo data protection and security training, and sign confidentiality agreements.

Compliance: We maintain ISO 27001 information security standards and EU-GMP pharmaceutical quality systems.`
    },
    {
      title: '6. Your Rights Under GDPR',
      icon: Shield,
      content: `As a resident of the European Union, you have the following rights:

Right to Access: Request a copy of all personal data we hold about you.

Right to Rectification: Correct any inaccurate or incomplete personal information.

Right to Erasure: Request deletion of your personal data, subject to legal retention requirements.

Right to Restrict Processing: Limit how we use your data in certain circumstances.

Right to Data Portability: Receive your data in a structured, machine-readable format.

Right to Object: Object to processing based on legitimate interests or for direct marketing.

Right to Withdraw Consent: Withdraw consent at any time without affecting prior processing.

Right to Lodge a Complaint: File a complaint with the Portuguese data protection authority (CNPD) if you believe your rights have been violated.

To exercise these rights, please contact our Data Protection Officer at privacy@healingbuds.pt.`
    },
    {
      title: '7. Data Retention',
      icon: Database,
      content: `We retain your information for different periods based on legal requirements and business needs:

Medical Records: Retained for 10 years from the last consultation, as required by Portuguese healthcare regulations.

Account Information: Kept for as long as your account remains active, plus 7 years for legal and tax purposes.

Prescriptions: Maintained for the legal minimum of 10 years as per pharmaceutical regulations.

Payment Records: Retained for 7 years to comply with Portuguese tax and financial laws.

Marketing Communications: Until you unsubscribe or request deletion.

Technical Logs: Typically retained for 12-24 months for security and debugging purposes.`
    },
    {
      title: '8. Cookies and Tracking',
      icon: Eye,
      content: `Our website uses cookies and similar technologies:

Essential Cookies: Required for the website to function properly, including authentication and security.

Analytics Cookies: Help us understand how visitors use our website to improve user experience.

Functionality Cookies: Remember your preferences and settings.

Marketing Cookies: May be used to deliver relevant advertisements (only with your consent).

You can control cookie preferences through your browser settings. However, disabling essential cookies may affect website functionality. For more details, please review our Cookie Policy.`
    },
    {
      title: '9. International Data Transfers',
      icon: Globe,
      content: `Your data is primarily stored and processed within the European Union. If we transfer data outside the EU:

Adequacy Decisions: We only transfer to countries deemed adequate by the European Commission.

Standard Contractual Clauses: We use EU-approved Standard Contractual Clauses for transfers.

Additional Safeguards: We implement technical and organizational measures to ensure equivalent protection.

All service providers handling EU data must comply with GDPR requirements.`
    },
    {
      title: '10. Children\'s Privacy',
      icon: AlertTriangle,
      content: `HealingBuds services are intended for adults aged 18 and over. We do not knowingly collect personal information from individuals under 18 years of age. If we become aware that we have inadvertently collected data from a minor, we will take immediate steps to delete such information from our records. Parents or guardians who believe we may have collected information from a minor should contact us immediately.`
    },
    {
      title: '11. Third-Party Links',
      icon: FileText,
      content: `Our website may contain links to third-party websites, services, or resources. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit. This privacy policy applies only to information collected by HealingBuds.`
    },
    {
      title: '12. Automated Decision-Making',
      icon: Database,
      content: `We may use automated systems to help assess eligibility for medical cannabis treatment. However, all final decisions regarding prescriptions are made by licensed physicians. You have the right to:

Request human review of automated decisions
Express your point of view
Contest automated decisions

No automated decision that significantly affects you will be made without human oversight from a qualified medical professional.`
    },
    {
      title: '13. Data Breach Notification',
      icon: AlertTriangle,
      content: `In the event of a data breach that poses a risk to your rights and freedoms, we will:

Notify you within 72 hours of becoming aware of the breach
Provide details about the nature of the breach and data affected
Explain the likely consequences and measures taken to address the breach
Offer recommendations to protect yourself

We will also notify the relevant supervisory authority (CNPD) as required by law.`
    },
    {
      title: '14. Changes to This Policy',
      icon: FileText,
      content: `We may update this privacy policy periodically to reflect changes in our practices, technology, legal requirements, or business operations. We will notify you of material changes by:

Posting the updated policy on our website
Sending email notification to your registered email address
Requiring acceptance of new terms upon your next login (for significant changes)

The "Last Updated" date at the top of this policy indicates when it was last revised. We encourage you to review this policy regularly.`
    },
    {
      title: '15. Contact Information',
      icon: UserCheck,
      content: `If you have questions, concerns, or requests regarding this privacy policy or our data practices:

Data Protection Officer: privacy@healingbuds.pt
General Inquiries: support@healingbuds.pt
Mailing Address: HealingBuds Portugal, Lisbon, Portugal

Portuguese Data Protection Authority (CNPD):
Website: www.cnpd.pt
Email: geral@cnpd.pt
Phone: +351 213 928 400

We aim to respond to all inquiries within 30 days.`
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
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Your Privacy Matters</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your personal and medical information.
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
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                HealingBuds ("we," "us," or "our") respects your privacy and is committed to protecting your personal 
                and medical information. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our medical cannabis consultation platform and services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We operate in full compliance with the General Data Protection Regulation (GDPR), Portuguese data 
                protection laws (Law 58/2019), and healthcare regulations including Law 33/2018 and Decree-Law 8/2019 
                governing medical cannabis in Portugal.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our services, you consent to the data practices described in this policy. If you do not agree 
                with this policy, please do not use our services.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Privacy Sections */}
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
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-blue-600" />
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
          className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
            Questions About Your Privacy?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you have any questions about how we handle your data or want to exercise your rights under GDPR, 
            please don't hesitate to contact our Data Protection Officer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button 
                className="w-full px-8 py-3 font-semibold rounded-lg"
                style={{
                  backgroundColor: '#047857',
                  color: '#ffffff',
                  border: '2px solid #047857',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <span style={{ color: '#ffffff' }}>Contact DPO</span>
              </button>
            </Link>
            <Link href="/terms" className="w-full sm:w-auto">
              <button 
                className="w-full px-8 py-3 font-semibold rounded-lg"
                style={{
                  backgroundColor: '#047857',
                  color: '#ffffff',
                  border: '2px solid #047857',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <span style={{ color: '#ffffff' }}>View Terms</span>
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
