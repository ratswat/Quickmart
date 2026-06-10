'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quickmart</h3>
            <p className="text-sm mb-4">Your trusted online supermarket for fresh groceries and essentials.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-500">📘</a>
              <a href="#" className="hover:text-green-500">🐦</a>
              <a href="#" className="hover:text-green-500">📷</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-green-500">Home</Link></li>
              <li><Link href="/shop/products" className="hover:text-green-500">Products</Link></li>
              <li><Link href="/about" className="hover:text-green-500">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-green-500">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-green-500">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-green-500">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-green-500">Returns</Link></li>
              <li><Link href="/help" className="hover:text-green-500">Help Center</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to get special offers and updates</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 text-dark rounded-l"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="text-white font-semibold mb-2">Payment Methods</h5>
              <p className="text-sm">Credit Card • Debit Card • UPI • Net Banking • Wallet • COD</p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2">Policies</h5>
              <Link href="/privacy" className="text-sm hover:text-green-500 mr-4">Privacy Policy</Link>
              <Link href="/terms" className="text-sm hover:text-green-500">Terms & Conditions</Link>
            </div>
            <div className="text-right">
              <p className="text-sm">© {currentYear} Quickmart. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
