import React from 'react';
import { useApp } from '../../context/AppContext';
import { Landmark, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake, MapPin, Users, BookOpen } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { data, language, setCurrentPage, openDonateModal } = useApp();
  const about = data?.about;
  const faculty = data?.faculty || [];

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-2">
            History & Heritage
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'تعارف، تاریخ و مقاصد' : 'About Darul Uloom Muhammadiya Ghousia'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur' 
              ? 'نواب کالونی، سرگودھا میں قائم دینی علوم، حفظِ قرآن اور انسانی فلاح و بہبود کا ایک عظیم اور معتبر ادارہ۔'
              : 'A distinguished center of traditional Islamic learning, Quranic memorization, free student lodging, and community welfare in Sargodha, Pakistan.'}
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#065F46]">Our Sacred Vision</span>
            <h3 className="text-2xl font-serif font-bold text-[#111827]">
              {language === 'ur' ? 'ہمارا وژن' : 'Preserving Tradition & Empowering Deserving Youth'}
            </h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {language === 'ur' ? about?.visionUr : about?.visionEn}
            </p>
          </div>

          <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#D97706] p-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Our Core Mission</span>
            <h3 className="text-2xl font-serif font-bold text-[#111827]">
              {language === 'ur' ? 'ہمارا مشن' : 'Accessible Knowledge & Selfless Community Service'}
            </h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {language === 'ur' ? about?.missionUr : about?.missionEn}
            </p>
          </div>
        </div>

        {/* Historical Narrative */}
        <div className="bg-white border border-[#E5E1D8] p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#065F46]"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46]">Founding & Milestones</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#111827]">
            {language === 'ur' ? 'ادارہ کی تاریخ اور سفر' : 'Over Two Decades of Unbroken Devotion'}
          </h2>
          <div className="text-sm text-[#4B5563] leading-relaxed space-y-4">
            <p>
              {language === 'ur' ? about?.historyUr : about?.historyEn}
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold text-[#111827] border-b border-[#E5E1D8] pb-4">
            {language === 'ur' ? 'بنیادی مقاصد و امتیازات' : 'Foundational Pillars & Principles'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '100% Free Education', desc: 'No fees charged to deserving students for tuition, books, or accommodation.' },
              { title: 'Dignified Matbakh', desc: 'Daily hygienic, nutritious meals served twice daily to every enrolled student.' },
              { title: 'Strict Shariah Compliance', desc: 'All Zakat and Sadaqah managed transparently strictly adhering to Islamic jurisprudence.' },
              { title: 'Community Upliftment', desc: 'Year-round Qurbani meat distribution, mosque construction, and emergency relief.' },
            ].map((p, idx) => (
              <div key={idx} className="bg-white border border-[#E5E1D8] p-6 space-y-2">
                <div className="text-lg font-serif font-bold text-[#065F46]">0{idx + 1}.</div>
                <h4 className="font-serif font-bold text-[#111827] text-base">{p.title}</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty / Scholars */}
        {faculty.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#111827] border-b border-[#E5E1D8] pb-4">
              {language === 'ur' ? 'اساتذہ کرام و انتظامیہ' : 'Distinguished Faculty & Leadership'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.map((f) => (
                <div key={f.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-6 space-y-2">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#D97706]">{f.roleEn}</div>
                  <h4 className="font-serif font-bold text-lg text-[#111827]">{language === 'ur' ? f.nameUr : f.nameEn}</h4>
                  <p className="text-xs text-[#6B7280]">{f.qualificationEn}</p>
                  <p className="text-xs text-[#4B5563] pt-2 border-t border-[#E5E1D8]">
                    {language === 'ur' ? f.bioUr : f.bioEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
