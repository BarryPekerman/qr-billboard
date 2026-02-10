import { products } from '@/lib/products';
import MarbleGrid from './MarbleGrid';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Firm Branding Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Premium Marble & Stone
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Elevate your space with our exquisite collection of premium marble patterns.
          From timeless classics to bold contemporary designs, we bring luxury and
          sophistication to every project with expert craftsmanship and personalized service.
        </p>

        {/* Stats Badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600">15+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600">98%</div>
            <div className="text-sm text-gray-600">Customer Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Pattern Selection Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Select Your Pattern
        </h2>
        <p className="text-gray-600 mb-6">
          Choose from our curated collection of premium marble patterns. Click any pattern to specify your dimensions.
        </p>
      </div>

      <MarbleGrid products={products} />
    </div>
  );
}
