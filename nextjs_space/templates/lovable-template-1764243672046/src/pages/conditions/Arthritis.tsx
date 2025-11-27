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

const Arthritis = () => {
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
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <ScrollAnimation>
              <h1 className="text-5xl md:text-6xl font-geist font-bold mb-6 text-foreground">
                Arthritis Treatment
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl font-geist">
                Understanding arthritis and exploring medical cannabis as a treatment option for joint pain and inflammation.
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-geist">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/research" className="hover:text-primary transition-colors">Research</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Arthritis</span>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[300px,1fr] gap-12">
              {/* Table of Contents - Sticky Sidebar */}
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

              {/* Main Content */}
              <div className="space-y-16">
                {/* What Causes Arthritis */}
                <ScrollAnimation>
                  <div id="causes" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">What Causes Arthritis?</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground font-geist leading-relaxed mb-4">
                        Arthritis is inflammation of one or more joints, causing pain and stiffness that can worsen with age. The two most common types are osteoarthritis and rheumatoid arthritis.
                      </p>
                      <p className="text-muted-foreground font-geist leading-relaxed mb-4">
                        Osteoarthritis occurs when the protective cartilage that cushions the ends of bones wears down over time. Rheumatoid arthritis is an autoimmune disorder where the immune system attacks the joints.
                      </p>
                      <p className="text-muted-foreground font-geist leading-relaxed">
                        Risk factors include age, family history, previous joint injuries, obesity, and certain occupations that place repetitive stress on joints.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Symptoms */}
                <ScrollAnimation>
                  <div id="symptoms" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Arthritis Symptoms</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-4 text-foreground">Common Symptoms</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Joint pain and stiffness</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Swelling and inflammation</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Reduced range of motion</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Warmth and redness around joints</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-4 text-foreground">Impact on Daily Life</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Difficulty with daily activities</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Sleep disturbances</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Fatigue and weakness</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground font-geist">Decreased mobility</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Treatment Options */}
                <ScrollAnimation>
                  <div id="treatment" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Arthritis Treatment Options</h2>
                    <div className="space-y-6">
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Medications</h3>
                        <p className="text-muted-foreground font-geist">
                          Pain relievers, NSAIDs, corticosteroids, and disease-modifying antirheumatic drugs (DMARDs) may be prescribed depending on the type and severity.
                        </p>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Physical Therapy</h3>
                        <p className="text-muted-foreground font-geist">
                          Exercises to improve flexibility, strength, and range of motion can help manage symptoms and maintain joint function.
                        </p>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="text-xl font-geist font-semibold mb-3 text-foreground">Lifestyle Modifications</h3>
                        <p className="text-muted-foreground font-geist">
                          Weight management, low-impact exercise, hot and cold therapy, and assistive devices can help reduce symptoms.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Medical Cannabis */}
                <ScrollAnimation>
                  <div id="cannabis" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Medical Cannabis for Arthritis</h2>
                    <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                      <p className="text-muted-foreground font-geist leading-relaxed mb-6">
                        Research suggests that medical cannabis may help manage arthritis symptoms through its anti-inflammatory and pain-relieving properties. Cannabinoids interact with the body's endocannabinoid system to potentially reduce inflammation and modulate pain signals.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-geist font-semibold mb-3 text-foreground">Potential Benefits</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Pain reduction</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Anti-inflammatory effects</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Improved sleep quality</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground font-geist text-sm">Enhanced mobility</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-geist font-semibold mb-3 text-foreground">Considerations</h3>
                          <p className="text-muted-foreground font-geist text-sm leading-relaxed">
                            Treatment should be individualized and monitored by healthcare professionals. Dosing, method of administration, and cannabinoid ratios may vary based on individual needs and response.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* FAQ */}
                <ScrollAnimation>
                  <div id="faq" className="scroll-mt-32">
                    <h2 className="text-3xl font-geist font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {[
                        {
                          q: "Can medical cannabis cure arthritis?",
                          a: "Medical cannabis does not cure arthritis, but it may help manage symptoms such as pain and inflammation. It should be used as part of a comprehensive treatment plan."
                        },
                        {
                          q: "What's the difference between osteoarthritis and rheumatoid arthritis?",
                          a: "Osteoarthritis is a degenerative joint disease caused by wear and tear, while rheumatoid arthritis is an autoimmune condition where the immune system attacks the joints."
                        },
                        {
                          q: "How long does it take for medical cannabis to help with arthritis symptoms?",
                          a: "Effects can vary depending on the method of administration. Inhalation may provide relief within minutes, while oral products may take 1-2 hours. Topical applications can work within 15-45 minutes."
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

                {/* CTA */}
                <ScrollAnimation>
                  <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <h3 className="text-2xl font-geist font-bold mb-4 text-foreground">Ready to Learn More?</h3>
                    <p className="text-muted-foreground font-geist mb-6">
                      Contact our medical team to discuss whether medical cannabis might be appropriate for managing your arthritis symptoms.
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

export default Arthritis;
