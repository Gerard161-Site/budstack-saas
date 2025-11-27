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

const PTSD = () => {
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
                PTSD Treatment
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl font-geist">
                Understanding post-traumatic stress disorder and exploring medical cannabis as a complementary treatment option.
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
            <span className="text-foreground">PTSD</span>
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
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">What Causes PTSD?</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground font-geist leading-relaxed mb-4">
                        Post-Traumatic Stress Disorder (PTSD) is a mental health condition triggered by experiencing or witnessing a terrifying event. It can affect anyone who has lived through a traumatic experience.
                      </p>
                      <p className="text-muted-foreground font-geist leading-relaxed mb-4">
                        Common triggers include combat exposure, childhood trauma, physical assault, sexual violence, accidents, natural disasters, or witnessing death or injury.
                      </p>
                      <p className="text-muted-foreground font-geist leading-relaxed">
                        PTSD involves changes in brain chemistry and function, particularly in areas related to fear, stress response, and memory processing. Not everyone who experiences trauma develops PTSD.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div id="symptoms" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">PTSD Symptoms</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-4 text-foreground">Core Symptoms</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Intrusive memories and flashbacks</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Avoidance of triggers</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Negative thoughts and mood</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Hyperarousal and reactivity</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-4 text-foreground">Additional Effects</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Nightmares and sleep disturbances</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Difficulty concentrating</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Emotional numbness</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Relationship difficulties</span>
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
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Psychotherapy</h3>
                        <p className="text-muted-foreground font-geist">
                          Trauma-focused therapies like Cognitive Processing Therapy (CPT), Prolonged Exposure (PE), and Eye Movement Desensitization and Reprocessing (EMDR) are highly effective.
                        </p>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Medications</h3>
                        <p className="text-muted-foreground font-geist">
                          SSRIs and SNRIs are commonly prescribed antidepressants that can help manage PTSD symptoms. Other medications may target specific symptoms like nightmares or anxiety.
                        </p>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Supportive Care</h3>
                        <p className="text-muted-foreground font-geist">
                          Support groups, stress management techniques, and lifestyle modifications can complement primary treatments and improve outcomes.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation>
                  <div id="cannabis" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Medical Cannabis for PTSD</h2>
                    <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                      <p className="text-muted-foreground font-geist leading-relaxed mb-6">
                        Emerging research suggests medical cannabis may help manage certain PTSD symptoms. The endocannabinoid system plays a role in fear memory processing and extinction, which are central to PTSD.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-geist font-semibold mb-3 text-foreground">Potential Benefits</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Reduction in nightmare frequency</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Anxiety and hyperarousal relief</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Improved sleep quality</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Enhanced stress resilience</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-geist font-semibold mb-3 text-foreground">Important Considerations</h3>
                          <p className="text-muted-foreground font-geist text-sm leading-relaxed">
                            Medical cannabis should be used as part of a comprehensive treatment plan that includes evidence-based psychotherapy. It is not a replacement for trauma-focused therapy but may help manage symptoms that interfere with daily functioning and therapy participation.
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
                          q: "Can PTSD be cured?",
                          a: "While there's no cure for PTSD, it is highly treatable. Many people with PTSD experience significant improvement or complete symptom resolution with appropriate treatment."
                        },
                        {
                          q: "How long does PTSD treatment take?",
                          a: "Treatment duration varies by individual and severity. Evidence-based psychotherapies typically involve 8-16 sessions, though some people may need longer-term support."
                        },
                        {
                          q: "Should medical cannabis replace traditional PTSD therapy?",
                          a: "No. Medical cannabis should not replace evidence-based trauma therapy. It may be used as an adjunct treatment to help manage specific symptoms under medical supervision."
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
                      Contact our medical team to discuss whether medical cannabis might be appropriate as part of your PTSD treatment plan.
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

export default PTSD;
