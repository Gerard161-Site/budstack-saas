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

const Parkinsons = () => {
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
                Parkinson's Disease Treatment
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl font-geist">
                Understanding Parkinson's disease and exploring medical cannabis as a treatment option for symptom management.
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
            <span className="text-foreground">Parkinson's Disease</span>
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
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">What Causes Parkinson's Disease?</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground font-geist leading-relaxed mb-4">
                        Parkinson's disease is a progressive neurological disorder that affects movement. It occurs when nerve cells in the brain that produce dopamine become impaired or die.
                      </p>
                      <p className="text-muted-foreground font-geist leading-relaxed mb-4">
                        The exact cause is unknown, but factors include genetics, environmental triggers (exposure to toxins), age, and gender (men are more likely to develop it). Lewy bodies (abnormal protein clumps) are found in the brains of people with Parkinson's.
                      </p>
                      <p className="text-muted-foreground font-geist leading-relaxed">
                        Dopamine is a neurotransmitter crucial for smooth, coordinated movement. As dopamine-producing cells die, movement becomes increasingly affected.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div id="symptoms" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Parkinson's Symptoms</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-4 text-foreground">Motor Symptoms</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Tremor (shaking)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Bradykinesia (slowed movement)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Muscle rigidity</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Impaired balance and coordination</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-4 text-foreground">Non-Motor Symptoms</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Sleep disorders</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Depression and anxiety</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Cognitive changes</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Loss of smell</span>
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
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Medications</h3>
                        <p className="text-muted-foreground font-geist">
                          Levodopa (combined with carbidopa) is the most effective medication. Other drugs include dopamine agonists, MAO-B inhibitors, and COMT inhibitors.
                        </p>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Surgical Interventions</h3>
                        <p className="text-muted-foreground font-geist">
                          Deep brain stimulation (DBS) can help control motor symptoms in appropriate candidates. It involves implanting electrodes in specific brain areas.
                        </p>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Supportive Therapies</h3>
                        <p className="text-muted-foreground font-geist">
                          Physical therapy, occupational therapy, speech therapy, and exercise programs can help maintain function and quality of life.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div id="cannabis" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Medical Cannabis for Parkinson's Disease</h2>
                    <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                      <p className="text-muted-foreground font-geist leading-relaxed mb-6">
                        Research into medical cannabis for Parkinson's is ongoing. Some studies suggest potential benefits for certain symptoms, though more research is needed to establish efficacy and optimal treatment protocols.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-geist font-semibold mb-3 text-foreground">Potential Benefits</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Tremor reduction</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Improvement in sleep quality</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Pain relief</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Neuroprotective properties</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-geist font-semibold mb-3 text-foreground">Research Status</h3>
                          <p className="text-muted-foreground font-geist text-sm leading-relaxed">
                            While preliminary evidence is encouraging, particularly for non-motor symptoms, larger clinical trials are needed. Treatment should be discussed with a neurologist specializing in movement disorders.
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
                          q: "Is Parkinson's disease hereditary?",
                          a: "Most cases are not directly inherited. However, having a close relative with Parkinson's does increase risk slightly. Specific genetic mutations account for a small percentage of cases."
                        },
                        {
                          q: "Can medical cannabis help with dyskinesia?",
                          a: "Some patients report improvement in dyskinesia (involuntary movements often caused by long-term levodopa use), but research results are mixed. Always consult with your neurologist before trying medical cannabis."
                        },
                        {
                          q: "What's the life expectancy with Parkinson's?",
                          a: "With modern treatment, most people with Parkinson's have a normal or near-normal life expectancy. The disease itself is not fatal, though complications can occur in advanced stages."
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
                      Contact our medical team to discuss whether medical cannabis might be appropriate for managing your Parkinson's symptoms.
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

export default Parkinsons;
