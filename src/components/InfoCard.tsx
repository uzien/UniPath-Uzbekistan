/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  value: string | number | React.ReactNode;
  icon: LucideIcon;
  subtext?: string;
  highlighted?: boolean;
}

export default function InfoCard({ title, value, icon: Icon, subtext, highlighted = false }: InfoCardProps) {
  return (
    <div
      className={`p-5 rounded-[20px] border shadow-sm ios-transition ${
        highlighted
          ? 'bg-blue-50/50 border-[#007AFF]/20 text-[#007AFF]'
          : 'bg-white border-[#E5E5EA] text-[#3A3A3C]'
      }`}
    >
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93]">
          {title}
        </span>
        <div
          className={`p-2 rounded-xl ${
            highlighted ? 'bg-[#007AFF] text-white' : 'bg-[#F2F2F7] text-[#8E8E93]'
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-2xl font-bold text-[#1C1C1E] tracking-tight leading-none">
        {value}
      </div>
      {subtext && (
        <p className="mt-2 text-xs text-[#8E8E93] leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
}
