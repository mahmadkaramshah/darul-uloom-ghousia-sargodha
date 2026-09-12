import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeartHandshake, ShieldCheck, CheckCircle2, Building2, Flame, Users, ArrowRight } from 'lucide-react';

export const WelfareView: React.FC = () => {
  const { data, language, openDonateModal, setCurrentPage } = useApp();
  const projects = data?.welfareProjects || [];

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-2">
            Social Uplift & Community Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'فلاحی خدمات و سماجی منصوبے' : 'Community Welfare & Relief Initiatives'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur'
              ? 'دارالعلوم محمدیہ غوثیہ تعلیمی خدمات کے ساتھ ساتھ نادار گھرانوں کی مالی معاونت، راشن پیکجز کی تقسیم، صاف پانی کے فلٹریشن پلانٹس اور ہنگامی ریلیف کے لیے ہمہ وقت سرگرم ہے۔'
              : 'Serving humanity with compassion through medical aid, clean water filtration, orphan marriage assistance, winter relief packages, and emergency disaster response in Sargodha and adjoining districts.'}
          </p>
        </div>

        {/* Welfare Projects Grid in Editorial Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-8 flex flex-col justify-between hover:border-[#065F46] transition-all space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] bg-[#F8F9F5] px-2.5 py-1 border border-[#E5E1D8]">
                  {proj.categoryEn}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#111827]">
                  {language === 'ur' ? proj.titleUr : proj.titleEn}
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {language === 'ur' ? proj.descriptionUr : proj.descriptionEn}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E1D8] space-y-3">
                <div className="flex justify-between text-xs text-[#6B7280]">
                  <span>Beneficiaries:</span>
                  <span className="font-bold text-[#111827]">{proj.beneficiariesCount}+</span>
                </div>
                <div className="flex justify-between text-xs text-[#6B7280]">
                  <span>Status:</span>
                  <span className="font-bold text-[#065F46] uppercase text-[10px] tracking-widest">{proj.status}</span>
                </div>
                <button
                  onClick={() => openDonateModal(proj.id)}
                  className="w-full bg-[#111827] hover:bg-black text-white py-2 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Support This Project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Water & Infrastructure Highlight */}
        <div className="bg-[#111827] text-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest">
              Safe Drinking Water Project
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {language === 'ur' ? 'صاف پینے کے پانی کی فراہمی' : 'Water Filtration Plants for Local Communities'}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
              Installing reverse-osmosis filtration plants in deprived neighborhoods of Sargodha, saving hundreds of families from waterborne ailments.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-end">
            <button
              onClick={() => openDonateModal('cat-welfare')}
              className="bg-[#065F46] hover:bg-[#044E39] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors w-full sm:w-auto text-center"
            >
              Sponsor Water Plant
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
