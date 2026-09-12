import React from 'react';
import { useApp } from '../../context/AppContext';
import { UtensilsCrossed, CheckCircle2, HeartHandshake, Sparkles, Clock, Calendar, ShieldCheck } from 'lucide-react';

export const FoodProgramView: React.FC = () => {
  const { data, language, openDonateModal } = useApp();
  const food = data?.foodProgram;

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-2">
            Matbakh-e-Ghousia • 100% Free Food Program
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'مطبخِ غوثیہ — روزانہ مفت طعام پروگرام' : 'Matbakh: Daily Nutritious Food for Students'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur'
              ? 'دارالعلوم کے مطبخ میں روزانہ سینکڑوں طلباء، اساتذہ اور مہمانوں کے لیے دو وقت کا معیاری کھانا تیار کیا جاتا ہے۔ آپ بھی ایک دن یا ماہانہ راشن کی کفالت فرما سکتے ہیں۔'
              : 'Serving over 600 freshly cooked, hygienic, and wholesome meals every single day to residential students and traveling scholars in Sargodha.'}
          </p>
        </div>

        {/* 3 Metric Cards in Editorial Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-8 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Daily Output</span>
            <div className="text-4xl font-serif font-bold text-[#065F46]">{food?.mealsServedPerDay || 600}+</div>
            <p className="text-xs text-[#4B5563]">Wholesome meals served every day across breakfast, lunch, and dinner.</p>
          </div>

          <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#D97706] p-8 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Monthly Cost / Student</span>
            <div className="text-4xl font-serif font-bold text-[#D97706]">PKR {food?.costPerStudentMonthlyPkr?.toLocaleString() || '6,000'}</div>
            <p className="text-xs text-[#4B5563]">Covers complete food intake including wheat, lentils, ghee, meat, and seasonal vegetables.</p>
          </div>

          <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#111827] p-8 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Cost to Deserving Students</span>
            <div className="text-4xl font-serif font-bold text-[#111827]">100% Free</div>
            <p className="text-xs text-[#4B5563]">No student is ever asked to pay a single rupee for their daily sustenance.</p>
          </div>
        </div>

        {/* Weekly Menu Table in Editorial Style */}
        <div className="bg-white border border-[#E5E1D8] p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#065F46]"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46]">Hygienic Standards</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#111827]">
            {language === 'ur' ? 'ہفتہ وار معیاری مینو' : 'Standard Weekly Nutrition Schedule'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {[
              { day: 'Mon & Thu', meal: 'Chicken Biryani & Fresh Yogurt / Lentils' },
              { day: 'Tue & Fri', meal: 'Daal Chana with Desi Tarka & Roti' },
              { day: 'Wed & Sat', meal: 'Beef Qorma / Seasonal Vegetables & Roti' },
              { day: 'Sunday', meal: 'Special Haleem / Sweet Rice (Zarda) & Tea' },
            ].map((m, idx) => (
              <div key={idx} className="bg-[#F8F9F5] border border-[#E5E1D8] p-5 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#D97706]">{m.day}</div>
                <div className="text-xs font-bold text-[#111827]">{m.meal}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Options */}
        <div className="bg-[#111827] text-white p-8 sm:p-12 space-y-8">
          <div>
            <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-1">
              Earn Continuous Thawab
            </span>
            <h3 className="text-3xl font-serif font-bold text-white">
              {language === 'ur' ? 'طعام کے لیے کفالت کے مواقع' : 'Sponsorship Packages for Matbakh'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#1F2937] border border-gray-700 p-6 space-y-3">
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest">Package A</span>
              <h4 className="text-lg font-serif font-bold text-white">Sponsor 1 Student Food</h4>
              <div className="text-2xl font-serif font-bold text-[#D97706]">PKR 6,000 / mo</div>
              <p className="text-xs text-gray-400">Covers all daily meals and tea for one student for 30 days.</p>
              <button
                onClick={() => openDonateModal('cat-food')}
                className="w-full bg-[#065F46] hover:bg-[#044E39] text-white py-2 text-xs font-bold uppercase tracking-widest transition-colors mt-2"
              >
                Sponsor Monthly
              </button>
            </div>

            <div className="bg-[#1F2937] border border-gray-700 p-6 space-y-3">
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest">Package B</span>
              <h4 className="text-lg font-serif font-bold text-white">Complete Deg (Langar)</h4>
              <div className="text-2xl font-serif font-bold text-[#D97706]">PKR 14,000</div>
              <p className="text-xs text-gray-400">Feeds 80+ students with traditional chicken pulao / daal on special days.</p>
              <button
                onClick={() => openDonateModal('cat-food')}
                className="w-full bg-[#065F46] hover:bg-[#044E39] text-white py-2 text-xs font-bold uppercase tracking-widest transition-colors mt-2"
              >
                Sponsor Deg
              </button>
            </div>

            <div className="bg-[#1F2937] border border-gray-700 p-6 space-y-3">
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest">Package C</span>
              <h4 className="text-lg font-serif font-bold text-white">Kitchen Flour & Ghee Fund</h4>
              <div className="text-2xl font-serif font-bold text-[#D97706]">PKR 45,000</div>
              <p className="text-xs text-gray-400">Supplies large-scale bulk wheat flour and cooking oil for the general pantry.</p>
              <button
                onClick={() => openDonateModal('cat-food')}
                className="w-full bg-[#065F46] hover:bg-[#044E39] text-white py-2 text-xs font-bold uppercase tracking-widest transition-colors mt-2"
              >
                Donate to Pantry
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
