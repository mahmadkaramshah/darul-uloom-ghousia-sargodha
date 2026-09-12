import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, BookOpen, Clock, Users, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const EducationView: React.FC = () => {
  const { data, language, openDonateModal, setCurrentPage } = useApp();
  const programs = data?.educationPrograms || [];

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-2">
            Curriculum & Academic Structure
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'دینی تعلیمی شعبہ جات و نصاب' : 'Educational Programs & Classical Curriculum'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur'
              ? 'دارالعلوم میں حفظ و تجوید، درسِ نظامی، تجوید و قرأت اور ابتدائی دینی و عصری تعلیم کا منظم اور باقاعدہ انتظام موجود ہے۔ تمام طلباء کے لیے مکمل تعلیم، کتب اور رہائش 100% مفت ہے۔'
              : 'Offering rigorous programs from foundational Nazra and Hifz-ul-Quran to the 8-year Dars-e-Nizami Alim course, equipped with modern literacy and character-building.'}
          </p>
        </div>

        {/* Detailed Program Cards */}
        <div className="space-y-8">
          {programs.map((prog, idx) => (
            <div key={prog.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-8 sm:p-10 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E1D8] pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D97706] bg-[#F8F9F5] px-2.5 py-1 border border-[#E5E1D8]">
                      {prog.durationEn} Program
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      {prog.studentsCount}+ Active Students
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
                    {language === 'ur' ? prog.titleUr : prog.titleEn}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openDonateModal('cat-edu')}
                    className="bg-[#065F46] hover:bg-[#044E39] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Sponsor This Class
                  </button>
                </div>
              </div>

              <p className="text-sm text-[#4B5563] leading-relaxed">
                {language === 'ur' ? prog.descriptionUr : prog.descriptionEn}
              </p>

              {/* Curriculum Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#065F46]">
                    Key Subjects & Textbooks
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#4B5563]">
                    {(language === 'ur' ? prog.keySubjectsUr : prog.keySubjectsEn)?.map((sub, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#D97706]"></span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#065F46]">
                    Eligibility & Features
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#4B5563]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#065F46]"></span>
                      <span>Eligibility: {prog.eligibilityEn}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#065F46]"></span>
                      <span>Free Lodging, Uniforms, & Dars Books</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#065F46]"></span>
                      <span>Certificate recognized by Wafaq-ul-Madaris Al-Arabia</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Admission CTA */}
        <div className="bg-[#111827] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest">
              Admissions Open All Year Round
            </span>
            <h3 className="text-2xl font-serif font-bold text-white">
              {language === 'ur' ? 'داخلہ برائے نئے تعلیمی سال' : 'Interested in Enrolling a Deserving Student?'}
            </h3>
            <p className="text-xs text-gray-400 max-w-xl">
              We welcome applications for orphans and underprivileged boys. Complete support is arranged with the grace of Allah.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="shrink-0 bg-[#065F46] hover:bg-[#044E39] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Contact Admission Office
          </button>
        </div>

      </div>
    </div>
  );
};
