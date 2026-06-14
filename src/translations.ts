/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'uz' | 'ru' | 'de';

export interface TranslatedUniversity {
  name: string;
  city: string;
  description: string;
  popularMajors: string[];
  tips: string[];
  applicationSteps?: string[];
  tuition: string;
  financialAid: string;
}

export const UNIVERSITY_TRANSLATIONS: Record<Language, Record<string, TranslatedUniversity>> = {
  en: {
    'wiut-uz': {
      name: 'Westminster International University in Tashkent (WIUT)',
      city: 'Tashkent',
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
      ],
      tuition: '$3,200 / year',
      financialAid: 'Government & WIUT Scholarships (Covers 100% for top applicants)'
    },
    'sapienza-it': {
      name: 'Sapienza University of Rome',
      city: 'Rome',
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
      ],
      tuition: '€1,000 - €2,900 / year',
      financialAid: 'LazioDisco Regional Scholarship (Covers 100% tuition + €6,000/year stipend)'
    },
    'tum-de': {
      name: 'Technical University of Munich (TUM)',
      city: 'Munich',
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
      ],
      tuition: 'Free (Only €150/semester administrative contribution)',
      financialAid: 'DAAD Scholarships & Working Student Programs'
    },
    'harvard-us': {
      name: 'Harvard University',
      city: 'Cambridge, MA',
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
      ],
      tuition: '$57,200 / year',
      financialAid: '100% Need-Blind (Harvard covers full cost if family income is under $85,000/year)'
    },
    'bocconi-it': {
      name: 'Bocconi University',
      city: 'Milan',
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
      ],
      tuition: '€14,700 / year',
      financialAid: 'Bocconi Merit Award (100% or 50% tuition waiver) & ISU Fee Relief'
    },
    'ucl-uk': {
      name: 'University College London (UCL)',
      city: 'London',
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
      ],
      tuition: '£26,000 - £35,000 / year',
      financialAid: 'Very competitive partial scholarships (UCL Global Undergraduate Scholarship)'
    },
    'yonsei-kr': {
      name: 'Yonsei University (UIC)',
      city: 'Seoul',
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
      ],
      tuition: '$6,200 / semester',
      financialAid: 'UIC Admissions Scholarship (30%, 50% or 100% tuition coverage for full 4 years)'
    },
    'constructor-de': {
      name: 'Constructor University',
      city: 'Bremen',
      description: 'A private English-medium university located in Germany. Very popular among Uzbek lyceum students as they can enter directly (no Studienkolleg needed) and find solid English degrees.',
      popularMajors: ['Computer Science', 'Robotics and Intelligent Systems', 'Global Economics and Management', 'Biochemistry'],
      tips: [
        'You bypass the complex Studienkolleg structure entirely since it is a private university using American-style holistic admission.',
        'Nearly every admitted student gets an automatic tuition reduction of €5,000 to €10,000 based on school grades.',
        'Take advantage of their winter intake if you missed the primary summer deadlines.'
      ],
      applicationSteps: [
        'Complete execution on the Common App website',
        'Upload high school transcripts with overall grades',
        'Provide IELTS (6.0+) score or petition for English medium of instruction waiver (if lyceum was English-taught)',
        'Submit one recommendation letter',
        'File the financial aid calculator form on their portal for supplementary grants'
      ],
      tuition: '€20,000 / year',
      financialAid: 'Automated Merit-Based tuition reductions + financial aid packages'
    },
    'usf-us': {
      name: 'University of South Florida (USF)',
      city: 'Tampa, FL',
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
      ],
      tuition: '$17,300 / year (Out of State)',
      financialAid: 'USF Green & Gold President Scholarship (Up to $12,000/year)'
    },
    'kaist-kr': {
      name: 'KAIST (Korea Advanced Institute of Science & Tech)',
      city: 'Daejeon',
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
      ],
      tuition: 'Free (Fully covered for students maintaining a GPA above 2.7/4.3)',
      financialAid: 'Global KAIST Scholarship (100% Tuition covered + $300 monthly cash stipend)'
    }
  },
  uz: {
    'wiut-uz': {
      name: 'Toshkent shahridagi Vestminster Xalqaro Universiteti (WIUT)',
      city: 'Toshkent',
      description: 'Vestminster Universiteti (UK) bilan hamkorlikda Toshkentda tashkil etilgan birinchi xalqaro universitet. Moliya, biznes va IT sohalarida yuqori nufuzga ega.',
      popularMajors: ['Biznes boshqaruvi', 'Tijorat huquqi', 'Moliya', 'Biznes axborot tizimlari'],
      tips: [
        'Davlat va universitet tomonidan ajratilgan 100% bepul grant kvotalariga ega boʻlish uchun mart yoki aprel oyida erta topshiring.',
        'IELTS sertifikatini iloji boricha tezroq topshiring; 6.0+ ball matematika imtihonidan ozod etishi mumkin.',
        'Agar sizda SAT yoki rasmiy matematika sertifikatlari boʻlmasa, WIUT Matematika imtihoniga jiddiy tayyorlaning.'
      ],
      applicationSteps: [
        'WIUT Qabul portalida ruyxatdan oʻting (admission.wiut.uz)',
        '11-yillik maktab, litsey yoki kollej diplomi va baholarini yuklang',
        'IELTS sertifikatini yuklang (kamida 5.5, yozma qismidan kamida 5.0)',
        'Matematik qabul imtihonidan oʻting (yoki 550+ balldan yuqori SAT Matematika natijasini yuklang)',
        'Rasmiy qabul xatini oling va shartnomani imzolang'
      ],
      tuition: '$3,200 / yil',
      financialAid: 'Davlat va WIUT Grantlari (Iqtidorli talabalar uchun 100% bepul)'
    },
    'sapienza-it': {
      name: 'Rim Sapienza Universiteti',
      city: 'Rim',
      description: 'Yevropaning eng qadimgi va eng yirik universitetlaridan biri, Rim markazida joylashgan. Kam xarajatli ingliz tilidagi bakalavr dasturlari va mintaqaviy grantlari bilan tanilgan.',
      popularMajors: ['Gumanitar fanlar', 'Amaliy kompyuter fanlari', 'Barqaror muhandislik', 'Bioinformatika'],
      tips: [
        'Oʻzbekistonda maktab 11 yillik boʻlganligi sababli: Foundation kursini tamomlashingiz, litsey/kollej bittirgan boʻlishingiz yoki mahalliy universitetda 1 yil oʻqigan boʻlishingiz shart.',
        'Erta qabul xatini olish uchun pre-selection bosqichida (Noyabr - Fevral) hujjat topshiring.',
        'LazioDisco toʻliq grantiga pre-acceptance xatini olgandan keyin iyul oyida topshiring.'
      ],
      applicationSteps: [
        'Sapienza portalida ingliz tilidagi oʻqish dasturini tanlang',
        'Akademik transkriptlar va IELTS sertifikatini topshiring (kamida 6.0)',
        '€30 ariza toʻlovini toʻlang va ariza qismini yakunlang',
        'Talab qilinsa, CISIA (ENGLISH TOLC-E yoki TOLC-I) onlayn testidan oʻting',
        'Qabuldan soʻng, viza olish uchun CIMEA yoki Universitaly portalida roʻyxatdan oʻting'
      ],
      tuition: '€1,000 - €2,900 / yil',
      financialAid: 'LazioDisco mintaqaviy granti (Toʻliq bepul oʻqish + yiliga €6000 stipendiya)'
    },
    'tum-de': {
      name: 'Myunxen Texnika Universiteti (TUM)',
      city: 'Myunxen',
      description: 'Yevropadagi yetakchi texnik universitet, muhandislik va kompyuter fanlari boʻyicha dunyoda mashhur. Deyarli mutlaqo bepul taʼlim beradi.',
      popularMajors: ['Boshqaruv va texnologiyalar', 'Aerokosmik muhandislik', 'Matematika', 'Informatika'],
      tips: [
        'Oʻzbekiston maktab bitiruvchilari Germaniyada oʻqishni boshlashdan oldin 1 yillik Studienkolleg preparatory kursida oʻqishi shart.',
        'Ingliz tilidagi dasturlar uchun nemis tili talab qilinmaydi, ammo viza va ish topish uchun oddiy nemis tilini (A2/B1) bilish tavsiya etiladi.',
        'Germaniya vizasi uchun bloklangan hisob raqamida (Sperrkonto) taxminan €11,208 mablagʻ koʻrsatish talab etiladi.'
      ],
      applicationSteps: [
        'Uni-assist orqali Oʻzbekiston diplomingiz Germaniyaga mosligini tekshiring',
        'TUMonline portalida roʻyxatdan oʻting va hujjatlarni yuklang',
        'IELTS Academic 6.5+ ball sertifikatini taqdim eting',
        'Uni-assist tomonidan beriladigan VPD hujjatini topshiring',
        'Fakultet tomonidan tanlangan taqdirda onlayn suhbatda ishtirok eting'
      ],
      tuition: 'Bepul (Faqatgina €150/semestr maʼmuriy badal)',
      financialAid: 'DAAD Grantlar va talabalarga yarim kunlik ishlash imkoniyatlari'
    },
    'harvard-us': {
      name: 'Garvard Universiteti',
      city: 'Kembrij, MA',
      description: 'Dunyodagi eng mashhur Ivy League universiteti. U muhtojlikni hisobga olmaydigan (need-blind) tizimga ega, ya’ni qabul qilingan oʻzbek talabasining barcha xarajatlarinii toʻliq qoplab beradi.',
      popularMajors: ['Kompyuter fanlari', 'Iqtisodiyot', 'Siyosatshunoslik', 'Molekulyar biologiya'],
      tips: [
        'Sinfdan tashqari faoliyatlar va real loyihalar yaratishga maksimal eʼtibor qarating. A’lo baholar va SAT faqat boshlangʻich talabdir.',
        'Qabul ehtimolini oshirish uchun 1-noyabrgacha Early Action (erta ariza) xizmatidan foydalaning.',
        "Insho yozish maslahatlari va tahrirlari uchun hozirda Ivy League maktablarida o'qiyotgan oʻzbek talabalari bilan bogʻlaning."
      ],
      applicationSteps: [
        'Common Application (CommonApp.org) portalida roʻyxatdan oʻting',
        'CommonApp asosiy inshosi va Garvard qoʻshimcha insholarini yozing',
        'Oʻrta maktab yoki litsey transkriptlarini topshiring (Oʻzbekiston diplomi qabul qilinadi)',
        'IELTS (7.5+) va yuqori SAT/ACT natijasini topshiring (SAT kamida 1500 tavsiya etiladi)',
        'Oʻqituvchilardan 2 ta tavsiyanoma xatlarini taqdim eting',
        'Suhbatga taklif qilinsangiz onlayn akademik suhbatdan oʻting'
      ],
      tuition: '$57,200 / yil',
      financialAid: '100% Need-Blind (Oilaviy daromad $85,000 dan past boʻlsa, kontrakt va yashash mutlaqo bepul)'
    },
    'bocconi-it': {
      name: 'Bokkoniy Universiteti',
      city: 'Milan',
      description: 'Yevropadagi moliya, biznes va iqtisodiyot boʻyicha eng nufuzli universitet. Biznes sohasida mukammallik markazi. Akademik litsey bitiruvchilari toʻgʻridan-toʻgʻri qabul qilinadi.',
      popularMajors: ['Xalqaro iqtisodiyot va boshqaruv', 'Fintex', 'Sunʼiy intellekt fanlari', 'Iqtisodiyot va ijtimoiy fanlar'],
      tips: [
        'Bokkoniyning onlayn imtihonidan koʻra SAT topshirgan maʼqul, chunki u yuqoriroq baholanishi mumkin.',
        'Biznes yoki miqdoriy iqtisodiyotga boʻlgan ishtiyoqingizni aks ettiruvchi motivatsiya xatini tayyorlang.',
        'Ijtimoiy yordam (ISU) oilaviy moliyaviy holatingizga koʻra toʻlovlarni sezilarli darajada kamaytirish imkonini beradi.'
      ],
      applicationSteps: [
        'Bocconi qabul portalida ariza toʻldiring',
        '10, 11 (va litsey uchun 12) sinf baholarini yuklang',
        'IELTS 6.0+ sertifikatini yuklang',
        'SAT natijasini yuklang yoki Bocconi shaxsiy onlayn imtihonidan oʻting',
        'CV (rezyume) va 1 varaqdan iborat motivatsiya xatini yuklang'
      ],
      tuition: '€14,700 / yil',
      financialAid: 'Bocconi Merit Award (100% yoki 50% gacha grant) va ISU ijtimoiy yordami'
    },
    'ucl-uk': {
      name: 'London Universitet Kolleji (UCL)',
      city: 'London',
      description: 'London markazidagi dunyo boʻyicha top-10 universitetlardan biri. Juda yuqori raqobat va oʻqish toʻlovlariga ega boʻlgan jahon taʼlim xabi.',
      popularMajors: ['Arxitektura', 'Kompyuter fanlari', 'Iqtisodiyot', 'Biomedikal fanlar'],
      tips: [
        'Oddiy Oʻzbekiston maktab diplomi toʻgʻridan-toʻgʻri oʻqishga yetarli emas. Siz UCL UPC Foundation kursini oʻqishingiz shart.',
        'UCLga arizalar UCAS tizimi orqali topshiriladi; jami 5 tagacha Buyuk Britaniya oliy oʻquv yurtini tanlashingiz mumkin.',
        'Insholaringizda oʻquv fanlariga boʻlgan chuqur qiziqishingiz va ijodkorligingizni aks ettiring.'
      ],
      applicationSteps: [
        'UCAS (ucas.com) portalida ariza topshiring',
        'UCAS Personal Statement (shaxsiy motivatsiya xati) yuklang',
        'Oʻqituvchingizdan tavsiyanoma va kutilayotgan baholar roʻyxatidan nusxa oling',
        'IELTS Academic sertifikatini topshiring (kamida 7.0 ball)',
        'Agar A-Level/IB sertifikatingiz boʻlmasa, toʻgʻridan-toʻgʻri UCL UPC Foundationga topshiring'
      ],
      tuition: '£26,000 - £35,000 / yil',
      financialAid: 'UCL Global Undergraduate bepul taʼlim qisman grantlari (Juda raqobatli)'
    },
    'yonsei-kr': {
      name: 'Yonsey Universiteti (UIC)',
      city: 'Seul',
      description: 'Koreyaning eng elita "SKY" universitetlaridan biri. Underwood xalqaro kolleji (UIC) faqat ingliz tilida dars beradi va Markaziy Osiyo talabalari orasida judayam mashhur.',
      popularMajors: ['Qiyosiy adabiyotshunoslik', 'Iqtisodiyot', 'Biotexnologiya', 'Ilova va interaktiv dizayn'],
      tips: [
        'Hujjat topshirish yoki bitirish uchun koreys tilini bilish talab qilinmaydi, ammo u Koreyaga moslashishga yordam beradi.',
        'Oʻqituvchilaringizdan kuchli koʻrsatgichlar va tavsiyanomalar oling — barcha hujjatlar yaxlit koʻrib chiqiladi.',
        'Katta oʻqish grantlarini yutib olish imkoniyatini oshirish uchun SAT ballarini (masalan, 1350+) taqdim eting.'
      ],
      applicationSteps: [
        'UIC portali yoki CommonApp orqali arizani toʻldiring',
        'Transkriptlar va maktab bitiruv diplomini taqdim eting',
        'IELTS (kamida 6.5) natijasini toʻgʻridan-toʻgʻri universitetga yuboring',
        'Ikkita tavsiyanoma xatini va onlayn inshosini yozib topshiring',
        '10 daqiqalik qisqa Zoom yoki telefon orqali onlayn suhbatdan oʻting'
      ],
      tuition: '$6,200 / semestr',
      financialAid: 'UIC kirish granti (Toʻliq 4 yil uchun 30%, 50% yoki 100% gacha boʻlgan grant)'
    },
    'constructor-de': {
      name: 'Constructor Universiteti',
      city: 'Bremen',
      description: 'Germaniyadagi ingliz tilida oʻqitadigan xususiy universitet. Oʻzbekiston litsey va maktab bitiruvchilari toʻgʻridan-toʻgʻri (Studienkollegsiz) kirishi mumkinligi uchun judayam mashhur.',
      popularMajors: ['Kompyuter fanlari', 'Robototexnika', 'Global iqtisodiyot va boshqaruv', 'Biokimyo'],
      tips: [
        'Xususiy universitet boʻlganligi sababli, murakkab Studienkolleg kurslaridan ozod etilasiz va toʻgʻridan-toʻgʻri 1-kursga kirasiz.',
        'Deyarli har bir qabul qilingan talabaga baholariga koʻra yiliga €5,000 dan €10,000 gacha avtomatik chegirma beriladi.',
        'Agarda yozgi qabulga ulgurmagan boʻlsangiz, qishki qabul imkoniyatlaridan foydalaning.'
      ],
      applicationSteps: [
        'Common App veb-saytida arizani yakunlang',
        'Baholar yozilgan maktab transkriptini yuklang',
        'IELTS (6.0+) yoki darslar ingliz tilida oʻtilganligi haqidagi litsey maʼlumotnomasini topshiring',
        'Bitta tavsiyanoma xatini taqdim eting',
        'Qoʻshimcha grantlar olish uchun universitet moliyaviy kalkulyatorini toʻldiring'
      ],
      tuition: '€20,000 / yil',
      financialAid: 'Avtomatik ravishda baholar asosida kontrakt toʻlovini kamaytirish tizimi'
    },
    'usf-us': {
      name: 'Janubiy Florida Universiteti (USF)',
      city: 'Tampa, FL',
      description: 'AQShning Florida shtatidagi yirik va zamonaviy tadqiqot universiteti. 1300+ SAT ballga ega oʻzbek talabalarga juda yuqori stipendiya (chegirmalar) beriladi.',
      popularMajors: ['Mashinasozlik muhandisligi', 'Moliya', 'Kompyuter fanlari', 'Biomeditsina fanlari'],
      tips: [
        'Florida shtati qonuniga koʻra, SAT yoki ACT ballari qatʼiy talab qilinadi. IELTS imtihoningiz 8.5 boʻsa ham SAT topshirish shart.',
        'Stipendiya bosqichlari: GPA 3.9 va SAT 1340 natija bilan yiliga $12,000 yutasiz naqd! Bu oʻqishni WIUTdan ham arzonroq qiladi.',
        'Moliyaviy grantlarni qoʻldan boy bermaslik uchun 15-yanvargacha ariza bering.'
      ],
      applicationSteps: [
        'USF shaxsiy portali yoki Common App orqali ariza bering',
        'SSAR tizimi yordamida baholaringizni onlayn tarzda kiritib chiqing',
        'Rasmiy SAT yoki ACT natijalarini toʻgʻridan-toʻgʻri yuboring',
        'IELTS 6.5+ sertifikatini taqdim eting',
        '$30 ariza toʻlovini amalga oshiring'
      ],
      tuition: '$17,300 / yil (Shtatdan tashqari talabalar uchun)',
      financialAid: 'USF Green & Gold President Scholarship (Yiliga $12,000 gacha stipendiya)'
    },
    'kaist-kr': {
      name: 'KAIST (Koreya Ilgʻor Fan va Texnologiyalar Instituti)',
      city: 'Tejon',
      description: 'Koreyaning eng yuqori reytingli ilmiy tadqiqot instituti. Toʻliq kof-moliyaviy grantlar bergani uchun Oʻzbekistondagi Prezident va Al-Xorazmiy litseylari bitiruvchilari orasida juda mashhur.',
      popularMajors: ['Kompyuter fanlari', 'Elektronika muhandisligi', 'Mashinasozlik muhandisligi', 'Miya va neyromuhandislik'],
      tips: [
        'Aniq fanlar (Matematika, Fizika, Informatika) oʻqituvchilaringizdan judayam kuchli tavsiyanomalar tayyorlang.',
        'IELTS talab qilinadi, lekin fan olimpiadalari yoki kodlash boʻyicha yutuqlaringiz qabul qilinishga juda yordam beradi.',
        "Litsey yoki maktabingiz nufuzini tushuntirish uchun fan o'qituvchilaringizdan maktab profilini qoʻshing."
      ],
      applicationSteps: [
        'KAIST Xalqaro qabul portaliga kiring',
        'Keng qamrovli arizani toʻldiring va 3 ta shaxsiy insho yozing',
        'Oʻrta maktab bitiruv hujjati va transkriptini yuklang',
        'Tavsiyanomalar yuborish uchun oʻqituvchilaringiz elektron pochtasini onlayn kiriting',
        'IELTS (6.5+) yoki TOEFL (83+) natijasini yuklang',
        '$80 ariza toʻlovini toʻlang'
      ],
      tuition: 'Bepul (Semestrdagi umumiy baholar GPA 2.7 dan yuqori boʻlsa toʻliq tekin)',
      financialAid: 'Global KAIST Scholarship (100% Tekin oʻqish + oyiga $300 stipendiya va tibbiy sugʻurta)'
    }
  },
  ru: {
    'wiut-uz': {
      name: 'Международный Вестминстерский Университет в Ташкенте (WIUT)',
      city: 'Ташкент',
      description: 'Первый международный университет, основанный в Ташкенте в партнерстве с Вестминстерским университетом (Великобритания). Высоко ценится в сферах финансов, бизнеса и IT.',
      popularMajors: ['Управление бизнесом', 'Коммерческое право', 'Финансы', 'Бизнес-информационные системы'],
      tips: [
        'Подавайте документы заранее в марте/апреле, чтобы зарегистрироваться на бесплатные государственные квоты.',
        'Загрузите сертификат IELTS как можно скорее; балл 6.0+ освобождает от внутреннего экзамена по математике.',
        'Тщательно готовьтесь ко внутреннему экзамену WIUT по математике, если у вас нет SAT или других признанных результатов.'
      ],
      applicationSteps: [
        'Зарегистрируйтесь на портале приема WIUT (admission.wiut.uz)',
        'Загрузите ваш школьный или лицейский аттестат / академический лист оценок',
        'Предоставьте сертификат IELTS (общий балл от 5.5, с баллом по письму не ниже 5.0)',
        'Сдайте внутренний экзамен по математике (или загрузите сертификат SAT с секцией Math от 550 баллов)',
        'Получите официальный оффер о приеме и подпишите контракт'
      ],
      tuition: '$3,200 / год',
      financialAid: 'Государственные стипендии и гранты WIUT (100% покрытие расходов для лучших абитуриентов)'
    },
    'sapienza-it': {
      name: 'Римский Университет Ла Сапиенца',
      city: 'Рим',
      description: 'Один из старейших и крупнейших университетов Европы, расположенный в самом сердце Рима. Известен недорогими программами бакалавриата на английском языке и богатыми стипендиальными программами.',
      popularMajors: ['Глобальные гуманитарные науки', 'Прикладная информатика', 'Проектирование зданий', 'Биоинформатика'],
      tips: [
        'Поскольку обучение в Узбекистане длится 11 лет, вам необходимо: пройти 1-летний подготовительный курс (Foundation), отучиться 1 год в местном вузе или иметь 12-летний диплом лицея/колледжа.',
        'Подавайте заявку на этапе предварительного отбора (обычно с ноября по февраль), чтобы получить письмо о предварительном зачислении.',
        'Обращайтесь за получением полной региональной стипендии LazioDisco в июле после получения письма о предварительном приеме.'
      ],
      applicationSteps: [
        'Выберите англоязычную программу на портале Sapienza',
        'Предоставьте транскрипты оценок и сертификат IELTS (не менее 6.0)',
        'Оплатите регистрационный взнос в размере €30 и отправьте форму предварительного отбора',
        'Пройдите обязательный онлайн-тест CISIA (ENGLISH TOLC-E или TOLC-I) по запросу факультета',
        'После приема завершите предварительную регистрацию на портале CIMEA или Universitaly для получения визы'
      ],
      tuition: '€1,000 - €2,900 / год',
      financialAid: 'Региональная стипендия LazioDisco (Покрывает 100% обучения + годовая стипендия до €6,000)'
    },
    'tum-de': {
      name: 'Мюнхенский Технический Университет (TUM)',
      city: 'Мюнхен',
      description: 'Один из лучших технических университетов Европы и мира. Известен своими программами в области инженерии и ИТ. Практически бесплатное высшее образование.',
      popularMajors: ['Менеджмент и технологии', 'Аэрокосмическая инженерия', 'Математика', 'Информатика'],
      tips: [
        'Выпускникам 11-летних школ Узбекистана необходимо пройти годовой подготовительный курс Studienkolleg в Германии до зачисления, либо отучиться 1-2 года в вузе на родине.',
        'Знание немецкого языка не требуется для англоязычных программ, но знание языка на уровне A2/B1 нужно для стабильной жизни и поиска работы.',
        'Для немецкой визы потребуется открыть блокированный банковский счет (Sperrkonto) на сумму около €11,208.'
      ],
      applicationSteps: [
        'Проверьте соответствие диплома требованиям Германии через uni-assist',
        'Зарегистрируйтесь на портале TUMonline и загрузите академические документы',
        'Предоставьте сертификат IELTS Academic 6.5+ (или эквивалент TOEFL)',
        'Загрузите документ VPD, выданный организацией uni-assist',
        'Примите участие в онлайн-интервью или пройдите отборочный тест факультета'
      ],
      tuition: 'Бесплатно (Только административный взнос €150/семестр)',
      financialAid: 'Стипендии DAAD и возможности подработки для студентов (разрешено работать 140 полных дней в году)'
    },
    'harvard-us': {
      name: 'Гарвардский Университет',
      city: 'Кембридж, Массачусетс',
      description: 'Всемирно известный университет Лиги Плюща. Полностью покрывает все расходы на обучение, проживание и проезд (need-blind), если доход семьи студента менее $85,000 в год.',
      popularMajors: ['Компьютерные науки', 'Экономика', 'Политология и международные отношения', 'Молекулярная биология'],
      tips: [
        'Уделяйте максимум внимания внеклассной деятельности и созданию реальных проектов. Идеальные оценки и SAT — лишь основа.',
        'Подавайте документы на раннее решение (Early Action) до 1 ноября, чтобы удвоить шансы на зачисление.',
        'Обратитесь к узбекским выпускникам и студентам, обучающимся в Гарварде или других вузах Лиги Плюща, за советами по написанию эссе.'
      ],
      applicationSteps: [
        'Заполните заявку на платформе Common App (CommonApp.org)',
        'Напишите основное эссе Common App и дополнительные эссе для Гарварда',
        'Предоставьте транскрипты оценок (национальный диплом Узбекистана принимается напрямую)',
        'Предоставьте IELTS Academic (7.5+) или TOEFL (100+) и высокий результат SAT/ACT (рекомендуется 1500+)',
        'Предоставьте два рекомендательных письма от учителей и одно от школьного советника',
        'Пройдите онлайн-интервью с выпускниками, если с вами свяжутся представители университета'
      ],
      tuition: '$57,200 / год',
      financialAid: '100% Need-Blind (Обучение и жилье бесплатно, если годовой доход семьи ниже $85,000)'
    },
    'bocconi-it': {
      name: 'Университет Боккони',
      city: 'Милан',
      description: 'Один из лучших университетов в Европе по бизнесу, экономике и финансам. Выпускники академических лицеев и колледжей Узбекистана (с 12-летним обучением) принимаются напрямую.',
      popularMajors: ['Международная экономика и менеджмент', 'Финтех', 'Математика и компьютерные науки для ИИ', 'Экономика и социальные науки'],
      tips: [
        'Предоставляйте сертификат SAT вместо сдачи внутреннего вступительного теста Боккони — результаты SAT часто оцениваются благосклоннее.',
        'Напишите сильное мотивационное письмо, в котором опишите свой интерес к количественному анализу или бизнесу.',
        'Финансовая помощь (ISU) рассчитывается по доходам вашей семьи, что позволяет получить огромные скидки на оплату.'
      ],
      applicationSteps: [
        'Подайте заявку через личный кабинет My Application на сайте Bocconi',
        'Загрузите табеля оценок за последние три года учебы',
        'Предоставьте сертификат IELTS с общим баллом от 6.0',
        'Загрузите результаты SAT (высокая оценка по математике дает преимущество) или сдайте тест Bocconi',
        'Предоставьте резюме (CV) и одностраничное мотивационное письмо'
      ],
      tuition: '€14,700 / год',
      financialAid: 'Bocconi Merit Award (100% или 50% скидки на контракт) и социальная помощь ISU'
    },
    'ucl-uk': {
      name: 'Университетский Колледж Лондона (UCL)',
      city: 'Лондон',
      description: 'Университет из топ-10 мира, расположенный в центре Лондона. Имеет высочайшие стандарты отбора и жесткие условия въезда для граждан Узбекистана.',
      popularMajors: ['Архитектура', 'Компьютерные науки', 'Экономика', 'Биомедицинские науки'],
      tips: [
        'Аттестат 11-летней школы Узбекистана не подходит для прямого поступления. Вам потребуется пройти подготовительный год UCL UPC Foundation.',
        'UCL принимает документы через национальную британскую систему UCAS, где можно выбрать до 5 университетов.',
        'Напишите выдающееся личное заявление (Personal Statement), подчеркнув вашу страсть к будущей академической дисциплине.'
      ],
      applicationSteps: [
        'Зарегистрируйтесь и отправьте анкету в системе UCAS (ucas.com)',
        'Загрузите ваше Personal Statement для UCAS',
        'Прикрепите одно рекомендательное письмо от вашего преподавателя с прогнозируемыми оценками',
        'Предоставьте IELTS Academic (не ниже 7.0 с баллом в каждой секции от 6.5)',
        'Если у вас нет сертификатов A-levels/IB, подайте документы напрямую на программу UCL UPC Foundation'
      ],
      tuition: '£26,000 - £35,000 / год',
      financialAid: 'Высококонкурентные частичные стипендии (UCL Global Undergraduate Scholarship)'
    },
    'yonsei-kr': {
      name: 'Университет Ёнсе (UIC)',
      city: 'Сеул',
      description: 'Элитный университет из знаменитой тройки "SKY" в Южной Корее. Международный колледж Андервуд (UIC) полностью англоязычный и очень популярен среди студентов из Центральной Азии.',
      popularMajors: ['Сравнительное литературоведение', 'Экономика', 'Биотехнологии', 'Информационный и интерактивный дизайн'],
      tips: [
        'Для поступления или выпуска из UIC знание корейского языка не требуется, но базовый корейский язык очень облегчит интеграцию.',
        'Постарайтесь получить блестящие рекомендательные письма: комиссия оценивает кандидатов всесторонне.',
        'Предоставление результатов SAT (например, 1350+) повышает ваши шансы на получение щедрых въездных стипендий.'
      ],
      applicationSteps: [
        'Заполните онлайн-заявку на сайте UIC или через Common App',
        'Предоставьте табель успеваемости и аттестат или справку об окончании школы',
        'Отправьте официальный результат IELTS (6.5+) напрямую в вуз через код тестирования',
        'Загрузите два рекомендательных письма и напишите академические эссе',
        'Пройдите короткое 10-минутное устное интервью по Zoom или телефону'
      ],
      tuition: '$6,200 / семестр',
      financialAid: 'Академический грант UIC (покрытие 30%, 50% или 100% стоимости обучения на все 4 года)'
    },
    'constructor-de': {
      name: 'Университет Конструктор',
      city: 'Бремен',
      description: 'Частный англоязычный университет в Германии. Чрезвычайно популярен среди выпускников узбекских лицеев, поскольку предлагает прямое зачисление (без Studienkolleg).',
      popularMajors: ['Компьютерные науки', 'Робототехника', 'Глобальная экономика и менеджмент', 'Биохимия'],
      tips: [
        'Конструктор является частным вузом США/Германии и практикует холистический отбор, что позволяет избежать сложного года Studienkolleg.',
        'Почти каждый поступивший студент получает автоматическое снижение стоимости обучения на €5,000 - €10,000 на основании школьных оценок.',
        'Используйте зимний набор, если пропустили основные летние сроки подачи.'
      ],
      applicationSteps: [
        'Заполните анкету на сайте Common App',
        'Загрузите школьные выписки оценок',
        'Предоставьте IELTS (6.0+) или запросите освобождение, если обучение в лицее велось на английском языке',
        'Загрузите одно рекомендательное письмо от учителя',
        'Заполните расчетную финансовую форму университета на получение дополнительной скидки'
      ],
      tuition: '€20,000 / год',
      financialAid: 'Автоматические скидки за успеваемость + гранты на основе семейного дохода'
    },
    'usf-us': {
      name: 'Университет Южной Флориды (USF)',
      city: 'Тампа, Флорида',
      description: 'Крупный современный государственный научно-исследовательский университет. Предоставляет отличные стипендии для узбекских студентов с высокими баллами SAT.',
      popularMajors: ['Машиностроение', 'Финансы', 'Компьютерные науки', 'Биомедицинские науки'],
      tips: [
        'Государственные вузы штата Флорида строго требуют результаты SAT/ACT; без них поступить невозможно даже с IELTS 8.5.',
        'Стипендия Green & Gold President дает скидку до $12,000 в год при баллах GPA 3.9 и SAT 1340+, снижая контракт до $5,000/год.',
        'Подавайте документы строго до 15 января для участия в конкурсе на стипендиальные фонды.'
      ],
      applicationSteps: [
        'Подайте документы через сайт вуза или Common App',
        'Самостоятельно заполните оценки в американской шкале через систему SSAR',
        'Отправьте официальные баллы SAT/ACT',
        'Предоставьте языковой сертификат IELTS 6.5+',
        'Оплатите регистрационный сбор в размере $30'
      ],
      tuition: '$17,300 / год (для нерезидентов)',
      financialAid: 'Президентская стипендия USF Green & Gold (до $12,000 в год)'
    },
    'kaist-kr': {
      name: 'KAIST (Корейский ведущий научно-технический институт)',
      city: 'Тэджон',
      description: 'Лучший научно-технический институт Южной Кореи. Предоставляет полный грант и стипендию, что делает его крайне востребованным среди выпускников Президентских школ Республики.',
      popularMajors: ['Компьютерные науки', 'Электротехника', 'Машиностроение', 'Биология и нейроинженерия'],
      tips: [
        'Подготовьте очень подробные рекомендательные письма от учителей математики, физики или информатики.',
        'Языковой сертификат IELTS обязателен, но именно ваши грамоты научных олимпиад и хакатонов дадут решающий карт-бланш.',
        'Прикрепите академический профиль вашей школы от школьного советника, чтобы приемная комиссия оценила её уровень.'
      ],
      applicationSteps: [
        'Зарегистрируйтесь на международном портале KAIST Admission',
        'Заполните анкету и напишите 3 подробных сочинения (эссе)',
        'Загрузите заверенные транскрипты и аттестаты',
        'Пригласите преподавателей отправить рекомендации по email',
        'Загрузите сертификаты IELTS Academic (6.5+) или TOEFL iBT (83+)',
        'Оплатите пошлину в размере $80 и следите за отбором'
      ],
      tuition: 'Бесплатно (при поддержании среднего балла GPA выше 2.7 по корейской 4.3 шкале)',
      financialAid: 'Полный грант со стипендией Global KAIST (100% контракт + $300 ежемесячно + мед. страховка)'
    }
  },
  de: {
    'wiut-uz': {
      name: 'Westminster International University in Taschkent (WIUT)',
      city: 'Taschkent',
      description: 'Die erste in Taschkent gegründete internationale Universität in Partnerschaft mit der University of Westminster (UK). Lokal hoch angesehen für Finanzen, Wirtschaft und IT.',
      popularMajors: ['Betriebswirtschaftslehre', 'Wirtschaftsrecht', 'Finanzen', 'Wirtschaftsinformatik'],
      tips: [
        'Bewerben Sie sich frühzeitig im März/April, um sich einen Platz in der kostenlosen staatlich geförderten Stipendienquote zu sichern.',
        'Reichen Sie das IELTS-Zertifikat so schnell wie möglich ein; eine Punktzahl von 6.0+ befreit von der internen Matheprüfung.',
        'Bereiten Sie sich auf die interne WIUT-Matheprüfung vor, wenn Sie keinen SAT haben.'
      ],
      applicationSteps: [
        'Registrieren Sie sich im WIUT-Zulassungsportal (admission.wiut.uz)',
        'Laden Sie das 11-jährige Schul-, Lyzeums- oder Kollegdiplom hoch',
        'Laden Sie das IELTS-Zertifikat hoch (mindestens 5.5, Schreiben min. 5.0)',
        'Bestehen Sie die interne WIUT-Mathematikprüfung (oder laden Sie den SAT mit 550+ in Math hoch)',
        'Erhalten Sie das offizielle Angebot und unterschreiben Sie den Vertrag'
      ],
      tuition: '$3.200 / Jahr',
      financialAid: 'Regierung & WIUT-Stipendien (Deckt 100% für Top-Abiturienten)'
    },
    'sapienza-it': {
      name: 'Sapienza-Universität von Rom',
      city: 'Rom',
      description: 'Eine der ältesten und größten Universitäten Europas, im Herzen von Rom gelegen. Bekannt für exzellente englischsprachige Bachelorstudiengänge mit sehr niedrigen Studiengebühren und reichhaltigen regionalen Stipendienprogrammen.',
      popularMajors: ['Global Humanities', 'Applied Computer Science', 'Sustainable Building Engineering', 'Bioinformatics'],
      tips: [
        'Da usbekische Schulen 11 Jahre dauern, MÜSSEN Sie entweder: einen 1-jährigen Foundation-Kurs machen, 1 Jahr an einer usbekischen Universität studieren oder ein 12-jähriges Lyzeums-/Kollegdiplom besitzen.',
        'Bewerben Sie sich während des Auswahlverfahrens (normalerweise November - Februar) für eine frühe Zulassung.',
        'Bewerben Sie sich im Juli für das LazioDisco-Stipendium, sobald Sie die Zusage haben.'
      ],
      applicationSteps: [
        'Wählen Sie Ihr englischsprachiges Programm im Sapienza-Portal',
        'Reichen Sie Zeugnisse und Sprachzertifikate ein (IELTS 6.0+)',
        'Zahlen Sie die Bewerbungsgebühr von €30 und senden Sie das Formular zur Vorauswahl',
        'Schließen Sie den obligatorischen CISIA-Online-Test ab, falls angefordert',
        'Schließen Sie die Universitaly-Vorregistrierung für das Visum ab'
      ],
      tuition: '€1.000 - €2.900 / Jahr',
      financialAid: 'LazioDisco-Regionalstipendium (Deckt 100% Studiengebühren + €6.000/Jahr Stipendium)'
    },
    'tum-de': {
      name: 'Technische Universität München (TUM)',
      city: 'München',
      description: 'Erstklassige technische Universität in Europa, berühmt für Ingenieurwesen, Informatik und Unternehmertum. Bietet erstklassige Ausbildung für praktisch null Studiengebühren.',
      popularMajors: ['Management and Technology', 'Aerospace Engineering', 'Mathematik', 'Informatik'],
      tips: [
        'Normalerweise müssen Absolventen der usbekischen 11-jährigen Oberschule ein einjähriges Studienkolleg besuchen, bevor sie anfangen können, oder ein bis zwei Jahre in Usbekistan studieren.',
        'Deutsch ist für rein englischsprachige Studiengänge nicht erforderlich, aber Grundkenntnisse (A2/B1) werden dringend empfohlen.',
        'Das deutsche Visum erfordert ein Sperrkonto von derzeit ca. €11.208 zur Existenzsicherung.'
      ],
      applicationSteps: [
        'Prüfen Sie die Kompatibilität des usbekischen Diploms via uni-assist',
        'Registrieren Sie sich im TUMonline-Portal und laden Sie die Dokumente hoch',
        'Reichen Sie IELTS Academic 6.5+ (oder TOEFL-Equivalent) ein',
        'Reichen Sie das von uni-assist ausgestellte VPD-Dokument ein',
        'Nehmen Sie am Online-Interview oder Eignungsverfahren teil'
      ],
      tuition: 'Gebührenfrei (Nur €150/Semester Verwaltungsbeitrag)',
      financialAid: 'DAAD-Stipendien und Werkstudentenprogramme'
    },
    'harvard-us': {
      name: 'Harvard-Universität',
      city: 'Cambridge, MA',
      description: 'Weltberühmte Ivy-League-Institution. Sie ist vollständig bedarfsorientiert (need-blind), d. h., wenn ein usbekischer Student angenommen wird, übernimmt Harvard alle Kosten (Studiengebühren, Unterkunft, Verpflegung und Flüge), falls die Familie es sich nicht leisten kann.',
      popularMajors: ['Informatik', 'Wirtschaftswissenschaften', 'Regierungswissenschaft', 'Molekularbiologie'],
      tips: [
        'Konzentrieren Sie sich intensiv auf außerschulische Aktivitäten und reale Projekte. Perfekte Noten und SAT-Ergebnisse sind nur die Basis.',
        'Bewerben Sie sich bis zum 1. November (Early Action), um Ihre Chancen signifikant zu verbessern.',
        'Kontaktieren Sie usbekische Alumni an Ivy-League-Schulen für Essay-Feedback.'
      ],
      applicationSteps: [
        'Erstellen Sie das Profil auf CommonApp.org',
        'Schreiben Sie den Haupt-Essay + die kurzen Harvard-Zusatzezssays',
        'Reichen Sie Zeugnisse ein (usbekische 11-jährige Schulzeugnisse werden akzeptiert)',
        'Laden Sie den IELTS Academic (7.5+) und einen exzellenten SAT/ACT hoch (SAT 1500+ empfohlen)',
        'Reichen Sie Empfehlungsschreiben von Fachlehrern ein',
        'Absolvieren Sie das Online-Interview mit regionalen Alumni, falls kontaktiert'
      ],
      tuition: '$57.200 / Jahr',
      financialAid: '100% Need-Blind (Harvard deckt die vollen Kosten, wenn das Familieneinkommen unter $85.000/Jahr liegt)'
    },
    'bocconi-it': {
      name: 'Bocconi-Universität',
      city: 'Mailand',
      description: 'Eine der besten Wirtschaftsuniversitäten in Europa. Absolventen usbekischer Lyzeen oder Kollegs mit 12 Jahren Vorbildung können direkt einsteigen.',
      popularMajors: ['International Economics and Management', 'Fintech', 'Mathematical & Computing Sciences for AI', 'Economics & Social Sciences'],
      tips: [
        'Reichen Sie das SAT-Ergebnis anstelle des internen Bocconi-Onlinetests ein, da SAT-Ergebnisse oft günstiger bewertet werden.',
        'Verfassen Sie ein starkes Motivationsschreiben für quantitative Wirtschaftswissenschaften.',
        'Die ISU-Studienbeihilfe basiert auf den usbekischen Finanznachweisen und ermöglicht erhebliche Ermäßigungen.'
      ],
      applicationSteps: [
        'Bewerben Sie sich über das My Application Portal von Bocconi',
        'Reichen Sie Schulzeugnisse der Klassen 10, 11 (und 12 für Lyzeen) ein',
        'Laden Sie IELTS 6.0+ hoch',
        'Reichen Sie das SAT-Ergebnis ein oder absolvieren Sie den Bocconi-Zulassungstest',
        'Laden Sie Lebenslauf und ein einseitiges Motivationsschreiben hoch'
      ],
      tuition: '€14.700 / Jahr',
      financialAid: 'Bocconi Merit Award (100% oder 50% Gebührenerlass) & ISU-Gebührenbefreiung'
    },
    'ucl-uk': {
      name: 'University College London (UCL)',
      city: 'London',
      description: 'Eine der Top-10-Universitäten weltweit mit Sitz direkt in der Londoner Innenstadt. Bietet ein exzellentes Wissenschaftsnetzwerk bei gleichzeitig sehr kompetitiven Hürden.',
      popularMajors: ['Architektur', 'Informatik', 'Wirtschaftswissenschaften', 'Biomedizinische Wissenschaften'],
      tips: [
        'Das usbekische 11-jährige Schuldiplom berechtigt nicht zum Direkteinstieg. Sie MÜSSEN das einjährige UCL-UPC-Foundation-Programm absolvieren.',
        'UCL nutzt das UCAS-System; Sie können bis zu 5 Studiengänge in ganz Großbritannien auswählen.',
        'Zeigen Sie akademische Exzellenz; UCL bewertet Personal Statements und Notenprognosen über alles andere.'
      ],
      applicationSteps: [
        'Registrieren und bewerben Sie sich über das UCAS-Portal (ucas.com)',
        'Laden Sie das UCAS Personal Statement hoch',
        'Fügen Sie ein detailliertes Lehrerempfehlungsschreiben bei',
        'Weisen Sie IELTS Academic mit mindestens 7.0 oder mehr nach',
        'Bewerben Sie sich direkt für das UCL UPC Foundation-Programm, falls Sie kein IB/A-Level besitzen'
      ],
      tuition: '£26.000 - £35.000 / Jahr',
      financialAid: 'Sehr wettbewerbsintensive Teilstipendien (UCL Global Undergraduate Scholarship)'
    },
    'yonsei-kr': {
      name: 'Yonsei-Universität (UIC)',
      city: 'Seoul',
      description: 'Führende Elite-Universität in Korea (SKY-Gruppe). Das Underwood International College (UIC) ist ein rein englischsprachiges College von Yonsei, das bei zentralasiatischen Studenten hoch im Kurs steht.',
      popularMajors: ['Comparative Literature', 'Economics', 'Life Science and Biotechnology', 'Information & Interaction Design'],
      tips: [
        'Für die Bewerbung oder den Abschluss an der UIC sind keine Koreanischkenntnisse erforderlich, aber grundlegendes Koreanisch hilft bei der Integration.',
        'Stellen Sie hervorragende Empfehlungsschreiben zur Verfügung.',
        'Reichen Sie optionale SAT-Ergebnisse (z. B. 1350+) ein, um Ihre Chancen auf großzügige Stipendien drastisch zu erhöhen.'
      ],
      applicationSteps: [
        'Füllen Sie die Bewerbung über die UIC-Website oder CommonApp aus',
        'Reichen Sie Zeugnisse und das usbekische Schulabschlusszeugnis ein',
        'Senden Sie offizielle IELTS Academic-Ergebnisse (6.5+) an das Institut',
        'Reichen Sie zwei Empfehlungsschreiben und die erforderlichen Essays ein',
        'Nehmen Sie am 10-minütigen telefonischen oder Zoom-Interview teil'
      ],
      tuition: '$6.200 / Semester',
      financialAid: 'UIC Admissions-Stipendium (30%, 50% oder 100% Studiengebührendeckung für die vollen 4 Jahre)'
    },
    'constructor-de': {
      name: 'Constructor University',
      city: 'Bremen',
      description: 'Eine private, englischsprachige Universität in Deutschland. Sehr beliebt bei usbekischen Lyzeumskandidaten, da ein direkter Einstieg (ohne Studienkolleg) möglich ist.',
      popularMajors: ['Informatik', 'Robotik', 'Global Economics and Management', 'Biochemie'],
      tips: [
        'Da es sich um eine private Hochschule handelt, können Sie das komplexe Studienkolleg überspringen und direkt ins Studium starten.',
        'Fast jeder zugelassene Student erhält je nach Schulnoten eine automatische Gebührenreduzierung von €5.000 bis €10.000.',
        'Nutzen Sie auch die Winter-Webbewerbungsfristen, falls Sie die Sommerfrist verpasst haben.'
      ],
      applicationSteps: [
        'Füllen Sie die Bewerbung auf der CommonApp-Website aus',
        'Laden Sie Zeugnisse mit der Notenübersicht hoch',
        'Senden Sie den IELTS-Nachweis (6.0+) oder bitten Sie um Befreiung, wenn das Lyzeum englischsprachig war',
        'Reichen Sie ein Empfehlungsschreiben ein',
        'Füllen Sie den Finanzhilfe-Rechner aus, um zusätzliche Teilstipendien zu beantragen'
      ],
      tuition: '€20.000 / Jahr',
      financialAid: 'Automatische leistungsbezogene Studiengebührenermäßigungen + Finanzhilfen'
    },
    'usf-us': {
      name: 'University of South Florida (USF)',
      city: 'Tampa, FL',
      description: 'Eine große, moderne staatliche Forschungsuniversität in Florida, die usbekischen Studierenden mit guten SAT-Ergebnissen herausragende Stipendien bietet.',
      popularMajors: ['Maschinenbau', 'Finanzen', 'Informatik', 'Biomedizinische Wissenschaften'],
      tips: [
        'Öffentliche Universitäten in Florida verlangen zwingend ein SAT- oder ACT-Ergebnis; ein Direkteinstieg ist ohne dieses nicht möglich.',
        'Stipendienstufen: Ein Notenschnitt von 3.9+ & ein SAT von 1340+ bedeuten automatisch $12.000 Förderung im Jahr, womit USF preiswerter als WIUT wird!',
        'Bewerben Sie sich vor dem 15. Januar, um für Stipendiengelder berücksichtigt zu werden.'
      ],
      applicationSteps: [
        'Bewerben Sie sich über das USF Institutional Portal oder die Common App',
        'Tragen Sie Ihre Kurse und Noten über das SSAR-System ein',
        'Senden Sie offizielle SAT- oder ACT-Berichte (Ziel-SAT: 1250+)',
        'Laden Sie den IELTS-Nachweis 6.5+ hoch',
        'Bezahlen Sie die Bewerbungsgebühr von $30'
      ],
      tuition: '$17.300 / Jahr (Auswärtsgebühr)',
      financialAid: 'USF Green & Gold President-Stipendium (Bis zu $12.000/Jahr)'
    },
    'kaist-kr': {
      name: 'KAIST (Korea Advanced Institute of Science & Tech)',
      city: 'Daejeon',
      description: 'Südkoreas führendes naturwissenschaftlich-technisches Institut. Ein vollständiges Vollstipendium macht es bei Absolventen usbekischer Spezialschulen extrem begehrt.',
      popularMajors: ['Informatik', 'Elektrotechnik', 'Maschinenbau', 'Kognitionsbiologie und Brain Engineering'],
      tips: [
        'Bereiten Sie sehr starke Empfehlungsschreiben Ihrer MINT-Fachlehrer (Mathe, Physik oder Informatik) vor.',
        'IELTS ist Pflicht, aber vor allem Auszeichnungen bei Wissenschaftsolympiaden oder Programmier-Hacks ebnen den Weg.',
        'Fügen Sie ein Zeugnisprofil Ihrer Schule bei, um dem Komitee das anspruchsvolle Lernumfeld zu verdeutlichen.'
      ],
      applicationSteps: [
        'Melden Sie sich im KAIST International Admission Portal an',
        'Füllen Sie die Bewerbung aus und verfassen Sie 3 Essays',
        'Laden Sie beglaubigte Zeugnisse hoch (usbekische Dokumente werden direkt akzeptiert)',
        'Lassen Sie Empfehlungsschreiben von Ihren Lehrern senden',
        'Weisen Sie IELTS (6.5+) oder TOEFL iBT (83+) nach',
        'Zahlen Sie die Bewerbungsgebühr von $80'
      ],
      tuition: 'Gebührenfrei (Unterstützt für alle, die eine Notenpunktzahl von über 2.7/4.3 halten)',
      financialAid: 'Global KAIST-Vollstipendium (100% Studiengebührendeckung + $300 monatliche Barbeihilfe)'
    }
  }
};

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'UniPath Uzbekistan',
    navAcademicProfile: 'Academic Settings',
    readyText: 'Benchmark Configured',
    heroPreTag: 'Dynamic Decision Tool',
    heroTitle: 'Find universities you can apply to from Uzbekistan',
    heroSubtitle: 'Configure your academic parameters and get real-time eligibility calculations, custom application checklists, and structural insights tailored to Uzbek students.',
    searchPlaceholder: 'Search by university, city, or favorite major...',
    searchTrigger: 'Search',
    categoryShortcuts: 'University Categories:',
    cat_all: 'All Categories',
    cat_ivy_elite: 'Elite Ivy & Global',
    cat_stem_tech: 'STEM & Tech',
    cat_business_finance: 'Business & Finance',
    cat_europe_low_tuition: 'European Low-Fee',
    cat_asian_top: 'Asian Tier-1',
    cat_local_joint: 'Local & Joint',
    filterAll: 'All Categories',
    filterLabel: 'Filter by Country',
    searchResults: 'Search Results',
    allCountries: 'All Countries',
    showingPrograms: 'Showing {count} programs according to your criteria',
    noResults: 'No universities found',
    noResultsDesc: "We couldn't find matches. Try clearing some search letters or adjust filters.",
    resetSearch: 'Reset Search',
    backToUniversities: 'Back to Universities',
    admissionsVerdict: 'Admissions Verdict',
    eligibleHeader: 'You are eligible to apply!',
    conditionalHeader: 'Conditional pathway found!',
    notEligibleHeader: 'Admissions criteria not yet met',
    descriptionHeader: 'Aesthetic Campus Biography & Degrees',
    popularMajorsHeader: 'Popular Degrees & Careers:',
    requirementsHeader: 'Academic Requirements & Rankings',
    gpaTarget: 'GPA Target Competitiveness',
    ieltsTarget: 'Minimum IELTS Academic',
    satTarget: 'Required SAT Score',
    tuitionHeader: 'Estimated Cost (Tuition)',
    financialAidHeader: 'Financial Support & Aid',
    diplomaLegalityHeader: 'Uzbek Diploma Legality',
    evaluationDesc: 'Information regarding how the Ministry of Education in {country} evaluates diplomas issued by schools and lyceums inside Uzbekistan.',
    acceptanceStatus: 'Acceptance Status',
    foundationRequired: 'Foundation Year Required?',
    foundationYes: 'Yes — Compulsory preparatory program required (e.g. Studienkolleg)',
    foundationNo: 'No — Direct entry to year 1 is fully available',
    insiderTips: 'Insider Tips for Uzbek Students',
    interactiveRoadmaps: 'Interactive Roadmaps',
    customRoadmap: 'Custom Application Roadmap',
    checklistSubtitle: 'Tailored to your current credentials. Complete steps to build a premium international admissions portfolio:',
    developedBy: 'UniPath Uzbekistan — Elite Educational Decision Engine',
    footerSlogan: 'Designed strictly to help Uzbek students make instant premium educational decisions. No clutter.',
    diplomaTypeSchool: '11-Year School (Middle)',
    diplomaTypeLyceum: '12-Year Academic Lyceum',
    diplomaTypeCollege: '12-Year Vocational College',
    diplomaTypeIB: 'International (IB/AP)',
    quickSetup: 'Quick Setup:',
    avgStudent: 'Avg School Student',
    lyceumAchiever: 'Lyceum Achiever',
    presidentGrad: 'Ivy / President Grad',
    academicSettings: 'My Academic Profile Settings',
    closeSettings: 'Close Panel',
    ieltsExplain: 'IELTS measures listening, reading, writing, and speaking. Most standard degrees request 6.0 - 6.5.',
    satLabel: 'SAT Score',
    satTaken: 'I have taken the SAT test',
    noSat: 'No SAT score registered',
    pts: 'pts',
    gpaScale: 'GPA Scale',
    currentLabel: 'Current:',
    usScale: 'US Scale Equivalent:',
    telegramChannel: 'Telegram Channel',
    telegramButtonText: 'Join @unipath_uz'
  },
  uz: {
    appTitle: 'UniPath Uzbekistan',
    navAcademicProfile: 'Akademik Sozlamalar',
    readyText: 'Profil Sozlandi',
    heroPreTag: 'Dinamik Qaror Qabul Qilish Tizimi',
    heroTitle: 'Oʻzbekistondan turib qaysi xalqaro universitetlarga kira olishingizni biling',
    heroSubtitle: 'Akademik koʻrsatkichlaringizni kiriting va real vaqt rejimida qabul imkoniyatlarini, maxsus tayyorgarlik rejalarini va Oʻzbekiston litseylari uchun moʻljallangan tahlillarni oling.',
    searchPlaceholder: 'Universitet nomi, shahar yoki yoʻnalish boʻyicha qidirish...',
    searchTrigger: 'Izlash',
    categoryShortcuts: 'Universitet Yoʻnalishlari:',
    cat_all: 'Barcha turlar',
    cat_ivy_elite: 'Ivy Ligasi va Elita',
    cat_stem_tech: 'STEM va IT',
    cat_business_finance: 'Biznes va Moliya',
    cat_europe_low_tuition: 'Yevropa: Tekin va Arzon',
    cat_asian_top: 'Osiyo Top-100',
    cat_local_joint: 'Toshkentdagi Xalqaro',
    filterAll: 'Barcha turlar',
    filterLabel: 'Davlat boʻyicha saralash',
    searchResults: 'Qidiruv Natijalari',
    allCountries: 'Barcha Davlatlar',
    showingPrograms: 'Sizning koʻrsatkichlaringizga mos keladigan {count} ta ta’lim dasturi koʻrsatilmoqda',
    noResults: 'Hech qanday universitet topilmadi',
    noResultsDesc: 'Kiritilgan kalit soʻzlarga mos muassasa mavjud emas. Filtrlarni oʻzgartirib koʻring.',
    resetSearch: 'Qidirishni Tozalash',
    backToUniversities: 'Universitetlarga Qaytish',
    admissionsVerdict: 'Qabul Boʻyicha Verdict',
    eligibleHeader: 'Hujjat topshirishga toʻliq loyiqsiz!',
    conditionalHeader: 'Shartli ravishda imkoniyat bor!',
    notEligibleHeader: 'Hozirgi vaqtda qabul mezonlari yetarli emas',
    descriptionHeader: 'Universitet Hayoti va Oʻqish Dasturlari',
    popularMajorsHeader: 'Ommabop Yoʻnalishlar va Kasblar:',
    requirementsHeader: 'Akademik Talablar va Jahon Reytingi',
    gpaTarget: 'Raqobatli GPA Bahosi',
    ieltsTarget: 'IELTS Academic Kamida',
    satTarget: 'Talab Etilgan SAT Balli',
    tuitionHeader: 'Taxminiy Oʻqish Kontrakti',
    financialAidHeader: 'Moliyaviy Yordam va Grantlar',
    diplomaLegalityHeader: 'Oʻzbekiston Diplomi Haqiqiyligi',
    evaluationDesc: 'Oʻzbekistondagi maktab va litseylar tomonidan berilgan diplomlar {country} Ta’lim Vazirligi tomonidan qanday baholanishishi haqida ma’lumot.',
    acceptanceStatus: 'Qabul Qilinish Holati',
    foundationRequired: 'Tayyorlov (Foundation) Yili Shartmi?',
    foundationYes: 'Ha — Majburiy tayyorlov dasturini (masalan Studienkolleg) oʻqish zarur',
    foundationNo: 'Yoʻq — Toʻgʻridan-toʻgʻri 1-kursga qabul qilish toʻliq mavjud',
    insiderTips: 'Oʻzbekistonliklar Uchun Maxsus Maslahatlar',
    interactiveRoadmaps: 'Interaktiv Yoʻl Xaritalari',
    customRoadmap: 'Shaxsiy Hujjat Topshirish Rejasi',
    checklistSubtitle: 'Hozirgi natijalaringizga asoslangan. Mukammal xalqaro hujjatlar paketini tayyorlash boʻyicha bosqichlarni bajaring:',
    developedBy: 'UniPath Uzbekistan — Oʻzbekiston Yoshlari Uchun Elita Qaror Portali',
    footerSlogan: 'Oʻzbekistonlik talabalarga tezkor hamda tushunarli ta’limiy qarorlar qabul qilishda yordam berish maqsadida yaratilgan.',
    diplomaTypeSchool: '11-Yillik Maktab (Oʻrta)',
    diplomaTypeLyceum: '12-Yillik Akademik Litsey',
    diplomaTypeCollege: '12-Yillik Kasb-Hunar Kolleji',
    diplomaTypeIB: 'Xalqaro (IB/AP) Dasturlar',
    quickSetup: 'Tezkor Sozlash:',
    avgStudent: 'Oddiy Maktab Oʻquvchisi',
    lyceumAchiever: 'Litsey Iqtidorli Talabasi',
    presidentGrad: 'Prezident Maktabi / Ivy Tizimi',
    academicSettings: 'Mening Akademik Profilim Sozlamalari',
    closeSettings: 'Panelni Yopish',
    ieltsExplain: 'IELTS eshitish, oʻqish, yozish va soʻzlashish koʻnikmalarini baholaydi. Aksariyat universitetlar 6.0 - 6.5 talab qilishadi.',
    satLabel: 'SAT Test Balli',
    satTaken: 'Men SAT imtihonini topshirganman',
    noSat: 'SAT natijasi kiritilmagan',
    pts: 'ball',
    gpaScale: 'GPA Shkalasi',
    currentLabel: 'Hozirgi:',
    usScale: 'Ekshvivalent (AQSh shkalasida):',
    telegramChannel: 'Telegram Kanalimiz',
    telegramButtonText: 'Kanalga a’zo boʻlish @unipath_uz'
  },
  ru: {
    appTitle: 'UniPath Uzbekistan',
    navAcademicProfile: 'Академические Настройки',
    readyText: 'Профиль Настроен',
    heroPreTag: 'Динамический Калькулятор Поступления',
    heroTitle: 'Узнайте, в какие зарубежные вузы вы можете поступить из Узбекистана',
    heroSubtitle: 'Введите свои текущие оценки и баллы IELTS/SAT, чтобы получить мгновенный расчет шансов, индивидуальный план поступления и анализ соответствия узбекских дипломов.',
    searchPlaceholder: 'Поиск по университету, городу или специальности...',
    searchTrigger: 'Искать',
    categoryShortcuts: 'Категории Вузов:',
    cat_all: 'Все категории',
    cat_ivy_elite: 'Лига Плюща и Элита',
    cat_stem_tech: 'STEM и АйТи',
    cat_business_finance: 'Бизнес и Финансы',
    cat_europe_low_tuition: 'Европа (Доступное обучение)',
    cat_asian_top: 'Азиатские Топ-вузы',
    cat_local_joint: 'Международные в Ташкенте',
    filterAll: 'Все категории',
    filterLabel: 'Фильтровать по стране',
    searchResults: 'Результаты Поиска',
    allCountries: 'Все Страны',
    showingPrograms: 'Показано {count} учебных заведений по вашим параметрам',
    noResults: 'Университеты не найдены',
    noResultsDesc: 'По вашему запросу ничего не найдено. Попробуйте изменить параметры фильтра или поисковый запрос.',
    resetSearch: 'Сбросить Фильтры',
    backToUniversities: 'Назад к Университетам',
    admissionsVerdict: 'Вердикт Поступления',
    eligibleHeader: 'Вы полностью подходите для подачи документов!',
    conditionalHeader: 'Найден условный путь поступления!',
    notEligibleHeader: 'Критерии приема пока не выполнены',
    descriptionHeader: 'Информация об Университете и Специальностях',
    popularMajorsHeader: 'Популярные Направления и Карьера:',
    requirementsHeader: 'Академические Требования и Мировые Рейтинги',
    gpaTarget: 'Конкурентный Средний Балл (GPA)',
    ieltsTarget: 'Минимальный балл IELTS Academic',
    satTarget: 'Требуемый балл SAT Test',
    tuitionHeader: 'Примерная Стоимость Контракта',
    financialAidHeader: 'Финансовая Помощь и Стипендии',
    diplomaLegalityHeader: 'Признание Узбекских Дипломов',
    evaluationDesc: 'Информация о том, как Министерство образования в {country} оценивает дипломы и аттестаты, выданные в школах и лицеях Узбекистана.',
    acceptanceStatus: 'Статус признания аттестата',
    foundationRequired: 'Требуется ли подготовительный год (Foundation)?',
    foundationYes: 'Да — Обязателен подготовительный год (например, Studienkolleg)',
    foundationNo: 'Нет — Возможен прямой доступ к первому курсу бакалавриата',
    insiderTips: 'Советы для Абитуриентов из Узбекистана',
    interactiveRoadmaps: 'Интерактивные Планы',
    customRoadmap: 'Индивидуальный План Поступления',
    checklistSubtitle: 'Составлен под ваши текущие оценки. Выполните шаги ниже для сбора идеального пакета аппликанта:',
    developedBy: 'UniPath Uzbekistan — Навигационная Система Международного Образования',
    footerSlogan: 'Создано исключительно для мгновенной помощи узбекским абитуриентам в выборе идеального пути развития.',
    diplomaTypeSchool: '11-Летняя Школа (Обычная)',
    diplomaTypeLyceum: '12-Летний Академический Лицей',
    diplomaTypeCollege: '12-Летний Профессиональный Колледж',
    diplomaTypeIB: 'Международная программа (IB/AP)',
    quickSetup: 'Быстрый Профиль:',
    avgStudent: 'Средний Школьник',
    lyceumAchiever: 'Успешный Лицеист',
    presidentGrad: 'Выпускник Президентских Школ',
    academicSettings: 'Настройки Моего Академического Профиля',
    closeSettings: 'Закрыть Панель',
    ieltsExplain: 'IELTS измеряет аудирование, чтение, письмо и говорение. Стандартное требование для бакалавра: 6.0 - 6.5.',
    satLabel: 'Тест SAT',
    satTaken: 'Я сдавал тест SAT',
    noSat: 'Балл SAT не зарегистрирован',
    pts: 'баллов',
    gpaScale: 'Шкала GPA',
    currentLabel: 'Текущий:',
    usScale: 'Эквивалент в шкале США (из 4.0):',
    telegramChannel: 'Telegram Канал',
    telegramButtonText: 'Присоединиться к @unipath_uz'
  },
  de: {
    appTitle: 'UniPath Uzbekistan',
    navAcademicProfile: 'Akademische Einstellungen',
    readyText: 'Profil Konfiguriert',
    heroPreTag: 'Dynamisches Entscheidungstool',
    heroTitle: 'Finden Sie Universitäten, an denen Sie sich aus Usbekistan bewerben können',
    heroSubtitle: 'Geben Sie Ihre akademischen Leistungen ein und erhalten Sie Echtzeit-Zulassungsberechnungen, personalisierte Bewerbungspläne und spezifische Einblicke für usbekische Schüler.',
    searchPlaceholder: 'Nach Universität, Stadt oder Fachrichtung suchen...',
    searchTrigger: 'Suchen',
    categoryShortcuts: 'Kategorien:',
    cat_all: 'Alle Kategorien',
    cat_ivy_elite: 'Ivy League & Elite Global',
    cat_stem_tech: 'MINT & Technologie',
    cat_business_finance: 'Business & Finanzen',
    cat_europe_low_tuition: 'Europa (Günstig/Gebührenfrei)',
    cat_asian_top: 'Asien Top-Rank',
    cat_local_joint: 'Joint-Venture in Taschkent',
    filterAll: 'Alle Kategorien',
    filterLabel: 'Nach Land filtern',
    searchResults: 'Suchergebnisse',
    allCountries: 'Alle Länder',
    showingPrograms: '{count} passende Studienprogramme nach Ihren Kriterien angezeigt',
    noResults: 'Keine Universitäten gefunden',
    noResultsDesc: 'Wir konnten keine passenden Treffer finden. Versuchen Sie, Ihre Suche anzupassen oder die Filter zurückzusetzen.',
    resetSearch: 'Suche Zurücksetzen',
    backToUniversities: 'Zurück zur Übersicht',
    admissionsVerdict: 'Zulassungsentscheidung',
    eligibleHeader: 'Sie sind direkt bewerbungsberechtigt!',
    conditionalHeader: 'Bedingter Pathway-Weg verfügbar!',
    notEligibleHeader: 'Zulassungskriterien aktuell nicht erfüllt',
    descriptionHeader: 'Campus-Biographie & Studiengänge',
    popularMajorsHeader: 'Beliebte Studiengänge und Berufe:',
    requirementsHeader: 'Akademische Anforderungen & Weltranglisten',
    gpaTarget: 'Gewünschter GPA-Notenschnitt',
    ieltsTarget: 'IELTS Academic (Mindestens)',
    satTarget: 'Erforderliche SAT-Punktzahl',
    tuitionHeader: 'Geschätzte Studiengebühren',
    financialAidHeader: 'Finanzielle Hilfe & Stipendien',
    diplomaLegalityHeader: 'Anerkennung usbekischer Abschlüsse',
    evaluationDesc: 'Informationen darüber, wie das Bildungsministerium in {country} usbekische Schul- und Lyzeumsdiplome bewertet und einstuft.',
    acceptanceStatus: 'Anerkennungsstatus des Diploms',
    foundationRequired: 'Vorbereitungsjahr (Foundation) erforderlich?',
    foundationYes: 'Ja — Ein Vorbereitungssemester bzw. Studienkolleg ist verpflichtend',
    foundationNo: 'Nein — Direkter Einstieg ins erste Studienjahr ist voll verfügbar',
    insiderTips: 'Spezielle Insider-Tipps für usbekische Bewerber',
    interactiveRoadmaps: 'Interaktive Zeitpläne',
    customRoadmap: 'Persönliche Bewerbungs-Roadmap',
    checklistSubtitle: 'Maßgeschneidert auf Ihre Noten. Befolgen Sie diese Schritte für eine erfolgreiche internationale Bewerbung:',
    developedBy: 'UniPath Uzbekistan — Premium-Navigationsportal für usbekische Studenten',
    footerSlogan: 'Speziell entwickelt, um usbekischen Studierenden fundierte und schnelle Bildungsentscheidungen zu ermöglichen.',
    diplomaTypeSchool: '11-jährige Allgemeinbildende Schule',
    diplomaTypeLyceum: '12-jähriges Akademisches Lyzeum',
    diplomaTypeCollege: '12-jähriges Berufskolleg',
    diplomaTypeIB: 'Internationaler Abschluss (IB/AP)',
    quickSetup: 'Schnelleinstellungen:',
    avgStudent: 'Durchschnittsschüler',
    lyceumAchiever: 'Lyzeums-Leistungsträger',
    presidentGrad: 'Präsidentenschul-Niveau / Ivy-Kandidat',
    academicSettings: 'Einstellungen meines Notenprofils',
    closeSettings: 'Schließen',
    ieltsExplain: 'IELTS misst Hörverstehen, Lesen, Schreiben und Sprechen. Typischerweise wird eine Punktzahl von 6.0 bis 6.5 verlangt.',
    satLabel: 'SAT-Punktzahl',
    satTaken: 'Ich habe das SAT-Test absolbiert',
    noSat: 'Kein SAT-Ergebnis gespeichert',
    pts: 'Punkte',
    gpaScale: 'Notenskala (GPA)',
    currentLabel: 'Aktuell:',
    usScale: 'Equivalent im US-System (bis 4.0):',
    telegramChannel: 'Telegram-Kanal',
    telegramButtonText: 'Kanal beitreten @unipath_uz'
  }
};
