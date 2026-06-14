/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { EligibilityStatus } from '../types';

interface StatusBadgeProps {
  status: EligibilityStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function StatusBadge({ status, size = 'md', showLabel = true }: StatusBadgeProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  let config = {
    bg: 'bg-[#EBFBEE] text-[#2B8A3E] border-[#D3F9D8]',
    dot: 'bg-[#40C057]',
    label: 'You can apply',
    accentColor: '#40C057',
    icon: CheckCircle2,
  };

  if (status === 'Conditional') {
    config = {
      bg: 'bg-[#FFF9DB] text-[#F08C00] border-[#FFE066]',
      dot: 'bg-[#FAB005]',
      label: 'Conditional admission',
      accentColor: '#FAB005',
      icon: AlertCircle,
    };
  } else if (status === 'Not eligible') {
    config = {
      bg: 'bg-[#FFF5F5] text-[#C92A2A] border-[#FFC9C9]',
      dot: 'bg-[#FA5252]',
      label: 'Not eligible',
      accentColor: '#FA5252',
      icon: XCircle,
    };
  }

  const IconComponent = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-medium tracking-tight ${config.bg} ${
        isSm ? 'text-xs' : isLg ? 'text-base px-5 py-2.5 rounded-2xl' : 'text-sm'
      }`}
    >
      <IconComponent className={`${isSm ? 'w-3.5 h-3.5' : isLg ? 'w-5.5 h-5.5' : 'w-4.5 h-4.5'}`} />
      <span>{config.label}</span>
    </div>
  );
}
