import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';
import { 
  Calendar, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Flag, 
  Image as ImageIcon,
  RefreshCw,
  Eye,
  UserCheck
} from 'lucide-react';

export const AdminEventsTab: React.FC = () => {
  const { data, adminToken, showToast, refreshData } = useApp();
  const [eventsList, setEventsList] = useState<EventItem[]>(data?.events || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [form, setForm] = useState<EventItem>({
    id: '',
    titleEn: '',
    titleUr: '',
    category: '14 August & National',
    date: new Date().toISOString().split('T')[0],
    time: '09:00 AM - 01:00 PM',
    locationEn: 'Main Jamia Courtyard & Auditorium, Nawab Colony, Sargodha',
    locationUr: 'مرکزی صحن و آڈیٹوریم دارالعلوم، نواب کالونی، سرگودھا',
    descriptionEn: '',
    descriptionUr: '',
    featuredImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80'],
    status: 'completed',
    chiefGuestEn: '',
    chiefGuestUr: '',
    organizerEn: 'Darul Uloom Student Affairs Committee',
    organizerUr: 'شعبہ طلباء امور دارالعلوم'
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  React.useEffect(() => {
    if (data?.events) {
      setEventsList(data.events);
    }
  }, [data?.events]);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      id: 'evt-' + Date.now(),
      titleEn: '',
      titleUr: '',
      category: '14 August & National',
      date: new Date().toISOString().split('T')[0],
      time: '09:00 AM - 01:00 PM',
      locationEn: 'Main Jamia Courtyard & Auditorium, Nawab Colony, Sargodha',
      locationUr: 'مرکزی صحن و آڈیٹوریم دارالعلوم، نواب کالونی، سرگودھا',
      descriptionEn: '',
      descriptionUr: '',
      featuredImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
      images: ['https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80'],
      status: 'completed',
      chiefGuestEn: 'Hazrat Allama Qari Muhammad Saeed (D.B)',
      chiefGuestUr: 'حضرت علامہ قاری محمد سعید مدظلہ',
      organizerEn: 'Darul Uloom Student Affairs Committee',
      organizerUr: 'شعبہ طلباء امور دارالعلوم'
    });
    setImageUrlInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (event: EventItem) => {
    setEditingId(event.id);
    setForm({ 
      ...event, 
      images: event.images || (event.featuredImage ? [event.featuredImage] : []) 
    });
    setImageUrlInput('');
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
          setForm((prev) => ({
            ...prev,
            featuredImage: prev.featuredImage || resData.url,
            images: [...(prev.images || []), resData.url],
          }));
          showToast('Event picture uploaded successfully!', 'success');
        } else {
          showToast('Photo upload failed: ' + (resData.error || 'Unknown error'), 'error');
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      showToast('Upload error', 'error');
      setIsUploading(false);
    }
  };

  const addImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      featuredImage: prev.featuredImage || imageUrlInput.trim(),
      images: [...(prev.images || []), imageUrlInput.trim()],
    }));
    setImageUrlInput('');
  };

  const removeImage = (index: number) => {
    const updatedImages = (form.images || []).filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      featuredImage: updatedImages[0] || '',
      images: updatedImages,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.titleEn && !form.titleUr) {
      showToast('Event title is required in at least English or Urdu.', 'error');
      return;
    }

    setIsSaving(true);

    const eventPayload: EventItem = {
      ...form,
      featuredImage: form.featuredImage || form.images?.[0] || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
      images: form.images && form.images.length > 0 ? form.images : [form.featuredImage || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80'],
    };

    let updatedList: EventItem[];
    if (editingId) {
      updatedList = eventsList.map((evt) => (evt.id === editingId ? eventPayload : evt));
    } else {
      updatedList = [eventPayload, ...eventsList];
    }

    try {
      const res = await fetch('/api/admin/events', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ events: updatedList }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast('Events directory updated successfully!', 'success');
        setEventsList(updatedList);
        setIsModalOpen(false);
        await refreshData();
      } else {
        showToast(resData.error || 'Failed to save event.', 'error');
      }
    } catch (err) {
      showToast('Network error during save.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the event: "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast('Event deleted successfully.', 'success');
        setEventsList((prev) => prev.filter((e) => e.id !== id));
        await refreshData();
      } else {
        showToast(resData.error || 'Failed to delete event.', 'error');
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
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#111827]">
              Events, Mahafil & 14th August Celebrations
            </h2>
            <p className="text-xs text-[#4B5563]">
              Publish and manage pictorial reports, venue locations, chief guest records, and schedules for religious gatherings and national holidays.
            </p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#065F46] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] transition-colors flex items-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Event</span>
        </button>
      </div>

      {/* Events Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsList.map((event) => {
          const is14August = event.category.includes('14 August') || event.titleEn.includes('14th August');

          return (
            <div
              key={event.id}
              className="bg-white border border-[#E5E1D8] shadow-xs flex flex-col justify-between hover:border-[#065F46] transition-all overflow-hidden"
            >
              {/* Event Image */}
              <div className="aspect-16/10 bg-black relative overflow-hidden">
                <img
                  src={event.featuredImage || event.images?.[0] || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80'}
                  alt={event.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs ${
                    is14August ? 'bg-emerald-700' : 'bg-[#065F46]'
                  }`}>
                    {event.category}
                  </span>
                  {event.status === 'upcoming' && (
                    <span className="bg-amber-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase">
                      Upcoming
                    </span>
                  )}
                </div>

                {event.images && event.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 text-[10px] font-bold flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    <span>{event.images.length} Photos</span>
                  </div>
                )}
              </div>

              {/* Event Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#065F46]">{event.date}</span>
                  <h3 className="font-serif text-base font-bold text-[#111827] line-clamp-2">
                    {event.titleEn}
                  </h3>
                  {event.titleUr && (
                    <p className="font-urdu text-sm text-[#065F46] font-bold line-clamp-1" dir="rtl">
                      {event.titleUr}
                    </p>
                  )}

                  <div className="pt-2 border-t border-[#F0ECE1] text-xs text-[#6B7280] space-y-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#065F46] shrink-0" />
                      <span className="truncate">{event.locationEn}</span>
                    </div>
                    {event.chiefGuestEn && (
                      <div className="flex items-center gap-1.5 truncate text-[#111827]">
                        <UserCheck className="w-3.5 h-3.5 text-[#065F46] shrink-0" />
                        <span className="truncate">{event.chiefGuestEn}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(event)}
                    className="p-1.5 text-[#065F46] hover:bg-[#F8F9F5] border border-[#E5E1D8] transition-colors"
                    title="Edit Event"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id, event.titleEn)}
                    className="p-1.5 text-red-600 hover:bg-red-50 border border-[#E5E1D8] transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add / Edit Event */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E1D8] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#065F46] text-white px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-300" />
                <h3 className="font-serif font-bold text-base">
                  {editingId ? 'Edit Event & Picture Details' : 'Upload New Event & Pictures'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-6">
              
              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Event Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden font-medium"
                  >
                    <option value="14 August & National">14 August & National (جشنِ آزادی)</option>
                    <option value="Milad & Mahafil">Milad & Mahafil (محافلِ میلاد و نعت)</option>
                    <option value="Urs Mubarak">Urs Mubarak (عرس مبارک)</option>
                    <option value="Khatm-e-Bukhari & Convocation">Khatm-e-Bukhari & Convocation (ختمِ بخاری و اسناد)</option>
                    <option value="Conferences">Conferences & Seminars (کانفرنسز و سیمینارز)</option>
                    <option value="General Gathering">General Gathering (عمومی تقریب)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Event Status
                  </label>
                  <select
                    value={form.status || 'completed'}
                    onChange={(e) => setForm({ ...form, status: e.target.value as 'upcoming' | 'completed' })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden font-medium"
                  >
                    <option value="completed">Completed / Historical Record</option>
                    <option value="upcoming">Upcoming Event (Highlight on Site)</option>
                  </select>
                </div>
              </div>

              {/* Title in English and Urdu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Event Title (English) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    placeholder="e.g. 14th August Independence Day Celebration & Flag Hoisting"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    تقریب کا عنوان (اردو) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={form.titleUr}
                    onChange={(e) => setForm({ ...form, titleUr: e.target.value })}
                    placeholder="مثلاً: جشنِ آزادی 14 اگست کی پروقار تقریب اور پرچم کشائی"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Date, Time and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Date of Event <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Time / Timings
                  </label>
                  <input
                    type="text"
                    value={form.time || ''}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    placeholder="e.g. 08:30 AM - 12:00 PM or After Isha"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Venue / Location in English and Urdu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Location / Venue (English) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.locationEn}
                    onChange={(e) => setForm({ ...form, locationEn: e.target.value })}
                    placeholder="e.g. Main Jamia Courtyard, Nawab Colony, Sargodha"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    مقام / وینٹیو (اردو) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={form.locationUr}
                    onChange={(e) => setForm({ ...form, locationUr: e.target.value })}
                    placeholder="مثلاً: مرکزی صحن و آڈیٹوریم دارالعلوم، نواب کالونی، سرگودھا"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Chief Guest & Organizer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Chief Guest / Revered Scholars (English)
                  </label>
                  <input
                    type="text"
                    value={form.chiefGuestEn || ''}
                    onChange={(e) => setForm({ ...form, chiefGuestEn: e.target.value })}
                    placeholder="e.g. Hazrat Allama Qari Muhammad Saeed (D.B)"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    مہمانِ خصوصی و شیوخ (اردو)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={form.chiefGuestUr || ''}
                    onChange={(e) => setForm({ ...form, chiefGuestUr: e.target.value })}
                    placeholder="مثلاً: حضرت علامہ قاری محمد سعید مدظلہ"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Event Photos Upload & Gallery Manager */}
              <div className="space-y-3 p-4 bg-[#F8F9F5] border border-[#E5E1D8]">
                <label className="block text-xs font-bold uppercase text-[#111827]">
                  Event Pictures & Gallery Photos
                </label>
                
                {/* Upload & Add URL Controls */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#065F46] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] shadow-xs shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Uploading Image...' : 'Upload Image File'}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>

                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="Or paste external image URL (https://...)"
                      className="flex-1 px-3 py-2 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={addImageUrl}
                      className="px-3.5 py-2 bg-white border border-[#E5E1D8] text-xs font-bold text-[#111827] hover:bg-[#F3F0EA] shrink-0"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                {/* Uploaded Photos Thumbnails Grid */}
                {form.images && form.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                    {form.images.map((imgUrl, idx) => (
                      <div key={idx} className="relative aspect-4/3 bg-black border border-[#E5E1D8] group overflow-hidden">
                        <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-xs hover:bg-red-700 opacity-90 transition-opacity"
                          title="Remove picture"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-1 left-1 bg-[#065F46] text-white text-[9px] px-1.5 py-0.5 font-bold uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Event Detailed Description in English & Urdu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827]">
                    Event Details & Report (English)
                  </label>
                  <textarea
                    rows={4}
                    value={form.descriptionEn}
                    onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                    placeholder="Comprehensive description of the event, speeches, anthems, ceremonies, and proceedings..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                    تفصیل و رپورٹ (اردو)
                  </label>
                  <textarea
                    rows={4}
                    dir="rtl"
                    value={form.descriptionUr}
                    onChange={(e) => setForm({ ...form, descriptionUr: e.target.value })}
                    placeholder="تقریب کے اہم خطابات، ملی نغمے، پرچم کشائی، مہمانوں کی شرکت اور دعاؤں کی تفصیل..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
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
                      <span>Saving Event...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Publish Event</span>
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
