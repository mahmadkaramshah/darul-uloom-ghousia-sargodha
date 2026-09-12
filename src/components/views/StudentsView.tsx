import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, GraduationCap, HeartHandshake, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const StudentsView: React.FC = () => {
  const { data, language, openDonateModal } = useApp();
  const students = data?.students || [];
  const [filterDept, setFilterDept] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredStudents = students.filter((s) => {
    const studentProgram = s.program || (s as any).programEn || '';
    const hometown = (s as any).hometownEn || 'Sargodha';
    const rollNo = (s as any).rollNumber || s.id || '';

    const matchesDept = filterDept === 'all' || studentProgram.toLowerCase().includes(filterDept.toLowerCase());
    const matchesSearch = 
      rollNo.toLowerCase().includes(search.toLowerCase()) ||
      studentProgram.toLowerCase().includes(search.toLowerCase()) ||
      hometown.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest">
              Deserving Students & Student Roster
            </span>
            <span className="text-[10px] bg-emerald-50 text-[#065F46] border border-[#065F46] px-2 py-0.5 font-bold uppercase tracking-wider">
              Privacy Protected • رازداری کا تحفظ
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'طلباء و کفالت اسکالرشپ پروگرام' : 'Our Students & Sponsored Scholars'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur'
              ? 'دارالعلوم میں زیرِ تعلیم 500 سے زائد طلباء میں سے بیشتر کا تعلق دور دراز دیہی علاقوں اور نادار خاندانوں سے ہے۔ طلباء کے وقار اور رازداری کے پیشِ نظر ذاتی نام مخفی رکھے گئے ہیں، جبکہ تعلیمی کوائف اور رول نمبر درج ہیں۔'
              : 'Over 500 aspiring Huffaz and Islamic scholars are currently studying in our Sargodha campus. To protect student dignity and personal privacy, individual names are anonymized while academic records, roll numbers, and sponsorship details are transparently displayed.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#E5E1D8] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {['all', 'dars-e-nizami', 'hifz', 'tajweed'].map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDept(dept)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
                  filterDept === dept
                    ? 'bg-[#111827] text-white border-[#111827]'
                    : 'bg-white text-[#4B5563] border-[#E5E1D8] hover:border-[#065F46]'
                }`}
              >
                {dept === 'all' ? 'All Departments' : dept.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by Roll # or Hometown..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
            />
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((st, index) => {
            const isSponsored = (st as any).isSponsored ?? (st.status === 'full_scholarship' || st.status === 'free_education');
            const program = st.program || (st as any).programEn || 'Dars-e-Nizami';
            const hometown = (st as any).hometownEn || 'Sargodha District';
            const performance = (st as any).academicPerformance || st.achievements || 'Distinction';
            const year = (st as any).currentYear || st.enrollmentYear || '2024';
            const rollNumber = (st as any).rollNumber || st.id?.toUpperCase() || `STD-2024-${String(index + 101).padStart(3, '0')}`;
            
            // Privacy-preserving label
            const displayTitleEn = `Talib-e-Ilm • Roll #${rollNumber}`;
            const displayTitleUr = `طالب علم • رول نمبر ${rollNumber}`;

            return (
              <div key={st.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-6 space-y-4 hover:border-[#065F46] transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                        Scholar Candidate
                      </span>
                      <h4 className="font-serif font-bold text-lg text-[#111827]">
                        {language === 'ur' ? displayTitleUr : displayTitleEn}
                      </h4>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border ${
                      isSponsored 
                        ? 'bg-gray-100 text-gray-600 border-gray-300' 
                        : 'bg-amber-50 text-[#D97706] border-[#D97706]'
                    }`}>
                      {isSponsored ? 'SPONSORED' : 'NEEDS SPONSOR'}
                    </span>
                  </div>

                  <div className="text-xs text-[#4B5563] space-y-1.5 pt-2 border-t border-[#E5E1D8]/60">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Department:</span>
                      <span className="font-bold text-[#111827]">{program}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Enrollment / Year:</span>
                      <span className="text-[#111827]">{year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hometown:</span>
                      <span className="text-[#111827]">{hometown}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Performance:</span>
                      <span className="font-bold text-[#065F46] text-right truncate max-w-[180px]">{performance}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between mt-4">
                  <span className="text-[11px] font-serif font-bold text-[#065F46]">PKR 6,000 / mo</span>
                  {!isSponsored ? (
                    <button
                      onClick={() => openDonateModal('cat-student')}
                      className="bg-[#065F46] hover:bg-[#044E39] text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
                    >
                      Sponsor Student
                    </button>
                  ) : (
                    <span className="text-[10px] text-gray-400 italic">Fully Covered</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
