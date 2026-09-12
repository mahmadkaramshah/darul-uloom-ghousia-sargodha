import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Tag, ArrowRight, Bell } from 'lucide-react';

export const NewsView: React.FC = () => {
  const { data, language, setCurrentPage } = useApp();
  const news = data?.news || [];

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-2">
            Announcements & Press Dispatches
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'خبریں، اعلانات و سرگرمیاں' : 'Institutional News & Admissions Bulletin'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur'
              ? 'دارالعلوم میں ہونے والی تقریبات، تعلیمی امتحانات کے نتائج، سالانہ داخلوں کے شیڈول اور اہم فلاحی اپ ڈیٹس سے باخبر رہیں۔'
              : 'Keep up with academic calendars, Dastar-e-Fazilat ceremonies, quarterly exam schedules, and new welfare initiatives.'}
          </p>
        </div>

        {/* News List */}
        <div className="space-y-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-8 sm:p-10 space-y-4 hover:border-[#065F46] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E1D8] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D97706] bg-[#F8F9F5] px-2.5 py-1 border border-[#E5E1D8]">
                    {item.category}
                  </span>
                  <span className="text-xs text-[#6B7280] font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#065F46]" />
                    <span>{item.date}</span>
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#111827]">
                {language === 'ur' ? item.titleUr : item.titleEn}
              </h3>

              <p className="text-sm text-[#4B5563] leading-relaxed">
                {language === 'ur' ? item.contentUr || item.summaryUr : item.contentEn || item.summaryEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
