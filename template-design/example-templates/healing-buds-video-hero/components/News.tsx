'use client';

import { motion } from 'framer-motion';

/**
 * News Component
 * 
 * Latest news and blog posts preview.
 * This is a placeholder - integrate with actual blog/news system.
 */
export function News() {
  const newsItems = [
    {
      title: 'New Research on Medical Cannabis',
      excerpt: 'Latest findings show promising results...',
      date: '2025-11-20'
    },
    {
      title: 'Regulatory Updates',
      excerpt: 'Important changes to medical cannabis regulations...',
      date: '2025-11-15'
    },
    {
      title: 'Patient Success Stories',
      excerpt: 'How medical cannabis helped improve quality of life...',
      date: '2025-11-10'
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white" aria-labelledby="news-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 id="news-heading" className="responsive-heading font-bold text-primary mb-4">
            Latest News
          </h2>
          <p className="responsive-body text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest developments in medical cannabis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-xl hover-lift"
            >
              <time className="text-sm text-accent font-medium">
                {new Date(item.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
              <h3 className="text-xl font-semibold text-primary mt-3 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.excerpt}
              </p>
              <button className="mt-4 text-accent font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded">
                Read More →
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
