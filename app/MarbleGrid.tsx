'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/products';
import SizeModal from './components/SizeModal';

interface MarbleGridProps {
  products: Product[];
}

export default function MarbleGrid({ products }: MarbleGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handlePatternClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => handlePatternClick(product)}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow text-left"
          >
            <div className="aspect-[3/4] relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <div className="mt-3 text-blue-600 font-medium flex items-center gap-1">
                <span>Select This Pattern</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      <SizeModal
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
        productId={selectedProduct?.id || ''}
        productName={selectedProduct?.name || ''}
        isCustomPattern={selectedProduct?.id === 'custom-pattern'}
      />
    </>
  );
}
