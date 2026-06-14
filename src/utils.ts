/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudentProfile, University, EligibilityResult, EligibilityStatus } from './types';

/**
 * Normalizes user's GPA score to a standard 4.0 scale
 */
export function normalizeGpa(rawGpa: number, scale: 4 | 5 | 100): number {
  if (scale === 4) {
    return Math.min(4.0, Math.max(0, rawGpa));
  }
  if (scale === 5) {
    // Standard European/Uzbek 5-point scale
    // 5.0 -> 4.0
    // 4.0 -> 3.0
    // 3.0 -> 2.0
    // Below 3 is fail
    const percent = rawGpa / 5;
    return Math.min(4.0, Math.max(0, percent * 4));
  }
  if (scale === 100) {
    return Math.min(4.0, Math.max(0, (rawGpa / 100) * 4));
  }
  return rawGpa;
}

/**
 * Evaluates the student's eligibility for a specific university dynamically
 */
export function evaluateEligibility(profile: StudentProfile, university: University): EligibilityResult {
  const reasons: string[] = [];
  const warnings: string[] = [];
  let isNotEligible = false;
  let isConditional = false;

  // 1. IELTS Evaluation
  if (profile.ielts < university.ieltsRequirement) {
    const diff = university.ieltsRequirement - profile.ielts;
    if (diff > 1.0) {
      isNotEligible = true;
      reasons.push(`IELTS score (${profile.ielts}) is significantly below the minimum required (${university.ieltsRequirement}).`);
    } else {
      isConditional = true;
      reasons.push(`IELTS score (${profile.ielts}) is close but below requirement (${university.ieltsRequirement}). May require an intensive ESL/Pathway program.`);
    }
  }

  // 2. SAT Evaluation (if required or recommended)
  if (university.satRequirement !== null) {
    if (profile.sat === null) {
      // If SAT is required
      if (university.country === 'USA' && university.id === 'usf-us') {
        // Florida public uni requires SAT strictly
        isNotEligible = true;
        reasons.push(`Florida state law requires an SAT or ACT score for USF. You have not provided any SAT score.`);
      } else {
        isConditional = true;
        warnings.push(`The typical competitive SAT score here is ${university.satRequirement}. You have not provided an SAT score, but exceptions/test-optional may apply.`);
      }
    } else if (profile.sat < university.satRequirement) {
      const diff = university.satRequirement - profile.sat;
      if (diff > 150) {
        isConditional = true;
        warnings.push(`Your SAT score (${profile.sat}) is lower than the typical ${university.satRequirement} target score.`);
      } else {
        warnings.push(`Your SAT score (${profile.sat}) is highly competitive (target: ${university.satRequirement}).`);
      }
    }
  }

  // 3. GPA checking
  if (profile.gpa < university.gpaRequirement) {
    const diff = university.gpaRequirement - profile.gpa;
    if (diff > 0.6) {
      isConditional = true;
      reasons.push(`Your GPA (${profile.originalGpa}/${profile.gpaScale}) is considerably lower than the competitive average (${university.gpaRequirement} on a 4.0 scale).`);
    } else {
      warnings.push(`Your GPA (${profile.originalGpa}/${profile.gpaScale}) is slightly below the school average.`);
    }
  }

  // 4. Uzbek Diploma & Foundation Year Evaluation
  if (profile.diplomaType === 'ib_ap') {
    // Ivy league or direct entry usually handles IB/AP perfectly
    if (university.foundationRequired) {
      warnings.push('Your IB / AP diploma likely waives the Foundation year requirement at this university!');
    }
  } else {
    // Normal Uzbek High-School (11 years) or Lyceum/College (12 years)
    if (university.uzbekDiplomaStatus === 'Conditional' || university.foundationRequired) {
      isConditional = true;
      
      if (profile.diplomaType === 'school') {
        reasons.push(`An 11-year Uzbek school diploma requires a 1-year Foundation course (or Studienkolleg) in ${university.country} because it requires 12 total years of pre-university learning.`);
      } else if (profile.diplomaType === 'lyceum' || profile.diplomaType === 'college') {
        // Some EU countries accept lyceum diplomas because it represents 12 years
        if (university.country === 'Italy') {
          warnings.push('Your 12-year Academic Lyceum or Vocational College diploma is highly favorable for Italy and might reduce translation/Foundation burdens!');
        } else if (university.country === 'Germany') {
          reasons.push(`Even with a 12-year Lyceum/College diploma, Germany still requires completing a Studienkolleg or passing the Feststellungsprüfung.`);
        } else {
          reasons.push(`A 1-year Foundation Year is required to align your standard credentials with ${university.country}'s domestic high school structure.`);
        }
      }
    } else if (university.uzbekDiplomaStatus === 'Not accepted') {
      isNotEligible = true;
      reasons.push(`Regular Uzbek diplomas are not directly supported here. Alternate curriculum or high school transfer is required.`);
    }
  }

  // Final Decision Status
  let status: EligibilityStatus = 'Eligible';
  if (isNotEligible) {
    status = 'Not eligible';
  } else if (isConditional) {
    status = 'Conditional';
  }

  // Make sure to add default explanations if nothing was flagged
  if (reasons.length === 0) {
    reasons.push('Excellent! Your academic profile meets and exceeds all typical entry criteria for direct application.');
  }

  return {
    status,
    reasons,
    warnings
  };
}

/**
 * Filter universities based on search term and country shortcuts
 */
export function filterUniversities(
  list: University[],
  searchQuery: string,
  selectedCountry: string | null
): University[] {
  let filtered = list;

  if (selectedCountry) {
    filtered = filtered.filter(u => u.country.toLowerCase() === selectedCountry.toLowerCase());
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(u => 
      u.name.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      u.country.toLowerCase().includes(q) ||
      u.popularMajors.some(m => m.toLowerCase().includes(q))
    );
  }

  return filtered;
}
