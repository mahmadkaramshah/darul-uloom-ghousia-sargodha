import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FacultyMember } from '../../types';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  CheckCircle2, 
  Eye, 
  GraduationCap, 
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';

export const AdminFacultyTab: React.FC = () => {
  const { data, adminToken, showToast, refreshData } = useApp();
  const [facultyList, setFacultyList] = useState<FacultyMember[]>(data?.faculty || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [form, setForm] = useState<FacultyMember>({
    id: '',
    nameEn: '',
    nameUr: '',
    roleEn: '',
    roleUr: '',
    designationEn: '',
    designationUr: '',
    bioEn: '',
    bioUr: '',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    qualificationsEn: [],
    qualificationsUr: [],
    order: 1,
    isActive: true
  });

  const [qualEnText, setQualEnText] = useState('');
  const [qualUrText, setQualUrText] = useState('');

  // Keep in sync with data
  React.useEffect(() => {
    if (data?.faculty) {
      setFacultyList(data.faculty);
    }
  }, [data?.faculty]);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      id: 'fac-' + Date.now(),
      nameEn: '',
      nameUr: '',
      roleEn: 'Senior Lecturer',
      roleUr: 'استاذِ حدیث و فقہ',
      designationEn: 'Department of Islamic Jurisprudence',
      designationUr: 'شعبہ افتاء و فقہ اسلامی',
      bioEn: '',
      bioUr: '',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      qualificationsEn: ['Al-Alimiyyah (Dars-e-Nizami)', 'M.A. Islamic Studies'],
      qualificationsUr: ['شہادۃ العالمیہ فی العلوم الاسلامیہ (وفاق المدارس)', 'ایم اے اسلامیات'],
      order: facultyList.length + 1,
      isActive: true
    });
    setQualEnText('Al-Alimiyyah (Dars-e-Nizami), M.A. Islamic Studies');
    setQualUrText('شہادۃ العالمیہ فی العلوم الاسلامیہ (وفاق المدارس)، ایم اے اسلامیات');
    setIsModalOpen(true);
  };

  const openEditModal = (member: FacultyMember) => {
    setEditingId(member.id);
    setForm({ ...member });
    setQualEnText(Array.isArray(member.qualificationsEn) ? member.qualificationsEn.join(', ') : (member.qualificationsEn || ''));
    setQualUrText(Array.isArray(member.qualificationsUr) ? member.qualificationsUr.join('، ') : (member.qualificationsUr || ''));
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
          setForm((prev) => ({ ...prev, photoUrl: resData.url }));
          showToast('Faculty photo uploaded successfully!', 'success');
        } else {
          showToast('Photo upload failed: ' + (resData.error || 'Unknown error'), 'error');
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      showToast('Upload error', 'error');
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nameEn && !form.nameUr) {
      showToast('Faculty name is required in at least English or Urdu.', 'error');
      return;
    }

    setIsSaving(true);

    const parsedQualEn = qualEnText
      .split(',')
      .map((q) => q.trim())
      .filter(Boolean);
    const parsedQualUr = qualUrText
      .split(/[،,]/)
      .map((q) => q.trim())
      .filter(Boolean);

    const updatedMember: FacultyMember = {
      ...form,
      qualificationsEn: parsedQualEn,
      qualificationsUr: parsedQualUr,
    };

    let updatedList: FacultyMember[];
    if (editingId) {
      updatedList = facultyList.map((f) => (f.id === editingId ? updatedMember : f));
    } else {
      updatedList = [...facultyList, updatedMember];
    }

    try {
      const res = await fetch('/api/admin/faculty', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ faculty: updatedList }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast('Faculty directory updated successfully!', 'success');
        setFacultyList(updatedList);
        setIsModalOpen(false);
        await refreshData();
      } else {
        showToast(resData.error || 'Failed to save faculty.', 'error');
      }
    } catch (err) {
      showToast('Error connecting to server.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name} from the faculty directory?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/faculty/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast('Faculty member removed.', 'success');
        setFacultyList((prev) => prev.filter((f) => f.id !== id));
        await refreshData();
      } else {
        showToast(resData.error || 'Failed to delete faculty member.', 'error');
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
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#111827]">
              Distinguished Faculty & Leadership
            </h2>
            <p className="text-xs text-[#4B5563]">
              Manage Shuyookh, senior Asatizah, Muftis, Qaris, and academic leadership profiles displayed across the website.
            </p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#065F46] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] transition-colors flex items-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Faculty Scholar</span>
        </button>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyList.map((member) => (
          <div
            key={member.id}
            className="bg-white border border-[#E5E1D8] p-5 shadow-xs flex flex-col justify-between hover:border-[#065F46] transition-all space-y-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={member.photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'}
                alt={member.nameEn}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#065F46]/30 shrink-0 bg-[#F3F0EA]"
              />
              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="font-serif text-base font-bold text-[#111827] truncate">
                  {member.nameEn}
                </h3>
                {member.nameUr && (
                  <p className="font-urdu text-sm text-[#065F46] font-bold truncate" dir="rtl">
                    {member.nameUr}
                  </p>
                )}
                <p className="text-xs text-[#6B7280] font-medium truncate">{member.roleEn}</p>
                <p className="text-[11px] text-[#9CA3AF] truncate">{member.designationEn}</p>
              </div>
            </div>

            {/* Qualifications Chips */}
            {member.qualificationsEn && member.qualificationsEn.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2 border-t border-[#F0ECE1]">
                {member.qualificationsEn.slice(0, 2).map((q, idx) => (
                  <span key={idx} className="bg-[#F8F9F5] text-[#4B5563] text-[10px] px-2 py-0.5 border border-[#E5E1D8]">
                    {q}
                  </span>
                ))}
                {member.qualificationsEn.length > 2 && (
                  <span className="text-[10px] text-[#6B7280]">+{member.qualificationsEn.length - 2} more</span>
                )}
              </div>
            )}

            {/* Bio snippet */}
            {member.bioEn && (
              <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed italic">
                "{member.bioEn}"
              </p>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#9CA3AF]">Order #{member.order || 1}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(member)}
                  className="p-1.5 text-[#065F46] hover:bg-[#F8F9F5] border border-[#E5E1D8] transition-colors"
                  title="Edit Scholar Profile"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id, member.nameEn)}
                  className="p-1.5 text-red-600 hover:bg-red-50 border border-[#E5E1D8] transition-colors"
                  title="Remove Scholar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add / Edit Faculty Member */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E1D8] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#065F46] text-white px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-300" />
                <h3 className="font-serif font-bold text-base">
                  {editingId ? 'Edit Faculty Scholar Profile' : 'Add New Faculty Scholar'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-5">
              
              {/* Photo Upload & Preview */}
              <div className="flex items-center gap-5 p-4 bg-[#F8F9F5] border border-[#E5E1D8]">
                <img
                  src={form.photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#065F46] bg-white shrink-0"
                />
                <div className="space-y-2 flex-1">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Scholar Photograph (URL or Upload)
                  </label>
                  <input
                    type="url"
                    value={form.photoUrl}
                    onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5E1D8] text-xs font-bold text-[#4B5563] hover:bg-[#F3F0EA]">
                      <Upload className="w-3.5 h-3.5 text-[#065F46]" />
                      <span>{isUploading ? 'Uploading...' : 'Upload Image File'}</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Names in English and Urdu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Name (English) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nameEn}
                    onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                    placeholder="e.g. Hazrat Allama Qari Muhammad Saeed"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    نام (اردو) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={form.nameUr}
                    onChange={(e) => setForm({ ...form, nameUr: e.target.value })}
                    placeholder="مثلاً: حضرت علامہ قاری محمد سعید مدظلہ"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Roles in English and Urdu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Academic Role / Title (English)
                  </label>
                  <input
                    type="text"
                    value={form.roleEn}
                    onChange={(e) => setForm({ ...form, roleEn: e.target.value })}
                    placeholder="e.g. Principal & Shaykh-ul-Hadith"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    عہدہ و منصب (اردو)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={form.roleUr}
                    onChange={(e) => setForm({ ...form, roleUr: e.target.value })}
                    placeholder="مثلاً: مہتمم و شیخ الحدیث دارالعلوم"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Designation / Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Department / Specialization (English)
                  </label>
                  <input
                    type="text"
                    value={form.designationEn}
                    onChange={(e) => setForm({ ...form, designationEn: e.target.value })}
                    placeholder="e.g. Department of Dars-e-Nizami & Hadith"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    شعبہ و تخصص (اردو)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={form.designationUr}
                    onChange={(e) => setForm({ ...form, designationUr: e.target.value })}
                    placeholder="مثلاً: شعبہ دورۂ حدیث و علوم القرآن"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Qualifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Qualifications (Comma Separated - English)
                  </label>
                  <input
                    type="text"
                    value={qualEnText}
                    onChange={(e) => setQualEnText(e.target.value)}
                    placeholder="e.g. Dars-e-Nizami, M.A Islamic Studies, Ifta"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    اسناد و قابلیت (اردو)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={qualUrText}
                    onChange={(e) => setQualUrText(e.target.value)}
                    placeholder="مثلاً: الشہادۃ العالمیہ، ایم اے اسلامیات"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Bio in English and Urdu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Scholarly Bio (English)
                  </label>
                  <textarea
                    rows={3}
                    value={form.bioEn}
                    onChange={(e) => setForm({ ...form, bioEn: e.target.value })}
                    placeholder="Brief background of scholarly experience and teaching history..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    مختصر سوانح و خدمات (اردو)
                  </label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={form.bioUr}
                    onChange={(e) => setForm({ ...form, bioUr: e.target.value })}
                    placeholder="تدریسی تجربہ اور علمی خدمات کا مختصر تعارف..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Order and Active Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.order || 1}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={form.isActive !== false}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 text-[#065F46] border-[#E5E1D8] rounded-xs"
                  />
                  <label htmlFor="isActive" className="text-xs font-bold text-[#111827]">
                    Visible on Public Website
                  </label>
                </div>
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
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Faculty Scholar</span>
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
