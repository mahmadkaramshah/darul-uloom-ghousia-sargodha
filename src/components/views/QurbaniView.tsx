import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake, 
  FileCheck, 
  Phone, 
  Sparkles, 
  Check, 
  Calendar,
  Users,
  Award
} from 'lucide-react';
import { QurbaniAnimalItem } from '../../types';

export const QurbaniView: React.FC = () => {
  const { data, language, openDonateModal } = useApp();
  const qurbani = data?.qurbaniCampaign;
  const pageBg = data?.settings?.pageBackgrounds?.qurbani || qurbani?.headerBackgroundImage || 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1920&q=80';

  const defaultAnimals: QurbaniAnimalItem[] = [
    {
      id: 'cow-share-1',
      nameEn: 'One Cow Share (Hissa)',
      nameUr: 'ایک گائے کا حصہ',
      animalType: 'Cow Share',
      costPkr: qurbani?.cowShareCostPkr || 24000,
      descriptionEn: 'Includes sacrificial cow share, hygienic slaughtering, packaging, and doorstep distribution to orphans and deserving families.',
      descriptionUr: 'گائے کا مکمل حصہ بشمول قربانی، شرعی ذبیحہ، صاف پیکنگ اور مستحقین میں تقسیم۔',
      isPopular: true,
      imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'goat-1',
      nameEn: 'Full Goat / Sheep',
      nameUr: 'مکمل بکرا / چھترا',
      animalType: 'Full Goat',
      costPkr: qurbani?.goatCostPkr || 42000,
      descriptionEn: 'One complete healthy goat or ram, slaughtered according to Sunnah guidelines with your designated name and intention.',
      descriptionUr: 'ایک مکمل صحت مند بکرا، سنتِ ابراہیمی کے مطابق آپ کے نام سے ذبح کیا جائے گا۔',
      isPopular: false,
      imageUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'full-cow-1',
      nameEn: 'Complete Cow (7 Shares)',
      nameUr: 'مکمل گائے (7 حصے)',
      animalType: 'Full Cow',
      costPkr: qurbani?.fullCowCostPkr || 168000,
      descriptionEn: 'Complete healthy cow dedicated to family, deceased parents/relatives, or residential student Langar-e-Ghousia distribution.',
      descriptionUr: 'مکمل صحتمند گائے، خاندان یا ایصالِ ثواب یا طلبہ و مستحقین کے لیے۔',
      isPopular: false,
      imageUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const animals: QurbaniAnimalItem[] = (qurbani?.animals && qurbani.animals.length > 0)
    ? qurbani.animals
    : defaultAnimals;

  const features = (qurbani?.features && qurbani.features.length > 0)
    ? qurbani.features
    : [
        {
          id: 'feat-1',
          titleEn: 'Healthy Livestock Inspection',
          titleUr: 'صحت مند جانوروں کی جانچ',
          descriptionEn: 'Pre-inspected disease-free animals exceeding Shariah age and health requirements.',
          descriptionUr: 'ہر قسم کے عیب اور بیماری سے پاک شرعی عمر کے جانور۔',
        },
        {
          id: 'feat-2',
          titleEn: 'Strict Sunnah Slaughter',
          titleUr: 'مستند شرعی ذبیحہ',
          descriptionEn: 'Expert butchers working under the active supervision of senior Darul Uloom Muftis.',
          descriptionUr: 'مفتیانِ کرام کی زیرِ نگرانی سنتِ ابراہیمی کے عین مطابق ذبح۔',
        },
        {
          id: 'feat-3',
          titleEn: '100% Deserving Beneficiaries',
          titleUr: 'مستحق اور نادار خاندان',
          descriptionEn: 'Pre-verified lists of poor widows, orphan guardians, and underprivileged families.',
          descriptionUr: 'یتیم، بیوہ اور انتہائی مستحق گھرانوں تک گوشت کی باوقار ترسیل۔',
        },
        {
          id: 'feat-4',
          titleEn: 'Transparent Confirmation',
          titleUr: 'شفاف تصدیق و رابطہ',
          descriptionEn: 'Instant confirmation on sacrificial execution and distribution details.',
          descriptionUr: 'قربانی کی ادائیگی اور تقسیم کی مکمل رپورٹ فراہم کی جاتی ہے۔',
        },
      ];

  const title = language === 'ur'
    ? (qurbani?.titleUr || 'سالانہ خدمتِ قربانی پروجیکٹ')
    : (qurbani?.titleEn || 'Annual Qurbani & Eid-ul-Adha Project');

  const description = language === 'ur'
    ? (qurbani?.descriptionUr || 'دارالعلوم محمدیہ غوثیہ گزشتہ 25 برسوں سے دیانت داری کے ساتھ قربانی کی خدمت سرانجام دے رہا ہے۔ صحت مند جانوروں کا انتخاب، شرعی ذبیحہ اور مستحقین میں صاف گوشت کی تقسیم کی مکمل نگرانی کی جاتی ہے۔')
    : (qurbani?.descriptionEn || 'Facilitating seamless, Shariah-monitored Eid Qurbani for over 25 years. Healthy sacrificial livestock, ethical slaughter, and doorstep distribution to 2,000+ deserving families across Sargodha.');

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] pb-16">
      
      {/* Dynamic Background Banner */}
      <div className="relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center bg-slate-950 overflow-hidden border-b-4 border-[#065F46]">
        <img
          src={pageBg}
          alt="Qurbani Background"
          className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 sm:py-20 text-center space-y-4 text-white">
          <div className="inline-flex items-center gap-2 bg-[#D97706]/90 text-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em] shadow-md">
            <Flame className="w-3.5 h-3.5" />
            <span>25+ Years of Dedicated Service • Shariah Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-md">
            {title}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-emerald-50 max-w-3xl mx-auto leading-relaxed drop-shadow-sm font-light">
            {description}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="bg-black/60 backdrop-blur-xs px-4 py-2 border border-white/20 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              <span>Fatwa & Shariah Supervised</span>
            </div>
            <div className="bg-black/60 backdrop-blur-xs px-4 py-2 border border-white/20 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#D97706]" />
              <span>2,500+ Beneficiary Families</span>
            </div>
            <div className="bg-black/60 backdrop-blur-xs px-4 py-2 border border-white/20 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D97706]" />
              <span>Hygienic Cold Packaging</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 mt-12 sm:mt-16">

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E1D8] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-6 h-[2px] bg-[#065F46]"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46]">
                Sacrificial Animal Packages
              </span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#111827]">
              {language === 'ur' ? 'قربانی کے پیکجز اور حصص' : 'Select Your Sacrificial Booking'}
            </h2>
          </div>
          <p className="text-xs text-[#6B7280] max-w-md">
            All prices include the purchase of healthy livestock, Shariah-compliant slaughter, cutting, and doorstep distribution to deserving families.
          </p>
        </div>

        {/* Animal Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animals.map((item) => (
            <div
              key={item.id}
              className={`bg-white border flex flex-col justify-between transition-all duration-200 overflow-hidden ${
                item.isPopular
                  ? 'border-[#065F46] border-t-4 shadow-md ring-1 ring-[#065F46]/20'
                  : 'border-[#E5E1D8] hover:border-[#065F46]'
              }`}
            >
              {/* Optional Animal Image */}
              {item.imageUrl && (
                <div className="h-48 bg-slate-900 relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.nameEn}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {item.isPopular && (
                    <span className="absolute top-3 right-3 bg-[#065F46] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-md">
                      Most Popular
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-white/20">
                    {item.animalType}
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {!item.imageUrl && item.isPopular && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#065F46] block">
                      Most Popular Choice
                    </span>
                  )}
                  <h3 className="text-2xl font-serif font-bold text-[#111827]">
                    {language === 'ur' ? item.nameUr : item.nameEn}
                  </h3>
                  {language === 'ur' && item.nameEn && (
                    <div className="text-xs text-gray-400 font-sans">{item.nameEn}</div>
                  )}
                  {language === 'en' && item.nameUr && (
                    <div className="text-xs text-gray-500 font-serif" dir="rtl">{item.nameUr}</div>
                  )}

                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block">
                      All-Inclusive Contribution
                    </span>
                    <div className="text-3xl font-serif font-bold text-[#065F46] mt-0.5">
                      PKR {item.costPkr.toLocaleString()}
                    </div>
                  </div>

                  <p className="text-xs text-[#4B5563] leading-relaxed pt-2">
                    {language === 'ur' ? item.descriptionUr : item.descriptionEn}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E5E1D8] space-y-3">
                  <button
                    onClick={() => openDonateModal('cat-qurbani')}
                    className="w-full bg-[#111827] hover:bg-[#065F46] text-white py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>{language === 'ur' ? 'قربانی حصہ بک کروائیں' : 'Book Sacrificial Share'}</span>
                  </button>
                  <div className="text-[10px] text-center text-gray-400">
                    Direct bank transfer or JazzCash receipt confirmation provided.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 25 Years Heritage & Guarantees */}
        <div className="bg-white border border-[#E5E1D8] p-8 sm:p-12 space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#065F46]"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46]">
              Our 25-Year Tradition & Standards
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
            {language === 'ur' ? '25 سالہ قابلِ اعتماد خدمت اور شرعی اصول' : 'Why Thousands Entrust Their Sacrifices to Darul Uloom'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <div key={feat.id || idx} className="bg-[#F8F9F5] border border-[#E5E1D8] p-6 space-y-3">
                <div className="text-base font-serif font-bold text-[#065F46]">0{idx + 1}.</div>
                <h4 className="font-serif font-bold text-sm text-[#111827]">
                  {language === 'ur' ? feat.titleUr : feat.titleEn}
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {language === 'ur' ? feat.descriptionUr : feat.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
