import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopHeader } from './components/layout/TopHeader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WebsiteFeedbackSection } from './components/common/WebsiteFeedbackSection';
import { QuickDonateModal } from './components/layout/QuickDonateModal';
import { SearchModal } from './components/layout/SearchModal';

// Views
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { EducationView } from './components/views/EducationView';
import { StudentsView } from './components/views/StudentsView';
import { FoodProgramView } from './components/views/FoodProgramView';
import { WelfareView } from './components/views/WelfareView';
import { DonationView } from './components/views/DonationView';
import { QurbaniView } from './components/views/QurbaniView';
import { ZakatView } from './components/views/ZakatView';
import { MosqueView } from './components/views/MosqueView';
import { BooksView } from './components/views/BooksView';
import { GalleryView } from './components/views/GalleryView';
import { NewsView } from './components/views/NewsView';
import { EventsView } from './components/views/EventsView';
import { ContactView } from './components/views/ContactView';
import { AdminView } from './components/views/AdminView';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentPage, toasts, removeToast, isLoading, data } = useApp();

  const renderView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'education':
        return <EducationView />;
      case 'students':
        return <StudentsView />;
      case 'events':
        return <EventsView />;
      case 'food':
        return <FoodProgramView />;
      case 'welfare':
        return <WelfareView />;
      case 'donation':
        return <DonationView />;
      case 'qurbani':
        return <QurbaniView />;
      case 'zakat':
        return <ZakatView />;
      case 'mosque':
        return <MosqueView />;
      case 'books':
        return <BooksView />;
      case 'gallery':
        return <GalleryView />;
      case 'news':
        return <NewsView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A]">
      {/* Top Header */}
      <TopHeader />

      {/* Main Sticky Navbar */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1 w-full relative">
        {isLoading && !data ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-3 border-[#065F46] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs uppercase font-bold tracking-widest text-[#065F46]">
              Loading Darul Uloom Muhammadiya Ghousia Portal...
            </p>
          </div>
        ) : (
          renderView()
        )}
      </main>

      {/* Website Improvement Feedback Section at bottom */}
      {currentPage !== 'admin' && <WebsiteFeedbackSection />}

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <QuickDonateModal />
      <SearchModal />

      {/* Toast Notifications System */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 border shadow-lg flex items-center justify-between gap-3 text-xs animate-in slide-in-from-bottom duration-200 ${
              toast.type === 'success'
                ? 'bg-[#065F46] text-white border-[#065F46]'
                : toast.type === 'error'
                ? 'bg-red-800 text-white border-red-900'
                : 'bg-[#111827] text-white border-gray-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-amber-300 shrink-0" />}
              <span className="font-medium leading-tight">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/70 hover:text-white p-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
