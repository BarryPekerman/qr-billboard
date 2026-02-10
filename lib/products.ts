export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 'carrara-white',
    name: 'Carrara White',
    image: '/products/carrara-white.jpg',
    description: 'Classic Italian marble featuring elegant white background with soft gray veining. Perfect for timeless luxury in any space.',
    features: [
      'Pure white background',
      'Delicate gray veining',
      'Classic Italian origin',
      'Suitable for indoor applications',
      'Polished or honed finish available',
    ],
  },
  {
    id: 'calacatta-gold',
    name: 'Calacatta Gold',
    image: '/products/calacatta-gold.jpg',
    description: 'Premium marble with dramatic golden and gray veining on pristine white. The epitome of luxury and sophistication.',
    features: [
      'Distinctive gold veining',
      'Bright white background',
      'Bold dramatic patterns',
      'High-end luxury applications',
      'Statement piece material',
    ],
  },
  {
    id: 'emperador-dark',
    name: 'Emperador Dark',
    image: '/products/emperador-dark.jpg',
    description: 'Rich dark brown marble with striking white veining. Adds warmth and dramatic elegance to any interior.',
    features: [
      'Deep chocolate brown base',
      'Prominent white veining',
      'Warm luxurious feel',
      'Excellent for accent walls',
      'Available in various thicknesses',
    ],
  },
  {
    id: 'custom-pattern',
    name: 'Custom Pattern',
    image: '/products/custom-pattern.jpg',
    description: 'Have a specific marble pattern in mind? Work with our team to source and create your perfect custom marble solution.',
    features: [
      'Personalized pattern selection',
      'Expert sourcing worldwide',
      'Custom specifications',
      'Dedicated design consultation',
      'Unique project solutions',
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getAllProductIds(): string[] {
  return products.map((product) => product.id);
}
