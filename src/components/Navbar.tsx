/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, GraduationCap, Sparkles, Globe } from 'lucide-react';
import { Language } from '../translations';

interface NavbarProps {
  onGoHome: () => void;
  onOpenProfile: () => void;
  profileStateSummary?: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  langLabelProfile: string;
}

export default function Navbar({
  onGoHome,
  onOpenProfile,
  profileStateSummary,
  language,
  onLanguageChange,
  langLabelProfile
}: NavbarProps) {
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'de', label: 'DE' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-[#D1D1D6] px-6 py-4 shrink-0">
      <div className="max-w-5xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* LOGO AREA */}
        <button
          onClick={onGoHome}
          id="nav-logo-btn"
          className="flex items-center gap-2.5 group focus:outline-none self-start"
        >
          <div className="w-10 h-10 rounded-xl bg-[#007AFF] flex items-center justify-center text-white font-semibold ios-shadow group-hover:bg-[#0062CC] ios-transition">
            <GraduationCap className="w-5.5 h-5.5" />
          </div>
          <div className="text-left">
            <span className="block font-bold text-lg tracking-tight text-gray-950 group-hover:text-[#007AFF] ios-transition">
              UniPath
            </span>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-gray-400">
              Uzbekistan
            </span>
          </div>
        </button>

        {/* CONTROLS AREA: LANGUAGE PICKER & PROFILE BUTTON */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          {/* iOS Segmented Selector for Language */}
          <div className="flex items-center gap-1 bg-[#F2F2F7] p-1 rounded-xl border border-[#E5E5EA]">
            <Globe className="w-3.5 h-3.5 text-gray-400 ml-1.5 mr-0.5 hidden xs:inline-block" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                id={`lang-sel-${lang.code}`}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ios-transition cursor-pointer ${
                  language === lang.code
                    ? 'bg-white text-[#007AFF] shadow-xs'
                    : 'text-[#8E8E93] hover:text-[#1C1C1E]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenProfile}
            id="nav-profile-btn"
            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#F2F2F7] text-[#1C1C1E] rounded-xl text-xs font-semibold border border-[#E5E5EA] ios-shadow ios-active-scale ios-transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#007AFF] animate-pulse" />
            <span>{langLabelProfile}</span>
            {profileStateSummary && (
              <span className="hidden sm:inline-block pl-2 ml-2 border-l border-[#E5E5EA] text-[#007AFF]">
                {profileStateSummary}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
