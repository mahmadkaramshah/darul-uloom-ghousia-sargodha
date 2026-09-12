import { AppDatabase } from '../src/types';
import crypto from 'crypto';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'darululoom_salt_2026').digest('hex');
}

export const defaultDatabase: AppDatabase = {
  settings: {
    institutionNameEn: 'Darul Uloom Muhammadiya Ghousia',
    institutionNameUr: 'دارالعلوم محمدیہ غوثیہ',
    taglineEn: 'Centre for Islamic Learning & Human Welfare Services',
    taglineUr: 'دینی تعلیم و انسانی فلاح و بہبود کا عظیم مرکز',
    addressEn: 'Nawab Colony, Main Sargodha Road, Sargodha, Punjab, Pakistan',
    addressUr: 'نواب کالونی، مین سرگودھا روڈ، سرگودھا، پنجاب، پاکستان',
    city: 'Sargodha',
    country: 'Pakistan',
    phone1: '+92 48 3724500',
    phone2: '+92 300 9601234',
    whatsapp: '+92 300 9601234',
    email: 'info@darululoomghousiasargodha.org',
    facebookUrl: 'https://www.facebook.com/DarulUloomMuhammadiyaGhousiaSargodha',
    youtubeUrl: 'https://www.youtube.com/@DarulUloomGhousiaSargodha',
    googleMapsUrl: 'https://maps.google.com/?q=Nawab+Colony+Sargodha+Pakistan',
    heroImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80',
    heroBadgeEn: 'Established Islamic Educational & Welfare Organization',
    heroBadgeUr: 'معروف دینی و فلاحی ادارہ - نواب کالونی، سرگودھا',
    heroTitleEn: 'Nurturing Faith, Knowledge & Uplifting Humanity',
    heroTitleUr: 'تعلیمِ دین اور خدمتِ خلق کا روشن مینار',
    heroSubtitleEn: 'Providing comprehensive Islamic education, free education and food for deserving boys, annual 25+ years Qurbani projects, Zakat relief, and community mosque construction across Sargodha.',
    heroSubtitleUr: 'مستحق اور نادار طلباء کے لیے مکمل مفت تعلیم و طعام، 25 سالہ مسلسل خدمتِ قربانی، تقسیمِ زکوٰۃ، اور مساجد کی تعمیر و ترقی۔',
    pageBackgrounds: {
      home: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80',
      about: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=80',
      education: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1920&q=80',
      students: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
      events: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80',
      food: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1920&q=80',
      welfare: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1920&q=80',
      donation: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1920&q=80',
      qurbani: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1920&q=80',
      zakat: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80',
      mosque: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=80',
      books: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80',
      gallery: 'https://images.unsplash.com/photo-1590076215667-873d26501193?auto=format&fit=crop&w=1920&q=80',
      news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80',
      contact: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1920&q=80',
    }
  },
  stats: {
    yearsOfService: 28,
    totalStudents: 450,
    freeEducationStudents: 320,
    freeFoodStudents: 380,
    qurbaniYears: 25,
    welfareProjects: 64,
    mosquesSupported: 18,
    booksAvailable: 150
  },
  about: {
    historyEn: 'Darul Uloom Muhammadiya Ghousia was founded with the sacred vision to revive traditional Islamic sciences while actively serving the socio-economic needs of the underprivileged in Nawab Colony and surrounding regions of Sargodha. For over 25 years, the institution has stood as a beacon of genuine spiritual scholarship, holistic tarbiyah, and impactful community welfare.',
    historyUr: 'دارالعلوم محمدیہ غوثیہ کا قیام نواب کالونی سرگودھا میں دینی علوم کے فروغ اور غریب و نادار طبقات کی بے لوث خدمت کے پاکیزہ مقصد کے تحت عمل میں آیا۔ گزشتہ پچیس سے زائد سالوں سے یہ ادارہ علم و عرفان اور خدمت خلق کا قابل فخر استعارہ بن چکا ہے۔',
    missionEn: 'To cultivate righteous scholars (Ulama & Huffaz) steeped in authentic Quranic and Prophetic knowledge, while mobilizing compassionate welfare initiatives that eradicate hunger, support destitute students, and build sacred places of worship.',
    missionUr: 'قرآن و سنت کی روشنی میں باکردار علماء اور حفاظ کی تیاری کے ساتھ ساتھ غریب اور مستحق افراد کی مالی، تعلیمی اور غذائی امداد کے ذریعے ایک فلاحی معاشرے کی تشکیل۔',
    visionEn: 'To be a premier Islamic educational sanctuary recognized for academic excellence, moral integrity, and unconditional humanitarian service for generations to come.',
    visionUr: 'ایک ایسا مثالی اسلامی تعلیمی و فلاحی ادارہ بننا جو علمی پختگی، اخلاقی پاکیزگی اور انسانی ہمدردی میں نمایاں مقام رکھتا ہو۔',
    educationalObjectivesEn: [
      'Provide comprehensive Dars-e-Nizami, Hifz-ul-Quran, and Tajweed disciplines',
      'Offer 100% free tuition, books, boarding, and healthcare for deserving orphans and needy students',
      'Harmonize classical Islamic scholarship with modern character building and Arabic fluency',
      'Train future Imams, Khatibs, and community mentors of high ethical standing'
    ],
    educationalObjectivesUr: [
      'درس نظامی، حفظ القرآن اور تجوید و قرات کی معیاری تعلیم فراہم کرنا',
      'مستحق اور یتیم طلباء کو مکمل مفت تعلیم، کتب، رہائش اور طبی سہولیات دینا',
      'روایتی دینی علوم کے ساتھ جدید اخلاقی تربیت اور عربی زبان میں مہارت پیدا کرنا',
      'اعلیٰ کردار کے حامل ائمہ، خطباء اور دینی رہنما تیار کرنا'
    ],
    welfareObjectivesEn: [
      'Provide daily nutritious fresh meals to boarding students and deserving locals through the Matbakh (Free Kitchen)',
      'Organize annual transparent Qurbani with prompt door-to-door distribution of meat to thousands of impoverished families',
      'Facilitate Shariah-verified Zakat and Sadaqah distribution directly to validated needy families and medical emergencies',
      'Support the construction, expansion, water filtration, and maintenance of rural and urban mosques'
    ],
    welfareObjectivesUr: [
      'دارالعلوم کے مطبخ سے مستحق طلباء اور غریب افراد کو روزانہ تازہ اور معیاری کھانا فراہم کرنا',
      'سالانہ منظم و شفاف اجتماعی قربانی کا انعقاد اور گوشت کی مستحقین تک باعزت ترسیل',
      'مستحق خاندانوں اور ہنگامی ضرورت مندوں میں شرعی اصولوں کے مطابق زکوٰۃ و صدقات کی تقسیم',
      'سرگودھا اور ملحقہ علاقوں میں مساجد کی تعمیر، توسیع اور بنیادی ضروریات کی فراہمی'
    ],
    pillars: [
      {
        id: 'pil-1',
        order: 1,
        titleEn: '100% Free Education & Shelter',
        titleUr: '100٪ مفت دینی تعلیم، کتب و رہائش',
        descEn: 'Zero tuition, free standard textbooks, boarding, uniform, and medical care for deserving, orphan, and needy students.',
        descUr: 'مستحق اور یتیم طلباء کے لیے مکمل طور پر بلامعاوضہ تعلیم، کتب، یونیفارم اور بہترین رہائشی سہولیات۔'
      },
      {
        id: 'pil-2',
        order: 2,
        titleEn: 'Matbakh-e-Ghousia (Dignified Nutrition)',
        titleUr: 'مطبخِ غوثیہ (روزانہ مفت طعام)',
        descEn: 'Freshly prepared 3-time daily nutritious meals and milk for over 380+ residential students with zero financial burden on parents.',
        descUr: 'سینکڑوں طلباء اور مسافروں کے لیے تینوں وقت کا تازہ، لذیذ اور غذائیت سے بھرپور کھانا اور چائے۔'
      },
      {
        id: 'pil-3',
        order: 3,
        titleEn: 'Strict Shariah & Zakat Compliance',
        titleUr: 'مکمل شرعی و مالیاتی شفافیت',
        descEn: 'Every single rupee of Zakat and Sadaqah is audited and distributed strictly in accordance with Hanafi Islamic jurisprudence.',
        descUr: 'زکوٰۃ و صدقات کی شرعی اصولوں کے عین مطابق حقداروں اور مستحق طلباء تک منصفانہ اور شفاف ترسیل۔'
      },
      {
        id: 'pil-4',
        order: 4,
        titleEn: 'Holistic Humanitarian Welfare',
        titleUr: 'ہمہ جہت انسانی خدمت و فلاح',
        descEn: 'Year-round welfare initiatives including 25+ years Qurbani meat distribution, community water plants, and mosque construction.',
        descUr: '25 سالہ مسلسل خدمتِ قربانی، صاف پانی کے فلٹریشن پلانٹس، تعمیرِ مساجد اور نادار خاندانوں کی راشن امداد۔'
      }
    ],
    milestones: [
      {
        id: 'ms-1',
        year: '1998',
        titleEn: 'Foundation Stone Laid',
        titleUr: 'بنیاد کا سنگِ میل',
        descriptionEn: 'The initial foundation of Darul Uloom Muhammadiya Ghousia was established in Nawab Colony, Sargodha, with 2 classrooms and a prayer hall.',
        descriptionUr: 'نواب کالونی سرگودھا میں دو کمروں اور ایک نماز ہال کے ساتھ دارالعلوم کی مبارک بنیاد رکھی گئی۔'
      },
      {
        id: 'ms-2',
        year: '2001',
        titleEn: 'Inauguration of Annual Qurbani Project',
        titleUr: 'سالانہ قربانی پروجیکٹ کا آغاز',
        descriptionEn: 'Launched the dedicated Qurbani project to distribute fresh meat to deserving families across Sargodha district, now running for 25+ continuous years.',
        descriptionUr: 'سرگودھا کے غریب اور نادار گھرانوں کے لیے اجتماعی قربانی اور گوشت کی تقسیم کا آغاز کیا گیا۔'
      },
      {
        id: 'ms-3',
        year: '2008',
        titleEn: 'Free Food & Boarding Complex Expansion',
        titleUr: 'مفت طعام و اقامتی عمارت کی توسیع',
        descriptionEn: 'Constructed the dedicated residential hostel and modern Langar/Matbakh facility to feed over 300+ students daily at zero cost to their families.',
        descriptionUr: 'مستحق طلباء کے لیے مفت ہاسٹل اور جدید مطبخ کا افتتاح، جہاں روزانہ سینکڑوں طلباء کو کھانا فراہم کیا جاتا ہے۔'
      },
      {
        id: 'ms-4',
        year: '2016',
        titleEn: 'Digital Islamic Library & Research Centre',
        titleUr: 'اسلامک ریسرچ لائبریری کا قیام',
        descriptionEn: 'Established an expansive physical and digital library containing classical texts, Quranic commentaries, and Hadith compendiums.',
        descriptionUr: 'طلباء اور محققین کے لیے نادر دینی کتب، تفاسیر اور شروحاتِ حدیث پر مشتمل لائبریری کا قیام۔'
      },
      {
        id: 'ms-5',
        year: '2024',
        titleEn: 'Mosque Construction & Welfare Network Expansion',
        titleUr: 'مساجد پروجیکٹس اور فلاحی نیٹ ورک کی توسیع',
        descriptionEn: 'Expanded welfare aid to 18+ mosque projects and reached 320+ full-scholarship deserving boys.',
        descriptionUr: '18 سے زائد مساجد کے تعمیراتی منصوبوں میں معاونت اور 320 سے زائد طلباء کو مفت تعلیمی وظائف۔'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590076215667-873d26501193?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  educationPrograms: [
    {
      id: 'prog-1',
      titleEn: 'Hifz-ul-Quran & Tajweed',
      titleUr: 'تحفیظ القرآن الکریم و تجوید',
      category: 'quran',
      durationEn: '3 Years (Full-Time)',
      durationUr: '3 سالہ کورس',
      descriptionEn: 'Comprehensive memorization of the Holy Quran under certified Qaris with strict adherence to the rules of Tajweed and Makharij.',
      descriptionUr: 'ماہر و سند یافتہ اساتذہ کی زیرِ نگرانی درست مخارج اور تجوید کے قواعد کے ساتھ مکمل قرآن مجید کا حفظ۔',
      featuresEn: ['Daily memorization & revision circles', 'Individual vocal guidance', 'Yearly examination & formal Ijazah award', '100% Free for deserving boys'],
      featuresUr: ['روزانہ سبق، سبقی اور منزل کا باقاعدہ نظام', 'انفرادی رہنمائی و درست تلفظ', 'سالانہ امتحانات اور باضابطہ اسناد', 'مستحق طلباء کے لیے مکمل مفت'],
      isFreeForDeserving: true,
      order: 1
    },
    {
      id: 'prog-2',
      titleEn: 'Dars-e-Nizami (Alimiyyah Course)',
      titleUr: 'درسِ نظامی (عالمیہ کورس)',
      category: 'religious',
      durationEn: '8 Years (Graduated Levels)',
      durationUr: '8 سالہ نصاب',
      descriptionEn: 'Rigorous traditional curriculum covering Arabic Grammar (Sarf & Nahw), Logic, Fiqh, Usul al-Fiqh, Hadith, Tafsir, and Islamic Jurisprudence.',
      descriptionUr: 'صرف و نحو، بلاغت، منطق، اصولِ فقہ، فقہ حنفی، تفسیر قرآن اور صحاح ستہ حدیث کا مستند نصاب۔',
      featuresEn: ['Classical scholarly texts', 'In-depth research methodology', 'Character building & sermon training', 'Boarding & meals included free'],
      featuresUr: ['مستند اور معتبر کتبِ فقہ و تفسیر', 'تحقیقی و علمی مباحث', 'خطابت و تدریس کی خصوصی مشق', 'مفت رہائش و طعام کی سہولت'],
      isFreeForDeserving: true,
      order: 2
    },
    {
      id: 'prog-3',
      titleEn: 'Dorah-e-Hadith (Khatm-e-Bukhari)',
      titleUr: 'دورۂ حدیث شریف (تکمیلِ بخاری)',
      category: 'hadith',
      durationEn: 'Final Year Specialization',
      durationUr: 'آخری سال کا خصوصی شعبہ',
      descriptionEn: 'Culmination of advanced Islamic studies with deep scholarly analysis of Sahih Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami al-Tirmidhi, Sunan an-Nasa\'i, and Sunan Ibn Majah.',
      descriptionUr: 'صحاح ستہ (بخاری شریف، مسلم شریف، ترمذی، ابوداؤد، نسائی، ابن ماجہ) کا تفصیلی درس اور اسناد کی فراہمی۔',
      featuresEn: ['Sanad of Hadith transmission', 'Comparative jurisprudence analysis', 'Renowned guest scholars seminars', 'Official graduation ceremony'],
      featuresUr: ['مسلسل اسنادِ حدیث', 'تقابلی فقہی جائزہ', 'جید شیوخ الحدیث کے خصوصی دروس', 'دستارِ فضیلت و سند'],
      isFreeForDeserving: true,
      order: 3
    },
    {
      id: 'prog-4',
      titleEn: 'Tafseer-ul-Quran & Usul-ut-Tafseer',
      titleUr: 'تفسیر القرآن و اصولِ تفسیر',
      category: 'quran',
      durationEn: '2 Years Specialization',
      durationUr: '2 سالہ خصوصی کورس',
      descriptionEn: 'Systematic study of Quranic revelation, Shan-e-Nuzul, linguistic nuances, classical commentaries (Ibn Kathir, Jalalayn, Baidawi, Qurtubi).',
      descriptionUr: 'قرآن مجید کے معانی، اسبابِ نزول، ادبی محاسن اور جلیل القدر مفسرین کی تفاسیر کا مطالعہ۔',
      featuresEn: ['Contextual understanding', 'Thematic Quranic studies', 'Refutation of modern doubts', 'Public lecture preparation'],
      featuresUr: ['آیات کے تفصیلی سیاق و سباق', 'موضوعاتی تفسیری مطالعہ', 'عصری سوالات کے مدلل جوابات', 'عوامی خطابات کی تربیت'],
      isFreeForDeserving: true,
      order: 4
    },
    {
      id: 'prog-5',
      titleEn: 'Arabic Language & Literature',
      titleUr: 'عربی زبان و ادب',
      category: 'arabic',
      durationEn: '1 Year Intensive',
      durationUr: '1 سالہ تربیتی کورس',
      descriptionEn: 'Intensive immersion in spoken and written modern and classical Arabic, balaghah (rhetoric), and poetry.',
      descriptionUr: 'عربی بول چال، انشاء و ادب، علمِ بلاغت اور کلاسیکی عربی شاعری کی تدریس۔',
      featuresEn: ['Daily spoken Arabic circles', 'Essay writing & speech clubs', 'Audio-visual listening labs', 'All study materials provided'],
      featuresUr: ['عربی تکلم کی روزانہ مشق', 'مضامین اور خطابت کے مقابلے', 'آڈیو ویژول اسباق', 'کتب و نوٹس کی مفت فراہمی'],
      isFreeForDeserving: true,
      order: 5
    },
    {
      id: 'prog-6',
      titleEn: 'Special Support Program for Deserving Students',
      titleUr: 'مستحق اور نادار طلباء کے لیے خصوصی امدادی پروگرام',
      category: 'general',
      durationEn: 'Continuous Ongoing',
      durationUr: 'مستقل جاری پروگرام',
      descriptionEn: 'A zero-fee admissions initiative dedicated to impoverished, orphaned, and rural boys with full provision of books, uniform, shelter, food, and mentorship.',
      descriptionUr: 'یتیم اور نادار بچوں کے لیے مکمل طور پر بلامعاوضہ تعلیم، خوراک، کتابیں، یونیفارم اور رہائش کا بندوبست۔',
      featuresEn: ['100% Free Tuition & Books', 'Free 3x Daily Meals', 'Free Clean Boarding & Bedding', 'Monthly Student Welfare Stipend'],
      featuresUr: ['100٪ مفت فیس اور نصابی کتب', 'تینوں وقت کا معیاری کھانا', 'صاف ستھری رہائش اور بستر', 'ماہانہ طلباء تعلیمی وظیفہ'],
      isFreeForDeserving: true,
      order: 6
    }
  ],
  faculty: [
    {
      id: 'fac-1',
      nameEn: 'Hazrat Maulana Allama Qari Muhammad Saeed (D.B)',
      nameUr: 'حضرت مولانا علامہ قاری محمد سعید مدظلہ',
      designationEn: 'Principal & Mohtamim (Director)',
      designationUr: 'مہتمم و سرپرستِ اعلیٰ',
      qualificationEn: 'Shahadat-ul-Alimiyyah, Qiraat Sab\'ah, M.A Islamic Studies',
      qualificationUr: 'شہادۃ العالمیہ، قراءت سبعہ، ایم اے اسلامیات',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'fac-2',
      nameEn: 'Maulana Hafiz Abdul Rehman Ghousi',
      nameUr: 'مولانا حافظ عبد الرحمن غوثی',
      designationEn: 'Head of Dars-e-Nizami & Fiqh',
      designationUr: 'صدر شعبہ درسِ نظامی و افتاء',
      qualificationEn: 'Alimiyyah, Takhassus fi al-Fiqh',
      qualificationUr: 'عالمیہ، تخصص فی الفقہ الاسلامی',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'fac-3',
      nameEn: 'Qari Muhammad Bilal Naqshbandi',
      nameUr: 'قاری محمد بلال نقشبندی',
      designationEn: 'Head of Tajweed & Hifz Department',
      designationUr: 'صدر شعبہ حفظ و تجوید',
      qualificationEn: 'Hafiz-ul-Quran, Sanad Tajweed & Qiraat',
      qualificationUr: 'حافظِ قرآن، سند تجوید و قراءت',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    }
  ],
  students: [
    {
      id: 'std-1',
      name: 'Muhammad Usman',
      program: 'Hifz-ul-Quran (Final Year)',
      enrollmentYear: 2023,
      status: 'free_education',
      achievements: 'Completed 30 Paras with distinction; Won Sargodha District Qiraat Competition 2024.',
      photoUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=300&q=80',
      isPublicHighlight: true
    },
    {
      id: 'std-2',
      name: 'Abdullah Tariq',
      program: 'Dars-e-Nizami (Rabia Year)',
      enrollmentYear: 2021,
      status: 'full_scholarship',
      achievements: 'First Position in Usul al-Fiqh & Arabic Rhetoric term assessments.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isPublicHighlight: true
    },
    {
      id: 'std-3',
      name: 'Zubair Ahmad',
      program: 'Hifz-ul-Quran (2nd Year)',
      enrollmentYear: 2024,
      status: 'free_food',
      achievements: 'Memorized 18 Paras in 14 months with exceptional Tajweed accuracy.',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      isPublicHighlight: true
    },
    {
      id: 'std-4',
      name: 'Hassan Raza',
      program: 'Dorah-e-Hadith',
      enrollmentYear: 2019,
      status: 'full_scholarship',
      achievements: 'Completed comprehensive research thesis on Hadith narration chains in Sahih Bukhari.',
      photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80',
      isPublicHighlight: true
    }
  ],
  foodProgram: {
    titleEn: 'Matbakh-e-Ghousia: 100% Free Food Program for Students',
    titleUr: 'مطبخِ غوثیہ: مستحق طلباء کے لیے روزانہ مفت طعام کا انتظام',
    descriptionEn: 'Every single day, our institution prepares and serves 3 fresh, nutritious, hygienic meals (Breakfast, Lunch, Dinner) completely free of charge to over 380+ boarding students, teachers, and deserving travelers.',
    descriptionUr: 'دارالعلوم محمدیہ غوثیہ کے مطبخ میں روزانہ 380 سے زائد مستحق طلباء اور مسافروں کے لیے تینوں وقت کا تازہ، صاف اور غذائیت سے بھرپور کھانا مفت تیار کیا جاتا ہے۔',
    dailyMealsCount: 1140,
    mealsServedPerDay: 1140,
    beneficiaryCount: 380,
    monthlyCostPerStudentPkr: 9500,
    costPerStudentMonthlyPkr: 9500,
    monthlyTotalBudgetPkr: 3610000,
    dailyRotiCount: 1250,
    dailyRiceKg: 85,
    menuHighlightsEn: [
      'Nutritious balanced breakfast (Milk, Eggs, Bread / Paratha / Tea)',
      'Fresh Meat / Chicken with Lentils & Rice for lunch',
      'Seasonal Vegetables, Wheat Roti, and Dal for dinner',
      'Special sweet dishes and Langar on Thursdays and Fridays'
    ],
    menuHighlightsUr: [
      'صبح کا مقوی ناشتہ (دودھ، انڈے، پراٹھا / روٹی، چائے)',
      'دوپہر کا کھانا (گوشت، دال، پلاؤ، چاول)',
      'شام کا کھانا (تازہ سبزیاں، روٹی اور دالیں)',
      'جمعرات و جمعۃ المبارک پر خصوصی میٹھا اور لنگرِ غوثیہ'
    ],
    weeklySchedule: [
      {
        id: 'food-mon',
        dayEn: 'Monday',
        dayUr: 'پیر (دوشنبہ)',
        breakfastEn: 'Boiled Eggs, Fresh Milk & Paratha / Tea',
        breakfastUr: 'ابلا ہوا انڈہ، تازہ دودھ، پراٹھا اور چائے',
        lunchEn: 'Chicken Qorma with Fresh Naan / Roti & Salad',
        lunchUr: 'چکن قورمہ مع گرم تندوری روٹی اور سلاد',
        dinnerEn: 'Daal Mash with Desi Butter Tarka & Wheat Roti',
        dinnerUr: 'دال ماش مع دیسی گھی تڑکہ اور گندم کی روٹی',
        specialNoteEn: 'Balanced protein for high-focus Quran memorization',
        specialNoteUr: 'حفظِ قرآن کے طلباء کے لیے متوازن پروٹین خوراک'
      },
      {
        id: 'food-tue',
        dayEn: 'Tuesday',
        dayUr: 'منگل',
        breakfastEn: 'Chana Masala with Crispy Paratha & Chai',
        breakfastUr: 'چنا مصالحہ، خستہ پراٹھا اور چائے',
        lunchEn: 'Beef Pulao with Raita & Lentil Soup',
        lunchUr: 'بیف پلاؤ مع دہی رائتہ اور دال کا سوپ',
        dinnerEn: 'Seasonal Mix Vegetables & Fresh Tandoori Roti',
        dinnerUr: 'موسمی مکس سبزیاں اور تازہ تندوری روٹی',
        specialNoteEn: 'Fresh local seasonal produce delivered daily',
        specialNoteUr: 'مقامی منڈی سے روزانہ تازہ سبزیوں کی خریداری'
      },
      {
        id: 'food-wed',
        dayEn: 'Wednesday',
        dayUr: 'بدھ (چہار شنبہ)',
        breakfastEn: 'Fried Eggs / Jam Bread & Hot Milk Tea',
        breakfastUr: 'فرائی انڈہ، مکھن ڈبل روٹی اور گرم دودھ پتی',
        lunchEn: 'Daal Chana with Zeera Rice & Pickle',
        lunchUr: 'دال چنا مع زیرہ چاول اور اچار',
        dinnerEn: 'Chicken Karahi with Fragrant Roti & Fresh Mint Yogurt',
        dinnerUr: 'چکن کڑاہی مع تازہ روٹی اور پودینہ رائتہ',
        specialNoteEn: 'Hygienically cooked in stainless steel cauldrons',
        specialNoteUr: 'اسٹین لیس سٹیل کی دیگوں میں حفظانِ صحت کے اصولوں پر کھانا پکایا جاتا ہے'
      },
      {
        id: 'food-thu',
        dayEn: 'Thursday',
        dayUr: 'جمعرات',
        breakfastEn: 'Halwa Puri & Traditional Cardamom Tea',
        breakfastUr: 'حلوہ پوری اور روایتی الائچی چائے',
        lunchEn: 'Special Degi Biryani / Langar-e-Ghousia',
        lunchUr: 'خصوصی دیگی بریانی اور لنگرِ غوثیہ',
        dinnerEn: 'Mutton / Beef Stew with Steamed Lentils & Roti',
        dinnerUr: 'گوشت سالن مع دال اور گرما گرم روٹیاں',
        specialNoteEn: 'Special weekly Mahfil-e-Durood Langar distribution',
        specialNoteUr: 'ہفتہ وار محفلِ درود شریف کے موقع پر خصوصی لنگر'
      },
      {
        id: 'food-fri',
        dayEn: 'Friday',
        dayUr: 'جمعۃ المبارک',
        breakfastEn: 'Omelette, Fresh Yogurt, Paratha & Chai',
        breakfastUr: 'آملیٹ، تازہ دہی، پراٹھا اور چائے',
        lunchEn: 'Grand Chicken Pulao & Sweet Rice (Zarda) Feast',
        lunchUr: 'شاہی چکن پلاؤ اور میٹھے چاول (زردہ)',
        dinnerEn: 'Daal Moong & Masoor with Desi Ghee & Fresh Roti',
        dinnerUr: 'دال مونگ مسور مع دیسی گھی اور روٹی',
        specialNoteEn: 'Friday blessed gathering communal feast',
        specialNoteUr: 'جمعۃ المبارک کی برکت سے تمام طلباء و مہمانوں کے لیے خصوصی طعام'
      },
      {
        id: 'food-sat',
        dayEn: 'Saturday',
        dayUr: 'ہفتہ',
        breakfastEn: 'Boiled Chickpeas, Butter Bread & Tea',
        breakfastUr: 'ابلے سفید چنے، مکھن ڈبل روٹی اور چائے',
        lunchEn: 'Aloo Gosht with Fragrant Basmati Rice',
        lunchUr: 'آلو گوشت شوربہ مع باسمتی چاول',
        dinnerEn: 'Kadhi Pakora / Dal with Fresh Tandoor Roti',
        dinnerUr: 'کڑھی پکوڑا / دال مع تازہ تندوری روٹی',
        specialNoteEn: 'Strict dietary inspection by health supervisor',
        specialNoteUr: 'روزانہ غذائی معائنہ کار کی زیر نگرانی تیاری'
      },
      {
        id: 'food-sun',
        dayEn: 'Sunday',
        dayUr: 'اتوار (یک شنبہ)',
        breakfastEn: 'Special Nihari / Paye / Chana with Paratha & Milk',
        breakfastUr: 'نہاری / چنے، پراٹھا اور میٹھا دودھ',
        lunchEn: 'Chicken Haleem with Lemon, Ginger & Tandoori Naan',
        lunchUr: 'چکن حلیم مع لیموں، ادرک اور تندوری نان',
        dinnerEn: 'Lentil Soup with Seasonal Gourd/Vegetables & Roti',
        dinnerUr: 'سبزی و دال مع تازہ روٹی',
        specialNoteEn: 'Weekend extra nutrition for young boarding students',
        specialNoteUr: 'چھٹی کے دن طلباء کے لیے اضافی مقوی خوراک'
      }
    ],
    sponsorshipPackages: [
      {
        id: 'sp-1',
        nameEn: '1 Student Monthly Food Sponsorship',
        nameUr: 'ایک طالب علم کے ماہانہ طعام کی مکمل کفالت',
        amountPkr: 9500,
        descriptionEn: 'Provides all 3 wholesome meals, fresh milk, and tea daily for one residential student for a full month.',
        descriptionUr: 'ایک رہائشی طالب علم کے پورے مہینے کے تینوں وقت کے کھانے، دودھ اور چائے کے تمام اخراجات۔',
        tagEn: 'Most Popular',
        tagUr: 'سب سے مقبول'
      },
      {
        id: 'sp-2',
        nameEn: 'Complete Langar Deg (80+ People)',
        nameUr: 'مکمل لنگر دیگ (80 سے زائد افراد کا طعام)',
        amountPkr: 16000,
        descriptionEn: 'Sponsors a large fragrant Chicken Pulao or Biryani Deg feeding 80+ students and local travelers on your behalf or for Isal-e-Sawab.',
        descriptionUr: 'ایصالِ ثواب یا شکرانے کے طور پر 80+ طلباء اور مسافروں کے لیے دیگ کا اہتمام۔',
        tagEn: 'Isal-e-Sawab',
        tagUr: 'ایصالِ ثواب'
      },
      {
        id: 'sp-3',
        nameEn: 'Whole Day Kitchen Sponsorship (All 380+ Students)',
        nameUr: 'پورے دارالعلوم کے ایک دن کے مکمل طعام کی کفالت',
        amountPkr: 45000,
        descriptionEn: 'Covers entire breakfast, lunch, and dinner for the entire Jamia complex (380+ students & teachers) for a day.',
        descriptionUr: 'دارالعلوم کے تمام 380 سے زائد طلباء اور اساتذہ کے ایک پورے دن کے تینوں کھانوں کی کفالت۔',
        tagEn: 'Full Day Thawab',
        tagUr: 'مکمل یومیہ کفالت'
      },
      {
        id: 'sp-4',
        nameEn: 'Monthly Flour & Ghee Bulk Pantry Fund',
        nameUr: 'ماہانہ گندم آٹا و کوکنگ آئل راشن فنڈ',
        amountPkr: 85000,
        descriptionEn: 'Supplies 40+ bags of fine whole wheat flour and 200kg of cooking oil for the central Matbakh store.',
        descriptionUr: 'مرکزی مطبخ کے لیے 40 توڑے گندم آٹا اور کوکنگ آئل کی بڑی خریداری کا فنڈ۔',
        tagEn: 'Bulk Pantry',
        tagUr: 'راشن اسٹور'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590076215667-873d26501193?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  welfareProjects: [
    {
      id: 'welf-1',
      titleEn: 'Monthly Rashan & Food Baskets for Destitute Families',
      titleUr: 'مستحق اور نادار خاندانوں کے لیے ماہانہ راشن پیکجز',
      category: 'food',
      descriptionEn: 'Monthly distribution of flour, rice, cooking oil, pulses, sugar, and tea to over 200+ validated widows and daily wage earner families in Sargodha suburbs.',
      descriptionUr: 'سرگودھا کے نواحی علاقوں کے 200 سے زائد غریب، یتیم اور بیواؤں کے گھرانوں کو ہر ماہ ضروری راشن کی باعزت ترسیل۔',
      locationEn: 'Nawab Colony & Surrounding Rural Villages, Sargodha',
      locationUr: 'نواب کالونی اور ملحقہ دیہات، سرگودھا',
      date: '2025-01-15',
      status: 'ongoing',
      beneficiariesCount: 220,
      images: [
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
      ],
      featured: true
    },
    {
      id: 'welf-2',
      titleEn: 'Clean Drinking Water Filtration Plant Project',
      titleUr: 'صاف پینے کے پانی کا فلٹریشن پلانٹ منصوبہ',
      category: 'general',
      descriptionEn: 'Installation of reverse-osmosis water filtration plant outside Darul Uloom gate, providing free 100% clean drinking water to over 1,500 local residents daily.',
      descriptionUr: 'دارالعلوم کے مرکزی دروازے پر آر او فلٹریشن پلانٹ کی تنصیب، جس سے روزانہ 1500 سے زائد شہری صاف پانی حاصل کرتے ہیں۔',
      locationEn: 'Darul Uloom Gate, Nawab Colony, Sargodha',
      locationUr: 'دارالعلوم گیٹ، نواب کالونی، سرگودھا',
      date: '2024-06-20',
      status: 'completed',
      beneficiariesCount: 1500,
      images: [
        'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
      ],
      featured: true
    },
    {
      id: 'welf-3',
      titleEn: 'Winter Warmth: Blankets & Warm Clothes Distribution',
      titleUr: 'سرمائی ریلیف: کمبل اور گرم کپڑوں کی تقسیم',
      category: 'family',
      descriptionEn: 'Annual winter drive providing heavy warm quilts, jackets, sweaters, and shawls to destitute orphans, elderly, and student boarders.',
      descriptionUr: 'شدید سردی کے موسم میں ضرورت مند طلباء، یتامیٰ اور بے سہارا افراد میں گرم کمبل اور جیکٹس کی تقسیم۔',
      locationEn: 'Sargodha District Rural Areas',
      locationUr: 'ضلع سرگودھا کے دیہی علاقے',
      date: '2024-11-28',
      status: 'completed',
      beneficiariesCount: 450,
      images: [
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
      ],
      featured: false
    },
    {
      id: 'welf-4',
      titleEn: 'Emergency Medical Assistance & Patient Care Fund',
      titleUr: 'ہنگامی طبی امداد اور مریضوں کے علاج کا فنڈ',
      category: 'financial',
      descriptionEn: 'Financial assistance for surgical procedures, emergency medicines, dialysis, and lab tests for patients unable to afford DHQ hospital charges.',
      descriptionUr: 'سرگودھا کے غریب مریضوں کے آپریشنز، ادویات اور ٹیسٹوں کے اخراجات میں مالی تعاون۔',
      locationEn: 'DHQ Hospital & Sargodha Medical Centers',
      locationUr: 'ڈی ایچ کیو ہسپتال و میڈیکل سینٹرز سرگودھا',
      date: '2025-02-10',
      status: 'ongoing',
      beneficiariesCount: 110,
      images: [
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
      ],
      featured: false
    }
  ],
  donationDetails: {
    headingEn: 'Support Our Educational & Welfare Mission',
    headingUr: 'ہمارے تعلیمی اور فلاحی مشن میں اپنا حصہ ڈالیں',
    introEn: 'Your generous Sadaqah, Zakat, Atiyyat, and donations directly empower impoverished students with Quranic knowledge, provide daily meals, support destitute families, and build houses of Allah across Sargodha.',
    introUr: 'آپ کے عطیات، زکوٰۃ، صدقات اور امداد سے نادار طلباء کی کفالت، مفت طعام، بیواؤں کی مدد اور مساجد کی تعمیر جیسے عظیم کام انجام پاتے ہیں۔',
    bankAccounts: [
      {
        id: 'bank-1',
        bankName: 'Meezan Bank Ltd (Islamic Banking)',
        accountTitle: 'Darul Uloom Muhammadiya Ghousia',
        accountNumber: '0201010897654321',
        iban: 'PK45MEZN0002010108976543',
        branchName: 'Sargodha Main Branch (Code 0201)',
        swiftCode: 'MEZNPKKA'
      },
      {
        id: 'bank-2',
        bankName: 'Bank Alfalah Islamic',
        accountTitle: 'Darul Uloom Muhammadiya Ghousia Welfare',
        accountNumber: '55010043219876',
        iban: 'PK12ALFH5501004321987600',
        branchName: 'University Road Branch, Sargodha',
        swiftCode: 'ALFHPKKA'
      }
    ],
    mobilePayments: [
      {
        id: 'mob-1',
        provider: 'JazzCash',
        accountTitle: 'Darul Uloom M Ghousia',
        accountNumber: '0300-9601234',
        tillId: '887211'
      },
      {
        id: 'mob-2',
        provider: 'EasyPaisa',
        accountTitle: 'Darul Uloom M Ghousia',
        accountNumber: '0345-8601234',
        tillId: '992014'
      }
    ],
    instructionsEn: [
      'Please send a screenshot or transaction ID via WhatsApp (+92 300 9601234) for official receipt generation.',
      'Clearly specify if your donation is for Zakat, Sadaqah, Student Meals (Langar), Qurbani, or Mosque Construction.',
      'All donations are recorded transparently with verifiable institutional receipts.',
      'International donors can use SWIFT transfer or contact our administration directly for overseas wire instructions.'
    ],
    instructionsUr: [
      'رقم منتقلی کے بعد رسید کے لیے واٹس ایپ (+92 300 9601234) پر ٹرانزیکشن کی تفصیل ارسال فرمائیں۔',
      'براہ کرم واضح فرمائیں کہ رقم زکوٰۃ، صدقہ، طلباء کا راشن/مطبخ، قربانی یا مسجد فنڈ کی مد میں ہے۔',
      'تمام فنڈز کا مکمل آڈٹ اور باضابطہ رسیدیں جاری کی جاتی ہیں۔',
      'بیرون ملک مقیم حضرات بینک سوئفٹ کوڈ یا براہ راست رابطہ کر سکتے ہیں۔'
    ],
    contactNumber: '+92 300 9601234',
    categories: [
      {
        id: 'cat-edu',
        nameEn: 'Free Education Sponsorship',
        nameUr: 'طلباء کی مفت تعلیم کی کفالت',
        descriptionEn: 'Sponsor the tuition, books, uniform, and Islamic education of a deserving boy.',
        descriptionUr: 'ایک مستحق طالب علم کی سالانہ یا ماہانہ تعلیمی فیس اور کتب کی فراہمی۔',
        suggestedAmountsPkr: [3000, 6000, 12000, 36000]
      },
      {
        id: 'cat-food',
        nameEn: 'Student Food & Matbakh (Langar)',
        nameUr: 'طلباء کا مطبخ و طعام فنڈ',
        descriptionEn: 'Provide 3 daily fresh meals for residential Islamic students.',
        descriptionUr: 'ہاسٹل کے طلباء کے لیے تینوں وقت کے تازہ کھانے کی کفالت۔',
        suggestedAmountsPkr: [2500, 5000, 9500, 25000]
      },
      {
        id: 'cat-welfare',
        nameEn: 'General Welfare & Deserving Families',
        nameUr: 'عام فلاح و بہبود و راشن فنڈ',
        descriptionEn: 'Emergency medical assistance, monthly grocery bags for widows and poor households.',
        descriptionUr: 'بیواؤں اور غریب گھرانوں کے لیے راشن اور ادویات کی فراہمی۔',
        suggestedAmountsPkr: [5000, 10000, 20000, 50000]
      },
      {
        id: 'cat-mosque',
        nameEn: 'Mosque Construction & Maintenance',
        nameUr: 'تعمیر و مرمتِ مساجد فنڈ',
        descriptionEn: 'Help build and complete unfinished rural mosques in Sargodha division.',
        descriptionUr: 'مساجد کی تعمیر، وضو خانے، قالین اور چھتوں کی تکمیل میں حصہ۔',
        suggestedAmountsPkr: [5000, 15000, 30000, 100000]
      },
      {
        id: 'cat-books',
        nameEn: 'Books & Islamic Library Fund',
        nameUr: 'کتب و اسلامی لائبریری فنڈ',
        descriptionEn: 'Purchase classical Tafsir, Hadith books, and Quranic copies for students.',
        descriptionUr: 'طلباء کے لیے تفاسیر، کتبِ احادیث اور قرآنی نسخوں کی خریداری۔',
        suggestedAmountsPkr: [2000, 5000, 10000, 25000]
      }
    ]
  },
  qurbaniCampaigns: [
    {
      id: 'qurb-2025',
      yearHijri: '1446 AH',
      yearGregorian: 2025,
      yearsOfServiceTextEn: '25+ Years of Dedicated Qurbani Service',
      yearsOfServiceTextUr: '25 سالہ مسلسل اور قابل اعتماد خدمتِ قربانی',
      headerBackgroundImage: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1920&q=80',
      descriptionEn: 'For over 25 continuous years, Darul Uloom Muhammadiya Ghousia has conducted organized, Shariah-compliant collective Qurbani in Sargodha. Every step—from healthy livestock selection, proper Islamic slaughter, hygienic meat processing, and refrigerated packing to doorstep delivery—is handled with utmost responsibility and piety.',
      descriptionUr: 'دارالعلوم محمدیہ غوثیہ گزشتہ 25 سال سے سرگودھا میں شریعت کے مطابق منظم اجتماعی قربانی کا فریضہ انجام دے رہا ہے۔ جانوروں کے انتخاب، ذبح، صفائی اور گوشت کی مستحقین تک ترسیل کا بہترین انتظام کیا جاتا ہے۔',
      animalsSacrificed: 180,
      meatDistributedKg: 14500,
      familiesBenefited: 2850,
      sharePriceCowPkr: 26000,
      sharePriceGoatPkr: 52000,
      fullCowPricePkr: 182000,
      cowShareCostPkr: 26000,
      fullCowCostPkr: 182000,
      goatCostPkr: 52000,
      animals: [
        {
          id: 'qanim-1',
          nameEn: 'One Cow Share (Hissa)',
          nameUr: 'گائے کا ایک حصہ (اجتماعی)',
          type: 'cow-share',
          pricePkr: 26000,
          sharesCount: 1,
          isPopular: true,
          available: true,
          order: 1,
          image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
          descriptionEn: 'Includes healthy sacrificial cow share, religious slaughter under Muftis oversight, hygienic cutting, and distribution to deserving families and orphan students.',
          descriptionUr: 'صحت مند گائے میں ایک حصہ، شرعی ذبیحہ، صاف ستھری کٹائی اور نادار و یتیم خاندانوں تک گوشت کی ترسیل شامل ہے۔'
        },
        {
          id: 'qanim-2',
          nameEn: 'Full Goat / Sheep (Bakri / Chhatra)',
          nameUr: 'مکمل بکرا / چھترا',
          type: 'goat',
          pricePkr: 52000,
          sharesCount: 1,
          isPopular: false,
          available: true,
          order: 2,
          image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
          descriptionEn: 'Complete healthy individual sacrificial goat or ram slaughtered according to Sunnah guidelines with your designated intention and dua.',
          descriptionUr: 'مکمل صحت مند بکرا یا دنبہ، آپ کی نامزد نیت اور دعا کے ساتھ سنت کے مطابق ذبح اور گوشت کی تقسیم۔'
        },
        {
          id: 'qanim-3',
          nameEn: 'Complete Cow / Ox (7 Shares)',
          nameUr: 'مکمل گائے / بیل (7 حصے)',
          type: 'full-cow',
          pricePkr: 182000,
          sharesCount: 7,
          isPopular: false,
          available: true,
          order: 3,
          image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80',
          descriptionEn: 'Complete healthy sacrificial cattle of 7 full shares dedicated to family, deceased relatives (Isaale-Sawab), or student Langar distribution.',
          descriptionUr: '7 حصوں پر مشتمل مکمل صحت مند گائے یا بیل، پورے خاندان یا ایصالِ ثواب کے لیے خصوصی انتظام۔'
        },
        {
          id: 'qanim-4',
          nameEn: 'Camel Share (Oont Hissa)',
          nameUr: 'اونٹ کا ایک حصہ (اجتماعی)',
          type: 'camel-share',
          pricePkr: 38000,
          sharesCount: 1,
          isPopular: false,
          available: true,
          order: 4,
          image: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80',
          descriptionEn: 'One share in a Shariah-compliant sacrificial camel with Sunnah Nahr slaughter and distribution among remote rural needy families.',
          descriptionUr: 'اونٹ کی قربانی (نحر) میں ایک حصہ، دور دراز کے پسماندہ دیہی علاقوں میں مستحقین کو گوشت کی ترسیل۔'
        }
      ],
      features: [
        {
          id: 'qfeat-1',
          titleEn: 'Healthy Cattle Selection',
          titleUr: 'صحت مند جانوروں کا انتخاب',
          descEn: 'Pre-inspected disease-free animals exceeding Shariah age requirements from trusted livestock farms.',
          descUr: 'شرعی عمر کے مطابق مکمل صحت مند، بے عیب اور تندرست جانوروں کی خریداری۔'
        },
        {
          id: 'qfeat-2',
          titleEn: 'Strict Sunnah Slaughter',
          titleUr: 'مستند مفتیان کی زیرِ نگرانی ذبیحہ',
          descEn: 'Expert trained butchers slaughtering under the direct oversight of senior Darul Uloom Muftis.',
          descUr: 'ماہر قصاب اور دارالعلوم کے مفتیانِ کرام کی براہِ راست نگرانی میں شرعی ذبح۔'
        },
        {
          id: 'qfeat-3',
          titleEn: 'Deserving Families Priority',
          titleUr: 'حقدار و مستحق خاندانوں تک ترسیل',
          descEn: 'Pre-verified door-to-door distribution lists of poor widows, orphan guardians, and low-income laborers.',
          descUr: 'بیواؤں، یتامیٰ اور انتہائی غریب مزدور طبقے میں صاف ستھرے پیکٹس کی باعزت تقسیم۔'
        },
        {
          id: 'qfeat-4',
          titleEn: 'Full Transparency & Dua',
          titleUr: 'مکمل شفافیت اور نام بنام دعا',
          descEn: 'SMS / WhatsApp confirmation and detailed distribution report provided to every donor with individual dua.',
          descUr: 'ہر حصہ دار کے لیے خصوصی دعا اور واٹس ایپ پر تصویری و تحریری رپورٹ کی فراہمی۔'
        }
      ],
      status: 'active',
      images: [
        'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    {
      id: 'qurb-2024',
      yearHijri: '1445 AH',
      yearGregorian: 2024,
      yearsOfServiceTextEn: '24 Years of Faithful Execution',
      yearsOfServiceTextUr: '24 سالہ کامیاب خدمت',
      descriptionEn: 'Successfully distributed over 13,000 kilograms of fresh Qurbani meat to 2,600+ registered deserving households across Sargodha, Kot Momin, and Bhalwal rural belts.',
      descriptionUr: 'سرگودھا اور ملحقہ تحصیلوں کے 2600 سے زائد مستحق گھرانوں میں 13000 کلوگرام گوشت کی شفاف تقسیم۔',
      animalsSacrificed: 165,
      meatDistributedKg: 13200,
      familiesBenefited: 2600,
      status: 'completed',
      images: [
        'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1000&q=80'
      ]
    }
  ],
  zakat: {
    titleEn: 'Shariah-Compliant Zakat Assistance Program',
    titleUr: 'شرعی اصولوں کے مطابق زکوٰۃ کی وصولی اور حقداروں میں تقسیم',
    headerBackgroundImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80',
    goldRatePerGramPkr: 24500,
    silverRatePerGramPkr: 295,
    guidelinesEn: 'Darul Uloom Muhammadiya Ghousia maintains an independent, strictly monitored Zakat disbursement protocol governed by qualified Muftis. Zakat funds are treated as an amanah (sacred trust) and used strictly for validated Mustahiqeen (eligible recipients) according to the Holy Quran (Surah At-Tawbah 9:60).',
    guidelinesUr: 'دارالعلوم محمدیہ غوثیہ میں زکوٰۃ کی وصولی اور تقسیم کا نظام مستند مفتیانِ کرام کی زیرِ نگرانی کام کرتا ہے۔ زکوٰۃ کی رقم صرف اور صرف شرعی طور پر مستحق افراد اور نادار طلباء پر تملیکِ شرعی کے ساتھ خرچ کی جاتی ہے۔',
    eligibilityEn: [
      'Destitute and orphan students studying Dars-e-Nizami and Hifz who have no independent financial means (Tamleek-e-Shari applied)',
      'Validated widows, orphans, and families living below the poverty line with no earning guardian',
      'Critically ill patients unable to afford life-saving emergency medical interventions',
      'Deserving individuals facing severe debts or sudden natural hardships'
    ],
    eligibilityUr: [
      'دینی علوم و حفظ کے وہ مستحق و یتیم طلباء جن کے پاس تعلیمی و رہائشی اخراجات کا کوئی ذریعہ نہ ہو',
      'بیوگان، یتامیٰ اور انتہائی غریب خاندان جن کا کوئی کفیل نہ ہو',
      'ایسے نادار مریض جو علاج معالجے اور ادویات کی سکت نہیں رکھتے',
      'شدید مالی مشکلات یا قرض میں جکڑے ہوئے مستحق افراد'
    ],
    usagePointsEn: [
      '100% of collected Zakat is channeled directly to verified eligible recipients without administrative deductions',
      'A dedicated Shariah supervisory board audits all disbursements annually',
      'Personal dignity of recipient families is protected at all times with confidential delivery',
      'Formal receipts and Shariah confirmation certificates are issued to donors upon request'
    ],
    usagePointsUr: [
      'زکوٰۃ کی مکمل رقم بغیر کسی انتظامی کٹوتی کے مستحقین تک پہنچائی جاتی ہے',
      'تمام تر حسابات کا مستند مفتیانِ کرام سے باقاعدہ شرعی آڈٹ کرایا جاتا ہے',
      'مستحقین کی عزتِ نفس کا مکمل خیال رکھتے ہوئے خاموشی سے امداد پہنچائی جاتی ہے',
      'عطیہ دہندگان کو باضابطہ رسیدیں جاری کی جاتی ہیں'
    ],
    quotes: [
      {
        id: 'zak-q-1',
        type: 'ayat',
        arabicText: 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ',
        textUr: 'صدقات (زکوٰۃ) تو صرف محتاجوں، مسکینوں، زکوٰۃ کے کارکنوں، تالیفِ قلب کے لیے، گردنیں چھڑانے میں، قرض داروں کے لیے، اللہ کی راہ میں اور مسافروں کے لیے ہیں۔ یہ اللہ کی طرف سے مقرر کردہ فریضہ ہے، اور اللہ خوب جاننے والا، بڑی حکمت والا ہے۔',
        textEn: 'Zakah expenditures are only for the poor and for the needy and for those employed to collect [zakah] and for bringing hearts together [for Islam] and for freeing captives [or slaves] and for those in debt and for the cause of Allah and for the [stranded] traveler - an obligation [imposed] by Allah. And Allah is Knowing and Wise.',
        referenceUr: 'سورۃ التوبہ: آیت 60',
        referenceEn: 'Surah At-Tawbah (9:60)',
        order: 1,
        isActive: true
      },
      {
        id: 'zak-q-2',
        type: 'ayat',
        arabicText: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا وَصَلِّ عَلَيْهِمْ ۖ إِنَّ صَلَاتَكَ سَكَنٌ لَّهُمْ ۗ وَاللَّهُ سَمِيعٌ عَلِيمٌ',
        textUr: '(اے حبیب!) آپ ان کے اموال میں سے صدقہ (زکوٰۃ) وصول کیجیے جس کے ذریعے آپ انہیں (گناہوں سے) پاک اور ان کے نفوس کو صاف کر دیں، اور ان کے لیے دعا فرمائیں؛ بے شک آپ کی دعا ان کے لیے باعثِ تسکین ہے، اور اللہ خوب سننے والا، جاننے والا ہے۔',
        textEn: 'Take, [O Muhammad], from their wealth a charity by which you purify them and cause them increase, and invoke [Allah \'s blessings] upon them. Indeed, your invocations are reassurance for them. And Allah is Hearing and Knowing.',
        referenceUr: 'سورۃ التوبہ: آیت 103',
        referenceEn: 'Surah At-Tawbah (9:103)',
        order: 2,
        isActive: true
      },
      {
        id: 'zak-q-3',
        type: 'hadith',
        arabicText: 'قَالَ رَسُولُ اللَّهِ ﷺ: حَصِّنُوا أَمْوَالَكُمْ بِالزَّكَاةِ، وَدَاوُوا مَرْضَاكُمْ بِالصَّدَقَةِ، وَأَعِدُّوا لِلْبَلَاءِ الدُّعَاءَ',
        textUr: 'رسول اللہ ﷺ نے ارشاد فرمایا: "اپنے اموال کو زکوٰۃ کے ذریعے محفوظ قلعہ بناؤ، اپنے بیماروں کا علاج صدقے سے کرو، اور مصیبتوں کے مقابلے کے لیے دعا کا سہارا لو۔"',
        textEn: 'The Messenger of Allah (peace and blessings be upon him) said: "Fortify your wealth with Zakat, treat your sick ones with charity, and prepare prayer (Dua) for calamities."',
        referenceUr: 'شعب الایمان للبیہقی (حدیث: 3282) / طبرانی',
        referenceEn: 'Shu\'ab al-Iman al-Bayhaqi (3282) / Tabarani',
        order: 3,
        isActive: true
      },
      {
        id: 'zak-q-4',
        type: 'hadith',
        arabicText: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا',
        textUr: 'رسول اللہ ﷺ نے فرمایا: "صدقہ اور زکوٰۃ ادا کرنے سے مال میں کبھی کمی نہیں آتی، اور عفو و درگزر کرنے سے اللہ بندے کی عزت ہی بڑھاتا ہے۔"',
        textEn: 'The Prophet ﷺ said: "Charity does not decrease wealth, and Allah increases the honor of a person who forgives."',
        referenceUr: 'صحیح مسلم (حدیث: 2588)',
        referenceEn: 'Sahih Muslim (Hadith: 2588)',
        order: 4,
        isActive: true
      },
      {
        id: 'zak-q-5',
        type: 'fatwa',
        arabicText: 'تَمْلِيْكُ الْفَقِيْرِ رُكْنُ الزَّكَاةِ فِي الْفِقْهِ الْحَنَفِيِّ',
        textUr: 'فقہ حنفی کا متفقہ فتویٰ: زکوٰۃ کی ادائیگی کے صحیح ہونے کے لیے تملیکِ شرعی یعنی مستحقِ زکوٰۃ غریب یا یتیم طالبِ علم کو رقم یا سامان کا مالک بنا دینا لازمی شرط ہے۔ دارالعلوم میں اسی اصول پر مکمل عمل کیا جاتا ہے۔',
        textEn: 'Classical Hanafi Jurisprudence Rationale: Tamleek (transferring unencumbered ownership to an eligible poor student/family) is a foundational pillar for Zakat validity. Darul Uloom strictly enforces Tamleek in all distributions.',
        referenceUr: 'فتاویٰ عالمگیری / فتاویٰ رضویہ',
        referenceEn: 'Fatawa Alamgiri / Fatawa Razawiyya',
        order: 5,
        isActive: true
      }
    ],
    disclaimerEn: 'Important Note: All legal, theological, and Shariah rulings regarding Zakat eligibility and calculations on this website are subject to final approval by the institution\'s authorized religious representatives. Donors are encouraged to consult their local scholars or our resident Darul Ifta for personal inquiries.',
    disclaimerUr: 'اہم شرعی وضاحت: اس ویب سائٹ پر درج تمام معلومات دارالعلوم کے مجاز مفتیانِ کرام کی تصدیق شدہ ہیں۔ کسی بھی خاص فقہی مسئلے کے لیے دارالعلوم کے شعبہ افتاء سے رجوع کیا جا سکتا ہے۔'
  },
  mosqueProjects: [
    {
      id: 'mosq-1',
      nameEn: 'Jamia Masjid Ghousia (Nawab Colony Expansion)',
      nameUr: 'جامع مسجد غوثیہ (توسیع منصوبہ نواب کالونی)',
      locationEn: 'Nawab Colony, Main Sargodha Road, Sargodha',
      locationUr: 'نواب کالونی، مین سرگودھا روڈ، سرگودھا',
      descriptionEn: 'Expansion of the main congregational prayer hall to accommodate 1,200+ worshippers, construction of modern ablution (Wudu) facility with hot water, and a 90-foot minaret.',
      descriptionUr: 'مرکزی نماز ہال کی توسیع تاکہ 1200 نمازی بیک وقت نماز ادا کر سکیں، جدید وضو خانہ اور 90 فٹ بلند مینار کی تعمیر۔',
      constructionStatus: 'Finishing',
      progressPercentage: 78,
      requiredFundingPkr: 8500000,
      amountRaisedPkr: 6630000,
      images: [
        'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1000&q=80'
      ],
      contactPerson: 'Haji Muhammad Akram',
      contactPhone: '+92 300 9601234',
      updates: [
        {
          date: '2025-01-10',
          titleEn: 'First Floor Dome & Roof Casting Completed',
          titleUr: 'پہلی منزل کی چھت اور گنبد کا لینٹر مکمل',
          noteEn: 'Alhamdulillah, the main dome concrete casting and boundary parapets have been completed successfully.',
          noteUr: 'الحمد للہ مرکزی گنبد اور چھت کا لینٹر مکمل ہو چکا ہے، اب اندرونی پلاسٹر کا کام جاری ہے۔'
        },
        {
          date: '2024-10-05',
          titleEn: 'Ablution Area & Solar Tube Well Installed',
          titleUr: 'وضو خانہ اور سولر ٹیوب ویل فعال',
          noteEn: 'Installed 10kW solar power system for continuous water supply in Wudu areas.',
          noteUr: 'وضو خانے کے لیے 10 کلوواٹ سولر سسٹم اور پانی کی سپلائی کا کام مکمل۔'
        }
      ]
    },
    {
      id: 'mosq-2',
      nameEn: 'Masjid Bilal (Rural Chak 46-SB Project)',
      nameUr: 'مسجدِ بلال (چک 46-ایس بی منصوبہ)',
      locationEn: 'Chak 46-SB, Sargodha Rural District',
      locationUr: 'چک 46-ایس بی، دیہی ضلع سرگودھا',
      descriptionEn: 'Construction of a brand new community mosque and Maktab Quran classroom for 350 rural village residents who previously had no local mosque within a 3km radius.',
      descriptionUr: 'دیہی علاقے کے 350 رہائشیوں کے لیے نئی مسجد اور بچوں کے لیے مکتبِ قرآن کی تعمیر۔',
      constructionStatus: 'Structure',
      progressPercentage: 55,
      requiredFundingPkr: 4200000,
      amountRaisedPkr: 2310000,
      images: [
        'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80'
      ],
      contactPerson: 'Maulana Qari Bilal',
      contactPhone: '+92 301 7765432',
      updates: [
        {
          date: '2024-12-20',
          titleEn: 'Brick Walls & Pillar Pillars Reached Roof Level',
          titleUr: 'دیواریں اور پلرز چھت کی اونچائی تک مکمل',
          noteEn: 'Brick masonry completed. Shuttering for roof slab currently underway.',
          noteUr: 'دیواروں کی چنائی مکمل، چھت کے لینٹر کے لیے شٹرنگ کا کام شروع۔'
        }
      ]
    },
    {
      id: 'mosq-3',
      nameEn: 'Masjid Noor-e-Madina (Reconstruction)',
      nameUr: 'مسجد نورِ مدینہ (تعمیرِ نو)',
      locationEn: 'Kot Fareed, Sargodha',
      locationUr: 'کوٹ فرید، سرگودھا',
      descriptionEn: 'Complete demolition and rebuilding of a 60-year-old dilapidated structure with modern earthquake-resistant RCC frame, women prayer section, and water filtration plant.',
      descriptionUr: '60 سالہ پرانی خستہ حال عمارت کی جگہ زلزلہ پروف مسجد، خواتین کی عبادت گاہ اور فلٹریشن پلانٹ کی تعمیر۔',
      constructionStatus: 'Foundation',
      progressPercentage: 35,
      requiredFundingPkr: 6000000,
      amountRaisedPkr: 2100000,
      images: [
        'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80'
      ],
      contactPerson: 'Hafiz Tariq Mehmood',
      contactPhone: '+92 302 8899123',
      updates: [
        {
          date: '2025-01-25',
          titleEn: 'Foundation Piles & Basement Excavation Complete',
          titleUr: 'بنیادوں کی کھدائی اور بیسمنٹ فریم مکمل',
          noteEn: 'Heavy foundation concrete poured according to structural engineering standards.',
          noteUr: 'بیسمنٹ اور مضبوط بنیادوں کا کام انجینئرنگ معیار کے مطابق مکمل۔'
        }
      ]
    }
  ],
  books: [
    {
      id: 'bk-1',
      title: 'Tafseer Zia-ul-Quran (Selected Excerpts)',
      titleUr: 'تفسیر ضیاء القرآن (منتخب ابواب)',
      author: 'Justice Pir Muhammad Karam Shah Al-Azhari (R.A)',
      category: 'Quran',
      description: 'An illuminating, spiritually profound contemporary commentary of the Holy Quran addressing modern intellectual challenges with classical depth.',
      coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
      fileUrl: '/api/books/download/sample-tafseer.pdf',
      fileSizeMb: 14.2,
      pages: 450,
      uploadDate: '2024-03-15',
      downloadCount: 1420,
      isPublished: true
    },
    {
      id: 'bk-2',
      title: 'Zia-un-Nabi (Seerah of the Prophet SAW - Vol 1)',
      titleUr: 'ضیاء النبی ﷺ (سیرت النبی ﷺ - جلد اول)',
      author: 'Justice Pir Muhammad Karam Shah Al-Azhari (R.A)',
      category: 'Islamic Studies',
      description: 'The monumental Seerah masterpiece documenting the blessed life, character, and prophetic wisdom of the Messenger of Allah ﷺ with authoritative historical evidence.',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      fileUrl: '/api/books/download/sample-seerah.pdf',
      fileSizeMb: 18.5,
      pages: 620,
      uploadDate: '2024-04-10',
      downloadCount: 2310,
      isPublished: true
    },
    {
      id: 'bk-3',
      title: 'Mukhtasar al-Quduri (Matn al-Quduri in Fiqh)',
      titleUr: 'مختصر القدوری فی الفقہ الحنفی',
      author: 'Imam Abu al-Husayn Ahmad al-Quduri (R.A)',
      category: 'Fiqh',
      description: 'The foundational standard manual of Hanafi Islamic Jurisprudence studied globally across Dars-e-Nizami institutions.',
      coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=600&q=80',
      fileUrl: '/api/books/download/sample-quduri.pdf',
      fileSizeMb: 9.8,
      pages: 310,
      uploadDate: '2024-05-02',
      downloadCount: 890,
      isPublished: true
    },
    {
      id: 'bk-4',
      title: 'Riyadh as-Saliheen (Gardens of the Righteous)',
      titleUr: 'ریاض الصالحین',
      author: 'Imam Yahya ibn Sharaf al-Nawawi (R.A)',
      category: 'Hadith',
      description: 'A timeless, beloved collection of authentic prophetic traditions guiding daily ethics, worship, sincerity, and spiritual refinement.',
      coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
      fileUrl: '/api/books/download/sample-riyadh.pdf',
      fileSizeMb: 12.0,
      pages: 480,
      uploadDate: '2024-06-18',
      downloadCount: 1650,
      isPublished: true
    },
    {
      id: 'bk-5',
      title: 'Durus al-Lughah al-Arabiyyah (Arabic Course)',
      titleUr: 'دروس اللغة العربية لغير الناطقين بها',
      author: 'Dr. V. Abdur Rahim',
      category: 'Arabic',
      description: 'The premier pedagogical series for mastering Quranic Arabic grammar, vocabulary, sentence construction, and comprehension.',
      coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
      fileUrl: '/api/books/download/sample-arabic.pdf',
      fileSizeMb: 8.4,
      pages: 220,
      uploadDate: '2024-07-22',
      downloadCount: 1120,
      isPublished: true
    },
    {
      id: 'bk-6',
      title: 'Guide to Shariah Zakat & Calculation Manual',
      titleUr: 'احکامِ زکوٰۃ اور رہنمائے حساب',
      author: 'Darul Ifta, Darul Uloom Muhammadiya Ghousia',
      category: 'Educational',
      description: 'A practical Urdu guidebook detailing the rules of Nisab, gold, silver, currency, business inventories, agricultural Usher, and legitimate beneficiaries.',
      coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
      fileUrl: '/api/books/download/sample-zakat-guide.pdf',
      fileSizeMb: 5.1,
      pages: 110,
      uploadDate: '2024-08-14',
      downloadCount: 3400,
      isPublished: true
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      titleEn: 'Main Courtyard & Morning Quran Circles',
      titleUr: 'دارالعلوم کا مرکزی صحن اور صبح کے قرآنی حلقات',
      category: 'Institution',
      imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
      date: '2025-01-10',
      description: 'Students engaged in morning Tilawat and Hifz revisions in the main hall.'
    },
    {
      id: 'gal-2',
      titleEn: 'Annual Khatm-e-Quran & Dastar-e-Fazilat Ceremony',
      titleUr: 'سالانہ تقریبِ ختمِ قرآن و دستارِ فضیلت',
      category: 'Events',
      imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
      date: '2024-12-15',
      description: 'Honoring 35 new Huffaz-e-Quran and Ulama graduates in Sargodha.'
    },
    {
      id: 'gal-3',
      titleEn: 'Fresh Meals Distribution at Matbakh Ghousia',
      titleUr: 'مطبخِ غوثیہ میں طلباء کو تازہ کھانے کی فراہمی',
      category: 'Food Distribution',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      date: '2025-01-20',
      description: 'Daily nutritious lunch served to over 380 deserving students.'
    },
    {
      id: 'gal-4',
      titleEn: 'Eid-ul-Adha Qurbani Operations & Meat Packaging',
      titleUr: 'عید الاضحیٰ کے موقع پر اجتماعی قربانی اور گوشت کی پیکنگ',
      category: 'Qurbani',
      imageUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1200&q=80',
      date: '2024-06-17',
      description: 'Hygienic processing and distribution to rural villages of Sargodha.'
    },
    {
      id: 'gal-5',
      titleEn: 'Dars-e-Nizami Classroom Lecture by Senior Ustadh',
      titleUr: 'سینئر اساتذہ کے زیرِ تربیت درس نظامی کی کلاس',
      category: 'Education',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      date: '2025-01-08',
      description: 'Scholarly discourse on Usul al-Fiqh and Hadith texts.'
    },
    {
      id: 'gal-6',
      titleEn: 'Masjid Construction Milestone & Minaret Framing',
      titleUr: 'مسجد کی تعمیر اور گنبد و مینار کا منظر',
      category: 'Mosque Projects',
      imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
      date: '2024-11-12',
      description: 'Ongoing work on the prayer hall expansion in Nawab Colony.'
    },
    {
      id: 'gal-7',
      titleEn: 'Monthly Rashan Package Distribution Drive',
      titleUr: 'ماہانہ راشن پیکجز کی مستحقین میں تقسیم',
      category: 'Welfare',
      imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
      date: '2025-02-01',
      description: 'Helping widows and low-income families with essential grocery bags.'
    },
    {
      id: 'gal-8',
      titleEn: 'Students in Islamic Library Study & Research',
      titleUr: 'طلباء اسلامی لائبریری میں مطالعہ کرتے ہوئے',
      category: 'Students',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
      date: '2025-01-18',
      description: 'Dedicated study hours in the research library.'
    }
  ],
  news: [
    {
      id: 'news-1',
      titleEn: 'Admissions Open for Academic Year 2025-2026: Free Seats for Deserving Students',
      titleUr: 'تعلیمی سال 2025-2026 کے لیے داخلوں کا آغاز: مستحق طلباء کے لیے مفت نشستیں',
      slug: 'admissions-open-2025-2026',
      category: 'Admissions',
      summaryEn: 'Darul Uloom Muhammadiya Ghousia announces opening of new admissions for Hifz-ul-Quran and Dars-e-Nizami with 100% free tuition and boarding for deserving boys.',
      summaryUr: 'دارالعلوم محمدیہ غوثیہ میں حفظ القرآن اور درسِ نظامی کے نئے داخلوں کا اعلان۔ غریب اور مستحق طلباء کے لیے رہائش، خوراک اور کتب مکمل مفت۔',
      contentEn: 'Admissions are now officially open for the upcoming academic session. We invite parents and guardians to enroll their children in Hifz-ul-Quran, Tajweed, and Dars-e-Nizami. Deserving candidates from impoverished backgrounds, orphan children, and rural families receive full financial sponsorship covering all fees, books, meals, and medical support.',
      contentUr: 'دارالعلوم محمدیہ غوثیہ نواب کالونی سرگودھا میں نئے تعلیمی سال کے لیے داخلہ فارم دستیاب ہیں۔ حفظ و ناظرہ اور درسِ نظامی کے شعبہ جات میں معیاری دینی تعلیم دی جاتی ہے۔ نادار اور یتیم بچوں کے لیے تمام اخراجات ادارہ خود برداشت کرتا ہے۔',
      featuredImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=80',
      date: '2025-02-15',
      isPublished: true
    },
    {
      id: 'news-2',
      titleEn: 'Annual Qurbani 2025 Campaign Booking Open - 25+ Years of Trust in Sargodha',
      titleUr: 'سالانہ اجتماعی قربانی 2025 کے لیے بکنگ کا آغاز - 25 سالہ قابلِ اعتماد خدمت',
      slug: 'qurbani-campaign-2025-booking',
      category: 'Qurbani',
      summaryEn: 'Advance registration for cow shares and individual animals for Eid-ul-Adha 2025 has begun. Transparent Shariah slaughter and doorstep meat delivery guaranteed.',
      summaryUr: 'عید الاضحیٰ کے موقع پر گائے کے حصوں اور دیگر جانوروں کی اجتماعی قربانی کے لیے بکنگ شروع ہو چکی ہے۔',
      contentEn: 'Entering our 25th consecutive year of dedicated Qurbani services, Darul Uloom Muhammadiya Ghousia provides seamless collective Qurbani for locals and overseas Pakistani brothers. Meat is hygienically packed and systematically distributed to verified deserving households in rural villages of Sargodha.',
      contentUr: 'دارالعلوم کے زیراہتمام 25 سالہ مسلسل اجتماعی قربانی کا سلسلہ جاری ہے۔ اندرون و بیرونِ ملک مقیم احباب اپنے حصے بک کروا سکتے ہیں۔ گوشت کی تقسیم نادار اور مستحق گھرانوں میں شفاف طریقے سے کی جاتی ہے۔',
      featuredImage: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1000&q=80',
      date: '2025-02-01',
      isPublished: true
    },
    {
      id: 'news-3',
      titleEn: 'Completion of First Floor Structure for Jamia Masjid Ghousia',
      titleUr: 'جامع مسجد غوثیہ کی پہلی منزل کے تعمیراتی فریم کی تکمیل',
      slug: 'completion-of-first-floor-structure-jamia-masjid-ghousia',
      category: 'Mosque Project',
      summaryEn: 'Construction milestone achieved with pouring of first floor roof slab. Generous donor contributions urged for marble flooring and electrical work.',
      summaryUr: 'مسجد کے مرکزی ہال کی پہلی منزل کا لینٹر مکمل، اب ماربل اور وائرنگ کا کام شروع کیا جا رہا ہے۔',
      contentEn: 'By the grace of Almighty Allah, the structural work for the new expanded prayer hall at Jamia Masjid Ghousia in Nawab Colony is progressing on schedule. We extend heartfelt gratitude to all patrons and request continued support to finalize the finishing and acoustic works.',
      contentUr: 'اللہ تعالیٰ کے فضل و کرم سے نواب کالونی میں زیر تعمیر جامع مسجد غوثیہ کی پہلی منزل کا لینٹر مکمل ہو گیا ہے۔ تمام معاونین کا شکریہ اور بقیہ کاموں کے لیے تعاون کی اپیل ہے۔',
      featuredImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80',
      date: '2025-01-20',
      isPublished: true
    }
  ],
  events: [
    {
      id: 'evt-1',
      titleEn: '14th August Independence Day Celebration & Flag Hoisting',
      titleUr: 'جشنِ آزادی 14 اگست کی پروقار تقریب اور پرچم کشائی',
      category: '14 August & National',
      date: '2025-08-14',
      time: '08:30 AM - 12:00 PM',
      locationEn: 'Main Jamia Courtyard & Auditorium, Nawab Colony, Sargodha',
      locationUr: 'مرکزی صحن و آڈیٹوریم دارالعلوم، نواب کالونی، سرگودھا',
      descriptionEn: 'Grand Independence Day ceremony with national flag hoisting by senior scholars, patriotic national anthems by student Huffaz, speeches highlighting the sacrifices of Muslim leaders in the Pakistan Movement, distribution of sweets, and prayers for the prosperity and security of the motherland.',
      descriptionUr: 'دارالعلوم محمدیہ غوثیہ میں 14 اگست یومِ آزادی کے موقع پر شاندار تقریب، پرچم کشائی، طلباء کے ملی نغمے اور تحریکِ پاکستان میں علمائے حق کے کردار پر تقاریر۔ مادرِ وطن کی سلامتی و ترقی کے لیے خصوصی دعائیں اور مٹھائی کی تقسیم۔',
      featuredImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590076215667-873d26501193?auto=format&fit=crop&w=1200&q=80'
      ],
      status: 'completed',
      chiefGuestEn: 'Hazrat Allama Qari Muhammad Saeed (D.B) & Local Dignitaries',
      chiefGuestUr: 'حضرت علامہ قاری محمد سعید مدظلہ و معززینِ سرگودھا',
      organizerEn: 'Darul Uloom Student Affairs & Tarbiyah Committee',
      organizerUr: 'شعبہ طلباء امور و تربیت دارالعلوم'
    },
    {
      id: 'evt-2',
      titleEn: 'Grand Annual Mehfil-e-Milad-un-Nabi ﷺ & Durood Conference',
      titleUr: 'عظیم الشان سالانہ محفلِ میلاد النبی ﷺ و کانفرنس',
      category: 'Milad & Mahafil',
      date: '2025-09-18',
      time: 'After Isha Prayer (08:30 PM)',
      locationEn: 'Jamia Masjid Ghousia Complex, Main Sargodha Road, Sargodha',
      locationUr: 'جامع مسجد غوثیہ کمپلیکس، مین سرگودھا روڈ، سرگودھا',
      descriptionEn: 'A spiritually uplifting grand Mehfil-e-Milad-un-Nabi ﷺ featuring renowned international Qaris, world-famous Naat Khawans, inspiring discourses by prominent Shuyookh on the blessed Seerah of the Holy Prophet ﷺ, communal Durood-o-Salam, and lavish Langar-e-Ghousia dinner for thousands of attendees.',
      descriptionUr: 'ولادتِ باسعادت سرورِ کائنات ﷺ کی خوشی میں روح پرور سالانہ محفلِ میلاد النبی ﷺ۔ ملک کے نامور نعت خواں، قراء کرام اور جید علمائے کرام کے خطابات، اجتماعی درود و سلام اور وسیع لنگرِ غوثیہ کا اہتمام۔',
      featuredImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
      ],
      status: 'completed',
      chiefGuestEn: 'Renowned Mashaikh & Visiting Scholars',
      chiefGuestUr: 'مشائخِ عظام و ممتاز علماء کرام',
      organizerEn: 'Majlis-e-Ghousia & Welfare Trust',
      organizerUr: 'مجلسِ غوثیہ و ویلفیئر ٹرسٹ'
    },
    {
      id: 'evt-3',
      titleEn: 'Annual Urs-e-Mubarak & Dastar-e-Fazilat Convocation',
      titleUr: 'سالانہ عرسِ مبارک و تقریبِ دستارِ فضیلت',
      category: 'Urs Mubarak',
      date: '2026-03-22',
      time: '10:00 AM - 05:00 PM',
      locationEn: 'Darul Uloom Main Campus, Nawab Colony, Sargodha',
      locationUr: 'دارالعلوم مین کیمپس، نواب کالونی، سرگودھا',
      descriptionEn: 'The traditional annual Urs gathering dedicated to spiritual remembrance, Khatm-ul-Quran, and awarding graduation turbans (Dastar-e-Fazilat) and Sanads to new Huffaz and Alim-e-Deen scholars.',
      descriptionUr: 'روحانی محفل، ختمِ قرآن مجید، فارغ التحصیل حفاظِ کرام اور علماء کرام کے لیے دستارِ فضیلت و اسناد کی پروقار سالانہ تقریب۔',
      featuredImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80'
      ],
      status: 'upcoming',
      chiefGuestEn: 'Senior Leaders of Wafaq-ul-Madaris Al-Arabia',
      chiefGuestUr: 'قائدین وفاق المدارس العربیہ پاکستان',
      organizerEn: 'Darul Uloom Academic Council',
      organizerUr: 'تعلیمی کونسل دارالعلوم'
    },
    {
      id: 'evt-4',
      titleEn: 'Annual Khatm-e-Bukhari Sharif & Hadith Sanad Award',
      titleUr: 'سالانہ درسِ ختمِ بخاری شریف و تقسیمِ اسناد',
      category: 'Khatm-e-Bukhari & Convocation',
      date: '2026-04-10',
      time: '09:00 AM - 02:00 PM',
      locationEn: 'Central Prayer Hall, Jamia Masjid Ghousia, Sargodha',
      locationUr: 'مرکزی ہال، جامع مسجد غوثیہ، سرگودھا',
      descriptionEn: 'The sacred concluding lecture of Sahih al-Bukhari by revered Shaykh-ul-Hadith, conferring continuous chains of Hadith transmission to graduating scholars, followed by heartfelt communal Dua.',
      descriptionUr: 'جامعہ کے شیوخ الحدیث کی زیرِ نگرانی آخری حدیث شریف کا درس، مسلسل اسناد کی فراہمی اور امتِ مسلمہ کے لیے خصوصی دعا۔',
      featuredImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
      ],
      status: 'upcoming',
      chiefGuestEn: 'Senior Shaykh-ul-Hadith & Board of Scholars',
      chiefGuestUr: 'شیوخ الحدیث و اراکینِ شوریٰ',
      organizerEn: 'Department of Hadith Sciences',
      organizerUr: 'شعبہ علومِ حدیث شریف'
    }
  ],
  contactMessages: [
    {
      id: 'msg-1',
      name: 'Muhammad Tariq',
      email: 'tariq.sargodha@gmail.com',
      phone: '+92 300 1234567',
      subject: 'Inquiry regarding Hifz admission for orphan nephew',
      message: 'Assalam-o-Alaikum, I want to inquire about the admission procedure and free seat for my deceased brother\'s son in Hifz-ul-Quran program. Please guide.',
      date: '2025-02-20T10:30:00Z',
      isRead: false
    },
    {
      id: 'msg-2',
      name: 'Khurram Shehzad',
      email: 'khurram.uk@outlook.com',
      phone: '+44 7700 900123',
      subject: 'Overseas Qurbani 2025 Share Booking',
      message: 'Respected administration, I live in Birmingham UK and want to book 2 shares in Cow Qurbani for my family with distribution to poor people in Sargodha.',
      date: '2025-02-22T14:15:00Z',
      isRead: true
    }
  ],
  donationPledges: [
    {
      id: 'pld-1',
      donorName: 'Anonymous Brother',
      phone: '+92 300 7654321',
      email: 'donor@example.com',
      category: 'cat-food',
      amountPkr: 25000,
      paymentMethod: 'Bank Transfer (Meezan Bank)',
      transactionReference: 'TXN-98472911',
      date: '2025-02-24T09:00:00Z',
      notes: 'For students weekly food support.'
    }
  ],
  feedback: [
    {
      id: 'fb-1',
      name: 'Muhammad Asif',
      email: 'asif.dev@gmail.com',
      phone: '+92 321 4567890',
      category: 'Design & Usability',
      rating: 5,
      message: 'MashaAllah, the website layout, fonts, and dark green Islamic color scheme look very decent and readable on mobile phones.',
      pageUrl: 'https://darululoomghousiasargodha.org',
      date: '2025-02-25T11:20:00Z',
      status: 'reviewed'
    },
    {
      id: 'fb-2',
      name: 'Hafiz Umair Siddiqui',
      email: 'umair.quran@gmail.com',
      category: 'Content & Information',
      rating: 5,
      message: 'It would be great to continue adding more downloadable PDF Fatawa and Dars-e-Nizami books in the Islamic Library section. JazakAllah khair.',
      pageUrl: 'https://darululoomghousiasargodha.org/books',
      date: '2025-02-26T08:45:00Z',
      status: 'new'
    }
  ],
  admin: {
    username: 'admin',
    passwordHash: hashPassword('password123'), // default admin password
    email: 'admin@darululoomghousiasargodha.org',
    lastLogin: new Date().toISOString()
  }
};
