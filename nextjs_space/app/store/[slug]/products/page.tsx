'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Search, Leaf, Droplet, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { toast } from 'sonner';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  strain_type: 'INDICA' | 'SATIVA' | 'HYBRID';
  thc_content: number;
  cbd_content: number;
  price: number;
  currency: string;
  in_stock: boolean;
  stock_quantity: number;
  image_url?: string;
  images?: string[];
  category?: string;
  manufacturer?: string;
}

export default function ProductsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/store/${slug}/products`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
      } else {
        setError(data.error || 'Failed to load products');
      }
    } catch (err) {
      setError('Failed to connect to product catalog');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || product.strain_type === selectedType.toUpperCase();
    return matchesSearch && matchesType;
  });

  const getStrainColor = (type: string) => {
    switch (type) {
      case 'INDICA': return 'from-purple-600 to-purple-800';
      case 'SATIVA': return 'from-orange-600 to-orange-800';
      case 'HYBRID': return 'from-green-600 to-green-800';
      default: return 'from-green-600 to-green-800';
    }
  };

  return (
    <div 
      className="min-h-screen pt-20" 
      style={{ 
        backgroundColor: 'var(--tenant-color-background, #ffffff)',
        fontFamily: 'var(--tenant-font-base, inherit)'
      }}
    >
      {/* Hero Section */}
      <section 
        className="relative py-20"
        style={{ 
          background: 'linear-gradient(135deg, var(--tenant-color-surface, #f9fafb) 0%, var(--tenant-color-background, #ffffff) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-8"
              style={{ 
                color: 'var(--tenant-color-heading, #111827)',
                fontFamily: 'var(--tenant-font-heading, inherit)'
              }}
            >
              Medical Cannabis Products
            </h1>
            <p 
              className="text-xl leading-relaxed"
              style={{ color: 'var(--tenant-color-text, #1f2937)' }}
            >
              Browse our curated selection of EU-GMP certified medical cannabis strains. 
              All products require a valid prescription.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section 
        className="py-8"
        style={{ 
          backgroundColor: 'var(--tenant-color-background, #ffffff)',
          borderBottomColor: 'var(--tenant-color-border, #e5e7eb)',
          borderBottomWidth: '1px'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedType('all')}
                size="sm"
                disabled={loading}
              >
                All
              </Button>
              <Button
                variant={selectedType === 'indica' ? 'default' : 'outline'}
                onClick={() => setSelectedType('indica')}
                size="sm"
                disabled={loading}
              >
                Indica
              </Button>
              <Button
                variant={selectedType === 'sativa' ? 'default' : 'outline'}
                onClick={() => setSelectedType('sativa')}
                size="sm"
                disabled={loading}
              >
                Sativa
              </Button>
              <Button
                variant={selectedType === 'hybrid' ? 'default' : 'outline'}
                onClick={() => setSelectedType('hybrid')}
                size="sm"
                disabled={loading}
              >
                Hybrid
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section 
        className="py-16"
        style={{ backgroundColor: 'var(--tenant-color-surface, #f9fafb)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 
                className="w-12 h-12 animate-spin mb-4" 
                style={{ color: 'var(--tenant-color-primary, #059669)' }}
              />
              <p style={{ color: 'var(--tenant-color-text, #1f2937)' }}>
                Loading products from Doctor Green...
              </p>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
                <Button
                  onClick={fetchProducts}
                  variant="outline"
                  size="sm"
                  className="ml-4"
                >
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p 
                className="text-xl mb-4"
                style={{ color: 'var(--tenant-color-text, #1f2937)' }}
              >
                No products found matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                  style={{ 
                    backgroundColor: 'var(--tenant-color-background, #ffffff)',
                    boxShadow: 'var(--tenant-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1))'
                  }}
                >
                  <div className={`bg-gradient-to-br ${getStrainColor(product.strain_type)} h-48 flex items-center justify-center relative`}>
                    {product.image_url ? (
                      <div className="relative w-full h-full bg-muted">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <Leaf className="w-24 h-24 text-white opacity-30" />
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 
                        className="text-xl font-bold"
                        style={{ color: 'var(--tenant-color-heading, #111827)' }}
                      >
                        {product.name}
                      </h3>
                      <span 
                        className="px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ 
                          backgroundColor: 'var(--tenant-color-success-light, #d1fae5)',
                          color: 'var(--tenant-color-success, #10b981)'
                        }}
                      >
                        {product.strain_type}
                      </span>
                    </div>
                    
                    <p 
                      className="text-sm mb-4 line-clamp-2"
                      style={{ color: 'var(--tenant-color-text, #1f2937)' }}
                    >
                      {product.description}
                    </p>
                    
                    <div className="flex gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Droplet 
                          className="w-4 h-4" 
                          style={{ color: 'var(--tenant-color-accent, #a855f7)' }}
                        />
                        <span 
                          className="text-sm"
                          style={{ color: 'var(--tenant-color-text, #1f2937)' }}
                        >
                          <span className="font-semibold">THC:</span> {product.thc_content}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf 
                          className="w-4 h-4" 
                          style={{ color: 'var(--tenant-color-primary, #059669)' }}
                        />
                        <span 
                          className="text-sm"
                          style={{ color: 'var(--tenant-color-text, #1f2937)' }}
                        >
                          <span className="font-semibold">CBD:</span> {product.cbd_content}%
                        </span>
                      </div>
                    </div>
                    
                    {product.category && (
                      <div className="mb-4">
                        <span 
                          className="px-2 py-1 text-xs rounded"
                          style={{ 
                            backgroundColor: 'var(--tenant-color-surface, #f9fafb)',
                            color: 'var(--tenant-color-text, #1f2937)'
                          }}
                        >
                          {product.category}
                        </span>
                      </div>
                    )}
                    
                    <div 
                      className="flex items-center justify-between pt-4"
                      style={{ 
                        borderTopColor: 'var(--tenant-color-border, #e5e7eb)',
                        borderTopWidth: '1px'
                      }}
                    >
                      <div>
                        <span 
                          className="text-2xl font-bold"
                          style={{ color: 'var(--tenant-color-heading, #111827)' }}
                        >
                          {product.currency} {product.price.toFixed(2)}
                        </span>
                        {!product.in_stock && (
                          <p 
                            className="text-xs mt-1"
                            style={{ color: 'var(--tenant-color-error, #ef4444)' }}
                          >
                            Out of stock
                          </p>
                        )}
                      </div>
                      <Link href={`/store/${slug}/products/${product.id}`}>
                        <Button 
                          style={{
                            backgroundColor: 'var(--tenant-color-primary, #059669)',
                            color: '#ffffff'
                          }}
                          disabled={!product.in_stock}
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Prescription Notice */}
      <section 
        className="py-12"
        style={{ 
          backgroundColor: 'var(--tenant-color-info-light, #dbeafe)',
          borderTopColor: 'var(--tenant-color-info, #3b82f6)',
          borderBottomColor: 'var(--tenant-color-info, #3b82f6)',
          borderTopWidth: '1px',
          borderBottomWidth: '1px'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 
            className="text-2xl font-bold mb-4"
            style={{ color: 'var(--tenant-color-heading, #111827)' }}
          >
            Prescription Required
          </h3>
          <p 
            className="mb-6"
            style={{ color: 'var(--tenant-color-text, #1f2937)' }}
          >
            All medical cannabis products require a valid prescription from a licensed physician. 
            Start your free consultation to see if you qualify.
          </p>
          <Link href="/auth/signup">
            <Button 
              size="lg" 
              style={{
                backgroundColor: 'var(--tenant-color-primary, #059669)',
                color: '#ffffff'
              }}
            >
              Start Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
