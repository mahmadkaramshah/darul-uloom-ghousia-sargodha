import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  UserCheck, 
  Sparkles, 
  Flag, 
  ChevronRight, 
  Eye, 
  X, 
  Share2, 
  CheckCircle2, 
  Image as ImageIcon,
  Tag
} from 'lucide-react';

export const EventsView: React.FC = () => {
  const { data, language, openDonateModal, setCurrentPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const events: EventItem[] = data?.events || [];

  const categories = [
    { id: 'all', labelEn: 'All Events', labelUr: 'تمام تقریبات' },
    { id: '14 August & National', labelEn: '14 August & National', labelUr: 'جشنِ آزادی 14 اگست' },
    { id: 'Milad & Mahafil', labelEn: 'Milad & Mahafil', labelUr: 'محافلِ میلاد و نعت' },
    { id: 'Urs Mubarak', labelEn: 'Urs Mubarak', labelUr: 'عرس مبارک و تقاریب' },
    { id: 'Khatm-e-Bukhari & Convocation', labelEn: 'Khatm-e-Bukhari & Sanad', labelUr: 'ختمِ بخاری و دستار بندی' },
    { id: 'Conferences', labelEn: 'Islamic Conferences', labelUr: 'اسلامی سیمینارز و کانفرنسز' }
  ];

  const filteredEvents = events.filter((evt) => {
    if (selectedCategory === 'all') return true;
    return evt.category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
           (selectedCategory === '14 August & National' && (evt.titleEn.includes('14th August') || evt.category.includes('14 August')));
  });

  const openModal = (event: EventItem) => {
    setSelectedEvent(event);
    setActiveImageIndex(0);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setActiveImageIndex(0);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Page Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#065F46]/10 text-[#065F46] text-xs font-bold uppercase tracking-widest border border-[#065F46]/20">
            <Calendar className="w-3.5 h-3.5 text-[#065F46]" />
            <span>{language === 'ur' ? 'تقریبات، محافل و قومی ایام' : 'Events, Mahafil & National Celebrations'}</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight leading-tight">
            {language === 'ur' ? (
              <span className="font-urdu leading-normal">دارالعلوم کی سالانہ تقریبات، جشنِ آزادی و محافل</span>
            ) : (
              'Grand Mahafil, 14th August Celebrations & Conferences'
            )}
          </h1>
          
          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-2xl mx-auto">
            {language === 'ur' ? (
              <span className="font-urdu">
                دارالعلوم محمدیہ غوثیہ میں منعقد ہونے والی سالانہ محافلِ میلاد النبی ﷺ، 14 اگست جشنِ آزادی، دستارِ فضیلت، ختمِ بخاری شریف اور تربیتی کانفرنسز کی تصاویر اور مکمل تفصیلات۔
              </span>
            ) : (
              'Explore pictorial coverage, schedule, location, and guest scholar records of religious conferences, 14th August patriotic festivities, Urs celebrations, and graduation convocations in Sargodha.'
            )}
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2 border-b border-[#E5E1D8] pb-6">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold tracking-wider transition-all uppercase whitespace-nowrap ${
                  language === 'ur' ? 'font-urdu text-sm' : ''
                } ${
                  isSelected
                    ? 'bg-[#065F46] text-white shadow-xs'
                    : 'bg-white text-[#4B5563] hover:bg-[#F3F0EA] border border-[#E5E1D8]'
                }`}
              >
                {language === 'ur' ? cat.labelUr : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white border border-[#E5E1D8] p-12 text-center max-w-xl mx-auto space-y-3">
            <Calendar className="w-10 h-10 text-[#9CA3AF] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#111827]">
              {language === 'ur' ? 'اس کیٹیگری میں کوئی تقریب موجود نہیں' : 'No Events Found in This Category'}
            </h3>
            <p className="text-xs text-[#6B7280]">
              {language === 'ur' ? 'براہ کرم دوسری کیٹیگری منتخب کریں یا بعد میں وزٹ کریں۔' : 'Please select another category or check back soon.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((evt) => {
              const displayTitle = language === 'ur' ? (evt.titleUr || evt.titleEn) : evt.titleEn;
              const displayDesc = language === 'ur' ? (evt.descriptionUr || evt.descriptionEn) : evt.descriptionEn;
              const displayLocation = language === 'ur' ? (evt.locationUr || evt.locationEn) : evt.locationEn;
              const displayGuest = language === 'ur' ? (evt.chiefGuestUr || evt.chiefGuestEn) : evt.chiefGuestEn;
              const is14August = evt.category.includes('14 August') || evt.titleEn.includes('14th August') || evt.titleUr?.includes('14 اگست');

              return (
                <div
                  key={evt.id}
                  className="bg-white border border-[#E5E1D8] flex flex-col hover:border-[#065F46] transition-all shadow-xs group"
                >
                  {/* Event Featured Image & Badges */}
                  <div className="relative aspect-16/10 bg-[#111827] overflow-hidden">
                    <img
                      src={evt.featuredImage || evt.images?.[0] || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80'}
                      alt={displayTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                    
                    {/* Category & Status Pill */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs ${
                        is14August ? 'bg-emerald-700' : 'bg-[#065F46]'
                      }`}>
                        {evt.category}
                      </span>
                      {evt.status === 'upcoming' && (
                        <span className="bg-amber-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                          {language === 'ur' ? 'آئندہ تقریب' : 'Upcoming'}
                        </span>
                      )}
                    </div>

                    {/* Image Counter Badge */}
                    {evt.images && evt.images.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 text-[10px] font-bold flex items-center gap-1 border border-white/20">
                        <ImageIcon className="w-3 h-3" />
                        <span>{evt.images.length} {language === 'ur' ? 'تصاویر' : 'Photos'}</span>
                      </div>
                    )}

                    {/* Date Badge */}
                    <div className="absolute bottom-3 left-3 bg-white text-[#111827] px-2.5 py-1 text-xs font-mono font-bold shadow-xs">
                      {evt.date}
                    </div>
                  </div>

                  {/* Event Information Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className={`font-serif text-lg font-bold text-[#111827] leading-snug group-hover:text-[#065F46] transition-colors ${
                        language === 'ur' ? 'font-urdu text-xl' : ''
                      }`}>
                        {displayTitle}
                      </h3>

                      <p className={`text-xs text-[#4B5563] line-clamp-3 leading-relaxed ${
                        language === 'ur' ? 'font-urdu text-sm' : ''
                      }`}>
                        {displayDesc}
                      </p>

                      {/* Location & Time Indicators */}
                      <div className="pt-2 border-t border-[#F0ECE1] space-y-2 text-xs text-[#4B5563]">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#065F46] shrink-0 mt-0.5" />
                          <span className={language === 'ur' ? 'font-urdu text-xs' : ''}>{displayLocation}</span>
                        </div>

                        {evt.time && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#065F46] shrink-0" />
                            <span>{evt.time}</span>
                          </div>
                        )}

                        {displayGuest && (
                          <div className="flex items-start gap-2 text-[#111827] font-medium">
                            <UserCheck className="w-3.5 h-3.5 text-[#065F46] shrink-0 mt-0.5" />
                            <span className={language === 'ur' ? 'font-urdu text-xs' : ''}>
                              <strong>{language === 'ur' ? 'مہمانِ خصوصی: ' : 'Chief Guest: '}</strong>
                              {displayGuest}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* View Details Action Button */}
                    <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
                      <button
                        onClick={() => openModal(evt)}
                        className="text-xs font-bold text-[#065F46] hover:text-[#044E39] flex items-center gap-1 uppercase tracking-wider py-1"
                      >
                        <span>{language === 'ur' ? 'تفصیل و تصاویر دیکھیں' : 'View Pictures & Details'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {is14August && (
                        <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                          <Flag className="w-3 h-3 text-emerald-700" />
                          <span>14 August</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Sponsorship & Matbakh Banner inside Events View */}
        <div className="bg-[#065F46] text-white p-8 sm:p-10 border border-[#044E39] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">
              {language === 'ur' ? (
                <span className="font-urdu">سالانہ تقریبات و لنگرِ غوثیہ میں شمولیت اور تعاون</span>
              ) : (
                'Sponsor Event Langar & Support Student Convocations'
              )}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
              {language === 'ur' ? (
                <span className="font-urdu">
                  عرسِ مبارک، محفلِ میلاد اور 14 اگست کے پرمسرت مواقع پر طلباء اور شرکاء کے طعام و لنگر کے لیے خصوصی عطیات پیش کریں۔
                </span>
              ) : (
                'Earn perpetual reward (Sadaqah Jariyah) by contributing towards event meals, graduation prizes for orphan Huffaz, and facility arrangements.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openDonateModal('cat-langar')}
              className="bg-white text-[#065F46] px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#F3F0EA] transition-colors shadow-xs"
            >
              {language === 'ur' ? 'لنگرِ غوثیہ سپانسر کریں' : 'Sponsor Event Langar'}
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="border border-white/50 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              {language === 'ur' ? 'رابطہ کریں' : 'Contact Office'}
            </button>
          </div>
        </div>

      </div>

      {/* Event Details & Pictorial Slideshow Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-[#E5E1D8] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#065F46] text-white px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-emerald-300" />
                <span className="font-serif font-bold text-sm sm:text-base">
                  {selectedEvent.category} • {selectedEvent.date}
                </span>
              </div>
              <button
                onClick={closeModal}
                className="text-white/80 hover:text-white p-1 rounded-sm hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Main Image & Gallery Carousel */}
              {selectedEvent.images && selectedEvent.images.length > 0 && (
                <div className="space-y-3">
                  <div className="aspect-16/9 bg-black overflow-hidden relative border border-[#E5E1D8]">
                    <img
                      src={selectedEvent.images[activeImageIndex] || selectedEvent.featuredImage}
                      alt={selectedEvent.titleEn}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2.5 py-1 font-mono">
                      {activeImageIndex + 1} / {selectedEvent.images.length}
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  {selectedEvent.images.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {selectedEvent.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-20 h-14 shrink-0 border-2 overflow-hidden transition-all ${
                            activeImageIndex === idx ? 'border-[#065F46] scale-105' : 'border-[#E5E1D8] opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Event Title */}
              <div className="space-y-2 border-b border-[#E5E1D8] pb-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827]">
                  {selectedEvent.titleEn}
                </h2>
                {selectedEvent.titleUr && (
                  <h3 className="font-urdu text-xl font-bold text-[#065F46] text-right" dir="rtl">
                    {selectedEvent.titleUr}
                  </h3>
                )}
              </div>

              {/* Event Key Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-[#F8F9F5] p-4 border border-[#E5E1D8] text-xs">
                <div className="space-y-1">
                  <span className="text-[#6B7280] font-bold uppercase">{language === 'ur' ? 'تاریخ و وقت' : 'Date & Time'}</span>
                  <p className="font-semibold text-[#111827]">{selectedEvent.date} {selectedEvent.time ? `• ${selectedEvent.time}` : ''}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[#6B7280] font-bold uppercase">{language === 'ur' ? 'مقام / وینٹیو' : 'Location / Venue'}</span>
                  <p className="font-semibold text-[#111827]">{selectedEvent.locationEn}</p>
                  {selectedEvent.locationUr && <p className="font-urdu text-xs text-[#4B5563]">{selectedEvent.locationUr}</p>}
                </div>
                <div className="space-y-1">
                  <span className="text-[#6B7280] font-bold uppercase">{language === 'ur' ? 'مہمانِ خصوصی' : 'Chief Guest / Speaker'}</span>
                  <p className="font-semibold text-[#065F46]">{selectedEvent.chiefGuestEn || 'Senior Scholars of Jamia'}</p>
                  {selectedEvent.chiefGuestUr && <p className="font-urdu text-xs text-[#065F46]">{selectedEvent.chiefGuestUr}</p>}
                </div>
              </div>

              {/* Full Description in English & Urdu */}
              <div className="space-y-4 text-sm text-[#374151] leading-relaxed">
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-base text-[#111827]">
                    Event Details & Significance
                  </h4>
                  <p className="leading-relaxed whitespace-pre-line">{selectedEvent.descriptionEn}</p>
                </div>

                {selectedEvent.descriptionUr && (
                  <div className="space-y-2 bg-[#F3F0EA] p-4 border-r-4 border-[#065F46] text-right" dir="rtl">
                    <h4 className="font-urdu font-bold text-lg text-[#065F46]">
                      تقریب کے احوال و تفصیلات
                    </h4>
                    <p className="font-urdu text-base leading-relaxed text-[#1F2937] whitespace-pre-line">
                      {selectedEvent.descriptionUr}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer actions inside modal */}
              <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-between">
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 border border-[#E5E1D8] text-[#4B5563] text-xs font-bold uppercase tracking-wider hover:bg-[#F8F9F5]"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    closeModal();
                    openDonateModal('cat-events');
                  }}
                  className="bg-[#065F46] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] transition-colors"
                >
                  {language === 'ur' ? 'عطیہ دیں' : 'Contribute / Donate'}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
