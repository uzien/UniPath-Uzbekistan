/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { University } from './types';

export const UNIVERSITIES: University[] = [
  {
    id: 'wiut-uz',
    name: 'Westminster International University in Tashkent (WIUT)',
    country: 'Uzbekistan',
    city: 'Tashkent',
    acceptanceRate: '35%',
    ieltsRequirement: 5.5,
    satRequirement: null,
    gpaRequirement: 3.0, // 4.0 GPA equivalent (~3.7/5.0)
    tuition: '$3,200 / year',
    financialAid: 'Government & WIUT Scholarships (Covers 100% for top applicants)',
    uzbekDiplomaStatus: 'Accepted',
    foundationRequired: true, // WIUT has a compulsory CIFS (Certificate in International Foundation Studies) year
    website: 'https://www.wiut.uz',
    description: 'The first international university established in Tashkent, in partnership with the University of Westminster (UK). Highly respected locally for finance, business, and IT.',
    popularMajors: ['Business Management', 'Commercial Law', 'Finance', 'Business Information Systems'],
    tips: [
      'Apply early in March/April to secure a place on the free state-funded scholarship quota.',
      'Submit the IELTS certificate as soon as possible; a score of 6.0+ waives the Math exam requirement if applicable.',
      'Prepare for the internal WIUT Math Entry Exam if you do not have an SAT or recognized external math score.'
    ],
    applicationSteps: [
      'Register on the WIUT Admission Portal (admission.wiut.uz)',
      'Upload 11-year School, Lyceum, or College Diploma / Transcript',
      'Upload IELTS Certificate (5.5+ overall with 5.0+ in writing)',
      'Pass the internal WIUT Mathematics Entry Exam (or upload SAT with 550+ Math)',
      'Receive official admission offer and sign contract'
    ]
  },
  {
    id: 'sapienza-it',
    name: 'Sapienza University of Rome',
    country: 'Italy',
    city: 'Rome',
    acceptanceRate: '41%',
    ieltsRequirement: 6.0,
    satRequirement: null,
    gpaRequirement: 2.8,
    tuition: '€1,000 - €2,900 / year',
    financialAid: 'LazioDisco Regional Scholarship (Covers 100% tuition + €6,000/year stipend)',
    uzbekDiplomaStatus: 'Conditional',
    foundationRequired: true, // Uzbek standard school is 11 years, Italy strictly requires 12 years of education
    website: 'https://www.uniroma1.it',
    description: 'One of the oldest and largest universities in Europe, located in the heart of Rome. Known for providing excellent English-taught bachelors with very low tuition costs and rich regional scholarship programs.',
    popularMajors: ['Global Humanities', 'Applied Computer Science', 'Sustainable Building Engineering', 'Bioinformatics'],
    tips: [
      'Since Uzbek schools are 11 years, you MUST either: do a 1-year Foundation course, complete 1 year of university study in Uzbekistan, or hold a Lyceum/College 12-year diploma.',
      'Apply during the pre-selection window (typically November - February) to get an early reservation letter.',
      'Apply for the LazioDisco scholarship in July once you receive your pre-acceptance letter.'
    ],
    applicationSteps: [
      'Select your English-taught program on Sapienza Portal',
      'Submit academic transcripts and English proficiency (IELTS 6.0+)',
      'Pay the €30 application fee and submit pre-selection form',
      'Complete the mandatory CISIA online test (ENGLISH TOLC-E or TOLC-I) if requested',
      'After acceptance, complete the CIMEA or Universitaly pre-enrollment for visa'
    ]
  },
  {
    id: 'tum-de',
    name: 'Technical University of Munich (TUM)',
    country: 'Germany',
    city: 'Munich',
    acceptanceRate: '8%',
    ieltsRequirement: 6.5,
    satRequirement: null,
    gpaRequirement: 3.5,
    tuition: 'Free (Only €150/semester administrative contribution)',
    financialAid: 'DAAD Scholarships & Working Student Programs (German law allows students to work 140 full days/year)',
    uzbekDiplomaStatus: 'Conditional',
    foundationRequired: true, // Uzbek 11-year high school is not equivalent to the German Abitur (requires Studienkolleg)
    website: 'https://www.tum.de',
    description: 'Top-ranked technical university in Europe, famous for engineering, computer science, and entrepreneurship. Offers world-class education for virtually zero tuition fees.',
    popularMajors: ['Management and Technology', 'Aerospace Engineering', 'Mathematics', 'Informatics'],
    tips: [
      'Normal Uzbek high school graduates must attend a 1-year preparatory Studienkolleg in Germany before beginning college, or do 1-2 years of university classes in Uzbekistan.',
      'German language is not required for purely English-taught programs, but knowing basic German (A2/B1) is highly recommended for visas and student jobs.',
      'The German visa requires a Blocked Bank Account (Sperrkonto) of approximately €11,208 to prove you can support yourself.'
    ],
    applicationSteps: [
      'Check uni-assist compatibility for your Uzbek diploma',
      'Register on the TUMonline portal and upload required documents',
      'Provide IELTS academic 6.5+ (or TOEFL equivalent)',
      'Submit VPD (Vorprüfungsdokumentation) document issued by uni-assist',
      'Participate in the online interview or aptitude assessment if chosen by department'
    ]
  },
  {
    id: 'harvard-us',
    name: 'Harvard University',
    country: 'USA',
    city: 'Cambridge, MA',
    acceptanceRate: '3.4%',
    ieltsRequirement: 7.5,
    satRequirement: 1520, // High expectation, SAT test-optional but effectively critical for international
    gpaRequirement: 3.9,
    tuition: '$57,200 / year',
    financialAid: '100% Need-Blind (Harvard covers full cost if family income is under $85,000/year)',
    uzbekDiplomaStatus: 'Accepted',
    foundationRequired: false,
    website: 'https://www.harvard.edu',
    description: 'World-famous Ivy League institution. It is fully need-blind, meaning if an Uzbek student is accepted, Harvard pays for everything (tuition, housing, food, and flights) if family cannot afford it.',
    popularMajors: ['Computer Science', 'Economics', 'Government & International Relations', 'Molecular Biology'],
    tips: [
      'Focus intensely on extracurriculars or building real projects. Perfect grades + SAT scores are only the baseline.',
      'Apply Early Action by November 1st to double your chances of acceptance compared to Regular Decision.',
      'Reach out to Uzbek alumni currently studying at Ivy League schools for essay reviews.'
    ],
    applicationSteps: [
      'Complete the Common Application (CommonApp.org)',
      'Write the CommonApp Main Essay + short Harvard supplemental essays',
      'Submit Academic transcripts (Uzbek 11-year school or lyceum diploma is accepted natively)',
      'Submit IELTS Academic (7.5+) or TOEFL (100+) & robust SAT/ACT score (Aim for 1500+)',
      'Provide Two Counselor/Teacher Recommendation Letters',
      'Complete the online interview with local or regional alumni if contacted'
    ]
  },
  {
    id: 'bocconi-it',
    name: 'Bocconi University',
    country: 'Italy',
    city: 'Milan',
    acceptanceRate: '15%',
    ieltsRequirement: 6.0,
    satRequirement: 1350,
    gpaRequirement: 3.2,
    tuition: '€14,700 / year',
    financialAid: 'Bocconi Merit Award (100% or 50% tuition waiver) & ISU Fee Relief based on family income',
    uzbekDiplomaStatus: 'Accepted',
    foundationRequired: false, // Accepted if applicant holds Lyceum/College or has SAT/ACT to bypass
    website: 'https://www.unibocconi.eu',
    description: 'One of the best business, economics, and finance schools in Europe. Highly respected globally. Uzbek lyceum or college graduates with 12 years of study are directly welcome.',
    popularMajors: ['International Economics and Management', 'Fintech', 'Mathematical & Computing Sciences for AI', 'Economics & Social Sciences'],
    tips: [
      'Submit the SAT score instead of the internal Bocconi online test as SAT results are often evaluated more favorably.',
      'Prepare a solid letter of motivation expressing your interest in quantitative economics or modern business.',
      'ISU student aid is based strictly on financial documentation from Uzbekistan, enabling deep discounts on fees.'
    ],
    applicationSteps: [
      'Apply via My Application Portal on Bocconi website',
      'Submit Grade 10, 11 (and 12 for Lyceum/College) school transcripts',
      'Upload IELTS 6.0+ (overall with no band under 5.5)',
      'Upload SAT score (high sub-scores in Math are favored) or register for Bocconi admissions test',
      'Submit your CV and Single-page Cover Letter'
    ]
  },
  {
    id: 'ucl-uk',
    name: 'University College London (UCL)',
    country: 'UK',
    city: 'London',
    acceptanceRate: '12%',
    ieltsRequirement: 7.0,
    satRequirement: null,
    gpaRequirement: 3.7,
    tuition: '£26,000 - £35,000 / year',
    financialAid: 'Very competitive partial scholarships (UCL Global Undergraduate Scholarship)',
    uzbekDiplomaStatus: 'Conditional',
    foundationRequired: true, // UK strictly requires A-Levels, IB, or an approved Foundation year
    website: 'https://www.ucl.ac.uk',
    description: 'A top-10 global university based in central London. Offers premier learning hubs but has extremely competitive entry standards and UK visa constraints.',
    popularMajors: ['Architecture', 'Computer Science', 'Economics', 'Biomedical Sciences'],
    tips: [
      'The Uzbek 11-year diploma is NOT verified for direct entry. You MUST take the UCL Undergraduate Preparatory Certificate (UPC) foundation year.',
      'UCL is standardly part of the UCAS system; you can choose up to 5 courses across the entire UK.',
      'Excel in the academic section; UCL evaluates Personal Statements and academic predictions above everything else.'
    ],
    applicationSteps: [
      'Register and submit your application on UCAS (ucas.com)',
      'Upload UCAS Personal Statement (emphasizing your academic curiosity)',
      'Include one reference letter from a teacher with predicted grades',
      'Provide IELTS Academic indicator (typically 7.0+ overall with 6.5+ in each section)',
      'Apply to UCL UPC Foundation program directly if you do not have A-levels/IB'
    ]
  },
  {
    id: 'yonsei-kr',
    name: 'Yonsei University (UIC)',
    country: 'South Korea',
    city: 'Seoul',
    acceptanceRate: '18%',
    ieltsRequirement: 6.5,
    satRequirement: null,
    gpaRequirement: 3.3,
    tuition: '$6,200 / semester',
    financialAid: 'UIC Admissions Scholarship (30%, 50% or 100% tuition coverage for full 4 years)',
    uzbekDiplomaStatus: 'Accepted',
    foundationRequired: false,
    website: 'https://uic.yonsei.ac.kr',
    description: 'Top-tier "SKY" university in Korea. Underwood International College (UIC) is an all-English liberal arts college of Yonsei, loved by Central Asian high-achievers.',
    popularMajors: ['Comparative Literature', 'Economics', 'Life Science and Biotechnology', 'Information & Interaction Design'],
    tips: [
      'No Korean language proficiency is required to apply or graduate from UIC, but elementary Korean helps integration.',
      'Provide glowing letters of recommendation — the admissions team reviews candidates holistically.',
      'Submit optional SAT scores (like 1350+) to tremendously boost your admissions scholarship outcomes.'
    ],
    applicationSteps: [
      'Fill out the online application via UIC website or CommonApp',
      'Submit high school transcript, Uzbek diploma or graduation certificate',
      'Submit official IELTS (6.5+) test results directly to school code',
      'Submit two letters of recommendation and complete the online application essay',
      'Attend the 10-minute admissions telephone/Zoom interview'
    ]
  },
  {
    id: 'constructor-de',
    name: 'Constructor University',
    country: 'Germany',
    city: 'Bremen',
    acceptanceRate: '55%',
    ieltsRequirement: 6.0,
    satRequirement: null,
    gpaRequirement: 3.0,
    tuition: '€20,000 / year (Reduced to ~€12,000 via automated merit grants)',
    financialAid: 'Automated Merit-Based tuition reductions + financial aid packages based on parent income',
    uzbekDiplomaStatus: 'Accepted', // Constructor is a private university and can accept Uzbek high school diplomas directly 
    foundationRequired: false,
    website: 'https://constructor.university',
    description: 'A private English-medium university located in Germany. Very popular among Uzbek lyceum students as they can enter directly (no Studienkolleg needed) and find solid English degrees.',
    popularMajors: ['Computer Science', 'Robotics and Intelligent Systems', 'Global Economics and Management', 'Biochemistry'],
    tips: [
      'You bypass the complex Studienkolleg structure entirely since it is a private university using American-style holistic admission.',
      'Nearly every admitted student gets a automatic tuition reduction of €5,000 to €10,000 based on school grades.',
      'Take advantage of their winter intake if you missed the primary summer deadlines.'
    ],
    applicationSteps: [
      'Complete execution on the Common App website',
      'Upload high school transcripts with overall grades',
      'Provide IELTS (6.0+) score or petition for English medium of instruction waiver (if lyceum was English-taught)',
      'Submit one recommendation letter',
      'File the financial aid calculator form on their portal for supplementary grants'
    ]
  },
  {
    id: 'usf-us',
    name: 'University of South Florida (USF)',
    country: 'USA',
    city: 'Tampa, FL',
    acceptanceRate: '43%',
    ieltsRequirement: 6.5,
    satRequirement: 1240, // Required for Florida public universities
    gpaRequirement: 3.0,
    tuition: '$17,300 / year (Out of State)',
    financialAid: 'USF Green & Gold President Scholarship (Up to $12,000/year, making tuition only $5,000/year)',
    uzbekDiplomaStatus: 'Accepted',
    foundationRequired: false,
    website: 'https://www.usf.edu',
    description: 'A large, modern public research university in Florida. It offers exceptional cost-performance value for Uzbek students who score 1300+ on the SAT due to the Green & Gold awards.',
    popularMajors: ['Mechanical Engineering', 'Finance', 'Computer Science', 'Biomedical Sciences'],
    tips: [
      'Florida public universities strictly require an SAT or ACT score; you cannot enter USF without one even if you have an 8.0 IELTS.',
      'Check the scholarship tiers: GPA 3.9+ & SAT 1340+ yields $12,000/year automatically. This makes USF cheaper than WIUT!',
      'Apply before January 15th to be considered for safety-net admissions funding.'
    ],
    applicationSteps: [
      'Apply via the USF Institutional Portal or Common App',
      'Self-report your courses and grades using the SSAR (Student Self-Reported Academic Record)',
      'Submit official SAT or ACT score report (Target SAT: 1250+)',
      'Provide IELTS 6.5+ report',
      'Pay the $30 application fee'
    ]
  },
  {
    id: 'kaist-kr',
    name: 'KAIST (Korea Advanced Institute of Science & Tech)',
    country: 'South Korea',
    city: 'Daejeon',
    acceptanceRate: '15%',
    ieltsRequirement: 6.5,
    satRequirement: null,
    gpaRequirement: 3.6,
    tuition: 'Free (Fully covered for students maintaining a GPA above 2.7/4.3)',
    financialAid: 'Global KAIST Scholarship (100% Tuition covered + $300 monthly cash stipend + medical insurance)',
    uzbekDiplomaStatus: 'Accepted',
    foundationRequired: false,
    website: 'https://www.kaist.ac.kr',
    description: 'South Korea’s top science and technology institute. Its international undergraduate cohort gets complete cost-coverage, which is highly sought-after by graduates of Tashkent President/AL-Khorazmiy schools.',
    popularMajors: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Bio & Brain Engineering'],
    tips: [
      'Prepare very strong recommendation letters from your STEM teachers (Math, Physics, or CS).',
      'The IELTS is mandatory, but having academic olympiad awards or coding achievements is what truly makes you a winner.',
      'Submit high school counselor school profile to explain the rigor of your lyceum or high school.'
    ],
    applicationSteps: [
      'Access the KAIST International Admission portal',
      'Fill up the extensive application form and write 3 essays',
      'Submit certified high school diplomas and transcripts (directly accepts Uzbek high school)',
      'Arrange for teacher recommendation letters to be sent through secure emails',
      'Upload IELTS (6.5+) or TOEFL iBT (83+) English scores',
      'Pay $80 application fee and track selection process'
    ]
  }
];
