'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Tenant } from '@/types/client';

// Condition data structure
interface ConditionData {
  title: string;
  subtitle: string;
  causes: { title: string; desc: string }[];
  symptoms: {
    physical: string[];
    psychological?: string[];
  };
  types?: { type: string; desc: string }[];
  treatments: { title: string; desc: string }[];
  medicalCannabis: {
    content1: string;
    content2: string;
  };
  faqs: { question: string; answer: string }[];
}

// Condition data for all conditions
const conditionDataMap: Record<string, ConditionData> = {
  'anxiety': {
    title: "Anxiety Disorders",
    subtitle: "Understanding anxiety disorders, their causes, symptoms, and how medical cannabis can help manage anxiety naturally.",
    causes: [
      { title: "Genetic Factors", desc: "Family history and genetic predisposition can play a significant role in developing anxiety disorders." },
      { title: "Environmental Stress", desc: "Traumatic events, chronic stress, or major life changes can trigger or worsen anxiety symptoms." },
      { title: "Brain Chemistry", desc: "Imbalances in neurotransmitters like serotonin and dopamine can contribute to anxiety disorders." },
      { title: "Medical Conditions", desc: "Certain health conditions, medications, or substance use can cause or exacerbate anxiety symptoms." }
    ],
    symptoms: {
      physical: [
        "Rapid heartbeat and palpitations",
        "Shortness of breath or hyperventilation",
        "Sweating and trembling",
        "Muscle tension and aches",
        "Fatigue and weakness",
        "Difficulty sleeping",
        "Digestive issues"
      ],
      psychological: [
        "Excessive worry and fear",
        "Feeling of impending doom",
        "Difficulty concentrating",
        "Irritability and restlessness",
        "Panic attacks",
        "Avoidance behaviors",
        "Racing thoughts"
      ]
    },
    types: [
      { type: "Generalized Anxiety Disorder (GAD)", desc: "Persistent and excessive worry about various aspects of daily life, lasting at least six months." },
      { type: "Panic Disorder", desc: "Recurring panic attacks and fear of future panic attacks, often with physical symptoms like chest pain and dizziness." },
      { type: "Social Anxiety Disorder", desc: "Intense fear of social situations and being judged or embarrassed in public settings." },
      { type: "Specific Phobias", desc: "Extreme fear of specific objects or situations, such as heights, flying, or animals." }
    ],
    treatments: [
      { title: "Cognitive Behavioral Therapy (CBT)", desc: "Evidence-based therapy that helps identify and change negative thought patterns and behaviors." },
      { title: "Medication", desc: "SSRIs, SNRIs, and benzodiazepines may be prescribed to manage anxiety symptoms." },
      { title: "Mindfulness & Relaxation", desc: "Meditation, yoga, and breathing exercises can help reduce anxiety and promote relaxation." },
      { title: "Lifestyle Modifications", desc: "Regular exercise, healthy diet, adequate sleep, and stress management techniques." }
    ],
    medicalCannabis: {
      content1: "Medical cannabis, particularly CBD-rich strains, has shown promise in managing anxiety symptoms for some patients. CBD interacts with the endocannabinoid system to help regulate mood and stress responses without the psychoactive effects associated with THC.",
      content2: "Research suggests that medical cannabis may help reduce anxiety symptoms by modulating serotonin levels and promoting relaxation. However, it's important to work with healthcare professionals to find the right strain, dosage, and delivery method for your individual needs."
    },
    faqs: [
      { question: "Can medical cannabis help with anxiety?", answer: "Yes, many patients report relief from anxiety symptoms using medical cannabis, particularly CBD-rich products. However, individual responses vary, and it's important to consult with a healthcare professional." },
      { question: "What's the difference between CBD and THC for anxiety?", answer: "CBD is non-psychoactive and may help reduce anxiety without causing a 'high'. THC can have varying effects - low doses may reduce anxiety, while high doses might increase it in some individuals." },
      { question: "Are there any side effects?", answer: "Common side effects may include drowsiness, dry mouth, and changes in appetite. It's important to start with low doses and adjust gradually under medical supervision." },
      { question: "How long does it take to see results?", answer: "Effects can vary based on the delivery method. Inhalation provides faster relief (minutes), while edibles and oils may take 1-2 hours but offer longer-lasting effects." }
    ]
  },
  'chronic-pain': {
    title: "Chronic Pain",
    subtitle: "Managing chronic pain with medical cannabis. Learn about causes, symptoms, and evidence-based treatment approaches.",
    causes: [
      { title: "Injury or Trauma", desc: "Previous injuries, accidents, or surgeries can lead to persistent pain even after healing." },
      { title: "Inflammatory Conditions", desc: "Conditions like arthritis, fibromyalgia, and autoimmune disorders cause ongoing inflammation and pain." },
      { title: "Nerve Damage", desc: "Neuropathic pain from nerve injury, diabetes, or other conditions affecting the nervous system." },
      { title: "Degenerative Diseases", desc: "Progressive conditions like osteoarthritis and degenerative disc disease cause chronic pain over time." }
    ],
    symptoms: {
      physical: [
        "Persistent aching or burning pain",
        "Stiffness and reduced mobility",
        "Fatigue and low energy",
        "Sleep disturbances",
        "Muscle tension",
        "Limited range of motion",
        "Inflammation and swelling"
      ],
      psychological: [
        "Depression and mood changes",
        "Anxiety and stress",
        "Difficulty concentrating",
        "Irritability",
        "Social withdrawal",
        "Reduced quality of life"
      ]
    },
    treatments: [
      { title: "Pain Medications", desc: "NSAIDs, opioids, and other pain relievers may be prescribed, though long-term use has risks." },
      { title: "Physical Therapy", desc: "Exercises, stretching, and manual therapy to improve strength, flexibility, and function." },
      { title: "Interventional Procedures", desc: "Nerve blocks, injections, or other minimally invasive procedures to target pain sources." },
      { title: "Complementary Therapies", desc: "Acupuncture, massage, chiropractic care, and other alternative treatments." }
    ],
    medicalCannabis: {
      content1: "Medical cannabis has emerged as a potential alternative for chronic pain management, with research showing it may help reduce pain, inflammation, and improve quality of life. Both CBD and THC can play roles in pain relief through different mechanisms.",
      content2: "Many chronic pain patients report reduced need for opioid medications when using medical cannabis. The anti-inflammatory and analgesic properties of cannabinoids can provide relief while potentially reducing the risk of dependence associated with traditional pain medications."
    },
    faqs: [
      { question: "Is medical cannabis effective for chronic pain?", answer: "Studies and patient reports suggest medical cannabis can be effective for various types of chronic pain, including neuropathic pain, inflammatory pain, and pain from conditions like arthritis and fibromyalgia." },
      { question: "Can I replace my pain medications with cannabis?", answer: "Never stop or change medications without consulting your healthcare provider. Some patients may reduce reliance on other pain medications under medical supervision." },
      { question: "What's the best way to use cannabis for pain?", answer: "The optimal method varies by individual. Options include oils, capsules, inhalation, and topicals. Your healthcare provider can help determine the best approach." },
      { question: "Will medical cannabis make me high?", answer: "This depends on the product. CBD-dominant products provide pain relief without significant psychoactive effects. Balanced or THC-dominant products may have psychoactive effects but can be managed with proper dosing." }
    ]
  },
  // Add more condition data as needed
  'arthritis': {
    title: "Arthritis",
    subtitle: "Understanding arthritis and how medical cannabis can help manage joint pain and inflammation.",
    causes: [
      { title: "Age-Related Wear", desc: "Cartilage naturally breaks down over time, leading to osteoarthritis." },
      { title: "Autoimmune Response", desc: "Rheumatoid arthritis occurs when the immune system attacks joint tissues." },
      { title: "Genetics", desc: "Family history increases risk of developing various forms of arthritis." },
      { title: "Previous Injuries", desc: "Joint injuries can increase risk of developing arthritis in affected areas." }
    ],
    symptoms: {
      physical: [
        "Joint pain and stiffness",
        "Swelling and inflammation",
        "Reduced range of motion",
        "Joint tenderness",
        "Morning stiffness",
        "Fatigue",
        "Joint deformity (in severe cases)"
      ]
    },
    treatments: [
      { title: "Anti-Inflammatory Medications", desc: "NSAIDs and DMARDs to reduce inflammation and slow disease progression." },
      { title: "Physical Therapy", desc: "Exercises to maintain joint flexibility and strengthen supporting muscles." },
      { title: "Joint Protection", desc: "Assistive devices and techniques to reduce stress on affected joints." },
      { title: "Surgery", desc: "Joint replacement or repair procedures for severe cases." }
    ],
    medicalCannabis: {
      content1: "Medical cannabis shows promise for arthritis management due to its anti-inflammatory and analgesic properties. CBD, in particular, may help reduce joint inflammation and pain without psychoactive effects.",
      content2: "Both topical and systemic cannabis products can be beneficial for arthritis patients. Topicals provide localized relief, while oral products offer systemic anti-inflammatory effects."
    },
    faqs: [
      { question: "Can cannabis help with arthritis pain?", answer: "Many arthritis patients report significant pain relief with medical cannabis. Studies suggest cannabinoids may reduce inflammation and protect joints." },
      { question: "Should I use topicals or oral cannabis?", answer: "Both can be effective. Topicals provide targeted relief for specific joints, while oral products offer systemic benefits. Many patients use both." },
      { question: "Will it help with rheumatoid arthritis?", answer: "Some studies suggest cannabis may help manage RA symptoms by reducing inflammation and autoimmune responses, though more research is needed." }
    ]
  }
};

export default function ConditionDetailPage() {
  const params = useParams();
  const conditionId = params.id as string;
  
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/tenant/current')
      .then(res => res.json())
      .then(data => {
        setTenant(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--tenant-color-background)' }}>
        <p className="text-lg" style={{ color: 'var(--tenant-color-text)' }}>Loading...</p>
      </div>
    );
  }

  if (!tenant) {
    notFound();
  }

  const conditionData = conditionDataMap[conditionId];

  if (!conditionData) {
    notFound();
  }

  const tableOfContents = [
    { id: "causes", title: "What Causes It" },
    { id: "symptoms", title: "Symptoms" },
    ...(conditionData.types ? [{ id: "types", title: "Types" }] : []),
    { id: "treatment", title: "Treatment Options" },
    { id: "medical-cannabis", title: "Medical Cannabis" },
    { id: "faq", title: "FAQ" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen pb-24 lg:pb-0" style={{ backgroundColor: 'var(--tenant-color-background)' }}>
      <main className="pt-24">
        {/* Hero Section */}
        <section 
          className="relative py-32 overflow-hidden"
          style={{ backgroundColor: 'var(--tenant-color-primary)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="max-w-4xl">
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1] text-white"
                  style={{ fontFamily: 'var(--tenant-font-heading)' }}
                >
                  {conditionData.title}
                </h1>
                <p 
                  className="text-lg md:text-xl max-w-3xl font-light text-white opacity-90"
                  style={{ fontFamily: 'var(--tenant-font-base)' }}
                >
                  {conditionData.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section 
          className="py-6"
          style={{ backgroundColor: 'rgba(var(--tenant-color-primary-rgb, 28, 79, 77), 0.05)' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}>
              <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/conditions" className="hover:opacity-70 transition-opacity">Conditions</Link>
              <ChevronRight className="w-4 h-4" />
              <span style={{ color: 'var(--tenant-color-heading)' }}>{conditionData.title}</span>
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="py-20" style={{ backgroundColor: 'var(--tenant-color-background)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-32">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div 
                      className="rounded-xl p-6 border"
                      style={{ 
                        backgroundColor: 'rgba(var(--tenant-color-primary-rgb, 28, 79, 77), 0.05)',
                        borderColor: 'var(--tenant-color-border, rgba(0,0,0,0.2))'
                      }}
                    >
                      <h3 
                        className="text-lg font-semibold mb-4"
                        style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                      >
                        Table of Contents
                      </h3>
                      <nav className="space-y-2">
                        {tableOfContents.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="block w-full text-left text-sm py-2 px-3 rounded-lg hover:opacity-70 transition-opacity"
                            style={{ 
                              color: 'var(--tenant-color-text)',
                              fontFamily: 'var(--tenant-font-base)'
                            }}
                          >
                            {item.title}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </motion.div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-16">
                {/* What Causes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  id="causes"
                >
                  <h2 
                    className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight"
                    style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                  >
                    What Causes {conditionData.title}?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {conditionData.causes.map((cause, index) => (
                      <div 
                        key={index} 
                        className="rounded-xl p-6 border"
                        style={{ 
                          backgroundColor: 'rgba(var(--tenant-color-primary-rgb, 28, 79, 77), 0.05)',
                          borderColor: 'var(--tenant-color-border, rgba(0,0,0,0.2))'
                        }}
                      >
                        <h3 
                          className="text-xl font-semibold mb-2"
                          style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                        >
                          {cause.title}
                        </h3>
                        <p style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}>
                          {cause.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Symptoms */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  id="symptoms"
                >
                  <h2 
                    className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight"
                    style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                  >
                    Symptoms
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h3 
                        className="text-xl font-semibold mb-4"
                        style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                      >
                        Physical Symptoms
                      </h3>
                      <ul className="space-y-3">
                        {conditionData.symptoms.physical.map((symptom, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div 
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: 'var(--tenant-color-primary)' }}
                            />
                            <span style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}>
                              {symptom}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {conditionData.symptoms.psychological && (
                      <div>
                        <h3 
                          className="text-xl font-semibold mb-4"
                          style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                        >
                          Psychological Symptoms
                        </h3>
                        <ul className="space-y-3">
                          {conditionData.symptoms.psychological.map((symptom, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div 
                                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: 'var(--tenant-color-primary)' }}
                              />
                              <span style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}>
                                {symptom}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Types (if applicable) */}
                {conditionData.types && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="types"
                  >
                    <h2 
                      className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight"
                      style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                    >
                      Types of {conditionData.title}
                    </h2>
                    <div className="space-y-4">
                      {conditionData.types.map((type, index) => (
                        <div 
                          key={index} 
                          className="rounded-xl p-6 border"
                          style={{ 
                            backgroundColor: 'var(--tenant-color-background)',
                            borderColor: 'var(--tenant-color-border, rgba(0,0,0,0.2))'
                          }}
                        >
                          <h3 
                            className="text-xl font-semibold mb-2"
                            style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                          >
                            {type.type}
                          </h3>
                          <p style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}>
                            {type.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Treatment */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  id="treatment"
                >
                  <h2 
                    className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight"
                    style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                  >
                    Treatment Options
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {conditionData.treatments.map((treatment, index) => (
                      <div 
                        key={index} 
                        className="rounded-xl p-6 border"
                        style={{ 
                          backgroundColor: 'rgba(var(--tenant-color-primary-rgb, 28, 79, 77), 0.05)',
                          borderColor: 'var(--tenant-color-border, rgba(0,0,0,0.2))'
                        }}
                      >
                        <h3 
                          className="text-xl font-semibold mb-2"
                          style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                        >
                          {treatment.title}
                        </h3>
                        <p style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}>
                          {treatment.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Medical Cannabis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  id="medical-cannabis"
                >
                  <div 
                    className="rounded-2xl p-8 border"
                    style={{ 
                      backgroundColor: 'rgba(var(--tenant-color-primary-rgb, 28, 79, 77), 0.1)',
                      borderColor: 'var(--tenant-color-border, rgba(0,0,0,0.2))'
                    }}
                  >
                    <h2 
                      className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight"
                      style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                    >
                      Medical Cannabis for {conditionData.title}
                    </h2>
                    <p 
                      className="text-lg leading-relaxed mb-6"
                      style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
                    >
                      {conditionData.medicalCannabis.content1}
                    </p>
                    <p 
                      className="text-lg leading-relaxed mb-6"
                      style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
                    >
                      {conditionData.medicalCannabis.content2}
                    </p>
                    <Link href="/contact">
                      <button 
                        className="px-8 py-3 rounded-lg font-semibold transition-all"
                        style={{ 
                          backgroundColor: 'var(--tenant-color-primary)',
                          color: 'white',
                          fontFamily: 'var(--tenant-font-base)'
                        }}
                      >
                        Book a Consultation
                      </button>
                    </Link>
                  </div>
                </motion.div>

                {/* FAQ */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  id="faq"
                >
                  <h2 
                    className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight"
                    style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {conditionData.faqs.map((faq, index) => (
                      <div 
                        key={index} 
                        className="rounded-xl border overflow-hidden"
                        style={{ 
                          backgroundColor: 'var(--tenant-color-background)',
                          borderColor: 'var(--tenant-color-border, rgba(0,0,0,0.2))'
                        }}
                      >
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === `q${index}` ? null : `q${index}`)}
                          className="w-full flex items-center justify-between p-6 text-left hover:opacity-80 transition-opacity"
                        >
                          <h3 
                            className="text-lg font-semibold pr-4"
                            style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                          >
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: expandedFaq === `q${index}` ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown 
                              className="w-5 h-5 flex-shrink-0"
                              style={{ color: 'var(--tenant-color-text)' }}
                            />
                          </motion.div>
                        </button>
                        <motion.div
                          initial={false}
                          animate={{ height: expandedFaq === `q${index}` ? 'auto' : 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <p 
                              className="leading-relaxed"
                              style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
                            >
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
