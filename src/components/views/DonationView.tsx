import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Landmark, 
  Smartphone, 
  Copy, 
  Check, 
  ShieldCheck, 
  HeartHandshake, 
  FileCheck, 
  ArrowRight,
  Globe,
  Coins,
  Send,
  Building,
  CheckCircle2,
  Info,
  CreditCard,
  Receipt,
  Download,
  Share2
} from 'lucide-react';
import { SUPPORTED_CURRENCIES, formatCurrency, convertToPkr } from '../../utils/currencies';

export const DonationView: React.FC = () => {
  const { data, language, openDonateModal, showToast, triggerCelebration } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('PKR');

  // Direct Bank Transfer Form State
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorCity, setDonorCity] = useState('');
  const [donorCountry, setDonorCountry] = useState('Pakistan');
  const [donorBankName, setDonorBankName] = useState('');
  const [donorAccountNumber, setDonorAccountNumber] = useState('');
  const [donorAccountTitle, setDonorAccountTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('cat-edu');
  const [receivingAccount, setReceivingAccount] = useState('Meezan Bank Ltd (Darul Uloom Muhammadiya Ghousia)');
  const [donationAmount, setDonationAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<any | null>(null);

  const donation = data?.donationDetails;
  const bankAccounts = donation?.bankAccounts || [];
  const mobilePayments = donation?.mobilePayments || [];
  const categories = donation?.categories || [];

  const activeCurrency = SUPPORTED_CURRENCIES[selectedCurrency] || SUPPORTED_CURRENCIES.PKR;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied: ' + text, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : donationAmount;
  const finalAmountPkr = convertToPkr(finalAmount, selectedCurrency);

  const handleDirectDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) {
      showToast('Please enter your full name.', 'error');
      return;
    }
    if (!finalAmount || finalAmount <= 0) {
      showToast('Please enter a valid donation amount.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/public/donate-pledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName,
          phone: donorPhone,
          email: donorEmail,
          donorCity,
          donorCountry,
          category: selectedCategory,
          amount: finalAmount,
          currency: selectedCurrency,
          amountPkr: finalAmountPkr,
          exchangeRate: activeCurrency.rateToPkr,
          paymentMethod: receivingAccount,
          donorBankName,
          donorAccountNumber,
          donorAccountTitle,
          transactionReference: transactionRef,
          notes,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        triggerCelebration();
        setSubmittedReceipt({
          pledgeId: json.pledgeId || 'DURG-' + Date.now(),
          receiptNumber: json.receiptNumber || 'REC-' + Date.now(),
          donorName,
          donorCity,
          donorCountry,
          amount: finalAmount,
          currency: selectedCurrency,
          amountPkr: finalAmountPkr,
          category: categories.find((c) => c.id === selectedCategory)?.nameEn || selectedCategory,
          receivingAccount,
          donorBankName,
          donorAccountNumber,
          donorAccountTitle,
          transactionReference: transactionRef,
          date: new Date().toLocaleDateString('en-PK', { dateStyle: 'long' }),
        });
        showToast('JazakAllah Khair! Direct bank donation recorded successfully.', 'success');
      } else {
        showToast('Unable to record donation. Please contact the office.', 'error');
      }
    } catch {
      showToast('Network error submitting donation.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#065F46]"></span>
            <span className="text-[#065F46] text-xs font-bold uppercase tracking-widest">
              {language === 'ur' ? 'شریعت کے مطابق تصدیق شدہ فنڈز' : 'Shariah-Verified & Audited Institutional Accounts'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'عطیات، زکوٰۃ و بینک اکاؤنٹس تفصیلات' : 'Official Banking & Multi-Currency Giving'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur'
              ? 'دارالعلوم محمدیہ غوثیہ کے تمام فنڈز باقاعدہ آڈٹ شدہ سرکاری بینک اور موبائل اکاؤنٹس میں وصول کیے جاتے ہیں۔ پاکستان اور بیرونِ ملک مقیم تمام مسلمان اپنے عطیات بآسانی ارسال کر سکتے ہیں۔'
              : 'Direct bank transfers, IBAN wire routing, SWIFT international accounts, and instant mobile remittances (JazzCash / EasyPaisa / Raast) for student education, daily langar meals, and mosque construction.'}
          </p>
        </div>

        {/* Multi-Currency Selection Bar */}
        <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E1D8] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#065F46]" />
                <h3 className="text-lg font-serif font-bold text-[#111827]">
                  {language === 'ur' ? 'اپنی کرنسی منتخب کریں (ملکی و غیر ملکی عطیات)' : 'Select Your Giving Currency (Local & Overseas)'}
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'ur'
                  ? 'بیرون ملک (برطانیہ، امریکہ، یورپ، خلیجی ممالک) سے زکوٰۃ و صدقات بھیجنے والے حضرات اپنی کرنسی منتخب کریں۔'
                  : 'Sending from Pakistan, UK, USA, Europe, Saudi Arabia, UAE, or Australia? Choose your currency for tailored amounts and wire instructions.'}
              </p>
            </div>

            {selectedCurrency !== 'PKR' && (
              <div className="bg-[#F8F9F5] border border-[#065F46] px-3.5 py-1.5 text-xs text-[#065F46] font-bold flex items-center gap-2">
                <Info className="w-4 h-4 text-[#065F46]" />
                <span>1 {activeCurrency.code} ≈ {activeCurrency.rateToPkr} PKR (Official Remittance)</span>
              </div>
            )}
          </div>

          {/* Currency Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {Object.values(SUPPORTED_CURRENCIES).map((curr) => {
              const isSelected = selectedCurrency === curr.code;
              return (
                <button
                  key={curr.code}
                  onClick={() => setSelectedCurrency(curr.code)}
                  className={`p-3 border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#065F46] text-white border-[#065F46] shadow-xs'
                      : 'bg-[#FDFBF7] text-[#111827] border-[#E5E1D8] hover:border-[#065F46]'
                  }`}
                >
                  <div className="flex items-center justify-between text-base">
                    <span>{curr.flag}</span>
                    <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-emerald-200' : 'text-gray-400'}`}>
                      {curr.symbol}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="font-bold text-xs">{curr.code}</div>
                    <div className={`text-[9px] truncate ${isSelected ? 'text-emerald-100' : 'text-gray-500'}`}>
                      {curr.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Cause Sponsorship Cards with Active Currency */}
          <div className="pt-4 border-t border-[#E5E1D8]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] block mb-3">
              Suggested Monthly Sponsorships in {activeCurrency.code} ({activeCurrency.symbol})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-[#F8F9F5] border border-[#E5E1D8] space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#065F46] block">Student Education</span>
                <div className="text-xl font-serif font-bold text-[#111827]">
                  {formatCurrency(activeCurrency.suggestedAmounts[0], activeCurrency.code)}
                  <span className="text-xs font-normal text-gray-500 font-sans"> / mo</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  ≈ PKR {convertToPkr(activeCurrency.suggestedAmounts[0], activeCurrency.code).toLocaleString()} (Full Tuition & Books)
                </div>
                <button
                  onClick={() => openDonateModal('cat-edu')}
                  className="w-full mt-2 bg-[#065F46] hover:bg-[#044E39] text-white py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Sponsor Now
                </button>
              </div>

              <div className="p-4 bg-[#F8F9F5] border border-[#E5E1D8] space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#D97706] block">Matbakh (Langar Meals)</span>
                <div className="text-xl font-serif font-bold text-[#111827]">
                  {formatCurrency(activeCurrency.suggestedAmounts[1] || activeCurrency.suggestedAmounts[0], activeCurrency.code)}
                  <span className="text-xs font-normal text-gray-500 font-sans"> / mo</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  ≈ PKR {convertToPkr(activeCurrency.suggestedAmounts[1] || activeCurrency.suggestedAmounts[0], activeCurrency.code).toLocaleString()} (3 Daily Fresh Meals)
                </div>
                <button
                  onClick={() => openDonateModal('cat-food')}
                  className="w-full mt-2 bg-[#D97706] hover:bg-[#B45309] text-white py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Feed Students
                </button>
              </div>

              <div className="p-4 bg-[#F8F9F5] border border-[#E5E1D8] space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#065F46] block">Family Welfare & Medical</span>
                <div className="text-xl font-serif font-bold text-[#111827]">
                  {formatCurrency(activeCurrency.suggestedAmounts[2] || 100, activeCurrency.code)}
                </div>
                <div className="text-[11px] text-gray-500">
                  ≈ PKR {convertToPkr(activeCurrency.suggestedAmounts[2] || 100, activeCurrency.code).toLocaleString()} (Emergency Assistance)
                </div>
                <button
                  onClick={() => openDonateModal('cat-welfare')}
                  className="w-full mt-2 bg-[#111827] hover:bg-black text-white py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Contribute
                </button>
              </div>

              <div className="p-4 bg-[#F8F9F5] border border-[#E5E1D8] space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#065F46] block">Mosque Construction Share</span>
                <div className="text-xl font-serif font-bold text-[#111827]">
                  {formatCurrency(activeCurrency.suggestedAmounts[3] || 250, activeCurrency.code)}
                </div>
                <div className="text-[11px] text-gray-500">
                  ≈ PKR {convertToPkr(activeCurrency.suggestedAmounts[3] || 250, activeCurrency.code).toLocaleString()} (Sadaqah Jariyah Brick)
                </div>
                <button
                  onClick={() => openDonateModal('cat-mosque')}
                  className="w-full mt-2 bg-[#065F46] hover:bg-[#044E39] text-white py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Build Mosque
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Accounts Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E1D8] pb-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#065F46]"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46]">
                Official Direct Bank Transfers (IBAN & SWIFT)
              </span>
            </div>
            <span className="text-[10px] text-gray-400">
              Tax-Exempt & Audited Institutional Accounts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bankAccounts.map((b) => (
              <div key={b.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-8 space-y-4 shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-serif font-bold text-[#111827]">{b.bankName}</h3>
                      <span className="text-[9px] bg-[#F8F9F5] text-[#065F46] border border-[#E5E1D8] font-bold uppercase tracking-widest px-2.5 py-0.5">
                        {b.currency || 'PKR & Foreign Wire'}
                      </span>
                    </div>
                    {b.accountType && (
                      <div className="text-xs font-bold text-[#D97706] mt-0.5">{b.accountType}</div>
                    )}
                  </div>
                  {b.branchName && (
                    <span className="text-[9px] bg-emerald-50 text-[#065F46] border border-emerald-200 font-bold uppercase px-2 py-0.5 shrink-0">
                      {b.branchName}
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs text-[#4B5563]">
                  <div className="flex justify-between py-1.5 border-b border-[#E5E1D8]">
                    <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Account Title:</span>
                    <span className="font-bold text-[#111827]">{b.accountTitle}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-[#E5E1D8]">
                    <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#111827]">{b.accountNumber}</span>
                      <button
                        onClick={() => handleCopy(b.accountNumber, b.id + '-num')}
                        className="text-gray-400 hover:text-[#065F46]"
                        title="Copy Account Number"
                      >
                        {copiedId === b.id + '-num' ? <Check className="w-3.5 h-3.5 text-[#065F46]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* IBAN Box */}
                  <div className="flex items-center justify-between bg-[#F8F9F5] p-3 border border-[#E5E1D8] mt-2">
                    <div className="overflow-hidden">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-[#065F46] block">
                        IBAN (Pakistani & Overseas Wire)
                      </span>
                      <span className="font-mono text-xs font-bold text-[#111827] truncate block">{b.iban}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(b.iban, b.id + '-iban')}
                      className="ml-3 bg-white border border-[#E5E1D8] hover:border-[#065F46] text-[#065F46] px-3 py-1 text-[11px] font-bold uppercase tracking-widest transition-colors shrink-0"
                    >
                      {copiedId === b.id + '-iban' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  {/* SWIFT / BIC Code for Foreign Donors */}
                  {b.swiftCode && (
                    <div className="flex items-center justify-between bg-[#FDFBF7] p-2.5 border border-[#E5E1D8] text-xs">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 block">
                          SWIFT / BIC Code (International Wire)
                        </span>
                        <span className="font-mono font-bold text-[#111827]">{b.swiftCode}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(b.swiftCode || '', b.id + '-swift')}
                        className="text-[#065F46] hover:underline text-[10px] font-bold uppercase"
                      >
                        {copiedId === b.id + '-swift' ? 'Copied' : 'Copy Code'}
                      </button>
                    </div>
                  )}

                  {b.notesEn && (
                    <div className="text-[11px] text-gray-500 italic pt-1">
                      {b.notesEn}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Wallets */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#D97706]"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">
              Instant Mobile Remittances (Pakistan)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobilePayments.map((m) => (
              <div key={m.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#D97706] p-6 flex items-center justify-between gap-4 shadow-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D97706] block">{m.provider}</span>
                  <div className="text-lg font-mono font-bold text-[#111827] mt-0.5">{m.accountNumber}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Title: <span className="font-bold text-[#111827]">{m.accountTitle}</span></div>
                  {m.tillId && <div className="text-[10px] font-mono text-gray-400">Till ID: {m.tillId}</div>}
                </div>
                <button
                  onClick={() => handleCopy(m.accountNumber, m.id)}
                  className="bg-[#F8F9F5] border border-[#E5E1D8] hover:border-[#D97706] text-[#D97706] px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors shrink-0"
                >
                  {copiedId === m.id ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Donor Bank Details & Instant Transfer Section */}
        <div id="direct-donate-form" className="bg-white border border-[#E5E1D8] p-8 sm:p-12 shadow-xs space-y-8">
          <div className="border-b border-[#E5E1D8] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-[#065F46]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46]">
                  {language === 'ur' ? 'براہِ راست بینک عطیہ و رسید' : 'Direct Bank-to-Bank Donation & Instant Receipt'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
                {language === 'ur' ? 'اپنے بینک اکاؤنٹ کی تفصیل درج کریں اور عطیہ بھیجیں' : 'Donate Directly to Darul Uloom Official Accounts'}
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                Enter your sending bank account details, specify the amount, and receive an instant digital receipt.
              </p>
            </div>
            <button
              onClick={() => openDonateModal()}
              className="inline-flex items-center gap-2 bg-[#065F46] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#044E39] transition-colors self-start md:self-auto shrink-0 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Quick Popup Modal</span>
            </button>
          </div>

          {submittedReceipt ? (
            <div className="bg-[#FDFBF7] border border-[#065F46] p-8 max-w-2xl mx-auto space-y-6 text-center animate-in fade-in">
              <div className="w-12 h-12 bg-[#ECFDF5] text-[#065F46] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#065F46] block">
                  Darul Uloom Muhammadiya Ghousia • Official Receipt
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#111827] mt-1">
                  JazakAllah Khair! Donation Recorded
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-mono">
                  Receipt Ref: <strong className="text-[#065F46]">{submittedReceipt.receiptNumber}</strong>
                </p>
              </div>

              <div className="bg-white border border-[#E5E1D8] p-6 text-left space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-[9px] uppercase text-gray-400 font-bold block">Donor Name</span>
                    <span className="font-bold text-[#111827]">{submittedReceipt.donorName}</span>
                    {submittedReceipt.donorCity && (
                      <span className="text-[10px] text-gray-500 block">{submittedReceipt.donorCity}, {submittedReceipt.donorCountry}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-gray-400 font-bold block">Cause / Category</span>
                    <span className="font-bold text-[#065F46]">{submittedReceipt.category}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2 bg-[#F8F9F5] p-3 rounded-xs">
                  <div>
                    <span className="text-[9px] uppercase text-gray-400 font-bold block">Donation Amount</span>
                    <div className="text-lg font-serif font-bold text-[#D97706]">
                      {submittedReceipt.currency} {submittedReceipt.amount.toLocaleString()}
                    </div>
                  </div>
                  {submittedReceipt.currency !== 'PKR' && (
                    <div>
                      <span className="text-[9px] uppercase text-gray-400 font-bold block">PKR Equivalent</span>
                      <div className="text-base font-mono font-bold text-[#065F46]">
                        PKR {submittedReceipt.amountPkr.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-600">
                  <div>
                    Receiving Bank: <strong className="text-gray-900">{submittedReceipt.receivingAccount}</strong>
                  </div>
                  {submittedReceipt.donorBankName && (
                    <div>
                      Sender Bank: <strong className="text-gray-900">{submittedReceipt.donorBankName}</strong> {submittedReceipt.donorAccountNumber && `(${submittedReceipt.donorAccountNumber})`}
                    </div>
                  )}
                  <div>
                    Date: <strong className="text-gray-900">{submittedReceipt.date}</strong>
                  </div>
                  {submittedReceipt.transactionReference && (
                    <div>
                      Txn Ref: <strong className="text-gray-900">{submittedReceipt.transactionReference}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittedReceipt(null)}
                  className="bg-[#065F46] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#044E39] transition-colors"
                >
                  Make Another Contribution
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDirectDonationSubmit} className="space-y-6 max-w-4xl mx-auto">
              {/* Currency Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#065F46] block mb-2">
                  1. Select Currency (کرنسی منتخب کریں)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {Object.values(SUPPORTED_CURRENCIES).map((curr) => {
                    const isSelected = selectedCurrency === curr.code;
                    return (
                      <button
                        type="button"
                        key={curr.code}
                        onClick={() => setSelectedCurrency(curr.code)}
                        className={`p-2.5 text-center border transition-all text-xs ${
                          isSelected
                            ? 'bg-[#065F46] text-white border-[#065F46] font-bold shadow-xs'
                            : 'bg-white text-[#111827] border-[#E5E1D8] hover:border-[#065F46]'
                        }`}
                      >
                        <div className="font-mono font-bold text-sm">{curr.symbol}</div>
                        <div className="text-[10px] mt-0.5">{curr.code}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#065F46] block mb-2">
                  2. Donation Amount (عطیہ کی رقم)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {[2000, 5000, 10000, 25000, 50000, 100000].map((amt) => {
                    const isSelected = !customAmount && donationAmount === amt;
                    return (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setDonationAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`p-2.5 text-center border text-xs transition-all ${
                          isSelected
                            ? 'bg-[#065F46] text-white border-[#065F46] font-bold'
                            : 'bg-[#F8F9F5] text-[#111827] border-[#E5E1D8] hover:border-[#065F46]'
                        }`}
                      >
                        {selectedCurrency} {amt.toLocaleString()}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 shrink-0">Or Custom Amount:</span>
                  <input
                    type="number"
                    min="1"
                    placeholder={`Enter amount in ${selectedCurrency}`}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>
              </div>

              {/* Cause & Receiving Account */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Select Cause / Fund Category *
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameEn} ({c.nameUr})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Darul Uloom Receiving Account *
                  </label>
                  <select
                    value={receivingAccount}
                    onChange={(e) => setReceivingAccount(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  >
                    {bankAccounts.map((b) => (
                      <option key={b.id} value={`${b.bankName} (${b.accountTitle})`}>
                        {b.bankName} - {b.accountNumber} ({b.accountTitle})
                      </option>
                    ))}
                    {mobilePayments.map((m) => (
                      <option key={m.id} value={`${m.provider} (${m.accountNumber})`}>
                        {m.provider} - {m.accountNumber} ({m.accountTitle})
                      </option>
                    ))}
                    <option value="International SWIFT / IBAN Wire">International SWIFT / IBAN Wire</option>
                    <option value="Raast Instant Payment">Raast Instant Payment</option>
                    <option value="Cash at Sargodha Campus">Cash at Sargodha Campus</option>
                  </select>
                </div>
              </div>

              {/* Donor's Information */}
              <div className="border-t border-[#E5E1D8] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Your Full Name (Donor Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Haji Muhammad Tariq"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +92 300 1234567"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    City & Country
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="City (e.g. Lahore / London)"
                      value={donorCity}
                      onChange={(e) => setDonorCity(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                    />
                    <input
                      type="text"
                      placeholder="Country (e.g. Pakistan)"
                      value={donorCountry}
                      onChange={(e) => setDonorCountry(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. donor@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>
              </div>

              {/* Donor's Sending Bank / Wallet Account Details */}
              <div className="bg-[#F8F9F5] p-4 border border-[#E5E1D8] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <span className="text-[11px] font-bold text-[#065F46] uppercase tracking-wider block">
                    Your Sending Bank & Account Details (آپ کے بینک اکاؤنٹ کی تفصیل)
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Provide the bank/wallet name and account number from which you are transferring funds:
                  </span>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Your Bank Name (e.g. Meezan Bank, HBL, Allied, JazzCash)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Meezan Bank / HBL / JazzCash / Barclays"
                    value={donorBankName}
                    onChange={(e) => setDonorBankName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Your Account / IBAN / Wallet Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PK36MEZN00012345678901 or 03001234567"
                    value={donorAccountNumber}
                    onChange={(e) => setDonorAccountNumber(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Account Holder Name / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Muhammad Tariq"
                    value={donorAccountTitle}
                    onChange={(e) => setDonorAccountTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    Transaction Slip / Deposit Reference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TXN-948123 / Deposit Slip No."
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#065F46] hover:bg-[#044E39] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'Recording...'
                      : `Submit Donation (${selectedCurrency} ${finalAmount.toLocaleString()})`}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Online Pledge & Multi-Currency Receipt Box */}
        <div className="bg-[#111827] text-white p-8 sm:p-12 text-center space-y-6">
          <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block">
            Instant Multi-Currency Acknowledgement & Receipt Slip
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white max-w-xl mx-auto">
            {language === 'ur' ? 'آن لائن عطیہ فارم پُر کریں' : 'Submit Donation Pledge & Receive Instant Verification'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Send your donation pledge in any currency (PKR, USD, GBP, EUR, SAR, AED). Our finance administration will record your contribution, verify the bank remittance, and issue an official acknowledgement receipt slip.
          </p>
          <button
            onClick={() => openDonateModal()}
            className="bg-[#065F46] hover:bg-[#044E39] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
          >
            Open Multi-Currency Donation Form & Receipt Slip
          </button>
        </div>

      </div>
    </div>
  );
};
