import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EducationProgram } from '../../types';
import { 
  GraduationCap, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Award, 
  RefreshCw,
  Users
} from 'lucide-react';

export const AdminEducationTab: React.FC = () => {
  const { data, adminToken, showToast, refreshData } = useApp();
  const [programsList, setProgramsList] = useState<EducationProgram[]>(data?.educationPrograms || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [form, setForm] = useState<EducationProgram>({
    id: '',
    titleEn: '',
    titleUr: '',
    category: 'dars-e-nizami',
    durationEn: '8 Years (Full-Time)',
    durationUr: '8 سال (مکمل درسِ نظامی)',
    descriptionEn: '',
    descriptionUr: '',
    keySubjectsEn: [],
    keySubjectsUr: [],
    eligibilityEn: 'Completion of Primary / Middle School with sound intellect.',
    eligibilityUr: 'پرائمری یا مڈل پاس، اچھے اخلاق اور دینی لگاؤ۔',
    degreeConferredEn: 'Shahadat-ul-Alimiyyah (Equivalent to M.A Islamic Studies / Arabic by HEC)',
    degreeConferredUr: 'شہادۃ العالمیہ فی العلوم الاسلامیہ والعربیہ (وفاق المدارس العربیہ پاکستان)',
    studentsCount: 220,
    isFreeTuition: true,
    isFreeBoarding: true,
    featuredImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    order: 1
  });

  const [subjectsEnText, setSubjectsEnText] = useState('');
  const [subjectsUrText, setSubjectsUrText] = useState('');

  React.useEffect(() => {
    if (data?.educationPrograms) {
      setProgramsList(data.educationPrograms);
    }
  }, [data?.educationPrograms]);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      id: 'edu-' + Date.now(),
      titleEn: '',
      titleUr: '',
      category: 'dars-e-nizami',
      durationEn: '8 Years (Full-Time)',
      durationUr: '8 سال (مکمل نصاب)',
      descriptionEn: '',
      descriptionUr: '',
      keySubjectsEn: ['Tafseer', 'Hadith', 'Fiqh', 'Arabic Literature', 'Mantiq'],
      keySubjectsUr: ['تفسیر القرآن', 'حدیث شریف', 'فقہ و اصول فقہ', 'عربی ادب', 'منطق و فلسفہ'],
      eligibilityEn: 'Age 12+, Basic Quran reading proficiency',
      eligibilityUr: 'عمر کم از کم 12 سال، ناظرہ قرآن مجید کا علم',
      degreeConferredEn: 'Shahadat-ul-Alimiyyah (Wafaq-ul-Madaris)',
      degreeConferredUr: 'شہادۃ العالمیہ فی العلوم الاسلامیہ (وفاق المدارس العربیہ)',
      studentsCount: 150,
      isFreeTuition: true,
      isFreeBoarding: true,
      featuredImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      order: programsList.length + 1
    });
    setSubjectsEnText('Tafseer, Hadith, Fiqh, Arabic Literature, Mantiq');
    setSubjectsUrText('تفسیر القرآن، حدیث شریف، فقہ و اصول فقہ، عربی ادب، منطق و فلسفہ');
    setIsModalOpen(true);
  };

  const openEditModal = (prog: EducationProgram) => {
    setEditingId(prog.id);
    setForm({ ...prog });
    setSubjectsEnText(Array.isArray(prog.keySubjectsEn) ? prog.keySubjectsEn.join(', ') : '');
    setSubjectsUrText(Array.isArray(prog.keySubjectsUr) ? prog.keySubjectsUr.join('، ') : '');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            filename: file.name,
            fileData: base64,
            fileType: file.type.includes('png') ? 'png' : 'jpg',
          }),
        });

        const resData = await res.json();
        if (res.ok && resData.url) {
          setForm((prev) => ({ ...prev, featuredImage: resData.url }));
          showToast('Program image uploaded!', 'success');
        } else {
          showToast('Upload failed: ' + (resData.error || 'Unknown error'), 'error');
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      showToast('Upload error', 'error');
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.titleEn && !form.titleUr) {
      showToast('Program title is required in English or Urdu.', 'error');
      return;
    }

    setIsSaving(true);

    const parsedSubjectsEn = subjectsEnText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const parsedSubjectsUr = subjectsUrText
      .split(/[،,]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedProgram: EducationProgram = {
      ...form,
      keySubjectsEn: parsedSubjectsEn,
      keySubjectsUr: parsedSubjectsUr,
    };

    let updatedList: EducationProgram[];
    if (editingId) {
      updatedList = programsList.map((p) => (p.id === editingId ? updatedProgram : p));
    } else {
      updatedList = [...programsList, updatedProgram];
    }

    try {
      const res = await fetch('/api/admin/education-programs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ programs: updatedList }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast('Curriculum & courses updated successfully!', 'success');
        setProgramsList(updatedList);
        setIsModalOpen(false);
        await refreshData();
      } else {
        showToast(resData.error || 'Failed to save educational program.', 'error');
      }
    } catch (err) {
      showToast('Network error during save.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the program: "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/education-programs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast('Educational course removed.', 'success');
        setProgramsList((prev) => prev.filter((p) => p.id !== id));
        await refreshData();
      } else {
        showToast(resData.error || 'Failed to delete course.', 'error');
      }
    } catch (err) {
      showToast('Network error during deletion.', 'error');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Bar */}
      <div className="bg-white p-6 border border-[#E5E1D8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#065F46]/10 border border-[#065F46]/20 flex items-center justify-center text-[#065F46]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#111827]">
              Educational Programs & Classical Curriculum
            </h2>
            <p className="text-xs text-[#4B5563]">
              Add, modify, and manage Dars-e-Nizami, Hifz-ul-Quran, Tajweed, and specialized Islamic study programs.
            </p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#065F46] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] transition-colors flex items-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course / Program</span>
        </button>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programsList.map((prog) => (
          <div
            key={prog.id}
            className="bg-white border border-[#E5E1D8] shadow-xs flex flex-col justify-between hover:border-[#065F46] transition-all overflow-hidden"
          >
            {/* Header / Featured Image */}
            <div className="aspect-16/9 bg-black relative overflow-hidden">
              <img
                src={prog.featuredImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'}
                alt={prog.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="bg-[#065F46] text-white text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">
                  {prog.durationEn}
                </span>
                {prog.isFreeTuition && (
                  <span className="bg-emerald-700 text-white text-[10px] px-2 py-0.5 font-bold uppercase">
                    100% Free
                  </span>
                )}
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <h3 className="font-serif text-base font-bold leading-tight">
                  {prog.titleEn}
                </h3>
              </div>
            </div>

            {/* Course Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {prog.titleUr && (
                  <p className="font-urdu text-sm text-[#065F46] font-bold text-right" dir="rtl">
                    {prog.titleUr}
                  </p>
                )}

                <p className="text-xs text-[#4B5563] line-clamp-3 leading-relaxed">
                  {prog.descriptionEn}
                </p>

                {/* Key Subjects */}
                {prog.keySubjectsEn && prog.keySubjectsEn.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#6B7280]">Key Subjects:</span>
                    <div className="flex flex-wrap gap-1">
                      {prog.keySubjectsEn.slice(0, 3).map((sub, idx) => (
                        <span key={idx} className="bg-[#F8F9F5] text-[#111827] text-[10px] px-2 py-0.5 border border-[#E5E1D8]">
                          {sub}
                        </span>
                      ))}
                      {prog.keySubjectsEn.length > 3 && (
                        <span className="text-[10px] text-[#6B7280]">+{prog.keySubjectsEn.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Degree / Conferred Sanad */}
                {prog.degreeConferredEn && (
                  <div className="pt-2 border-t border-[#F0ECE1] flex items-start gap-1.5 text-[11px] text-[#6B7280]">
                    <Award className="w-3.5 h-3.5 text-[#065F46] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{prog.degreeConferredEn}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#9CA3AF] flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{prog.studentsCount || 0} Students</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(prog)}
                    className="p-1.5 text-[#065F46] hover:bg-[#F8F9F5] border border-[#E5E1D8] transition-colors"
                    title="Edit Course"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prog.id, prog.titleEn)}
                    className="p-1.5 text-red-600 hover:bg-red-50 border border-[#E5E1D8] transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add / Edit Course */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E1D8] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#065F46] text-white px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-300" />
                <h3 className="font-serif font-bold text-base">
                  {editingId ? 'Edit Educational Program' : 'Add New Educational Program'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-5">
              
              {/* Image & URL */}
              <div className="flex items-center gap-4 p-4 bg-[#F8F9F5] border border-[#E5E1D8]">
                <img
                  src={form.featuredImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'}
                  alt="Preview"
                  className="w-24 h-16 object-cover border border-[#065F46] bg-black shrink-0"
                />
                <div className="space-y-2 flex-1">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Program Image (URL or File)
                  </label>
                  <input
                    type="url"
                    value={form.featuredImage}
                    onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E1D8] text-xs font-bold text-[#4B5563] hover:bg-[#F3F0EA]">
                    <Upload className="w-3.5 h-3.5 text-[#065F46]" />
                    <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Course Title in English and Urdu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Program Title (English) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    placeholder="e.g. Dars-e-Nizami (Al-Alimiyyah 8 Years)"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    کورس کا نام (اردو) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={form.titleUr}
                    onChange={(e) => setForm({ ...form, titleUr: e.target.value })}
                    placeholder="مثلاً: درسِ نظامی (شہادۃ العالمیہ 8 سالہ کورس)"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Category, Duration En & Ur */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. dars-e-nizami or hifz"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Duration (English)
                  </label>
                  <input
                    type="text"
                    value={form.durationEn}
                    onChange={(e) => setForm({ ...form, durationEn: e.target.value })}
                    placeholder="e.g. 8 Years (Full-Time)"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    مدت (اردو)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={form.durationUr}
                    onChange={(e) => setForm({ ...form, durationUr: e.target.value })}
                    placeholder="مثلاً: 8 سالہ مکمل نصاب"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Key Subjects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Key Subjects (Comma Separated - English)
                  </label>
                  <input
                    type="text"
                    value={subjectsEnText}
                    onChange={(e) => setSubjectsEnText(e.target.value)}
                    placeholder="Tafseer, Hadith, Fiqh, Usul, Sarf, Nahw"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    اہم مضامین و نصاب (اردو)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={subjectsUrText}
                    onChange={(e) => setSubjectsUrText(e.target.value)}
                    placeholder="تفسیر، حدیث، فقہ، صرف، نحو، ادب"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Degrees Conferred */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Degree / Sanad Conferred (English)
                  </label>
                  <input
                    type="text"
                    value={form.degreeConferredEn || ''}
                    onChange={(e) => setForm({ ...form, degreeConferredEn: e.target.value })}
                    placeholder="Shahadat-ul-Alimiyyah (Wafaq-ul-Madaris Al-Arabia)"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    سند و ڈگری (اردو)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={form.degreeConferredUr || ''}
                    onChange={(e) => setForm({ ...form, degreeConferredUr: e.target.value })}
                    placeholder="شہادۃ العالمیہ فی العلوم الاسلامیہ (وفاق المدارس)"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Program Overview & Objectives (English)
                  </label>
                  <textarea
                    rows={3}
                    value={form.descriptionEn}
                    onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                    placeholder="Comprehensive overview of learning methodology and outcomes..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    کورس کی تفصیل و اہداف (اردو)
                  </label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={form.descriptionUr}
                    onChange={(e) => setForm({ ...form, descriptionUr: e.target.value })}
                    placeholder="تعلیمی طریقہ کار، نصابی کتب اور مقاصد کی تفصیل..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Free Tuition / Free Boarding Checkboxes */}
              <div className="flex items-center gap-6 p-3 bg-[#F8F9F5] border border-[#E5E1D8]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#111827]">
                  <input
                    type="checkbox"
                    checked={form.isFreeTuition !== false}
                    onChange={(e) => setForm({ ...form, isFreeTuition: e.target.checked })}
                    className="w-4 h-4 text-[#065F46] border-[#E5E1D8] rounded-xs"
                  />
                  <span>100% Free Tuition Fee</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#111827]">
                  <input
                    type="checkbox"
                    checked={form.isFreeBoarding !== false}
                    onChange={(e) => setForm({ ...form, isFreeBoarding: e.target.checked })}
                    className="w-4 h-4 text-[#065F46] border-[#E5E1D8] rounded-xs"
                  />
                  <span>Free Boarding, Books & Meals</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-[#E5E1D8] text-[#4B5563] text-xs font-bold uppercase tracking-wider hover:bg-[#F8F9F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#065F46] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] disabled:opacity-50 transition-colors flex items-center gap-2 shadow-xs"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Course...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Educational Program</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
