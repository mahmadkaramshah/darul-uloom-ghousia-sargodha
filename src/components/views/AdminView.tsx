import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, 
  User, 
  Key, 
  LogOut, 
  Settings, 
  Newspaper, 
  Users, 
  Building2, 
  BookOpen, 
  HeartHandshake, 
  Images, 
  Mail, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Eye, 
  Upload,
  Coins,
  Flame,
  LayoutDashboard,
  UtensilsCrossed,
  FileText,
  X,
  Sparkles,
  Search,
  Check,
  Palette
} from 'lucide-react';
import { NewsItem, Student, MosqueProject, Book, GalleryItem, ContactMessage, WelfareProject, FoodProgramDetails } from '../../types';
import { AdminBrandingTab } from '../admin/AdminBrandingTab';
import { AdminStudentsTab } from '../admin/AdminStudentsTab';
import { AdminBankAccountsTab } from '../admin/AdminBankAccountsTab';
import { AdminFeedbackTab } from '../admin/AdminFeedbackTab';
import { AdminAccountTab } from '../admin/AdminAccountTab';
import { AdminFacultyTab } from '../admin/AdminFacultyTab';
import { AdminPillarsTab } from '../admin/AdminPillarsTab';
import { AdminEventsTab } from '../admin/AdminEventsTab';
import { AdminEducationTab } from '../admin/AdminEducationTab';
import { AdminFoodProgramTab } from '../admin/AdminFoodProgramTab';
import { AdminQurbaniTab } from '../admin/AdminQurbaniTab';
import { AdminZakatTab } from '../admin/AdminZakatTab';
import { AdminPageBackgroundsTab } from '../admin/AdminPageBackgroundsTab';
import { 
  Landmark, 
  MessageSquareHeart, 
  Award, 
  Compass, 
  Calendar, 
  GraduationCap, 
  ShieldCheck 
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    isAdmin, 
    adminToken, 
    loginAdmin, 
    logoutAdmin, 
    showToast, 
    data, 
    refreshData,
    setCurrentPage,
    language 
  } = useApp();

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'account'
    | 'branding'
    | 'page-backgrounds'
    | 'qurbani'
    | 'zakat'
    | 'banks'
    | 'events'
    | 'faculty'
    | 'pillars'
    | 'education'
    | 'matbakh'
    | 'students'
    | 'news'
    | 'mosques'
    | 'welfare'
    | 'books'
    | 'gallery'
    | 'settings'
    | 'messages'
    | 'feedback'
  >('overview');

  // Welfare sub-tab
  const [welfareSubTab, setWelfareSubTab] = useState<'projects' | 'matbakh'>('projects');

  // Messages State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Settings and Stats Form States
  const [settingsForm, setSettingsForm] = useState({
    institutionNameEn: '',
    institutionNameUr: '',
    phone1: '',
    phone2: '',
    email: '',
    addressEn: '',
    addressUr: '',
    whatsapp: '',
    facebookUrl: '',
  });

  const [statsForm, setStatsForm] = useState({
    studentsEnrolled: 500,
    graduatedHuffaz: 1200,
    graduatedUlama: 350,
    mosquesConstructed: 12,
    yearsOfService: 25,
    qurbaniServedHouseholds: 2500,
  });

  // Matbakh Form State
  const [matbakhForm, setMatbakhForm] = useState<FoodProgramDetails>({
    titleEn: 'Matbakh-e-Ghousia Daily Free Food Program',
    titleUr: 'مطبخِ غوثیہ — روزانہ مفت طعام پروگرام',
    descriptionEn: 'Serving over 600 freshly cooked, nutritious, and hygienic meals every day to all residential students, scholars, and visitors in Sargodha.',
    descriptionUr: 'دارالعلوم کے مطبخ میں روزانہ 600 سے زائد طلباء، اساتذہ اور مہمانوں کے لیے دو وقت کا تازہ، معیاری اور غذائیت سے بھرپور کھانا تیار کیا جاتا ہے۔',
    dailyMealsCount: 600,
    beneficiaryCount: 500,
    monthlyCostPerStudentPkr: 6000,
    menuHighlightsEn: ['Chicken Biryani & Fresh Yogurt', 'Daal Chana with Desi Tarka & Roti', 'Beef Qorma & Fresh Salad', 'Special Haleem & Sweet Rice'],
    menuHighlightsUr: ['چکن بریانی و دہی', 'دال چنا تڑکا و گرم روٹی', 'بیف قورمہ و سلاد', 'خصوصی حلیم و زردہ'],
    images: ['https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=800&auto=format&fit=crop&q=80']
  });

  // Modal Open States
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [isAddMosqueOpen, setIsAddMosqueOpen] = useState(false);
  const [isAddWelfareOpen, setIsAddWelfareOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isAddGalleryOpen, setIsAddGalleryOpen] = useState(false);

  // New News Item Form State
  const [newsForm, setNewsForm] = useState({
    titleEn: '',
    titleUr: '',
    category: 'Admissions',
    summaryEn: '',
    summaryUr: '',
    contentEn: '',
    contentUr: '',
    featuredImage: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=80',
    date: new Date().toISOString().split('T')[0],
  });

  // New Mosque Project Form State
  const [mosqueForm, setMosqueForm] = useState({
    nameEn: '',
    nameUr: '',
    locationEn: '',
    locationUr: '',
    descriptionEn: '',
    descriptionUr: '',
    constructionStatus: 'In Progress' as 'Planning' | 'Foundation' | 'Structure' | 'Finishing' | 'Completed' | 'In Progress',
    progressPercentage: 50,
    requiredFundingPkr: 4500000,
    amountRaisedPkr: 2000000,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=800&auto=format&fit=crop&q=80',
    contactPerson: 'Administration Office',
    contactPhone: '+92 300 1234567',
  });

  // New Welfare Project Form State
  const [welfareForm, setWelfareForm] = useState({
    titleEn: '',
    titleUr: '',
    category: 'food' as 'food' | 'education' | 'financial' | 'family' | 'emergency' | 'mosque' | 'general',
    categoryEn: 'Monthly Student Ration',
    descriptionEn: '',
    descriptionUr: '',
    locationEn: 'Sargodha & Surrounding Districts',
    locationUr: 'سرگودھا و ملحقہ اضلاع',
    beneficiariesCount: 200,
    budgetPkr: 500000,
    raisedPkr: 250000,
    status: 'ongoing' as 'ongoing' | 'completed' | 'planned',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80',
  });

  // New Book Form State
  const [bookForm, setBookForm] = useState({
    title: '',
    titleUr: '',
    author: '',
    category: 'Fiqh' as 'Quran' | 'Hadith' | 'Fiqh' | 'Islamic Studies' | 'Arabic' | 'Educational' | 'Other',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    fileUrl: '/books/sample.pdf',
    fileSizeMb: 12,
    pages: 280,
  });

  // New Gallery Item Form State
  const [galleryForm, setGalleryForm] = useState({
    titleEn: '',
    titleUr: '',
    category: 'Campus' as 'Institution' | 'Students' | 'Education' | 'Qurbani' | 'Welfare' | 'Food Distribution' | 'Mosque Projects' | 'Events' | 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=80',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [isUploading, setIsUploading] = useState(false);

  // Sync settings & stats from data
  useEffect(() => {
    if (data?.settings) {
      setSettingsForm({
        institutionNameEn: data.settings.institutionNameEn || '',
        institutionNameUr: data.settings.institutionNameUr || '',
        phone1: data.settings.phone1 || '',
        phone2: data.settings.phone2 || '',
        email: data.settings.email || '',
        addressEn: data.settings.addressEn || '',
        addressUr: data.settings.addressUr || '',
        whatsapp: data.settings.whatsapp || '',
        facebookUrl: data.settings.facebookUrl || '',
      });
    }
    if (data?.stats) {
      setStatsForm({
        studentsEnrolled: data.stats.studentsEnrolled || 500,
        graduatedHuffaz: data.stats.graduatedHuffaz || 1200,
        graduatedUlama: data.stats.graduatedUlama || 350,
        mosquesConstructed: data.stats.mosquesConstructed || 12,
        yearsOfService: data.stats.yearsOfService || 25,
        qurbaniServedHouseholds: data.stats.qurbaniServedHouseholds || 2500,
      });
    }
    if (data?.foodProgram) {
      setMatbakhForm({
        titleEn: data.foodProgram.titleEn || 'Matbakh-e-Ghousia Daily Free Food Program',
        titleUr: data.foodProgram.titleUr || 'مطبخِ غوثیہ — روزانہ مفت طعام پروگرام',
        descriptionEn: data.foodProgram.descriptionEn || '',
        descriptionUr: data.foodProgram.descriptionUr || '',
        dailyMealsCount: (data.foodProgram as any).dailyMealsCount || (data.foodProgram as any).mealsServedPerDay || 600,
        beneficiaryCount: data.foodProgram.beneficiaryCount || 500,
        monthlyCostPerStudentPkr: (data.foodProgram as any).monthlyCostPerStudentPkr || (data.foodProgram as any).costPerStudentMonthlyPkr || 6000,
        menuHighlightsEn: data.foodProgram.menuHighlightsEn || [],
        menuHighlightsUr: data.foodProgram.menuHighlightsUr || [],
        images: data.foodProgram.images || ['https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=800&auto=format&fit=crop&q=80'],
      });
    }
  }, [data]);

  // Fetch admin messages when tab opens
  const fetchMessages = async () => {
    if (!adminToken) return;
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const json = await res.json();
        setMessages(json);
      }
    } catch {
      // ignore
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        showToast('Message deleted', 'info');
      }
    } catch {
      showToast('Failed to delete message', 'error');
    }
  };

  useEffect(() => {
    if (isAdmin && activeTab === 'messages') {
      fetchMessages();
    }
  }, [isAdmin, activeTab]);

  // Generic File Upload Handler
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
          showToast(`File uploaded: ${file.name}`, 'success');
        } else {
          showToast(json.error || 'Failed to upload file', 'error');
        }
        setIsUploading(false);
      };
      reader.onerror = () => {
        showToast('Error reading file data', 'error');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      showToast('Network error during file upload', 'error');
      setIsUploading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      showToast('Please enter username and password.', 'error');
      return;
    }
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        loginAdmin(json.token, json.username);
      } else {
        showToast(json.error || 'Invalid credentials', 'error');
      }
    } catch {
      showToast('Network error during login.', 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify(settingsForm),
      });
      if (res.ok) {
        showToast('Settings updated successfully!', 'success');
        refreshData();
      } else {
        showToast('Failed to update settings', 'error');
      }
    } catch {
      showToast('Network error updating settings', 'error');
    }
  };

  // Save Stats
  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/stats', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify(statsForm),
      });
      if (res.ok) {
        showToast('Key statistics updated successfully!', 'success');
        refreshData();
      } else {
        showToast('Failed to update stats', 'error');
      }
    } catch {
      showToast('Network error updating stats', 'error');
    }
  };

  // Save Matbakh Food Program
  const handleSaveMatbakh = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/food-program', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify(matbakhForm),
      });
      if (res.ok) {
        showToast('Matbakh food program details updated!', 'success');
        refreshData();
      } else {
        showToast('Failed to update Matbakh details', 'error');
      }
    } catch {
      showToast('Network error updating Matbakh details', 'error');
    }
  };

  // --- NEWS CRUD ---
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.titleEn && !newsForm.titleUr) {
      showToast('Please enter an announcement title', 'error');
      return;
    }
    const currentNews = data?.news || [];
    const newItem: NewsItem = {
      id: `news-${Date.now()}`,
      titleEn: newsForm.titleEn || newsForm.titleUr,
      titleUr: newsForm.titleUr || newsForm.titleEn,
      slug: (newsForm.titleEn || `news-${Date.now()}`).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newsForm.category,
      summaryEn: newsForm.summaryEn || newsForm.contentEn.substring(0, 120),
      summaryUr: newsForm.summaryUr || newsForm.contentUr.substring(0, 120),
      contentEn: newsForm.contentEn || newsForm.summaryEn,
      contentUr: newsForm.contentUr || newsForm.summaryUr,
      featuredImage: newsForm.featuredImage,
      date: newsForm.date,
      isPublished: true,
    };

    const updatedNews = [newItem, ...currentNews];
    try {
      const res = await fetch('/api/admin/news', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ news: updatedNews }),
      });
      if (res.ok) {
        showToast('Announcement published successfully!', 'success');
        setIsAddNewsOpen(false);
        setNewsForm({
          titleEn: '',
          titleUr: '',
          category: 'Admissions',
          summaryEn: '',
          summaryUr: '',
          contentEn: '',
          contentUr: '',
          featuredImage: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=80',
          date: new Date().toISOString().split('T')[0],
        });
        refreshData();
      } else {
        showToast('Failed to publish announcement', 'error');
      }
    } catch {
      showToast('Network error publishing announcement', 'error');
    }
  };

  const handleDeleteNews = async (id: string) => {
    const updatedNews = (data?.news || []).filter((n) => n.id !== id);
    try {
      await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const res = await fetch('/api/admin/news', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ news: updatedNews }),
      });
      if (res.ok) {
        showToast('Announcement removed', 'info');
        refreshData();
      }
    } catch {
      showToast('Network error deleting announcement', 'error');
    }
  };

  // --- MOSQUE PROJECTS CRUD ---
  const handleAddMosque = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mosqueForm.nameEn && !mosqueForm.nameUr) {
      showToast('Please enter mosque project name', 'error');
      return;
    }
    const currentProjects = data?.mosqueProjects || [];
    const progress = Math.min(100, Math.round((mosqueForm.amountRaisedPkr / (mosqueForm.requiredFundingPkr || 1)) * 100));
    
    const newProject: MosqueProject = {
      id: `mosque-${Date.now()}`,
      nameEn: mosqueForm.nameEn || mosqueForm.nameUr,
      nameUr: mosqueForm.nameUr || mosqueForm.nameEn,
      locationEn: mosqueForm.locationEn || 'Sargodha District',
      locationUr: mosqueForm.locationUr || 'ضلع سرگودھا',
      descriptionEn: mosqueForm.descriptionEn || 'Construction and beautification of central community mosque.',
      descriptionUr: mosqueForm.descriptionUr || 'اہلِ علاقہ کے لیے جامع مسجد کی جدید و پروقار تعمیر۔',
      constructionStatus: (mosqueForm.constructionStatus as any) || 'Structure',
      progressPercentage: progress,
      requiredFundingPkr: Number(mosqueForm.requiredFundingPkr) || 5000000,
      amountRaisedPkr: Number(mosqueForm.amountRaisedPkr) || 0,
      images: [mosqueForm.imageUrl],
      contactPerson: mosqueForm.contactPerson,
      contactPhone: mosqueForm.contactPhone,
      updates: [
        {
          date: new Date().toISOString().split('T')[0],
          titleEn: 'Project Initiated',
          titleUr: 'منصوبے کا باقاعدہ آغاز',
          noteEn: 'Land earmarked and architectural layout finalized.',
          noteUr: 'تعمیراتی کام کا ڈیزائن مکمل اور فنڈز کا حصول جاری ہے۔'
        }
      ]
    };

    const updated = [newProject, ...currentProjects];
    try {
      const res = await fetch('/api/admin/mosque-projects', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ projects: updated }),
      });
      if (res.ok) {
        showToast('Mosque project added successfully!', 'success');
        setIsAddMosqueOpen(false);
        refreshData();
      } else {
        showToast('Failed to add mosque project', 'error');
      }
    } catch {
      showToast('Network error adding mosque project', 'error');
    }
  };

  const handleDeleteMosque = async (id: string) => {
    const updated = (data?.mosqueProjects || []).filter((m) => m.id !== id);
    try {
      await fetch(`/api/admin/mosque-projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const res = await fetch('/api/admin/mosque-projects', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ projects: updated }),
      });
      if (res.ok) {
        showToast('Mosque project removed', 'info');
        refreshData();
      }
    } catch {
      showToast('Network error deleting mosque project', 'error');
    }
  };

  // --- WELFARE PROJECTS CRUD ---
  const handleAddWelfare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!welfareForm.titleEn && !welfareForm.titleUr) {
      showToast('Please enter welfare project title', 'error');
      return;
    }
    const current = data?.welfareProjects || [];
    const newWelfare: WelfareProject = {
      id: `welfare-${Date.now()}`,
      titleEn: welfareForm.titleEn || welfareForm.titleUr,
      titleUr: welfareForm.titleUr || welfareForm.titleEn,
      category: welfareForm.category,
      categoryEn: welfareForm.categoryEn || 'Community Aid',
      descriptionEn: welfareForm.descriptionEn || 'Welfare assistance for underprivileged households.',
      descriptionUr: welfareForm.descriptionUr || 'مستحق و نادار خاندانوں کی مسلسل معاونت کا فلاحی پروگرام۔',
      locationEn: welfareForm.locationEn,
      locationUr: welfareForm.locationUr,
      date: new Date().toISOString().split('T')[0],
      status: welfareForm.status,
      beneficiariesCount: Number(welfareForm.beneficiariesCount) || 100,
      images: [welfareForm.imageUrl],
      featured: true,
    } as any;

    const updated = [newWelfare, ...current];
    try {
      const res = await fetch('/api/admin/welfare-projects', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ projects: updated }),
      });
      if (res.ok) {
        showToast('Welfare initiative added successfully!', 'success');
        setIsAddWelfareOpen(false);
        refreshData();
      } else {
        showToast('Failed to add welfare project', 'error');
      }
    } catch {
      showToast('Network error adding welfare project', 'error');
    }
  };

  const handleDeleteWelfare = async (id: string) => {
    const updated = (data?.welfareProjects || []).filter((w) => w.id !== id);
    try {
      await fetch(`/api/admin/welfare-projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const res = await fetch('/api/admin/welfare-projects', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ projects: updated }),
      });
      if (res.ok) {
        showToast('Welfare project removed', 'info');
        refreshData();
      }
    } catch {
      showToast('Network error deleting welfare project', 'error');
    }
  };

  // --- BOOKS LIBRARY CRUD ---
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookForm.title && !bookForm.titleUr) {
      showToast('Please enter book title', 'error');
      return;
    }
    const current = data?.books || [];
    const newBook: Book = {
      id: `book-${Date.now()}`,
      title: bookForm.title || bookForm.titleUr,
      titleUr: bookForm.titleUr || bookForm.title,
      author: bookForm.author || 'Hazrat Allama',
      category: bookForm.category,
      description: bookForm.description || 'Authentic Islamic treatise published for scholars and students.',
      coverImage: bookForm.coverImage,
      fileUrl: bookForm.fileUrl,
      fileSizeMb: Number(bookForm.fileSizeMb) || 10,
      pages: Number(bookForm.pages) || 200,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      isPublished: true,
    };

    const updated = [newBook, ...current];
    try {
      const res = await fetch('/api/admin/books', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ books: updated }),
      });
      if (res.ok) {
        showToast('New book added to library!', 'success');
        setIsAddBookOpen(false);
        setBookForm({
          title: '',
          titleUr: '',
          author: '',
          category: 'Fiqh',
          description: '',
          coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
          fileUrl: '/books/sample.pdf',
          fileSizeMb: 12,
          pages: 280,
        });
        refreshData();
      } else {
        showToast('Failed to add book', 'error');
      }
    } catch {
      showToast('Network error adding book', 'error');
    }
  };

  const handleDeleteBook = async (id: string) => {
    const updated = (data?.books || []).filter((b) => b.id !== id);
    try {
      await fetch(`/api/admin/books/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const res = await fetch('/api/admin/books', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ books: updated }),
      });
      if (res.ok) {
        showToast('Book removed from library', 'info');
        refreshData();
      }
    } catch {
      showToast('Network error deleting book', 'error');
    }
  };

  // --- GALLERY CRUD ---
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.imageUrl) {
      showToast('Please provide an image URL or upload a photo', 'error');
      return;
    }
    const current = data?.gallery || [];
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      titleEn: galleryForm.titleEn || `${galleryForm.category} Photo`,
      titleUr: galleryForm.titleUr || galleryForm.titleEn,
      category: galleryForm.category as any,
      imageUrl: galleryForm.imageUrl,
      date: galleryForm.date,
      description: galleryForm.description,
    };

    const updated = [newItem, ...current];
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ gallery: updated }),
      });
      if (res.ok) {
        showToast('Gallery image added successfully!', 'success');
        setIsAddGalleryOpen(false);
        setGalleryForm({
          titleEn: '',
          titleUr: '',
          category: 'Campus',
          imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=80',
          description: '',
          date: new Date().toISOString().split('T')[0],
        });
        refreshData();
      } else {
        showToast('Failed to add gallery image', 'error');
      }
    } catch {
      showToast('Network error adding gallery image', 'error');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    const updated = (data?.gallery || []).filter((g) => g.id !== id);
    try {
      await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const res = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ gallery: updated }),
      });
      if (res.ok) {
        showToast('Gallery item removed', 'info');
        refreshData();
      }
    } catch {
      showToast('Network error deleting gallery item', 'error');
    }
  };

  // If not logged in, show editorial login screen
  if (!isAdmin) {
    return (
      <div className="bg-[#FDFBF7] min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white border border-[#E5E1D8] border-t-4 border-t-[#065F46] max-w-md w-full p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#065F46] text-white rounded-full flex items-center justify-center mx-auto font-serif font-bold text-xl">
              D
            </div>
            <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-widest block">
              Administrative Control Panel
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#111827]">
              Darul Uloom CMS Login
            </h2>
            <p className="text-xs text-[#6B7280]">
              Sign in to manage announcements, mosque projects, books library, welfare & matbakh, and media assets.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="admin"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#4B5563] block mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#065F46] hover:bg-[#044E39] text-white py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoggingIn ? 'Authenticating...' : 'Sign In to Portal'}</span>
            </button>
          </form>

          {/* Quick Credential Hint Box */}
          <div className="bg-[#F8F9F5] border border-[#E5E1D8] p-3 text-[11px] text-gray-600 space-y-1">
            <div className="font-bold text-[#065F46] uppercase tracking-wider text-[10px]">Default Admin Credentials:</div>
            <div>Username: <code className="font-bold text-gray-900">admin</code></div>
            <div>Password: <code className="font-bold text-gray-900">password123</code></div>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Admin Dashboard
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-[#111827] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-4 border-[#D97706]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#065F46] rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl">
              D
            </div>
            <div>
              <div className="text-[10px] text-[#D97706] font-bold uppercase tracking-widest">
                Darul Uloom CMS Dashboard
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                Management Portal
              </h1>
              <p className="text-xs text-gray-400">
                Nawab Colony, Sargodha, Pakistan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-[#1F2937] hover:bg-gray-700 text-gray-300 px-4 py-2 text-xs font-bold uppercase tracking-widest border border-gray-700 transition-colors flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="bg-red-900/40 hover:bg-red-800 text-red-200 px-4 py-2 text-xs font-bold uppercase tracking-widest border border-red-800 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E1D8]">
          {[
            { id: 'overview', label: 'Overview & Stats', icon: LayoutDashboard },
            { id: 'account', label: 'Admin Credentials', icon: Key },
            { id: 'branding', label: 'Colors & Branding', icon: Palette },
            { id: 'page-backgrounds', label: 'Page Backgrounds', icon: Images },
            { id: 'qurbani', label: 'Qurbani & Sacrificial Animals', icon: Flame },
            { id: 'zakat', label: 'Zakat & Quranic Notes', icon: BookOpen },
            { id: 'banks', label: 'Bank & Mobile Accounts', icon: Landmark },
            { id: 'events', label: 'Events & 14 August', icon: Calendar },
            { id: 'faculty', label: 'Faculty & Leadership', icon: Award },
            { id: 'pillars', label: 'Foundational Pillars', icon: Compass },
            { id: 'education', label: 'Courses & Curriculum', icon: GraduationCap },
            { id: 'matbakh', label: 'Matbakh Free Food', icon: UtensilsCrossed },
            { id: 'students', label: 'Students Roster', icon: Users },
            { id: 'news', label: 'News & Announcements', icon: Newspaper },
            { id: 'mosques', label: 'Mosque Projects', icon: Building2 },
            { id: 'welfare', label: 'Welfare Projects', icon: HeartHandshake },
            { id: 'books', label: 'Books Library', icon: BookOpen },
            { id: 'gallery', label: 'Media Gallery', icon: Images },
            { id: 'settings', label: 'Contact & Socials', icon: Settings },
            { id: 'messages', label: 'Inquiries Inbox', icon: Mail },
            { id: 'feedback', label: 'Website Feedback', icon: MessageSquareHeart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#065F46] text-white border-[#065F46]'
                    : 'bg-white text-[#4B5563] border-[#E5E1D8] hover:border-[#065F46] hover:text-[#065F46]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 0: ADMIN ACCOUNT CREDENTIALS */}
        {activeTab === 'account' && <AdminAccountTab />}

        {/* TAB 1: OVERVIEW & METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-5">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Students</div>
                <div className="text-3xl font-serif font-bold text-[#065F46] mt-1">{data?.stats.studentsEnrolled || 500}+</div>
                <div className="text-[10px] text-gray-400 mt-1">100% Free Boarding</div>
              </div>
              <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#D97706] p-5">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Huffaz Graduated</div>
                <div className="text-3xl font-serif font-bold text-[#D97706] mt-1">{data?.stats.graduatedHuffaz || 1200}+</div>
                <div className="text-[10px] text-gray-400 mt-1">Since Establishment</div>
              </div>
              <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-5">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Mosque Projects</div>
                <div className="text-3xl font-serif font-bold text-[#065F46] mt-1">{data?.mosqueProjects.length || 12}</div>
                <div className="text-[10px] text-gray-400 mt-1">Sargodha & Suburbs</div>
              </div>
              <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#111827] p-5">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Books in Library</div>
                <div className="text-3xl font-serif font-bold text-[#111827] mt-1">{data?.books.length || 8}</div>
                <div className="text-[10px] text-gray-400 mt-1">Digital PDF Downloads</div>
              </div>
            </div>

            {/* Edit Key Statistics Card */}
            <div className="bg-white border border-[#E5E1D8] p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#111827]">Live Public Statistics</h3>
                  <p className="text-xs text-gray-500">These numbers reflect directly on the homepage and banners.</p>
                </div>
                <button
                  onClick={handleSaveStats}
                  className="bg-[#065F46] hover:bg-[#044E39] text-white px-5 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Numbers</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Students Enrolled</label>
                  <input
                    type="number"
                    value={statsForm.studentsEnrolled}
                    onChange={(e) => setStatsForm({ ...statsForm, studentsEnrolled: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Graduated Huffaz</label>
                  <input
                    type="number"
                    value={statsForm.graduatedHuffaz}
                    onChange={(e) => setStatsForm({ ...statsForm, graduatedHuffaz: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Graduated Ulama</label>
                  <input
                    type="number"
                    value={statsForm.graduatedUlama}
                    onChange={(e) => setStatsForm({ ...statsForm, graduatedUlama: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Mosques Constructed</label>
                  <input
                    type="number"
                    value={statsForm.mosquesConstructed}
                    onChange={(e) => setStatsForm({ ...statsForm, mosquesConstructed: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Years of Service</label>
                  <input
                    type="number"
                    value={statsForm.yearsOfService}
                    onChange={(e) => setStatsForm({ ...statsForm, yearsOfService: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Qurbani Beneficiaries (Households)</label>
                  <input
                    type="number"
                    value={statsForm.qurbaniServedHouseholds}
                    onChange={(e) => setStatsForm({ ...statsForm, qurbaniServedHouseholds: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WEBSITE BRANDING & COLORS */}
        {activeTab === 'branding' && <AdminBrandingTab />}

        {/* TAB 2B: PAGE-SPECIFIC BACKGROUNDS */}
        {activeTab === 'page-backgrounds' && <AdminPageBackgroundsTab />}

        {/* TAB 2C: QURBANI & SACRIFICIAL ANIMAL PACKAGES */}
        {activeTab === 'qurbani' && <AdminQurbaniTab />}

        {/* TAB 2D: ZAKAT CALCULATOR & QURANIC / HADITH NOTES */}
        {activeTab === 'zakat' && <AdminZakatTab />}

        {/* TAB 3: BANK & MOBILE FINANCIAL ACCOUNTS */}
        {activeTab === 'banks' && <AdminBankAccountsTab />}

        {/* TAB 4: EVENTS & 14 AUGUST / MEHFIL MANAGEMENT */}
        {activeTab === 'events' && <AdminEventsTab />}

        {/* TAB 5: FACULTY & LEADERSHIP EDITING */}
        {activeTab === 'faculty' && <AdminFacultyTab />}

        {/* TAB 6: FOUNDATIONAL PILLARS & PRINCIPLES */}
        {activeTab === 'pillars' && <AdminPillarsTab />}

        {/* TAB 7: EDUCATIONAL PROGRAMS & COURSES */}
        {activeTab === 'education' && <AdminEducationTab />}

        {/* TAB 8: MATBAKH-E-GHOUSIA FREE FOOD PROGRAM */}
        {activeTab === 'matbakh' && <AdminFoodProgramTab />}

        {/* TAB 9: STUDENTS ROSTER */}
        {activeTab === 'students' && <AdminStudentsTab />}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-white border border-[#E5E1D8] p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#111827]">Institutional Contact & Details</h3>
                <p className="text-xs text-gray-500">Control phone numbers, physical address, and official links.</p>
              </div>
              <button
                type="submit"
                className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Institution Name (English)</label>
                <input
                  type="text"
                  value={settingsForm.institutionNameEn}
                  onChange={(e) => setSettingsForm({ ...settingsForm, institutionNameEn: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Institution Name (Urdu)</label>
                <input
                  type="text"
                  value={settingsForm.institutionNameUr}
                  onChange={(e) => setSettingsForm({ ...settingsForm, institutionNameUr: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Primary Phone</label>
                <input
                  type="text"
                  value={settingsForm.phone1}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone1: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Secondary Phone</label>
                <input
                  type="text"
                  value={settingsForm.phone2}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone2: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Official Email</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Address (English)</label>
                <input
                  type="text"
                  value={settingsForm.addressEn}
                  onChange={(e) => setSettingsForm({ ...settingsForm, addressEn: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Address (Urdu)</label>
                <input
                  type="text"
                  value={settingsForm.addressUr}
                  onChange={(e) => setSettingsForm({ ...settingsForm, addressUr: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Official Facebook Page URL</label>
                <input
                  type="text"
                  value={settingsForm.facebookUrl}
                  onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div className="bg-white border border-[#E5E1D8] p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#111827]">Incoming Inquiries & Admissions Messages</h3>
                <p className="text-xs text-gray-500">Messages submitted through the public Contact page.</p>
              </div>
              <button
                onClick={fetchMessages}
                className="text-xs font-bold text-[#065F46] uppercase tracking-widest hover:underline"
              >
                Refresh Messages
              </button>
            </div>

            {loadingMessages ? (
              <div className="py-12 text-center text-xs text-gray-500">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-500">No contact messages received yet.</div>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-5 border transition-all ${
                      m.isRead 
                        ? 'bg-white border-[#E5E1D8]' 
                        : 'bg-[#FDFBF7] border-[#065F46] border-l-4'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#111827] text-sm">{m.name}</span>
                        <span className="text-[10px] text-gray-400">({m.phone || m.email})</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{new Date(m.date).toLocaleString()}</span>
                        <button
                          onClick={() => handleDeleteMessage(m.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[#D97706] mb-1">{m.subject}</div>
                    <p className="text-xs text-[#4B5563] leading-relaxed bg-[#F8F9F5] p-3 border border-[#E5E1D8]">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3B: WEBSITE FEEDBACK */}
        {activeTab === 'feedback' && (
          <AdminFeedbackTab />
        )}

        {/* TAB 4: NEWS & ANNOUNCEMENTS (WITH ADD OPTION) */}
        {activeTab === 'news' && (
          <div className="bg-white border border-[#E5E1D8] p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E1D8] pb-4 gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#111827]">Published Announcements & News</h3>
                <p className="text-xs text-gray-500">Publish admissions bulletins, exam notices, and event updates.</p>
              </div>
              <button
                onClick={() => setIsAddNewsOpen(true)}
                className="bg-[#065F46] hover:bg-[#044E39] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shrink-0 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Announcement</span>
              </button>
            </div>

            <div className="space-y-4">
              {data?.news && data.news.length > 0 ? (
                data.news.map((n) => (
                  <div key={n.id} className="p-5 border border-[#E5E1D8] bg-[#FDFBF7] space-y-3 relative group">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="font-bold text-[#D97706] uppercase tracking-wider bg-white px-2 py-0.5 border border-[#E5E1D8]">
                            {n.category}
                          </span>
                          <span>{n.date}</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#111827] mt-1">
                          {n.titleEn} / <span className="font-urdu">{n.titleUr}</span>
                        </h4>
                      </div>
                      <button
                        onClick={() => handleDeleteNews(n.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 bg-white border border-[#E5E1D8]"
                        title="Delete announcement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {n.contentEn || n.summaryEn}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400 text-xs">
                  No announcements published yet. Click "Publish New Announcement" above.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: BANK & FINANCIAL ACCOUNTS */}
        {activeTab === 'banks' && <AdminBankAccountsTab />}

        {/* TAB 4: STUDENTS DIRECTORY & ROSTER MANAGEMENT */}
        {activeTab === 'students' && <AdminStudentsTab />}

        {/* TAB 6: MOSQUE PROJECTS (WITH ADD OPTION) */}
        {activeTab === 'mosques' && (
          <div className="bg-white border border-[#E5E1D8] p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E1D8] pb-4 gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#111827]">Mosque Construction Projects</h3>
                <p className="text-xs text-gray-500">Manage designs, locations, fundraising targets, and construction progress.</p>
              </div>
              <button
                onClick={() => setIsAddMosqueOpen(true)}
                className="bg-[#065F46] hover:bg-[#044E39] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shrink-0 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Mosque Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data?.mosqueProjects.map((m) => {
                const status = m.constructionStatus || (m as any).status || 'In Progress';
                const raised = m.amountRaisedPkr ?? (m as any).collectedPkr ?? 0;
                const target = m.requiredFundingPkr ?? (m as any).estimatedCostPkr ?? 1;
                const percent = Math.min(100, Math.round((raised / target) * 100));
                const img = m.images?.[0] || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=800&auto=format&fit=crop&q=80';

                return (
                  <div key={m.id} className="border border-[#E5E1D8] bg-white overflow-hidden space-y-3 flex flex-col justify-between">
                    <div className="h-44 bg-gray-100 relative overflow-hidden">
                      <img src={img} alt={m.nameEn} className="w-full h-full object-cover" />
                      <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest bg-emerald-900 text-white px-2.5 py-1">
                        {status}
                      </span>
                    </div>

                    <div className="p-5 space-y-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#111827]">{m.nameEn}</h4>
                          <p className="text-xs text-gray-500 font-urdu">{m.nameUr} • {m.locationEn}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteMosque(m.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete mosque project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {m.descriptionEn}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-[#E5E1D8]">
                        <div className="flex justify-between text-xs font-mono font-bold text-[#065F46]">
                          <span>Raised: PKR {raised.toLocaleString()}</span>
                          <span>Target: PKR {target.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-[#E5E1D8] h-2">
                          <div className="bg-[#065F46] h-full" style={{ width: `${percent}%` }}></div>
                        </div>
                        <div className="text-[10px] text-gray-500 text-right">{percent}% Funded</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 7: WELFARE & MATBAKH (DUAL SUB-TABS) */}
        {activeTab === 'welfare' && (
          <div className="bg-white border border-[#E5E1D8] p-8 space-y-6">
            
            {/* Sub-tab navigation */}
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWelfareSubTab('projects')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                    welfareSubTab === 'projects'
                      ? 'bg-[#111827] text-white border-[#111827]'
                      : 'bg-white text-gray-600 border-[#E5E1D8] hover:border-[#065F46]'
                  }`}
                >
                  Welfare Initiatives
                </button>
                <button
                  onClick={() => setWelfareSubTab('matbakh')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                    welfareSubTab === 'matbakh'
                      ? 'bg-[#111827] text-white border-[#111827]'
                      : 'bg-white text-gray-600 border-[#E5E1D8] hover:border-[#065F46]'
                  }`}
                >
                  Matbakh (Daily Food Program)
                </button>
              </div>

              {welfareSubTab === 'projects' && (
                <button
                  onClick={() => setIsAddWelfareOpen(true)}
                  className="bg-[#065F46] hover:bg-[#044E39] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shrink-0 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Welfare Project</span>
                </button>
              )}
            </div>

            {/* Sub-tab: Welfare Projects */}
            {welfareSubTab === 'projects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.welfareProjects.map((w) => (
                  <div key={w.id} className="border border-[#E5E1D8] bg-white p-5 space-y-3 flex flex-col justify-between border-l-4 border-l-[#D97706]">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] bg-[#F8F9F5] px-2 py-0.5 border border-[#E5E1D8]">
                          {w.categoryEn || w.category}
                        </span>
                        <button
                          onClick={() => handleDeleteWelfare(w.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete welfare project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#111827]">{w.titleEn}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{w.descriptionEn}</p>
                    </div>

                    <div className="pt-3 border-t border-[#E5E1D8] flex justify-between items-center text-xs text-gray-500">
                      <span>Beneficiaries: <strong className="text-gray-900">{w.beneficiariesCount}+</strong></span>
                      <span className="text-[10px] font-bold uppercase text-[#065F46]">{w.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-tab: Matbakh Form */}
            {welfareSubTab === 'matbakh' && (
              <form onSubmit={handleSaveMatbakh} className="space-y-6 max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                      Matbakh Title (English)
                    </label>
                    <input
                      type="text"
                      value={matbakhForm.titleEn}
                      onChange={(e) => setMatbakhForm({ ...matbakhForm, titleEn: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                      Matbakh Title (Urdu)
                    </label>
                    <input
                      type="text"
                      value={matbakhForm.titleUr}
                      onChange={(e) => setMatbakhForm({ ...matbakhForm, titleUr: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                      Daily Fresh Meals Served
                    </label>
                    <input
                      type="number"
                      value={matbakhForm.dailyMealsCount}
                      onChange={(e) => setMatbakhForm({ ...matbakhForm, dailyMealsCount: parseInt(e.target.value) || 0 })}
                      className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                      Monthly Cost per Student (PKR)
                    </label>
                    <input
                      type="number"
                      value={matbakhForm.monthlyCostPerStudentPkr}
                      onChange={(e) => setMatbakhForm({ ...matbakhForm, monthlyCostPerStudentPkr: parseInt(e.target.value) || 0 })}
                      className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                      Description (English)
                    </label>
                    <textarea
                      rows={3}
                      value={matbakhForm.descriptionEn}
                      onChange={(e) => setMatbakhForm({ ...matbakhForm, descriptionEn: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                      Description (Urdu)
                    </label>
                    <textarea
                      rows={3}
                      value={matbakhForm.descriptionUr}
                      onChange={(e) => setMatbakhForm({ ...matbakhForm, descriptionUr: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Matbakh Settings</span>
                </button>
              </form>
            )}

          </div>
        )}

        {/* TAB 8: BOOKS LIBRARY (WITH UPLOAD OPTION) */}
        {activeTab === 'books' && (
          <div className="bg-white border border-[#E5E1D8] p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E1D8] pb-4 gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#111827]">Digital Islamic Library</h3>
                <p className="text-xs text-gray-500">Upload books, Fiqh manuals, and scholarly publications.</p>
              </div>
              <button
                onClick={() => setIsAddBookOpen(true)}
                className="bg-[#065F46] hover:bg-[#044E39] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shrink-0 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Book</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.books.map((b) => (
                <div key={b.id} className="border border-[#E5E1D8] bg-white p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-[#D97706] font-bold uppercase bg-[#F8F9F5] px-2 py-0.5 border border-[#E5E1D8]">
                        {b.category || (b as any).categoryEn}
                      </span>
                      <button
                        onClick={() => handleDeleteBook(b.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete book"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#111827]">{b.title || (b as any).titleEn}</h4>
                    <div className="text-xs text-gray-500 font-urdu">{b.titleUr || (b as any).titleUr}</div>
                    <div className="text-xs text-gray-600">Author: {b.author || (b as any).authorEn}</div>
                    <p className="text-xs text-gray-500 line-clamp-2">{b.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-xs text-gray-500">
                    <span>{b.pages || 250} Pages</span>
                    <span className="font-mono text-[10px] text-[#065F46] font-bold">{b.fileSizeMb || 15} MB PDF</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: GALLERY (WITH UPLOAD OPTION) */}
        {activeTab === 'gallery' && (
          <div className="bg-white border border-[#E5E1D8] p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E1D8] pb-4 gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#111827]">Media Gallery Management</h3>
                <p className="text-xs text-gray-500">Upload photos of campus, student life, charity distributions, and projects.</p>
              </div>
              <button
                onClick={() => setIsAddGalleryOpen(true)}
                className="bg-[#065F46] hover:bg-[#044E39] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shrink-0 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.gallery.map((g) => (
                <div key={g.id} className="border border-[#E5E1D8] bg-white overflow-hidden space-y-2 p-2 relative group">
                  <div className="h-36 bg-gray-100 overflow-hidden relative">
                    <img src={g.imageUrl} alt={g.titleEn} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDeleteGallery(g.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 shadow-md opacity-90 hover:opacity-100"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[10px] font-bold text-[#065F46] uppercase">{g.category || ''}</div>
                  <div className="text-xs font-serif font-bold text-[#111827] truncate">{g.titleEn}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD ANNOUNCEMENT */}
      {/* ========================================================================= */}
      {isAddNewsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] border-t-4 border-t-[#065F46] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E5E1D8] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706]">CMS Publishing</span>
                <h3 className="text-xl font-serif font-bold text-[#111827]">Publish New Announcement</h3>
              </div>
              <button onClick={() => setIsAddNewsOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNews} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newsForm.titleEn}
                    onChange={(e) => setNewsForm({ ...newsForm, titleEn: e.target.value })}
                    placeholder="e.g. Annual Admissions 2024-2025 Open"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Title (Urdu) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newsForm.titleUr}
                    onChange={(e) => setNewsForm({ ...newsForm, titleUr: e.target.value })}
                    placeholder="سالانہ داخلوں کا آغاز"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Category
                  </label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Examinations">Examinations</option>
                    <option value="Convocation">Convocation / Dastar-e-Fazilat</option>
                    <option value="Welfare">Welfare & Relief</option>
                    <option value="Events">Events & Conferences</option>
                    <option value="General">General Notice</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Summary / Excerpt (English)
                </label>
                <textarea
                  rows={2}
                  value={newsForm.summaryEn}
                  onChange={(e) => setNewsForm({ ...newsForm, summaryEn: e.target.value })}
                  placeholder="Brief summary for preview cards..."
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Full Announcement Content (English / Urdu)
                </label>
                <textarea
                  rows={4}
                  required
                  value={newsForm.contentEn}
                  onChange={(e) => setNewsForm({ ...newsForm, contentEn: e.target.value })}
                  placeholder="Complete text of the announcement..."
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Banner Image URL or Local Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newsForm.featuredImage}
                    onChange={(e) => setNewsForm({ ...newsForm, featuredImage: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                  <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-xs font-bold uppercase tracking-wider border border-[#E5E1D8] cursor-pointer shrink-0 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], (url) => setNewsForm((prev) => ({ ...prev, featuredImage: url })));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E1D8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddNewsOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD MOSQUE PROJECT */}
      {/* ========================================================================= */}
      {isAddMosqueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] border-t-4 border-t-[#065F46] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E5E1D8] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706]">Construction CMS</span>
                <h3 className="text-xl font-serif font-bold text-[#111827]">Add New Mosque Project</h3>
              </div>
              <button onClick={() => setIsAddMosqueOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMosque} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Mosque Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={mosqueForm.nameEn}
                    onChange={(e) => setMosqueForm({ ...mosqueForm, nameEn: e.target.value })}
                    placeholder="e.g. Jamia Masjid Ghousia"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Mosque Name (Urdu) *
                  </label>
                  <input
                    type="text"
                    required
                    value={mosqueForm.nameUr}
                    onChange={(e) => setMosqueForm({ ...mosqueForm, nameUr: e.target.value })}
                    placeholder="جامع مسجد غوثیہ"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Location (English)
                  </label>
                  <input
                    type="text"
                    value={mosqueForm.locationEn}
                    onChange={(e) => setMosqueForm({ ...mosqueForm, locationEn: e.target.value })}
                    placeholder="e.g. Kot Momin Road, Sargodha"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Location (Urdu)
                  </label>
                  <input
                    type="text"
                    value={mosqueForm.locationUr}
                    onChange={(e) => setMosqueForm({ ...mosqueForm, locationUr: e.target.value })}
                    placeholder="کوٹ مومن روڈ، سرگودھا"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Estimated Cost / Target (PKR)
                  </label>
                  <input
                    type="number"
                    value={mosqueForm.requiredFundingPkr}
                    onChange={(e) => setMosqueForm({ ...mosqueForm, requiredFundingPkr: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Amount Collected So Far (PKR)
                  </label>
                  <input
                    type="number"
                    value={mosqueForm.amountRaisedPkr}
                    onChange={(e) => setMosqueForm({ ...mosqueForm, amountRaisedPkr: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Construction Status
                  </label>
                  <select
                    value={mosqueForm.constructionStatus}
                    onChange={(e) => setMosqueForm({ ...mosqueForm, constructionStatus: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  >
                    <option value="Planning">Planning & Land Demarcation</option>
                    <option value="Foundation">Foundation & Pillars</option>
                    <option value="Structure">Structure & Roof Slab</option>
                    <option value="Finishing">Finishing & Dome Work</option>
                    <option value="Completed">Completed & Functional</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Contact Person & Phone
                  </label>
                  <input
                    type="text"
                    value={mosqueForm.contactPhone}
                    onChange={(e) => setMosqueForm({ ...mosqueForm, contactPhone: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Design & Mosque Photo URL / Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mosqueForm.imageUrl}
                    onChange={(e) => setMosqueForm({ ...mosqueForm, imageUrl: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                  <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-xs font-bold uppercase tracking-wider border border-[#E5E1D8] cursor-pointer shrink-0 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], (url) => setMosqueForm((prev) => ({ ...prev, imageUrl: url })));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Project Details & Dimensions (English)
                </label>
                <textarea
                  rows={3}
                  value={mosqueForm.descriptionEn}
                  onChange={(e) => setMosqueForm({ ...mosqueForm, descriptionEn: e.target.value })}
                  placeholder="Capacity, prayer hall area, ablution facilities..."
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E1D8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddMosqueOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest"
                >
                  Save Mosque Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD WELFARE PROJECT */}
      {/* ========================================================================= */}
      {isAddWelfareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] border-t-4 border-t-[#D97706] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E5E1D8] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706]">Welfare & Relief</span>
                <h3 className="text-xl font-serif font-bold text-[#111827]">Add Welfare Initiative</h3>
              </div>
              <button onClick={() => setIsAddWelfareOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWelfare} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Initiative Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={welfareForm.titleEn}
                    onChange={(e) => setWelfareForm({ ...welfareForm, titleEn: e.target.value })}
                    placeholder="e.g. Winter Blanket & Warm Clothing Drive"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Initiative Title (Urdu) *
                  </label>
                  <input
                    type="text"
                    required
                    value={welfareForm.titleUr}
                    onChange={(e) => setWelfareForm({ ...welfareForm, titleUr: e.target.value })}
                    placeholder="سرمائی کمبل و گرم ملبوسات کی تقسیم"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Category
                  </label>
                  <select
                    value={welfareForm.category}
                    onChange={(e) => setWelfareForm({ ...welfareForm, category: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  >
                    <option value="food">Ration & Food Distribution</option>
                    <option value="financial">Orphan & Widow Monthly Stipend</option>
                    <option value="education">Free Books & Uniforms</option>
                    <option value="emergency">Clean Water Plant & Emergency Relief</option>
                    <option value="general">Community Welfare</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Target Beneficiaries Count
                  </label>
                  <input
                    type="number"
                    value={welfareForm.beneficiariesCount}
                    onChange={(e) => setWelfareForm({ ...welfareForm, beneficiariesCount: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Photo URL or Local Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={welfareForm.imageUrl}
                    onChange={(e) => setWelfareForm({ ...welfareForm, imageUrl: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                  <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-xs font-bold uppercase tracking-wider border border-[#E5E1D8] cursor-pointer shrink-0 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], (url) => setWelfareForm((prev) => ({ ...prev, imageUrl: url })));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Description (English)
                </label>
                <textarea
                  rows={3}
                  value={welfareForm.descriptionEn}
                  onChange={(e) => setWelfareForm({ ...welfareForm, descriptionEn: e.target.value })}
                  placeholder="Target area, package contents, distribution timeline..."
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E1D8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddWelfareOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest"
                >
                  Add Welfare Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: UPLOAD / ADD NEW BOOK */}
      {/* ========================================================================= */}
      {isAddBookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] border-t-4 border-t-[#111827] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E5E1D8] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#065F46]">Digital Library</span>
                <h3 className="text-xl font-serif font-bold text-[#111827]">Upload Book to Digital Library</h3>
              </div>
              <button onClick={() => setIsAddBookOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBook} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Book Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookForm.title}
                    onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                    placeholder="e.g. Sharh Al-Aqaid Al-Nasafiyyah"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Book Title (Urdu / Arabic) *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookForm.titleUr}
                    onChange={(e) => setBookForm({ ...bookForm, titleUr: e.target.value })}
                    placeholder="شرح العقائد النسفیہ"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-urdu"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Author / Scholar
                  </label>
                  <input
                    type="text"
                    value={bookForm.author}
                    onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                    placeholder="e.g. Allama Saad al-Din al-Taftazani"
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Category
                  </label>
                  <select
                    value={bookForm.category}
                    onChange={(e) => setBookForm({ ...bookForm, category: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  >
                    <option value="Fiqh">Islamic Jurisprudence (Fiqh & Fatwa)</option>
                    <option value="Hadith">Hadith Sciences & Usul</option>
                    <option value="Quran">Quranic Exegesis (Tafseer & Tajweed)</option>
                    <option value="Arabic">Arabic Grammar & Morphology</option>
                    <option value="Islamic Studies">General Islamic Studies</option>
                    <option value="Educational">Dars-e-Nizami Curriculum</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    Total Pages
                  </label>
                  <input
                    type="number"
                    value={bookForm.pages}
                    onChange={(e) => setBookForm({ ...bookForm, pages: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                    File Size (MB)
                  </label>
                  <input
                    type="number"
                    value={bookForm.fileSizeMb}
                    onChange={(e) => setBookForm({ ...bookForm, fileSizeMb: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  PDF Download URL or Upload File
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={bookForm.fileUrl}
                    onChange={(e) => setBookForm({ ...bookForm, fileUrl: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                  <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-xs font-bold uppercase tracking-wider border border-[#E5E1D8] cursor-pointer shrink-0 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Upload PDF</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], (url) => setBookForm((prev) => ({ ...prev, fileUrl: url })));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={bookForm.coverImage}
                  onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Book Overview / Introduction
                </label>
                <textarea
                  rows={3}
                  value={bookForm.description}
                  onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                  placeholder="Summary of contents, syllabus relevance..."
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E1D8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddBookOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#111827] hover:bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest"
                >
                  Add Book to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: UPLOAD GALLERY IMAGE */}
      {/* ========================================================================= */}
      {isAddGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] border-t-4 border-t-[#065F46] max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-[#E5E1D8] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#065F46]">Media Center</span>
                <h3 className="text-xl font-serif font-bold text-[#111827]">Upload Gallery Image</h3>
              </div>
              <button onClick={() => setIsAddGalleryOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGallery} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Photo Title / Caption (English)
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.titleEn}
                  onChange={(e) => setGalleryForm({ ...galleryForm, titleEn: e.target.value })}
                  placeholder="e.g. Students in Hifz Class"
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Category / Tag
                </label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                >
                  <option value="Campus">Campus & Infrastructure</option>
                  <option value="Students">Students & Daily Routine</option>
                  <option value="Education">Classrooms & Teaching</option>
                  <option value="Matbakh">Daily Free Food (Matbakh)</option>
                  <option value="Mosque Projects">Mosque Construction</option>
                  <option value="Qurbani">Annual Qurbani Service</option>
                  <option value="Welfare">Welfare & Medical Aid</option>
                  <option value="Events">Annual Convocation</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-1">
                  Image URL or Direct Photo Upload *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={galleryForm.imageUrl}
                    onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8]"
                  />
                  <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-xs font-bold uppercase tracking-wider border border-[#E5E1D8] cursor-pointer shrink-0 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], (url) => setGalleryForm((prev) => ({ ...prev, imageUrl: url })));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {galleryForm.imageUrl && (
                <div className="h-32 bg-gray-100 overflow-hidden border border-[#E5E1D8]">
                  <img src={galleryForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="pt-4 border-t border-[#E5E1D8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddGalleryOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
