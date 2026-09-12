import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Upload, Palette, Image as ImageIcon, Sparkles, RefreshCw, Eye, Check } from 'lucide-react';
import { WebsiteSettings } from '../../types';

const COLOR_PRESETS = [
  { name: 'Forest Emerald (Traditional)', primary: '#065F46', accent: '#D97706', heroBg: '#FFFFFF' },
  { name: 'Royal Islamic Navy', primary: '#1E3A8A', accent: '#F59E0B', heroBg: '#F8FAFC' },
  { name: 'Majestic Burgundy & Velvet', primary: '#881337', accent: '#D97706', heroBg: '#FFFDF9' },
  { name: 'Heritage Charcoal & Gold', primary: '#111827', accent: '#D97706', heroBg: '#FDFBF7' },
  { name: 'Sacred Olive & Amber', primary: '#365314', accent: '#F59E0B', heroBg: '#FBFDF8' },
  { name: 'Coastal Aegean Teal', primary: '#0F766E', accent: '#EA580C', heroBg: '#F0FDFA' },
];

export const AdminBrandingTab: React.FC = () => {
  const { data, adminToken, showToast, refreshData, language } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState<Partial<WebsiteSettings>>({
    logoUrl: '',
    primaryColor: '#065F46',
    accentColor: '#D97706',
    heroBgColor: '#FFFFFF',
    heroTitleEn: 'Nurturing the Spiritual & Intellectual Journey',
    heroTitleUr: 'روحانی و فکری بالیدگی کا روشن مرکز',
    heroSubtitleEn: 'Providing comprehensive classical Islamic education, 100% free boarding and nutritious meals for deserving students, and vital welfare services in Sargodha for over two decades.',
    heroSubtitleUr: 'دارالعلوم محمدیہ غوثیہ، نواب کالونی، سرگودھا گزشتہ دو دہائیوں سے نادار طلباء کی 100% مفت دینی و عصری تعلیم، مفت طعام، مساجد کی تعمیر اور فلاحی خدمات کی فراہمی میں مصروفِ عمل ہے۔',
    heroBadgeEn: 'Jamia Mohammadiya Ghousia • Sargodha, Pakistan',
    heroBadgeUr: 'جامعہ محمدیہ غوثیہ • نواب کالونی، سرگودھا، پاکستان',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=1200&auto=format&fit=crop&q=80',
    bannerNoticeEn: 'Admissions open for new academic year (Hifz-ul-Quran & Dars-e-Nizami) • 100% Free Food & Education for Deserving Students',
    bannerNoticeUr: 'نئے تعلیمی سال کے داخلے جاری ہیں (حفظ القرآن و درسِ نظامی) • مستحق طلباء کے لیے 100% مفت رہائش، طعام و تعلیم',
  });

  useEffect(() => {
    if (data?.settings) {
      setForm((prev) => ({
        ...prev,
        ...data.settings,
      }));
    }
  }, [data?.settings]);

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
      reader.onerror = () => {
        showToast('Error reading file', 'error');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      showToast('Network error during file upload', 'error');
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updatedSettings = {
        ...(data?.settings || {}),
        ...form,
      };
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updatedSettings),
      });
      if (res.ok) {
        showToast('Website branding and colors saved successfully!', 'success');
        refreshData();
      } else {
        const json = await res.json();
        showToast(json.error || 'Failed to save branding', 'error');
      }
    } catch {
      showToast('Network error saving branding', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setForm((prev) => ({
      ...prev,
      primaryColor: preset.primary,
      accentColor: preset.accent,
      heroBgColor: preset.heroBg,
    }));
    showToast(`Applied palette: ${preset.name}`, 'info');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header Actions */}
      <div className="bg-white border border-[#E5E1D8] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#065F46]" />
            <h3 className="text-xl font-serif font-bold text-[#111827]">
              Website Branding, Logo & Color Theme
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Customize the institution logo, primary and accent color scheme, hero section banner, and front page appearance.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving || isUploading}
          className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors shrink-0 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save & Publish Live'}</span>
        </button>
      </div>

      {/* 1. INSTITUTION LOGO CONFIGURATION */}
      <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E5E1D8] pb-3 flex items-center justify-between">
          <div>
            <h4 className="font-serif font-bold text-lg text-[#111827]">Institution Official Logo</h4>
            <p className="text-xs text-gray-500">
              Upload an official Jamia seal/logo (PNG, JPG, SVG) or provide an image link. Displayed in the Navbar and Footer.
            </p>
          </div>
          {form.logoUrl && (
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, logoUrl: '' }))}
              className="text-xs text-red-600 hover:underline"
            >
              Reset to Default Emblem
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Logo Live Preview */}
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E5E1D8] bg-[#FDFBF7] text-center min-h-[160px]">
            {form.logoUrl ? (
              <div className="space-y-2">
                <img
                  src={form.logoUrl}
                  alt="Institution Logo Preview"
                  className="max-h-24 max-w-full object-contain mx-auto"
                />
                <span className="text-[10px] text-[#065F46] font-bold block uppercase tracking-wider">
                  Live Preview Active
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-serif text-2xl font-bold text-white mx-auto shadow-xs"
                  style={{ backgroundColor: form.primaryColor || '#065F46' }}
                >
                  غ
                </div>
                <span className="text-[11px] text-gray-500 block">
                  Default Calligraphic Crest (جامعہ غوثیہ)
                </span>
              </div>
            )}
          </div>

          {/* Logo Upload & URL Controls */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                Upload Logo Image (PNG / JPG / WEBP / SVG)
              </label>
              <div className="flex items-center gap-3">
                <label className="bg-[#111827] hover:bg-black text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center gap-2 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>{isUploading ? 'Uploading...' : 'Choose Logo File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0], (url) =>
                          setForm((prev) => ({ ...prev, logoUrl: url }))
                        );
                      }
                    }}
                  />
                </label>
                <span className="text-xs text-gray-500">Recommended: Square or transparent PNG</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                Or Enter Logo Image URL
              </label>
              <input
                type="text"
                value={form.logoUrl || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, logoUrl: e.target.value }))}
                placeholder="https://example.com/logo.png"
                className="w-full text-xs px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E1D8] focus:border-[#065F46] focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. THEME COLOR PALETTE & PRESETS */}
      <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E5E1D8] pb-3">
          <h4 className="font-serif font-bold text-lg text-[#111827]">Front Page Color Theme</h4>
          <p className="text-xs text-gray-500">
            Select a curated traditional Islamic palette preset, or configure custom primary, accent, and hero background colors.
          </p>
        </div>

        {/* 1-Click Presets */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-3">
            Quick 1-Click Color Schemes
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COLOR_PRESETS.map((preset) => {
              const isSelected =
                form.primaryColor === preset.primary && form.accentColor === preset.accent;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`p-3 border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-[#111827] bg-[#F8F9F5] shadow-xs'
                      : 'border-[#E5E1D8] hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#111827] block truncate">
                      {preset.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: preset.accent }}
                      />
                      <span className="text-[10px] text-gray-500 font-mono">
                        {preset.primary}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#065F46]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Color Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E5E1D8]">
          {/* Primary Color */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block">
              Primary Brand Color (Buttons, Accents, Headings)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.primaryColor || '#065F46'}
                onChange={(e) => setForm((prev) => ({ ...prev, primaryColor: e.target.value }))}
                className="w-12 h-10 border border-[#E5E1D8] cursor-pointer p-1 bg-white"
              />
              <input
                type="text"
                value={form.primaryColor || '#065F46'}
                onChange={(e) => setForm((prev) => ({ ...prev, primaryColor: e.target.value }))}
                className="w-full text-xs font-mono px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block">
              Accent Color (Badges, Highlights, Secondary)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.accentColor || '#D97706'}
                onChange={(e) => setForm((prev) => ({ ...prev, accentColor: e.target.value }))}
                className="w-12 h-10 border border-[#E5E1D8] cursor-pointer p-1 bg-white"
              />
              <input
                type="text"
                value={form.accentColor || '#D97706'}
                onChange={(e) => setForm((prev) => ({ ...prev, accentColor: e.target.value }))}
                className="w-full text-xs font-mono px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
              />
            </div>
          </div>

          {/* Hero Background Color */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block">
              Front Hero Card Background
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.heroBgColor || '#FFFFFF'}
                onChange={(e) => setForm((prev) => ({ ...prev, heroBgColor: e.target.value }))}
                className="w-12 h-10 border border-[#E5E1D8] cursor-pointer p-1 bg-white"
              />
              <input
                type="text"
                value={form.heroBgColor || '#FFFFFF'}
                onChange={(e) => setForm((prev) => ({ ...prev, heroBgColor: e.target.value }))}
                className="w-full text-xs font-mono px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. FRONT PAGE HERO CONTENT & HEADLINES */}
      <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E5E1D8] pb-3">
          <h4 className="font-serif font-bold text-lg text-[#111827]">Front Page Hero Section Content</h4>
          <p className="text-xs text-gray-500">
            Control the main headlines, badge text, and introductory descriptions shown on the front page.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
              Top Badge Text (English)
            </label>
            <input
              type="text"
              value={form.heroBadgeEn || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, heroBadgeEn: e.target.value }))}
              placeholder="e.g. Jamia Mohammadiya Ghousia • Sargodha"
              className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
              Top Badge Text (Urdu)
            </label>
            <input
              type="text"
              value={form.heroBadgeUr || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, heroBadgeUr: e.target.value }))}
              placeholder="جامعہ محمدیہ غوثیہ • نواب کالونی، سرگودھا"
              className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
              Main Hero Title (English)
            </label>
            <input
              type="text"
              value={form.heroTitleEn || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, heroTitleEn: e.target.value }))}
              placeholder="e.g. Nurturing the Spiritual & Intellectual Journey"
              className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-serif"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
              Main Hero Title (Urdu)
            </label>
            <input
              type="text"
              value={form.heroTitleUr || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, heroTitleUr: e.target.value }))}
              placeholder="روحانی و فکری بالیدگی کا روشن مرکز"
              className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu text-base"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
              Hero Subtitle / Mission Statement (English)
            </label>
            <textarea
              rows={3}
              value={form.heroSubtitleEn || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, heroSubtitleEn: e.target.value }))}
              className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
              Hero Subtitle / Mission Statement (Urdu)
            </label>
            <textarea
              rows={3}
              value={form.heroSubtitleUr || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, heroSubtitleUr: e.target.value }))}
              className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
            />
          </div>
        </div>

        {/* Hero Featured Image */}
        <div className="pt-4 border-t border-[#E5E1D8] space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block">
            Front Page Hero Background / Right Visual Photo
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={form.heroImage || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, heroImage: e.target.value }))}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
            />
            <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-[#E5E1D8] cursor-pointer shrink-0 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isUploading}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileUpload(e.target.files[0], (url) =>
                      setForm((prev) => ({ ...prev, heroImage: url }))
                    );
                  }
                }}
              />
            </label>
          </div>
          {form.heroImage && (
            <div className="h-28 rounded-xs overflow-hidden border border-[#E5E1D8] w-full max-w-sm">
              <img src={form.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* 4. TOP ANNOUNCEMENT NOTICE MARQUEE */}
      <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E5E1D8] pb-3">
          <h4 className="font-serif font-bold text-lg text-[#111827]">Top Notice Banner Bar</h4>
          <p className="text-xs text-gray-500">
            A dynamic ticker banner shown at the top of the homepage for urgent announcements, admission alerts, or Ramzan/Eid greetings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
              Banner Alert Text (English)
            </label>
            <input
              type="text"
              value={form.bannerNoticeEn || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, bannerNoticeEn: e.target.value }))}
              placeholder="e.g. Admissions Open for Hifz & Dars-e-Nizami"
              className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
              Banner Alert Text (Urdu)
            </label>
            <input
              type="text"
              value={form.bannerNoticeUr || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, bannerNoticeUr: e.target.value }))}
              placeholder="نئے تعلیمی سال کے داخلے جاری ہیں"
              className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving || isUploading}
          className="bg-[#065F46] hover:bg-[#044E39] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xs transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>
    </form>
  );
};
