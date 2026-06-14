/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export default function SearchBar({ value, onChange, placeholder = "Search by university, country, or major...", onClear }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        id="ios-search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-12 pr-12 py-4 bg-white border border-[#E5E5EA] rounded-2xl text-[16px] placeholder-[#8E8E93] text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] ios-shadow ios-transition"
      />
      {value && (
        <button
          onClick={onClear}
          id="search-clear-btn"
          className="absolute inset-y-0 right-0 pr-4.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <X className="h-5 w-5 bg-gray-100 rounded-full p-0.5" />
        </button>
      )}
    </div>
  );
}
