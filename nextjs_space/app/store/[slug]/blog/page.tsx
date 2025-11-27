'use client';

import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TenantBlogPage() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSubscribe = () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Successfully subscribed to newsletter!');
    setNewsletterEmail('');
  };
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Medical Cannabis: A Beginner\'s Guide',
      excerpt: 'Learn the basics of medical cannabis, how it works in the body, and what to expect from treatment.',
      category: 'Education',
      date: 'October 15, 2025',
      author: 'Dr. Maria Silva',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'CBD vs THC: What\'s the Difference?',
      excerpt: 'Discover the key differences between CBD and THC, their effects, and which might be right for your condition.',
      category: 'Science',
      date: 'October 10, 2025',
      author: 'Dr. João Santos',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'Medical Cannabis Laws in Portugal: What You Need to Know',
      excerpt: 'A comprehensive guide to the legal framework governing medical cannabis in Portugal and your rights as a patient.',
      category: 'Legal',
      date: 'October 5, 2025',
      author: 'Legal Team',
      readTime: '10 min read',
    },
    {
      id: 4,
      title: 'Managing Chronic Pain with Medical Cannabis',
      excerpt: 'How medical cannabis can help manage various types of chronic pain and improve quality of life.',
      category: 'Treatment',
      date: 'September 28, 2025',
      author: 'Dr. Ana Costa',
      readTime: '6 min read',
    },
    {
      id: 5,
      title: 'Anxiety and Medical Cannabis: Patient Stories',
      excerpt: 'Real experiences from patients who have found relief from anxiety disorders through medical cannabis.',
      category: 'Patient Stories',
      date: 'September 20, 2025',
      author: 'Editorial Team',
      readTime: '8 min read',
    },
    {
      id: 6,
      title: 'Choosing the Right Strain for Your Condition',
      excerpt: 'Expert advice on selecting the most appropriate cannabis strain based on your specific medical needs.',
      category: 'Guide',
      date: 'September 15, 2025',
      author: 'Dr. Pedro Fernandes',
      readTime: '9 min read',
    },
  ];

  const categories = ['All', 'Education', 'Science', 'Legal', 'Treatment', 'Patient Stories', 'Guide'];

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
                Blog
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Expert insights, patient stories, and the latest news on medical cannabis.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-12 flex flex-col justify-center text-white">
                  <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full w-fit mb-4">
                    Featured
                  </span>
                  <h2 className="text-3xl font-bold mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-green-100 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-green-100 mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {blogPosts[0].date}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {blogPosts[0].author}
                    </span>
                  </div>
                  <Button className="bg-white text-green-900 hover:bg-gray-100 w-fit">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="bg-green-700/30 h-full min-h-[400px]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-green-900 mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <article key={post.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 h-48"></div>
                  
                  <div className="p-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    
                    <h3 className="text-xl font-bold text-green-900 mt-4 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="text-green-100 mb-8">
              Subscribe to our newsletter for the latest articles, treatment updates, and medical cannabis news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button 
                onClick={handleSubscribe}
                className="bg-white text-green-900 hover:bg-gray-100"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
