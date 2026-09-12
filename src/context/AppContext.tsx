import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  AppDatabase, 
  Language, 
  WebsiteSettings, 
  WebsiteStats, 
  AboutContent, 
  EducationProgram, 
  FacultyMember, 
  Student, 
  FoodProgramDetails, 
  WelfareProject, 
  DonationDetails, 
  QurbaniCampaign, 
  ZakatContent, 
  MosqueProject, 
  Book, 
  GalleryItem, 
  NewsItem, 
  ContactMessage 
} from '../types';
import { translations } from '../translations';
import confetti from 'canvas-confetti';

type PageType = 
  | 'home'
  | 'about'
  | 'education'
  | 'students'
  | 'food'
  | 'events'
  | 'welfare'
  | 'donation'
  | 'qurbani'
  | 'zakat'
  | 'mosque'
  | 'books'
  | 'gallery'
  | 'news'
  | 'contact'
  | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  t: typeof translations.en;
  
  // Data state
  data: Omit<AppDatabase, 'admin' | 'contactMessages' | 'donationPledges'> | null;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  
  // Modals
  isDonateModalOpen: boolean;
  openDonateModal: (categoryId?: string) => void;
  closeDonateModal: () => void;
  selectedDonationCategory: string | null;
  
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  
  // Admin State
  isAdmin: boolean;
  adminToken: string | null;
  adminUsername: string | null;
  loginAdmin: (token: string, username: string) => void;
  logoutAdmin: () => Promise<void>;
  
  // Confetti trigger
  triggerCelebration: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [currentPage, setCurrentPageState] = useState<PageType>('home');
  const [data, setData] = useState<Omit<AppDatabase, 'admin' | 'contactMessages' | 'donationPledges'> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Modal states
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);
  const [selectedDonationCategory, setSelectedDonationCategory] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  
  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Admin auth
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('durg_admin_token'));
  const [adminUsername, setAdminUsername] = useState<string | null>(() => localStorage.getItem('durg_admin_user'));
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Sync hash routing if user enters /admin directly or navigates
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
      if (hash === 'admin') {
        setCurrentPageState('admin');
      } else if (['about', 'education', 'students', 'food', 'welfare', 'donation', 'qurbani', 'zakat', 'mosque', 'books', 'gallery', 'news', 'contact'].includes(hash)) {
        setCurrentPageState(hash as PageType);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setCurrentPage = (page: PageType) => {
    setCurrentPageState(page);
    window.location.hash = page === 'home' ? '' : `/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openDonateModal = (categoryId?: string) => {
    if (categoryId) setSelectedDonationCategory(categoryId);
    setIsDonateModalOpen(true);
  };

  const closeDonateModal = () => {
    setIsDonateModalOpen(false);
    setSelectedDonationCategory(null);
  };

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#f59e0b', '#d97706', '#fbbf24']
      });
    } catch {
      // ignore
    }
  };

  const refreshData = async () => {
    try {
      const res = await fetch('/api/public/data');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching public website data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify admin token on startup
  useEffect(() => {
    const verifyAdmin = async () => {
      if (!adminToken) {
        setIsAdmin(false);
        return;
      }
      try {
        const res = await fetch('/api/admin/verify', {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.valid) {
            setIsAdmin(true);
            setAdminUsername(json.username);
            return;
          }
        }
        // If invalid, clear
        localStorage.removeItem('durg_admin_token');
        localStorage.removeItem('durg_admin_user');
        setAdminToken(null);
        setIsAdmin(false);
      } catch {
        setIsAdmin(false);
      }
    };

    verifyAdmin();
    refreshData();
  }, [adminToken]);

  const loginAdmin = (token: string, username: string) => {
    localStorage.setItem('durg_admin_token', token);
    localStorage.setItem('durg_admin_user', username);
    setAdminToken(token);
    setAdminUsername(username);
    setIsAdmin(true);
    showToast(`Welcome back, ${username}! Admin dashboard ready.`, 'success');
  };

  const logoutAdmin = async () => {
    if (adminToken) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      } catch {
        // ignore
      }
    }
    localStorage.removeItem('durg_admin_token');
    localStorage.removeItem('durg_admin_user');
    setAdminToken(null);
    setAdminUsername(null);
    setIsAdmin(false);
    showToast('Logged out of Admin Portal.', 'info');
    setCurrentPage('home');
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currentPage,
        setCurrentPage,
        t,
        data,
        isLoading,
        refreshData,
        isDonateModalOpen,
        openDonateModal,
        closeDonateModal,
        selectedDonationCategory,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        toasts,
        showToast,
        removeToast,
        isAdmin,
        adminToken,
        adminUsername,
        loginAdmin,
        logoutAdmin,
        triggerCelebration,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
