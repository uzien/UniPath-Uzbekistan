/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ChevronRight,
  Globe,
  Info,
  Check,
  CheckSquare,
  Square,
  GraduationCap,
  Percent,
  DollarSign,
  Briefcase,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Calendar,
  Compass,
  FileText,
  Award
} from 'lucide-react';

import { StudentProfile, University, EligibilityResult } from './types';
import { UNIVERSITIES } from './data';
import { evaluateEligibility, filterUniversities } from './utils';

// Component imports
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import StatusBadge from './components/StatusBadge';
import UniversityCard from './components/UniversityCard';
import InfoCard from './components/InfoCard';
import ProfileDrawer from './components/ProfileDrawer';
import UniversityLogo from './components/UniversityLogo';

export default function App() {
  // Navigation / View state
  const [viewState, setViewState] = useState<'home' | 'search'>('home');
  const [activeUniId, setActiveUniId] = useState<string | null>(null);

  // Search filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Student Profile state with highly realistic default settings
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    ielts: 6.0,
    sat: null,
    gpaScale: 5,
    originalGpa: 4.5,
    gpa: 3.6, // Normalized (4.5/5.0 * 4.0)
    diplomaType: 'school' // 11-year standard high school
  });

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // State to persist checkmarks for different tasks for each university
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>({});

  const toggleTask = (uniId: string, taskIndex: number) => {
    const key = `${uniId}-${taskIndex}`;
    setCheckedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Map of available country shortcuts on landing page
  const countries = [
    { name: 'USA', emoji: '🇺🇸', id: 'USA' },
    { name: 'UK', emoji: '🇬🇧', id: 'UK' },
    { name: 'Germany', emoji: '🇩🇪', id: 'Germany' },
    { name: 'Italy', emoji: '🇮🇹', id: 'Italy' }
  ];

  // Derive filtered universities list dynamically based on queries
  const processedUniversities = useMemo(() => {
    return filterUniversities(UNIVERSITIES, searchQuery, selectedCountry);
  }, [searchQuery, selectedCountry]);

  // Retrieve active university details
  const activeUniversity = useMemo(() => {
    if (!activeUniId) return null;
    return UNIVERSITIES.find(u => u.id === activeUniId) || null;
  }, [activeUniId]);

  // Active university eligibility calculation
  const activeEligibility = useMemo(() => {
    if (!activeUniversity) return null;
    return evaluateEligibility(studentProfile, activeUniversity);
  }, [activeUniversity, studentProfile]);

  // Quick summary string to display inside the navigation bar trigger
  const profileStateSummary = useMemo(() => {
    const ieltsStr = `IELTS ${studentProfile.ielts.toFixed(1)}`;
    const satStr = studentProfile.sat ? `, SAT ${studentProfile.sat}` : '';
    const diplomaStr =
      studentProfile.diplomaType === 'school'
        ? ' (11-Yr School)'
        : studentProfile.diplomaType === 'lyceum'
        ? ' (Lyceum)'
        : studentProfile.diplomaType === 'college'
        ? ' (College)'
        : ' (IB/AP)';
    return `${ieltsStr}${satStr}${diplomaStr}`;
  }, [studentProfile]);

  // Handle clicking short cuts from landing
  const handleCountryShortcut = (countryId: string) => {
    setSelectedCountry(countryId);
    setViewState('search');
    setActiveUniId(null);
  };

  // Launch fresh search
  const handleSearchBarChange = (val: string) => {
    setSearchQuery(val);
    if (viewState === 'home' && val.trim() !== '') {
      setViewState('search');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCountry(null);
    setViewState('home');
    setActiveUniId(null);
  };

  const handleGoHome = () => {
    setViewState('home');
    setActiveUniId(null);
    setSearchQuery('');
    setSelectedCountry(null);
  };

  // Dynamic next steps helper
  const renderNextStepsChecklist = (uni: University, elg: EligibilityResult) => {
    const defaultSteps = [
      `Complete IELTS exam preparation (Aim for score >= ${uni.ieltsRequirement})`,
      ...(uni.satRequirement !== null
        ? [`Prepare and register for SAT Math & Reading exams (Aim for >= ${uni.satRequirement})`]
        : []),
      'Prepare essential college enrollment essays and Personal Statement essays',
      `Complete translation + notarization of Uzbek ${
        studentProfile.diplomaType === 'school'
          ? 'School Diploma'
          : studentProfile.diplomaType === 'lyceum'
          ? 'Academic Lyceum Transcript'
          : 'College Diploma'
      }`,
      ...(uni.foundationRequired
        ? [`Apply to the integrated 1-Year Foundation studies or Studienkolleg preparatory program`]
        : []),
      `Submit your documents directly on the portal (${new URL(uni.website).hostname})`
    ];

    const actualSteps = uni.applicationSteps || defaultSteps;

    return (
      <div className="space-y-3">
        {actualSteps.map((step, idx) => {
          const isChecked = checkedTasks[`${uni.id}-${idx}`] || false;
          return (
            <button
              key={idx}
              onClick={() => toggleTask(uni.id, idx)}
              className={`w-full flex items-start gap-4 p-4 text-left rounded-xl border text-xs sm:text-sm font-semibold ios-transition ${
                isChecked
                  ? 'bg-emerald-50/30 border-emerald-100 text-emerald-800 line-through decoration-emerald-200'
                  : 'bg-white border-gray-100 hover:border-gray-200 text-gray-700'
              }`}
            >
              <div className="mt-0.5">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-gray-300 hover:text-[#007AFF] flex-shrink-0 ios-transition" />
                )}
              </div>
              <div className="leading-relaxed">
                {step}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased flex flex-col selection:bg-[#007AFF]/15">
      {/* Premium minimal iOS-style Navbar */}
      <Navbar
        onGoHome={handleGoHome}
        onOpenProfile={() => setIsProfileOpen(!isProfileOpen)}
        profileStateSummary={profileStateSummary}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        
        {/* Animated Slide Down Drawer for Student Academic Profile */}
        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 32 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="overflow-hidden"
            >
              <ProfileDrawer
                profile={studentProfile}
                onUpdateProfile={setStudentProfile}
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Route Rendering based on SPA states */}
        <AnimatePresence mode="wait">
          {!activeUniId ? (
            /* ======================================================= */
            /* VIEW 1 & 2: LANDING (HOME) OR SEARCH RESULTS SCREEN      */
            /* ======================================================= */
            <motion.div
              key={viewState}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              {viewState === 'home' ? (
                 /* HOME VIEW MODULE */
                <div className="py-12 md:py-24 max-w-3xl mx-auto text-center space-y-8">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50/50 border border-blue-100 rounded-full text-[11px] font-bold text-[#007AFF] tracking-wider uppercase">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Dynamic Decision Tool
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1C1C1E] leading-tight">
                      Find universities you can apply to from Uzbekistan
                    </h1>
                  </div>

                  <div className="space-y-6">
                    <SearchBar
                      value={searchQuery}
                      onChange={handleSearchBarChange}
                      onClear={clearSearch}
                      placeholder="Type a university name, city, or favorite major..."
                    />

                    {/* Shortcuts list */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-widest">
                        Country Shortcuts:
                      </span>
                      {countries.map(c => (
                        <button
                          key={c.id}
                          onClick={() => handleCountryShortcut(c.id)}
                          id={`shortcut-${c.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#F2F2F7] text-[#1C1C1E] rounded-2xl text-xs font-bold border border-[#E5E5EA] shadow-sm ios-active-scale ios-transition cursor-pointer"
                        >
                          <span>{c.emoji}</span>
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* SEARCH RESULTS VIEW MODULE */
                <div className="space-y-6">
                  {/* Small Breadcrumb list */}
                  <div className="flex items-center justify-between border-b border-[#D1D1D6] pb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={clearSearch}
                        id="back-home-btn"
                        className="p-2 -ml-2 bg-white hover:bg-[#F2F2F7] border border-[#E5E5EA] text-[#3A3A3C] hover:text-[#1C1C1E] rounded-xl shadow-xs ios-transition cursor-pointer"
                        title="Go back home"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="ml-1">
                        <h2 className="text-lg font-bold text-[#1C1C1E] tracking-tight">
                          Search Results
                        </h2>
                        <p className="text-[10px] text-[#8E8E93] font-bold uppercase tracking-widest mt-0.5">
                          {selectedCountry ? `Country: ${selectedCountry}` : 'All Countries'}
                          {searchQuery && ` • Match: "${searchQuery}"`}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-[#8E8E93] bg-white border border-[#E5E5EA] px-3 py-1.5 rounded-xl shadow-xs">
                      Showing <span className="font-bold text-[#007AFF]">{processedUniversities.length}</span> programs
                    </div>
                  </div>

                  {/* Clean Filter Panel and Search Input (Search Header) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-8 w-full">
                      <SearchBar
                        value={searchQuery}
                        onChange={handleSearchBarChange}
                        onClear={clearSearch}
                        placeholder="Search universities, countries, majors..."
                      />
                    </div>
                    {/* Country Filter Toggles */}
                    <div className="sm:col-span-4 flex items-center justify-end gap-1.5 bg-[#E5E5EA] p-1 rounded-2xl border border-[#D1D1D6] text-xs w-full">
                      <button
                        onClick={() => setSelectedCountry(null)}
                        id="filter-country-all"
                        className={`flex-1 py-1.5 px-2.5 text-center font-bold rounded-xl ios-transition cursor-pointer ${
                          selectedCountry === null
                            ? 'bg-white shadow-sm text-[#1C1C1E]'
                            : 'text-[#3A3A3C] hover:text-[#1C1C1E]'
                        }`}
                      >
                        All
                      </button>
                      {countries.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCountry(c.id)}
                          id={`filter-country-${c.id}`}
                          className={`flex-1 py-1.5 px-2.5 text-center font-bold rounded-xl ios-transition cursor-pointer ${
                            selectedCountry === c.id
                              ? 'bg-white shadow-sm text-[#1C1C1E]'
                              : 'text-[#3A3A3C] hover:text-[#1C1C1E]'
                          }`}
                        >
                          {c.emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Empty state rendering */}
                  {processedUniversities.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-[#E5E5EA] rounded-[20px] shadow-sm p-8 space-y-4">
                      <div className="w-12 h-12 bg-[#F2F2F7] text-[#8E8E93] rounded-2xl flex items-center justify-center mx-auto">
                        <Info className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg text-[#1C1C1E]">No universities found</h3>
                        <p className="text-sm text-[#8E8E93] max-w-sm mx-auto leading-relaxed">
                          We couldn't find matches. Try clearing some search letters or adjust filters.
                        </p>
                      </div>
                      <button
                        onClick={clearSearch}
                        id="clear-results-btn"
                        className="px-5 py-2.5 bg-[#007AFF] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm ios-active-scale ios-transition cursor-pointer"
                      >
                        Reset Search Filters
                      </button>
                    </div>
                  ) : (
                    /* Search results listings */
                    <div className="space-y-4">
                      {processedUniversities.map(uni => (
                        <UniversityCard
                          key={uni.id}
                          university={uni}
                          studentProfile={studentProfile}
                          onViewDetails={setActiveUniId}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            /* ======================================================= */
            /* VIEW 3: UNIVERSITY DETAIL VIEW SCREEN (Premium Layout)  */
            /* ======================================================= */
            <motion.div
              key="uni-details-screen"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 pb-12"
            >
              {/* BACK HEADER BAR */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveUniId(null)}
                  id="back-to-results-btn"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E5EA] hover:bg-[#F2F2F7] text-[#1C1C1E] rounded-xl text-xs font-bold shadow-sm ios-transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#007AFF]" />
                  <span>Back to Universities</span>
                </button>

                <a
                  href={activeUniversity?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007AFF] hover:underline"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* UNIVERSITY BASIC TITLING & OVERVIEW */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#D1D1D6] pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  {activeUniversity && (
                    <UniversityLogo
                      universityId={activeUniversity.id}
                      size="lg"
                      className="shadow-md flex-shrink-0 animate-fade-in"
                    />
                  )}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#007AFF]">
                      <Globe className="w-3.5 h-3.5" />
                      <span>{activeUniversity?.city}, {activeUniversity?.country}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1C1C1E] leading-tight">
                      {activeUniversity?.name}
                    </h1>
                  </div>
                </div>

                <div className="bg-white border border-[#E5E5EA] rounded-[20px] px-5 py-4 text-center sm:text-right self-start md:self-auto shadow-sm min-w-[120px]">
                  <span className="block text-[10px] uppercase font-bold text-[#8E8E93] tracking-widest leading-none mb-1.5 font-bold">
                    Acceptance Rate
                  </span>
                  <span className="text-2xl font-black text-[#007AFF]">
                    {activeUniversity?.acceptanceRate}
                  </span>
                </div>
              </div>

              {/* SECTION 1: DECISION BANNER (TOP PRIORITY BASED ON STUDENT PROFILE) */}
              {activeEligibility && (
                <div className={`p-6 md:p-8 rounded-[20px] border text-[#3A3A3C] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm ${
                  activeEligibility.status === 'Eligible'
                    ? 'bg-[#EBFBEE] border-[#D3F9D8]'
                    : activeEligibility.status === 'Conditional'
                    ? 'bg-[#FFF9DB] border-[#FFE066]'
                    : 'bg-[#FFF5F5] border-[#FFC9C9]'
                }`}>
                  <div className="space-y-3 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93]">
                      Admissions Verdict
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight text-[#1C1C1E]">
                        {activeEligibility.status === 'Eligible'
                          ? 'You are eligible to apply!'
                          : activeEligibility.status === 'Conditional'
                          ? 'Conditional admission'
                          : 'Not eligible based on current stats'}
                      </h3>
                      
                      {/* Detailed analysis report list */}
                      <ul className="space-y-1 pt-1">
                        {activeEligibility.reasons.map((reason, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-[#3A3A3C] font-semibold flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              activeEligibility.status === 'Eligible'
                                ? 'bg-emerald-600'
                                : activeEligibility.status === 'Conditional'
                                ? 'bg-amber-600'
                                : 'bg-rose-600'
                            }`} />
                            <span>{reason}</span>
                          </li>
                        ))}
                        {activeEligibility.warnings.map((warning, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-[#3A3A3C] font-semibold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] flex-shrink-0" />
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Visual colored pill status badge */}
                  <div className="self-start sm:self-center flex-shrink-0">
                    <StatusBadge status={activeEligibility.status} size="lg" />
                  </div>
                </div>
              )}

              {/* DESCRIPTION ACCENT BLOCK */}
              <div className="bg-white border border-[#E5E5EA] rounded-[20px] p-6 shadow-sm">
                <p className="text-sm text-[#3A3A3C] leading-relaxed font-semibold">
                  {activeUniversity?.description}
                </p>
                
                {/* Popular Majors visual pill tags */}
                <div className="mt-4 pt-4 border-t border-[#F2F2F7] flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-widest">
                    Most Popular Majors:
                  </span>
                  {activeUniversity?.popularMajors.map((major, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#F2F2F7] text-[#1C1C1E] border border-[#E5E5EA] rounded-full text-xs font-bold"
                    >
                      {major}
                    </span>
                  ))}
                </div>
              </div>

              {/* SECTION 2: KEY REQUIREMENTS (CARDS GRID) */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1C1C1E] tracking-tight">
                  Academic Requirements & Fees
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoCard
                    title="Required English Standard"
                    value={`IELTS ${activeUniversity?.ieltsRequirement}+`}
                    icon={BookOpen}
                    subtext="Overall band score average"
                    highlighted={studentProfile.ielts >= (activeUniversity?.ieltsRequirement || 0)}
                  />
                  <InfoCard
                    title="SAT Standard Core"
                    value={activeUniversity?.satRequirement ? `${activeUniversity?.satRequirement}+ pts` : 'Not Required'}
                    icon={FileText}
                    subtext={activeUniversity?.satRequirement ? "Test optional but favored" : "Test is not demanded"}
                    highlighted={
                      activeUniversity?.satRequirement === null ||
                      (studentProfile.sat !== null && studentProfile.sat >= (activeUniversity?.satRequirement || 0))
                    }
                  />
                  <InfoCard
                    title="Average Typical GPA"
                    value={`${activeUniversity?.gpaRequirement.toFixed(1)} / 4.0`}
                    icon={Percent}
                    subtext="Equivalent of standard Uzbek A/B"
                    highlighted={studentProfile.gpa >= (activeUniversity?.gpaRequirement || 0)}
                  />
                  <InfoCard
                    title="Annual Tuition Fee"
                    value={activeUniversity?.tuition || 'Unspecified'}
                    icon={DollarSign}
                    subtext="Excludes living costs"
                  />
                  <InfoCard
                    title="Financial Aid"
                    value={activeUniversity?.financialAid || 'None'}
                    icon={Briefcase}
                    subtext="Opportunities for Uzbek students"
                  />
                </div>
              </div>

              {/* GRID: SECTION 3 (UZBEK STUDENT SPECIFICS) & SECTION 5 (TIPS ACCORDION) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* SECTION 3: Uzbek Student Info */}
                <div className="bg-white border border-[#E5E5EA] rounded-[20px] p-6 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-[#1C1C1E] tracking-tight">
                      Uzbek Diploma Legality
                    </h3>
                    <p className="text-xs text-[#8E8E93] leading-relaxed font-semibold">
                      Information regarding how the Ministry of Education in {activeUniversity?.country} evaluates diplomas issued by schools and lyceums inside Uzbekistan.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Item 1: Diploma Acceptability status */}
                    <div className="flex items-start gap-3.5">
                      <div className="p-2 rounded-xl bg-blue-50 text-[#007AFF] flex-shrink-0 animate-pulse">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-[#8E8E93] uppercase tracking-widest leading-none mb-1">
                          Acceptance Status
                        </span>
                        <span className="text-sm font-bold text-[#1C1C1E]">
                          {activeUniversity?.uzbekDiplomaStatus}
                          {activeUniversity?.uzbekDiplomaStatus === 'Accepted' && ' — Fully supported for direct admissions'}
                          {activeUniversity?.uzbekDiplomaStatus === 'Conditional' && ' — Additional pathways are required'}
                        </span>
                      </div>
                    </div>

                    {/* Item 2: Foundation Required Status */}
                    <div className="flex items-start gap-3.5">
                      <div className="p-2 rounded-xl bg-orange-50 text-orange-500 flex-shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-[#8E8E93] uppercase tracking-widest leading-none mb-1">
                          Foundation Year Required?
                        </span>
                        <span className="text-sm font-bold text-[#1C1C1E]">
                          {activeUniversity?.foundationRequired
                             ? 'Yes — Compulsory preparatory program required (e.g. Studienkolleg)'
                             : 'No — Direct entry to year 1 is fully available'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 5: Tips (3-5 short bullets max) */}
                <div className="bg-white border border-[#E5E5EA] rounded-[20px] p-6 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-[#1C1C1E] tracking-tight">
                    Insider Tips for Uzbeks
                  </h3>
                  
                  <div className="space-y-3.5">
                    {activeUniversity?.tips.map((tip, index) => (
                      <div key={index} className="flex gap-3 items-start text-sm">
                        <div className="w-5 h-5 rounded-full bg-blue-50 text-[#007AFF] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 animate-bounce">
                          {index + 1}
                        </div>
                        <p className="text-[#3A3A3C] font-semibold leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* SECTION 4: NEXT STEPS (Interactive Checklist widget) */}
              <div className="bg-[#1C1C1E] text-white rounded-[20px] p-6 md:p-8 space-y-6 shadow-lg">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 rounded-lg text-[10px] font-bold tracking-wider uppercase text-blue-400 border border-white/5">
                    Interactive Roadmaps
                  </span>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">
                    Custom Application Roadmap
                  </h3>
                  <p className="text-xs text-gray-400 font-semibold max-w-xl leading-relaxed">
                    Check off the steps below as you proceed with your admissions. Status calculates live with your Profile options.
                  </p>
                </div>

                {/* Checklist implementation */}
                {activeUniversity && renderNextStepsChecklist(activeUniversity, activeEligibility!)}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimalistic iOS-style Footer */}
      <footer className="w-full bg-white border-t border-[#D1D1D6] py-8 px-6 text-center text-xs text-[#8E8E93] mt-20">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="font-bold tracking-tight text-[#3A3A3C]">
            UniPath Uzbekistan — Decision-Making Tool
          </p>
          <p className="font-medium text-[11px] text-[#8E8E93]">
            Designed strictly to help Uzbek students make instant premium educational decisions. No clutter.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <span className="font-semibold text-[#8E8E93]">© 2026 UniPath</span>
            <span className="text-gray-200">|</span>
            <button
              onClick={() => {
                setStudentProfile({
                  ielts: 6.5,
                  sat: 1350,
                  gpaScale: 5,
                  originalGpa: 4.8,
                  gpa: 3.84,
                  diplomaType: 'lyceum'
                });
                setIsProfileOpen(true);
              }}
              className="font-bold text-[#007AFF] hover:underline cursor-pointer"
            >
              Reset to Perfect Benchmark
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
