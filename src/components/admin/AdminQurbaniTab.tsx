import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  Upload, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Image as ImageIcon, 
  Eye, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  DollarSign, 
  Check, 
  X, 
  HelpCircle,
  TrendingUp,
  Layers
} from 'lucide-react';
import { QurbaniCampaign, QurbaniAnimalItem, QurbaniFeatureItem } from '../../types';

export const AdminQurbaniTab: React.FC = () => {
  const { data, adminToken, showToast, refreshData, language } = useApp();
  const activeCampaign = data?.qurbaniCampaigns?.[0];

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'animals' | 'background' | 'features' | 'gallery'>('animals');

  // Form State
  const [campaignForm, setCampaignForm] = useState<Partial<QurbaniCampaign>>({
    id: 'qurb-2025',
    yearHijri: '1446 AH',
    yearGregorian: 2025,
    yearsOfServiceTextEn: '25+ Years of Dedicated Qurbani Service',
    yearsOfServiceTextUr: '25 سالہ مسلسل اور قابل اعتماد خدمتِ قربانی',
    descriptionEn: '',
    descriptionUr: '',
    headerBackgroundImage: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1920&q=80',
    animalsSacrificed: 180,
    meatDistributedKg: 14500,
    familiesBenefited: 2850,
    sharePriceCowPkr: 26000,
    sharePriceGoatPkr: 52000,
    fullCowPricePkr: 182000,
    cowShareCostPkr: 26000,
    fullCowCostPkr: 182000,
    goatCostPkr: 52000,
    animals: [],
    features: [],
    images: [],
    status: 'active'
  });

  // Animal Modal State
  const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);
  const [editingAnimalIndex, setEditingAnimalIndex] = useState<number | null>(null);
  const [animalForm, setAnimalForm] = useState<QurbaniAnimalItem>({
    id: '',
    nameEn: '',
    nameUr: '',
    type: 'cow-share',
    pricePkr: 26000,
    sharesCount: 1,
    isPopular: false,
    available: true,
    order: 1,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    descriptionEn: '',
    descriptionUr: ''
  });

  // Feature Modal State
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [featureForm, setFeatureForm] = useState<QurbaniFeatureItem>({
    id: '',
    titleEn: '',
    titleUr: '',
    descEn: '',
    descUr: ''
  });

  useEffect(() => {
    if (activeCampaign) {
      setCampaignForm({
        ...activeCampaign,
        headerBackgroundImage: activeCampaign.headerBackgroundImage || data?.settings?.pageBackgrounds?.qurbani || 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1920&q=80',
        animals: activeCampaign.animals || [
          {
            id: 'qanim-1',
            nameEn: 'One Cow Share (Hissa)',
            nameUr: 'گائے کا ایک حصہ (اجتماعی)',
            type: 'cow-share',
            pricePkr: activeCampaign.sharePriceCowPkr || activeCampaign.cowShareCostPkr || 26000,
            sharesCount: 1,
            isPopular: true,
            available: true,
            order: 1,
            image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
            descriptionEn: 'Includes healthy sacrificial cow share, religious slaughter under Muftis oversight, hygienic cutting, and distribution to deserving families and orphan students.',
            descriptionUr: 'صحت مند گائے میں ایک حصہ، شرعی ذبیحہ، صاف ستھری کٹائی اور نادار و یتیم خاندانوں تک گوشت کی ترسیل شامل ہے۔'
          },
          {
            id: 'qanim-2',
            nameEn: 'Full Goat / Sheep (Bakri / Chhatra)',
            nameUr: 'مکمل بکرا / چھترا',
            type: 'goat',
            pricePkr: activeCampaign.sharePriceGoatPkr || activeCampaign.goatCostPkr || 52000,
            sharesCount: 1,
            isPopular: false,
            available: true,
            order: 2,
            image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
            descriptionEn: 'Complete healthy individual sacrificial goat or ram slaughtered according to Sunnah guidelines with your designated intention and dua.',
            descriptionUr: 'مکمل صحت مند بکرا یا دنبہ، آپ کی نامزد نیت اور دعا کے ساتھ سنت کے مطابق ذبح اور گوشت کی تقسیم۔'
          },
          {
            id: 'qanim-3',
            nameEn: 'Complete Cow / Ox (7 Shares)',
            nameUr: 'مکمل گائے / بیل (7 حصے)',
            type: 'full-cow',
            pricePkr: activeCampaign.fullCowPricePkr || activeCampaign.fullCowCostPkr || 182000,
            sharesCount: 7,
            isPopular: false,
            available: true,
            order: 3,
            image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80',
            descriptionEn: 'Complete healthy sacrificial cattle of 7 full shares dedicated to family, deceased relatives (Isaale-Sawab), or student Langar distribution.',
            descriptionUr: '7 حصوں پر مشتمل مکمل صحت مند گائے یا بیل، پورے خاندان یا ایصالِ ثواب کے لیے خصوصی انتظام۔'
          }
        ],
        features: activeCampaign.features || []
      });
    }
  }, [activeCampaign, data?.settings?.pageBackgrounds?.qurbani]);

  const handleFileUpload = async (file: File, callbackUrl: (url: string) => void) => {
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            filename: file.name,
            fileData: base64Data,
          }),
        });
        const json = await res.json();
        if (res.ok && json.url) {
          callbackUrl(json.url);
          showToast(`Uploaded: ${file.name}`, 'success');
        } else {
          showToast(json.error || 'Failed to upload image', 'error');
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      showToast('Network error during file upload', 'error');
      setIsUploading(false);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      // 1. Sync animal primary prices to campaign root for backward compatibility
      const cowShare = campaignForm.animals?.find(a => a.type === 'cow-share');
      const fullCow = campaignForm.animals?.find(a => a.type === 'full-cow');
      const goat = campaignForm.animals?.find(a => a.type === 'goat' || a.type === 'sheep');

      const payload: QurbaniCampaign = {
        id: campaignForm.id || 'qurb-2025',
        yearHijri: campaignForm.yearHijri || '1446 AH',
        yearGregorian: campaignForm.yearGregorian || 2025,
        yearsOfServiceTextEn: campaignForm.yearsOfServiceTextEn || '25+ Years of Dedicated Qurbani Service',
        yearsOfServiceTextUr: campaignForm.yearsOfServiceTextUr || '25 سالہ مسلسل اور قابل اعتماد خدمتِ قربانی',
        descriptionEn: campaignForm.descriptionEn || '',
        descriptionUr: campaignForm.descriptionUr || '',
        headerBackgroundImage: campaignForm.headerBackgroundImage,
        animalsSacrificed: Number(campaignForm.animalsSacrificed) || 0,
        meatDistributedKg: Number(campaignForm.meatDistributedKg) || 0,
        familiesBenefited: Number(campaignForm.familiesBenefited) || 0,
        sharePriceCowPkr: cowShare?.pricePkr || campaignForm.sharePriceCowPkr || 26000,
        sharePriceGoatPkr: goat?.pricePkr || campaignForm.sharePriceGoatPkr || 52000,
        fullCowPricePkr: fullCow?.pricePkr || campaignForm.fullCowPricePkr || 182000,
        cowShareCostPkr: cowShare?.pricePkr || campaignForm.cowShareCostPkr || 26000,
        fullCowCostPkr: fullCow?.pricePkr || campaignForm.fullCowCostPkr || 182000,
        goatCostPkr: goat?.pricePkr || campaignForm.goatCostPkr || 52000,
        animals: campaignForm.animals || [],
        features: campaignForm.features || [],
        status: campaignForm.status || 'active',
        images: campaignForm.images || []
      };

      const res = await fetch('/api/admin/qurbani', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(payload),
      });

      // Also update pageBackgrounds if background changed
      if (campaignForm.headerBackgroundImage) {
        await fetch('/api/admin/page-backgrounds', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ qurbani: campaignForm.headerBackgroundImage }),
        });
      }

      if (res.ok) {
        showToast('Qurbani page & livestock packages updated successfully!', 'success');
        refreshData();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to update Qurbani page', 'error');
      }
    } catch {
      showToast('Network error while saving Qurbani details', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAnimalModal = (index: number | null = null) => {
    if (index !== null && campaignForm.animals && campaignForm.animals[index]) {
      setEditingAnimalIndex(index);
      setAnimalForm({ ...campaignForm.animals[index] });
    } else {
      setEditingAnimalIndex(null);
      setAnimalForm({
        id: 'qanim-' + Date.now(),
        nameEn: '',
        nameUr: '',
        type: 'cow-share',
        pricePkr: 26000,
        sharesCount: 1,
        isPopular: false,
        available: true,
        order: (campaignForm.animals?.length || 0) + 1,
        image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
        descriptionEn: '',
        descriptionUr: ''
      });
    }
    setIsAnimalModalOpen(true);
  };

  const handleSaveAnimal = () => {
    if (!animalForm.nameEn || !animalForm.pricePkr) {
      showToast('Please provide animal title and price.', 'error');
      return;
    }

    const updatedList = [...(campaignForm.animals || [])];
    if (editingAnimalIndex !== null) {
      updatedList[editingAnimalIndex] = { ...animalForm };
    } else {
      updatedList.push({
        ...animalForm,
        id: animalForm.id || 'qanim-' + Date.now()
      });
    }

    setCampaignForm(prev => ({ ...prev, animals: updatedList }));
    setIsAnimalModalOpen(false);
    showToast(editingAnimalIndex !== null ? 'Animal package updated' : 'New animal added', 'success');
  };

  const handleDeleteAnimal = (index: number) => {
    if (window.confirm('Are you sure you want to remove this animal package?')) {
      const updatedList = (campaignForm.animals || []).filter((_, i) => i !== index);
      setCampaignForm(prev => ({ ...prev, animals: updatedList }));
      showToast('Animal package removed', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#111827] text-white p-6 sm:p-8 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <Flame className="w-5 h-5 text-[#D97706]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">
              Annual Qurbani & Eid-ul-Adha Manager
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {language === 'ur' ? 'قربانی پروجیکٹ اور لائیو اسٹاک مینجمنٹ' : 'Qurbani Page & Livestock Offerings'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
            Edit sacrificial animals, set prices, update page background picture, manage 25+ years track record, and customize Qurbani guarantees.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all self-start md:self-center shadow-lg disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Qurbani Page</span>
        </button>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E5E1D8] pb-3">
        {[
          { id: 'animals', label: 'Sacrificial Animals & Prices', icon: Layers, count: campaignForm.animals?.length },
          { id: 'background', label: 'Page Background & Hero', icon: ImageIcon },
          { id: 'general', label: 'Campaign Details & Stats', icon: TrendingUp },
          { id: 'features', label: 'Why Entrust (Trust Pillars)', icon: ShieldCheck, count: campaignForm.features?.length },
          { id: 'gallery', label: 'Qurbani Photo Proofs', icon: ImageIcon, count: campaignForm.images?.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors border ${
                isActive
                  ? 'bg-[#065F46] text-white border-[#065F46]'
                  : 'bg-white text-[#4B5563] border-[#E5E1D8] hover:bg-[#F8F9F5]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SACRIFICIAL ANIMALS & PRICES */}
      {activeSubTab === 'animals' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#E5E1D8]">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#111827]">
                Live Sacrificial Animals & Share Packages
              </h3>
              <p className="text-xs text-[#6B7280]">
                Add or edit cow shares, full cows, goats, sheep, or camels with custom prices and images.
              </p>
            </div>
            <button
              onClick={() => handleOpenAnimalModal()}
              className="bg-[#111827] hover:bg-black text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-[#D97706]" />
              <span>Add Sacrificial Animal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaignForm.animals?.map((animal, idx) => (
              <div key={animal.id || idx} className="bg-white border border-[#E5E1D8] flex flex-col justify-between overflow-hidden shadow-xs hover:border-[#065F46] transition-colors">
                <div>
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img 
                      src={animal.image || 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80'} 
                      alt={animal.nameEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {animal.isPopular && (
                        <span className="bg-[#D97706] text-white text-[10px] font-bold uppercase px-2.5 py-1 tracking-widest shadow-xs">
                          Most Popular
                        </span>
                      )}
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 tracking-widest shadow-xs ${
                        animal.available ? 'bg-[#065F46] text-white' : 'bg-red-700 text-white'
                      }`}>
                        {animal.available ? 'Available' : 'Booked Out'}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider backdrop-blur-xs">
                      {animal.type}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#111827]">{animal.nameEn}</h4>
                      <p className="text-xs font-serif text-[#065F46] font-bold" dir="rtl">{animal.nameUr}</p>
                    </div>

                    <div className="flex items-baseline gap-2 bg-[#F8F9F5] p-3 border border-[#E5E1D8]">
                      <span className="text-xs uppercase font-bold text-[#6B7280]">Price:</span>
                      <span className="text-2xl font-serif font-bold text-[#065F46]">
                        PKR {animal.pricePkr?.toLocaleString()}
                      </span>
                      {animal.sharesCount && animal.sharesCount > 1 && (
                        <span className="text-[10px] text-gray-500">({animal.sharesCount} shares)</span>
                      )}
                    </div>

                    <p className="text-xs text-[#4B5563] line-clamp-3 leading-relaxed">
                      {animal.descriptionEn || 'No description provided.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#F8F9F5] border-t border-[#E5E1D8] flex items-center justify-between gap-2">
                  <span className="text-[10px] text-gray-400 font-mono">ID: {animal.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenAnimalModal(idx)}
                      className="p-1.5 text-[#065F46] hover:bg-emerald-50 border border-[#E5E1D8] hover:border-[#065F46] transition-colors"
                      title="Edit Animal"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAnimal(idx)}
                      className="p-1.5 text-red-600 hover:bg-red-50 border border-[#E5E1D8] hover:border-red-600 transition-colors"
                      title="Delete Animal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PAGE BACKGROUND & HERO PICTURE */}
      {activeSubTab === 'background' && (
        <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46] block mb-1">
              Custom Page Atmosphere
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#111827]">
              Qurbani Page Background & Header Picture
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl mt-1">
              When a user navigates to the Qurbani Page, this sacrificial banner image will appear dynamically behind the page hero with Islamic editorial shading.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block">
                Background Image URL / Direct Upload
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={campaignForm.headerBackgroundImage || ''}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, headerBackgroundImage: e.target.value }))}
                  placeholder="https://images.unsplash.com/photo-1560807707-8cc77767d783..."
                  className="flex-1 p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
                <label className="bg-[#111827] hover:bg-black text-white px-4 py-3 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-colors shrink-0">
                  <Upload className="w-4 h-4 text-[#D97706]" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0], (url) => {
                          setCampaignForm(prev => ({ ...prev, headerBackgroundImage: url }));
                        });
                      }
                    }}
                  />
                </label>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                  Quick High-Res Islamic Livestock Backgrounds:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Healthy Livestock Herd', url: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1920&q=80' },
                    { label: 'Traditional Cattle Pastoral', url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1920&q=80' },
                    { label: 'Sacrificial Ram / Sheep', url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1920&q=80' },
                    { label: 'Desert Camel Expedition', url: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=1920&q=80' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCampaignForm(prev => ({ ...prev, headerBackgroundImage: preset.url }))}
                      className="p-2.5 text-left text-xs bg-[#F8F9F5] border border-[#E5E1D8] hover:border-[#065F46] hover:bg-emerald-50/50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-[#111827]">{preset.label}</span>
                      {campaignForm.headerBackgroundImage === preset.url && (
                        <Check className="w-3.5 h-3.5 text-[#065F46]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block">
                Live Preview (Qurbani Hero Viewport)
              </span>
              <div className="relative h-64 border border-[#E5E1D8] overflow-hidden flex flex-col justify-end p-6 bg-slate-900">
                {campaignForm.headerBackgroundImage && (
                  <img
                    src={campaignForm.headerBackgroundImage}
                    alt="Qurbani Page Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="relative z-10 text-white space-y-1">
                  <span className="text-[#D97706] text-[10px] font-bold uppercase tracking-widest">
                    {campaignForm.yearsOfServiceTextEn || '25+ Years of Dedicated Service'}
                  </span>
                  <h4 className="text-xl font-serif font-bold">Annual Qurbani & Eid-ul-Adha Project</h4>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {campaignForm.descriptionEn || 'Facilitating seamless Shariah-monitored Eid Qurbani for deserving families across Sargodha.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GENERAL DETAILS & STATS */}
      {activeSubTab === 'general' && (
        <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#E5E1D8] pb-4">
            <h3 className="text-xl font-serif font-bold text-[#111827]">
              Campaign Timeline, Years of Service & Track Record
            </h3>
            <p className="text-xs text-[#6B7280]">
              Control the Islamic & Gregorian years, heritage badge, and verified distribution metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Hijri Year Text
              </label>
              <input
                type="text"
                value={campaignForm.yearHijri || ''}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, yearHijri: e.target.value }))}
                placeholder="1446 AH"
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Gregorian Year
              </label>
              <input
                type="number"
                value={campaignForm.yearGregorian || 2025}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, yearGregorian: parseInt(e.target.value) || 2025 }))}
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Campaign Status
              </label>
              <select
                value={campaignForm.status || 'active'}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              >
                <option value="active">Active (Accepting Bookings)</option>
                <option value="upcoming">Upcoming (Pre-Registration)</option>
                <option value="completed">Completed / Archival</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Heritage / Years of Service Badge (English)
              </label>
              <input
                type="text"
                value={campaignForm.yearsOfServiceTextEn || ''}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, yearsOfServiceTextEn: e.target.value }))}
                placeholder="25+ Years of Dedicated Qurbani Service"
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Heritage / Years of Service Badge (Urdu)
              </label>
              <input
                type="text"
                value={campaignForm.yearsOfServiceTextUr || ''}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, yearsOfServiceTextUr: e.target.value }))}
                placeholder="25 سالہ مسلسل اور قابل اعتماد خدمتِ قربانی"
                dir="rtl"
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E1D8]">
            <h4 className="text-sm font-serif font-bold text-[#111827] mb-3">
              Distribution Metrics & Impact Numbers
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                  Animals Sacrificed Count
                </label>
                <input
                  type="number"
                  value={campaignForm.animalsSacrificed || 0}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, animalsSacrificed: parseInt(e.target.value) || 0 }))}
                  className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                  Meat Distributed (in Kilograms)
                </label>
                <input
                  type="number"
                  value={campaignForm.meatDistributedKg || 0}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, meatDistributedKg: parseInt(e.target.value) || 0 }))}
                  className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                  Deserving Families Benefited
                </label>
                <input
                  type="number"
                  value={campaignForm.familiesBenefited || 0}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, familiesBenefited: parseInt(e.target.value) || 0 }))}
                  className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E5E1D8]">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Project Overview (English)
              </label>
              <textarea
                rows={4}
                value={campaignForm.descriptionEn || ''}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, descriptionEn: e.target.value }))}
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                placeholder="Details of the annual Qurbani project in Sargodha..."
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Project Overview (Urdu)
              </label>
              <textarea
                rows={4}
                value={campaignForm.descriptionUr || ''}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, descriptionUr: e.target.value }))}
                dir="rtl"
                className="w-full p-3 text-xs bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                placeholder="قربانی پروجیکٹ کی تفصیلات برائے اردو قارئین..."
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TRUST PILLARS & FEATURES */}
      {activeSubTab === 'features' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-5 border border-[#E5E1D8]">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#111827]">
                Why Entrust Qurbani to Ghousia (Trust Pillars)
              </h3>
              <p className="text-xs text-[#6B7280]">
                Institutional guarantees shown on the public Qurbani page (e.g. Shariah supervision, healthy cattle).
              </p>
            </div>
            <button
              onClick={() => {
                setFeatureForm({
                  id: 'qfeat-' + Date.now(),
                  titleEn: '',
                  titleUr: '',
                  descEn: '',
                  descUr: ''
                });
                setIsFeatureModalOpen(true);
              }}
              className="bg-[#111827] hover:bg-black text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#D97706]" />
              <span>Add Trust Pillar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaignForm.features?.map((feat, idx) => (
              <div key={feat.id || idx} className="bg-white border border-[#E5E1D8] p-6 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <div className="text-base font-serif font-bold text-[#065F46]">0{idx + 1}.</div>
                  <button
                    onClick={() => {
                      const updated = (campaignForm.features || []).filter((_, i) => i !== idx);
                      setCampaignForm(prev => ({ ...prev, features: updated }));
                    }}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-serif font-bold text-base text-[#111827]">{feat.titleEn}</h4>
                <p className="text-xs text-[#065F46] font-serif font-bold" dir="rtl">{feat.titleUr}</p>
                <p className="text-xs text-[#4B5563] leading-relaxed">{feat.descEn}</p>
                <p className="text-xs text-gray-500 font-serif" dir="rtl">{feat.descUr}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PHOTO PROOFS & MEDIA */}
      {activeSubTab === 'gallery' && (
        <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#111827]">
                Qurbani Field Photos & Livestock Gallery
              </h3>
              <p className="text-xs text-[#6B7280]">
                Add verifiable photographs of sacrificial cattle, slaughter arrangements, and meat distribution.
              </p>
            </div>
            <label className="bg-[#065F46] hover:bg-[#044E39] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileUpload(e.target.files[0], (url) => {
                      setCampaignForm(prev => ({ ...prev, images: [...(prev.images || []), url] }));
                    });
                  }
                }}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {campaignForm.images?.map((img, idx) => (
              <div key={idx} className="relative group h-40 bg-gray-100 border border-[#E5E1D8] overflow-hidden">
                <img src={img} alt={`Qurbani proof ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button
                  onClick={() => {
                    const updated = (campaignForm.images || []).filter((_, i) => i !== idx);
                    setCampaignForm(prev => ({ ...prev, images: updated }));
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANIMAL ADD / EDIT MODAL */}
      {isAnimalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E5E1D8] max-w-xl w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4">
              <h3 className="text-xl font-serif font-bold text-[#111827]">
                {editingAnimalIndex !== null ? 'Edit Sacrificial Offering' : 'Add New Animal / Share'}
              </h3>
              <button onClick={() => setIsAnimalModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-[#4B5563] block mb-1">Animal Title (English)</label>
                  <input
                    type="text"
                    value={animalForm.nameEn}
                    onChange={(e) => setAnimalForm(prev => ({ ...prev, nameEn: e.target.value }))}
                    placeholder="e.g. One Cow Share (Hissa)"
                    className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-[#4B5563] block mb-1">Animal Title (Urdu)</label>
                  <input
                    type="text"
                    value={animalForm.nameUr}
                    onChange={(e) => setAnimalForm(prev => ({ ...prev, nameUr: e.target.value }))}
                    dir="rtl"
                    placeholder="گائے کا ایک حصہ (اجتماعی)"
                    className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-[#4B5563] block mb-1">Animal Category / Type</label>
                  <select
                    value={animalForm.type}
                    onChange={(e) => setAnimalForm(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  >
                    <option value="cow-share">Cow Share (1 Hissa)</option>
                    <option value="full-cow">Complete Cow (7 Shares)</option>
                    <option value="goat">Full Goat (Bakri)</option>
                    <option value="sheep">Full Sheep / Ram (Chhatra / Dumba)</option>
                    <option value="camel-share">Camel Share (1 Hissa)</option>
                    <option value="full-camel">Full Camel (Nahr)</option>
                    <option value="other">Other Offering</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase text-[#4B5563] block mb-1">Price (in PKR)</label>
                  <input
                    type="number"
                    value={animalForm.pricePkr || ''}
                    onChange={(e) => setAnimalForm(prev => ({ ...prev, pricePkr: parseFloat(e.target.value) || 0 }))}
                    placeholder="26000"
                    className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46] font-bold text-[#065F46]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-[#4B5563] block mb-1">Animal Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={animalForm.image || ''}
                    onChange={(e) => setAnimalForm(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                  <label className="bg-[#111827] text-white px-3 py-2.5 font-bold uppercase cursor-pointer hover:bg-black">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], (url) => {
                            setAnimalForm(prev => ({ ...prev, image: url }));
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-[#4B5563] block mb-1">Package Description (English)</label>
                <textarea
                  rows={2}
                  value={animalForm.descriptionEn}
                  onChange={(e) => setAnimalForm(prev => ({ ...prev, descriptionEn: e.target.value }))}
                  placeholder="Includes sacrificial livestock, religious oversight, and hygienic distribution..."
                  className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-[#4B5563] block mb-1">Package Description (Urdu)</label>
                <textarea
                  rows={2}
                  value={animalForm.descriptionUr}
                  onChange={(e) => setAnimalForm(prev => ({ ...prev, descriptionUr: e.target.value }))}
                  dir="rtl"
                  placeholder="شرعی ذبیحہ، صفائی اور گوشت کی مستحقین تک ترسیل شامل ہے..."
                  className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={animalForm.isPopular}
                    onChange={(e) => setAnimalForm(prev => ({ ...prev, isPopular: e.target.checked }))}
                    className="w-4 h-4 text-[#065F46]"
                  />
                  <span className="font-bold text-[#111827]">Mark as "Most Popular" Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={animalForm.available}
                    onChange={(e) => setAnimalForm(prev => ({ ...prev, available: e.target.checked }))}
                    className="w-4 h-4 text-[#065F46]"
                  />
                  <span className="font-bold text-[#111827]">Available for Booking</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E1D8]">
              <button
                type="button"
                onClick={() => setIsAnimalModalOpen(false)}
                className="px-4 py-2 text-xs font-bold uppercase text-gray-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAnimal}
                className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest"
              >
                Save Animal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FEATURE ADD MODAL */}
      {isFeatureModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E1D8] max-w-lg w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
              <h3 className="text-lg font-serif font-bold text-[#111827]">Add Trust Feature</h3>
              <button onClick={() => setIsFeatureModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold uppercase text-[#4B5563] block mb-1">Title (English)</label>
                <input
                  type="text"
                  value={featureForm.titleEn}
                  onChange={(e) => setFeatureForm(prev => ({ ...prev, titleEn: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8]"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-[#4B5563] block mb-1">Title (Urdu)</label>
                <input
                  type="text"
                  value={featureForm.titleUr}
                  onChange={(e) => setFeatureForm(prev => ({ ...prev, titleUr: e.target.value }))}
                  dir="rtl"
                  className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8]"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-[#4B5563] block mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={featureForm.descEn}
                  onChange={(e) => setFeatureForm(prev => ({ ...prev, descEn: e.target.value }))}
                  className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8]"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-[#4B5563] block mb-1">Description (Urdu)</label>
                <textarea
                  rows={2}
                  value={featureForm.descUr}
                  onChange={(e) => setFeatureForm(prev => ({ ...prev, descUr: e.target.value }))}
                  dir="rtl"
                  className="w-full p-2.5 bg-[#F8F9F5] border border-[#E5E1D8]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E1D8]">
              <button
                type="button"
                onClick={() => setIsFeatureModalOpen(false)}
                className="px-4 py-2 text-xs font-bold uppercase text-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!featureForm.titleEn) return;
                  setCampaignForm(prev => ({
                    ...prev,
                    features: [...(prev.features || []), { ...featureForm, id: 'qfeat-' + Date.now() }]
                  }));
                  setIsFeatureModalOpen(false);
                }}
                className="bg-[#065F46] text-white px-5 py-2 text-xs font-bold uppercase"
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
