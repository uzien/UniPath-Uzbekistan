/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudentProfile, University, EligibilityResult, EligibilityStatus } from './types';
import { Language } from './translations';

/**
 * Normalizes user's GPA score to a standard 4.0 scale
 */
export function normalizeGpa(rawGpa: number, scale: 4 | 5 | 100): number {
  if (scale === 4) {
    return Math.min(4.0, Math.max(0, rawGpa));
  }
  if (scale === 5) {
    const percent = rawGpa / 5;
    return Math.min(4.0, Math.max(0, percent * 4));
  }
  if (scale === 100) {
    return Math.min(4.0, Math.max(0, (rawGpa / 100) * 4));
  }
  return rawGpa;
}

const ELIGIBILITY_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    ielts_very_low: "IELTS score ({score}) is significantly below the minimum required ({req}).",
    ielts_conditional: "IELTS score ({score}) is close but below requirement ({req}). May require an intensive ESL/Pathway program.",
    sat_required_florida: "Florida state law requires an SAT or ACT score for USF. You have not provided any SAT score.",
    sat_not_provided_warning: "The typical competitive SAT score here is {req}. You have not provided an SAT score, but exceptions/test-optional may apply.",
    sat_below_warning: "Your SAT score ({score}) is lower than the typical {req} target score.",
    sat_competitive_warning: "Your SAT score ({score}) is highly competitive (target: {req}).",
    gpa_low_warning: "Your GPA ({rawGpa}/{scale}) is considerably lower than the competitive average ({req} on a 4.0 scale).",
    gpa_slightly_low_warning: "Your GPA ({rawGpa}/{scale}) is slightly below the school average.",
    ib_ap_foundation_waive: "Your IB / AP diploma likely waives the Foundation year requirement at this university!",
    uzbek_school_foundation: "An 11-year Uzbek school diploma requires a 1-year Foundation course (or Studienkolleg) in {country} because it requires 12 total years of pre-university learning.",
    lyceum_italy_favorable: "Your 12-year Academic Lyceum or Vocational College diploma is highly favorable for Italy and might reduce translation/Foundation burdens!",
    lyceum_germany_studienkolleg: "Even with a 12-year Lyceum/College diploma, Germany still requires completing a Studienkolleg or passing the Feststellungsprüfung.",
    general_foundation_required: "A 1-year Foundation Year is required to align your standard credentials with {country}'s domestic high school structure.",
    uzbek_diploma_not_accepted: "Regular Uzbek diplomas are not directly supported here. Alternate curriculum or high school transfer is required.",
    excellent_direct_admissions: "Excellent! Your academic profile meets and exceeds all typical entry criteria for direct application."
  },
  uz: {
    ielts_very_low: "IELTS bali ({score}) talab qilingan eng kam balldan ({req}) sezilarli darajada past.",
    ielts_conditional: "IELTS bali ({score}) talabga yaqin ({req}), lekin biroz past. Qo'shimcha intensiv til kursi (Pathway) talab etilishi mumkin.",
    sat_required_florida: "Florida shtati qonunlariga ko'ra, USF uchun SAT yoki ACT balli majburiy. Siz SAT balingizni kiritmadingiz.",
    sat_not_provided_warning: "Odatda bu yerda raqobatbardosh SAT balli kamida {req}. Siz SAT ballini kiritmadingiz, lekin istisno (test-optional) imkoniyatlari mavjud bo'lishi mumkin.",
    sat_below_warning: "Sizning SAT balingiz ({score}) odatdagi o'rtacha {req} balidan pastroq.",
    sat_competitive_warning: "Sizning SAT balingiz ({score}) juda yuqori va raqobatbardosh (maqsadli: {req}).",
    gpa_low_warning: "Sizning GPA bahongiz ({rawGpa}/{scale}) odatdagi o'rtacha ko'rsatkichdan ({req} - 4.0 shkala bo'yicha) sezilarli darajada past.",
    gpa_slightly_low_warning: "Sizning GPA bahongiz ({rawGpa}/{scale}) universitet o'rtacha talabidan biroz pastroq.",
    ib_ap_foundation_waive: "Sizning IB / AP diplomingiz ushbu universitetda tayyorlov (Foundation) yilidan ozod qilish ehtimoli yuqori!",
    uzbek_school_foundation: "11 yillik maktab diplomi bilan {country}da o'qish uchun 1 yillik Foundation (yoki Studienkolleg) tayyorlov kursini o'tishingiz shart, chunki u yerda jami 12 yillik ta'lim talab etiladi.",
    lyceum_italy_favorable: "Sizning 12 yillik Litsey yoki Kollej diplomingiz Italiya uchun juda mos keladi va tayyorlov yili muammolarini kamaytirishi mumkin!",
    lyceum_germany_studienkolleg: "Hatto 12 yillik Litsey/Kollej diplomi bo'lsa ham, Germaniya baribir Studienkolleg tayyorlov kursida o'qishni yoki maxsus imtihon (Feststellungsprüfung) topshirishni talab etadi.",
    general_foundation_required: "Hujjatlaringizni {country} o'rta ta'lim tizimiga moslashtirish uchun majburiy 1 yillik Foundation tayyorlov yili kutilmoqda.",
    uzbek_diploma_not_accepted: "Standart o'zbek diplomlari ushbu muassasada va mamlakatda bevosita qabul qilinmaydi. Xalqaro dastur yoki transfer talab qilinadi.",
    excellent_direct_admissions: "Ajoyib! Sizning akademik ko'rsatkichlaringiz barcha odatdagi kirish mezonlariga to'liq javob beradi va bevosita hujjat topshira olasiz."
  },
  ru: {
    ielts_very_low: "Балл IELTS ({score}) значительно ниже минимально требуемого ({req}).",
    ielts_conditional: "Балл IELTS ({score}) близок к требуемому ({req}), но все же ниже. Может потребоваться интенсивный курс английского языка (Pathway).",
    sat_required_florida: "Закон штата Флорида строго требует сдачу SAT или ACT для поступающих в USF. Вы не указали балл SAT.",
    sat_not_provided_warning: "Типичный конкурентный балл SAT здесь составляет {req}. Вы не указали балл SAT, но могут действовать исключения (test-optional).",
    sat_below_warning: "Ваш балл SAT ({score}) ниже типичного целевого показателя в {req} баллов.",
    sat_competitive_warning: "Ваш балл SAT ({score}) очень конкурентоспособен (цель: {req}).",
    gpa_low_warning: "Ваш средний балл GPA ({rawGpa}/{scale}) значительно ниже конкурентного уровня ({req} по шкале 4.0).",
    gpa_slightly_low_warning: "Ваш балл GPA ({rawGpa}/{scale}) немного ниже среднего уровня университета.",
    ib_ap_foundation_waive: "Ваш международный диплом IB / AP, скорее всего, освобождает вас от прохождения подготовительного года Foundation!",
    uzbek_school_foundation: "11-летний узбекский школьный аттестат требует прохождения 1-летнего подготовительного курса Foundation (или Studienkolleg) в {country}, так как для поступления необходимо иметь 12 лет довузовского образования.",
    lyceum_italy_favorable: "Ваш 12-летний диплом Лицея или Колледжа очень выгоден для Италии и может избавить вас от необходимости проходить дополнительный год Foundation!",
    lyceum_germany_studienkolleg: "Даже при наличии 12-летнего диплома лицея/колледжа, Германия все равно требует прохождения Studienkolleg или сдачи специального экзамена Feststellungsprüfung.",
    general_foundation_required: "Для соответствия вашей квалификации образовательным стандартам {country} необходим 1-летний подготовительный курс Foundation.",
    uzbek_diploma_not_accepted: "Обычные узбекские дипломы напрямую здесь не принимаются. Требуется обучение по международной программе или академический перевод.",
    excellent_direct_admissions: "Отлично! Ваш академический профиль полностью соответствует всем типичным критериям для прямой подачи документов."
  },
  de: {
    ielts_very_low: "Die IELTS-Punktzahl ({score}) liegt deutlich unter dem erforderlichen Minimum ({req}).",
    ielts_conditional: "Die IELTS-Punktzahl ({score}) liegt knapp unter der Anforderung ({req}). Möglicherweise ist ein intensiver Sprachvorbereitungskurs (Pathway) nötig.",
    sat_required_florida: "Das Gesetz des Bundesstaates Florida schreibt für die USF zwingend ein SAT- oder ACT-Ergebnis vor. Sie haben kein SAT-Ergebnis angegeben.",
    sat_not_provided_warning: "Der typische wettbewerbsfähige SAT-Score hier beträgt {req}. Sie haben keinen SAT-Score angegeben, aber Ausnahmen oder Test-Optional-Regelungen können gelten.",
    sat_below_warning: "Ihr SAT-Score ({score}) ist niedriger als der typische Zielwert von {req} Punkten.",
    sat_competitive_warning: "Ihr SAT-Score ({score}) ist äußerst wettbewerbsfähig (Ziel: {req}).",
    gpa_low_warning: "Ihr Notenschnitt ({rawGpa}/{scale}) ist erheblich niedriger als der wettbewerbsfähige Durchschnitt ({req} auf einer 4.0-Skala).",
    gpa_slightly_low_warning: "Ihr GPA ({rawGpa}/{scale}) liegt leicht unter dem Durchschnitt der Universität.",
    ib_ap_foundation_waive: "Ihr IB / AP-Diplom befreit Sie an dieser Universität höchstwahrscheinlich vom Vorbereitungsjahr (Foundation)!",
    uzbek_school_foundation: "Ein 11-jähriges usbekisches Schuldiplom erfordert ein 1-jähriges Vorbereitungsjahr (oder Studienkolleg) in {country}, da insgesamt 12 Schuljahre bis zum Hochschulstudium vorausgesetzt werden.",
    lyceum_italy_favorable: "Ihr 12-jähriges Lyzeums- oder Berufskollegsdiplom ist für Italien sehr vorteilig und könnte zusätzliche Vorbereitungskurse (Foundation) überflüssig machen!",
    lyceum_germany_studienkolleg: "Selbst mit einem 12-jährigen Lyzeums-/Kollegsdiplom ist in Deutschland die Absolvierung eines Studienkollegs oder das Bestehen der Feststellungsprüfung erforderlich.",
    general_foundation_required: "Ein 1-jähriges Vorbereitungsjahr ist erforderlich, um Ihre Qualifikationen an das Schulsystem in {country} anzupassen.",
    uzbek_diploma_not_accepted: "Reguläre usbekische Abschlüsse werden hier nicht direkt akzeptiert. Ein alternativer internationaler Lehrplan oder ein Hochschulwechsel ist erforderlich.",
    excellent_direct_admissions: "Hervorragend! Ihr Notenprofil erfüllt und übertrifft alle typischen Zulassungskriterien für eine direkte Bewerbung."
  }
};

function getT(lang: Language, key: string, params: Record<string, string | number> = {}): string {
  const dictionary = ELIGIBILITY_TRANSLATIONS[lang] || ELIGIBILITY_TRANSLATIONS.en;
  let text = dictionary[key] || ELIGIBILITY_TRANSLATIONS.en[key] || key;
  Object.keys(params).forEach(p => {
    text = text.replace(`{${p}}`, String(params[p]));
  });
  return text;
}

/**
 * Evaluates the student's eligibility for a specific university dynamically with language translations
 */
export function evaluateEligibility(profile: StudentProfile, university: University, lang: Language): EligibilityResult {
  const reasons: string[] = [];
  const warnings: string[] = [];
  let isNotEligible = false;
  let isConditional = false;

  // 1. IELTS Evaluation
  if (profile.ielts < university.ieltsRequirement) {
    const diff = university.ieltsRequirement - profile.ielts;
    if (diff > 1.0) {
      isNotEligible = true;
      reasons.push(getT(lang, 'ielts_very_low', { score: profile.ielts, req: university.ieltsRequirement }));
    } else {
      isConditional = true;
      reasons.push(getT(lang, 'ielts_conditional', { score: profile.ielts, req: university.ieltsRequirement }));
    }
  }

  // 2. SAT Evaluation (if required or recommended)
  if (university.satRequirement !== null) {
    if (profile.sat === null) {
      if (university.country === 'USA' && university.id === 'usf-us') {
        isNotEligible = true;
        reasons.push(getT(lang, 'sat_required_florida'));
      } else {
        isConditional = true;
        warnings.push(getT(lang, 'sat_not_provided_warning', { req: university.satRequirement }));
      }
    } else if (profile.sat < university.satRequirement) {
      const diff = university.satRequirement - profile.sat;
      if (diff > 150) {
        isConditional = true;
        warnings.push(getT(lang, 'sat_below_warning', { score: profile.sat, req: university.satRequirement }));
      } else {
        warnings.push(getT(lang, 'sat_competitive_warning', { score: profile.sat, req: university.satRequirement }));
      }
    }
  }

  // 3. GPA checking
  if (profile.gpa < university.gpaRequirement) {
    const diff = university.gpaRequirement - profile.gpa;
    if (diff > 0.6) {
      isConditional = true;
      reasons.push(getT(lang, 'gpa_low_warning', {
        rawGpa: profile.originalGpa,
        scale: profile.gpaScale,
        req: university.gpaRequirement
      }));
    } else {
      warnings.push(getT(lang, 'gpa_slightly_low_warning', {
        rawGpa: profile.originalGpa,
        scale: profile.gpaScale
      }));
    }
  }

  // 4. Uzbek Diploma & Foundation Year Evaluation
  if (profile.diplomaType === 'ib_ap') {
    if (university.foundationRequired) {
      warnings.push(getT(lang, 'ib_ap_foundation_waive'));
    }
  } else {
    if (university.uzbekDiplomaStatus === 'Conditional' || university.foundationRequired) {
      isConditional = true;
      
      if (profile.diplomaType === 'school') {
        reasons.push(getT(lang, 'uzbek_school_foundation', { country: university.country }));
      } else if (profile.diplomaType === 'lyceum' || profile.diplomaType === 'college') {
        if (university.country === 'Italy') {
          warnings.push(getT(lang, 'lyceum_italy_favorable'));
        } else if (university.country === 'Germany') {
          reasons.push(getT(lang, 'lyceum_germany_studienkolleg'));
        } else {
          reasons.push(getT(lang, 'general_foundation_required', { country: university.country }));
        }
      }
    } else if (university.uzbekDiplomaStatus === 'Not accepted') {
      isNotEligible = true;
      reasons.push(getT(lang, 'uzbek_diploma_not_accepted'));
    }
  }

  // Final Decision Status
  let status: EligibilityStatus = 'Eligible';
  if (isNotEligible) {
    status = 'Not eligible';
  } else if (isConditional) {
    status = 'Conditional';
  }

  // Add default explanation if clean profile
  if (reasons.length === 0) {
    reasons.push(getT(lang, 'excellent_direct_admissions'));
  }

  return {
    status,
    reasons,
    warnings
  };
}

/**
 * Resolves synonyms, nicknames, abbreviations and transliterations (e.g. Uz <=> En) robustly.
 */
export function expandSearchQuery(query: string): string[] {
  const norm = query.toLowerCase().trim().replace(/['`’]/g, '');
  if (!norm) return [];
  const terms = [norm];

  // Map of common names, nicknames, abbreviations and transliterations
  const synonyms: Record<string, string[]> = {
    'uchicago': ['university of chicago', 'chicago university', 'chicago'],
    'chicago': ['university of chicago', 'uchicago'],
    'harvard': ['garvard', 'harvard university', 'garvard universiteti'],
    'garvard': ['harvard', 'harvard university', 'garvard universiteti'],
    'oxford': ['oksford', 'university of oxford', 'oksford universiteti'],
    'oksford': ['oxford', 'university of oxford', 'oksford universiteti'],
    'cambridge': ['kembrij', 'university of cambridge', 'kembrij universiteti'],
    'kembrij': ['cambridge', 'university of cambridge', 'kembrij universiteti'],
    'stanford': ['stenford', 'stanford university', 'stenford universiteti'],
    'stenford': ['stanford', 'stanford university', 'stenford universiteti'],
    'mit': ['massachusetts institute of technology', 'massachusets texnologiya instituti'],
    'ucla': ['university of california, los angeles', 'ucla'],
    'ucb': ['university of california, berkeley', 'berkeley', 'uc berkeley'],
    'berkeley': ['ucb', 'uc berkeley'],
    'lse': ['london school of economics', 'londor iqtisodiyot maktabi'],
    'upenn': ['university of pennsylvania', 'penn', 'pennsylvania university'],
    'penn': ['university of pennsylvania', 'upenn'],
    'caltech': ['california institute of technology', 'kaliforniya texnologiya instituti'],
    'wiut': ['westminster international university in tashkent', 'vestminster', 'westminster', 'uwiut'],
    'vestminster': ['westminster', 'wiut', 'westminster international university in tashkent'],
    'tpu': ['turin polytechnic university in tashkent', 'tput', 'polito', 'turin', 'turin politexnika'],
    'tput': ['turin polytechnic university in tashkent', 'tpu', 'polito', 'turin'],
    'turin': ['tpu', 'tput', 'polito', 'turin polytechnic university in tashkent'],
    'tsul': ['tashkent state university of law', 'yuridik', 'tsul', 'toshkent davlat yuridik universiteti'],
    'yuridik': ['tsul', 'tashkent state university of law'],
    'yale': ['yel', 'yale university', 'yel universiteti'],
    'yel': ['yale', 'yale university'],
    'columbia': ['kolumbiya', 'columbia university', 'kolumbiya universiteti'],
    'kolumbiya': ['columbia', 'columbia university'],
    'nyu': ['new york university', 'nyu', 'nyu university'],
    'tum': ['technical university of munich', 'myunxen texnika universiteti', 'tum munich'],
    'lmu': ['ludwig maximilian university of munich', 'ludvig maksimilian', 'lmu munich'],
    'eth': ['eth zurich', 'ethz', 'swiss federal institute of technology', 'syurix', 'eth syurix'],
    'yonsei': ['yonsey', 'yonsei university', 'yonsey universiteti'],
    'kaist': ['koreya ilg\'or texnologiyalar instituti', 'kaist university', 'kays'],
    'nus': ['national university of singapore', 'singapur milliy universiteti', 'nus singapore'],
    'asu': ['arizona state university', 'arizona davlat universiteti', 'asu arizona'],
    'usf': ['university of south florida', 'janubiy florida universiteti', 'usf florida']
  };

  if (synonyms[norm]) {
    terms.push(...synonyms[norm]);
  }

  for (const [key, values] of Object.entries(synonyms)) {
    if (norm.length >= 3 && (key.includes(norm) || norm.includes(key))) {
      terms.push(key);
      terms.push(...values);
    }
  }

  return Array.from(new Set(terms));
}

/**
 * Filter universities based on search term and category shortcuts
 */
export function filterUniversities(
  list: University[],
  searchQuery: string,
  selectedCategory: string | null
): University[] {
  let filtered = list;

  if (selectedCategory && selectedCategory !== 'all') {
    filtered = filtered.filter(u => u.category === selectedCategory);
  }

  if (searchQuery.trim() !== '') {
    const qTerms = expandSearchQuery(searchQuery);
    filtered = filtered.filter(u => {
      const uName = u.name.toLowerCase();
      const uCity = u.city.toLowerCase();
      const uCountry = u.country.toLowerCase();
      const uDesc = u.description.toLowerCase();
      
      return qTerms.some(term => 
        uName.includes(term) ||
        uCity.includes(term) ||
        uCountry.includes(term) ||
        uDesc.includes(term) ||
        u.popularMajors.some(m => m.toLowerCase().includes(term))
      );
    });
  }

  return filtered;
}
