'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Tenant } from '@/types/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  subject: z.string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission (you can add actual email sending logic here)
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      reset();
    } catch (error: any) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen pb-24 lg:pb-0" style={{ backgroundColor: 'var(--tenant-color-background)' }}>
      <main className="pt-28 md:pt-32">
        {/* Hero Section */}
        <section style={{ backgroundColor: 'var(--tenant-color-background)' }} className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="max-w-5xl">
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
                  style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                >
                  Get in Touch
                </h1>
                <p
                  className="text-xl md:text-2xl max-w-3xl font-light"
                  style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
                >
                  Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-xl border border-border/30">
              <img
                src="/templates/healingbuds/greenhouse-rows.png"
                alt="Contact us"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent"
                style={{ '--tw-gradient-from': 'var(--tenant-color-background)' } as any}
              />
            </div>
          </motion.div>
        </section>

        {/* Contact Information */}
        <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--tenant-color-background)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div>
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 tracking-tight"
                    style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                  >
                    Let's Connect
                  </h2>
                  <p
                    className="text-base md:text-lg mb-12 leading-relaxed"
                    style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
                  >
                    Whether you have a question about our products, need support, or want to learn more about medical cannabis, we're ready to answer all your questions.
                  </p>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--tenant-color-primary)' }}
                    >
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold mb-2 tracking-tight"
                        style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                      >
                        Email
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
                      >
                        info@{tenant.subdomain}.com
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div
                  className="p-8 rounded-xl border"
                  style={{
                    backgroundColor: 'var(--tenant-color-surface, var(--tenant-color-background))',
                    borderColor: 'var(--tenant-color-border, rgba(0,0,0,0.1))'
                  }}
                >
                  <h3
                    className="text-2xl font-semibold mb-6 tracking-tight"
                    style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
                  >
                    Send us a message
                  </h3>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div
                      className="mb-6 p-4 rounded-lg border flex items-start gap-3"
                      style={{
                        backgroundColor: 'rgba(var(--tenant-color-primary-rgb, 28, 79, 77), 0.1)',
                        borderColor: 'rgba(var(--tenant-color-primary-rgb, 28, 79, 77), 0.2)'
                      }}
                    >
                      <CheckCircle2
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: 'var(--tenant-color-primary)' }}
                      />
                      <div>
                        <p
                          className="font-medium"
                          style={{ color: 'var(--tenant-color-heading)' }}
                        >
                          Message sent successfully!
                        </p>
                        <p
                          className="text-sm mt-1"
                          style={{ color: 'var(--tenant-color-text)' }}
                        >
                          We'll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-900">Failed to send message</p>
                        <p className="text-sm text-red-700 mt-1">Please try again later or contact us directly.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-base)' }}
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--tenant-color-background)',
                          borderColor: errors.name ? '#ef4444' : 'var(--tenant-color-border, rgba(0,0,0,0.2))',
                          color: 'var(--tenant-color-text)',
                          fontFamily: 'var(--tenant-font-base)'
                        }}
                        placeholder="Your name"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs mt-1.5">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-base)' }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--tenant-color-background)',
                          borderColor: errors.email ? '#ef4444' : 'var(--tenant-color-border, rgba(0,0,0,0.2))',
                          color: 'var(--tenant-color-text)',
                          fontFamily: 'var(--tenant-font-base)'
                        }}
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1.5">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-base)' }}
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        {...register('subject')}
                        className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--tenant-color-background)',
                          borderColor: errors.subject ? '#ef4444' : 'var(--tenant-color-border, rgba(0,0,0,0.2))',
                          color: 'var(--tenant-color-text)',
                          fontFamily: 'var(--tenant-font-base)'
                        }}
                        placeholder="How can we help?"
                        disabled={isSubmitting}
                      />
                      {errors.subject && (
                        <p className="text-red-600 text-xs mt-1.5">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-base)' }}
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register('message')}
                        className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 resize-none transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--tenant-color-background)',
                          borderColor: errors.message ? '#ef4444' : 'var(--tenant-color-border, rgba(0,0,0,0.2))',
                          color: 'var(--tenant-color-text)',
                          fontFamily: 'var(--tenant-font-base)'
                        }}
                        placeholder="Tell us more..."
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <p className="text-red-600 text-xs mt-1.5">{errors.message.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                      style={{
                        backgroundColor: 'var(--tenant-color-primary)',
                        color: 'white',
                        fontFamily: 'var(--tenant-font-base)'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
