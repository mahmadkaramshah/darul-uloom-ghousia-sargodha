import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, MapPin, CheckCircle2, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export const MosqueView: React.FC = () => {
  const { data, language, openDonateModal } = useApp();
  const mosques = data?.mosqueProjects || [];

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-2">
            Houses of Allah • Continuous Sadaqah Jariyah
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'تعمیر و توسیعِ مساجد پروجیکٹس' : 'Mosque Construction & Upliftment Projects'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur'
              ? 'دارالعلوم محمدیہ غوثیہ اب تک سرگودھا اور گردونواح کے دیہی علاقوں میں 12 سے زائد مساجد کی تعمیر و بحالی مکمل کر چکا ہے۔ مسجد کی تعمیر میں ایک اینٹ کا حصہ بھی صدقۂ جاریہ ہے۔'
              : 'Building dignified, permanent places of worship in rural and underdeveloped sectors across Sargodha. Over 12 mosques successfully delivered and active.'}
          </p>
        </div>

        {/* Mosque Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mosques.map((m) => {
            const status = m.constructionStatus || (m as any).status || 'In Progress';
            const raised = m.amountRaisedPkr ?? (m as any).collectedPkr ?? 0;
            const target = m.requiredFundingPkr ?? (m as any).estimatedCostPkr ?? 1;
            const pct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;
            const capacity = (m as any).capacity || 500;

            return (
              <div key={m.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-8 flex flex-col justify-between hover:border-[#065F46] transition-all space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] bg-[#F8F9F5] px-2.5 py-1 border border-[#E5E1D8]">
                      Capacity: {capacity} Worshipers
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border ${
                      status === 'Completed' || status === 'completed'
                        ? 'bg-emerald-50 text-[#065F46] border-[#065F46]' 
                        : 'bg-amber-50 text-[#D97706] border-[#D97706]'
                    }`}>
                      {status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#111827]">
                    {language === 'ur' ? m.nameUr : m.nameEn}
                  </h3>

                  <p className="text-xs text-[#6B7280] flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{language === 'ur' ? m.locationUr : m.locationEn}</span>
                  </p>

                  <p className="text-xs text-[#4B5563] leading-relaxed pt-2">
                    {language === 'ur' ? m.descriptionUr : m.descriptionEn}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-2 pt-4 border-t border-[#E5E1D8]">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-[#111827]">{pct}% Funded</span>
                    <span className="text-[#6B7280]">Target: PKR {target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] h-2">
                    <div className="bg-[#065F46] h-full" style={{ width: `${pct}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#6B7280] pt-1">
                    <span>Collected: PKR {raised.toLocaleString()}</span>
                    <span>Remaining: PKR {Math.max(0, target - raised).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => openDonateModal('cat-mosque')}
                    className="w-full bg-[#111827] hover:bg-black text-white py-2.5 text-xs font-bold uppercase tracking-widest transition-colors mt-2"
                  >
                    Donate to This Mosque
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Hadith Quote Banner in Editorial Aesthetic */}
        <div className="bg-[#111827] text-white p-8 sm:p-12 text-center space-y-3">
          <p className="text-lg sm:text-xl font-serif italic text-gray-300 max-w-2xl mx-auto">
            "Whoever builds a mosque for the sake of Allah, Allah will build for him a house like it in Paradise."
          </p>
          <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-widest block">
            — Sahih al-Bukhari 450, Sahih Muslim 533
          </span>
        </div>

      </div>
    </div>
  );
};
