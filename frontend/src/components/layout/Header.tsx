'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Connect to actual cart state
  const cartCount = useSelector((state: RootState) => state.cart?.items?.length || 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', searchQuery);
  };

  return (
    <header className="bg-white shadow-md">
      {/* Top Navigation Bar */}
      <div className="bg-green-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div>Free shipping on orders above ₹500</div>
          <div className="flex gap-4">
            <Link href="/help" className="hover:underline">Help</Link>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            🛒 Quickmart
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search products, brands, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button type="submit" className="absolute right-2 top-2 text-gray-400 hover:text-green-600">
                🔍
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link href="/user/profile" className="hover:text-green-600">
              👤 Account
            </Link>
            <Link href="/shop/cart" className="relative hover:text-green-600">
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex gap-6 border-t pt-4">
          <Link href="/shop/products" className="hover:text-green-600 font-semibold">All Products</Link>
          <Link href="/shop/category/fruits" className="hover:text-green-600">Fruits</Link>
          <Link href="/shop/category/vegetables" className="hover:text-green-600">Vegetables</Link>
          <Link href="/shop/category/dairy" className="hover:text-green-600">Dairy</Link>
          <Link href="/shop/category/bakery" className="hover:text-green-600">Bakery</Link>
          <Link href="#" className="ml-auto hover:text-green-600">Offers</Link>
        </nav>
      </div>
    </header>
  );
}
