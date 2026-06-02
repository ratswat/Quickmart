'use client';

import React from 'react';

interface Joke {
  id: number;
  setup: string;
  punchline: string;
  type: string;
  category?: string;
}

interface JokeCardProps {
  joke: Joke;
  showPunchline?: boolean;
  onTogglePunchline?: () => void;
  onShare?: () => void;
  index?: number;
}

export default function JokeCard({
  joke,
  showPunchline = true,
  onTogglePunchline,
  onShare,
  index,
}: JokeCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 text-white shadow-xl hover:shadow-2xl transition">
      {/* Index for multiple jokes view */}
      {index && <p className="text-sm font-semibold opacity-75 mb-2">Joke #{index}</p>}

      {/* Setup */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold leading-relaxed">{joke.setup}</h2>
      </div>

      {/* Punchline */}
      {showPunchline ? (
        <div className="mb-6 p-4 bg-white/10 rounded-lg border-l-4 border-white/50">
          <p className="text-xl font-semibold text-yellow-200">{joke.punchline}</p>
        </div>
      ) : (
        <div className="mb-6">
          <button
            onClick={onTogglePunchline}
            className="bg-white/30 hover:bg-white/40 px-6 py-2 rounded-lg font-semibold transition"
          >
            Show Punchline 😄
          </button>
        </div>
      )}

      {/* Category Badge */}
      {joke.category && (
        <div className="mb-4">
          <span className="inline-block bg-white/30 px-3 py-1 rounded-full text-sm font-semibold">
            {joke.category}
          </span>
        </div>
      )}

      {/* Share Button (for single joke view) */}
      {onShare && showPunchline && (
        <div className="pt-4 border-t border-white/30">
          <button
            onClick={onShare}
            className="text-sm font-semibold hover:text-yellow-200 transition"
          >
            📤 Share this joke
          </button>
        </div>
      )}
    </div>
  );
}
