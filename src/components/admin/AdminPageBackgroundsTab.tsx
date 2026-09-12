import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Image as ImageIcon, 
  Save, 
  Upload, 
  Check, 
  RefreshCw, 
  Sparkles, 
  Eye, 
  Layers, 
  Globe, 
  ExternalLink 
} from 'lucide-react';
import { PageBackgrounds } from '../../types';

interface PageBackgroundConfig {
  id: keyof PageBackgrounds;
  nameEn: string;
  nameUr: string;
  defaultImage: string;
  description: string;
  presets: { label: string; url: string }[];
}

const PAGE_BACKGROUND_CONFIGS: PageBackgroundConfig[] = [
  {
    id: 'qurbani',
    nameEn: 'Qurbani & Eid-ul-Adha Page',
    nameUr: 'قربانی اور عید الاضحیٰ پیج',
    defaultImage: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1920&q=80',
    description: 'Background for the annual collective Qurbani, cattle share rates, and sacrificial bookings page.',
    presets: [
      { label: 'Healthy Livestock Herd', url: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Sacrificial Cattle Farm', url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Goat & Sheep Pastoral', url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Camel Qurbani Expedition', url: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'zakat',
    nameEn: 'Zakat Calculator & Guidelines',
    nameUr: 'زکوٰۃ کیلکولیٹر اور رہنمائی پیج',
    defaultImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80',
    description: 'Atmosphere for the interactive Zakat calculator, Quranic ayat, and Mustahiqeen guidelines.',
    presets: [
      { label: 'Sacred Mosque Arch & Sunlight', url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Holy Quran & Illumination', url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Islamic Geometric Harmony', url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Charity & Heartfelt Giving', url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'home',
    nameEn: 'Homepage Hero Banner',
    nameUr: 'مرکزی ہوم پیج',
    defaultImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80',
    description: 'Primary visual backdrop greeting visitors on the Darul Uloom homepage.',
    presets: [
      { label: 'Grand Islamic Dome & Minaret', url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Majestic Architectural Courtyard', url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Spiritual Night Illuminations', url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'about',
    nameEn: 'About & 25+ Years Heritage',
    nameUr: 'ہمارا تعارف اور تاریخی پس منظر',
    defaultImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=80',
    description: 'Header backdrop for the institution history, leadership messages, and accreditation.',
    presets: [
      { label: 'Classical Islamic Architecture', url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Darul Uloom Grand Library', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'education',
    nameEn: 'Education & Dars-e-Nizami',
    nameUr: 'تعلیم و تدریس اور درسِ نظامی',
    defaultImage: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1920&q=80',
    description: 'Header for the Hifz-ul-Quran, Dars-e-Nizami, and Tajweed academic faculty.',
    presets: [
      { label: 'Islamic Quran Class & Rehal', url: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Islamic Manuscripts Study', url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'students',
    nameEn: 'Free Student Sponsorship & Care',
    nameUr: 'مفت طلباء کی کفالت و رہائش',
    defaultImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
    description: 'Header background for sponsoring deserving & orphan Dars-e-Nizami boys.',
    presets: [
      { label: 'Students in Islamic Classroom', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Deserving Youth Education', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'food',
    nameEn: 'Free Food & Daily Langar',
    nameUr: 'مفت طعام اور روزانہ لنگرِ غوثیہ',
    defaultImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1920&q=80',
    description: 'Visual backdrop for the daily 3-meal free kitchen feeding hundreds of students.',
    presets: [
      { label: 'Wholesome Community Kitchen', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Fresh Bread & Meals', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'welfare',
    nameEn: 'Community Welfare & Relief',
    nameUr: 'شعبہ فلاحِ عامہ و خدمتِ خلق',
    defaultImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1920&q=80',
    description: 'Header for widow stipends, water handpumps, ration bags, and winter warm clothes.',
    presets: [
      { label: 'Community Support Hands', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Pure Water & Life Giving', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'mosque',
    nameEn: 'Mosque Construction & Expansions',
    nameUr: 'تعمیرِ مساجد و ترقیاتی منصوبے',
    defaultImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=80',
    description: 'Header for the ongoing Jamia Masjid Ghousia extensions and community prayer halls.',
    presets: [
      { label: 'Mosque Construction & Domes', url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Spiritual Mihrab & Minbar', url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'donation',
    nameEn: 'Online Donation & Bank Details',
    nameUr: 'عطیات اور آن لائن بینک ٹرانسفر',
    defaultImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1920&q=80',
    description: 'Header for Pakistani bank accounts, JazzCash, EasyPaisa, and online card payments.',
    presets: [
      { label: 'Charity Giving & Generosity', url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Mosque Lights & Prayer', url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'books',
    nameEn: 'Islamic Library & Publications',
    nameUr: 'اسلامک لائبریری و مطبوعات',
    defaultImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80',
    description: 'Header for classical Islamic jurisprudence books, Tafseer, and online PDF downloads.',
    presets: [
      { label: 'Classical Islamic Library Shelves', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Holy Quran & Hadith Manuscripts', url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'events',
    nameEn: 'Islamic Events & Milad Gatherings',
    nameUr: 'محافلِ نعت اور دینی تقریبات',
    defaultImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80',
    description: 'Header for annual Dastar-e-Fazeelat, Mawlid un Nabi gatherings, and conferences.',
    presets: [
      { label: 'Islamic Gathering Light', url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80' },
      { label: 'Spiritual Mosque Interior', url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'gallery',
    nameEn: 'Photo & Video Gallery',
    nameUr: 'تصاویر و ویڈیو گیلری',
    defaultImage: 'https://images.unsplash.com/photo-1590076215667-873d26501193?auto=format&fit=crop&w=1920&q=80',
    description: 'Header backdrop for the institution visual records and activities archive.',
    presets: [
      { label: 'Islamic Visual Architecture', url: 'https://images.unsplash.com/photo-1590076215667-873d26501193?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'news',
    nameEn: 'News & Announcements',
    nameUr: 'خبریں اور اعلانات',
    defaultImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80',
    description: 'Header backdrop for notices, exam results, and press releases.',
    presets: [
      { label: 'Press & Media Notice', url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80' },
    ]
  },
  {
    id: 'contact',
    nameEn: 'Contact & Location (Nawab Colony)',
    nameUr: 'رابطہ اور لوکیشن سرگودھا',
    defaultImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1920&q=80',
    description: 'Header for the inquiry form, Sargodha location map, and WhatsApp channels.',
    presets: [
      { label: 'Islamic Geometric Tiles', url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1920&q=80' },
    ]
  }
];

export const AdminPageBackgroundsTab: React.FC = () => {
  const { data, adminToken, showToast, refreshData, language, setCurrentPage } = useApp();

  const [backgrounds, setBackgrounds] = useState<PageBackgrounds>({});
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingPageId, setUploadingPageId] = useState<string | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<keyof PageBackgrounds>('qurbani');

  useEffect(() => {
    if (data?.settings?.pageBackgrounds) {
      setBackgrounds(data.settings.pageBackgrounds);
    }
  }, [data?.settings?.pageBackgrounds]);

  const handleFileUpload = async (pageId: keyof PageBackgrounds, file: File) => {
    setUploadingPageId(pageId);
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
          setBackgrounds(prev => ({ ...prev, [pageId]: json.url }));
          showToast(`Uploaded background for ${pageId}`, 'success');
        } else {
          showToast(json.error || 'Failed to upload image', 'error');
        }
        setUploadingPageId(null);
      };
      reader.readAsDataURL(file);
    } catch {
      showToast('Network error during file upload', 'error');
      setUploadingPageId(null);
    }
  };

  const handleSaveBackgrounds = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/page-backgrounds', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(backgrounds),
      });

      if (res.ok) {
        showToast('All page-specific background pictures saved successfully!', 'success');
        refreshData();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to save page backgrounds', 'error');
      }
    } catch {
      showToast('Network error while saving page backgrounds', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const activeConfig = PAGE_BACKGROUND_CONFIGS.find(p => p.id === selectedPageId) || PAGE_BACKGROUND_CONFIGS[0];
  const currentImageUrl = backgrounds[activeConfig.id] || activeConfig.defaultImage;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* Header Banner */}
      <div className="bg-[#111827] text-white p-6 sm:p-8 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <ImageIcon className="w-5 h-5 text-[#D97706]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">
              Dynamic Page Background Customizer
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {language === 'ur' ? 'ہر پیج کی مخصوص پس منظر (Background) تصاویر' : 'Page-Specific Background Images'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
            Configure different visual atmospheres for each individual section (e.g. Qurbani page displays sacrificial livestock, Zakat page displays Quranic arches, Education displays classrooms).
          </p>
        </div>

        <button
          onClick={handleSaveBackgrounds}
          disabled={isSaving}
          className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all self-start md:self-center shadow-lg disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save All Backgrounds</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Page List */}
        <div className="lg:col-span-4 bg-white border border-[#E5E1D8] p-4 space-y-1">
          <div className="px-3 py-2 border-b border-[#E5E1D8] mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">
              Select Page to Customize
            </span>
          </div>
          <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
            {PAGE_BACKGROUND_CONFIGS.map((config) => {
              const isSelected = selectedPageId === config.id;
              const hasCustom = !!backgrounds[config.id];
              return (
                <button
                  key={config.id}
                  onClick={() => setSelectedPageId(config.id)}
                  className={`w-full text-left p-3 transition-colors flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#065F46] text-white border-[#065F46]'
                      : 'bg-[#F8F9F5] hover:bg-white text-[#111827] border-[#E5E1D8]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold font-serif">{config.nameEn}</div>
                    <div className={`text-[10px] font-serif ${isSelected ? 'text-emerald-100' : 'text-gray-500'}`} dir="rtl">
                      {config.nameUr}
                    </div>
                  </div>
                  {hasCustom && (
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-xs ${
                      isSelected ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-[#065F46]'
                    }`}>
                      Custom
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content: Selected Page Customizer & Live Viewport */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E1D8] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] block mb-1">
                  Active Page Configuration
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#111827]">
                  {activeConfig.nameEn}
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">{activeConfig.description}</p>
              </div>

              <button
                onClick={() => setCurrentPage(activeConfig.id as any)}
                className="text-xs font-bold uppercase tracking-wider text-[#065F46] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Preview live page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Input & Uploader */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block">
                Background Image URL or Direct File Upload
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={backgrounds[activeConfig.id] || ''}
                  onChange={(e) => setBackgrounds(prev => ({ ...prev, [activeConfig.id]: e.target.value }))}
                  placeholder={activeConfig.defaultImage}
                  className="flex-1 p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
                
                <label className="bg-[#111827] hover:bg-black text-white px-5 py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2 transition-colors shrink-0">
                  {uploadingPageId === activeConfig.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Upload className="w-4 h-4 text-[#D97706]" />
                  )}
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(activeConfig.id, e.target.files[0]);
                      }
                    }}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setBackgrounds(prev => {
                    const copy = { ...prev };
                    delete copy[activeConfig.id];
                    return copy;
                  })}
                  title="Reset to default theme image"
                  className="p-3 text-gray-400 hover:text-red-600 bg-[#F8F9F5] border border-[#E5E1D8] hover:border-red-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Curated Presets */}
            {activeConfig.presets.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                  Recommended High-Definition Visuals for {activeConfig.nameEn}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeConfig.presets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBackgrounds(prev => ({ ...prev, [activeConfig.id]: preset.url }))}
                      className="p-3 text-left text-xs bg-[#F8F9F5] border border-[#E5E1D8] hover:border-[#065F46] hover:bg-emerald-50/40 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-[#111827]">{preset.label}</span>
                      {currentImageUrl === preset.url && (
                        <Check className="w-4 h-4 text-[#065F46]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Visual Simulation */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block">
                Simulated Viewport Appearance ({activeConfig.nameEn})
              </span>
              <div className="relative h-64 border border-[#E5E1D8] overflow-hidden flex flex-col justify-end p-8 bg-slate-950">
                <img
                  src={currentImageUrl}
                  alt={`${activeConfig.nameEn} background`}
                  className="absolute inset-0 w-full h-full object-cover opacity-65 scale-105 transition-transform duration-700 hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="relative z-10 text-white space-y-1.5">
                  <span className="text-[#D97706] text-[10px] font-bold uppercase tracking-widest">
                    Darul Uloom Muhammadiya Ghousia Sargodha
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-white">{activeConfig.nameEn}</h4>
                  <p className="text-xs text-gray-300 font-serif" dir="rtl">{activeConfig.nameUr}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
