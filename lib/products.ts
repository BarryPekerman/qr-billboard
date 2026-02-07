export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    price: 199.99,
    image: '/products/product-1.jpg',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life. Experience crystal-clear audio quality and comfort for all-day wear.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0 connectivity',
      'Premium leather ear cushions',
      'Foldable design with carrying case',
    ],
  },
  {
    id: '2',
    name: 'Smart Watch Ultra',
    price: 349.99,
    image: '/products/product-2.jpg',
    description: 'Advanced fitness tracking smartwatch with heart rate monitoring, GPS, and water resistance. Stay connected and track your health goals.',
    features: [
      'Heart rate & SpO2 monitoring',
      'Built-in GPS',
      'Water resistant up to 50m',
      '7-day battery life',
      'Sleep tracking & analysis',
    ],
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    image: '/products/product-3.jpg',
    description: 'Premium ergonomic office chair with lumbar support and adjustable features. Designed for maximum comfort during long work sessions.',
    features: [
      'Adjustable lumbar support',
      '4D armrests',
      'Breathable mesh back',
      'Tilt and height adjustment',
      'Weight capacity: 300 lbs',
    ],
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    image: '/products/product-4.jpg',
    description: 'Compact waterproof speaker with 360° sound and 12-hour battery. Perfect for outdoor adventures and pool parties.',
    features: [
      '360° surround sound',
      'IPX7 waterproof rating',
      '12-hour playtime',
      'USB-C fast charging',
      'Built-in microphone for calls',
    ],
  },
  {
    id: '5',
    name: 'LED Desk Lamp',
    price: 49.99,
    image: '/products/product-5.jpg',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. Reduce eye strain with flicker-free illumination.',
    features: [
      '5 brightness levels',
      '3 color temperature modes',
      'Touch control panel',
      'USB charging port',
      'Energy-efficient LED',
    ],
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: '/products/product-6.jpg',
    description: 'Premium mechanical keyboard with RGB backlighting and customizable keys. Perfect for gaming and productivity.',
    features: [
      'Mechanical switches (tactile)',
      'RGB per-key backlighting',
      'Aluminum frame',
      'Programmable macro keys',
      'Detachable USB-C cable',
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getAllProductIds(): string[] {
  return products.map((product) => product.id);
}

