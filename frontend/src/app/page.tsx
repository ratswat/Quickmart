'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  useEffect(() => {
    // TODO: Implement homepage logic
    // 1. Fetch featured products
    // 2. Fetch promotional banners
    // 3. Fetch best-selling items
    // 4. Setup analytics tracking
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative w-full h-96 bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Quickmart</h1>
          <p className="text-xl mb-8">Fresh groceries delivered to your doorstep</p>
          <Link href="/shop/products" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Fruits', icon: '🍎' },
            { name: 'Vegetables', icon: '🥕' },
            { name: 'Dairy', icon: '🥛' },
            { name: 'Bakery', icon: '🍞' },
            { name: 'Meat', icon: '🥩' },
            { name: 'Beverages', icon: '☕' },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/shop/category/${category.name.toLowerCase()}`}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <p className="font-semibold">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-16 px-4 max-w-7xl mx-auto bg-white rounded-lg">
        <h2 className="text-3xl font-bold mb-8">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* TODO: Replace with actual product data */}
          {[1, 2, 3, 4].map((product) => (
            <div key={product} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="bg-gray-200 h-40 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-400">Product Image</span>
              </div>
              <h3 className="font-semibold mb-2">Product {product}</h3>
              <p className="text-gray-600 mb-4">₹299.00</p>
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-2">50% Off on Fruits</h3>
            <p className="mb-4">Get fresh fruits at amazing prices</p>
            <Link href="/shop/category/fruits" className="bg-white text-orange-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
              Shop Now
            </Link>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-2">Free Delivery</h3>
            <p className="mb-4">On orders above ₹500</p>
            <Link href="/shop/products" className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
