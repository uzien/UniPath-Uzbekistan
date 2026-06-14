/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
  t: Record<string, string>; // Dynamic translations
}

export default function SearchBar({ value, onChange, placeholder = "Search...", onClear, t }: SearchBarProps) {
  const [localValue, setLocalValue] = useState<string>(value);

  // Sync internal state if parent state changes (e.g. from Clear or Reset triggers)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(localValue);
  };

  const handleClearClick = () => {
    setLocalValue('');
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2.5xl mx-auto">
      <div className="relative flex items-center gap-2.5 bg-white border border-[#E5E5EA] rounded-3xl p-1.5 pl-4.5 ios-shadow focus-within:ring-2 focus-within:ring-[#007AFF]/20 focus-within:border-[#007AFF] ios-transition">
        {/* Search Icon */}
        <div className="text-gray-400 flex items-center justify-center flex-shrink-0">
          <Search className="h-5 w-5" />
        </div>

        {/* Input field */}
        <input
          type="text"
          id="ios-search-input"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className="block w-full py-3 bg-transparent text-[16px] placeholder-[#8E8E93] text-[#1C1C1E] focus:outline-none"
        />

        {/* Clear Button */}
        {localValue && (
          <button
            type="button"
            onClick={handleClearClick}
            id="search-clear-btn"
            className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none mr-1"
            title="Clear"
          >
            <X className="h-4 w-4 bg-gray-100 rounded-full p-0.5" />
          </button>
        )}

        {/* Trigger/Submit Button */}
        <button
          type="submit"
          id="search-submit-btn"
          className="px-6 py-3 bg-[#007AFF] hover:bg-[#007AFF]/90 active:scale-[0.98] text-white rounded-[18px] text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm ios-transition cursor-pointer shrink-0"
        >
          <span>{t.searchTrigger || 'Search'}</span>
        </button>
      </div>
    </form>
  );
}
