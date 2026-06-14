/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface UniversityLogoProps {
  universityId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function UniversityLogo({ universityId, size = 'md', className = '' }: UniversityLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-[10px] rounded-xl',
    md: 'w-14 h-14 text-xs rounded-2xl',
    lg: 'w-20 h-20 text-base rounded-[24px]',
  };

  const selectedSize = sizeClasses[size];

  // Render highly polished, premium mock vector logos representing the identity of each university
  switch (universityId) {
    case 'wiut-uz':
      // Westminster International University in Tashkent: Royal Blue shield with a gold key and serif W
      return (
        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#0B2545] to-[#134074] shadow-md border border-[#0B2545]/20 text-white overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          {/* Subtle background crest grid patterns */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="1" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="1" />
            </svg>
          </div>
          {/* Royal emblem */}
          <div className="relative flex flex-col items-center z-10 leading-none">
            <span className="font-serif font-black text-white text-opacity-95 text-lg md:text-xl tracking-tight">W</span>
            <div className="h-[2px] w-5 bg-[#EEB902] my-0.5 rounded-full" />
            <span className="font-sans font-bold text-[7px] md:text-[8px] text-[#EEB902] tracking-widest uppercase">WIUT</span>
          </div>
          {/* Gold bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#EEB902]" />
        </div>
      );

    case 'sapienza-it':
      // Sapienza University of Rome: Deep papal scarlet/crimson with a gold angel of wisdom outline
      return (
        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#70111A] to-[#45090E] shadow-md border border-[#45090E]/20 text-white overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          <div className="absolute inset-0 opacity-20 flex items-center justify-center">
            <svg width="80%" height="80%" viewBox="0 0 100 100" fill="none">
              <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="#E2C044" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="relative flex flex-col items-center z-10 text-center">
            <svg className="w-5 h-5 mb-0.5 text-[#E2C044]" fill="currentColor" viewBox="0 0 24 24">
              {/* Minimal cherub/angel of Sapienza representation */}
              <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 5c-2.33 0-4.43.8-6.13 2.13C5.31 9.61 5 10.27 5 11c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3 0-.73-.31-1.39-.87-1.87C16.43 7.8 14.33 7 12 7zm-5 8c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1zm10 0c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1z" />
            </svg>
            <span className="font-serif italic font-bold text-[10px] md:text-[11px] text-[#E2C044] leading-none">Sapienza</span>
          </div>
          <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-[#E2C044]" />
        </div>
      );

    case 'tum-de':
      // Technical University of Munich: Futuristic precise German cyan/blue geometric grid
      return (
        <div className={`relative flex flex-col items-center justify-center bg-[#0065BD] shadow-md border border-[#00529B]/30 text-white overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          {/* Exact clean interlocking TUM grid layout */}
          <div className="relative w-10 h-10 flex flex-col justify-between p-1.5 z-10">
            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
              {/* Left Bar (T shape) */}
              <path d="M2 4h8M6 4v16" />
              {/* Middle Bar (U shape) */}
              <path d="M10 4v12s0 4 3 4s3-4 3-4V4" />
              {/* Right Bar (M shape) */}
              <path d="M17 20V4l3 6l3-6v16" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="absolute top-1 right-1 flex space-x-[2px]">
            <span className="w-1 h-1 bg-white opacity-40 rounded-full" />
            <span className="w-1 h-1 bg-white opacity-40 rounded-full" />
          </div>
        </div>
      );

    case 'harvard-us':
      // Harvard University: Classic luxurious Crimson panel with gold borders and a grand Serif 'H'
      return (
        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#A51C30] to-[#7F0013] shadow-md border border-[#7F0013]/20 text-white overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          {/* Minimal traditional academic shield shape in the background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-[85%] h-[85%] text-[#F3E5AB] text-opacity-35" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 100 100">
              <path d="M15 15 C 15 15, 50 20, 50 20 C 50 20, 85 15, 85 15 C 85 60, 50 90, 50 90 C 50 90, 15 60, 15 15 Z" />
            </svg>
          </div>
          <div className="relative flex flex-col items-center z-10 leading-none">
            <span className="font-serif font-black text-lg md:text-xl text-[#F9F7F1]">H</span>
            <span className="font-mono text-[6px] tracking-widest text-[#F9F7F1] text-opacity-80 uppercase mt-0.5">VE-RI-TAS</span>
          </div>
          {/* Triple double border on top in classic academic fashion */}
          <div className="absolute top-0 inset-x-0 h-[2.5px] bg-[#F3E5AB]" />
        </div>
      );

    case 'bocconi-it':
      // Bocconi University: Elite modern Milanese cobalt blue and gold circular wax seal look
      return (
        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#022B5C] to-[#01142F] shadow-md border border-[#01142F]/20 text-[#D4AF37] overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          <div className="absolute inset-0 opacity-20 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="38" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 3" />
            </svg>
          </div>
          <div className="relative flex flex-col items-center z-10 text-center leading-none">
            <span className="font-serif font-bold text-base md:text-lg tracking-wider text-opacity-95 text-[#D4AF37]">B</span>
            <span className="font-serif italic font-bold text-[7px] tracking-widest text-[#FFFFFF] text-opacity-85 uppercase mt-0.5">MILANO</span>
          </div>
          {/* Corner gold rivets */}
          <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-[#D4AF37]/50" />
          <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-[#D4AF37]/50" />
        </div>
      );

    case 'ucl-uk':
      // University College London: Intellectual deep purple with white dome silhouette
      return (
        <div className={`relative flex flex-col items-center justify-center bg-[#50007E] shadow-md border border-[#3E0062]/20 text-white overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          {/* Outline of the iconic neoclassical architectural dome of UCL */}
          <div className="absolute inset-0 flex items-center justify-center pt-2 opacity-50">
            <svg className="w-[70%] h-[70%] text-white" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 100 100">
              {/* The triangular pediment */}
              <path d="M20 70 L80 70 L50 45 Z" />
              {/* Columns */}
              <line x1="30" y1="70" x2="30" y2="90" />
              <line x1="40" y1="70" x2="40" y2="90" />
              <line x1="50" y1="70" x2="50" y2="90" />
              <line x1="60" y1="70" x2="60" y2="90" />
              <line x1="70" y1="70" x2="70" y2="90" />
              {/* The large dome cylinder and hemisphere */}
              <rect x="35" y="25" width="30" height="20" />
              <path d="M35 25 Q50 0 65 25" />
              {/* Cross spike on top */}
              <line x1="50" y1="0" x2="50" y2="8" />
            </svg>
          </div>
          <div className="relative flex flex-col items-center z-10 mt-auto pb-1.5 leading-none">
            <span className="font-serif font-black text-[13px] md:text-[14px] tracking-wider text-white">UCL</span>
          </div>
        </div>
      );

    case 'yonsei-kr':
      // Yonsei University: Famous South Korean royal navy with an open book and shield
      return (
        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#113B7A] to-[#0A2247] shadow-md border border-[#0A2247]/20 text-white overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          <div className="absolute inset-0 opacity-15">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="relative flex flex-col items-center z-10 leading-none">
            {/* Minimal Yonsei stylized representation (Shield, Book symbol, 'ㅇ' layout) */}
            <div className="w-4 h-4 rounded-full border border-sky-400 flex items-center justify-center mb-0.5">
              <span className="font-sans font-black text-[7px] text-sky-400">Y</span>
            </div>
            <span className="font-serif font-bold text-[9px] text-[#A6C4EC] tracking-widest uppercase">YONSEI</span>
          </div>
          {/* Sky blue side accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-sky-400" />
        </div>
      );

    case 'constructor-de':
      // Constructor University (Bremen): Private scientific violet/magenta digital nexus network look
      return (
        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#EB0045] to-[#710034] shadow-md border border-[#710034]/20 text-white overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          {/* Cybernetic geometric matrix */}
          <div className="absolute inset-0 opacity-25">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <circle cx="25" cy="25" r="4" fill="white" />
              <circle cx="75" cy="25" r="4" fill="white" />
              <circle cx="50" cy="50" r="4" fill="white" />
              <circle cx="25" cy="75" r="4" fill="white" />
              <circle cx="75" cy="75" r="4" fill="white" />
              <line x1="25" y1="25" x2="50" y2="50" stroke="white" strokeWidth="1" />
              <line x1="75" y1="25" x2="50" y2="50" stroke="white" strokeWidth="1" />
              <line x1="25" y1="75" x2="50" y2="50" stroke="white" strokeWidth="1" />
              <line x1="75" y1="75" x2="50" y2="50" stroke="white" strokeWidth="1" />
            </svg>
          </div>
          <div className="relative flex flex-col items-center z-10 leading-none">
            <span className="font-sans font-black text-xs tracking-tight text-white">CONSTR.</span>
            <span className="font-mono text-[7px] tracking-widest text-[#E5E5EA] uppercase mt-0.5">BREMEN</span>
          </div>
        </div>
      );

    case 'usf-us':
      // University of South Florida: Dark emerald/forest green & high gold Bull Horn logo representation
      return (
        <div className={`relative flex flex-col items-center justify-center bg-[#006747] shadow-md border border-[#004D35]/20 text-[#CFC493] overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          {/* Stylized geometric horns (Bull Horns logo representation) */}
          <div className="relative w-7 h-7 flex items-center justify-center text-[#CFC493] z-10">
            <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              {/* U shape with sharp horn accents */}
              <path d="M4 4c0 0-1 4 1 8s4 6 7 6s5-2 7-6s1-8 1-8M8 4l2 3M16 4l-2 3" />
            </svg>
          </div>
          <div className="relative leading-none">
            <span className="font-sans font-black text-[8px] md:text-[9px] text-[#CFC493] tracking-widest uppercase">USF</span>
          </div>
        </div>
      );

    case 'kaist-kr':
      // KAIST: Futuristic deep cobalt blue background with a cyan power-spark logo representation
      return (
        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#004B93] to-[#002752] shadow-md border border-[#002752]/20 text-white overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          {/* Futuristic technology design lines */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M 0,0 L 100,100 M 100,0 L 0,100 M 0,50 L 100,50 M 50,0 L 50,100" />
            </svg>
          </div>
          <div className="relative flex flex-col items-center z-10 text-center leading-none">
            <span className="font-sans italic font-black text-[13px] md:text-[14px] text-white tracking-widest">KAIST</span>
            <div className="mt-0.5 flex space-x-1 justify-center">
              <span className="w-1.5 h-1 bg-[#00D4FF] rounded-full" />
              <span className="w-1.5 h-1 bg-white rounded-full" />
            </div>
          </div>
        </div>
      );

    default:
      // Generic school crest with high visual quality as fall-back model
      return (
        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-indigo-850 to-indigo-950 shadow-md border border-indigo-900/20 text-white overflow-hidden ${selectedSize} ${className}`} id={`logo-${universityId}`}>
          <div className="relative flex flex-col items-center z-10 leading-none">
            <span className="font-serif font-bold text-lg">🏛️</span>
          </div>
        </div>
      );
  }
}
