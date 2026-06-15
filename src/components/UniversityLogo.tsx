/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface UniversityLogoProps {
  universityId: string;
  website?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  logo?: string;
}

const DOMAIN_MAP: Record<string, string> = {
  'wiut-uz': 'wiut.uz',
  'sapienza-it': 'uniroma1.it',
  'tum-de': 'tum.de',
  'harvard-us': 'harvard.edu',
  'bocconi-it': 'unibocconi.eu',
  'ucl-uk': 'ucl.ac.uk',
  'yonsei-kr': 'yonsei.ac.kr',
  'constructor-de': 'constructor.university',
  'usf-us': 'usf.edu',
  'kaist-kr': 'kaist.ac.kr',
  'mit-us': 'mit.edu',
  'oxford-uk': 'ox.ac.uk',
  'cambridge-uk': 'cam.ac.uk',
  'stanford-us': 'stanford.edu',
  'lse-uk': 'lse.ac.uk',
  'toronto-ca': 'utoronto.ca',
  'eth-ch': 'ethz.ch',
  'sorbonne-fr': 'sorbonne-universite.fr',
  'pisa-it': 'unipi.it',
  'tpu-uz': 'polito.uz',
  'webster-uz': 'webster.uz',
  'tsul-uz': 'tsul.uz',
  'nus-sg': 'nus.edu.sg',
  'kyoto-jp': 'kyoto-u.ac.jp',
  'wharton-us': 'upenn.edu',
  'lmu-de': 'lmu.de',
  'asu-us': 'asu.edu',
  'nus-business': 'nus.edu.sg'
};

function getDomainFromUrl(url: string | undefined): string {
  if (!url) return '';
  try {
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanUrl.split('/')[0];
  } catch (e) {
    return '';
  }
}

export default function UniversityLogo({ universityId, website, size = 'md', className = '', logo }: UniversityLogoProps) {
  const [errorCount, setErrorCount] = useState(0);
  const domain = DOMAIN_MAP[universityId] || getDomainFromUrl(website) || 'wiut.uz';

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl p-1',
    md: 'w-14 h-14 rounded-2xl p-1.5',
    lg: 'w-20 h-20 rounded-[24px] p-2',
  };

  const selectedSize = sizeClasses[size];

  if (logo) {
    return (
      <div className={`flex items-center justify-center bg-white border border-[#E5E5EA] overflow-hidden shadow-xs shrink-0 ${selectedSize} ${className}`}>
        <img
          src={logo}
          alt={`${domain} Logo`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain rounded-md"
        />
      </div>
    );
  }

  // Primary: Clearbit logo API, Secondary fallback: Google high-res Favicon API, Tertiary fallback: elegant initial card
  let logoUrl = '';
  if (errorCount === 0) {
    logoUrl = `https://logo.clearbit.com/${domain}`;
  } else if (errorCount === 1) {
    logoUrl = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
  }

  if (errorCount >= 2) {
    const initials = domain.slice(0, 2).toUpperCase();
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-[#E5E5EA] text-[#007AFF] font-black text-xs uppercase tracking-wider shrink-0 ${selectedSize} ${className}`}>
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center bg-white border border-[#E5E5EA] overflow-hidden shadow-xs shrink-0 ${selectedSize} ${className}`}>
      <img
        src={logoUrl}
        alt={`${domain} Logo`}
        referrerPolicy="no-referrer"
        onError={() => setErrorCount(prev => prev + 1)}
        className="w-full h-full object-contain rounded-md"
      />
    </div>
  );
}
