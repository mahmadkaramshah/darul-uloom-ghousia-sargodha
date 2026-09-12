import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoundationalPillar } from '../../types';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw,
  Edit3
} from 'lucide-react';

export const AdminPillarsTab: React.FC = () => {
  const { data, adminToken, showToast, refreshData } = useApp();
  const [pillars, setPillars] = useState<FoundationalPillar[]>(
    data?.about?.pillars && data.about.pillars.length > 0
      ? data.about.pillars
      : [
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
        ]
  );

  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (data?.about?.pillars && data.about.pillars.length > 0) {
      setPillars(data.about.pillars);
    }
  }, [data?.about?.pillars]);

  const handlePillarChange = (index: number, field: keyof FoundationalPillar, value: any) => {
    const updated = [...pillars];
    updated[index] = { ...updated[index], [field]: value };
    setPillars(updated);
  };

  const handleAddPillar = () => {
    const newPillar: FoundationalPillar = {
      id: 'pil-' + Date.now(),
      order: pillars.length + 1,
      titleEn: 'New Foundational Pillar',
      titleUr: 'نیا بنیادی ستون و اصول',
      descEn: 'Describe the institutional principle or welfare policy in English...',
      descUr: 'اصول یا مقصد کی تفصیل اردو میں درج کریں...'
    };
    setPillars([...pillars, newPillar]);
  };

  const handleRemovePillar = (index: number) => {
    if (pillars.length <= 1) {
      showToast('You must maintain at least one foundational pillar.', 'error');
      return;
    }
    const updated = pillars.filter((_, i) => i !== index);
    setPillars(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/about/pillars', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ pillars }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast('Foundational Pillars updated successfully!', 'success');
        await refreshData();
      } else {
        showToast(resData.error || 'Failed to update pillars.', 'error');
      }
    } catch (err) {
      showToast('Network error during save.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Bar */}
      <div className="bg-white p-6 border border-[#E5E1D8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#065F46]/10 border border-[#065F46]/20 flex items-center justify-center text-[#065F46]">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#111827]">
              Foundational Pillars & Institutional Principles
            </h2>
            <p className="text-xs text-[#4B5563]">
              Edit the core ideological pillars, educational guarantees, and welfare principles featured on the About and Home views.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddPillar}
            className="border border-[#E5E1D8] bg-white text-[#111827] px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#F8F9F5] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#065F46]" />
            <span>Add Pillar</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#065F46] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] disabled:opacity-50 transition-colors flex items-center gap-2 shadow-xs"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Pillars</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pillars List Cards */}
      <div className="space-y-6">
        {pillars.map((pillar, idx) => (
          <div
            key={pillar.id || idx}
            className="bg-white border border-[#E5E1D8] p-6 shadow-xs space-y-4 hover:border-[#065F46] transition-colors relative"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#065F46] text-white text-xs font-bold flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span className="text-xs font-bold uppercase text-[#111827]">
                  Pillar #{idx + 1}
                </span>
              </div>

              <button
                onClick={() => handleRemovePillar(idx)}
                className="text-red-600 hover:text-red-800 p-1.5 border border-[#E5E1D8] hover:bg-red-50 text-xs transition-colors flex items-center gap-1"
                title="Delete Pillar"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>

            {/* Titles in English & Urdu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-[#111827]">
                  Pillar Title (English) <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={pillar.titleEn}
                  onChange={(e) => handlePillarChange(idx, 'titleEn', e.target.value)}
                  placeholder="e.g. 100% Free Education & Shelter"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-semibold focus:border-[#065F46] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                  عنوان (اردو) <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={pillar.titleUr}
                  onChange={(e) => handlePillarChange(idx, 'titleUr', e.target.value)}
                  placeholder="مثلاً: 100٪ مفت دینی تعلیم، کتب و رہائش"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu font-bold focus:border-[#065F46] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Descriptions in English & Urdu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-[#111827]">
                  Description & Principles (English)
                </label>
                <textarea
                  rows={3}
                  value={pillar.descEn}
                  onChange={(e) => handlePillarChange(idx, 'descEn', e.target.value)}
                  placeholder="Detailed description of this foundational pillar..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                  تفصیل و بنیادی اصول (اردو)
                </label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={pillar.descUr}
                  onChange={(e) => handlePillarChange(idx, 'descUr', e.target.value)}
                  placeholder="اس بنیادی ستون کی جامع تفصیل اردو میں درج کریں..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                />
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Floating / Bottom Save Banner */}
      <div className="p-4 bg-[#F8F9F5] border border-[#E5E1D8] flex items-center justify-between">
        <p className="text-xs text-[#4B5563]">
          Ensure all changes are saved to reflect immediately across the About page and visitor presentations.
        </p>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#065F46] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] disabled:opacity-50 transition-colors flex items-center gap-2 shadow-xs"
        >
          {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>Save All Pillars</span>
        </button>
      </div>

    </div>
  );
};
