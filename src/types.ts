/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UzbekDiplomaStatus = 'Accepted' | 'Conditional' | 'Not accepted';

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  acceptanceRate: string;
  ieltsRequirement: number;
  satRequirement: number | null;
  gpaRequirement: number; // on a 4.0 scale
  tuition: string; // e.g., "$50,000/year" or "Free"
  financialAid: string; // e.g., "Need-blind", "Generous", "Merit-based", "None"
  uzbekDiplomaStatus: UzbekDiplomaStatus;
  foundationRequired: boolean;
  website: string;
  description: string;
  popularMajors: string[];
  tips: string[]; // max 3-5 bullets
  applicationSteps?: string[]; // Custom checklist overrides
}

export interface StudentProfile {
  ielts: number;
  sat: number | null;
  gpa: number; // Normalized to 4.0 scale
  originalGpa: number; // Raw user entry (e.g. 4.8)
  gpaScale: 4 | 5 | 100; // Original scale
  diplomaType: 'school' | 'lyceum' | 'college' | 'ib_ap';
}

export type EligibilityStatus = 'Eligible' | 'Conditional' | 'Not eligible';

export interface EligibilityResult {
  status: EligibilityStatus;
  reasons: string[];
  warnings: string[];
}
