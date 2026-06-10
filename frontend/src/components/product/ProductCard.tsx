'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // TODO: Implement add to cart functionality
      if (onAddToCart) {
        onAddToCart(product);
      }
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <div className="relative bg-gray-200 h-48 overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400 text-center">
            <p className="text-4xl mb-2">📦</p>
            <p>No image available</p>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/shop/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-green-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500">⭐ {product.rating}</span>
            <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
          </div>
        )}

        {/* Price */}
        <p className="text-2xl font-bold text-green-600 mb-4">₹{product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-2 rounded font-semibold transition ${
            isAdded
              ? 'bg-green-100 text-green-700 border-2 border-green-600'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isAdding ? 'Adding...' : isAdded ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
