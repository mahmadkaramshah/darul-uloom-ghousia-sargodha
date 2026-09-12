import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Image as ImageIcon, X, ZoomIn, Tag } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const { data, language } = useApp();
  const gallery = data?.gallery || [];
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<any | null>(null);

  const filteredGallery = gallery.filter(
    (item) => selectedTag === 'all' || (item.category || '').toLowerCase() === selectedTag.toLowerCase()
  );

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-2">
            Visual Chronicle & Moments
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'تصویری گیلری و سرگرمیاں' : 'Photo Gallery & Activities'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur'
              ? 'دارالعلوم کی روزمرہ تعلیمی سرگرمیاں، حفظ و دستار بندی کی تقریبات، مطبخ میں کھانا پکانے اور تقسیم کے مناظر، اور مساجد کے تعمیراتی کام کی تصاویر۔'
              : 'Glimpses of daily classroom recitations, student convocations (Dastar-e-Fazilat), Matbakh food prep, Qurbani drives, and mosque foundations.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'campus', 'events', 'welfare', 'mosques', 'food'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
                selectedTag === tag
                  ? 'bg-[#111827] text-white border-[#111827]'
                  : 'bg-white text-[#4B5563] border-[#E5E1D8] hover:border-[#065F46]'
              }`}
            >
              {tag === 'all' ? 'All Images' : (tag || '').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="bg-white border border-[#E5E1D8] p-3 group cursor-pointer hover:border-[#065F46] transition-all flex flex-col justify-between space-y-3"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>

              <div className="p-2 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-[#D97706] font-bold uppercase tracking-widest">
                  <span>{item.category}</span>
                  <span className="text-gray-400 font-mono">{item.date}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#111827]">
                  {language === 'ur' ? item.titleUr : item.titleEn}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-[#E5E1D8] max-w-4xl w-full p-4 sm:p-6 relative space-y-4">
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 bg-[#111827] text-white p-2 hover:bg-black transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.titleEn}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#D97706]">
                  {activePhoto.category} • {activePhoto.date}
                </div>
                <h3 className="font-serif font-bold text-xl text-[#111827]">
                  {language === 'ur' ? activePhoto.titleUr : activePhoto.titleEn}
                </h3>
                <p className="text-xs text-[#4B5563]">
                  {language === 'ur' ? activePhoto.descriptionUr : activePhoto.descriptionEn}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
