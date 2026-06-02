'use client';

import React, { useState, useEffect } from 'react';
import JokeCard from '@/components/joke/JokeCard';
import JokeCategorySelector from '@/components/joke/JokeCategorySelector';

interface Joke {
  id: number;
  setup: string;
  punchline: string;
  type: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export default function JokeGeneratorPage() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPunchline, setShowPunchline] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'multiple'>('single');

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch joke when category changes
  useEffect(() => {
    if (viewMode === 'single') {
      fetchRandomJoke();
    }
  }, [selectedCategory, viewMode]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/v1/jokes/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchRandomJoke = async () => {
    setLoading(true);
    setError(null);
    setShowPunchline(false);

    try {
      const response = await fetch(`/api/v1/jokes/random?category=${selectedCategory}`);
      const data = await response.json();

      if (data.success) {
        setJoke(data.joke);
      } else {
        setError('Failed to fetch joke. Please try again.');
      }
    } catch (err) {
      setError('Error fetching joke. Please check your connection.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMultipleJokes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/jokes/multiple?count=10');
      const data = await response.json();

      if (data.success) {
        setJokes(data.jokes);
      } else {
        setError('Failed to fetch jokes. Please try again.');
      }
    } catch (err) {
      setError('Error fetching jokes. Please check your connection.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetNewJoke = () => {
    if (viewMode === 'single') {
      fetchRandomJoke();
    } else {
      fetchMultipleJokes();
    }
  };

  const handleShareJoke = async () => {
    if (!joke) return;

    try {
      // Share to social media or copy to clipboard
      const jokeText = `${joke.setup}\n${joke.punchline}`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this joke!',
          text: jokeText,
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(jokeText);
        alert('Joke copied to clipboard!');
      }

      // Track the share
      await fetch('/api/v1/jokes/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jokeId: joke.id,
          category: selectedCategory,
        }),
      });
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">😂 Joke Generator</h1>
          <p className="text-xl text-white/90">Get a daily dose of laughter!</p>
        </div>

        {/* View Mode Selector */}
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 mb-6 text-white">
          <p className="mb-4 font-semibold">Select View Mode:</p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setViewMode('single');
                setShowPunchline(false);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                viewMode === 'single'
                  ? 'bg-white text-purple-600'
                  : 'bg-white/30 hover:bg-white/40'
              }`}
            >
              Single Joke
            </button>
            <button
              onClick={() => setViewMode('multiple')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                viewMode === 'multiple'
                  ? 'bg-white text-purple-600'
                  : 'bg-white/30 hover:bg-white/40'
              }`}
            >
              Multiple Jokes
            </button>
          </div>
        </div>

        {/* Category Selector - Only for single mode */}
        {viewMode === 'single' && (
          <JokeCategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/90 text-white p-4 rounded-lg mb-6">
            <p className="font-semibold">⚠️ {error}</p>
          </div>
        )}

        {/* Single Joke View */}
        {viewMode === 'single' && joke && (
          <div className="mb-6">
            <JokeCard
              joke={joke}
              showPunchline={showPunchline}
              onTogglePunchline={() => setShowPunchline(!showPunchline)}
              onShare={handleShareJoke}
            />
          </div>
        )}

        {/* Multiple Jokes View */}
        {viewMode === 'multiple' && jokes.length > 0 && (
          <div className="space-y-4 mb-6">
            {jokes.map((j, index) => (
              <JokeCard key={j.id} joke={j} showPunchline={true} index={index + 1} />
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-12 text-center">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-white font-semibold text-lg">Loading joke...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && viewMode === 'multiple' && jokes.length === 0 && !error && (
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-12 text-center">
            <p className="text-white text-lg">Click "Get Jokes" to load jokes</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleGetNewJoke}
            disabled={loading}
            className="flex-1 bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Loading...' : viewMode === 'single' ? '🔄 New Joke' : '📚 Get Jokes'}
          </button>
          {viewMode === 'single' && joke && (
            <button
              onClick={handleShareJoke}
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              📤 Share
            </button>
          )}
        </div>

        {/* API Health Status */}
        <div className="mt-8 text-center text-white/80 text-sm">
          <p>Powered by Official Joke API</p>
        </div>
      </div>
    </div>
  );
}
