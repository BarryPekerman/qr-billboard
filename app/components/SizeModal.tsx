'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef } from 'react';

interface SizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  isCustomPattern: boolean;
}

export default function SizeModal({
  isOpen,
  onClose,
  productId,
  productName,
  isCustomPattern,
}: SizeModalProps) {
  const router = useRouter();
  const widthInputRef = useRef<HTMLInputElement>(null);

  // Focus width input when modal opens
  useEffect(() => {
    if (isOpen && widthInputRef.current) {
      widthInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const width = formData.get('width') as string;
    const height = formData.get('height') as string;
    const customDescription = formData.get('customDescription') as string;

    // Build query params
    const params = new URLSearchParams();
    params.set('width', width);
    params.set('height', height);
    if (isCustomPattern && customDescription) {
      params.set('customDescription', customDescription);
    }

    router.push(`/products/${productId}?${params.toString()}`);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Select Size for {productName}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="width"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Width (cm) *
              </label>
              <input
                ref={widthInputRef}
                type="number"
                id="width"
                name="width"
                required
                min="1"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 120"
              />
            </div>

            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Height (cm) *
              </label>
              <input
                type="number"
                id="height"
                name="height"
                required
                min="1"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 240"
              />
            </div>
          </div>

          {/* TODO: Add min/max constraints after client discussion */}

          {isCustomPattern && (
            <div>
              <label
                htmlFor="customDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pattern Description
              </label>
              <textarea
                id="customDescription"
                name="customDescription"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your desired marble pattern, colors, veining style, etc."
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
