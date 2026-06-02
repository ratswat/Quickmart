'use client';

import React from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

interface JokeCategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function JokeCategorySelector({
  categories,
  selectedCategory,
  onCategoryChange,
}: JokeCategorySelectorProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 mb-6">
      <p className="text-white font-semibold mb-4">Choose a Category:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`p-4 rounded-lg font-semibold transition transform hover:scale-105 ${
              selectedCategory === category.id
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-white/30 text-white hover:bg-white/40'
            }`}
          >
            <span className="text-2xl block mb-1">{category.emoji}</span>
            <span className="block text-sm">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
