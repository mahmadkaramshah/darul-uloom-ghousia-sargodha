import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Search, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  HeartHandshake, 
  Newspaper, 
  ArrowRight,
  Sparkles,
  UtensilsCrossed,
  Landmark,
  Coins,
  Flame,
  Users,
  Calendar,
  Award
} from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, closeSearchModal, data, language, setCurrentPage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open & handle Escape key
  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchModalOpen) {
        closeSearchModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, closeSearchModal]);

  // Safe search through all categories with complete null/undefined protection
  const results = useMemo(() => {
    if (!searchTerm.trim() || !data) return [];
    const query = searchTerm.toLowerCase().trim();

    const items: Array<{
      id: string;
      title: string;
      category: string;
      snippet: string;
      page: string;
      icon: any;
    }> = [];

    const safeStr = (val: unknown): string => {
      if (typeof val === 'string') return val;
      if (typeof val === 'number') return String(val);
      return '';
    };

    try {
      // 1. Search Education Programs
      if (Array.isArray(data.educationPrograms)) {
        data.educationPrograms.forEach((prog) => {
          if (!prog) return;
          const tEn = safeStr(prog.titleEn);
          const tUr = safeStr(prog.titleUr);
          const dEn = safeStr(prog.descriptionEn);
          const dUr = safeStr(prog.descriptionUr);

          if (
            tEn.toLowerCase().includes(query) ||
            tUr.toLowerCase().includes(query) ||
            dEn.toLowerCase().includes(query) ||
            dUr.toLowerCase().includes(query)
          ) {
            items.push({
              id: prog.id || `prog-${Math.random()}`,
              title: language === 'ur' ? (tUr || tEn) : (tEn || tUr),
              category: language === 'ur' ? 'تعلیمی شعبہ' : 'Education Program',
              snippet: language === 'ur' 
                ? (dUr.slice(0, 110) || 'شعبہ دینی تعلیم و درسِ نظامی') + '...' 
                : (dEn.slice(0, 110) || 'Classical Islamic Education Program') + '...',
              page: 'education',
              icon: GraduationCap,
            });
          }
        });
      }

      // 2. Search Welfare Projects
      if (Array.isArray(data.welfareProjects)) {
        data.welfareProjects.forEach((proj) => {
          if (!proj) return;
          const tEn = safeStr(proj.titleEn);
          const tUr = safeStr(proj.titleUr);
          const dEn = safeStr(proj.descriptionEn);
          const dUr = safeStr(proj.descriptionUr);

          if (
            tEn.toLowerCase().includes(query) ||
            tUr.toLowerCase().includes(query) ||
            dEn.toLowerCase().includes(query) ||
            dUr.toLowerCase().includes(query)
          ) {
            items.push({
              id: proj.id || `welfare-${Math.random()}`,
              title: language === 'ur' ? (tUr || tEn) : (tEn || tUr),
              category: language === 'ur' ? 'فلاحی منصوبہ' : 'Welfare Project',
              snippet: language === 'ur' 
                ? (dUr.slice(0, 110) || 'فلاحی خدمات و امداد') + '...' 
                : (dEn.slice(0, 110) || 'Community Welfare Program') + '...',
              page: 'welfare',
              icon: HeartHandshake,
            });
          }
        });
      }

      // 3. Search Mosque Projects
      if (Array.isArray(data.mosqueProjects)) {
        data.mosqueProjects.forEach((mosq) => {
          if (!mosq) return;
          const nEn = safeStr(mosq.nameEn);
          const nUr = safeStr(mosq.nameUr);
          const lEn = safeStr(mosq.locationEn);
          const lUr = safeStr(mosq.locationUr);
          const dEn = safeStr(mosq.descriptionEn);
          const dUr = safeStr(mosq.descriptionUr);

          if (
            nEn.toLowerCase().includes(query) ||
            nUr.toLowerCase().includes(query) ||
            lEn.toLowerCase().includes(query) ||
            lUr.toLowerCase().includes(query) ||
            dEn.toLowerCase().includes(query) ||
            dUr.toLowerCase().includes(query)
          ) {
            items.push({
              id: mosq.id || `mosque-${Math.random()}`,
              title: language === 'ur' ? (nUr || nEn) : (nEn || nUr),
              category: language === 'ur' ? 'تعمیرِ مسجد' : 'Mosque Project',
              snippet: language === 'ur' 
                ? `${lUr || lEn} — ${dUr.slice(0, 80)}...` 
                : `${lEn || lUr} — ${dEn.slice(0, 80)}...`,
              page: 'mosque',
              icon: Building2,
            });
          }
        });
      }

      // 4. Search Books
      if (Array.isArray(data.books)) {
        data.books.forEach((book) => {
          if (!book) return;
          const title = safeStr(book.title || (book as any).titleEn);
          const titleUr = safeStr(book.titleUr);
          const author = safeStr(book.author || (book as any).authorEn);
          const authorUr = safeStr((book as any).authorUr);
          const category = safeStr(book.category);
          const desc = safeStr(book.description);

          if (
            title.toLowerCase().includes(query) ||
            titleUr.toLowerCase().includes(query) ||
            author.toLowerCase().includes(query) ||
            authorUr.toLowerCase().includes(query) ||
            category.toLowerCase().includes(query) ||
            desc.toLowerCase().includes(query)
          ) {
            items.push({
              id: book.id || `book-${Math.random()}`,
              title: language === 'ur' ? (titleUr || title) : (title || titleUr),
              category: language === 'ur' ? 'اسلامی کتب' : 'Islamic Library',
              snippet: `${author || 'Scholar'} • ${category || 'Islamic Studies'}`,
              page: 'books',
              icon: BookOpen,
            });
          }
        });
      }

      // 5. Search News & Announcements
      if (Array.isArray(data.news)) {
        data.news.forEach((nw) => {
          if (!nw) return;
          const tEn = safeStr(nw.titleEn);
          const tUr = safeStr(nw.titleUr);
          const cEn = safeStr(nw.contentEn);
          const cUr = safeStr(nw.contentUr);
          const sEn = safeStr(nw.summaryEn);
          const sUr = safeStr(nw.summaryUr);

          if (
            tEn.toLowerCase().includes(query) ||
            tUr.toLowerCase().includes(query) ||
            cEn.toLowerCase().includes(query) ||
            cUr.toLowerCase().includes(query) ||
            sEn.toLowerCase().includes(query) ||
            sUr.toLowerCase().includes(query)
          ) {
            items.push({
              id: nw.id || `news-${Math.random()}`,
              title: language === 'ur' ? (tUr || tEn) : (tEn || tUr),
              category: language === 'ur' ? 'خبر / اعلان' : 'News & Notice',
              snippet: language === 'ur' 
                ? (sUr || cUr).slice(0, 100) + '...' 
                : (sEn || cEn).slice(0, 100) + '...',
              page: 'news',
              icon: Newspaper,
            });
          }
        });
      }

      // 6. Search Bank & Financial Accounts
      if (data.donationDetails?.bankAccounts && Array.isArray(data.donationDetails.bankAccounts)) {
        data.donationDetails.bankAccounts.forEach((acc) => {
          if (!acc) return;
          const bName = safeStr(acc.bankName);
          const aTitle = safeStr(acc.accountTitle);
          const aNum = safeStr(acc.accountNumber);
          const iban = safeStr(acc.iban);

          if (
            bName.toLowerCase().includes(query) ||
            aTitle.toLowerCase().includes(query) ||
            aNum.toLowerCase().includes(query) ||
            iban.toLowerCase().includes(query) ||
            query.includes('bank') ||
            query.includes('account') ||
            query.includes('meezan') ||
            query.includes('بینک') ||
            query.includes('کھاتہ')
          ) {
            items.push({
              id: acc.id || `bank-${Math.random()}`,
              title: `${bName} (${acc.currency || 'PKR'})`,
              category: language === 'ur' ? 'بینک اکاؤنٹ' : 'Bank Account',
              snippet: `Title: ${aTitle} • A/C: ${aNum} • IBAN: ${iban}`,
              page: 'donation',
              icon: Landmark,
            });
          }
        });
      }

      // 6B. Search Events & Mehfils
      if (Array.isArray((data as any).events)) {
        (data as any).events.forEach((ev: any) => {
          if (!ev) return;
          const tEn = safeStr(ev.titleEn);
          const tUr = safeStr(ev.titleUr);
          const dEn = safeStr(ev.descriptionEn);
          const dUr = safeStr(ev.descriptionUr);
          const loc = safeStr(ev.location);
          if (
            tEn.toLowerCase().includes(query) ||
            tUr.toLowerCase().includes(query) ||
            dEn.toLowerCase().includes(query) ||
            dUr.toLowerCase().includes(query) ||
            loc.toLowerCase().includes(query) ||
            query.includes('event') ||
            query.includes('mehfil') ||
            query.includes('14 august') ||
            query.includes('محفل')
          ) {
            items.push({
              id: ev.id || `ev-${Math.random()}`,
              title: language === 'ur' ? (tUr || tEn) : (tEn || tUr),
              category: language === 'ur' ? 'تقریبات و محافل' : 'Event & Mehfil',
              snippet: `${ev.date ? ev.date + ' • ' : ''}${loc ? loc + ' • ' : ''}${language === 'ur' ? (dUr || dEn).slice(0, 80) : (dEn || dUr).slice(0, 80)}`,
              page: 'events',
              icon: Calendar,
            });
          }
        });
      }

      // 6C. Search Faculty & Leadership
      if (Array.isArray((data as any).faculty)) {
        (data as any).faculty.forEach((fac: any) => {
          if (!fac) return;
          const nEn = safeStr(fac.nameEn);
          const nUr = safeStr(fac.nameUr);
          const rEn = safeStr(fac.roleEn);
          const rUr = safeStr(fac.roleUr);
          if (
            nEn.toLowerCase().includes(query) ||
            nUr.toLowerCase().includes(query) ||
            rEn.toLowerCase().includes(query) ||
            rUr.toLowerCase().includes(query) ||
            query.includes('teacher') ||
            query.includes('faculty') ||
            query.includes('leadership') ||
            query.includes('استاد') ||
            query.includes('اساتذہ')
          ) {
            items.push({
              id: fac.id || `fac-${Math.random()}`,
              title: language === 'ur' ? (nUr || nEn) : (nEn || nUr),
              category: language === 'ur' ? 'اساتذہ و قیادت' : 'Faculty & Leadership',
              snippet: `${language === 'ur' ? (rUr || rEn) : (rEn || rUr)} • ${fac.department || ''}`,
              page: 'about',
              icon: Award,
            });
          }
        });
      }

      // 7. General Keyword Matching for Food, Qurbani, Zakat, Students
      if ('matbakh'.includes(query) || 'food'.includes(query) || 'کھانا'.includes(query) || 'طعام'.includes(query)) {
        items.push({
          id: 'topic-food',
          title: language === 'ur' ? 'مطبخِ غوثیہ — روزانہ مفت طعام' : 'Matbakh-e-Ghousia Free Food Service',
          category: language === 'ur' ? 'خدمتِ طعام' : 'Food Program',
          snippet: language === 'ur' ? 'طلباء اور مہمانوں کے لیے دو وقت کا تازہ و باوقار کھانا' : 'Serving 600+ fresh daily meals to residential students.',
          page: 'food',
          icon: UtensilsCrossed,
        });
      }

      if ('qurbani'.includes(query) || 'قربانی'.includes(query) || 'eid'.includes(query)) {
        items.push({
          id: 'topic-qurbani',
          title: language === 'ur' ? 'سالانہ اجتماعی قربانی مہم' : 'Annual Collective Qurbani Campaign',
          category: language === 'ur' ? 'قربانی' : 'Qurbani Service',
          snippet: language === 'ur' ? '25 سالہ قابلِ اعتماد شرعی اجتماعی قربانی کی سہولت' : 'Online share booking and door-to-door distribution in Sargodha.',
          page: 'qurbani',
          icon: Flame,
        });
      }

      if ('zakat'.includes(query) || 'زکوٰۃ'.includes(query) || 'sadqah'.includes(query) || 'صدقہ'.includes(query)) {
        items.push({
          id: 'topic-zakat',
          title: language === 'ur' ? 'شرعی رہنمائی و زکوٰۃ کیلکولیٹر' : 'Zakat Rules & Deserving Student Fund',
          category: language === 'ur' ? 'زکوٰۃ' : 'Zakat Guidelines',
          snippet: language === 'ur' ? 'مستحق اور نادار طلباء کی کفالت کے لیے زکوٰۃ کا صحیح استعمال' : 'Guidelines on calculating and channeling Zakat for deserving students.',
          page: 'zakat',
          icon: Coins,
        });
      }

      if ('student'.includes(query) || 'طالب علم'.includes(query) || 'طلباء'.includes(query) || 'admission'.includes(query)) {
        items.push({
          id: 'topic-students',
          title: language === 'ur' ? 'طلباء ڈائریکٹری و داخلہ' : 'Students Directory & Admissions',
          category: language === 'ur' ? 'طلباء' : 'Students Roster',
          snippet: language === 'ur' ? 'حفظ و درسِ نظامی کے طلباء کی معلومات اور کفالت' : 'Information on enrolled students and sponsorship programs.',
          page: 'students',
          icon: Users,
        });
      }

    } catch (err) {
      console.error('Search processing error:', err);
    }

    return items;
  }, [searchTerm, data, language]);

  if (!isSearchModalOpen) return null;

  const handleSelect = (page: string) => {
    if (page) {
      setCurrentPage(page as any);
    }
    closeSearchModal();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSearchModal();
      }}
    >
      <div 
        className="bg-[#FDFBF7] rounded-none shadow-2xl border border-[#E5E1D8] max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Bar Header */}
        <div className="p-4 bg-white border-b border-[#E5E1D8] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#065F46] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'ur' ? 'پورٹل پر تلاش کریں: کتب، تعلیمی شعبہ جات، مساجد، بینک اکاؤنٹ...' : 'Search portal: programs, books, mosques, qurbani, zakat, bank accounts...'}
            className="w-full text-sm sm:text-base bg-transparent border-none focus:outline-hidden text-[#111827] placeholder:text-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-semibold text-gray-400 hover:text-gray-700 px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearchModal}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-[#F8F9F5] rounded transition-colors"
            title="Close (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Topic Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {!searchTerm.trim() ? (
            <div className="py-8 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-[#D97706] mx-auto opacity-70" />
              <div className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">
                {language === 'ur' ? 'مقبول ترین عنوانات' : 'Popular Topics & Quick Access'}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto pt-2">
                {[
                  { label: 'Dars-e-Nizami (Alim Course)', page: 'education' },
                  { label: 'Hifz & Tajweed', page: 'education' },
                  { label: 'Daily Free Matbakh', page: 'food' },
                  { label: 'Annual Qurbani', page: 'qurbani' },
                  { label: 'Zakat Rules & Aid', page: 'zakat' },
                  { label: 'Mosque Construction', page: 'mosque' },
                  { label: 'Books Library (PDFs)', page: 'books' },
                  { label: 'Official Bank Accounts', page: 'donation' },
                  { label: 'Student Sponsorship', page: 'students' },
                ].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(s.page)}
                    className="text-xs bg-white border border-[#E5E1D8] hover:border-[#065F46] hover:text-[#065F46] text-[#4B5563] px-3 py-1.5 transition-colors cursor-pointer"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] px-1 pb-1">
                {results.length} {language === 'ur' ? 'نتائج ملے' : 'results found'}
              </div>
              {results.map((res) => {
                const Icon = res.icon || BookOpen;
                return (
                  <div
                    key={res.id}
                    onClick={() => handleSelect(res.page)}
                    className="p-3 bg-white hover:bg-[#F8F9F5] border border-[#E5E1D8] border-l-4 border-l-[#065F46] cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#D97706]">
                          {res.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-[#111827] group-hover:text-[#065F46] transition-colors">
                        {res.title}
                      </h4>
                      <p className="text-xs text-[#4B5563] line-clamp-1">
                        {res.snippet}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#065F46] group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-[#6B7280] space-y-2">
              <p className="text-sm font-medium">
                {language === 'ur' 
                  ? `"${searchTerm}" کے لیے کوئی نتیجہ نہیں ملا۔ برائے مہربانی مختلف الفاظ سے تلاش کریں۔` 
                  : `No records found matching "${searchTerm}".`}
              </p>
              <p className="text-xs text-gray-400">
                Try searching for &quot;Meezan&quot;, &quot;Hifz&quot;, &quot;Zakat&quot;, &quot;Matbakh&quot;, or &quot;Books&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8F9F5] border-t border-[#E5E1D8] flex items-center justify-between text-[11px] text-[#6B7280]">
          <span>Darul Uloom Muhammadiya Ghousia Sargodha</span>
          <span>Press <kbd className="bg-white border px-1 py-0.5 font-mono text-[10px] text-gray-600">ESC</kbd> to close</span>
        </div>

      </div>
    </div>
  );
};
