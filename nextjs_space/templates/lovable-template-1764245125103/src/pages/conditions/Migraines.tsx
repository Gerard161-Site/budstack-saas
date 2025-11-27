import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollAnimation from "@/components/ScrollAnimation";
import PageTransition from "@/components/PageTransition";

const tableOfContents = [
  { id: "causes", title: "Causes" },
  { id: "symptoms", title: "Symptoms" },
  { id: "treatment", title: "Treatment" },
  { id: "cannabis", title: "Medical Cannabis" },
  { id: "faq", title: "FAQ" },
];

const Migraines = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <ScrollAnimation>
              <h1 className="text-5xl md:text-6xl font-geist font-bold mb-6 text-foreground">
                Migraine Treatment
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl font-geist">
                Understanding migraines and exploring medical cannabis as a treatment option for prevention and symptom management.
              </p>
            </ScrollAnimation>
          </div>
        </section>

        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-geist">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/research" className="hover:text-primary transition-colors">Research</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Migraines</span>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[300px,1fr] gap-12">
              <div className="hidden lg:block">
                <div className="sticky top-32 space-y-2">
                  <h3 className="text-sm font-geist font-semibold text-foreground mb-4">On This Page</h3>
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-geist"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-16">
                <ScrollAnimation>
                  <div id="causes" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">What Causes Migraines?</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground font-geist leading-relaxed mb-4">
                        Migraines are complex neurological events characterized by severe, recurring headaches often accompanied by other symptoms. They involve changes in brain activity and blood flow.
                      </p>
                      <p className="text-muted-foreground font-geist leading-relaxed mb-4">
                        Common triggers include hormonal changes, certain foods and drinks, stress, sensory stimuli (bright lights, loud sounds), sleep changes, and environmental factors.
                      </p>
                      <p className="text-muted-foreground font-geist leading-relaxed">
                        Genetics play a significant role, with migraines often running in families. The exact mechanisms are still being researched, but involve neurotransmitter imbalances and trigeminal nerve activation.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div id="symptoms" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Migraine Symptoms</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-4 text-foreground">Primary Symptoms</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Intense throbbing head pain</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Sensitivity to light and sound</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Nausea and vomiting</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Visual disturbances (aura)</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-4 text-foreground">Migraine Phases</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Prodrome (warning phase)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Aura (visual/sensory changes)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Attack (headache phase)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Postdrome (recovery phase)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div id="treatment" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Treatment Options</h2>
                    <div className="space-y-6">
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Acute Treatments</h3>
                        <p className="text-muted-foreground font-geist">
                          Triptans, NSAIDs, and anti-nausea medications can help stop migraine attacks once they begin. Early treatment is most effective.
                        </p>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Preventive Treatments</h3>
                        <p className="text-muted-foreground font-geist">
                          Daily medications, CGRP inhibitors, Botox injections, and lifestyle modifications can help reduce migraine frequency and severity.
                        </p>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Lifestyle Management</h3>
                        <p className="text-muted-foreground font-geist">
                          Identifying and avoiding triggers, maintaining regular sleep patterns, stress management, and dietary modifications are crucial.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div id="cannabis" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Medical Cannabis for Migraines</h2>
                    <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                      <p className="text-muted-foreground font-geist leading-relaxed mb-6">
                        Emerging research suggests medical cannabis may help both prevent and treat migraines. The endocannabinoid system appears to play a role in migraine pathophysiology, and cannabinoids may help modulate pain pathways and reduce neuroinflammation.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-geist font-semibold mb-3 text-foreground">Potential Benefits</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Reduction in migraine frequency</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Pain intensity reduction</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Anti-nausea effects</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Alternative to traditional medications</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-geist font-semibold mb-3 text-foreground">Treatment Approach</h3>
                          <p className="text-muted-foreground font-geist text-sm leading-relaxed">
                            Both preventive and acute use may be beneficial. Treatment plans should be developed with healthcare professionals and may include specific cannabinoid ratios and dosing strategies.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div id="faq" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {[
                        {
                          q: "How long do migraines typically last?",
                          a: "Migraines usually last between 4 and 72 hours if untreated. The duration and intensity can vary significantly between individuals and episodes."
                        },
                        {
                          q: "Can medical cannabis prevent migraines?",
                          a: "Research suggests that regular use of medical cannabis may reduce migraine frequency in some patients. However, more clinical studies are needed to establish optimal preventive protocols."
                        },
                        {
                          q: "What's the difference between a migraine and a regular headache?",
                          a: "Migraines are more severe and often accompanied by additional symptoms like nausea, light sensitivity, and visual disturbances. They typically affect one side of the head and have a throbbing quality."
                        }
                      ].map((faq, index) => (
                        <motion.div
                          key={index}
                          className="border border-border rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === `faq-${index}` ? null : `faq-${index}`)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-card/50 transition-colors"
                          >
                            <span className="text-lg font-geist font-semibold text-foreground">{faq.q}</span>
                            <ChevronRight 
                              className={`w-5 h-5 text-muted-foreground transition-transform ${
                                expandedFaq === `faq-${index}` ? 'rotate-90' : ''
                              }`}
                            />
                          </button>
                          <motion.div
                            initial={false}
                            animate={{ height: expandedFaq === `faq-${index}` ? 'auto' : 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-0">
                              <p className="text-muted-foreground font-geist leading-relaxed">{faq.a}</p>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <h3 className="text-2xl font-geist font-bold mb-4 text-foreground">Ready to Learn More?</h3>
                    <p className="text-muted-foreground font-geist mb-6">
                      Contact our medical team to discuss whether medical cannabis might be appropriate for your migraine management.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-geist font-semibold"
                    >
                      Get in Touch
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default Migraines;
