export type Language = 'en' | 'ur';

export interface FoundationalPillar {
  id: string;
  order: number;
  titleEn: string;
  titleUr: string;
  descEn: string;
  descUr: string;
  iconName?: string;
}

export interface PageBackgrounds {
  home?: string;
  about?: string;
  education?: string;
  students?: string;
  events?: string;
  food?: string;
  welfare?: string;
  donation?: string;
  qurbani?: string;
  zakat?: string;
  mosque?: string;
  books?: string;
  gallery?: string;
  news?: string;
  contact?: string;
  [key: string]: string | undefined;
}

export interface WebsiteSettings {
  institutionNameEn: string;
  institutionNameUr: string;
  taglineEn: string;
  taglineUr: string;
  addressEn: string;
  addressUr: string;
  city: string;
  country: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  email: string;
  facebookUrl: string;
  youtubeUrl: string;
  googleMapsUrl: string;
  heroImage: string;
  heroBadgeEn: string;
  heroBadgeUr: string;
  heroTitleEn: string;
  heroTitleUr: string;
  heroSubtitleEn: string;
  heroSubtitleUr: string;
  logoUrl?: string;
  primaryColor?: string;
  accentColor?: string;
  heroBgColor?: string;
  bannerNoticeEn?: string;
  bannerNoticeUr?: string;
  pageBackgrounds?: PageBackgrounds;
}

export interface WebsiteStats {
  yearsOfService: number;
  totalStudents: number;
  freeEducationStudents: number;
  freeFoodStudents: number;
  qurbaniYears: number;
  welfareProjects: number;
  mosquesSupported: number;
  booksAvailable: number;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
}

export interface AboutContent {
  historyEn: string;
  historyUr: string;
  missionEn: string;
  missionUr: string;
  visionEn: string;
  visionUr: string;
  educationalObjectivesEn: string[];
  educationalObjectivesUr: string[];
  welfareObjectivesEn: string[];
  welfareObjectivesUr: string[];
  pillars?: FoundationalPillar[];
  milestones: TimelineMilestone[];
  images: string[];
}

export interface EducationProgram {
  id: string;
  titleEn: string;
  titleUr: string;
  category: 'religious' | 'quran' | 'hadith' | 'fiqh' | 'arabic' | 'general' | 'short_course';
  durationEn: string;
  durationUr: string;
  descriptionEn: string;
  descriptionUr: string;
  featuresEn: string[];
  featuresUr: string[];
  keySubjectsEn?: string[];
  keySubjectsUr?: string[];
  eligibilityEn?: string;
  eligibilityUr?: string;
  studentsCount?: number;
  isFreeForDeserving: boolean;
  order: number;
}

export interface FacultyMember {
  id: string;
  nameEn: string;
  nameUr: string;
  designationEn?: string;
  designationUr?: string;
  roleEn?: string;
  roleUr?: string;
  qualificationEn: string;
  qualificationUr: string;
  qualificationsEn?: string[] | string;
  qualificationsUr?: string[] | string;
  bioEn?: string;
  bioUr?: string;
  image: string;
  order?: number;
  phone?: string;
  email?: string;
  isActive?: boolean;
}

export interface Student {
  id: string;
  rollNumber?: string;
  name?: string;
  nameEn?: string;
  nameUr?: string;
  program: string;
  programEn?: string;
  programUr?: string;
  enrollmentYear: number;
  currentYear?: string;
  status: 'free_education' | 'free_food' | 'full_scholarship' | 'regular';
  isSponsored?: boolean;
  hometown?: string;
  hometownEn?: string;
  hometownUr?: string;
  achievements?: string;
  academicPerformance?: string;
  monthlyStipendPkr?: number;
  photoUrl?: string;
  isPublicHighlight?: boolean;
}

export interface WeeklyFoodDay {
  id: string;
  dayEn: string;
  dayUr: string;
  breakfastEn: string;
  breakfastUr: string;
  lunchEn: string;
  lunchUr: string;
  dinnerEn: string;
  dinnerUr: string;
  specialNoteEn?: string;
  specialNoteUr?: string;
  specialNutritionEn?: string;
  specialNutritionUr?: string;
}

export interface FoodSponsorshipPackage {
  id: string;
  nameEn: string;
  nameUr: string;
  amountPkr?: number;
  amountPKR?: number;
  descriptionEn: string;
  descriptionUr: string;
  tagEn?: string;
  tagUr?: string;
  tag?: string;
}

export type WeeklyScheduleDay = WeeklyFoodDay;
export type SponsorshipPackage = FoodSponsorshipPackage;

export interface FoodProgramDetails {
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  dailyMealsCount: number;
  mealsServedPerDay?: number;
  beneficiaryCount: number;
  beneficiariesCount?: number;
  monthlyCostPerStudentPkr: number;
  monthlyCostPerStudent?: number;
  costPerStudentMonthlyPkr?: number;
  monthlyTotalBudgetPkr?: number;
  monthlyBudgetPKR?: number;
  dailyRotiCount?: number;
  dailyRiceKg?: number;
  menuHighlightsEn?: string[];
  menuHighlightsUr?: string[];
  hygieneStandardsEn?: string[];
  hygieneStandardsUr?: string[];
  monthlyInventoryRequired?: any[];
  weeklySchedule?: WeeklyFoodDay[];
  sponsorshipPackages?: FoodSponsorshipPackage[];
  images?: string[];
}

export interface EventItem {
  id: string;
  titleEn: string;
  titleUr: string;
  category: 'Milad & Mahafil' | 'Urs Mubarak' | '14 August & National' | 'Khatm-e-Bukhari & Convocation' | 'Seerat Conference' | 'Husn-e-Qiraat' | 'General Event';
  date: string; // ISO date string e.g. 2026-08-14
  time?: string;
  locationEn: string;
  locationUr: string;
  descriptionEn: string;
  descriptionUr: string;
  images: string[];
  featuredImage: string;
  status: 'upcoming' | 'completed';
  chiefGuestEn?: string;
  chiefGuestUr?: string;
  organizerEn?: string;
  organizerUr?: string;
}

export interface WelfareProject {
  id: string;
  titleEn: string;
  titleUr: string;
  category: 'food' | 'education' | 'financial' | 'family' | 'emergency' | 'mosque' | 'general';
  descriptionEn: string;
  descriptionUr: string;
  locationEn: string;
  locationUr: string;
  date: string;
  status: 'ongoing' | 'completed' | 'planned';
  beneficiariesCount: number;
  images: string[];
  featured: boolean;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  branchName?: string;
  branchCode?: string;
  swiftCode?: string;
  currency?: string;
  accountType?: string;
  notesEn?: string;
  notesUr?: string;
  isPrimary?: boolean;
}

export interface MobilePayment {
  id: string;
  provider: 'JazzCash' | 'EasyPaisa' | 'SadaPay' | 'NayaPay' | 'Raast' | 'Other';
  accountTitle: string;
  accountNumber: string;
  tillId?: string;
  qrCodeImage?: string;
  notes?: string;
}

export interface DonationDetails {
  headingEn: string;
  headingUr: string;
  introEn: string;
  introUr: string;
  bankAccounts: BankAccount[];
  mobilePayments: MobilePayment[];
  instructionsEn: string[];
  instructionsUr: string[];
  contactNumber: string;
  categories: {
    id: string;
    nameEn: string;
    nameUr: string;
    descriptionEn: string;
    descriptionUr: string;
    suggestedAmountsPkr: number[];
  }[];
}

export interface QurbaniAnimalItem {
  id: string;
  nameEn: string;
  nameUr: string;
  type?: 'cow-share' | 'full-cow' | 'goat' | 'sheep' | 'camel-share' | 'full-camel' | 'dumba' | 'other';
  animalType?: string;
  pricePkr?: number;
  costPkr?: number;
  descriptionEn: string;
  descriptionUr: string;
  image?: string;
  imageUrl?: string;
  isPopular?: boolean;
  sharesCount?: number;
  available?: boolean;
  order?: number;
}

export interface QurbaniFeatureItem {
  id: string;
  titleEn: string;
  titleUr: string;
  descEn?: string;
  descUr?: string;
  descriptionEn?: string;
  descriptionUr?: string;
  icon?: string;
}

export interface QurbaniFaqItem {
  id: string;
  questionEn: string;
  questionUr: string;
  answerEn: string;
  answerUr: string;
}

export interface QurbaniCampaign {
  id: string;
  yearHijri: string;
  yearGregorian: number;
  yearsOfServiceTextEn: string; // e.g. "25+ Years of Dedicated Qurbani Service"
  yearsOfServiceTextUr: string;
  titleEn?: string;
  titleUr?: string;
  descriptionEn: string;
  descriptionUr: string;
  headerBackgroundImage?: string;
  animalsSacrificed?: number;
  meatDistributedKg?: number;
  familiesBenefited?: number;
  sharePriceCowPkr?: number;
  sharePriceGoatPkr?: number;
  fullCowPricePkr?: number;
  cowShareCostPkr?: number;
  fullCowCostPkr?: number;
  goatCostPkr?: number;
  animals?: QurbaniAnimalItem[];
  features?: QurbaniFeatureItem[];
  faqs?: QurbaniFaqItem[];
  status: 'active' | 'completed' | 'upcoming';
  images: string[];
}

export interface ZakatQuoteItem {
  id: string;
  type?: 'ayat' | 'hadith' | 'fatwa' | 'note' | string;
  category?: 'quran' | 'hadith' | 'fatwa' | 'note' | string;
  arabicText?: string;
  textUr?: string;
  textEn?: string;
  translationUr?: string;
  translationEn?: string;
  referenceUr?: string;
  referenceEn?: string;
  reference?: string;
  order?: number;
  isActive?: boolean;
}

export interface ZakatNoteItem {
  titleEn: string;
  titleUr: string;
  descEn: string;
  descUr: string;
}

export interface ZakatContent {
  titleEn: string;
  titleUr: string;
  descriptionEn?: string;
  descriptionUr?: string;
  guidelinesEn: string;
  guidelinesUr: string;
  headerBackgroundImage?: string;
  goldRatePerGramPkr?: number;
  silverRatePerGramPkr?: number;
  eligibilityEn: string[];
  eligibilityUr: string[];
  usagePointsEn: string[];
  usagePointsUr: string[];
  quotes?: ZakatQuoteItem[];
  notes?: ZakatNoteItem[];
  disclaimerEn: string;
  disclaimerUr: string;
}

export interface MosqueProject {
  id: string;
  nameEn: string;
  nameUr: string;
  locationEn: string;
  locationUr: string;
  descriptionEn: string;
  descriptionUr: string;
  constructionStatus: 'Planning' | 'Foundation' | 'Structure' | 'Finishing' | 'Completed';
  progressPercentage: number;
  requiredFundingPkr: number;
  amountRaisedPkr: number;
  images: string[];
  contactPerson: string;
  contactPhone: string;
  updates: {
    date: string;
    titleEn: string;
    titleUr: string;
    noteEn: string;
    noteUr: string;
  }[];
}

export interface Book {
  id: string;
  title: string;
  titleUr?: string;
  author: string;
  category: 'Quran' | 'Hadith' | 'Fiqh' | 'Islamic Studies' | 'Arabic' | 'Educational' | 'Other';
  description: string;
  coverImage: string;
  fileUrl: string;
  fileSizeMb?: number;
  pages?: number;
  uploadDate: string;
  downloadCount: number;
  isPublished: boolean;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleUr?: string;
  category: 'Institution' | 'Students' | 'Education' | 'Qurbani' | 'Welfare' | 'Food Distribution' | 'Mosque Projects' | 'Events';
  imageUrl: string;
  date?: string;
  description?: string;
}

export interface NewsItem {
  id: string;
  titleEn: string;
  titleUr: string;
  slug: string;
  category: string;
  summaryEn: string;
  summaryUr: string;
  contentEn: string;
  contentUr: string;
  featuredImage: string;
  date: string;
  isPublished: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface DonationPledge {
  id: string;
  donorName: string;
  isAnonymous?: boolean;
  phone: string;
  email?: string;
  category: string;
  amount?: number;
  currency?: string;
  amountPkr: number;
  exchangeRate?: number;
  paymentMethod: string;
  bankAccountId?: string;
  donorBankName?: string;
  donorAccountNumber?: string;
  donorAccountTitle?: string;
  transactionReference?: string;
  date: string;
  donorCity?: string;
  donorCountry?: string;
  notes?: string;
  receiptNumber?: string;
  status?: string;
}

export interface WebsiteFeedback {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  category: 'General Suggestion' | 'Design & Usability' | 'Content & Information' | 'Islamic Accuracy & Arabic' | 'Mobile & Speed';
  rating: number; // 1 to 5
  message: string;
  pageUrl?: string;
  date: string;
  status: 'new' | 'reviewed' | 'resolved';
}

export interface AppDatabase {
  settings: WebsiteSettings;
  stats: WebsiteStats;
  about: AboutContent;
  educationPrograms: EducationProgram[];
  faculty: FacultyMember[];
  students: Student[];
  foodProgram: FoodProgramDetails;
  welfareProjects: WelfareProject[];
  donationDetails: DonationDetails;
  qurbaniCampaigns: QurbaniCampaign[];
  zakat: ZakatContent;
  mosqueProjects: MosqueProject[];
  books: Book[];
  gallery: GalleryItem[];
  news: NewsItem[];
  events: EventItem[];
  contactMessages: ContactMessage[];
  donationPledges: DonationPledge[];
  feedback?: WebsiteFeedback[];
  admin: {
    username: string;
    passwordHash: string; // SHA-256 / bcrypt hash
    email: string;
    lastLogin?: string;
  };
}
