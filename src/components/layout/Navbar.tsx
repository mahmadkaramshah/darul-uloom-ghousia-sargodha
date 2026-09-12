import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  X, 
  Search, 
  BookOpen, 
  Landmark, 
  GraduationCap, 
  UtensilsCrossed, 
  Building2, 
  Images, 
  Newspaper, 
  PhoneCall, 
  Info, 
  Home, 
  Users, 
  Flame, 
  Coins,
  HeartHandshake,
  Calendar
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, language, setLanguage, data, openDonateModal, openSearchModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const settings = data?.settings;

  const navItems = [
    { id: 'home', labelEn: 'Home', labelUr: 'مرکزی صفحہ', icon: Home },
    { id: 'about', labelEn: 'About', labelUr: 'تعارف', icon: Info },
    { id: 'education', labelEn: 'Education', labelUr: 'دینی تعلیم', icon: GraduationCap },
    { id: 'events', labelEn: 'Events', labelUr: 'تقریبات و محافل', icon: Calendar },
    { id: 'food', labelEn: 'Free Food', labelUr: 'مفت طعام', icon: UtensilsCrossed },
    { id: 'students', labelEn: 'Students', labelUr: 'طلباء', icon: Users },
    { id: 'welfare', labelEn: 'Welfare', labelUr: 'فلاحی خدمات', icon: HeartHandshake },
    { id: 'donation', labelEn: 'Donation', labelUr: 'عطیات', icon: Coins },
    { id: 'qurbani', labelEn: 'Qurbani', labelUr: 'قربانی', icon: Flame },
    { id: 'zakat', labelEn: 'Zakat', labelUr: 'زکوٰۃ', icon: Landmark },
    { id: 'mosque', labelEn: 'Mosque Projects', labelUr: 'تعمیرِ مساجد', icon: Building2 },
    { id: 'books', labelEn: 'Books', labelUr: 'کتب لائبریری', icon: BookOpen },
    { id: 'gallery', labelEn: 'Gallery', labelUr: 'گیلری', icon: Images },
    { id: 'news', labelEn: 'News', labelUr: 'خبریں', icon: Newspaper },
    { id: 'contact', labelEn: 'Contact', labelUr: 'رابطہ', icon: PhoneCall },
  ] as const;

  const handleNavClick = (id: typeof navItems[number]['id']) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E1D8] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Editorial Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
          >
            {settings?.logoUrl ? (
              <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="w-12 h-12 object-contain rounded-lg border border-[#E5E1D8] bg-white p-0.5 shadow-xs" 
              />
            ) : (
              <div 
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-xs transition-colors"
                style={{ backgroundColor: settings?.primaryColor || '#065F46' }}
              >
                {settings?.institutionNameEn ? settings.institutionNameEn.charAt(0) : 'D'}
              </div>
            )}
            <div className="flex flex-col">
              <h1 
                className="font-serif text-base sm:text-lg leading-tight font-bold uppercase tracking-wider transition-colors"
                style={{ color: settings?.primaryColor || '#065F46' }}
              >
                {language === 'ur' 
                  ? (settings?.institutionNameUr || 'دارالعلوم محمدیہ غوثیہ') 
                  : (settings?.institutionNameEn || 'Darul Uloom Muhammadiya Ghousia')}
              </h1>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-semibold">
                {language === 'ur' ? (settings?.taglineUr || 'نواب کالونی، سرگودھا') : (settings?.taglineEn || 'Nawab Colony, Sargodha, Pakistan')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-4 text-xs font-semibold uppercase tracking-tighter text-[#4B5563]">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const label = language === 'ur' ? item.labelUr : item.labelEn;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-1 transition-colors whitespace-nowrap ${
                    language === 'ur' ? 'font-urdu text-xs font-bold' : ''
                  } ${
                    isActive
                      ? 'text-[#065F46] font-bold border-b-2 border-[#065F46]'
                      : 'hover:text-[#065F46]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Search, Donate Now, Urdu Switch */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={openSearchModal}
              aria-label="Search website"
              className="p-2 text-[#4B5563] hover:text-[#065F46] hover:bg-[#F8F9F5] border border-[#E5E1D8] transition-colors"
              title="Search website"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Editorial Donate Button */}
            <button
              onClick={() => openDonateModal()}
              className="bg-[#065F46] text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#044E39] transition-colors shadow-xs"
            >
              <span className={language === 'ur' ? 'font-urdu text-sm' : ''}>
                {language === 'ur' ? 'عطیہ دیں' : 'Donate Now'}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#111827] hover:bg-[#F8F9F5] border border-[#E5E1D8] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#E5E1D8] shadow-lg max-h-[80vh] overflow-y-auto px-6 py-4 animate-in slide-in-from-top duration-150">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              const label = language === 'ur' ? item.labelUr : item.labelEn;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-3 text-left text-xs font-semibold uppercase tracking-tight transition-all border ${
                    language === 'ur' ? 'font-urdu text-sm' : ''
                  } ${
                    isActive
                      ? 'bg-[#065F46] text-white border-[#065F46]'
                      : 'bg-[#FDFBF7] hover:bg-[#F8F9F5] text-[#1A1A1A] border-[#E5E1D8]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#065F46]'}`} />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E5E1D8]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDonateModal();
              }}
              className="w-full bg-[#065F46] text-white font-bold py-3 text-xs uppercase tracking-widest hover:bg-[#044E39] transition-colors"
            >
              {language === 'ur' ? 'آن لائن عطیہ جمع کروائیں' : 'Support & Donate Now'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
