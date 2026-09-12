import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Lock,
  MessageCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, language, setCurrentPage, openDonateModal } = useApp();
  const settings = data?.settings;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-gray-300 relative border-t-4 border-[#065F46]">
      {/* Top Banner: Editorial Call to Action */}
      <div className="border-b border-gray-800 py-8 px-6 bg-[#0E1520]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest mb-1 block">
              Continuous Sadaqah & Quranic Education
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-white font-bold">
              {language === 'ur' 
                ? 'دینی تعلیم اور مستحقین کی کفالت میں ہمارے ساتھ شریک ہوں' 
                : 'Nurturing Knowledge & Empowering the Community of Sargodha'}
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              {language === 'ur' 
                ? 'آپ کی زکوٰۃ، صدقات اور عطیات نادار طلباء کی 100% مفت تعلیم، طعام اور مساجد کی تعمیر میں صرف ہوتے ہیں۔' 
                : 'Your donations directly sponsor deserving students with free education, daily meals (Matbakh), and mosque construction.'}
            </p>
          </div>
          <button
            onClick={() => openDonateModal()}
            className="shrink-0 bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-xs"
          >
            <span>{language === 'ur' ? 'ابھی عطیہ دیں' : 'Donate Now'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
          </button>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Institution Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {settings?.logoUrl ? (
                <img 
                  src={settings.logoUrl} 
                  alt="Logo" 
                  className="w-10 h-10 object-contain rounded-lg border border-gray-700 bg-white p-0.5" 
                />
              ) : (
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg"
                  style={{ backgroundColor: settings?.primaryColor || '#065F46' }}
                >
                  {settings?.institutionNameEn ? settings.institutionNameEn.charAt(0) : 'D'}
                </div>
              )}
              <div>
                <h4 className="font-serif font-bold text-white text-base leading-tight">
                  {language === 'ur' ? settings?.institutionNameUr : settings?.institutionNameEn}
                </h4>
                <p className="text-[10px] text-[#D97706] uppercase tracking-widest font-semibold">
                  {settings?.city || 'Sargodha'}, {settings?.country || 'Pakistan'}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {language === 'ur'
                ? settings?.taglineUr || 'دینی تعلیم و انسانی فلاح و بہبود کا عظیم مرکز۔ نواب کالونی، سرگودھا۔'
                : settings?.taglineEn || 'A dedicated sanctuary of traditional Islamic sciences, free education for deserving students, food program, and community welfare in Sargodha, Pakistan.'}
            </p>
            <div className="flex items-center gap-2 pt-1">
              {settings?.facebookUrl && (
                <a 
                  href={settings.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-[#065F46] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-gray-700"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings?.whatsapp && (
                <a 
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-[#065F46] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-gray-700"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-widest flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#D97706]"></span>
              <span>{language === 'ur' ? 'اہم لنکس' : 'Navigation'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'about', labelEn: 'About & History', labelUr: 'ہمارا تعارف و تاریخ' },
                { id: 'education', labelEn: 'Education Programs', labelUr: 'دینی تعلیمی شعبہ جات' },
                { id: 'students', labelEn: 'Students & Alumni', labelUr: 'طلباء و کارنامے' },
                { id: 'food', labelEn: 'Free Food (Matbakh)', labelUr: 'مفت طعام پروگرام' },
                { id: 'welfare', labelEn: 'Welfare Activities', labelUr: 'فلاحی سرگرمیاں' },
                { id: 'books', labelEn: 'Digital Islamic Library', labelUr: 'کتب لائبریری' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentPage(link.id as any)}
                    className="hover:text-[#D97706] transition-colors flex items-center gap-2 text-gray-400"
                  >
                    <span className="text-[#065F46]">›</span>
                    <span className="uppercase tracking-wider text-[11px] font-medium">{language === 'ur' ? link.labelUr : link.labelEn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Initiatives */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-widest flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#D97706]"></span>
              <span>{language === 'ur' ? 'خصوصی پروجیکٹس' : 'Key Projects'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'qurbani', labelEn: '25+ Years Qurbani Service', labelUr: '25 سالہ خدمتِ قربانی' },
                { id: 'zakat', labelEn: 'Shariah Zakat Policy', labelUr: 'شعبہ زکوٰۃ و امداد' },
                { id: 'mosque', labelEn: 'Mosque Construction', labelUr: 'تعمیرِ مساجد پروجیکٹس' },
                { id: 'gallery', labelEn: 'Media Gallery', labelUr: 'تصویری گیلری' },
                { id: 'news', labelEn: 'News & Announcements', labelUr: 'خبریں و داخلے' },
                { id: 'donation', labelEn: 'Bank & Mobile Accounts', labelUr: 'بینک اکاؤنٹس تفصیل' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentPage(link.id as any)}
                    className="hover:text-[#D97706] transition-colors flex items-center gap-2 text-gray-400"
                  >
                    <span className="text-[#065F46]">›</span>
                    <span className="uppercase tracking-wider text-[11px] font-medium">{language === 'ur' ? link.labelUr : link.labelEn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-widest flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#D97706]"></span>
              <span>{language === 'ur' ? 'پتہ و رابطے' : 'Contact'}</span>
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                <span>{language === 'ur' ? settings?.addressUr : settings?.addressEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span dir="ltr">{settings?.phone1} / {settings?.phone2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>{settings?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span className="text-[11px]">{language === 'ur' ? 'دفتری اوقات: صبح 8:00 تا شام 5:00' : 'Office Hours: 8:00 AM - 5:00 PM'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin link */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-400 uppercase tracking-widest gap-4">
          <p>
            &copy; {currentYear} {language === 'ur' ? 'دارالعلوم محمدیہ غوثیہ، نواب کالونی، سرگودھا۔ جملہ حقوق محفوظ ہیں۔' : 'Darul Uloom Muhammadiya Ghousia. All Rights Reserved.'}
          </p>
          <div className="flex gap-6 font-bold text-gray-300">
            <button onClick={() => setCurrentPage('about')} className="hover:text-[#D97706]">History</button>
            <button onClick={() => setCurrentPage('zakat')} className="hover:text-[#D97706]">Zakat Policy</button>
            <button onClick={() => setCurrentPage('gallery')} className="hover:text-[#D97706]">Media Gallery</button>
            <button onClick={() => setCurrentPage('admin')} className="hover:text-[#D97706] text-[#D97706] flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
