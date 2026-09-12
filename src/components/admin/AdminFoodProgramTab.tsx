import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodProgramDetails, WeeklyScheduleDay, SponsorshipPackage } from '../../types';
import { 
  UtensilsCrossed, 
  Save, 
  Plus, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  RefreshCw, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Coffee, 
  Sun, 
  Moon, 
  ShieldCheck, 
  HeartHandshake 
} from 'lucide-react';

export const AdminFoodProgramTab: React.FC = () => {
  const { data, adminToken, showToast, refreshData } = useApp();

  const initialFood = data?.foodProgram || {
    titleEn: 'Matbakh-e-Ghousia • 100% Free Food & Nutrition Program',
    titleUr: 'مطبخِ غوثیہ • طلباء کے لیے روزانہ مفت و معیاری طعام',
    descriptionEn: 'Serving over 1,150 fresh, hygienic, and nutritious meals daily to 380+ residential Quran and Islamic scholars with zero financial charges.',
    descriptionUr: 'دارالعلوم کے 380 سے زائد رہائشی طلباء و اساتذہ کو روزانہ تینوں وقت کا تازہ، لذیذ اور غذائیت سے بھرپور کھانا اور دودھ بلامعاوضہ فراہم کیا جاتا ہے۔',
    dailyMealsCount: 1150,
    beneficiariesCount: 380,
    monthlyCostPerStudent: 6500,
    monthlyBudgetPKR: 2470000,
    dailyRotiCount: 1800,
    dailyRiceKg: 120,
    hygieneStandardsEn: ['Hygienic stainless steel kitchen', 'RO filtered clean water for cooking', 'Daily fresh mutton, beef, chicken, lentils and vegetables', 'Strict temperature and food safety protocols'],
    hygieneStandardsUr: ['سٹین لیس سٹیل کے صاف ستھرے برتن', 'کھانا پکانے کے لیے آر او فلٹر شدہ صاف پانی', 'روزانہ تازہ گوشت، سبزیاں، دالیں اور خالص دودھ', 'حفظانِ صحت کے اعلیٰ اصولوں کی سختی سے پابندی'],
    weeklySchedule: [],
    sponsorshipPackages: [],
    monthlyInventoryRequired: []
  };

  const [foodState, setFoodState] = useState<FoodProgramDetails>(initialFood);
  const [activeTab, setActiveTab] = useState<'stats' | 'schedule' | 'packages' | 'hygiene'>('stats');
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (data?.foodProgram) {
      setFoodState(data.foodProgram);
    }
  }, [data?.foodProgram]);

  const handleStatChange = (field: keyof FoodProgramDetails, value: any) => {
    setFoodState((prev) => ({ ...prev, [field]: value }));
  };

  // Weekly Schedule Helpers
  const handleScheduleChange = (index: number, field: keyof WeeklyScheduleDay, value: string) => {
    const updated = [...(foodState.weeklySchedule || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFoodState((prev) => ({ ...prev, weeklySchedule: updated }));
  };

  // Sponsorship Package Helpers
  const handlePackageChange = (index: number, field: keyof SponsorshipPackage, value: any) => {
    const updated = [...(foodState.sponsorshipPackages || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFoodState((prev) => ({ ...prev, sponsorshipPackages: updated }));
  };

  const handleAddPackage = () => {
    const newPkg: SponsorshipPackage = {
      id: 'pkg-' + Date.now(),
      amountPKR: 15000,
      nameEn: '1 Special Event Deg / Meal',
      nameUr: '1 دیگ لنگرِ غوثیہ',
      descriptionEn: 'Provides rich biryani or korma feast for all students.',
      descriptionUr: 'تمام طلباء و مسافرین کے لیے لذیذ بریانی یا قورمہ کی خصوصی دیگ۔',
      tag: 'Popular'
    };
    setFoodState((prev) => ({
      ...prev,
      sponsorshipPackages: [...(prev.sponsorshipPackages || []), newPkg],
    }));
  };

  const handleRemovePackage = (index: number) => {
    const updated = (foodState.sponsorshipPackages || []).filter((_, i) => i !== index);
    setFoodState((prev) => ({ ...prev, sponsorshipPackages: updated }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/food-program', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(foodState),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast('Matbakh-e-Ghousia details updated successfully!', 'success');
        await refreshData();
      } else {
        showToast(resData.error || 'Failed to update food program.', 'error');
      }
    } catch (err) {
      showToast('Network error during save.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Bar */}
      <div className="bg-white p-6 border border-[#E5E1D8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#065F46]/10 border border-[#065F46]/20 flex items-center justify-center text-[#065F46]">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#111827]">
              Matbakh-e-Ghousia • 100% Free Food Program Management
            </h2>
            <p className="text-xs text-[#4B5563]">
              Update daily meal outputs, monthly budgets, weekly 7-day nutrition schedules, and donor sponsorship packages.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#065F46] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] disabled:opacity-50 transition-colors flex items-center gap-2 shadow-xs shrink-0"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Saving Matbakh...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save Matbakh Data</span>
            </>
          )}
        </button>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-[#E5E1D8] pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'stats'
              ? 'border-[#065F46] text-[#065F46] bg-white'
              : 'border-transparent text-[#6B7280] hover:text-[#111827]'
          }`}
        >
          Daily & Monthly Output Stats
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'schedule'
              ? 'border-[#065F46] text-[#065F46] bg-white'
              : 'border-transparent text-[#6B7280] hover:text-[#111827]'
          }`}
        >
          7-Day Weekly Nutrition Schedule
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'packages'
              ? 'border-[#065F46] text-[#065F46] bg-white'
              : 'border-transparent text-[#6B7280] hover:text-[#111827]'
          }`}
        >
          Langar Sponsorship Packages
        </button>
        <button
          onClick={() => setActiveTab('hygiene')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'hygiene'
              ? 'border-[#065F46] text-[#065F46] bg-white'
              : 'border-transparent text-[#6B7280] hover:text-[#111827]'
          }`}
        >
          Descriptions & Hygiene Standards
        </button>
      </div>

      {/* TAB 1: Stats & Output */}
      {activeTab === 'stats' && (
        <div className="bg-white p-6 sm:p-8 border border-[#E5E1D8] shadow-xs space-y-6">
          <h3 className="font-serif text-base font-bold text-[#111827] border-b border-[#F0ECE1] pb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#065F46]" />
            <span>Operational Figures & Daily Consumption</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* Daily Meals Count */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-[#111827]">
                Daily Meals Served Count <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                value={foodState.dailyMealsCount || 1150}
                onChange={(e) => handleStatChange('dailyMealsCount', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-mono font-bold focus:border-[#065F46] focus:outline-hidden"
              />
              <p className="text-[11px] text-[#6B7280]">Total meals prepared per day (380 students × 3 meals + guests)</p>
            </div>

            {/* Daily Beneficiaries Count */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-[#111827]">
                Residential Students & Beneficiaries <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                value={foodState.beneficiariesCount || 380}
                onChange={(e) => handleStatChange('beneficiariesCount', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-mono font-bold focus:border-[#065F46] focus:outline-hidden"
              />
              <p className="text-[11px] text-[#6B7280]">Registered boarding students receiving 100% free food</p>
            </div>

            {/* Monthly Cost Per Student (PKR) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-[#111827]">
                Monthly Cost per Student (PKR) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                value={foodState.monthlyCostPerStudent || 6500}
                onChange={(e) => handleStatChange('monthlyCostPerStudent', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-mono font-bold focus:border-[#065F46] focus:outline-hidden"
              />
              <p className="text-[11px] text-[#6B7280]">Calculated cost for 3 daily meals, tea, milk & fruits</p>
            </div>

            {/* Monthly Total Budget (PKR) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-[#111827]">
                Total Monthly Matbakh Budget (PKR)
              </label>
              <input
                type="number"
                value={foodState.monthlyBudgetPKR || 2470000}
                onChange={(e) => handleStatChange('monthlyBudgetPKR', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-mono font-bold focus:border-[#065F46] focus:outline-hidden"
              />
              <p className="text-[11px] text-[#6B7280]">Total operational budget per month for the kitchen</p>
            </div>

            {/* Daily Fresh Roti Count */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-[#111827]">
                Daily Fresh Tandoor Roti Count
              </label>
              <input
                type="number"
                value={foodState.dailyRotiCount || 1800}
                onChange={(e) => handleStatChange('dailyRotiCount', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-mono font-bold focus:border-[#065F46] focus:outline-hidden"
              />
              <p className="text-[11px] text-[#6B7280]">Fresh tandoori rotis baked daily on campus</p>
            </div>

            {/* Daily Rice (KG) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-[#111827]">
                Daily Rice Consumption (KG)
              </label>
              <input
                type="number"
                value={foodState.dailyRiceKg || 120}
                onChange={(e) => handleStatChange('dailyRiceKg', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-mono font-bold focus:border-[#065F46] focus:outline-hidden"
              />
              <p className="text-[11px] text-[#6B7280]">Basmati rice cooked daily for students and langar</p>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: Weekly Schedule */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-white p-6 border border-[#E5E1D8] shadow-xs">
            <h3 className="font-serif text-base font-bold text-[#111827] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#065F46]" />
              <span>7-Day Weekly Balanced Nutrition Schedule</span>
            </h3>
            <p className="text-xs text-[#4B5563] mt-1">
              Customize the meal menu served on each day of the week to ensure transparent dietary reporting for donors and guardians.
            </p>
          </div>

          <div className="space-y-4">
            {(foodState.weeklySchedule && foodState.weeklySchedule.length > 0
              ? foodState.weeklySchedule
              : [
                  { dayEn: 'Monday', dayUr: 'پیر', breakfastEn: 'Fresh Tea, Paratha & Boiled Eggs', breakfastUr: 'تازہ پراٹھا، چائے اور ابلے ہوئے انڈے', lunchEn: 'Mutton / Beef Stew with Tandoori Roti', lunchUr: 'گوشت سالن، تندوری روٹی اور سلاد', dinnerEn: 'Yellow Lentils (Daal Chana) & Steamed Rice', dinnerUr: 'دال چنا تڑکا، ابلے ہوئے چاول اور اچار', specialNutritionEn: 'Pure Buffalo Milk after Isha', specialNutritionUr: 'نمازِ عشاء کے بعد خالص دودھ' },
                  { dayEn: 'Tuesday', dayUr: 'منگل', breakfastEn: 'Chana Curry, Roti & Milk Tea', breakfastUr: 'چنے کا سالن، روٹی اور چائے', lunchEn: 'Seasonal Vegetables (Aloo Gobi/Matar) with Roti', lunchUr: 'موسمی سبزی (آلو مٹر / گوبھی) اور روٹی', dinnerEn: 'Chicken Qorma & Roti', dinnerUr: 'چکن قورمہ اور گرم روٹی', specialNutritionEn: 'Fresh Seasonal Fruit at Asr', specialNutritionUr: 'نمازِ عصر کے بعد تازہ پھل' },
                  { dayEn: 'Wednesday', dayUr: 'بدھ', breakfastEn: 'Semolina Halwa, Puri / Paratha & Tea', breakfastUr: 'سوجی کا حلوہ، پراٹھا اور چائے', lunchEn: 'Daal Mash with Desi Ghee Tarka & Roti', lunchUr: 'دال ماش دیسی گھی تڑکا اور تندوری روٹی', dinnerEn: 'Beef Kebab Curry & Rice', dinnerUr: 'بیف کباب سالن اور چاول', specialNutritionEn: 'Pure Buffalo Milk', specialNutritionUr: 'خالص بھینس کا دودھ' },
                  { dayEn: 'Thursday', dayUr: 'جمعرات', breakfastEn: 'Omelette, Roti & Cardamom Tea', breakfastUr: 'آملیٹ، روٹی اور الائچی چائے', lunchEn: 'Special Chicken Biryani & Raita', lunchUr: 'خصوصی چکن بریانی، رائتہ اور سلاد', dinnerEn: 'Mixed Dal Fry & Hot Roti', dinnerUr: 'مکس دال فرائی اور گرم روٹی', specialNutritionEn: 'Traditional Kheer / Sweet Dish', specialNutritionUr: 'روایتی کھیر یا میٹھا' },
                  { dayEn: 'Friday', dayUr: 'جمعہ مبارک', breakfastEn: 'Traditional Chana & Halwa Paratha', breakfastUr: 'روایتی لاہوری چنے، حلوہ اور پراٹھا', lunchEn: 'Special Juma Langar: Beef Pulao & Zarda', lunchUr: 'خصوصی جمعہ لنگر: بیف پلاؤ اور دیگی زردہ', dinnerEn: 'Chicken Karahi & Tandoori Naan', dinnerUr: 'چکن کڑاہی اور تندوری نان', specialNutritionEn: 'Juma Special Langar for All Visitors', specialNutritionUr: 'جمعہ کے تمام نمازیوں کے لیے عام لنگر' },
                  { dayEn: 'Saturday', dayUr: 'ہفتہ', breakfastEn: 'Egg Bhujia, Roti & Hot Tea', breakfastUr: 'انڈہ بھجیا، روٹی اور گرم چائے', lunchEn: 'Kadhi Pakora & Steamed Rice', lunchUr: 'کڑھی پکوڑا اور سفید چاول', dinnerEn: 'Aloo Gosht (Mutton Curry) & Roti', dinnerUr: 'آلو گوشت شوربہ اور تندوری روٹی', specialNutritionEn: 'Warm Milk before sleep', specialNutritionUr: 'سونے سے قبل گرم دودھ' },
                  { dayEn: 'Sunday', dayUr: 'اتوار', breakfastEn: 'Special Sunday Nihari & Khameeri Roti', breakfastUr: 'خصوصی نہاری، خمیری روٹی اور چائے', lunchEn: 'Daal Moong / Masoor with Salad & Roti', lunchUr: 'دال مونگ مسور، تازہ سلاد اور روٹی', dinnerEn: 'Chicken Roast & Vegetable Pulao', dinnerUr: 'چکن روسٹ اور سبزی پلاؤ', specialNutritionEn: 'Weekly Special Nutritional Tonic', specialNutritionUr: 'ہفتہ وار مقوی غذا' }
                ]
            ).map((day, idx) => (
              <div key={idx} className="bg-white border border-[#E5E1D8] p-5 shadow-xs space-y-4">
                
                {/* Day Name */}
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 bg-[#065F46] text-white rounded-full text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-serif font-bold text-sm text-[#111827]">{day.dayEn}</span>
                    <span className="font-urdu font-bold text-sm text-[#065F46]">({day.dayUr})</span>
                  </div>
                </div>

                {/* Meals inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Breakfast */}
                  <div className="space-y-1.5 bg-[#FDFBF7] p-3 border border-[#E5E1D8]">
                    <div className="flex items-center gap-1 text-xs font-bold uppercase text-amber-800">
                      <Coffee className="w-3.5 h-3.5" />
                      <span>Breakfast (ناشتہ)</span>
                    </div>
                    <input
                      type="text"
                      value={day.breakfastEn}
                      onChange={(e) => handleScheduleChange(idx, 'breakfastEn', e.target.value)}
                      placeholder="English: Paratha, Egg & Tea"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={day.breakfastUr}
                      onChange={(e) => handleScheduleChange(idx, 'breakfastUr', e.target.value)}
                      placeholder="اردو: پراٹھا، انڈہ اور چائے"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                    />
                  </div>

                  {/* Lunch */}
                  <div className="space-y-1.5 bg-[#FDFBF7] p-3 border border-[#E5E1D8]">
                    <div className="flex items-center gap-1 text-xs font-bold uppercase text-emerald-800">
                      <Sun className="w-3.5 h-3.5" />
                      <span>Lunch (دوپہر کا کھانا)</span>
                    </div>
                    <input
                      type="text"
                      value={day.lunchEn}
                      onChange={(e) => handleScheduleChange(idx, 'lunchEn', e.target.value)}
                      placeholder="English: Chicken / Mutton & Roti"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={day.lunchUr}
                      onChange={(e) => handleScheduleChange(idx, 'lunchUr', e.target.value)}
                      placeholder="اردو: گوشت سالن اور تندوری روٹی"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                    />
                  </div>

                  {/* Dinner */}
                  <div className="space-y-1.5 bg-[#FDFBF7] p-3 border border-[#E5E1D8]">
                    <div className="flex items-center gap-1 text-xs font-bold uppercase text-indigo-800">
                      <Moon className="w-3.5 h-3.5" />
                      <span>Dinner (رات کا کھانا)</span>
                    </div>
                    <input
                      type="text"
                      value={day.dinnerEn}
                      onChange={(e) => handleScheduleChange(idx, 'dinnerEn', e.target.value)}
                      placeholder="English: Daal Chana & Rice"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={day.dinnerUr}
                      onChange={(e) => handleScheduleChange(idx, 'dinnerUr', e.target.value)}
                      placeholder="اردو: دال چنا اور چاول"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                    />
                  </div>

                </div>

                {/* Special Nutrition Note */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <input
                    type="text"
                    value={day.specialNutritionEn || ''}
                    onChange={(e) => handleScheduleChange(idx, 'specialNutritionEn', e.target.value)}
                    placeholder="Extra Item (e.g. Pure Buffalo Milk after Isha)"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-[11px] focus:border-[#065F46] focus:outline-hidden"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    value={day.specialNutritionUr || ''}
                    onChange={(e) => handleScheduleChange(idx, 'specialNutritionUr', e.target.value)}
                    placeholder="خصوصی خوراک (مثلاً: نمازِ عشاء کے بعد خالص دودھ)"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-[11px] font-urdu focus:border-[#065F46] focus:outline-hidden"
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Sponsorship Packages */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="bg-white p-6 border border-[#E5E1D8] shadow-xs flex items-center justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-[#111827] flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#065F46]" />
                <span>Matbakh Donor Sponsorship Tiers</span>
              </h3>
              <p className="text-xs text-[#4B5563] mt-1">
                Packages that donors can choose on the website to sponsor daily meals, student boarding, and deghs.
              </p>
            </div>

            <button
              onClick={handleAddPackage}
              className="bg-[#065F46] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(foodState.sponsorshipPackages || []).map((pkg, idx) => (
              <div key={pkg.id || idx} className="bg-white border border-[#E5E1D8] p-5 shadow-xs space-y-3 relative">
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-2">
                  <span className="text-xs font-bold uppercase text-[#065F46]">
                    Tier #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemovePackage(idx)}
                    className="text-red-600 hover:text-red-800 p-1 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#111827]">
                      Amount (PKR)
                    </label>
                    <input
                      type="number"
                      value={pkg.amountPKR}
                      onChange={(e) => handlePackageChange(idx, 'amountPKR', parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs font-mono font-bold focus:border-[#065F46] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#111827]">
                      Badge / Tag (Optional)
                    </label>
                    <input
                      type="text"
                      value={pkg.tag || ''}
                      onChange={(e) => handlePackageChange(idx, 'tag', e.target.value)}
                      placeholder="e.g. Popular or Most Needed"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#111827]">
                      Package Name (En)
                    </label>
                    <input
                      type="text"
                      value={pkg.nameEn}
                      onChange={(e) => handlePackageChange(idx, 'nameEn', e.target.value)}
                      placeholder="1 Month Student Meals"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs font-semibold focus:border-[#065F46] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#111827] text-right">
                      نام پیکج (اردو)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={pkg.nameUr}
                      onChange={(e) => handlePackageChange(idx, 'nameUr', e.target.value)}
                      placeholder="ایک طالب علم کا ماہانہ خرچ"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs font-urdu font-bold focus:border-[#065F46] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#111827]">
                      Description (En)
                    </label>
                    <textarea
                      rows={2}
                      value={pkg.descriptionEn}
                      onChange={(e) => handlePackageChange(idx, 'descriptionEn', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#111827] text-right">
                      تفصیل (اردو)
                    </label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={pkg.descriptionUr}
                      onChange={(e) => handlePackageChange(idx, 'descriptionUr', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Descriptions & Hygiene */}
      {activeTab === 'hygiene' && (
        <div className="bg-white p-6 sm:p-8 border border-[#E5E1D8] shadow-xs space-y-6">
          <h3 className="font-serif text-base font-bold text-[#111827] border-b border-[#F0ECE1] pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#065F46]" />
            <span>Matbakh Overview & Food Safety Assurances</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-[#111827]">
                Program Headline (English)
              </label>
              <input
                type="text"
                value={foodState.titleEn}
                onChange={(e) => handleStatChange('titleEn', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-semibold focus:border-[#065F46] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                عنوان (اردو)
              </label>
              <input
                type="text"
                dir="rtl"
                value={foodState.titleUr}
                onChange={(e) => handleStatChange('titleUr', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu font-bold focus:border-[#065F46] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-[#111827]">
                Overview Description (English)
              </label>
              <textarea
                rows={4}
                value={foodState.descriptionEn}
                onChange={(e) => handleStatChange('descriptionEn', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs focus:border-[#065F46] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-[#111827] text-right">
                تفصیل (اردو)
              </label>
              <textarea
                rows={4}
                dir="rtl"
                value={foodState.descriptionUr}
                onChange={(e) => handleStatChange('descriptionUr', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1D8] text-xs font-urdu focus:border-[#065F46] focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating / Bottom Save Button */}
      <div className="p-4 bg-[#F8F9F5] border border-[#E5E1D8] flex items-center justify-between">
        <p className="text-xs text-[#4B5563]">
          Click Save to instantly publish all nutrition changes, weekly menus, and statistics to the live site.
        </p>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#065F46] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] disabled:opacity-50 transition-colors flex items-center gap-2 shadow-xs"
        >
          {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>Save Matbakh Data</span>
        </button>
      </div>

    </div>
  );
};
