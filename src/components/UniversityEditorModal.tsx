/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Check, Award, Shield, FileText, Landmark, Globe } from 'lucide-react';
import { University, UzbekDiplomaStatus } from '../types';

interface UniversityEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<University>) => void;
  initialData: University | null;
}

export default function UniversityEditorModal({ isOpen, onClose, onSave, initialData }: UniversityEditorModalProps) {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'ivy_elite' | 'stem_tech' | 'business_finance' | 'europe_low_tuition' | 'asian_top' | 'local_joint'>('ivy_elite');
  const [acceptanceRate, setAcceptanceRate] = useState('35%');
  const [tuition, setTuition] = useState('$15,000/year');
  const [financialAid, setFinancialAid] = useState('Generous');
  const [ieltsRequirement, setIeltsRequirement] = useState(6.0);
  const [satRequirement, setSatRequirement] = useState<string>('');
  const [gpaRequirement, setGpaRequirement] = useState(3.0);
  const [uzbekDiplomaStatus, setUzbekDiplomaStatus] = useState<UzbekDiplomaStatus>('Accepted');
  const [foundationRequired, setFoundationRequired] = useState(false);
  const [qsRanking, setQsRanking] = useState(500);
  const [theRanking, setTheRanking] = useState(500);
  const [popularMajors, setPopularMajors] = useState('');
  const [tips, setTips] = useState('');
  const [applicationSteps, setApplicationSteps] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setWebsite(initialData.website || '');
      setCountry(initialData.country || '');
      setCity(initialData.city || '');
      setDescription(initialData.description || '');
      setCategory(initialData.category || 'ivy_elite');
      setAcceptanceRate(initialData.acceptanceRate || '');
      setTuition(initialData.tuition || '');
      setFinancialAid(initialData.financialAid || '');
      setIeltsRequirement(initialData.ieltsRequirement || 5.5);
      setSatRequirement(initialData.satRequirement ? String(initialData.satRequirement) : '');
      setGpaRequirement(initialData.gpaRequirement || 2.5);
      setUzbekDiplomaStatus(initialData.uzbekDiplomaStatus || 'Accepted');
      setFoundationRequired(!!initialData.foundationRequired);
      setQsRanking(initialData.qsRanking || 500);
      setTheRanking(initialData.theRanking || 500);
      setPopularMajors(initialData.popularMajors ? initialData.popularMajors.join(', ') : '');
      setTips(initialData.tips ? initialData.tips.join(', ') : '');
      setApplicationSteps(initialData.applicationSteps ? initialData.applicationSteps.join(', ') : '');
    } else {
      setName('');
      setWebsite('');
      setCountry('');
      setCity('');
      setDescription('');
      setCategory('ivy_elite');
      setAcceptanceRate('35%');
      setTuition('$15,000/year');
      setFinancialAid('Generous');
      setIeltsRequirement(6.0);
      setSatRequirement('');
      setGpaRequirement(3.0);
      setUzbekDiplomaStatus('Accepted');
      setFoundationRequired(false);
      setQsRanking(500);
      setTheRanking(500);
      setPopularMajors('');
      setTips('');
      setApplicationSteps('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !country || !city || !website) {
      alert('Please fill out all primary parameters (Name, Country, City, Website).');
      return;
    }

    const payload: Partial<University> = {
      name,
      website,
      country,
      city,
      description,
      category,
      acceptanceRate,
      tuition,
      financialAid,
      ieltsRequirement: Number(ieltsRequirement) || 5.5,
      satRequirement: satRequirement.trim() ? Number(satRequirement) : null,
      gpaRequirement: Number(gpaRequirement) || 2.5,
      uzbekDiplomaStatus,
      foundationRequired,
      qsRanking: Number(qsRanking) || 999,
      theRanking: Number(theRanking) || 999,
      popularMajors: popularMajors.split(',').map(s => s.trim()).filter(Boolean),
      tips: tips.split(',').map(s => s.trim()).filter(Boolean),
      applicationSteps: applicationSteps.trim() ? applicationSteps.split(',').map(s => s.trim()).filter(Boolean) : undefined,
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 bg-[#000000]/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#E5E5EA] w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-[#F2F2F7] flex items-center justify-between bg-[#F2F2F7]/50">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-50 text-[#007AFF] rounded-2xl flex items-center justify-center shadow-xs">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-[#1C1C1E]">
                {initialData ? 'Modify Institution Record' : 'Enroll New University'}
              </h1>
              <p className="text-[10px] text-[#8E8E93] font-bold uppercase tracking-wider">
                {initialData ? `editing ID: ${initialData.id}` : 'Uzbek Academic Placement Catalog'}
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY (FORM) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* SECTION 1: PRIMARY DETAILS */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 pb-1 border-b border-gray-100">
              <Globe className="w-3.5 h-3.5 text-[#007AFF]" />
              Primary Institutional Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">University Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. Harvard University"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Website URL (No slash)</label>
                <input
                  type="text"
                  required
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. harvard.edu"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Country Location</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. United States"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. Cambridge"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Classification Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] rounded-xl text-xs font-semibold outline-hidden"
                >
                  <option value="ivy_elite">Elite Ivy & Global (Ivy league & top world-class)</option>
                  <option value="stem_tech">STEM & IT (Technical, labs & coding focuses)</option>
                  <option value="business_finance">Business & Finance (Top-tier commerce schools)</option>
                  <option value="europe_low_tuition">Europe: Low-Fee (Free/Low-tuition European options)</option>
                  <option value="asian_top">Asian Tier-1 (Leader hubs in Korea, Japan, China, Singapore)</option>
                  <option value="local_joint">Tashkent Joint (Tashkent branch campuses WIUT, TPU, etc.)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Acceptance Rate</label>
                <input
                  type="text"
                  value={acceptanceRate}
                  onChange={(e) => setAcceptanceRate(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. 5.2%"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Full Catalog Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white resize-none"
                placeholder="Brief narrative of study environment and key characteristics..."
              />
            </div>
          </div>

          {/* SECTION 2: ADMISSION CRITERIA */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 pb-1 border-b border-gray-100">
              <Shield className="w-3.5 h-3.5 text-[#007AFF]" />
              Academic Requirements & Qualifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">IELTS Minimum Score</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="9"
                  required
                  value={ieltsRequirement}
                  onChange={(e) => setIeltsRequirement(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">SAT Threshold (Optional)</label>
                <input
                  type="number"
                  value={satRequirement}
                  onChange={(e) => setSatRequirement(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. 1450"
                />
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">GPA Cutoff (4.0 Scale)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="4"
                  required
                  value={gpaRequirement}
                  onChange={(e) => setGpaRequirement(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Uzbek Diploma Status</label>
                <select
                  value={uzbekDiplomaStatus}
                  onChange={(e) => setUzbekDiplomaStatus(e.target.value as UzbekDiplomaStatus)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] rounded-xl text-xs font-semibold outline-hidden"
                >
                  <option value="Accepted">Accepted Directly (No extra qualification)</option>
                  <option value="Conditional">Conditional (Needs IELTS or high grades)</option>
                  <option value="Not accepted">Not Accepted (Requires alternative pathway)</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="foundationRequired"
                  checked={foundationRequired}
                  onChange={(e) => setFoundationRequired(e.target.checked)}
                  className="w-5 h-5 rounded-md border-[#E5E5EA] text-[#007AFF] focus:ring-[#007AFF] cursor-pointer"
                />
                <label htmlFor="foundationRequired" className="text-xs font-bold text-[#3A3A3C] select-none cursor-pointer">
                  Foundation/Pre-Year Required (1st-year study)
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 3: COST, AID & RANKINGS */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 pb-1 border-b border-gray-100">
              <Landmark className="w-3.5 h-3.5 text-[#007AFF]" />
              Cost, aid & Rankings
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Tuition Fee</label>
                <input
                  type="text"
                  value={tuition}
                  onChange={(e) => setTuition(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. Free or $45k/yr"
                />
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Financial Aid</label>
                <input
                  type="text"
                  value={financialAid}
                  onChange={(e) => setFinancialAid(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. Need-blind / Merit"
                />
              </div>
              <div className="space-y-1 col-span-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">QS Ranking</label>
                <input
                  type="number"
                  required
                  value={qsRanking}
                  onChange={(e) => setQsRanking(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                />
              </div>
              <div className="space-y-1 col-span-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">THE Ranking</label>
                <input
                  type="number"
                  required
                  value={theRanking}
                  onChange={(e) => setTheRanking(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: EXTRA LIST DETAILS */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 pb-1 border-b border-gray-100">
              <FileText className="w-3.5 h-3.5 text-[#007AFF]" />
              Extra Placement Parameters (Comma-separated)
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Popular Majors</label>
                <input
                  type="text"
                  value={popularMajors}
                  onChange={(e) => setPopularMajors(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. Computer Science, Economics, BioTech"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Success Tips & Advice</label>
                <input
                  type="text"
                  value={tips}
                  onChange={(e) => setTips(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. Master SAT early, write emotional essays, get 3 LORs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Custom Application Steps Checklist (Optional Override)</label>
                <input
                  type="text"
                  value={applicationSteps}
                  onChange={(e) => setApplicationSteps(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F2F2F7] text-black border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-xs font-semibold outline-hidden focus:bg-white"
                  placeholder="e.g. Complete CommonApp, Submit IELTS to admissions portal, Apply for need-blind aid"
                />
              </div>
            </div>
          </div>

        </form>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-[#F2F2F7] flex items-center justify-end gap-3 bg-[#F2F2F7]/40">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold rounded-xl ios-transition cursor-pointer"
          >
            Discard
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-bold rounded-xl shadow-xs ios-active-scale ios-transition cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Commit Record Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
