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

const Epilepsy = () => {
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
                Epilepsy Treatment
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl font-geist">
                Understanding epilepsy and exploring medical cannabis as a treatment option for seizure management.
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
            <span className="text-foreground">Epilepsy</span>
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
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">What Causes Epilepsy?</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground font-geist leading-relaxed mb-4">
                        Epilepsy is a neurological disorder characterized by recurrent, unprovoked seizures caused by abnormal electrical activity in the brain. It affects people of all ages.
                      </p>
                      <p className="text-muted-foreground font-geist leading-relaxed mb-4">
                        Causes include genetic factors, head trauma, brain conditions (tumors, strokes), infections (meningitis, encephalitis), prenatal injury, and developmental disorders. In many cases, the cause is unknown.
                      </p>
                      <p className="text-muted-foreground font-geist leading-relaxed">
                        Seizures occur when there's a sudden surge of electrical activity in the brain, disrupting normal brain function temporarily.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div id="symptoms" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Epilepsy Symptoms</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-4 text-foreground">Seizure Types</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Generalized tonic-clonic seizures</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Absence seizures</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Focal (partial) seizures</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Myoclonic seizures</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-4 text-foreground">Common Signs</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Temporary confusion</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Staring spells</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Uncontrollable jerking movements</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Loss of consciousness</span>
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
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Anti-Epileptic Drugs (AEDs)</h3>
                        <p className="text-muted-foreground font-geist">
                          Medications are the primary treatment for epilepsy. Many different AEDs are available, and finding the right one may take time and adjustment.
                        </p>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Surgery</h3>
                        <p className="text-muted-foreground font-geist">
                          For drug-resistant epilepsy, surgical options may include removing the area of the brain causing seizures or implanting devices to control seizures.
                        </p>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Dietary Therapy</h3>
                        <p className="text-muted-foreground font-geist">
                          The ketogenic diet and modified Atkins diet have shown effectiveness in reducing seizures, particularly in children and drug-resistant cases.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div id="cannabis" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Medical Cannabis for Epilepsy</h2>
                    <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                      <p className="text-muted-foreground font-geist leading-relaxed mb-6">
                        CBD (cannabidiol) has gained significant attention for its potential in treating certain types of epilepsy. FDA-approved CBD medications are now available for specific epilepsy syndromes, showing the promise of cannabinoid-based treatments.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-geist font-semibold mb-3 text-foreground">Potential Benefits</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Reduction in seizure frequency</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Decreased seizure severity</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Improved quality of life</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Alternative for drug-resistant epilepsy</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-geist font-semibold mb-3 text-foreground">Clinical Evidence</h3>
                          <p className="text-muted-foreground font-geist text-sm leading-relaxed">
                            CBD has shown particular promise for Dravet syndrome and Lennox-Gastaut syndrome. Treatment should be carefully monitored by neurologists experienced in epilepsy management, as interactions with other seizure medications are possible.
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
                          q: "Can epilepsy be cured?",
                          a: "Some people may outgrow epilepsy, and others may become seizure-free with treatment. However, many people with epilepsy require ongoing management. About 70% of people with epilepsy can control seizures with medication."
                        },
                        {
                          q: "Is CBD the same as marijuana?",
                          a: "No. CBD is a single compound derived from cannabis plants. Unlike THC (the psychoactive compound in marijuana), CBD does not produce a 'high.' FDA-approved CBD medications contain purified CBD without significant THC."
                        },
                        {
                          q: "Can medical cannabis replace my epilepsy medication?",
                          a: "No. Never stop taking anti-epileptic medications without consulting your neurologist. Medical cannabis, when appropriate, is typically used as an add-on treatment, not a replacement."
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
                      Contact our medical team to discuss whether medical cannabis might be appropriate as part of your epilepsy treatment plan.
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

export default Epilepsy;
