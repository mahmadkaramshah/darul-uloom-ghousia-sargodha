import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Landmark, 
  Plus, 
  Trash2, 
  Edit3, 
  Copy, 
  Check, 
  Smartphone, 
  Save, 
  X, 
  AlertCircle,
  Receipt,
  RotateCw
} from 'lucide-react';
import { BankAccount, MobilePayment, DonationPledge } from '../../types';

const POPULAR_PAK_BANKS = [
  'Meezan Bank Ltd (Islamic Banking)',
  'Bank Alfalah Islamic',
  'Habib Bank Limited (HBL Islamic)',
  'MCB Islamic Bank',
  'Allied Bank Limited (Islamic)',
  'Dubai Islamic Bank Pakistan',
  'BankIslami Pakistan Ltd',
  'Faysal Bank Islamic',
  'National Bank of Pakistan (NBP Aitemaad)',
  'United Bank Limited (UBL Ameen)',
  'Standard Chartered (Saadiq)'
];

const ACCOUNT_TYPES = [
  'General Donations & Atiyyat',
  'Zakat & Sadaqah Fund',
  'Student Food & Matbakh (Langar)',
  'Student Education & Sponsorship',
  'Mosque Construction & Maintenance',
  'Foreign Currency / Overseas Wire Remittance',
  'Qurbani & Sacrificial Fund'
];

export const AdminBankAccountsTab: React.FC = () => {
  const { data, setData, adminToken, showToast, refreshData } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Bank Account Modal States
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [editingBankId, setEditingBankId] = useState<string | null>(null);
  const [bankForm, setBankForm] = useState<Partial<BankAccount>>({
    bankName: 'Meezan Bank Ltd (Islamic Banking)',
    accountTitle: 'Darul Uloom Muhammadiya Ghousia',
    accountNumber: '',
    iban: 'PK',
    branchName: 'Sargodha Main Branch',
    branchCode: '0201',
    swiftCode: 'MEZNPKKA',
    currency: 'PKR',
    accountType: 'General Donations & Atiyyat',
    notesEn: '',
    notesUr: '',
    isPrimary: false
  });

  // Mobile Wallet Modal States
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [mobileForm, setMobileForm] = useState<Partial<MobilePayment>>({
    provider: 'JazzCash',
    accountTitle: 'Darul Uloom M Ghousia',
    accountNumber: '',
    tillId: '',
    notes: ''
  });

  // Inline Delete Confirmation Dialog States (Replaces window.confirm)
  const [deleteConfirmBank, setDeleteConfirmBank] = useState<{ id: string; name: string } | null>(null);
  const [deleteConfirmMobile, setDeleteConfirmMobile] = useState<{ id: string; provider: string } | null>(null);
  const [deleteConfirmPledge, setDeleteConfirmPledge] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Donation Pledges State
  const [pledges, setPledges] = useState<DonationPledge[]>([]);
  const [loadingPledges, setLoadingPledges] = useState(false);
  const [pledgeSearch, setPledgeSearch] = useState('');

  const bankAccounts = data?.donationDetails?.bankAccounts || [];
  const mobilePayments = data?.donationDetails?.mobilePayments || [];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied: ' + text, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Fetch Received Donation Pledges
  const fetchPledges = async () => {
    if (!adminToken) return;
    setLoadingPledges(true);
    try {
      const res = await fetch('/api/admin/donation-pledges', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const list = await res.json();
        setPledges(list);
      }
    } catch {
      // ignore
    } finally {
      setLoadingPledges(false);
    }
  };

  useEffect(() => {
    fetchPledges();
  }, [adminToken]);

  // Open Add Bank Modal
  const handleOpenAddBank = () => {
    setEditingBankId(null);
    setBankForm({
      bankName: 'Meezan Bank Ltd (Islamic Banking)',
      accountTitle: data?.settings?.institutionNameEn || 'Darul Uloom Muhammadiya Ghousia',
      accountNumber: '',
      iban: 'PK',
      branchName: 'Sargodha Main Branch',
      branchCode: '',
      swiftCode: 'MEZNPKKA',
      currency: 'PKR',
      accountType: 'General Donations & Atiyyat',
      notesEn: 'Please share transfer confirmation on WhatsApp for official tax-exempt receipt.',
      notesUr: 'رقم منتقلی کے بعد رسید کے لیے واٹس ایپ پر اطلاع فرمائیں۔',
      isPrimary: bankAccounts.length === 0
    });
    setIsBankModalOpen(true);
  };

  // Open Edit Bank Modal
  const handleOpenEditBank = (acc: BankAccount) => {
    setEditingBankId(acc.id);
    setBankForm({ ...acc });
    setIsBankModalOpen(true);
  };

  // Save Bank Account (Add or Edit)
  const handleSaveBank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankForm.bankName || !bankForm.accountTitle || !bankForm.accountNumber || !bankForm.iban) {
      showToast('Please fill all mandatory fields (Bank, Title, Account #, IBAN)', 'error');
      return;
    }

    try {
      if (editingBankId) {
        // Edit existing
        const res = await fetch(`/api/admin/bank-accounts/${editingBankId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(bankForm)
        });

        const updatedAccounts = bankAccounts.map((b) => {
          if (b.id === editingBankId) {
            return { ...b, ...bankForm } as BankAccount;
          }
          if (bankForm.isPrimary) {
            return { ...b, isPrimary: false };
          }
          return b;
        });

        // Also update full donation details object
        await fetch('/api/admin/donation-details', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            ...data?.donationDetails,
            bankAccounts: updatedAccounts
          })
        });

        if (data && setData) {
          setData({
            ...data,
            donationDetails: {
              ...data.donationDetails,
              bankAccounts: updatedAccounts
            }
          });
        }
        showToast('Bank account details updated successfully', 'success');
        setIsBankModalOpen(false);
        refreshData();
      } else {
        // Add new bank account
        const newId = 'bank-' + Date.now();
        const newAccount: BankAccount = {
          ...bankForm,
          id: newId
        } as BankAccount;

        const updatedAccounts = bankForm.isPrimary
          ? bankAccounts.map(b => ({ ...b, isPrimary: false })).concat(newAccount)
          : [...bankAccounts, newAccount];

        // 1. Post to endpoint
        await fetch('/api/admin/bank-accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(bankForm)
        });

        // 2. Sync to full donation details
        await fetch('/api/admin/donation-details', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            ...data?.donationDetails,
            bankAccounts: updatedAccounts
          })
        });

        if (data && setData) {
          setData({
            ...data,
            donationDetails: {
              ...data.donationDetails,
              bankAccounts: updatedAccounts
            }
          });
        }
        showToast('New bank account added successfully', 'success');
        setIsBankModalOpen(false);
        refreshData();
      }
    } catch {
      showToast('Network error while saving bank account', 'error');
    }
  };

  // Delete Bank Account Handler
  const executeDeleteBank = async () => {
    if (!deleteConfirmBank) return;
    const { id } = deleteConfirmBank;
    setIsDeleting(true);

    try {
      const updatedAccounts = bankAccounts.filter((b) => b.id !== id);

      // 1. Delete on specific route
      await fetch(`/api/admin/bank-accounts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      // 2. Synchronize full donationDetails in database
      await fetch('/api/admin/donation-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          ...data?.donationDetails,
          bankAccounts: updatedAccounts
        })
      });

      // 3. Update local state
      if (data && setData) {
        setData({
          ...data,
          donationDetails: {
            ...data.donationDetails,
            bankAccounts: updatedAccounts
          }
        });
      }

      showToast(`Bank account "${deleteConfirmBank.name}" removed successfully`, 'success');
      setDeleteConfirmBank(null);
      refreshData();
    } catch {
      showToast('Error removing bank account', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Save Mobile Wallet
  const handleSaveMobile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileForm.provider || !mobileForm.accountTitle || !mobileForm.accountNumber) {
      showToast('Please fill all mandatory mobile wallet fields', 'error');
      return;
    }

    try {
      const newWallet: MobilePayment = {
        ...mobileForm,
        id: 'mob-' + Date.now()
      } as MobilePayment;

      const updatedWallets = [...mobilePayments, newWallet];

      // 1. Post to mobile-payments endpoint
      await fetch('/api/admin/mobile-payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(mobileForm)
      });

      // 2. Also synchronize full donationDetails
      await fetch('/api/admin/donation-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          ...data?.donationDetails,
          mobilePayments: updatedWallets
        })
      });

      if (data && setData) {
        setData({
          ...data,
          donationDetails: {
            ...data.donationDetails,
            mobilePayments: updatedWallets
          }
        });
      }
      showToast('Mobile payment wallet added', 'success');
      setIsMobileModalOpen(false);
      setMobileForm({
        provider: 'JazzCash',
        accountTitle: 'Darul Uloom M Ghousia',
        accountNumber: '',
        tillId: '',
        notes: ''
      });
      refreshData();
    } catch {
      showToast('Network error saving mobile wallet', 'error');
    }
  };

  // Delete Mobile Wallet Handler
  const executeDeleteMobile = async () => {
    if (!deleteConfirmMobile) return;
    const { id, provider } = deleteConfirmMobile;
    setIsDeleting(true);

    try {
      const updatedWallets = mobilePayments.filter((m) => m.id !== id);

      // 1. Delete on specific route
      await fetch(`/api/admin/mobile-payments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      // 2. Synchronize full donationDetails
      await fetch('/api/admin/donation-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          ...data?.donationDetails,
          mobilePayments: updatedWallets
        })
      });

      // 3. Update local state
      if (data && setData) {
        setData({
          ...data,
          donationDetails: {
            ...data.donationDetails,
            mobilePayments: updatedWallets
          }
        });
      }
      showToast(`${provider} mobile wallet removed successfully`, 'success');
      setDeleteConfirmMobile(null);
      refreshData();
    } catch {
      showToast('Error removing mobile wallet', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete Pledge Record Handler
  const executeDeletePledge = async () => {
    if (!deleteConfirmPledge) return;
    const id = deleteConfirmPledge;
    setIsDeleting(true);

    try {
      await fetch(`/api/admin/donation-pledges/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setPledges((prev) => prev.filter((p) => p.id !== id));
      showToast('Donation pledge record removed', 'success');
      setDeleteConfirmPledge(null);
    } catch {
      showToast('Error deleting donation record', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredPledges = pledges.filter((p) => {
    const q = pledgeSearch.toLowerCase();
    return (
      p.donorName?.toLowerCase().includes(q) ||
      p.phone?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.transactionReference?.toLowerCase().includes(q) ||
      p.currency?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Top Banner & Quick Summary */}
      <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E5E1D8] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#065F46] text-white rounded-xs">
                <Landmark className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-serif font-bold text-[#111827]">
                Official Bank Accounts & Financial Management
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-1 max-w-2xl">
              Configure verified bank details, IBAN, SWIFT codes, mobile wallets (JazzCash/EasyPaisa), and manage donation slips submitted by donors worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAddBank}
              className="bg-[#065F46] hover:bg-[#044E39] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Bank Account</span>
            </button>
            <button
              onClick={() => setIsMobileModalOpen(true)}
              className="bg-[#D97706] hover:bg-[#B45309] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Add Mobile Wallet</span>
            </button>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-[#FDFBF7] border border-[#E5E1D8]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Configured Banks</span>
            <div className="text-2xl font-serif font-bold text-[#065F46] mt-1">{bankAccounts.length}</div>
            <span className="text-[10px] text-gray-500">Active IBAN accounts</span>
          </div>
          <div className="p-4 bg-[#FDFBF7] border border-[#E5E1D8]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Mobile Wallets</span>
            <div className="text-2xl font-serif font-bold text-[#D97706] mt-1">{mobilePayments.length}</div>
            <span className="text-[10px] text-gray-500">JazzCash / EasyPaisa / Raast</span>
          </div>
          <div className="p-4 bg-[#FDFBF7] border border-[#E5E1D8]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Accepted Currencies</span>
            <div className="text-2xl font-serif font-bold text-[#111827] mt-1">8+</div>
            <span className="text-[10px] text-gray-500">PKR, USD, GBP, SAR, AED...</span>
          </div>
          <div className="p-4 bg-[#FDFBF7] border border-[#E5E1D8]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Received Pledges</span>
            <div className="text-2xl font-serif font-bold text-[#065F46] mt-1">{pledges.length}</div>
            <span className="text-[10px] text-gray-500">Online slips recorded</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: BANK ACCOUNTS LIST */}
      <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#065F46]" />
            <h4 className="text-base font-serif font-bold text-[#111827]">Active Bank Accounts</h4>
            <span className="text-[10px] bg-[#F8F9F5] text-[#065F46] border border-[#E5E1D8] font-bold px-2 py-0.5 uppercase">
              {bankAccounts.length} Verified
            </span>
          </div>
          <button
            onClick={handleOpenAddBank}
            className="text-xs text-[#065F46] font-bold uppercase tracking-widest hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Bank</span>
          </button>
        </div>

        {bankAccounts.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-[#E5E1D8] space-y-3">
            <Landmark className="w-10 h-10 text-gray-300 mx-auto" />
            <div className="text-sm font-bold text-gray-600">No bank accounts configured yet.</div>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Add your institution&apos;s Meezan Bank, Bank Alfalah, or other official bank details so donors can transfer funds.
            </p>
            <button
              onClick={handleOpenAddBank}
              className="bg-[#065F46] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest mt-2 cursor-pointer"
            >
              Add First Bank Account
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bankAccounts.map((b) => (
              <div 
                key={b.id} 
                className={`bg-white border transition-all relative ${
                  b.isPrimary 
                    ? 'border-[#065F46] shadow-xs' 
                    : 'border-[#E5E1D8] hover:border-gray-400'
                }`}
              >
                {/* Top Colored Bar */}
                <div className="h-1.5 bg-[#065F46] w-full"></div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="font-serif font-bold text-[#111827] text-lg">{b.bankName}</h5>
                        {b.isPrimary && (
                          <span className="text-[9px] bg-[#065F46] text-white font-bold uppercase tracking-widest px-2 py-0.5 rounded-2xs">
                            Primary Account
                          </span>
                        )}
                        <span className="text-[9px] bg-[#F8F9F5] text-[#D97706] border border-[#E5E1D8] font-mono font-bold px-2 py-0.5">
                          {b.currency || 'PKR'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{b.accountType || 'General Donations & Atiyyat'}</div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditBank(b)}
                        className="p-1.5 text-gray-500 hover:text-[#065F46] hover:bg-[#F8F9F5] rounded transition-colors cursor-pointer"
                        title="Edit Bank Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmBank({ id: b.id, name: b.bankName })}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        title="Delete Bank Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#FDFBF7] border border-[#E5E1D8] p-4 space-y-2.5 text-xs">
                    <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                      <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Account Title:</span>
                      <span className="font-bold text-[#111827]">{b.accountTitle}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-1.5">
                      <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Account Number:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#111827]">{b.accountNumber}</span>
                        <button
                          onClick={() => handleCopy(b.accountNumber, b.id + '-num')}
                          className="text-gray-400 hover:text-[#065F46] cursor-pointer"
                          title="Copy Account Number"
                        >
                          {copiedId === b.id + '-num' ? <Check className="w-3.5 h-3.5 text-[#065F46]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-white p-2.5 border border-[#E5E1D8]">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-[#065F46] block">IBAN (International Wire)</span>
                        <span className="font-mono text-xs font-bold text-[#111827] break-all">{b.iban}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(b.iban, b.id + '-iban')}
                        className="ml-2 bg-[#F8F9F5] border border-[#E5E1D8] hover:border-[#065F46] text-[#065F46] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest shrink-0 cursor-pointer"
                      >
                        {copiedId === b.id + '-iban' ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    {(b.swiftCode || b.branchName || b.branchCode) && (
                      <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-gray-500">
                        {b.swiftCode && (
                          <div>
                            <span className="text-gray-400 font-bold text-[9px] uppercase block">SWIFT / BIC:</span>
                            <span className="font-mono font-bold text-[#111827]">{b.swiftCode}</span>
                          </div>
                        )}
                        {b.branchName && (
                          <div>
                            <span className="text-gray-400 font-bold text-[9px] uppercase block">Branch:</span>
                            <span className="text-[#111827] truncate block">{b.branchName} {b.branchCode ? `(${b.branchCode})` : ''}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {b.notesEn && (
                      <div className="text-[11px] text-gray-500 bg-white p-2 border border-[#E5E1D8] italic">
                        &ldquo;{b.notesEn}&rdquo;
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: MOBILE WALLETS (JAZZCASH, EASYPAISA, ETC.) */}
      <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#D97706]" />
            <h4 className="text-base font-serif font-bold text-[#111827]">Instant Mobile Wallets & Micro-Remittances</h4>
            <span className="text-[10px] bg-[#FDFBF7] text-[#D97706] border border-[#E5E1D8] font-bold px-2 py-0.5 uppercase">
              {mobilePayments.length} Active
            </span>
          </div>
          <button
            onClick={() => setIsMobileModalOpen(true)}
            className="text-xs text-[#D97706] font-bold uppercase tracking-widest hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Mobile Wallet</span>
          </button>
        </div>

        {mobilePayments.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-[#E5E1D8] text-xs text-gray-400">
            No mobile wallets added. Click &quot;Add Mobile Wallet&quot; to configure JazzCash or EasyPaisa accounts.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mobilePayments.map((m) => (
              <div key={m.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#D97706] p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706]">{m.provider}</span>
                  <div className="font-mono text-base font-bold text-[#111827]">{m.accountNumber}</div>
                  <div className="text-xs text-gray-500">Title: {m.accountTitle}</div>
                  {m.tillId && <div className="text-[10px] font-mono text-gray-400">Till ID: {m.tillId}</div>}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => handleCopy(m.accountNumber, m.id)}
                    className="bg-[#F8F9F5] border border-[#E5E1D8] hover:border-[#D97706] text-[#D97706] px-3 py-1 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    {copiedId === m.id ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirmMobile({ id: m.id, provider: m.provider })}
                    className="text-gray-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                    title="Remove Wallet"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: DONATION PLEDGES & ONLINE SLIPS INBOX */}
      <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E1D8] pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#065F46]" />
              <h4 className="text-base font-serif font-bold text-[#111827]">Donation Pledges & Verification Slips</h4>
            </div>
            <p className="text-xs text-gray-500">Live records submitted by donors through the donation portal.</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search donor or transaction..."
              value={pledgeSearch}
              onChange={(e) => setPledgeSearch(e.target.value)}
              className="text-xs px-3 py-1.5 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
            />
            <button
              onClick={fetchPledges}
              className="text-xs font-bold text-[#065F46] uppercase tracking-widest hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {loadingPledges ? (
          <div className="py-12 text-center text-xs text-gray-500">Loading donation pledge records...</div>
        ) : filteredPledges.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-500 border border-dashed border-[#E5E1D8]">
            No donation pledges found. When donors submit contributions online, receipts appear here with their currency and transaction details.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#E5E1D8]">
              <thead className="bg-[#F8F9F5] text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-[#E5E1D8]">
                <tr>
                  <th className="p-3">Slip Ref</th>
                  <th className="p-3">Donor Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Cause / Category</th>
                  <th className="p-3">Amount & Currency</th>
                  <th className="p-3">PKR Equivalent</th>
                  <th className="p-3">Payment Method</th>
                  <th className="p-3">Txn Reference</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]">
                {filteredPledges.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FDFBF7]">
                    <td className="p-3 font-mono font-bold text-[#065F46]">{p.id}</td>
                    <td className="p-3 font-bold text-[#111827]">
                      {p.donorName}
                      {p.donorCountry && <span className="text-[10px] text-gray-400 block">{p.donorCity ? `${p.donorCity}, ` : ''}{p.donorCountry}</span>}
                    </td>
                    <td className="p-3 text-gray-600">
                      <div>{p.phone}</div>
                      {p.email && <div className="text-[10px] text-gray-400">{p.email}</div>}
                    </td>
                    <td className="p-3">
                      <span className="bg-[#F8F9F5] px-2 py-0.5 border border-[#E5E1D8] font-bold text-[#065F46] text-[10px]">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-[#111827]">
                      <span className="font-mono text-[#D97706]">
                        {p.currency || 'PKR'} {(p.amount || p.amountPkr).toLocaleString()}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-[#065F46]">
                      PKR {p.amountPkr.toLocaleString()}
                    </td>
                    <td className="p-3 text-gray-600">{p.paymentMethod}</td>
                    <td className="p-3 font-mono text-[11px] text-gray-500">{p.transactionReference || '—'}</td>
                    <td className="p-3 text-gray-500 whitespace-nowrap">{new Date(p.date).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setDeleteConfirmPledge(p.id)}
                        className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Delete log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD / EDIT BANK ACCOUNT */}
      {/* ========================================================================= */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-[#E5E1D8] shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in duration-150">
            <div className="bg-[#111827] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5 text-[#065F46]" />
                <h3 className="font-serif font-bold text-base">
                  {editingBankId ? 'Edit Bank Account Details' : 'Add New Institutional Bank Account'}
                </h3>
              </div>
              <button
                onClick={() => setIsBankModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBank} className="p-6 space-y-5">
              {/* Bank Name with Preset Selection */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                  Bank Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meezan Bank Ltd (Islamic Banking)"
                  value={bankForm.bankName || ''}
                  onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-gray-400 self-center">Quick Select:</span>
                  {POPULAR_PAK_BANKS.slice(0, 4).map((bName) => (
                    <button
                      type="button"
                      key={bName}
                      onClick={() => setBankForm({ ...bankForm, bankName: bName })}
                      className="text-[10px] bg-[#F8F9F5] hover:bg-[#E5E1D8] text-gray-700 px-2 py-0.5 border border-[#E5E1D8] transition-colors cursor-pointer"
                    >
                      {bName.split(' ')[0]} {bName.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Title & Account Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Account Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Darul Uloom Muhammadiya Ghousia"
                    value={bankForm.accountTitle || ''}
                    onChange={(e) => setBankForm({ ...bankForm, accountTitle: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0201010897654321"
                    value={bankForm.accountNumber || ''}
                    onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-mono focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>
              </div>

              {/* IBAN (Mandatory for Pakistan/International) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
                    IBAN (24 Characters) *
                  </label>
                  <span className="text-[10px] text-[#065F46] font-bold">Standard Pakistani IBAN Format</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. PK45MEZN0002010108976543"
                  value={bankForm.iban || ''}
                  onChange={(e) => setBankForm({ ...bankForm, iban: e.target.value.toUpperCase() })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-mono uppercase font-bold focus:outline-hidden focus:border-[#065F46]"
                />
              </div>

              {/* Branch Details & SWIFT Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sargodha Main Branch"
                    value={bankForm.branchName || ''}
                    onChange={(e) => setBankForm({ ...bankForm, branchName: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Branch Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0201"
                    value={bankForm.branchCode || ''}
                    onChange={(e) => setBankForm({ ...bankForm, branchCode: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-mono focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    SWIFT / BIC Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MEZNPKKA"
                    value={bankForm.swiftCode || ''}
                    onChange={(e) => setBankForm({ ...bankForm, swiftCode: e.target.value.toUpperCase() })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-mono uppercase focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>
              </div>

              {/* Currency & Fund Purpose Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Accepted Currency
                  </label>
                  <select
                    value={bankForm.currency || 'PKR'}
                    onChange={(e) => setBankForm({ ...bankForm, currency: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  >
                    <option value="PKR">PKR - Pakistani Rupee (Local)</option>
                    <option value="USD">USD - US Dollar (Foreign Remittance)</option>
                    <option value="GBP">GBP - British Pound (UK Remittance)</option>
                    <option value="EUR">EUR - Euro (European Remittance)</option>
                    <option value="SAR">SAR - Saudi Riyal (Gulf Remittance)</option>
                    <option value="AED">AED - UAE Dirham (Gulf Remittance)</option>
                    <option value="Multi-Currency">Multi-Currency / All Currencies</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Fund Allocation / Purpose
                  </label>
                  <select
                    value={bankForm.accountType || 'General Donations & Atiyyat'}
                    onChange={(e) => setBankForm({ ...bankForm, accountType: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  >
                    {ACCOUNT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes / Special Instructions */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                  Donor Instructions (English)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Send transfer slip via WhatsApp for official tax-exempt receipt."
                  value={bankForm.notesEn || ''}
                  onChange={(e) => setBankForm({ ...bankForm, notesEn: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                />
              </div>

              {/* Checkbox: Primary Account */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isPrimaryCheck"
                  checked={bankForm.isPrimary || false}
                  onChange={(e) => setBankForm({ ...bankForm, isPrimary: e.target.checked })}
                  className="w-4 h-4 text-[#065F46] focus:ring-[#065F46] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="isPrimaryCheck" className="text-xs text-[#111827] font-bold cursor-pointer">
                  Set as Primary / Default Bank Account on website
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E1D8]">
                <button
                  type="button"
                  onClick={() => setIsBankModalOpen(false)}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingBankId ? 'Save Changes' : 'Add Bank Account'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD MOBILE WALLET */}
      {/* ========================================================================= */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-150 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#D97706]" />
                <h3 className="font-serif font-bold text-base text-[#111827]">Add Mobile Wallet</h3>
              </div>
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="text-gray-400 hover:text-black p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMobile} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                  Wallet Provider *
                </label>
                <select
                  value={mobileForm.provider}
                  onChange={(e) => setMobileForm({ ...mobileForm, provider: e.target.value as any })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#D97706]"
                >
                  <option value="JazzCash">JazzCash</option>
                  <option value="EasyPaisa">EasyPaisa</option>
                  <option value="SadaPay">SadaPay</option>
                  <option value="NayaPay">NayaPay</option>
                  <option value="Raast">Raast ID (Instant Transfer)</option>
                  <option value="Other">Other Wallet</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                  Account Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Darul Uloom M Ghousia"
                  value={mobileForm.accountTitle || ''}
                  onChange={(e) => setMobileForm({ ...mobileForm, accountTitle: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#D97706]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                  Mobile / Account Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 0300 9601234"
                  value={mobileForm.accountNumber || ''}
                  onChange={(e) => setMobileForm({ ...mobileForm, accountNumber: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-mono focus:outline-hidden focus:border-[#D97706]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                  Merchant Till ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 887211"
                  value={mobileForm.tillId || ''}
                  onChange={(e) => setMobileForm({ ...mobileForm, tillId: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] font-mono focus:outline-hidden focus:border-[#D97706]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5E1D8]">
                <button
                  type="button"
                  onClick={() => setIsMobileModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D97706] hover:bg-[#B45309] text-white px-5 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Wallet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRMATION DIALOG: DELETE BANK ACCOUNT (INLINE MODAL) */}
      {/* ========================================================================= */}
      {deleteConfirmBank && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-150 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="font-serif font-bold text-base text-[#111827]">Delete Bank Account?</h4>
            </div>
            <p className="text-xs text-[#4B5563]">
              Are you sure you want to permanently remove <strong className="text-[#111827]">{deleteConfirmBank.name}</strong> from the official bank accounts list? Donors will no longer see this account.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmBank(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeDeleteBank}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRMATION DIALOG: DELETE MOBILE WALLET (INLINE MODAL) */}
      {/* ========================================================================= */}
      {deleteConfirmMobile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-150 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="font-serif font-bold text-base text-[#111827]">Remove Mobile Wallet?</h4>
            </div>
            <p className="text-xs text-[#4B5563]">
              Are you sure you want to remove this <strong className="text-[#111827]">{deleteConfirmMobile.provider}</strong> wallet account?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmMobile(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeDeleteMobile}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Removing...' : 'Yes, Remove'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRMATION DIALOG: DELETE PLEDGE RECORD (INLINE MODAL) */}
      {/* ========================================================================= */}
      {deleteConfirmPledge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-150 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="font-serif font-bold text-base text-[#111827]">Delete Donation Record?</h4>
            </div>
            <p className="text-xs text-[#4B5563]">
              Are you sure you want to delete this recorded donor slip log?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmPledge(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeDeletePledge}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
