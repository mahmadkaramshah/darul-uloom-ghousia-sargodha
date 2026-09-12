import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Landmark, 
  CheckCircle2, 
  Calculator, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Quote, 
  HelpCircle,
  Coins,
  Scale
} from 'lucide-react';
import { ZakatQuoteItem } from '../../types';

export const ZakatView: React.FC = () => {
  const { data, language, openDonateModal } = useApp();
  const zakat = data?.zakat;
  const pageBg = data?.settings?.pageBackgrounds?.zakat || zakat?.headerBackgroundImage || 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80';

  // Calculator Rates
  const defaultGoldRate = zakat?.goldRatePerGramPkr || 24000;
  const defaultSilverRate = zakat?.silverRatePerGramPkr || 290;

  // Zakat Calculator State
  const [cash, setCash] = useState<number>(0);
  const [goldGrams, setGoldGrams] = useState<number>(0);
  const [goldRatePerGram, setGoldRatePerGram] = useState<number>(defaultGoldRate);
  const [silverGrams, setSilverGrams] = useState<number>(0);
  const [silverRatePerGram, setSilverRatePerGram] = useState<number>(defaultSilverRate);
  const [businessStock, setBusinessStock] = useState<number>(0);
  const [liabilities, setLiabilities] = useState<number>(0);

  useEffect(() => {
    if (zakat?.goldRatePerGramPkr) setGoldRatePerGram(zakat.goldRatePerGramPkr);
    if (zakat?.silverRatePerGramPkr) setSilverRatePerGram(zakat.silverRatePerGramPkr);
  }, [zakat?.goldRatePerGramPkr, zakat?.silverRatePerGramPkr]);

  const goldValue = (goldGrams || 0) * (goldRatePerGram || 0);
  const silverValue = (silverGrams || 0) * (silverRatePerGram || 0);
  const totalAssets = (Number(cash) || 0) + goldValue + silverValue + (Number(businessStock) || 0);
  const netWealth = Math.max(0, totalAssets - (Number(liabilities) || 0));
  const zakatPayable = Math.round(netWealth * 0.025);

  // Nisab based on 52.5 tolas / ~612.36 grams of silver
  const silverNisabThreshold = 612.36 * silverRatePerGram;
  const isEligibleForZakat = netWealth >= silverNisabThreshold;

  const defaultQuotes: ZakatQuoteItem[] = [
    {
      id: 'quote-1',
      category: 'quran',
      arabicText: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا وَصَلِّ عَلَيْهِمْ',
      translationUr: 'ان کے اموال میں سے زکوٰۃ وصول کیجیے جس کے ذریعے آپ انہیں پاک اور بابرکت بنائیں اور ان کے حق میں دعا فرمائیں۔',
      translationEn: 'Take from their wealth a charity by which you purify them and cause them increase, and pray for them.',
      reference: 'Surah At-Tawbah (9:103)',
    },
    {
      id: 'quote-2',
      category: 'hadith',
      arabicText: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلاَّ عِزًّا',
      translationUr: 'صدقہ و زکوٰۃ دینے سے مال میں کوئی کمی واقع نہیں ہوتی، اور معاف کرنے سے اللہ بندے کی عزت میں اضافہ فرماتا ہے۔',
      translationEn: 'Charity does not decrease wealth, no one forgives another except that Allah increases his honor.',
      reference: 'Sahih Muslim (2588)',
    },
    {
      id: 'quote-3',
      category: 'quran',
      arabicText: 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ',
      translationUr: 'زکوٰۃ تو صرف فقراء، مساکین، عاملینِ زکوٰۃ، تالیفِ قلب، غلاموں کو آزاد کرانے، قرض داروں، اللہ کی راہ میں اور مسافروں کے لیے ہے۔',
      translationEn: 'Zakat expenditures are only for the poor and for the needy and for those employed to collect it and for bringing hearts together...',
      reference: 'Surah At-Tawbah (9:60) — Masarif-e-Zakat',
    },
    {
      id: 'quote-4',
      category: 'hadith',
      arabicText: 'حَصِّنُوا أَمْوَالَكُمْ بِالزَّكَاةِ، وَدَاوُوا مَرْضَاكُمْ بِالصَّدَقَةِ',
      translationUr: 'اپنے اموال کو زکوٰۃ کی ادائیگی کے ذریعے محفوظ بناؤ اور اپنے بیماروں کا علاج صدقے سے کرو۔',
      translationEn: 'Protect your wealth by giving Zakat, and heal your sick through charity.',
      reference: 'Al-Mu’jam al-Kabeer (Tabarani)',
    }
  ];

  const quotes = (zakat?.quotes && zakat.quotes.length > 0) ? zakat.quotes : defaultQuotes;

  const defaultNotes = [
    {
      titleEn: '100% Shariah Tamleek (Ownership)',
      titleUr: 'مکمل شرعی تملیک کی ضمانت',
      descEn: 'Zakat funds are deposited directly into designated separate welfare accounts and transferred as unconditional ownership (Tamleek) to verified deserving orphan and destitute students.',
      descUr: 'زکوٰۃ کی رقم کو الگ خصوصی شرعی اکاؤنٹ میں رکھ کر مستحق اور یتیم طلبہ کی باقاعدہ شرعی تملیک کروائی جاتی ہے۔',
    },
    {
      titleEn: 'Zero Administrative Deductions',
      titleUr: 'بغیر کسی انتظامی کٹوتی کے',
      descEn: '100% of your Zakat directly covers food, boarding, medicine, and textbooks of deserving religious scholars without overhead cuts.',
      descUr: 'آپ کی دی گئی زکوٰۃ کا ایک ایک روپیہ براہِ راست نادار و یتیم طلبہ کی رہائش، خوراک اور کتب پر خرچ ہوتا ہے۔',
    },
    {
      titleEn: 'Verified Deserving Beneficiaries (Mustahiqeen)',
      titleUr: 'مستحقین کی تفصیلی چھان بین',
      descEn: 'Our Shariah committee meticulously verifies the financial background of each residential student to ensure authentic entitlement under Islamic Fiqh.',
      descUr: 'دارالعلوم کی کمیٹی ہر طالب علم کے خاندانی و مالی حالات کی تصدیق کے بعد ہی زکوٰۃ کا مستحق قرار دیتی ہے۔',
    }
  ];

  const notes = (zakat?.notes && zakat.notes.length > 0) ? zakat.notes : defaultNotes;

  const title = language === 'ur'
    ? (zakat?.titleUr || 'شعبہ زکوٰۃ و رہنمائی')
    : (zakat?.titleEn || 'Zakat Guidelines & Shariah Assistance');

  const description = language === 'ur'
    ? (zakat?.descriptionUr || 'دارالعلوم محمدیہ غوثیہ میں زکوٰۃ کا نظام شرعی احکامات (تملیک) کے عین مطابق چلایا جاتا ہے۔ آپ کی دی گئی زکوٰۃ صرف اور صرف مستحق، یتیم اور نادار طلباء کی تعلیم و طعام پر خرچ کی جاتی ہے۔')
    : (zakat?.descriptionEn || 'Our Zakat management strictly conforms to classical Islamic jurisprudence (Fiqh). 100% of your Zakat directly empowers deserving orphan students with dignified accommodation, books, and food.');

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] pb-16">
      
      {/* Dynamic Background Banner */}
      <div className="relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center bg-slate-950 overflow-hidden border-b-4 border-[#065F46]">
        <img
          src={pageBg}
          alt="Zakat Background"
          className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 sm:py-20 text-center space-y-4 text-white">
          <div className="inline-flex items-center gap-2 bg-[#D97706]/90 text-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em] shadow-md">
            <Coins className="w-3.5 h-3.5" />
            <span>Purification of Wealth • 100% Shariah Tamleek</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-md">
            {title}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-emerald-50 max-w-3xl mx-auto leading-relaxed drop-shadow-sm font-light">
            {description}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="bg-black/60 backdrop-blur-xs px-4 py-2 border border-white/20 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              <span>Full Shariah Tamleek</span>
            </div>
            <div className="bg-black/60 backdrop-blur-xs px-4 py-2 border border-white/20 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#D97706]" />
              <span>Nisab: ~612.36g Silver</span>
            </div>
            <div className="bg-black/60 backdrop-blur-xs px-4 py-2 border border-white/20 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D97706]" />
              <span>Orphan & Mustahiq Care</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 mt-12 sm:mt-16">

        {/* Interactive Zakat Calculator */}
        <div className="bg-white border border-[#E5E1D8] p-8 sm:p-12 space-y-8 shadow-xs">
          <div className="border-b border-[#E5E1D8] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-4 h-4 text-[#065F46]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46]">
                  Calculated in Pakistani Rupees (PKR)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
                {language === 'ur' ? 'آن لائن شرعی زکوٰۃ کیلکولیٹر' : 'Interactive Shariah Zakat Calculator'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest bg-[#F8F9F5] border border-[#E5E1D8] text-[#065F46] px-3.5 py-1.5 self-start">
                Rate: 2.5% on Net Wealth
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div>
              <label className="font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Cash in Hand & Bank Accounts (PKR)
              </label>
              <input
                type="number"
                placeholder="0"
                value={cash || ''}
                onChange={(e) => setCash(parseFloat(e.target.value) || 0)}
                className="w-full text-sm p-3 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">Savings, current balances & foreign currency converted</span>
            </div>

            <div>
              <label className="font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Gold Weight (in Grams)
              </label>
              <input
                type="number"
                placeholder="0"
                value={goldGrams || ''}
                onChange={(e) => setGoldGrams(parseFloat(e.target.value) || 0)}
                className="w-full text-sm p-3 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
              <span className="text-[10px] text-emerald-700 font-medium mt-1 block">
                Current Rate: PKR {goldRatePerGram.toLocaleString()}/gram
              </span>
            </div>

            <div>
              <label className="font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Silver Weight (in Grams)
              </label>
              <input
                type="number"
                placeholder="0"
                value={silverGrams || ''}
                onChange={(e) => setSilverGrams(parseFloat(e.target.value) || 0)}
                className="w-full text-sm p-3 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
              <span className="text-[10px] text-emerald-700 font-medium mt-1 block">
                Current Rate: PKR {silverRatePerGram.toLocaleString()}/gram
              </span>
            </div>

            <div>
              <label className="font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Business Inventory & Stock Value (PKR)
              </label>
              <input
                type="number"
                placeholder="0"
                value={businessStock || ''}
                onChange={(e) => setBusinessStock(parseFloat(e.target.value) || 0)}
                className="w-full text-sm p-3 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">Finished trade goods & merchandise ready for sale</span>
            </div>

            <div>
              <label className="font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Immediate Debts & Liabilities to Deduct (PKR)
              </label>
              <input
                type="number"
                placeholder="0"
                value={liabilities || ''}
                onChange={(e) => setLiabilities(parseFloat(e.target.value) || 0)}
                className="w-full text-sm p-3 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">Immediate pending utility bills, rent & unpaid loans</span>
            </div>

            {/* Total Result Box */}
            <div className="bg-[#111827] text-white p-6 flex flex-col justify-between border border-gray-700 shadow-md">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D97706] block">
                    Net Zakat Payable (2.5%)
                  </span>
                  {netWealth > 0 && (
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-xs ${
                      isEligibleForZakat ? 'bg-emerald-900 text-emerald-200' : 'bg-gray-800 text-gray-400'
                    }`}>
                      {isEligibleForZakat ? 'Nisab Met' : 'Below Nisab'}
                    </span>
                  )}
                </div>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
                  PKR {zakatPayable.toLocaleString()}
                </div>
                <div className="text-[10px] text-gray-400 mt-1">
                  Total Wealth Assessed: PKR {netWealth.toLocaleString()}
                </div>
              </div>

              <button
                onClick={() => openDonateModal('cat-zakat')}
                className="mt-4 bg-[#065F46] hover:bg-[#044E39] text-white py-3 text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{language === 'ur' ? 'زکوٰۃ دارالعلوم کو ادا کریں' : 'Fulfill This Zakat Online'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Quranic Ayat & Hadith Section */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E1D8] pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Quote className="w-4 h-4 text-[#D97706]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">
                  Divine Guidance & Hadith
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
                {language === 'ur' ? 'قرآنی آیات و احادیثِ مبارکہ — احکامِ زکوٰۃ' : 'Quranic Injunctions & Prophetic Guidance on Zakat'}
              </h2>
            </div>
            <p className="text-xs text-[#6B7280] max-w-md">
              Reflections on the purification of wealth, immense spiritual rewards, and social upliftment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quotes.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-4 flex flex-col justify-between border-t-4 border-t-[#065F46] shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#065F46] bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                      {item.category === 'quran' ? 'Al-Quran Kareem' : item.category === 'hadith' ? 'Hadith Sharif' : 'Scholarly Note'}
                    </span>
                    <span className="text-xs font-serif font-bold text-[#D97706]">
                      {item.reference}
                    </span>
                  </div>

                  {item.arabicText && (
                    <div 
                      className="text-right font-serif text-lg sm:text-xl text-[#065F46] leading-loose pt-1 bg-[#F8F9F5] p-4 border border-[#E5E1D8]"
                      dir="rtl"
                    >
                      {item.arabicText}
                    </div>
                  )}

                  {item.translationUr && (
                    <p className="text-sm font-serif text-[#111827] leading-relaxed text-right" dir="rtl">
                      {item.translationUr}
                    </p>
                  )}

                  {item.translationEn && (
                    <p className="text-xs text-[#4B5563] italic leading-relaxed pt-1">
                      "{item.translationEn}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Notes & Fiqh Guidelines */}
        <div className="bg-white border border-[#E5E1D8] p-8 sm:p-12 space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#065F46]"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46]">
              Shariah Protocol & Policies
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
            {language === 'ur' ? 'دارالعلوم میں زکوٰۃ کا شرعی انتظام' : 'Strict Shariah Governance & Tamleek Assurance'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notes.map((note, idx) => (
              <div key={idx} className="bg-[#F8F9F5] border border-[#E5E1D8] p-6 space-y-3 border-l-4 border-l-[#065F46]">
                <h4 className="font-serif font-bold text-base text-[#111827]">
                  {language === 'ur' ? note.titleUr : note.titleEn}
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {language === 'ur' ? note.descUr : note.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
