import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Lock, Facebook, Sparkles } from 'lucide-react';

export const TopHeader: React.FC = () => {
  const { language, setLanguage, data, setCurrentPage, isAdmin, logoutAdmin } = useApp();

  const settings = data?.settings;

  return (
    <div className="bg-[#111827] text-gray-300 text-xs py-2 px-6 border-b border-[#1F2937] relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Islamic Greeting & Sargodha Location in Editorial Tone */}
        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
          <div className="flex items-center gap-1.5 text-[#D97706] font-arabic text-sm tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-gray-400 uppercase tracking-widest text-[10px] font-semibold">
            <MapPin className="w-3 h-3 text-[#D97706]" />
            <span>{language === 'ur' ? settings?.addressUr || 'نواب کالونی، سرگودھا' : settings?.addressEn || 'Nawab Colony, Sargodha, Pakistan'}</span>
          </div>
        </div>

        {/* Right: Phone, Email, Facebook, Language Switcher, Admin Link */}
        <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center">
          {settings?.phone1 && (
            <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="flex items-center gap-1 hover:text-[#D97706] transition-colors text-[11px] font-medium">
              <Phone className="w-3 h-3 text-[#D97706]" />
              <span dir="ltr">{settings.phone1}</span>
            </a>
          )}
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="hidden sm:flex items-center gap-1 hover:text-[#D97706] transition-colors text-[11px] font-medium">
              <Mail className="w-3 h-3 text-[#D97706]" />
              <span>{settings.email}</span>
            </a>
          )}
          {settings?.facebookUrl && (
            <a 
              href={settings.facebookUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors bg-[#1F2937] px-2 py-0.5 border border-gray-700 text-[10px] font-bold uppercase tracking-wider"
              title="Official Facebook Page"
            >
              <Facebook className="w-3 h-3 text-[#3B82F6]" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          )}

          {/* Language Switcher Button */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all border ${
                language === 'en' 
                  ? 'bg-[#065F46] text-white border-[#065F46]' 
                  : 'bg-transparent text-gray-400 border-gray-700 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={`px-2.5 py-0.5 text-[11px] font-bold font-urdu transition-all border ${
                language === 'ur' 
                  ? 'bg-[#D97706] text-white border-[#D97706]' 
                  : 'bg-transparent text-gray-400 border-gray-700 hover:text-white'
              }`}
            >
              اردو
            </button>
          </div>

          {/* Admin Portal Link */}
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage('admin')}
                className="flex items-center gap-1 text-[#D97706] hover:text-amber-300 font-bold uppercase tracking-widest text-[10px] bg-[#1F2937] px-2 py-0.5 border border-[#D97706]/40"
              >
                <Lock className="w-3 h-3" />
                <span>Admin CMS</span>
              </button>
              <button
                onClick={logoutAdmin}
                className="text-red-400 hover:text-red-300 uppercase tracking-widest text-[10px]"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentPage('admin')}
              className="flex items-center gap-1 text-gray-400 hover:text-[#D97706] transition-colors text-[10px] uppercase font-bold tracking-widest"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden md:inline">Admin</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
