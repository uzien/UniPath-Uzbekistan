/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, BookOpen, Globe, Award, HelpCircle } from 'lucide-react';
import { University, StudentProfile, EligibilityResult } from '../types';
import { evaluateEligibility } from '../utils';
import { Language } from '../translations';
import StatusBadge from './StatusBadge';
import UniversityLogo from './UniversityLogo';

interface UniversityCardProps {
  key?: React.Key;
  university: University;
  studentProfile: StudentProfile;
  onViewDetails: (id: string) => void;
  t: Record<string, string>;
  language: Language;
}

export default function UniversityCard({ university, studentProfile, onViewDetails, t, language }: UniversityCardProps) {
  // Compute dynamic eligibility for this student profile
  const eligibility: EligibilityResult = evaluateEligibility(studentProfile, university, language);

  // Map country to nice emoji flag for visual elegance
  const countryFlags: { [key: string]: string } = {
    'usa': '🇺🇸',
    'united states': '🇺🇸',
    'uk': '🇬🇧',
    'united kingdom': '🇬🇧',
    'germany': '🇩🇪',
    'italy': '🇮🇹',
    'south korea': '🇰🇷',
    'korea': '🇰🇷',
    'uzbekistan': '🇺🇿'
  };

  const flag = countryFlags[university.country.toLowerCase()] || '🏛️';

  // Translate localized country names if we like, or keep standard labels
  const countryDisplay = university.country;

  return (
    <div className="relative group p-6 bg-white border border-[#E5E5EA] rounded-[20px] shadow-sm hover:shadow-md hover:border-[#D1D1D6] ios-transition">
      {/* CARD BODY PATHS */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
        
        {/* Logo and Text Side-By-Side */}
        <div className="flex items-start gap-4 flex-1">
          <UniversityLogo
            universityId={university.id}
            website={university.website}
            logo={university.logo}
            size="md"
            className="flex-shrink-0 group-hover:scale-105 duration-300 transition-transform shadow-sm"
          />
          
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#1C1C1E] tracking-tight group-hover:text-[#007AFF] ios-transition leading-snug">
                {university.name}
              </span>
              <span className="text-base" title={university.country}>
                {flag}
              </span>
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center text-xs font-semibold text-[#8E8E93]">
              <span className="uppercase tracking-wider">{university.city}, {countryDisplay}</span>
              <span className="hidden sm:inline-block text-gray-200">•</span>
              <span>{university.acceptanceRate} {t.acceptanceRate || 'Acceptance Rate'}</span>
            </div>

            {/* Premium World Rankings Row */}
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50/50 border border-amber-100 rounded-lg text-[10px] font-bold text-amber-700 tracking-wide">
                🏆 QS WUR: #{university.qsRanking}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50/50 border border-blue-100 rounded-lg text-[10px] font-bold text-[#007AFF] tracking-wide">
                🎓 THE Rank: #{university.theRanking}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic eligibility badge */}
        <div className="self-start sm:self-auto pl-[72px] sm:pl-0">
          <StatusBadge status={eligibility.status} size="sm" />
        </div>
      </div>

      {/* HORIZONTAL KEY REQUIREMENTS TABLE */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 py-4 border-t border-b border-[#F2F2F7] mb-5 text-[#3A3A3C]">
        <div>
          <span className="block text-[10px] uppercase font-bold text-[#8E8E93] tracking-widest leading-relaxed">
            {t.ieltsTarget || 'IELTS Requirements'}
          </span>
          <span className="text-sm font-semibold text-[#1C1C1E]">
            {university.ieltsRequirement}+
          </span>
        </div>

        <div>
          <span className="block text-[10px] uppercase font-bold text-[#8E8E93] tracking-widest leading-relaxed">
            {t.satTarget || 'SAT Threshold'}
          </span>
          <span className="text-sm font-semibold text-[#1C1C1E]">
            {university.satRequirement ? `${university.satRequirement}+` : 'Not Required'}
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <span className="block text-[10px] uppercase font-bold text-[#8E8E93] tracking-widest leading-relaxed">
            {t.uzbekDiplomaStatus || 'Uzbek Diploma'}
          </span>
          <span className={`inline-flex items-center gap-1 text-sm font-semibold ${
            university.uzbekDiplomaStatus === 'Accepted'
              ? 'text-emerald-600'
              : university.uzbekDiplomaStatus === 'Conditional'
              ? 'text-amber-500'
              : 'text-rose-600'
          }`}>
            {university.uzbekDiplomaStatus === 'Accepted' ? (t.eligibleHeader ? 'Accepted' : 'Accepted') : university.uzbekDiplomaStatus}
            {university.foundationRequired && (
              <span className="text-[10px] font-normal text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded ml-1">
                + Foundation
              </span>
            )}
          </span>
        </div>
      </div>

      {/* FOOTER ACTION */}
      <div className="flex items-center justify-between gap-4">
        {/* Micro-insight for why they entered that status */}
        <div className="text-xs text-[#8E8E93] line-clamp-1 max-w-[70%] font-medium">
          {eligibility.reasons[0]}
        </div>

        <button
          onClick={() => onViewDetails(university.id)}
          id={`view-details-${university.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#007AFF] hover:bg-[#0062CC] text-white rounded-xl text-xs font-bold shadow-xs ios-active-scale ios-transition cursor-pointer ml-auto"
        >
          <span>{t.viewDetails || 'View Details'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 ios-transition" />
        </button>
      </div>
    </div>
  );
}
