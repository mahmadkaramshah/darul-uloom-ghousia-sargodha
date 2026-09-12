import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  GraduationCap, 
  CheckCircle, 
  X, 
  Filter, 
  ShieldCheck, 
  AlertCircle,
  Award
} from 'lucide-react';
import { Student } from '../../types';

export const AdminStudentsTab: React.FC = () => {
  const { data, adminToken, showToast, refreshData, language } = useApp();
  const students = data?.students || [];

  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  // Add / Edit form state
  const [studentForm, setStudentForm] = useState<Partial<Student>>({
    rollNumber: '',
    nameEn: 'Talib-e-Ilm (Protected)',
    nameUr: 'طالب علم (محفوظ)',
    program: 'Dars-e-Nizami',
    programEn: 'Dars-e-Nizami (Alimiyyah)',
    programUr: 'درسِ نظامی (عالم کورس)',
    enrollmentYear: 2024,
    currentYear: 'Year 2 (Sanvia Khasa)',
    status: 'full_scholarship',
    isSponsored: false,
    hometown: 'Sargodha District',
    hometownEn: 'Sargodha District',
    hometownUr: 'ضلع سرگودھا',
    academicPerformance: 'Distinction / ممتاز',
    monthlyStipendPkr: 6000,
  });

  // Open Add Modal with fresh auto-generated Roll Number
  const openAddModal = () => {
    const nextNum = students.length + 101;
    const generatedRoll = `STD-2024-${String(nextNum).padStart(3, '0')}`;
    setStudentForm({
      id: `student-${Date.now()}`,
      rollNumber: generatedRoll,
      nameEn: 'Talib-e-Ilm (Protected)',
      nameUr: 'طالب علم (محفوظ)',
      program: 'Dars-e-Nizami',
      programEn: 'Dars-e-Nizami (Alimiyyah)',
      programUr: 'درسِ نظامی (عالم کورس)',
      enrollmentYear: new Date().getFullYear(),
      currentYear: 'Year 1',
      status: 'full_scholarship',
      isSponsored: false,
      hometown: 'Sargodha',
      hometownEn: 'Sargodha District',
      hometownUr: 'ضلع سرگودھا',
      academicPerformance: 'Mumtaz (Top 5% Merit)',
      monthlyStipendPkr: 6000,
    });
    setIsAddOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (st: Student) => {
    setEditingStudentId(st.id);
    setStudentForm({
      ...st,
      rollNumber: (st as any).rollNumber || st.id,
      hometownEn: (st as any).hometownEn || st.hometown || 'Sargodha',
      hometownUr: (st as any).hometownUr || 'سرگودھا',
      academicPerformance: (st as any).academicPerformance || st.achievements || 'Distinction',
      programEn: (st as any).programEn || st.program || 'Dars-e-Nizami',
      currentYear: (st as any).currentYear || `Year ${st.enrollmentYear || 2024}`,
    });
    setIsEditOpen(true);
  };

  // Save / Add Student
  const handleSaveNewStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.rollNumber) {
      showToast('Please specify a Roll Number', 'error');
      return;
    }

    const newStudent: Student = {
      id: studentForm.id || `student-${Date.now()}`,
      nameEn: studentForm.nameEn || 'Talib-e-Ilm (Protected)',
      nameUr: studentForm.nameUr || 'طالب علم (محفوظ)',
      rollNumber: studentForm.rollNumber,
      program: studentForm.program || 'Dars-e-Nizami',
      programEn: studentForm.programEn || studentForm.program || 'Dars-e-Nizami',
      programUr: studentForm.programUr || 'درسِ نظامی',
      enrollmentYear: Number(studentForm.enrollmentYear) || new Date().getFullYear(),
      currentYear: studentForm.currentYear || 'Year 1',
      status: studentForm.status || 'full_scholarship',
      isSponsored: studentForm.isSponsored || false,
      hometown: studentForm.hometownEn || studentForm.hometown || 'Sargodha',
      hometownEn: studentForm.hometownEn || 'Sargodha',
      hometownUr: studentForm.hometownUr || 'سرگودھا',
      academicPerformance: studentForm.academicPerformance || 'Distinction',
      monthlyStipendPkr: Number(studentForm.monthlyStipendPkr) || 6000,
    };

    const updatedList = [newStudent, ...students];

    try {
      const res = await fetch('/api/admin/students', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ students: updatedList }),
      });

      if (res.ok) {
        showToast(`Student #${newStudent.rollNumber} added to roster!`, 'success');
        setIsAddOpen(false);
        refreshData();
      } else {
        const json = await res.json();
        showToast(json.error || 'Failed to add student', 'error');
      }
    } catch {
      showToast('Network error adding student', 'error');
    }
  };

  // Save Edited Student
  const handleSaveEditStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudentId) return;

    const updatedList = students.map((st) => {
      if (st.id === editingStudentId) {
        return {
          ...st,
          ...studentForm,
          enrollmentYear: Number(studentForm.enrollmentYear) || st.enrollmentYear,
          monthlyStipendPkr: Number(studentForm.monthlyStipendPkr) || 6000,
        } as Student;
      }
      return st;
    });

    try {
      const res = await fetch('/api/admin/students', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ students: updatedList }),
      });

      if (res.ok) {
        showToast('Student record updated successfully!', 'success');
        setIsEditOpen(false);
        setEditingStudentId(null);
        refreshData();
      } else {
        const json = await res.json();
        showToast(json.error || 'Failed to update student', 'error');
      }
    } catch {
      showToast('Network error updating student', 'error');
    }
  };

  // Delete Student Handler - robust, no window.confirm dependency
  const handleDeleteStudent = async (studentId: string, rollNo?: string) => {
    // 1. Optimistically filter from current list
    const updatedList = students.filter((s) => s.id !== studentId);

    try {
      // Fire DELETE request to server
      const res = await fetch(`/api/admin/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      // Also ensure bulk array is synchronized if needed
      if (!res.ok) {
        // Fallback to bulk PUT
        await fetch('/api/admin/students', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ students: updatedList }),
        });
      }

      showToast(`Student ${rollNo || studentId} removed from roster`, 'info');
      refreshData();
    } catch {
      showToast('Network error deleting student', 'error');
    }
  };

  // Filter students
  const filteredStudents = students.filter((st) => {
    const rollNo = (st as any).rollNumber || st.id || '';
    const prog = st.program || (st as any).programEn || '';
    const town = (st as any).hometownEn || st.hometown || '';

    const matchesSearch =
      rollNo.toLowerCase().includes(search.toLowerCase()) ||
      prog.toLowerCase().includes(search.toLowerCase()) ||
      town.toLowerCase().includes(search.toLowerCase());

    const matchesDept =
      filterDept === 'all' || prog.toLowerCase().includes(filterDept.toLowerCase());

    const isSp = (st as any).isSponsored ?? (st.status === 'full_scholarship' || st.status === 'free_education');
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'sponsored' && isSp) ||
      (filterStatus === 'needs_sponsor' && !isSp);

    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalCount = students.length;
  const sponsoredCount = students.filter((s) => (s as any).isSponsored || s.status === 'full_scholarship').length;
  const needsSponsorCount = totalCount - sponsoredCount;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white border border-[#E5E1D8] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#065F46]" />
            <h3 className="text-xl font-serif font-bold text-[#111827]">
              Student Roster & Scholar Directory Management
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Add, update, or remove enrolled students. Student names remain protected on the public site for dignity and privacy.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors shrink-0 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Roster Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
            Total Enrolled Roster
          </span>
          <div className="text-2xl font-serif font-bold text-[#111827] mt-1">{totalCount}</div>
          <span className="text-[11px] text-gray-500">100% Free Education & Meals</span>
        </div>

        <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#1E3A8A] p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
            Active Full Sponsorships
          </span>
          <div className="text-2xl font-serif font-bold text-[#1E3A8A] mt-1">{sponsoredCount}</div>
          <span className="text-[11px] text-gray-500">Sponsored by generous donors</span>
        </div>

        <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#D97706] p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
            Awaiting Donors
          </span>
          <div className="text-2xl font-serif font-bold text-[#D97706] mt-1">{needsSponsorCount}</div>
          <span className="text-[11px] text-gray-500">PKR 6,000 / month required</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E5E1D8] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {['all', 'dars-e-nizami', 'hifz', 'tajweed'].map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all ${
                filterDept === dept
                  ? 'bg-[#111827] text-white border-[#111827]'
                  : 'bg-[#FDFBF7] text-[#4B5563] border-[#E5E1D8] hover:border-gray-400'
              }`}
            >
              {dept === 'all' ? 'All Programs' : dept.toUpperCase()}
            </button>
          ))}

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-1.5 bg-[#FDFBF7] border border-[#E5E1D8] text-gray-700 font-bold uppercase tracking-wider"
          >
            <option value="all">All Sponsorships</option>
            <option value="needs_sponsor">Needs Sponsor Only</option>
            <option value="sponsored">Sponsored Only</option>
          </select>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Roll #, Hometown, Dept..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white border border-[#E5E1D8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9F5] border-b border-[#E5E1D8] text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
              <tr>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Program / Dept</th>
                <th className="py-3 px-4">Hometown / Origin</th>
                <th className="py-3 px-4">Enrollment</th>
                <th className="py-3 px-4">Performance / Merit</th>
                <th className="py-3 px-4">Sponsorship Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1D8]">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    No students matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st, index) => {
                  const roll = (st as any).rollNumber || st.id;
                  const isSp = (st as any).isSponsored ?? (st.status === 'full_scholarship' || st.status === 'free_education');
                  const town = (st as any).hometownEn || st.hometown || 'Sargodha';
                  const prog = (st as any).programEn || st.program || 'Dars-e-Nizami';
                  const perf = (st as any).academicPerformance || st.achievements || 'Distinction';
                  const year = (st as any).currentYear || st.enrollmentYear || '2024';

                  return (
                    <tr key={st.id} className="hover:bg-[#FDFBF7] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#111827]">
                        <span className="bg-emerald-50 text-[#065F46] border border-[#065F46]/20 px-2 py-0.5 rounded-xs">
                          {roll}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#111827]">{prog}</td>
                      <td className="py-3.5 px-4 text-gray-600">{town}</td>
                      <td className="py-3.5 px-4 text-gray-600">{year}</td>
                      <td className="py-3.5 px-4 text-[#065F46] font-medium truncate max-w-[150px]">
                        {perf}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border ${
                            isSp
                              ? 'bg-gray-100 text-gray-700 border-gray-300'
                              : 'bg-amber-50 text-[#D97706] border-[#D97706]'
                          }`}
                        >
                          {isSp ? 'SPONSORED' : 'NEEDS SPONSOR'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(st)}
                            title="Edit Student"
                            className="p-1.5 text-gray-500 hover:text-[#065F46] hover:bg-emerald-50 border border-transparent hover:border-[#065F46] transition-all"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(st.id, roll)}
                            title="Delete Student"
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-300 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD STUDENT */}
      {/* ========================================================================= */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] border-t-4 border-t-[#065F46] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E5E1D8] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#065F46]">
                  Roster Enrollment
                </span>
                <h3 className="text-xl font-serif font-bold text-[#111827]">
                  Add Student to Roster
                </h3>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewStudent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.rollNumber || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                    placeholder="e.g. STD-2024-105"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Department / Academic Program *
                  </label>
                  <select
                    value={studentForm.program || 'Dars-e-Nizami'}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        program: e.target.value,
                        programEn: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  >
                    <option value="Dars-e-Nizami (Alimiyyah)">Dars-e-Nizami (Alimiyyah / 8 Years)</option>
                    <option value="Hifz-ul-Quran">Hifz-ul-Quran (Memorization)</option>
                    <option value="Tajweed & Qira'at">Tajweed & Qira'at (Sab'ah & Ashrah)</option>
                    <option value="Arabic Grammar & Nahw">Arabic Grammar, Sarf & Literature</option>
                    <option value="Hadees Specialization">Dora-e-Hadees Specialization</option>
                    <option value="Islamic Jurisprudence (Fiqh)">Islamic Jurisprudence (Takhassus Fil Fiqh)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Enrollment Year
                  </label>
                  <input
                    type="number"
                    value={studentForm.enrollmentYear || 2024}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, enrollmentYear: parseInt(e.target.value) || 2024 })
                    }
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Current Year / Level
                  </label>
                  <input
                    type="text"
                    value={studentForm.currentYear || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, currentYear: e.target.value })}
                    placeholder="e.g. Year 2 (Sanvia Khasa)"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Hometown / Origin (District)
                  </label>
                  <input
                    type="text"
                    value={studentForm.hometownEn || ''}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        hometown: e.target.value,
                        hometownEn: e.target.value,
                      })
                    }
                    placeholder="e.g. Sargodha, Khushab, Bhalwal, Mianwali..."
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Sponsorship Status
                  </label>
                  <select
                    value={studentForm.isSponsored ? 'sponsored' : 'needs_sponsor'}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        isSponsored: e.target.value === 'sponsored',
                        status: e.target.value === 'sponsored' ? 'full_scholarship' : 'free_education',
                      })
                    }
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  >
                    <option value="needs_sponsor">Needs Sponsor (Awaiting Donor)</option>
                    <option value="sponsored">Fully Sponsored</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Academic Performance & Merit Notes
                </label>
                <input
                  type="text"
                  value={studentForm.academicPerformance || ''}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, academicPerformance: e.target.value })
                  }
                  placeholder="e.g. Distinction in Fiqh, 15 Paras Memorized, Top 5% in Wifaq exam..."
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>

              <div className="bg-[#F8F9F5] p-3 border border-[#E5E1D8] text-[11px] text-gray-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#065F46] shrink-0 mt-0.5" />
                <span>
                  Privacy Protected: On the public website, student names are masked and displayed respectfully by Roll Number and Academic Merit only.
                </span>
              </div>

              <div className="pt-4 border-t border-[#E5E1D8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest"
                >
                  Save Student to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: EDIT STUDENT */}
      {/* ========================================================================= */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] border-t-4 border-t-[#111827] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E5E1D8] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#065F46]">
                  Record Editor
                </span>
                <h3 className="text-xl font-serif font-bold text-[#111827]">
                  Edit Student #{studentForm.rollNumber}
                </h3>
              </div>
              <button onClick={() => setIsEditOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditStudent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.rollNumber || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Department / Academic Program
                  </label>
                  <input
                    type="text"
                    value={studentForm.programEn || studentForm.program || ''}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        program: e.target.value,
                        programEn: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Enrollment Year
                  </label>
                  <input
                    type="number"
                    value={studentForm.enrollmentYear || 2024}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, enrollmentYear: parseInt(e.target.value) || 2024 })
                    }
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Current Year / Level
                  </label>
                  <input
                    type="text"
                    value={studentForm.currentYear || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, currentYear: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Hometown / Origin (District)
                  </label>
                  <input
                    type="text"
                    value={studentForm.hometownEn || ''}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        hometown: e.target.value,
                        hometownEn: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Sponsorship Status
                  </label>
                  <select
                    value={studentForm.isSponsored ? 'sponsored' : 'needs_sponsor'}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        isSponsored: e.target.value === 'sponsored',
                        status: e.target.value === 'sponsored' ? 'full_scholarship' : 'free_education',
                      })
                    }
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  >
                    <option value="needs_sponsor">Needs Sponsor (Awaiting Donor)</option>
                    <option value="sponsored">Fully Sponsored</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Academic Performance & Distinction
                </label>
                <input
                  type="text"
                  value={studentForm.academicPerformance || ''}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, academicPerformance: e.target.value })
                  }
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E1D8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#111827] hover:bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest"
                >
                  Update Student Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
