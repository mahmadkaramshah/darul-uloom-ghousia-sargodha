import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Check, 
  X, 
  Calculator, 
  Coins, 
  FileText, 
  Quote, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle,
  Eye,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { ZakatContent, ZakatQuoteItem } from '../../types';

export const AdminZakatTab: React.FC = () => {
  const { data, adminToken, showToast, refreshData, language } = useApp();
  const zakatData = data?.zakat;

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'quotes' | 'rates' | 'background' | 'guidelines'>('quotes');

  // Zakat Form State
  const [zakatForm, setZakatForm] = useState<ZakatContent>({
    titleEn: 'Shariah-Compliant Zakat Assistance Program',
    titleUr: 'شرعی اصولوں کے مطابق زکوٰۃ کی وصولی اور حقداروں میں تقسیم',
    headerBackgroundImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80',
    goldRatePerGramPkr: 24500,
    silverRatePerGramPkr: 295,
    guidelinesEn: '',
    guidelinesUr: '',
    eligibilityEn: [],
    eligibilityUr: [],
    usagePointsEn: [],
    usagePointsUr: [],
    quotes: [],
    disclaimerEn: '',
    disclaimerUr: ''
  });

  // Quote Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [editingQuoteIndex, setEditingQuoteIndex] = useState<number | null>(null);
  const [quoteForm, setQuoteForm] = useState<ZakatQuoteItem>({
    id: '',
    type: 'ayat',
    arabicText: '',
    textUr: '',
    textEn: '',
    referenceUr: '',
    referenceEn: '',
    order: 1,
    isActive: true
  });

  useEffect(() => {
    if (zakatData) {
      setZakatForm({
        ...zakatData,
        headerBackgroundImage: zakatData.headerBackgroundImage || data?.settings?.pageBackgrounds?.zakat || 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80',
        goldRatePerGramPkr: zakatData.goldRatePerGramPkr || 24500,
        silverRatePerGramPkr: zakatData.silverRatePerGramPkr || 295,
        quotes: zakatData.quotes || [
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
            type: 'hadith',
            arabicText: 'قَالَ رَسُولُ اللَّهِ ﷺ: حَصِّنُوا أَمْوَالَكُمْ بِالزَّكَاةِ، وَدَاوُوا مَرْضَاكُمْ بِالصَّدَقَةِ، وَأَعِدُّوا لِلْبَلَاءِ الدُّعَاءَ',
            textUr: 'رسول اللہ ﷺ نے ارشاد فرمایا: "اپنے اموال کو زکوٰۃ کے ذریعے محفوظ قلعہ بناؤ، اپنے بیماروں کا علاج صدقے سے کرو، اور مصیبتوں کے مقابلے کے لیے دعا کا سہارا لو۔"',
            textEn: 'The Messenger of Allah (peace and blessings be upon him) said: "Fortify your wealth with Zakat, treat your sick ones with charity, and prepare prayer (Dua) for calamities."',
            referenceUr: 'شعب الایمان للبیہقی (حدیث: 3282)',
            referenceEn: 'Shu\'ab al-Iman al-Bayhaqi (3282)',
            order: 2,
            isActive: true
          }
        ]
      });
    }
  }, [zakatData, data?.settings?.pageBackgrounds?.zakat]);

  const handleFileUpload = async (file: File, callbackUrl: (url: string) => void) => {
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            filename: file.name,
            fileData: base64Data,
          }),
        });
        const json = await res.json();
        if (res.ok && json.url) {
          callbackUrl(json.url);
          showToast(`Uploaded: ${file.name}`, 'success');
        } else {
          showToast(json.error || 'Failed to upload image', 'error');
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      showToast('Network error during file upload', 'error');
      setIsUploading(false);
    }
  };

  const handleSaveZakat = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/zakat', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(zakatForm),
      });

      // Also persist background image to settings.pageBackgrounds
      if (zakatForm.headerBackgroundImage) {
        await fetch('/api/admin/page-backgrounds', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ zakat: zakatForm.headerBackgroundImage }),
        });
      }

      if (res.ok) {
        showToast('Zakat settings, Quranic quotations & rates saved successfully!', 'success');
        refreshData();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to save Zakat content', 'error');
      }
    } catch {
      showToast('Network error while saving Zakat information', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenQuoteModal = (index: number | null = null) => {
    if (index !== null && zakatForm.quotes && zakatForm.quotes[index]) {
      setEditingQuoteIndex(index);
      setQuoteForm({ ...zakatForm.quotes[index] });
    } else {
      setEditingQuoteIndex(null);
      setQuoteForm({
        id: 'zak-q-' + Date.now(),
        type: 'ayat',
        arabicText: '',
        textUr: '',
        textEn: '',
        referenceUr: '',
        referenceEn: '',
        order: (zakatForm.quotes?.length || 0) + 1,
        isActive: true
      });
    }
    setIsQuoteModalOpen(true);
  };

  const handleSaveQuote = () => {
    if (!quoteForm.textUr && !quoteForm.textEn) {
      showToast('Please provide quotation text in Urdu or English.', 'error');
      return;
    }

    const updatedQuotes = [...(zakatForm.quotes || [])];
    if (editingQuoteIndex !== null) {
      updatedQuotes[editingQuoteIndex] = { ...quoteForm };
    } else {
      updatedQuotes.push({
        ...quoteForm,
        id: quoteForm.id || 'zak-q-' + Date.now()
      });
    }

    setZakatForm(prev => ({ ...prev, quotes: updatedQuotes }));
    setIsQuoteModalOpen(false);
    showToast(editingQuoteIndex !== null ? 'Quotation updated' : 'New quotation added', 'success');
  };

  const handleDeleteQuote = (index: number) => {
    if (window.confirm('Are you sure you want to remove this quotation?')) {
      const updatedQuotes = (zakatForm.quotes || []).filter((_, i) => i !== index);
      setZakatForm(prev => ({ ...prev, quotes: updatedQuotes }));
      showToast('Quotation removed', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* Header Banner */}
      <div className="bg-[#111827] text-white p-6 sm:p-8 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <BookOpen className="w-5 h-5 text-[#D97706]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">
              Zakat Calculator & Quotations CMS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {language === 'ur' ? 'زکوٰۃ کیلکولیٹر، قرآنی آیات و احادیث کا انتظام' : 'Zakat Calculator, Quotations & Notes'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
            Add or remove Quranic Ayat, Hadith, Fatwa rulings, and scholarly notes displayed under the calculator, update gold/silver Nisab rates, and set the page background.
          </p>
        </div>

        <button
          onClick={handleSaveZakat}
          disabled={isSaving}
          className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all self-start md:self-center shadow-lg disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Zakat Page</span>
        </button>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E5E1D8] pb-3">
        {[
          { id: 'quotes', label: 'Quran Ayat, Hadith & Notes', icon: Quote, count: zakatForm.quotes?.length },
          { id: 'rates', label: 'Gold / Silver Nisab Rates', icon: Coins },
          { id: 'background', label: 'Zakat Page Background', icon: ImageIcon },
          { id: 'guidelines', label: 'Mustahiqeen Eligibility & Rules', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors border ${
                isActive
                  ? 'bg-[#065F46] text-white border-[#065F46]'
                  : 'bg-white text-[#4B5563] border-[#E5E1D8] hover:bg-[#F8F9F5]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: QURANIC AYAT, HADITH & NOTES */}
      {activeSubTab === 'quotes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#E5E1D8]">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#111827]">
                Quotations & Islamic References Under Calculator
              </h3>
              <p className="text-xs text-[#6B7280]">
                These holy references, Quranic Ayat, Prophetic Hadith, and Fatwa rulings appear right under the interactive Zakat calculator.
              </p>
            </div>
            <button
              onClick={() => handleOpenQuoteModal()}
              className="bg-[#111827] hover:bg-black text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-[#D97706]" />
              <span>Add Ayat / Hadith / Note</span>
            </button>
          </div>

          <div className="space-y-4">
            {zakatForm.quotes?.map((quote, idx) => (
              <div 
                key={quote.id || idx}
                className="bg-white border border-[#E5E1D8] p-6 space-y-4 hover:border-[#065F46] transition-colors relative"
              >
                <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${
                      quote.type === 'ayat' ? 'bg-[#065F46] text-white' :
                      quote.type === 'hadith' ? 'bg-[#D97706] text-white' :
                      quote.type === 'fatwa' ? 'bg-indigo-900 text-white' : 'bg-gray-800 text-white'
                    }`}>
                      {quote.type === 'ayat' ? 'Quranic Ayat' :
                       quote.type === 'hadith' ? 'Prophetic Hadith' :
                       quote.type === 'fatwa' ? 'Shariah Ruling' : 'Note'}
                    </span>
                    <span className="text-xs font-serif font-bold text-[#111827]">
                      {quote.referenceEn || quote.referenceUr}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenQuoteModal(idx)}
                      className="p-1.5 text-[#065F46] hover:bg-emerald-50 border border-[#E5E1D8] hover:border-[#065F46] transition-colors"
                      title="Edit Quote"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuote(idx)}
                      className="p-1.5 text-red-600 hover:bg-red-50 border border-[#E5E1D8] hover:border-red-600 transition-colors"
                      title="Delete Quote"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {quote.arabicText && (
                  <p className="font-serif text-right text-base sm:text-lg text-[#065F46] leading-loose" dir="rtl">
                    {quote.arabicText}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#F8F9F5] p-4 border border-[#E5E1D8] space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#6B7280]">Urdu Translation & Reference:</span>
                    <p className="text-xs font-serif text-right leading-relaxed text-[#111827]" dir="rtl">
                      {quote.textUr}
                    </p>
                    <p className="text-[11px] font-bold text-[#065F46] text-right" dir="rtl">
                      {quote.referenceUr}
                    </p>
                  </div>

                  <div className="bg-[#F8F9F5] p-4 border border-[#E5E1D8] space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#6B7280]">English Translation & Reference:</span>
                    <p className="text-xs text-[#374151] leading-relaxed">
                      "{quote.textEn}"
                    </p>
                    <p className="text-[11px] font-bold text-[#065F46]">
                      — {quote.referenceEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GOLD / SILVER NISAB RATES */}
      {activeSubTab === 'rates' && (
        <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46] block mb-1">
              Shariah Nisab Thresholds
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#111827]">
              Current Gold & Silver Rates (PKR per Gram)
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl mt-1">
              Set the active market prices per gram. The calculator will automatically multiply by 87.48 grams (7.5 Tola Gold) and 612.36 grams (52.5 Tola Silver) to compute the Nisab threshold.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-[#F8F9F5] p-6 border border-[#E5E1D8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
                  Gold Rate (24K Pure)
                </span>
                <span className="text-xs text-gray-500 font-mono">Nisab: 87.48 Grams</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-xs font-bold text-[#6B7280]">PKR / gram:</span>
                <input
                  type="number"
                  value={zakatForm.goldRatePerGramPkr || ''}
                  onChange={(e) => setZakatForm(prev => ({ ...prev, goldRatePerGramPkr: parseFloat(e.target.value) || 0 }))}
                  className="w-full pl-28 p-3 text-sm font-bold text-[#111827] bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
              </div>
              <div className="p-3 bg-amber-50/50 border border-amber-200 text-xs text-amber-900">
                Current Gold Nisab: <strong className="font-serif text-sm">PKR {Math.round((zakatForm.goldRatePerGramPkr || 24500) * 87.48).toLocaleString()}</strong>
              </div>
            </div>

            <div className="bg-[#F8F9F5] p-6 border border-[#E5E1D8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
                  Silver Rate (Chandi)
                </span>
                <span className="text-xs text-gray-500 font-mono">Nisab: 612.36 Grams</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-xs font-bold text-[#6B7280]">PKR / gram:</span>
                <input
                  type="number"
                  value={zakatForm.silverRatePerGramPkr || ''}
                  onChange={(e) => setZakatForm(prev => ({ ...prev, silverRatePerGramPkr: parseFloat(e.target.value) || 0 }))}
                  className="w-full pl-28 p-3 text-sm font-bold text-[#111827] bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
              </div>
              <div className="p-3 bg-slate-100 border border-slate-300 text-xs text-slate-900">
                Current Silver Nisab: <strong className="font-serif text-sm">PKR {Math.round((zakatForm.silverRatePerGramPkr || 295) * 612.36).toLocaleString()}</strong> (Recommended for cash donors)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ZAKAT PAGE BACKGROUND */}
      {activeSubTab === 'background' && (
        <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46] block mb-1">
              Custom Page Atmosphere
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#111827]">
              Zakat Page Background & Header Picture
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl mt-1">
              When a user visits the Zakat calculator, this background will be applied behind the header with spiritual calligraphy and elegant styling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block">
                Background Image URL / Direct Upload
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={zakatForm.headerBackgroundImage || ''}
                  onChange={(e) => setZakatForm(prev => ({ ...prev, headerBackgroundImage: e.target.value }))}
                  placeholder="https://images.unsplash.com/photo-1564769625905-50e93615e769..."
                  className="flex-1 p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
                <label className="bg-[#111827] hover:bg-black text-white px-4 py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-colors shrink-0">
                  <Upload className="w-4 h-4 text-[#D97706]" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0], (url) => {
                          setZakatForm(prev => ({ ...prev, headerBackgroundImage: url }));
                        });
                      }
                    }}
                  />
                </label>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                  Quick Islamic Background Presets:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Mosque Arch & Light', url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80' },
                    { label: 'Holy Quran & Rehal', url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1920&q=80' },
                    { label: 'Islamic Geometry & Pattern', url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=80' },
                    { label: 'Charity Giving & Hands', url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1920&q=80' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setZakatForm(prev => ({ ...prev, headerBackgroundImage: preset.url }))}
                      className="p-2.5 text-left text-xs bg-[#F8F9F5] border border-[#E5E1D8] hover:border-[#065F46] hover:bg-emerald-50/50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-[#111827]">{preset.label}</span>
                      {zakatForm.headerBackgroundImage === preset.url && (
                        <Check className="w-3.5 h-3.5 text-[#065F46]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block">
                Live Preview (Zakat Hero Viewport)
              </span>
              <div className="relative h-64 border border-[#E5E1D8] overflow-hidden flex flex-col justify-end p-6 bg-slate-900">
                {zakatForm.headerBackgroundImage && (
                  <img
                    src={zakatForm.headerBackgroundImage}
                    alt="Zakat Page Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="relative z-10 text-white space-y-1">
                  <span className="text-[#D97706] text-[10px] font-bold uppercase tracking-widest">
                    Shariah-Compliant Zakat Assistance
                  </span>
                  <h4 className="text-xl font-serif font-bold">Comprehensive Zakat Calculator</h4>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    Accurately calculate your annual obligation with authentic Nisab rates and Mufti-verified Tamleek disbursement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GUIDELINES & MUSTAHIQEEN */}
      {activeSubTab === 'guidelines' && (
        <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#E5E1D8] pb-4">
            <h3 className="text-xl font-serif font-bold text-[#111827]">
              Zakat Overview & Mufti Disclaimer
            </h3>
            <p className="text-xs text-[#6B7280]">
              Edit the introductory text and theological disclaimers presented to donors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Zakat Policy & Overview (English)
              </label>
              <textarea
                rows={4}
                value={zakatForm.guidelinesEn || ''}
                onChange={(e) => setZakatForm(prev => ({ ...prev, guidelinesEn: e.target.value }))}
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Zakat Policy & Overview (Urdu)
              </label>
              <textarea
                rows={4}
                value={zakatForm.guidelinesUr || ''}
                onChange={(e) => setZakatForm(prev => ({ ...prev, guidelinesUr: e.target.value }))}
                dir="rtl"
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Darul Ifta Disclaimer (English)
              </label>
              <textarea
                rows={3}
                value={zakatForm.disclaimerEn || ''}
                onChange={(e) => setZakatForm(prev => ({ ...prev, disclaimerEn: e.target.value }))}
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Darul Ifta Disclaimer (Urdu)
              </label>
              <textarea
                rows={3}
                value={zakatForm.disclaimerUr || ''}
                onChange={(e) => setZakatForm(prev => ({ ...prev, disclaimerUr: e.target.value }))}
                dir="rtl"
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
            </div>
          </div>
        </div>
      )}

      {/* QUOTATION ADD / EDIT MODAL */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E5E1D8] max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4">
              <h3 className="text-xl font-serif font-bold text-[#111827]">
                {editingQuoteIndex !== null ? 'Edit Islamic Reference / Quotation' : 'Add Quranic Ayat / Hadith / Note'}
              </h3>
              <button onClick={() => setIsQuoteModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase text-[#4B5563] block mb-1">Quotation Category</label>
                <select
                  value={quoteForm.type}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                >
                  <option value="ayat">Holy Quranic Ayat (آیتِ مبارکہ)</option>
                  <option value="hadith">Blessed Prophetic Hadith (حدیثِ شریف)</option>
                  <option value="fatwa">Shariah Ruling / Classical Fatwa (شرعی مسئلہ / فتویٰ)</option>
                  <option value="note">Scholarly Guidance Note (علمی و تحقیقی نوٹ)</option>
                </select>
              </div>

              <div>
                <label className="font-bold uppercase text-[#4B5563] block mb-1">
                  Arabic Text with Tashkeel (Optional for Ayat / Hadith)
                </label>
                <textarea
                  rows={2}
                  value={quoteForm.arabicText || ''}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, arabicText: e.target.value }))}
                  dir="rtl"
                  placeholder="إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ..."
                  className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46] font-serif text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-[#4B5563] block mb-1">Urdu Translation / Text</label>
                  <textarea
                    rows={3}
                    value={quoteForm.textUr}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, textUr: e.target.value }))}
                    dir="rtl"
                    placeholder="اردو ترجمہ یا وضاحتی نوٹ درج کریں..."
                    className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46] font-serif"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-[#4B5563] block mb-1">English Translation / Text</label>
                  <textarea
                    rows={3}
                    value={quoteForm.textEn}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, textEn: e.target.value }))}
                    placeholder="English translation or educational note..."
                    className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-[#4B5563] block mb-1">Reference / Source (Urdu)</label>
                  <input
                    type="text"
                    value={quoteForm.referenceUr}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, referenceUr: e.target.value }))}
                    dir="rtl"
                    placeholder="سورۃ التوبہ: آیت 60 / صحیح مسلم"
                    className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-[#4B5563] block mb-1">Reference / Source (English)</label>
                  <input
                    type="text"
                    value={quoteForm.referenceEn}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, referenceEn: e.target.value }))}
                    placeholder="Surah At-Tawbah (9:60) / Sahih Muslim"
                    className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E1D8]">
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(false)}
                className="px-4 py-2 text-xs font-bold uppercase text-gray-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveQuote}
                className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest"
              >
                Save Quotation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
