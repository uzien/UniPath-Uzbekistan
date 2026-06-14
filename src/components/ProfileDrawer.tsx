/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sliders, Check, HelpCircle, Save, Award, RefreshCw, X } from 'lucide-react';
import { StudentProfile } from '../types';

interface ProfileDrawerProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ profile, onUpdateProfile, isOpen, onClose }: ProfileDrawerProps) {
  if (!isOpen) return null;

  const handleDiplomaChange = (type: 'school' | 'lyceum' | 'college' | 'ib_ap') => {
    onUpdateProfile({ ...profile, diplomaType: type });
  };

  const handleIeltsChange = (val: number) => {
    onUpdateProfile({ ...profile, ielts: val });
  };

  const handleSatToggle = (checked: boolean) => {
    onUpdateProfile({ ...profile, sat: checked ? 1400 : null });
  };

  const handleSatValueChange = (val: number) => {
    onUpdateProfile({ ...profile, sat: val });
  };

  const handleGpaChange = (val: number) => {
    const rawValue = Math.min(profile.gpaScale, Math.max(1, val));
    let normalized = rawValue;
    if (profile.gpaScale === 5) {
      normalized = (rawValue / 5) * 4;
    } else if (profile.gpaScale === 100) {
      normalized = (rawValue / 100) * 4;
    }
    onUpdateProfile({
      ...profile,
      originalGpa: rawValue,
      gpa: Number(normalized.toFixed(2))
    });
  };

  const handleScaleChange = (scale: 4 | 5 | 100) => {
    let defaultGpa = 3.6;
    if (scale === 5) defaultGpa = 4.5;
    if (scale === 100) defaultGpa = 90;

    let normalized = defaultGpa;
    if (scale === 5) normalized = (defaultGpa / 5) * 4;
    if (scale === 100) normalized = (defaultGpa / 100) * 4;

    onUpdateProfile({
      ...profile,
      gpaScale: scale,
      originalGpa: defaultGpa,
      gpa: Number(normalized.toFixed(2))
    });
  };

  // Pre-configured templates to make it instant for students
  const applyTemplate = (type: 'average' | 'high' | 'presidents') => {
    if (type === 'average') {
      onUpdateProfile({
        diplomaType: 'school',
        ielts: 5.5,
        sat: null,
        gpaScale: 5,
        originalGpa: 4.2,
        gpa: 3.36
      });
    } else if (type === 'high') {
      onUpdateProfile({
        diplomaType: 'lyceum',
        ielts: 6.5,
        sat: 1250,
        gpaScale: 5,
        originalGpa: 4.8,
        gpa: 3.84
      });
    } else if (type === 'presidents') {
      onUpdateProfile({
        diplomaType: 'ib_ap',
        ielts: 7.5,
        sat: 1510,
        gpaScale: 4,
        originalGpa: 3.95,
        gpa: 3.95
      });
    }
  };

  return (
    <div className="bg-white border border-[#E5E5EA] rounded-[20px] shadow-sm mb-8 ios-transition">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F2F2F7] p-6 pb-0">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#007AFF]" />
          <h2 className="text-lg font-bold text-[#1C1C1E] tracking-tight">
            My Academic Profile
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Quick templates */}
          <span className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-widest hidden sm:inline">
            Quick Setup:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => applyTemplate('average')}
              id="template-avg-btn"
              className="px-2.5 py-1 text-[11px] font-bold bg-[#F2F2F7] hover:bg-[#E5E5EA] rounded-lg text-[#3A3A3C] border border-[#E5E5EA] ios-transition active:scale-95 cursor-pointer"
            >
              Avg School Student
            </button>
            <button
              onClick={() => applyTemplate('high')}
              id="template-high-btn"
              className="px-2.5 py-1 text-[11px] font-bold bg-blue-50/50 hover:bg-blue-50 text-[#007AFF] border border-blue-100/50 rounded-lg ios-transition active:scale-95 cursor-pointer"
            >
              Lyceum Achiever
            </button>
            <button
              onClick={() => applyTemplate('presidents')}
              id="template-president-btn"
              className="px-2.5 py-1 text-[11px] font-bold bg-indigo-50/50 hover:bg-indigo-50 text-indigo-600 border border-indigo-100/50 rounded-lg ios-transition active:scale-95 cursor-pointer"
            >
              Ivy / President Grad
            </button>
          </div>

          <button
            onClick={onClose}
            id="close-profile-btn"
            className="p-1.5 hover:bg-[#F2F2F7] rounded-full text-[#8E8E93] hover:text-[#1C1C1E] ios-transition focus:outline-none cursor-pointer"
            title="Minimise control board"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-[#3A3A3C] p-6 pt-0">
        
        {/* DIPLOMA TYPE */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
            Uzbek Diploma Type
          </label>
          <div className="space-y-2">
            {[
              { id: 'school', label: '11-Year School (Middle)' },
              { id: 'lyceum', label: '12-Year Academic Lyceum' },
              { id: 'college', label: '12-Year Vocational College' },
              { id: 'ib_ap', label: 'International (IB/AP)' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleDiplomaChange(option.id as any)}
                id={`diploma-opt-${option.id}`}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold text-left ios-transition cursor-pointer ${
                  profile.diplomaType === option.id
                    ? 'bg-[#007AFF]/5 border-[#007AFF]/40 text-[#007AFF]'
                    : 'bg-white border-[#E5E5EA] hover:border-gray-300 text-gray-750'
                }`}
              >
                <span>{option.label}</span>
                {profile.diplomaType === option.id && <Check className="w-3.5 h-3.5 text-[#007AFF]" />}
              </button>
            ))}
          </div>
        </div>

        {/* IELTS ACCORDION */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
              IELTS Academic
            </label>
            <span className="text-sm font-bold text-[#007AFF] bg-blue-50 px-2.5 py-1 rounded-lg">
              {profile.ielts.toFixed(1)}
            </span>
          </div>
          <div className="pt-2">
            <input
              type="range"
              id="ielts-range-input"
              min="4.5"
              max="9.0"
              step="0.5"
              value={profile.ielts}
              onChange={(e) => handleIeltsChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#E5E5EA] rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
            />
            <div className="flex justify-between text-[10px] text-[#8E8E93] font-semibold mt-2.5">
              <span>Band 4.5</span>
              <span>Band 6.5</span>
              <span>Band 9.0</span>
            </div>
          </div>
          <div className="bg-[#F2F2F7] border border-[#E5E5EA] p-3 rounded-xl text-[10px] font-semibold text-[#8E8E93] leading-relaxed">
            IELTS measures listening, reading, writing, and speaking. Most standard degrees request 6.0 - 6.5.
          </div>
        </div>

        {/* SAT SCORE VALUE */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
              SAT Score
            </label>
            <span className="text-sm font-bold text-[#007AFF] bg-blue-50 px-2.5 py-1 rounded-lg">
              {profile.sat !== null ? `${profile.sat} pts` : 'No SAT score'}
            </span>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer py-1">
              <input
                type="checkbox"
                id="sat-toggle-chk"
                checked={profile.sat !== null}
                onChange={(e) => handleSatToggle(e.target.checked)}
                className="w-4 h-4 rounded text-[#007AFF] border-[#E5E5EA] focus:ring-[#007AFF] cursor-pointer"
              />
              <span className="text-xs font-semibold text-[#3A3A3C]">
                I have taken the SAT test
              </span>
            </label>

            {profile.sat !== null && (
              <div className="pt-1">
                <input
                  type="range"
                  id="sat-range-input"
                  min="800"
                  max="1600"
                  step="10"
                  value={profile.sat}
                  onChange={(e) => handleSatValueChange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#E5E5EA] rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
                />
                <div className="flex justify-between text-[10px] text-[#8E8E93] font-semibold mt-2">
                  <span>800 (Base)</span>
                  <span>1200 (Comp)</span>
                  <span>1600 (Max)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* GPA CALCULATION AND SYSTEM */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
              GPA Transcript
            </label>
            <span className="text-xs font-bold text-[#007AFF] bg-blue-50 px-2 py-0.5 rounded">
              US Scale: {profile.gpa} / 4.0
            </span>
          </div>

          <div className="space-y-2">
            {/* GPA Scale Segmented Selector */}
            <div className="grid grid-cols-3 bg-[#F2F2F7] p-0.5 rounded-xl border border-[#E5E5EA] text-[10px] font-bold text-center">
              {[5, 4, 100].map((scale) => (
                <button
                  key={scale}
                  onClick={() => handleScaleChange(scale as any)}
                  id={`scale-select-${scale}`}
                  type="button"
                  className={`py-1.5 rounded-lg ios-transition cursor-pointer ${
                    profile.gpaScale === scale
                      ? 'bg-white text-[#1C1C1E] shadow-sm'
                      : 'text-[#8E8E93] hover:text-[#1C1C1E]'
                  }`}
                >
                  {scale === 100 ? '100%' : `${scale}.0 Scale`}
                </button>
              ))}
            </div>

            {/* GPA scale inputs */}
            <div className="pt-2">
              <input
                type="range"
                id="gpa-range-input"
                min={profile.gpaScale === 100 ? "50" : "2.0"}
                max={profile.gpaScale.toString()}
                step={profile.gpaScale === 100 ? "1" : "0.1"}
                value={profile.originalGpa}
                onChange={(e) => handleGpaChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#E5E5EA] rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
              />
              <div className="flex justify-between text-[10px] text-[#8E8E93] font-semibold mt-2">
                <span>Min: {profile.gpaScale === 100 ? "50%" : "2.0"}</span>
                <span className="text-[#1C1C1E] font-bold">
                  Current: {profile.originalGpa} / {profile.gpaScale === 100 ? '100' : profile.gpaScale}
                </span>
                <span>Max: {profile.gpaScale === 100 ? "100%" : profile.gpaScale}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
