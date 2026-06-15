/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
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
  Award,
  Send,
  Sparkles,
  Lock,
  Plus,
  Trash2,
  Edit,
  Search
} from 'lucide-react';

import { StudentProfile, University, EligibilityResult } from './types';
import { UNIVERSITIES } from './data';
import { evaluateEligibility, filterUniversities, expandSearchQuery } from './utils';
import { Language, UI_TRANSLATIONS, UNIVERSITY_TRANSLATIONS } from './translations';
import { TOP_100_RANKINGS } from './rankingsData';

// Component imports
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import StatusBadge from './components/StatusBadge';
import UniversityCard from './components/UniversityCard';
import InfoCard from './components/InfoCard';
import ProfileDrawer from './components/ProfileDrawer';
import UniversityLogo from './components/UniversityLogo';
import UniversityEditorModal from './components/UniversityEditorModal';

const LOCAL_OVERRIDES: Record<Language, Record<string, string>> = {
  en: {
    officialWebsite: 'Official Website',
    acceptanceRate: 'Acceptance Rate',
    viewDetails: 'View Details',
  },
  uz: {
    officialWebsite: 'Rasmiy Veb-Sayt',
    acceptanceRate: 'Qabul Darajasi',
    viewDetails: 'Batafsil ma’lumot',
  },
  ru: {
    officialWebsite: 'Официальный Сайт',
    acceptanceRate: 'Процент Приема',
    viewDetails: 'Подробнее',
  },
  de: {
    officialWebsite: 'Offizielle Website',
    acceptanceRate: 'Akzeptanzrate',
    viewDetails: 'Details anzeigen',
  }
};

const T_CHECKLIST_MAP: Record<Language, {
  ieltsPrep: string;
  satPrep: string;
  essays: string;
  translation: string;
  foundation: string;
  portalSubmit: string;
  diplomaSchool: string;
  diplomaLyceum: string;
  diplomaCollege: string;
  diplomaIB: string;
}> = {
  en: {
    ieltsPrep: 'Complete IELTS exam preparation (Aim for score >= {score})',
    satPrep: 'Prepare and register for SAT exams (Aim for >= {score})',
    essays: 'Prepare essential college application essays and Personal Statement',
    translation: 'Complete translation + notarization of your Uzbek {diplomaType}',
    foundation: 'Apply to the integrated 1-Year Foundation studies or Studienkolleg program',
    portalSubmit: 'Submit your documents directly on the official portal ({domain})',
    diplomaSchool: 'School Diploma',
    diplomaLyceum: 'Academic Lyceum Transcript',
    diplomaCollege: 'College Diploma',
    diplomaIB: 'International IB/AP Credentials'
  },
  uz: {
    ieltsPrep: 'IELTS imtihoniga tayyorgarlikni yakunlash (Maqsadli ball >= {score})',
    satPrep: 'SAT imtihonlariga tayyorlanish va ro\'yxatdan o\'tish (Maqsadli ball >= {score})',
    essays: 'Insholar (Essays) hamda Shaxsiy Bayonot (Personal Statement) loyihasini tayyorlash',
    translation: 'O\'zbekiston {diplomaType} hujjatlarini tarjima va notarial tasdiqlash',
    foundation: '1 yillik tayyorlov (Foundation/Studienkolleg) kursiga hujjat topshirish',
    portalSubmit: 'Hujjatlarni to\'g\'ridan-to\'g\'ri rasmiy portal orqali yuborish ({domain})',
    diplomaSchool: 'Maktab Diplomi',
    diplomaLyceum: 'Akademik Litsey Transkripti',
    diplomaCollege: 'Kasb-Hunar Kolleji Diplomi',
    diplomaIB: 'Xalqaro IB/AP Diplomi'
  },
  ru: {
    ieltsPrep: 'Завершить подготовку к экзамену IELTS (Целевой балл >= {score})',
    satPrep: 'Подготовиться и зарегистрироваться на экзамены SAT (Цель >= {score})',
    essays: 'Подготовить эссе для поступления и Личное заявление (Personal Statement)',
    translation: 'Сделать перевод и нотариальное заверение узбекского {diplomaType}',
    foundation: 'Подать заявку на программу Foundation или подготовительный год Studienkolleg',
    portalSubmit: 'Отправить документы напрямую через официальный веб-портал ({domain})',
    diplomaSchool: 'Школьного Аттестата',
    diplomaLyceum: 'Диплома Академического Лицея',
    diplomaCollege: 'Диплома Профессионального Колледжа',
    diplomaIB: 'Международного сертификата IB/AP'
  },
  de: {
    ieltsPrep: 'IELTS-Prüfungsvorbereitung abschließen (Zielpunktzahl >= {score})',
    satPrep: 'Für SAT-Prüfungen vorbereiten und registrieren (Zielpunktzahl >= {score})',
    essays: 'Bewerbungsessays und ein Motivationsschreiben (Personal Statement) erstellen',
    translation: 'Beglaubigte Übersetzung und Notarisierung Ihres usbekischen {diplomaType}s durchführen',
    foundation: 'Bewerbung für das integrierte Vorbereitungsjahr (Foundation) oder Studienkolleg einreichen',
    portalSubmit: 'Reichen Sie Ihre Unterlagen direkt über das offizielle Portal ({domain}) ein',
    diplomaSchool: 'Schulzeugnisses',
    diplomaLyceum: 'Lyzeum-Transkripts',
    diplomaCollege: 'Berufskolleg-Diploms',
    diplomaIB: 'Internationalen IB/AP-Zeugnisses'
  }
};

export default function App() {
  const clientId = React.useMemo(() => {
    let id = localStorage.getItem('uni_client_id');
    if (!id) {
      id = 'device-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now();
      localStorage.setItem('uni_client_id', id);
    }
    return id;
  }, []);

  React.useEffect(() => {
    fetch('/api/admin/device-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.permBanned) {
        localStorage.setItem('admin_device_banned_perm', 'true');
        if (window.location.pathname === '/admin' || window.location.hash === '#admin' || window.location.hash === '#/admin') {
          try {
            window.history.pushState(null, '', '/');
          } catch (e) {
            window.location.hash = '';
          }
          window.location.reload();
        }
      }
    })
    .catch(err => console.error(err));
  }, [clientId]);

  // Navigation / View state
  const [viewState, setViewState] = useState<'home' | 'search'>('home');
  const [activeUniId, setActiveUniId] = useState<string | null>(null);

  // Custom approved universities and administrator views
  const [customUniversities, setCustomUniversities] = useState<University[]>([]);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [isAdminLoading, setIsAdminLoading] = useState<boolean>(false);
  const [adminMessage, setAdminMessage] = useState<string | null>(null);

  // Admin Authentication and CRUD Management states
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);
  
  // Manage Catalog state
  const [activeAdminTab, setActiveAdminTab] = useState<'pending' | 'manage'>('pending');
  const [adminUniSearchQuery, setAdminUniSearchQuery] = useState<string>('');
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [isAddingUniversity, setIsAddingUniversity] = useState<boolean>(false);

  // AI Search states
  const [isAiSearching, setIsAiSearching] = useState<boolean>(false);
  const [aiSearchResult, setAiSearchResult] = useState<{
    isReal: boolean;
    university?: University;
    message?: string;
  } | null>(null);

  // Active user language state - defaults to Uzbek 'uz'
  const [language, setLanguage] = useState<Language>('uz');

  // Load selected language translation object
  const t = useMemo(() => {
    return {
      ...UI_TRANSLATIONS[language],
      ...LOCAL_OVERRIDES[language]
    };
  }, [language]);

  // Search filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  // Map of available university categories on landing page
  const categories = useMemo(() => [
    { label: t.cat_ivy_elite || 'Elite Ivy & Global', emoji: '🏆', id: 'ivy_elite' },
    { label: t.cat_stem_tech || 'STEM & IT', emoji: '💻', id: 'stem_tech' },
    { label: t.cat_business_finance || 'Business & Finance', emoji: '📈', id: 'business_finance' },
    { label: t.cat_europe_low_tuition || 'Europe: Low-Fee', emoji: '🇪🇺', id: 'europe_low_tuition' },
    { label: t.cat_asian_top || 'Asian Tier-1', emoji: '🌏', id: 'asian_top' },
    { label: t.cat_local_joint || 'Tashkent Joint', emoji: '🇺🇿', id: 'local_joint' }
  ], [t]);

  // Load approved custom universities from the backend database
  const fetchUniversities = () => {
    fetch('/api/universities')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.custom)) {
          setCustomUniversities(data.custom);
        }
      })
      .catch(err => console.error('Error fetching custom universities:', err));
  };

  React.useEffect(() => {
    fetchUniversities();
  }, []);

  // Construct master list that merges baseline hardcoded data and custom registered ones
  const masterUniversitiesList = useMemo(() => {
    if (customUniversities && customUniversities.length > 0) {
      return customUniversities;
    }
    return UNIVERSITIES;
  }, [customUniversities]);

  // Synchronize URL and Routing on mount and on popstate/hashchange
  React.useEffect(() => {
    const handleRouting = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
        const isBanned = localStorage.getItem('admin_device_banned_perm') === 'true';
        if (isBanned) {
          try {
            window.history.pushState(null, '', '/');
          } catch (e) {
            window.location.hash = '';
          }
          setIsAdminView(false);
          setViewState('home');
          return;
        }
        setIsAdminView(true);
        setViewState('search');
        setActiveUniId(null);
        setSelectedCategory(null);
        setSearchQuery('');
      } else if (path.startsWith('/university/') || hash.startsWith('#/university/')) {
        const id = path.startsWith('/university/') 
          ? path.replace('/university/', '') 
          : hash.replace('#/university/', '');
        setIsAdminView(false);
        setViewState('search');
        setActiveUniId(decodeURIComponent(id));
      } else {
        setIsAdminView(false);
        if (path === '/' || hash === '' || hash === '#/' || hash === '#') {
          setViewState('home');
          setActiveUniId(null);
        }
      }
    };

    handleRouting();

    window.addEventListener('popstate', handleRouting);
    window.addEventListener('hashchange', handleRouting);

    return () => {
      window.removeEventListener('popstate', handleRouting);
      window.removeEventListener('hashchange', handleRouting);
    };
  }, []);

  // Custom Navigation functions to update the URL in iframe-friendly fallback
  const navigateToUniversity = (id: string | null) => {
    if (id) {
      const targetPath = `/university/${encodeURIComponent(id)}`;
      try {
        window.history.pushState(null, '', targetPath);
      } catch (e) {
        window.location.hash = `/university/${encodeURIComponent(id)}`;
      }
      setActiveUniId(id);
      setIsAdminView(false);
    } else {
      try {
        window.history.pushState(null, '', '/');
      } catch (e) {
        window.location.hash = '/';
      }
      setActiveUniId(null);
      setIsAdminView(false);
    }
  };

  const navigateToAdmin = () => {
    try {
      window.history.pushState(null, '', '/admin');
    } catch (e) {
      window.location.hash = '/admin';
    }
    setIsAdminView(true);
    setViewState('search');
    setActiveUniId(null);
  };

  const navigateToHome = () => {
    try {
      window.history.pushState(null, '', '/');
    } catch (e) {
      window.location.hash = '';
    }
    setIsAdminView(false);
    setViewState('home');
    setActiveUniId(null);
    setSearchQuery('');
    setSelectedCategory(null);
    setAiSearchResult(null);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError(null);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUsername, password: adminPassword, clientId })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setAdminToken(data.token);
        setIsAdminAuthenticated(true);
        setAdminPassword('');
      } else {
        if (data.permBanned) {
          localStorage.setItem('admin_device_banned_perm', 'true');
          setAdminAuthError(data.error);
          setTimeout(() => {
            navigateToHome();
          }, 1500);
        } else {
          setAdminAuthError(data.error || 'Authentication failed. Please check credentials.');
        }
      }
    } catch (err: any) {
      setAdminAuthError('Network error during administrator login.');
    }
  };

  // Load pending admin requests
  const fetchPendingRequests = () => {
    if (!adminToken) return;
    setIsAdminLoading(true);
    fetch('/api/admin/pending', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPendingRequests(data);
        }
      })
      .catch(err => console.error('Error fetching pending requests:', err))
      .finally(() => setIsAdminLoading(false));
  };

  React.useEffect(() => {
    if (isAdminView && isAdminAuthenticated && adminToken) {
      fetchPendingRequests();
    }
  }, [isAdminView, isAdminAuthenticated, adminToken]);

  const handleApprove = async (requestId: string) => {
    if (!adminToken) return;
    try {
      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ requestId })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setAdminMessage(`Successfully approved and published ${data.university.name}!`);
        fetchPendingRequests();
        fetchUniversities();
      } else {
        setAdminMessage(`Error: ${data.error || 'Failed to approve'}`);
      }
    } catch (err: any) {
      setAdminMessage(`Error: ${err.message}`);
    }
  };

  const handleDecline = async (requestId: string) => {
    if (!adminToken) return;
    try {
      const response = await fetch('/api/admin/decline', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ requestId })
      });
      const data = await response.json();
      if (response.ok && data.success) {
         setAdminMessage('Submited request successfully declined and removed.');
         fetchPendingRequests();
      } else {
         setAdminMessage(`Error: ${data.error || 'Failed to decline'}`);
      }
    } catch (err: any) {
      setAdminMessage(`Error: ${err.message}`);
    }
  };

  const handleCreateUniversity = async (uniData: Partial<University>) => {
    if (!adminToken) return;
    try {
      const response = await fetch('/api/admin/universities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(uniData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setAdminMessage(`Manually added new institution: ${data.university.name}!`);
        fetchUniversities();
        setIsAddingUniversity(false);
      } else {
        setAdminMessage(`Error: ${data.error || 'Failed to create university'}`);
      }
    } catch (err: any) {
      setAdminMessage(`Error: ${err.message}`);
    }
  };

  const handleUpdateUniversity = async (id: string, uniData: Partial<University>) => {
    if (!adminToken) return;
    try {
      const response = await fetch(`/api/admin/universities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(uniData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setAdminMessage(`Successfully modified university: ${data.university.name}!`);
        fetchUniversities();
        setEditingUniversity(null);
      } else {
        setAdminMessage(`Error: ${data.error || 'Failed to update university'}`);
      }
    } catch (err: any) {
      setAdminMessage(`Error: ${err.message}`);
    }
  };

  const handleDeleteUniversity = async (id: string, name: string) => {
    if (!adminToken) return;
    try {
      const response = await fetch(`/api/admin/universities/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setAdminMessage(`Successfully deleted ${name} from catalog databases!`);
        fetchUniversities();
      } else {
        setAdminMessage(`Error: ${data.error || 'Failed to delete'}`);
      }
    } catch (err: any) {
      setAdminMessage(`Error: ${err.message}`);
    }
  };

  const handleAiSearch = async () => {
    if (!searchQuery || searchQuery.trim().length === 0) return;
    setIsAiSearching(true);
    setAiSearchResult(null);

    try {
      const response = await fetch('/api/ai-search-university', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });

      const data = await response.json();
      if (response.ok && data.isReal && data.university) {
        // Safe-insert temporarily to support direct roadmap lookup in full SPA catalog list
        setCustomUniversities(prev => {
          if (!prev.some(u => u.id === data.university.id)) {
            return [...prev, data.university];
          }
          return prev;
        });
        setAiSearchResult({
          isReal: true,
          university: data.university
        });
      } else {
        setAiSearchResult({
          isReal: false,
          message: data.message || 'N/A'
        });
      }
    } catch (err: any) {
      console.error(err);
      setAiSearchResult({
        isReal: false,
        message: 'N/A — Failed to query AI research agent.'
      });
    } finally {
      setIsAiSearching(false);
    }
  };

  // Dynamically translate all university records on-the-fly based on selected language
  const localizedUniversities = useMemo(() => {
    return masterUniversitiesList.map(uni => {
      const translation = UNIVERSITY_TRANSLATIONS[language]?.[uni.id];
      if (translation) {
        return {
          ...uni,
          name: translation.name,
          city: translation.city,
          description: translation.description,
          popularMajors: translation.popularMajors,
          tips: translation.tips,
          applicationSteps: translation.applicationSteps || uni.applicationSteps,
          tuition: translation.tuition,
          financialAid: translation.financialAid
        };
      }
      return uni;
    });
  }, [language, masterUniversitiesList]);

  // Derive filtered universities list dynamically based on queries
  const processedUniversities = useMemo(() => {
    return filterUniversities(localizedUniversities, searchQuery, selectedCategory);
  }, [localizedUniversities, searchQuery, selectedCategory]);

  // Retrieve active university details
  const activeUniversity = useMemo(() => {
    if (!activeUniId) return null;
    
    // First, look in current localized/DB universities
    const found = localizedUniversities.find(u => u.id === activeUniId);
    if (found) return found;

    // Second, if it is a QS Top 100 on-the-fly ID, rebuild dynamically
    if (activeUniId.startsWith('ranked-')) {
      const rankNum = parseInt(activeUniId.replace('ranked-', ''), 10);
      const rankedItem = TOP_100_RANKINGS.find(r => r.rank === rankNum);
      if (rankedItem) {
        const cleanCountry = rankedItem.country.trim().toUpperCase();
        const isUKorGerorIt = cleanCountry === 'UK' || cleanCountry === 'GERMANY' || cleanCountry === 'ITALY';
        
        const tempUni: University = {
          id: `ranked-${rankedItem.rank}`,
          name: rankedItem.name,
          country: rankedItem.country,
          city: rankedItem.city,
          description: `QS Top 100 World University Rank #${rankedItem.rank}. Located in ${rankedItem.city}, ${rankedItem.country}. Renowned worldwide for advanced educational curriculum, pioneering academic output and career-launching pathways for ambitious international candidates.`,
          website: rankedItem.website,
          ieltsRequirement: rankedItem.rank <= 10 ? 7.5 : rankedItem.rank <= 50 ? 7.0 : 6.5,
          gpaRequirement: rankedItem.rank <= 10 ? 3.8 : rankedItem.rank <= 50 ? 3.5 : 3.0,
          satRequirement: rankedItem.rank <= 25 ? 1450 : rankedItem.rank <= 60 ? 1350 : null,
          acceptanceRate: rankedItem.acceptanceRate,
          tuition: rankedItem.country === 'Germany' || rankedItem.country === 'Switzerland' ? 'Free / Under €3,000' : '$18,000 - $62,000 / yr',
          financialAid: 'Full Ivy Need-Blind or Regional Merit stipends available',
          uzbekDiplomaStatus: isUKorGerorIt ? 'Conditional' : 'Accepted',
          foundationRequired: isUKorGerorIt,
          category: 'ivy_elite',
          qsRanking: rankedItem.rank,
          theRanking: rankedItem.rank,
          popularMajors: ['Advanced Informatics', 'Quantum Chemistry', 'Aerospace Engineering', 'Global Economics'],
          tips: [
            'Prepare a stellar motivation letter explaining your academic goals and leadership potential.',
            'Maintain a high GPA (above 90% or 4.5/5.0) on your Uzbek Lyceum/College/School transcripts.',
            'Submit high-quality recommendations from mathematics and subject-related teachers.'
          ],
          applicationSteps: [
            'Obtain score report on IELTS Academic (target overall score 7.0+).',
            'Request certified English translations and apostilles for your graduation certificate (Shahodatnoma).',
            'Create account on application platform (CommonApp, UCAS, or direct uni-assist portal) and finalize submission.'
          ]
        };
        return tempUni;
      }
    }
    return null;
  }, [activeUniId, localizedUniversities]);

  // Active university eligibility calculation
  const activeEligibility = useMemo(() => {
    if (!activeUniversity) return null;
    return evaluateEligibility(studentProfile, activeUniversity, language);
  }, [activeUniversity, studentProfile, language]);

  // Quick summary string to display inside the navigation bar trigger
  const profileStateSummary = useMemo(() => {
    const ieltsStr = `IELTS ${studentProfile.ielts.toFixed(1)}`;
    const satStr = studentProfile.sat ? `, SAT ${studentProfile.sat}` : '';
    const diplomaStr =
      studentProfile.diplomaType === 'school'
        ? ` (${t.diplomaTypeSchool ? t.diplomaTypeSchool.split(' ')[0] : '11-Yr'})`
        : studentProfile.diplomaType === 'lyceum'
        ? ` (${t.diplomaTypeLyceum ? t.diplomaTypeLyceum.split(' ')[0] : 'Lyceum'})`
        : studentProfile.diplomaType === 'college'
        ? ` (${t.diplomaTypeCollege ? t.diplomaTypeCollege.split(' ')[0] : 'College'})`
        : ` (${t.diplomaTypeIB ? t.diplomaTypeIB.split(' ')[0] : 'IB/AP'})`;
    return `${ieltsStr}${satStr}${diplomaStr}`;
  }, [studentProfile, language, t]);

  // Handle clicking shortcuts from landing
  const handleCategoryShortcut = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setViewState('search');
    setActiveUniId(null);
  };

  // Launch fresh search
  const handleSearchBarChange = (val: string) => {
    setSearchQuery(val);
    if (viewState === 'home') {
      setViewState('search');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setViewState('home');
    setActiveUniId(null);
    setAiSearchResult(null);
  };

  const handleGoHome = () => {
    setViewState('home');
    setActiveUniId(null);
    setSearchQuery('');
    setSelectedCategory(null);
  };

  // Dynamic next steps helper
  const renderNextStepsChecklist = (uni: University, elg: EligibilityResult) => {
    const map = T_CHECKLIST_MAP[language] || T_CHECKLIST_MAP.en;
    const diplomaLabel = 
      studentProfile.diplomaType === 'school'
        ? map.diplomaSchool
        : studentProfile.diplomaType === 'lyceum'
        ? map.diplomaLyceum
        : studentProfile.diplomaType === 'college'
        ? map.diplomaCollege
        : map.diplomaIB;

    const defaultSteps = [
      map.ieltsPrep.replace('{score}', uni.ieltsRequirement.toString()),
      ...(uni.satRequirement !== null
        ? [map.satPrep.replace('{score}', uni.satRequirement.toString())]
        : []),
      map.essays,
      map.translation.replace('{diplomaType}', diplomaLabel),
      ...(uni.foundationRequired
        ? [map.foundation]
        : []),
      map.portalSubmit.replace('{domain}', new URL(uni.website).hostname)
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
              className={`w-full flex items-start gap-4 p-4 text-left rounded-xl border text-xs sm:text-sm font-semibold ios-transition cursor-pointer ${
                isChecked
                  ? 'bg-emerald-50/20 border-emerald-500/20 text-emerald-300 line-through decoration-emerald-500/50'
                  : 'bg-[#2C2C2E] border-neutral-800 hover:border-neutral-700 text-neutral-200'
              }`}
            >
              <div className="mt-0.5 animate-fade-in">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-neutral-500 hover:text-[#007AFF] flex-shrink-0 ios-transition" />
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

  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased flex flex-col selection:bg-[#007AFF]/15">
          <Navbar
            onGoHome={navigateToHome}
            onOpenProfile={() => setIsProfileOpen(!isProfileOpen)}
            profileStateSummary={profileStateSummary}
            language={language}
            onLanguageChange={setLanguage}
            langLabelProfile={t.navAcademicProfile}
          />

          <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
            <div className="w-full max-w-md bg-white border border-[#E5E5EA] rounded-[24px] shadow-lg p-8 space-y-6">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 bg-[#F2F2F7] text-[#007AFF] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-black text-[#1C1C1E] tracking-tight">Admin Authentication</h1>
                <p className="text-xs text-[#8E8E93] leading-relaxed max-w-xs mx-auto font-semibold">
                  Please authenticate with username and password to access the University Administrator Hub.
                </p>
              </div>

              {adminAuthError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl text-center">
                  {adminAuthError}
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Username</label>
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F2F2F7] border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-sm font-semibold outline-hidden ios-transition focus:bg-white text-black"
                    placeholder="Enter username"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Password</label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F2F2F7] border border-[#E5E5EA] focus:border-[#007AFF] rounded-xl text-sm font-semibold outline-hidden ios-transition focus:bg-white text-black"
                    placeholder="Enter password"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={navigateToHome}
                    className="flex-1 px-4 py-3 bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#3A3A3C] rounded-xl text-xs font-bold shadow-xs ios-transition cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-[#007AFF] hover:bg-[#0062CC] text-white rounded-xl text-xs font-bold shadow-xs ios-active-scale ios-transition cursor-pointer text-center"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased flex flex-col selection:bg-[#007AFF]/15">
        <Navbar
          onGoHome={navigateToHome}
          onOpenProfile={() => setIsProfileOpen(!isProfileOpen)}
          profileStateSummary={profileStateSummary}
          language={language}
          onLanguageChange={setLanguage}
          langLabelProfile={t.navAcademicProfile}
        />

        <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#D1D1D6] pb-4 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={navigateToHome}
                className="p-2 bg-white hover:bg-[#F2F2F7] border border-[#E5E5EA] text-[#3A3A3C] rounded-xl shadow-xs ios-transition cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-[#1C1C1E] tracking-tight">University Administrator Hub</h1>
                <p className="text-xs text-[#8E8E93] font-bold uppercase tracking-wider mt-0.5">Approve AI submissions or perform direct catalog CRUD actions</p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingUniversity(null);
                setIsAddingUniversity(true);
              }}
              className="px-4 py-2.5 bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm ios-active-scale ios-transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Enrol New Institution
            </button>
          </div>

          {/* ADMIN NAVIGATION TABS */}
          <div className="flex items-center border-b border-[#E5E5EA] gap-2">
            <button
              onClick={() => setActiveAdminTab('pending')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all cursor-pointer ${
                activeAdminTab === 'pending'
                  ? 'border-[#007AFF] text-[#007AFF] bg-white font-black'
                  : 'border-transparent text-[#8E8E93] hover:text-[#1C1C1E]'
              }`}
            >
              Pending Approvals ({pendingRequests.length})
            </button>
            <button
              onClick={() => setActiveAdminTab('manage')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all cursor-pointer ${
                activeAdminTab === 'manage'
                  ? 'border-[#007AFF] text-[#007AFF] bg-white font-black'
                  : 'border-transparent text-[#8E8E93] hover:text-[#1C1C1E]'
              }`}
            >
              Active Catalog Master ({masterUniversitiesList.length})
            </button>
          </div>

          {adminMessage && (
            <div className="p-4 bg-[#EBFBEE] border border-[#D3F9D8] text-emerald-905 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-semibold">
              <span>{adminMessage}</span>
              <button onClick={() => setAdminMessage(null)} className="text-[#007AFF] hover:underline cursor-pointer">Dismiss</button>
            </div>
          )}

          {activeAdminTab === 'pending' ? (
            /* ==================== TABS 1: PENDING APPROVALS ==================== */
            isAdminLoading ? (
              <div className="text-center py-20 bg-white border border-[#E5E5EA] rounded-[20px] shadow-sm">
                <div className="w-8 h-8 border-4 border-[#007AFF] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm font-bold text-gray-500">Retrieving pending AI-searched institutions...</p>
              </div>
            ) : pendingRequests.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#E5E5EA] rounded-[20px] shadow-sm p-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-neutral-900">All submissions verified</h3>
                  <p className="text-sm text-[#8E8E93] max-w-sm mx-auto leading-relaxed">
                    There are currently no pending university approval requests in the administration queue. New AI query responses automatically appear here.
                  </p>
                </div>
                <button
                  onClick={navigateToHome}
                  className="px-5 py-2.5 bg-[#007AFF] text-white rounded-xl text-xs font-bold shadow-sm ios-active-scale ios-transition cursor-pointer"
                >
                  Return to Directory
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="p-6 bg-white border border-[#E5E5EA] rounded-[20px] shadow-sm space-y-4 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F2F2F7] pb-4 gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8E8E93] tracking-widest block">Original User Search Query</span>
                        <span className="text-base font-black text-[#1C1C1E]">"{req.query}"</span>
                      </div>
                      <span className="text-xs text-gray-400 font-semibold">{new Date(req.requestDate).toLocaleString()}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <span className="text-[10px] uppercase font-bold text-[#8E8E93] tracking-widest block">AI Restructured Catalog Schema</span>
                        <h4 className="text-xl font-bold text-neutral-900 leading-tight">{req.university.name}</h4>
                        <p className="text-xs font-semibold text-[#8E8E93]">{req.university.city}, {req.university.country}</p>
                        <p className="text-sm text-[#3A3A3C] leading-relaxed font-semibold">{req.university.description}</p>
                        <a href={req.university.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#007AFF] font-bold hover:underline">
                          <span>Official Website</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <div className="bg-[#F2F2F7] p-5 rounded-[20px] space-y-3.5 text-xs">
                        <span className="text-[10px] uppercase font-bold text-[#8E8E93] tracking-widest block">Metrics & Requirements</span>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 font-semibold">
                          <div>
                            <p className="text-gray-404 text-[10px] uppercase text-[#8E8E93] leading-none mb-1">Acceptance Rate</p>
                            <p className="text-[#1C1C1E] text-sm font-bold">{req.university.acceptanceRate}</p>
                          </div>
                          <div>
                            <p className="text-gray-404 text-[10px] uppercase text-[#8E8E93] leading-none mb-1">Annual Tuition</p>
                            <p className="text-[#1C1C1E] text-sm font-bold">{req.university.tuition}</p>
                          </div>
                          <div>
                            <p className="text-gray-404 text-[10px] uppercase text-[#8E8E93] leading-none mb-1">IELTS Minimum</p>
                            <p className="text-[#1C1C1E] text-sm font-bold">IELTS {req.university.ieltsRequirement}+</p>
                          </div>
                          <div>
                            <p className="text-gray-404 text-[10px] uppercase text-[#8E8E93] leading-none mb-1">GPA Minimum</p>
                            <p className="text-[#1C1C1E] text-sm font-bold">{req.university.gpaRequirement}/4.0</p>
                          </div>
                          <div>
                            <p className="text-gray-404 text-[10px] uppercase text-[#8E8E93] leading-none mb-1">Uzbek Diploma</p>
                            <p className="text-[#1C1C1E] text-sm font-bold">{req.university.uzbekDiplomaStatus}</p>
                          </div>
                          <div>
                            <p className="text-gray-404 text-[10px] uppercase text-[#8E8E93] leading-none mb-1">Category Group</p>
                            <p className="text-[#007AFF] text-sm font-bold uppercase">{req.university.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#F2F2F7] flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleDecline(req.id)}
                        className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold rounded-xl ios-transition cursor-pointer"
                      >
                        Decline & Dismiss
                      </button>
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-4 py-2 bg-[#34C759] hover:bg-[#28A745] text-white text-xs font-bold rounded-xl ios-transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        Approve & Publish Catalog
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* ==================== TABS 2: DIRECT CATALOG CRUD ==================== */
            <div className="space-y-4">
              {/* Filter controls */}
              <div className="relative animate-fade-in">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={adminUniSearchQuery}
                  onChange={(e) => setAdminUniSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#E5E5EA] focus:border-[#007AFF] rounded-2xl text-xs sm:text-sm font-semibold outline-hidden shadow-xs text-black"
                  placeholder="Filter existing database universities by name, country, or city..."
                />
              </div>

              {/* Grid or List of existing records */}
              <div className="bg-white border border-[#E5E5EA] rounded-[24px] overflow-hidden shadow-xs divide-y divide-[#F2F2F7] animate-fade-in">
                {masterUniversitiesList
                  .filter((uni) =>
                    uni.name.toLowerCase().includes(adminUniSearchQuery.toLowerCase()) ||
                    uni.city.toLowerCase().includes(adminUniSearchQuery.toLowerCase()) ||
                    uni.country.toLowerCase().includes(adminUniSearchQuery.toLowerCase())
                  )
                  .map((uni) => (
                    <div key={uni.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50 ios-transition">
                      <div className="flex items-center gap-3">
                        <UniversityLogo universityId={uni.id} website={uni.website} logo={uni.logo} size="lg" />
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-black text-[#1C1C1E] leading-snug">{uni.name}</h4>
                          <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-gray-500 font-semibold tracking-wider uppercase">
                            <span>{uni.city}, {uni.country}</span>
                            <span>•</span>
                            <span className="text-[#007AFF] font-bold">{uni.category}</span>
                            <span>•</span>
                            <span>QS Ranking: #{uni.qsRanking || 'Unranked'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            setEditingUniversity(uni);
                            setIsAddingUniversity(false);
                          }}
                          className="p-2 sm:px-3 sm:py-1.5 bg-neutral-105 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer ios-transition"
                          title="Edit university requirements or information"
                        >
                          <Edit className="w-3.5 h-3.5 text-gray-600" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUniversity(uni.id, uni.name)}
                          className="p-2 sm:px-3 sm:py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer ios-transition"
                          title="Remove from system"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>

        <UniversityEditorModal
          isOpen={isAddingUniversity || !!editingUniversity}
          onClose={() => {
            setIsAddingUniversity(false);
            setEditingUniversity(null);
          }}
          initialData={editingUniversity}
          onSave={(data) => {
            if (editingUniversity) {
              handleUpdateUniversity(editingUniversity.id, data);
            } else {
              handleCreateUniversity(data);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased flex flex-col selection:bg-[#007AFF]/15">
      {/* Premium minimal iOS-style Navbar */}
      <Navbar
        onGoHome={navigateToHome}
        onOpenProfile={() => setIsProfileOpen(!isProfileOpen)}
        profileStateSummary={profileStateSummary}
        language={language}
        onLanguageChange={setLanguage}
        langLabelProfile={t.navAcademicProfile}
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
                t={t}
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
                      {t.heroPreTag || 'Dynamic Decision Tool'}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1C1C1E] leading-tight">
                      {t.heroTitle || 'Find universities you can apply to from Uzbekistan'}
                    </h1>
                    <p className="text-sm sm:text-base text-[#8E8E93] max-w-xl mx-auto leading-relaxed font-semibold">
                      {t.heroSubtitle || 'Configure your academic parameters and get real-time eligibility calculations.'}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <SearchBar
                      value={searchQuery}
                      onChange={handleSearchBarChange}
                      onClear={clearSearch}
                      placeholder={t.searchPlaceholder || "Type a university name, city, or favorite major..."}
                      t={t}
                    />

                    {/* Shortcuts list */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-widest">
                        {t.categoryShortcuts || 'University Categories:'}
                      </span>
                      {categories.map(c => (
                        <button
                          key={c.id}
                          onClick={() => handleCategoryShortcut(c.id)}
                          id={`shortcut-${c.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#F2F2F7] text-[#1C1C1E] rounded-2xl text-xs font-bold border border-[#E5E5EA] shadow-sm ios-active-scale ios-transition cursor-pointer"
                        >
                          <span>{c.emoji}</span>
                          <span>{c.label}</span>
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          setViewState('rankings');
                          setAdminUniSearchQuery(''); // clear filter state
                        }}
                        id="shortcut-qs-rankings"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-[#B8860B] rounded-2xl text-xs font-black border border-amber-500/30 shadow-sm ios-active-scale ios-transition cursor-pointer"
                      >
                        <span>🏆</span>
                        <span>QS World Top 100</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : viewState === 'rankings' ? (
                /* ==================== QS WORLD TOP 100 RANKINGS ==================== */
                <div className="space-y-6">
                  {/* Breadcrumb Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D1D1D6] pb-4 gap-3 animate-fade-in text-black">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={navigateToHome}
                        className="p-2 bg-white hover:bg-[#F2F2F7] border border-[#E5E5EA] text-[#3A3A3C] hover:text-[#1C1C1E] rounded-xl shadow-xs ios-transition cursor-pointer"
                        title="Go back home"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="ml-1">
                        <h2 className="text-xl font-black text-[#1C1C1E] tracking-tight leading-tight flex items-center gap-2">
                          <span>QS World University Rankings</span>
                          <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold">Top 100</span>
                        </h2>
                        <p className="text-[10px] text-[#8E8E93] font-bold uppercase tracking-widest mt-0.5">
                          Personalized eligibility scores based on your active academic profile
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="text-xs font-bold text-[#3A3A3C] hover:text-[#007AFF] bg-white hover:bg-[#F2F2F7] border border-[#E5E5EA] px-3.5 py-2.5 rounded-xl shadow-xs self-start sm:self-auto flex items-center gap-1.5 cursor-pointer ios-active-scale transition-all"
                      title="Click to edit school stats"
                    >
                      <Sparkles className="w-4 h-4 text-[#007AFF] animate-pulse" />
                      <span>{t.navAcademicProfile || 'Academic Settings'}: {profileStateSummary}</span>
                    </button>
                  </div>

                  {/* Intro Info Alert */}
                  <div className="p-4.5 bg-blue-50/50 border border-blue-100 rounded-[20px] shadow-xs flex items-start gap-3.5 text-xs sm:text-sm font-medium text-slate-800 animate-fade-in relative overflow-hidden">
                    <div className="p-2 bg-blue-100 text-[#007AFF] rounded-xl shrink-0">
                      <Info className="w-4.5 h-4.5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Dynamic Eligibility Engine active</h4>
                      <p className="text-gray-600 leading-relaxed text-xs sm:text-sm font-semibold">
                        This view maps official criteria for the world's finest universities in real-time. Standard high-competition baseline requirements is evaluated against your customized parameters listed at the top.
                      </p>
                    </div>
                  </div>

                  {/* Filter Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in">
                    <div className="md:col-span-2 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={adminUniSearchQuery}
                        onChange={(e) => setAdminUniSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-[#E5E5EA] focus:border-[#007AFF] rounded-2xl text-xs sm:text-sm font-semibold outline-hidden shadow-xs text-black"
                        placeholder="Search top 100 by name, city, or country..."
                      />
                    </div>

                    <div className="relative col-span-1">
                      <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                        className="w-full px-4 py-3 bg-white border border-[#E5E5EA] focus:border-[#007AFF] rounded-2xl text-xs sm:text-sm font-semibold outline-hidden shadow-xs text-black cursor-pointer appearance-none"
                      >
                        <option value="">All Regions</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Europe">Europe Only</option>
                        <option value="Asia">Asia Only</option>
                        <option value="Australia">Global Top Tier Countries</option>
                      </select>
                      <div className="absolute right-4 top-1/3 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500 w-0 h-0 pointer-events-none" />
                    </div>
                  </div>

                  {/* Rankings Table / Cards Layout */}
                  <div className="space-y-3.5 animate-fade-in text-black">
                    {TOP_100_RANKINGS
                      .filter((item) => {
                        const qTerms = expandSearchQuery(adminUniSearchQuery);
                        const matchText = qTerms.length === 0 ? true : qTerms.some(term =>
                          item.name.toLowerCase().includes(term) ||
                          item.city.toLowerCase().includes(term) ||
                          item.country.toLowerCase().includes(term)
                        );
                        
                        if (!selectedCategory) return matchText;
                        if (selectedCategory === 'USA') return matchText && item.country === 'USA';
                        if (selectedCategory === 'UK') return matchText && item.country === 'UK';
                        if (selectedCategory === 'Europe') return matchText && (item.country === 'Germany' || item.country === 'Switzerland' || item.country === 'Italy' || item.country === 'France');
                        if (selectedCategory === 'Asia') return matchText && (item.country === 'Singapore' || item.country === 'China' || item.country === 'South Korea' || item.country === 'Hong Kong' || item.country === 'Japan');
                        if (selectedCategory === 'Australia') return matchText && (item.country === 'Australia' || item.country === 'Canada');
                        return matchText;
                      })
                      .map((item) => {
                        // Resolve domain & default values
                        const cleanCountry = item.country.trim().toUpperCase();
                        const isUKorGerorIt = cleanCountry === 'UK' || cleanCountry === 'GERMANY' || cleanCountry === 'ITALY';
                        
                        const tempUni: University = {
                          id: `ranked-${item.rank}`,
                          name: item.name,
                          country: item.country,
                          city: item.city,
                          description: `QS Top 100 World University Rank #${item.rank}. Located in ${item.city}, ${item.country}. Renowned worldwide for advanced educational curriculum, pioneering academic output and career-launching pathways for ambitious international candidates.`,
                          website: item.website,
                          ieltsRequirement: item.rank <= 10 ? 7.5 : item.rank <= 50 ? 7.0 : 6.5,
                          gpaRequirement: item.rank <= 10 ? 3.8 : item.rank <= 50 ? 3.5 : 3.0,
                          satRequirement: item.rank <= 25 ? 1450 : item.rank <= 60 ? 1350 : null,
                          acceptanceRate: item.acceptanceRate,
                          tuition: item.country === 'Germany' || item.country === 'Switzerland' ? 'Free / Under €3,000' : '$18,000 - $62,000 / yr',
                          financialAid: 'Full Ivy Need-Blind or Regional Merit stipends available',
                          uzbekDiplomaStatus: isUKorGerorIt ? 'Conditional' : 'Accepted',
                          foundationRequired: isUKorGerorIt,
                          category: 'ivy_elite',
                          qsRanking: item.rank,
                          theRanking: item.rank,
                          popularMajors: ['Advanced Informatics', 'Quantum Chemistry', 'Aerospace Engineering', 'Global Economics'],
                          tips: [
                            'Prepare a stellar motivation letter explaining your academic goals and leadership potential.',
                            'Maintain a high GPA (above 90% or 4.5/5.0) on your Uzbek Lyceum/College/School transcripts.',
                            'Submit high-quality recommendations from mathematics and subject-related teachers.'
                          ],
                          applicationSteps: [
                            'Obtain score report on IELTS Academic (target overall score 7.0+).',
                            'Request certified English translations and apostilles for your graduation certificate (Shahodatnoma).',
                            'Create account on application platform (CommonApp, UCAS, or direct uni-assist portal) and finalize submission.'
                          ]
                        };

                        // Helper for Uzbek Diploma acceptability
                        const getUzbekDiplomaStatus = (country: string) => {
                          const c = country.trim().toUpperCase();
                          if (c === 'USA' || c === 'CANADA' || c === 'SINGAPORE') {
                            return {
                              label: 'Directly Accepted',
                              badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                              desc: 'Accepts standard secondary school diploma'
                            };
                          }
                          if (c === 'UK' || c === 'AUSTRALIA') {
                            return {
                              label: 'Requires Foundation',
                              badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
                              desc: 'Requires 1-year university prep pathway'
                            };
                          }
                          if (c === 'GERMANY') {
                            return {
                              label: 'Studienkolleg Required',
                              badgeBg: 'bg-yellow-50 text-yellow-800 border-yellow-200',
                              desc: 'Requires 1-year Studienkolleg prep course'
                            };
                          }
                          if (c === 'ITALY') {
                            return {
                              label: 'Accepted (with 12 years)',
                              badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
                              desc: 'Requires 12-year Lyceum/College diploma'
                            };
                          }
                          if (c === 'SWITZERLAND') {
                            return {
                              label: 'Entrance Exam Required',
                              badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
                              desc: 'Requires passing rigorous entrance exams'
                            };
                          }
                          return {
                            label: 'Conditional Review',
                            badgeBg: 'bg-gray-100 text-gray-700 border-gray-200',
                            desc: 'Evaluated individually on file review'
                          };
                        };

                        const dipStatus = getUzbekDiplomaStatus(item.country);

                        return (
                          <div 
                            key={item.rank} 
                            onClick={() => navigateToUniversity(tempUni.id)}
                            className="p-4 bg-white border border-[#E5E5EA] rounded-[24px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md hover:border-[#007AFF]/40 transition-all duration-200 cursor-pointer group"
                          >
                            <div className="flex items-center gap-4">
                              {/* Rank position badge */}
                              <div className={`w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center font-black text-sm shadow-xs ${
                                item.rank === 1 ? 'bg-amber-100 text-amber-800' :
                                item.rank === 2 ? 'bg-slate-100 text-slate-700' :
                                item.rank === 3 ? 'bg-orange-100 text-orange-800' :
                                'bg-[#F2F2F7] text-[#3A3A3C]'
                              }`}>
                                #{item.rank}
                              </div>

                              {/* Official real-world High-Quality University logo! */}
                              <UniversityLogo 
                                universityId={tempUni.id} 
                                website={tempUni.website} 
                                logo={tempUni.logo}
                                size="md" 
                                className="shadow-xs bg-[#F8F9FA] rounded-2xl border" 
                              />

                              <div className="space-y-1">
                                <h3 className="font-extrabold text-sm sm:text-base text-gray-950 leading-snug group-hover:text-[#007AFF] transition-colors">
                                  {item.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                                  <span>{item.city}, {item.country}</span>
                                  <span>•</span>
                                  <span className="text-gray-400">QS Score: {item.score.toFixed(1)}</span>
                                  <span>•</span>
                                  <span className="text-gray-400">Acceptance Rate: {item.acceptanceRate}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 self-end md:self-center ml-auto md:ml-0" onClick={(e) => e.stopPropagation()}>
                              <div className="text-right hidden sm:block">
                                <span className="block text-[9px] md:text-[10px] text-[#8E8E93] font-extrabold uppercase tracking-widest leading-none mb-1">
                                  Shahodatnoma
                                </span>
                                <span className="text-[11px] text-gray-400 font-bold">
                                  {dipStatus.desc}
                                </span>
                              </div>

                              {/* Distinctive, clean, high-contrast, professional acceptance badge */}
                              <div className={`px-3 py-1.5 rounded-xl text-xs font-black border uppercase tracking-wider ${dipStatus.badgeBg}`}>
                                {dipStatus.label}
                              </div>
                              
                              <a 
                                href={item.website}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 border border-[#E5E5EA] hover:bg-neutral-50 rounded-xl ios-transition cursor-pointer"
                                title="Visit official website"
                              >
                                <ExternalLink className="w-4 h-4 text-gray-500 hover:text-[#007AFF]" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                /* SEARCH RESULTS VIEW MODULE */
                <div className="space-y-6">
                  {/* Small Breadcrumb list */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D1D1D6] pb-4 gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={navigateToHome}
                        id="back-home-btn"
                        className="p-2 bg-white hover:bg-[#F2F2F7] border border-[#E5E5EA] text-[#3A3A3C] hover:text-[#1C1C1E] rounded-xl shadow-xs ios-transition cursor-pointer"
                        title="Go back home"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="ml-1">
                        <h2 className="text-lg font-bold text-[#1C1C1E] tracking-tight leading-tight">
                          {t.searchResults || 'Search Results'}
                        </h2>
                        <p className="text-[10px] text-[#8E8E93] font-bold uppercase tracking-widest mt-0.5">
                          {selectedCategory 
                            ? (categories.find(cat => cat.id === selectedCategory)?.label || selectedCategory) 
                            : (t.allCountries || 'All Categories')
                          }
                          {searchQuery && ` • "${searchQuery}"`}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-[#8E8E93] bg-white border border-[#E5E5EA] px-3 py-2 rounded-xl shadow-xs self-start sm:self-auto">
                      {t.showingPrograms 
                        ? t.showingPrograms.replace('{count}', processedUniversities.length.toString())
                        : `Showing ${processedUniversities.length} programs`
                      }
                    </div>
                  </div>

                  {/* Clean Filter Panel and Search Input (Search Header) */}
                  <div className="space-y-4">
                    <SearchBar
                      value={searchQuery}
                      onChange={handleSearchBarChange}
                      onClear={clearSearch}
                      placeholder={t.searchPlaceholder || "Search..."}
                      t={t}
                    />

                    {/* Category Filter Toggles */}
                    <div className="flex flex-wrap items-center gap-2 bg-[#E5E5EA]/50 p-1.5 rounded-2xl border border-[#D1D1D6]/40 text-xs w-full">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        id="filter-category-all"
                        className={`py-2 px-4 text-center font-bold rounded-xl ios-transition cursor-pointer ${
                          selectedCategory === null
                            ? 'bg-white shadow-sm text-[#1C1C1E]'
                            : 'text-[#3A3A3C] hover:text-[#1C1C1E]'
                        }`}
                      >
                        🌟 {t.cat_all || 'All'}
                      </button>
                      {categories.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCategory(c.id)}
                          id={`filter-category-${c.id}`}
                          className={`py-2 px-4 text-center font-bold rounded-xl ios-transition cursor-pointer ${
                            selectedCategory === c.id
                              ? 'bg-white shadow-sm text-[#1C1C1E]'
                              : 'text-[#3A3A3C] hover:text-[#1C1C1E]'
                          }`}
                        >
                          <span>{c.emoji} {c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Empty state rendering */}
                  {processedUniversities.length === 0 ? (
                    <div className="space-y-6">
                      <div className="text-center py-12 bg-white border border-[#E5E5EA] rounded-[20px] shadow-sm p-8 space-y-4">
                        <div className="w-12 h-12 bg-[#F2F2F7] text-[#8E8E93] rounded-2xl flex items-center justify-center mx-auto">
                          <Info className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg text-[#1C1C1E]">
                            {t.noResults || 'No universities found'}
                          </h3>
                          <p className="text-sm text-[#8E8E93] max-w-sm mx-auto leading-relaxed">
                            {t.noResultsDesc || "We couldn't find matches. Try clearing some search letters or adjust filters."}
                          </p>
                        </div>
                        
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                          <button
                            onClick={clearSearch}
                            id="clear-results-btn"
                            className="px-5 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm ios-active-scale ios-transition cursor-pointer"
                          >
                            {t.resetSearch || 'Reset Search Filters'}
                          </button>

                          <button
                            onClick={handleAiSearch}
                            disabled={isAiSearching}
                            className="px-5 py-2.5 bg-[#007AFF] hover:bg-[#0062CC] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm ios-active-scale ios-transition cursor-pointer disabled:opacity-50"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            {isAiSearching ? 'AI is researching...' : `Let AI Research "${searchQuery}"`}
                          </button>
                        </div>
                      </div>

                      {/* AI Search Loading Indicator */}
                      {isAiSearching && (
                        <div className="p-8 bg-white border border-[#E5E5EA] rounded-[20px] shadow-sm text-center space-y-3 animate-fade-in">
                          <div className="w-8 h-8 border-4 border-[#007AFF] border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-sm font-bold text-[#1C1C1E]">Our AI Coordinator is querying global educational databases...</p>
                          <p className="text-xs text-[#8E8E93]">Fulfilling structured admission criteria on standard IELTS, SAT, GPAs, and Uzbek credential compatibility.</p>
                        </div>
                      )}

                      {/* AI Search Results visualization */}
                      {aiSearchResult && (
                        <div className="animate-fade-in">
                          {aiSearchResult.isReal && aiSearchResult.university ? (
                            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-[20px] shadow-sm space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                                  <Check className="w-3.5 h-3.5" />
                                  Real Institution Extracted
                                </span>
                                <span className="text-xs font-bold text-emerald-700">Sent to Administration Desk for Verification</span>
                              </div>
                              <div className="space-y-1">
                                <h3 className="text-xl font-black text-neutral-900 leading-tight">{aiSearchResult.university.name}</h3>
                                <p className="text-xs text-[#8E8E93] font-bold uppercase tracking-wider">{aiSearchResult.university.city}, {aiSearchResult.university.country}</p>
                              </div>
                              <p className="text-sm text-[#3A3A3C] leading-relaxed font-semibold">
                                {aiSearchResult.university.description}
                              </p>
                              <div className="pt-2 flex items-center gap-4">
                                <button
                                  onClick={() => navigateToUniversity(aiSearchResult.university!.id)}
                                  className="px-4 py-2 bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-bold rounded-xl ios-transition cursor-pointer"
                                >
                                  Analyze Admissions & Requirements Booklet
                                </button>
                                <a
                                  href={aiSearchResult.university.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-bold text-[#007AFF] hover:underline"
                                >
                                  Visit Website
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="p-6 bg-rose-50 border border-rose-200 rounded-[20px] shadow-sm flex items-start gap-4">
                              <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl flex-shrink-0">
                                <Info className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-extrabold text-base text-rose-900">Research Outcome: N/A</h4>
                                <p className="text-sm text-rose-700 font-semibold leading-relaxed">
                                  {aiSearchResult.message || "We successfully completed an internet audit but found no authentic accredited institution matching your spelling. Please revise the search terms."}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Search results listings */
                    <div className="space-y-4">
                      {processedUniversities.map(uni => (
                        <UniversityCard
                          key={uni.id}
                          university={uni}
                          studentProfile={studentProfile}
                          onViewDetails={navigateToUniversity}
                          t={t}
                          language={language}
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
                  onClick={() => navigateToUniversity(null)}
                  id="back-to-results-btn"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E5EA] hover:bg-[#F2F2F7] text-[#1C1C1E] rounded-xl text-xs font-bold shadow-sm ios-transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#007AFF]" />
                  <span>{t.backToUniversities || 'Back to Universities'}</span>
                </button>
 
                 <a
                   href={activeUniversity?.website}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007AFF] hover:underline"
                 >
                   <span>{t.officialWebsite || 'Official Website'}</span>
                   <ExternalLink className="w-3.5 h-3.5" />
                 </a>
               </div>
 
               {/* UNIVERSITY BASIC TITLING & OVERVIEW */}
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#D1D1D6] pb-6">
                 <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                   {activeUniversity && (
                     <UniversityLogo
                       universityId={activeUniversity.id} logo={activeUniversity.logo}
                       website={activeUniversity?.website}
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
                     {t.acceptanceRate || 'Acceptance Rate'}
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
                       {t.admissionsVerdict || 'Admissions Verdict'}
                     </span>
                     <div className="space-y-2">
                       <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight text-[#1C1C1E]">
                         {activeEligibility.status === 'Eligible'
                           ? (t.eligibleHeader || 'You are eligible to apply!')
                           : activeEligibility.status === 'Conditional'
                           ? (t.conditionalHeader || 'Conditional admission')
                           : (t.notEligibleHeader || 'Not eligible based on current stats')}
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
                     <StatusBadge
                       status={activeEligibility.status}
                       size="lg"
                       customLabel={
                         activeEligibility.status === 'Eligible'
                           ? t.eligibleHeader
                           : activeEligibility.status === 'Conditional'
                           ? t.conditionalHeader
                           : t.notEligibleHeader
                       }
                     />
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
                     {t.popularMajorsHeader || 'Most Popular Majors:'}
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
                   {t.requirementsHeader || 'Academic Requirements & Fees'}
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                   <InfoCard
                     title={t.ieltsTarget || "Required English Standard"}
                     value={`IELTS ${activeUniversity?.ieltsRequirement}+`}
                     icon={BookOpen}
                     subtext={t.ieltsExplain || "Overall band score average"}
                     highlighted={studentProfile.ielts >= (activeUniversity?.ieltsRequirement || 0)}
                   />
                   <InfoCard
                     title={t.satTarget || "SAT Standard Core"}
                     value={activeUniversity?.satRequirement ? `${activeUniversity?.satRequirement}+ ${t.pts || 'pts'}` : t.noSat || 'Not Required'}
                     icon={FileText}
                     subtext={activeUniversity?.satRequirement ? (t.satTaken || "Test optional but favored") : (t.noSat || "Test is not demanded")}
                     highlighted={
                       activeUniversity?.satRequirement === null ||
                       (studentProfile.sat !== null && studentProfile.sat >= (activeUniversity?.satRequirement || 0))
                     }
                   />
                   <InfoCard
                     title={t.gpaTarget || "GPA Target Competitiveness"}
                     value={`${activeUniversity?.gpaRequirement.toFixed(1)} / 4.0`}
                     icon={Percent}
                     subtext={t.usScale || "Equivalent of standard US Scale equivalent"}
                     highlighted={studentProfile.gpa >= (activeUniversity?.gpaRequirement || 0)}
                   />
                   <InfoCard
                     title={t.tuitionHeader || "Annual Tuition Fee"}
                     value={activeUniversity?.tuition || 'Unspecified'}
                     icon={DollarSign}
                     subtext={t.officialWebsite ? '' : "Excludes living costs"}
                   />
                   <InfoCard
                     title={t.financialAidHeader || "Financial Aid"}
                     value={activeUniversity?.financialAid || 'None'}
                     icon={Briefcase}
                     subtext={t.officialWebsite ? '' : "Opportunities for Uzbek students"}
                   />
                 </div>
               </div>
 
               {/* GRID: SECTION 3 (UZBEK STUDENT SPECIFICS) & SECTION 5 (TIPS ACCORDION) */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* SECTION 3: Uzbek Student Info */}
                 <div className="bg-white border border-[#E5E5EA] rounded-[20px] p-6 shadow-sm flex flex-col justify-between space-y-4">
                   <div className="space-y-3">
                     <h3 className="text-lg font-bold text-[#1C1C1E] tracking-tight">
                       {t.diplomaLegalityHeader || 'Uzbek Diploma Legality'}
                     </h3>
                     <p className="text-xs text-[#8E8E93] leading-relaxed font-semibold">
                       {t.evaluationDesc
                         ? t.evaluationDesc.replace('{country}', activeUniversity?.country || '')
                         : `Information regarding how the Ministry of Education in ${activeUniversity?.country} evaluates diplomas.`
                       }
                     </p>
                   </div>
 
                   <div className="space-y-4 pt-2">
                     {/* Item 1: Diploma Acceptability status */}
                     <div className="flex items-start gap-3.5">
                       <div className="p-2 rounded-xl bg-blue-50 text-[#007AFF] flex-shrink-0">
                         <Award className="w-4 h-4" />
                       </div>
                       <div>
                         <span className="block text-[9px] font-bold text-[#8E8E93] uppercase tracking-widest leading-none mb-1">
                           {t.acceptanceStatus || 'Acceptance Status'}
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
                           {t.foundationRequired || 'Foundation Year Required?'}
                         </span>
                         <span className="text-sm font-bold text-[#1C1C1E]">
                           {activeUniversity?.foundationRequired
                              ? (t.foundationYes || 'Yes — Compulsory preparatory program required')
                              : (t.foundationNo || 'No — Direct entry is fully available')}
                         </span>
                       </div>
                     </div>
                   </div>
                 </div>
 
                 {/* SECTION 5: Tips (3-5 short bullets max) */}
                 <div className="bg-white border border-[#E5E5EA] rounded-[20px] p-6 shadow-sm space-y-4">
                   <h3 className="text-lg font-bold text-[#1C1C1E] tracking-tight">
                     {t.insiderTips || 'Insider Tips for Uzbeks'}
                   </h3>
                   
                   <div className="space-y-3.5">
                     {activeUniversity?.tips.map((tip, index) => (
                       <div key={index} className="flex gap-3 items-start text-sm">
                         <div className="w-5 h-5 rounded-full bg-blue-50 text-[#007AFF] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 animate-pulse">
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
               <div className="bg-[#1C1C1E] text-white rounded-[20px] p-6 md:p-8 space-y-6 shadow-lg animate-fade-in">
                 <div className="space-y-1.5">
                   <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 rounded-lg text-[10px] font-bold tracking-wider uppercase text-blue-400 border border-white/5">
                     {t.interactiveRoadmaps || 'Interactive Roadmaps'}
                   </span>
                   <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">
                     {t.customRoadmap || 'Custom Application Roadmap'}
                   </h3>
                   <p className="text-xs text-gray-400 font-semibold max-w-xl leading-relaxed">
                     {t.checklistSubtitle || 'Tailored to your current credentials. Complete steps to build a premium international admissions portfolio:'}
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
             {t.developedBy || "UniPath Uzbekistan — Decision-Making Tool"}
           </p>
           <p className="font-medium text-[11px] text-[#8E8E93]">
             {t.footerSlogan || "Designed strictly to help Uzbek students make instant premium educational decisions. No clutter."}
           </p>
           <div className="pt-2 flex items-center justify-center gap-3">
             <span className="font-semibold text-[#8E8E93]">© 2026 UniPath</span>
             <span className="text-gray-200">|</span>
             <button onClick={navigateToAdmin} className="inline-flex items-center gap-1 font-bold text-[#8E8E93] hover:text-[#007AFF] cursor-pointer bg-transparent border-0"><Lock className="w-3.5 h-3.5" /><span>Admin Panel</span></button>
             <span className="text-gray-200">|</span>
             <a
               href="https://t.me/unipath_uz"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 font-bold text-[#007AFF] hover:underline cursor-pointer"
             >
               <Send className="w-3.5 h-3.5 text-[#007AFF]" />
               <span>{t.telegramButtonText || 'Join @unipath_uz'}</span>
             </a>
           </div>
         </div>
       </footer>
     </div>
   );
 }
