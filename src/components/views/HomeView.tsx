import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  UtensilsCrossed, 
  HeartHandshake, 
  Building2, 
  BookOpen, 
  Flame, 
  Landmark, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Phone,
  Download,
  Calendar,
  Users
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { data, language, setCurrentPage, openDonateModal } = useApp();

  const settings = data?.settings;
  const stats = data?.stats;
  const educationPrograms = data?.educationPrograms || [];
  const welfareProjects = data?.welfareProjects || [];
  const mosqueProjects = data?.mosqueProjects || [];
  const books = data?.books || [];
  const news = data?.news || [];

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] font-sans flex flex-col relative overflow-hidden">
      
      {/* Front Page Announcement Bar if set */}
      {(settings?.bannerNoticeEn || settings?.bannerNoticeUr) && (
        <div 
          className="text-white py-2 px-4 text-center text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border-b border-black/10 shadow-xs"
          style={{ backgroundColor: settings?.accentColor || '#D97706' }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'ur' ? (settings.bannerNoticeUr || settings.bannerNoticeEn) : (settings.bannerNoticeEn || settings.bannerNoticeUr)}</span>
        </div>
      )}

      {/* Subtle Geometric Background Watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#065F46]">
          <path d="M50 0L61.2 38.8H100L68.8 61.2L80 100L50 76.4L20 100L31.2 61.2L0 38.8H38.8L50 0Z" />
        </svg>
      </div>

      {/* HERO SECTION: Editorial 12-Column Grid */}
      <section 
        className="border-b border-[#E5E1D8]"
        style={{ backgroundColor: settings?.heroBgColor || '#FFFFFF' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Main Hero Column (8 cols) */}
          <div className="lg:col-span-8 p-8 sm:p-12 lg:p-16 flex flex-col justify-between lg:border-r border-[#E5E1D8]">
            <div className="max-w-2xl">
              <span 
                className="text-xs font-bold uppercase tracking-widest mb-4 block"
                style={{ color: settings?.accentColor || '#D97706' }}
              >
                {language === 'ur' 
                  ? (settings?.heroBadgeUr || 'علم و تقویٰ کی ضیا پاشی — خدمتِ خلق کا استعارہ') 
                  : (settings?.heroBadgeEn || 'Empowering Through Faith & Traditional Knowledge')}
              </span>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.05] mb-6 text-[#111827]">
                {language === 'ur' ? (
                  <span className="font-urdu leading-tight">
                    {settings?.heroTitleUr || 'روحانی و علمی تربیت کا مقدس گہوارہ'}
                  </span>
                ) : (
                  <span>
                    {settings?.heroTitleEn || 'Nurturing the Spiritual & Intellectual Journey'}
                  </span>
                )}
              </h2>

              <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed mb-8">
                {language === 'ur'
                  ? (settings?.heroSubtitleUr || 'دارالعلوم محمدیہ غوثیہ، نواب کالونی، سرگودھا گزشتہ دو دہائیوں سے نادار طلباء کی 100% مفت دینی و عصری تعلیم، مفت طعام، مساجد کی تعمیر اور فلاحی خدمات کی فراہمی میں مصروفِ عمل ہے۔')
                  : (settings?.heroSubtitleEn || 'Providing comprehensive classical Islamic education, 100% free boarding and nutritious meals for deserving students, and vital welfare services in Sargodha for over two decades.')}
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="bg-[#111827] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
                >
                  {language === 'ur' ? 'ہمارا تعارف و مشن' : 'Our Mission'}
                </button>
                <button 
                  onClick={() => openDonateModal()}
                  className="text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
                  style={{ backgroundColor: settings?.primaryColor || '#065F46' }}
                >
                  {language === 'ur' ? 'تعاون و عطیات' : 'Support Us'}
                </button>
              </div>
            </div>

            {/* 4 Stat Indicators with Left Border Accent */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[#E5E1D8]">
              <div 
                className="border-l-2 pl-4 py-1"
                style={{ borderColor: settings?.primaryColor || '#065F46' }}
              >
                <div 
                  className="text-3xl font-serif font-bold"
                  style={{ color: settings?.primaryColor || '#065F46' }}
                >
                  {stats?.yearsOfService || 25}+
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280] tracking-widest mt-1">
                  {language === 'ur' ? 'سالہ خدمت' : 'Years of Service'}
                </div>
              </div>

              <div 
                className="border-l-2 pl-4 py-1"
                style={{ borderColor: settings?.primaryColor || '#065F46' }}
              >
                <div 
                  className="text-3xl font-serif font-bold"
                  style={{ color: settings?.primaryColor || '#065F46' }}
                >
                  {stats?.totalStudents || (stats as any)?.studentsEnrolled || 500}+
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280] tracking-widest mt-1">
                  {language === 'ur' ? 'زیرِ تعلیم طلباء' : 'Students Enrolled'}
                </div>
              </div>

              <div 
                className="border-l-2 pl-4 py-1"
                style={{ borderColor: settings?.primaryColor || '#065F46' }}
              >
                <div 
                  className="text-3xl font-serif font-bold"
                  style={{ color: settings?.primaryColor || '#065F46' }}
                >
                  {stats?.freeFoodStudents ? `${stats.freeFoodStudents}+` : '100%'}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280] tracking-widest mt-1">
                  {language === 'ur' ? 'مفت طعام پروگرام' : 'Free Food Program'}
                </div>
              </div>

              <div 
                className="border-l-2 pl-4 py-1"
                style={{ borderColor: settings?.primaryColor || '#065F46' }}
              >
                <div 
                  className="text-3xl font-serif font-bold"
                  style={{ color: settings?.primaryColor || '#065F46' }}
                >
                  {stats?.mosquesSupported || (stats as any)?.mosquesConstructed || 12}+
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280] tracking-widest mt-1">
                  {language === 'ur' ? 'تعمیر شدہ مساجد' : 'Mosque Projects'}
                </div>
              </div>
            </div>

          </div>

          {/* Right Editorial Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 bg-[#F8F9F5] p-8 sm:p-10 flex flex-col justify-between gap-8">
            
            {/* Admin-Configured Visual Atmosphere */}
            {settings?.pageBackgrounds?.home && (
              <div className="relative h-44 border border-[#E5E1D8] overflow-hidden group shadow-xs">
                <img
                  src={settings.pageBackgrounds.home}
                  alt="Darul Uloom Campus"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#D97706] block">
                    Campus Atmosphere
                  </span>
                  <p className="text-xs font-serif font-bold text-white leading-tight">
                    Darul Uloom Muhammadiya Ghousia, Sargodha
                  </p>
                </div>
              </div>
            )}

            {/* Urgent & Active Welfare Initiatives */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46] mb-5 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#065F46]"></span>
                <span>{language === 'ur' ? 'فلاحی سرگرمیاں و ترجیحات' : 'Welfare Projects'}</span>
              </h3>

              <div className="space-y-4">
                {/* Urgent Mosque Project Card */}
                <div className="bg-white p-5 border border-[#E5E1D8] border-l-4 border-l-[#D97706] shadow-xs">
                  <div className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest mb-1 flex items-center justify-between">
                    <span>URGENT APPEAL</span>
                    <span className="text-gray-400">Sargodha</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#111827] mb-1">
                    {language === 'ur' ? 'جامع مسجد غوثیہ تعمیراتی منصوبہ' : 'New Mosque Construction'}
                  </h4>
                  <p className="text-[11px] text-[#4B5563] mb-3">
                    Construction of a 300+ capacity community prayer hall with dedicated ablution block and water filtration.
                  </p>
                  <div className="w-full bg-[#E5E7EB] h-1.5 rounded-none mb-2">
                    <div className="bg-[#065F46] h-full w-[65%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">
                    <span>65% Funded</span>
                    <span>Rs. 1.2M Remaining</span>
                  </div>
                </div>

                {/* Annual Qurbani Highlight */}
                <div 
                  onClick={() => setCurrentPage('qurbani')}
                  className="bg-white p-4 border border-[#E5E1D8] border-l-4 border-l-[#065F46] shadow-xs cursor-pointer hover:border-[#065F46] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-serif font-bold text-sm text-[#111827]">
                      {language === 'ur' ? '25 سالہ سالانہ خدمتِ قربانی' : 'Annual Qurbani 2024'}
                    </h4>
                    <Flame className="w-3.5 h-3.5 text-[#D97706]" />
                  </div>
                  <p className="text-[11px] text-[#4B5563] leading-relaxed">
                    Fresh meat distribution for 2,000+ deserving families and orphan students across Sargodha.
                  </p>
                </div>

                {/* Zakat Assistance */}
                <div 
                  onClick={() => setCurrentPage('zakat')}
                  className="bg-white p-4 border border-[#E5E1D8] border-l-4 border-l-[#065F46] shadow-xs cursor-pointer hover:border-[#065F46] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-serif font-bold text-sm text-[#111827]">
                      {language === 'ur' ? 'شعبہ زکوٰۃ و امداد' : 'Shariah Zakat Assistance'}
                    </h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#065F46]" />
                  </div>
                  <p className="text-[11px] text-[#4B5563] leading-relaxed">
                    100% transparent Tamleek-compliant Zakat distribution for orphan kits, books, and emergency medical aid.
                  </p>
                </div>
              </div>
            </div>

            {/* Library Highlight Card */}
            <div className="pt-4 border-t border-[#E5E1D8]">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46] mb-3">
                {language === 'ur' ? 'کتب لائبریری' : 'Library Highlights'}
              </h3>
              <div 
                onClick={() => setCurrentPage('books')}
                className="flex gap-4 items-center bg-white p-3.5 border border-[#E5E1D8] cursor-pointer hover:border-[#065F46] transition-colors"
              >
                <div className="w-12 h-16 bg-[#111827] flex items-center justify-center text-white text-[10px] font-serif font-bold text-center p-1 uppercase leading-tight shrink-0">
                  Kitab Al-Fiqh
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-[#111827] mb-0.5">
                    {language === 'ur' ? 'فقہی مسائل و رہنمائی' : 'Islamic Jurisprudence'}
                  </p>
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-semibold">
                    Free PDF Downloads Available
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: THE PILLARS OF EDUCATION (Editorial 3-Column Layout) */}
      <section className="py-16 px-6 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E1D8] gap-4">
          <div>
            <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-2">
              Academic Excellence in Classical Sciences
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#111827]">
              {language === 'ur' ? 'دینی تعلیمی شعبہ جات' : 'Core Educational Programs'}
            </h3>
          </div>
          <button 
            onClick={() => setCurrentPage('education')}
            className="text-xs font-bold uppercase tracking-widest text-[#065F46] hover:text-[#044E39] flex items-center gap-2"
          >
            <span>{language === 'ur' ? 'تمام شعبہ جات دیکھیں' : 'View Full Curriculum'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationPrograms.slice(0, 3).map((prog, idx) => (
            <div 
              key={prog.id} 
              className="bg-white border border-[#E5E1D8] p-8 flex flex-col justify-between hover:border-[#065F46] transition-all relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] bg-[#FDFBF7] px-2 py-1 border border-[#E5E1D8]">
                    {prog.durationEn}
                  </span>
                  <span className="text-xs font-serif font-bold text-gray-300">
                    0{idx + 1}
                  </span>
                </div>
                
                <h4 className="text-xl font-serif font-bold text-[#111827] group-hover:text-[#065F46] transition-colors">
                  {language === 'ur' ? prog.titleUr : prog.titleEn}
                </h4>

                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {language === 'ur' ? prog.descriptionUr : prog.descriptionEn}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[#E5E1D8]/60">
                  {(language === 'ur' ? prog.keySubjectsUr : prog.keySubjectsEn)?.slice(0, 3).map((sub, i) => (
                    <div key={i} className="text-[11px] text-[#6B7280] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#065F46]"></span>
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E1D8] flex items-center justify-between text-xs">
                <span className="text-[#6B7280] font-medium">{prog.studentsCount}+ Enrolled</span>
                <button 
                  onClick={() => setCurrentPage('education')}
                  className="font-bold text-[#065F46] uppercase tracking-widest text-[10px] hover:underline"
                >
                  Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: EDITORIAL BANNER — 100% FREE FOOD PROGRAM (MATBAKH) */}
      <section className="bg-[#111827] text-white py-16 px-6 sm:px-12 border-y border-gray-800 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block">
              Dignified Care & Sustenance
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight">
              {language === 'ur' ? (
                <span className="font-urdu">روزانہ مفت طعام پروگرام (مطبخِ غوثیہ)</span>
              ) : (
                'Nourishing Deserving Students with 100% Free Daily Meals'
              )}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'دارالعلوم کے مطبخ میں روزانہ سینکڑوں طلباء اور مستحقین کے لیے دو وقت کا تازہ، معیاری اور غذائیت سے بھرپور کھانا تیار کیا جاتا ہے۔ آپ بھی ایک طالب علم کے ماہانہ راشن کی کفالت کر سکتے ہیں۔'
                : 'Every morning and evening, fresh nutritious meals are prepared and served to all residential students, orphans, and travelers free of charge in our Nawab Colony premises.'}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="border-l border-[#D97706] pl-3">
                <div className="text-2xl font-serif font-bold text-white">600+</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Meals / Day</div>
              </div>
              <div className="border-l border-[#D97706] pl-3">
                <div className="text-2xl font-serif font-bold text-white">PKR 6,000</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Student / Mo</div>
              </div>
              <div className="border-l border-[#D97706] pl-3">
                <div className="text-2xl font-serif font-bold text-white">100%</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Free to Students</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => openDonateModal('cat-food')}
                className="bg-[#065F46] hover:bg-[#044E39] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
              >
                {language === 'ur' ? 'طعام کے لیے عطیہ دیں' : 'Sponsor Student Meals'}
              </button>
              <button 
                onClick={() => setCurrentPage('food')}
                className="border border-gray-600 text-gray-200 px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:border-white hover:text-white transition-colors"
              >
                {language === 'ur' ? 'تفصیلات مطبخ' : 'Matbakh Details'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#1F2937] p-8 border border-gray-700 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D97706] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Sponsorship Breakdown</span>
            </h4>
            
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center py-2.5 border-b border-gray-700">
                <span className="text-gray-300">Daily Breakfast & Tea</span>
                <span className="font-serif font-bold text-white">PKR 100 / day</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-gray-700">
                <span className="text-gray-300">One Student Monthly Food</span>
                <span className="font-serif font-bold text-[#D97706]">PKR 6,000 / mo</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-gray-700">
                <span className="text-gray-300">Complete Deg (Langar for 80 People)</span>
                <span className="font-serif font-bold text-white">PKR 14,000</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-gray-300">Monthly Kitchen Flour & Ghee Fund</span>
                <span className="font-serif font-bold text-white">PKR 45,000</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 italic">
              "The best of you are those who feed others." — Prophet Muhammad (ﷺ)
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: MOSQUE CONSTRUCTION & WELFARE (Editorial Grid) */}
      <section className="py-16 px-6 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Mosque Projects */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-1">
                Sadaqah Jariyah in Sargodha
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
                {language === 'ur' ? 'تعمیرِ مساجد پروجیکٹس' : 'Mosque Building & Uplift Projects'}
              </h3>
            </div>

            <div className="space-y-4">
              {mosqueProjects.map((m) => {
                const status = m.constructionStatus || (m as any).status || 'In Progress';
                const raised = m.amountRaisedPkr ?? (m as any).collectedPkr ?? 0;
                const target = m.requiredFundingPkr ?? (m as any).estimatedCostPkr ?? 1;
                const percentage = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;

                return (
                  <div key={m.id} className="bg-white border border-[#E5E1D8] p-6 hover:border-[#065F46] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-serif font-bold text-lg text-[#111827]">
                          {language === 'ur' ? m.nameUr : m.nameEn}
                        </h4>
                        <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>{language === 'ur' ? m.locationUr : m.locationEn}</span>
                        </p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border ${
                        status === 'Completed' || status === 'completed'
                          ? 'bg-emerald-50 text-[#065F46] border-[#065F46]'
                          : 'bg-amber-50 text-[#D97706] border-[#D97706]'
                      }`}>
                        {status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                      {language === 'ur' ? m.descriptionUr : m.descriptionEn}
                    </p>

                    <div className="space-y-1.5">
                      <div className="w-full bg-[#E5E7EB] h-1.5">
                        <div 
                          className="bg-[#065F46] h-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">
                        <span>Raised: PKR {raised.toLocaleString()}</span>
                        <span>Target: PKR {target.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: News & Announcements */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-1">
                Updates & Notifications
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
                {language === 'ur' ? 'خبریں و اعلانات' : 'Latest News & Admissions'}
              </h3>
            </div>

            <div className="space-y-4">
              {news.slice(0, 3).map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setCurrentPage('news')}
                  className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-5 cursor-pointer hover:bg-[#F8F9F5] transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">
                    <span>{item.date}</span>
                    <span className="text-[#D97706] font-bold">{item.category}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#111827] mb-1.5 hover:text-[#065F46] transition-colors">
                    {language === 'ur' ? item.titleUr : item.titleEn}
                  </h4>
                  <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
                    {language === 'ur' ? item.summaryUr : item.summaryEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[#F8F9F5] border border-[#E5E1D8] p-6 text-center space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#111827]">
                {language === 'ur' ? 'داخلہ و رہنمائی برائے طلباء' : 'New Academic Year Admissions'}
              </h4>
              <p className="text-xs text-[#4B5563]">
                Free boarding, books, and scholarship packages available for deserving students.
              </p>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-[#111827] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
              >
                {language === 'ur' ? 'داخلہ معلومات حاصل کریں' : 'Inquire for Admission'}
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
