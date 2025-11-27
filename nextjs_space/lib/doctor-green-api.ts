
/**
 * Doctor Green API Integration
 * Two-layer security: API key + ECDSA cryptographic signature
 */

const API_URL = process.env.DOCTOR_GREEN_API_URL || 'https://stage-api.drgreennft.com/api/v1';
const API_KEY = process.env.DOCTOR_GREEN_API_KEY || '';
const SECRET_KEY = process.env.DOCTOR_GREEN_SECRET_KEY || '';

// Currency mapping by country code
const CURRENCY_MAP: Record<string, string> = {
  'PT': 'EUR',  // Portugal - Euro
  'ES': 'EUR',  // Spain - Euro
  'FR': 'EUR',  // France - Euro
  'DE': 'EUR',  // Germany - Euro
  'IT': 'EUR',  // Italy - Euro
  'NL': 'EUR',  // Netherlands - Euro
  'BE': 'EUR',  // Belgium - Euro
  'AT': 'EUR',  // Austria - Euro
  'IE': 'EUR',  // Ireland - Euro
  'GR': 'EUR',  // Greece - Euro
  'SA': 'ZAR',  // South Africa - South African Rand
  'UK': 'GBP',  // United Kingdom - British Pound
  'GB': 'GBP',  // Great Britain - British Pound
  'US': 'USD',  // United States - US Dollar
  'CA': 'CAD',  // Canada - Canadian Dollar
  'AU': 'AUD',  // Australia - Australian Dollar
  'NZ': 'NZD',  // New Zealand - New Zealand Dollar
  'CH': 'CHF',  // Switzerland - Swiss Franc
  'SE': 'SEK',  // Sweden - Swedish Krona
  'NO': 'NOK',  // Norway - Norwegian Krone
  'DK': 'DKK',  // Denmark - Danish Krone
  'PL': 'PLN',  // Poland - Polish Zloty
  'CZ': 'CZK',  // Czech Republic - Czech Koruna
  'IL': 'ILS',  // Israel - Israeli Shekel
  'BR': 'BRL',  // Brazil - Brazilian Real
  'MX': 'MXN',  // Mexico - Mexican Peso
  'AR': 'ARS',  // Argentina - Argentine Peso
  'CL': 'CLP',  // Chile - Chilean Peso
  'CO': 'COP',  // Colombia - Colombian Peso
  'TH': 'THB',  // Thailand - Thai Baht
  'MY': 'MYR',  // Malaysia - Malaysian Ringgit
  'SG': 'SGD',  // Singapore - Singapore Dollar
  'IN': 'INR',  // India - Indian Rupee
  'PK': 'PKR',  // Pakistan - Pakistani Rupee
  'PH': 'PHP',  // Philippines - Philippine Peso
  'ID': 'IDR',  // Indonesia - Indonesian Rupiah
  'JP': 'JPY',  // Japan - Japanese Yen
  'KR': 'KRW',  // South Korea - South Korean Won
  'CN': 'CNY',  // China - Chinese Yuan
  'HK': 'HKD',  // Hong Kong - Hong Kong Dollar
  'TW': 'TWD',  // Taiwan - New Taiwan Dollar
};

/**
 * Get currency code by country code
 */
export function getCurrencyByCountry(countryCode: string): string {
  return CURRENCY_MAP[countryCode.toUpperCase()] || 'EUR';
}

interface DoctorGreenAPIOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

/**
 * Generate ECDSA signature for API request (using Node.js crypto)
 */
function generateSignature(payload: string): string {
  try {
    const crypto = require('crypto');
    
    // Decode the base64 private key
    const privateKeyPEM = Buffer.from(SECRET_KEY, 'base64').toString('utf-8');
    
    // Sign the payload with SHA256
    const sign = crypto.createSign('SHA256');
    sign.update(payload);
    sign.end();
    
    // Generate signature and return as base64
    const signature = sign.sign(privateKeyPEM);
    return signature.toString('base64');
  } catch (error) {
    console.error('Error generating signature:', error);
    throw new Error('Failed to generate API signature');
  }
}

/**
 * Make authenticated request to Doctor Green API
 */
export async function doctorGreenRequest<T>(
  endpoint: string,
  options: DoctorGreenAPIOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;
  
  // Prepare payload
  const payload = body ? JSON.stringify(body) : '';
  
  // Prepare request headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-auth-apikey': API_KEY,
    ...headers,
  };
  
  // Generate signature for POST/PATCH/DELETE requests (GET requests don't need signature)
  if (method !== 'GET' && payload) {
    const signature = generateSignature(payload);
    requestHeaders['x-auth-signature'] = signature;
  }
  
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: payload || undefined,
      cache: 'no-store',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Doctor Green API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error('Doctor Green API Request Error:', error);
    throw error;
  }
}

// ============================================
// API Methods
// ============================================

export interface DoctorGreenProduct {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  thc: number;
  cbd: number;
  cbg?: number;
  type: string; // e.g., "Indica", "Sativa", "Hybrid"
  flavour?: string;
  feelings?: string;
  helpsWith?: string;
  retailPrice: number;
  stockQuantity: number;
  popularity?: number;
  isAvailable: boolean;
  
  // Normalized fields for backwards compatibility
  strain_type?: 'INDICA' | 'SATIVA' | 'HYBRID';
  thc_content?: number;
  cbd_content?: number;
  price?: number;
  currency?: string;
  in_stock?: boolean;
  stock_quantity?: number;
  image_url?: string;
  images?: string[];
  category?: string;
  manufacturer?: string;
  certifications?: string[];
}

export interface DoctorGreenClient {
  id: string;
  nft_token_id: string;
  wallet_address: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  verified: boolean;
  created_at: string;
}

export interface DoctorGreenOrder {
  id: string;
  client_id: string;
  order_number: string;
  status: string;
  total_amount: number;
  currency: string;
  items: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }>;
  shipping_address?: any;
  created_at: string;
}

// Professional product image fallbacks (AI-generated medical-grade images)
// Doctor Green staging API returns image paths but files are not hosted (404 errors)
const PRODUCT_IMAGE_FALLBACKS: Record<string, string> = {
  'Acapulco Gold': 'https://cdn.abacus.ai/images/f18d746e-06d5-4a86-93d1-aef2e7d1a4a6.png',
  'Wedding Crasher': 'https://cdn.abacus.ai/images/dbd04817-f7b5-4916-8b8c-867f43f506d7.png',
  'The Soap': 'https://cdn.abacus.ai/images/682bfd15-fad7-4194-b995-072b0e02afdd.png',
  'Gelato #33': 'https://cdn.abacus.ai/images/a460c225-4d56-45d2-bb03-7d5999b4e8f4.png',
  'Nerds': 'https://cdn.abacus.ai/images/f1c0b74b-c7cf-4c49-b0d5-82d25b8f4b39.png',
  'Godfather OG': 'https://cdn.abacus.ai/images/e93e05e9-d028-4d9c-9cd0-69d92300ed36.png',
  'Pink Panties': 'https://cdn.abacus.ai/images/6f89e66f-7d05-4f4f-bddf-f5ffec7abae2.png',
  'Skywalker OG': 'https://cdn.abacus.ai/images/d05ad43d-0470-4e62-8b21-beb43a3f28da.png',
  'Animal Mints': 'https://cdn.abacus.ai/images/ed270b17-ac4a-4e63-87f2-4db29bdd8baf.png',
  'Zkittlez': 'https://cdn.abacus.ai/images/9e1e39ad-b91b-49fc-9f95-9f35040d72b9.png',
};

/**
 * Fetch all products from Doctor Green
 * @param country - Two-letter country code (e.g., 'PT' for Portugal, 'SA' for South Africa)
 */
export async function fetchProducts(country: string = 'PT'): Promise<DoctorGreenProduct[]> {
  const response = await doctorGreenRequest<{ data: { strains: DoctorGreenProduct[] } }>(
    `/strains?country=${country}`
  );
  
  // Extract strains from the response and normalize the data
  const products = response.data?.strains || [];
  
  // Base URL for Doctor Green images
  const IMAGE_BASE_URL = 'https://stage-api.drgreennft.com';
  
  // Get currency for this country
  const currency = getCurrencyByCountry(country);
  
  // Normalize fields for backwards compatibility with our UI
  return products.map(product => {
    // Construct full image URL if imageUrl is relative
    let fullImageUrl = product.imageUrl;
    if (fullImageUrl && !fullImageUrl.startsWith('http')) {
      fullImageUrl = `${IMAGE_BASE_URL}/${fullImageUrl}`;
    }
    
    // Use fallback image - Doctor Green staging doesn't host actual images yet
    const fallbackImage = PRODUCT_IMAGE_FALLBACKS[product.name];
    if (fallbackImage) {
      fullImageUrl = fallbackImage;
    }
    
    return {
      ...product,
      strain_type: (product.type?.toUpperCase() as 'INDICA' | 'SATIVA' | 'HYBRID') || 'HYBRID',
      thc_content: product.thc || 0,
      cbd_content: product.cbd || 0,
      price: product.retailPrice || 0,
      currency: currency, // Dynamic currency based on country
      in_stock: product.isAvailable !== false, // Default to true if undefined
      stock_quantity: product.stockQuantity || 0,
      image_url: fullImageUrl,
      imageUrl: fullImageUrl,
    };
  });
}

/**
 * Fetch a single product by ID
 */
export async function fetchProduct(productId: string, country: string = 'PT'): Promise<DoctorGreenProduct> {
  const response = await doctorGreenRequest<{ data: DoctorGreenProduct }>(
    `/strains/${productId}`
  );
  
  const product = response.data;
  
  // Base URL for Doctor Green images
  const IMAGE_BASE_URL = 'https://stage-api.drgreennft.com';
  
  // Get currency for this country
  const currency = getCurrencyByCountry(country);
  
  // Construct full image URL if imageUrl is relative
  let fullImageUrl = product.imageUrl;
  if (fullImageUrl && !fullImageUrl.startsWith('http')) {
    fullImageUrl = `${IMAGE_BASE_URL}/${fullImageUrl}`;
  }
  
  // Normalize fields for backwards compatibility
  return {
    ...product,
    strain_type: (product.type?.toUpperCase() as 'INDICA' | 'SATIVA' | 'HYBRID') || 'HYBRID',
    thc_content: product.thc || 0,
    cbd_content: product.cbd || 0,
    price: product.retailPrice || 0,
    currency: currency, // Dynamic currency based on country
    in_stock: product.isAvailable !== false, // Default to true if undefined
    stock_quantity: product.stockQuantity || 0,
    image_url: fullImageUrl,
    imageUrl: fullImageUrl,
  };
}

/**
 * Verify NFT ownership
 */
export async function verifyNFT(tokenId: string): Promise<any> {
  return doctorGreenRequest(`/nfts/${tokenId}/verify`);
}

/**
 * Get client information by NFT token
 */
export async function getClientByNFT(tokenId: string): Promise<DoctorGreenClient> {
  return doctorGreenRequest<DoctorGreenClient>(`/clients/nft/${tokenId}`);
}

/**
 * Create a new order
 */
export async function createOrder(orderData: any): Promise<DoctorGreenOrder> {
  return doctorGreenRequest<DoctorGreenOrder>('/orders', {
    method: 'POST',
    body: orderData,
  });
}

/**
 * Fetch client orders
 */
export async function fetchClientOrders(clientId: string): Promise<DoctorGreenOrder[]> {
  return doctorGreenRequest<DoctorGreenOrder[]>(`/clients/${clientId}/orders`);
}

/**
 * Add product to cart
 */
export async function addToCart(clientId: string, productId: string, quantity: number): Promise<any> {
  return doctorGreenRequest(`/clients/${clientId}/cart`, {
    method: 'POST',
    body: { product_id: productId, quantity },
  });
}
