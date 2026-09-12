import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Copy, 
  Check, 
  Landmark, 
  Smartphone, 
  ShieldCheck, 
  Send,
  FileCheck,
  Globe,
  Coins,
  Receipt,
  Download,
  Share2,
  Building
} from 'lucide-react';
import { SUPPORTED_CURRENCIES, formatCurrency, convertToPkr } from '../../utils/currencies';

export const QuickDonateModal: React.FC = () => {
  const { 
    isDonateModalOpen, 
    closeDonateModal, 
    data, 
    language, 
    selectedDonationCategory,
    showToast,
    triggerCelebration
  } = useApp();

  const [selectedCurrency, setSelectedCurrency] = useState<string>('PKR');
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedDonationCategory || 'cat-edu');
  const [selectedAmount, setSelectedAmount] = useState<number>(6000);
  const [customAmount, setCustomAmount] = useState<string>('');
  
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorCity, setDonorCity] = useState<string>('');
  const [donorCountry, setDonorCountry] = useState<string>('Pakistan');

  const [paymentMethod, setPaymentMethod] = useState<string>('Meezan Bank Ltd');
  const [donorBankName, setDonorBankName] = useState<string>('');
  const [donorAccountNumber, setDonorAccountNumber] = useState<string>('');
  const [donorAccountTitle, setDonorAccountTitle] = useState<string>('');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedPledge, setSubmittedPledge] = useState<any | null>(null);

  // Sync category on open
  useEffect(() => {
    if (selectedDonationCategory) {
      setSelectedCategory(selectedDonationCategory);
    }
  }, [selectedDonationCategory]);

  const activeCurrency = SUPPORTED_CURRENCIES[selectedCurrency] || SUPPORTED_CURRENCIES.PKR;

  // When currency changes, adapt default selected amount
  const handleCurrencyChange = (currCode: string) => {
    setSelectedCurrency(currCode);
    setCustomAmount('');
    const currObj = SUPPORTED_CURRENCIES[currCode] || SUPPORTED_CURRENCIES.PKR;
    setSelectedAmount(currObj.suggestedAmounts[1] || currObj.suggestedAmounts[0]);
    if (currCode !== 'PKR' && donorCountry === 'Pakistan') {
      if (currCode === 'USD') setDonorCountry('United States');
      else if (currCode === 'GBP') setDonorCountry('United Kingdom');
      else if (currCode === 'SAR') setDonorCountry('Saudi Arabia');
      else if (currCode === 'AED') setDonorCountry('United Arab Emirates');
      else if (currCode === 'EUR') setDonorCountry('Europe / Germany');
      else if (currCode === 'CAD') setDonorCountry('Canada');
      else if (currCode === 'AUD') setDonorCountry('Australia');
    }
  };

  if (!isDonateModalOpen) return null;

  const donationDetails = data?.donationDetails;
  const categories = donationDetails?.categories || [];
  const bankAccounts = donationDetails?.bankAccounts || [];
  const mobilePayments = donationDetails?.mobilePayments || [];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied: ' + text, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const finalAmountInSelectedCurrency = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const finalAmountInPkr = convertToPkr(finalAmountInSelectedCurrency, selectedCurrency);

  const handleSubmitPledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) {
      showToast('Please enter your name.', 'error');
      return;
    }
    if (!finalAmountInSelectedCurrency || finalAmountInSelectedCurrency <= 0) {
      showToast('Please specify a valid donation amount.', 'error');
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
          amount: finalAmountInSelectedCurrency,
          currency: selectedCurrency,
          amountPkr: finalAmountInPkr,
          exchangeRate: activeCurrency.rateToPkr,
          paymentMethod,
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
        setSubmittedPledge({
          pledgeId: json.pledgeId || 'PLD-' + Date.now(),
          donorName,
          donorCity,
          donorCountry,
          amount: finalAmountInSelectedCurrency,
          currency: selectedCurrency,
          amountPkr: finalAmountInPkr,
          category: categories.find((c) => c.id === selectedCategory)?.nameEn || selectedCategory,
          paymentMethod,
          donorBankName,
          donorAccountNumber,
          donorAccountTitle,
          transactionReference: transactionRef,
          date: new Date().toLocaleDateString('en-PK', { dateStyle: 'long' }),
        });
        showToast('JazakAllah Khair! Multi-currency donation recorded.', 'success');
      } else {
        showToast('Failed to record pledge. Please contact via WhatsApp.', 'error');
      }
    } catch {
      showToast('Network error while saving pledge.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FDFBF7] shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#E5E1D8] flex flex-col relative animate-in fade-in zoom-in duration-150">
        
        {/* Editorial Header */}
        <div className="bg-[#111827] text-white p-5 sm:p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-[#065F46] rounded-xs flex items-center justify-center text-white font-serif font-bold text-xl">
              D
            </div>
            <div>
              <div className="text-[10px] text-[#D97706] font-bold uppercase tracking-widest">
                Global & Domestic Shariah Verified Giving
              </div>
              <h3 className="text-lg font-serif font-bold text-white leading-tight">
                {language === 'ur' ? 'آن لائن عطیہ و سرکاری بینک تفصیلات' : 'Online Donation & Bank Wire Channel'}
              </h3>
            </div>
          </div>
          <button
            onClick={closeDonateModal}
            className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {submittedPledge ? (
            /* Success Acknowledgement Card with Multi-Currency Receipt */
            <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-8 text-center space-y-6 shadow-xs">
              <div className="w-16 h-16 bg-[#065F46] text-white rounded-full flex items-center justify-center mx-auto shadow-xs">
                <FileCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-3xl font-bold text-[#065F46] font-arabic">جَزَاكُمُ اللَّهُ خَيْرًا</h4>
                <h5 className="text-xl font-serif font-bold text-[#111827]">
                  {language === 'ur' ? 'عطیہ کی رسید و تصدیق موصول ہو گئی ہے' : 'Sacred Contribution Verified & Recorded'}
                </h5>
                <p className="text-xs text-[#4B5563] max-w-md mx-auto">
                  May Allah Almighty accept your contribution and grant boundless Barakah to you and your family.
                </p>
              </div>

              {/* Official Receipt Slip */}
              <div className="bg-[#FDFBF7] border border-[#E5E1D8] p-6 text-xs text-left max-w-lg mx-auto space-y-3 relative">
                <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#065F46]">Darul Uloom Muhammadiya Ghousia</span>
                    <div className="text-sm font-serif font-bold text-[#111827]">Donation Acknowledgement Slip</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest block">Reference No</span>
                    <span className="font-mono font-bold text-[#065F46] text-xs">{submittedPledge.pledgeId}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 uppercase text-[9px] font-bold block">Donor Name</span>
                    <span className="font-bold text-[#111827]">{submittedPledge.donorName}</span>
                    {submittedPledge.donorCountry && (
                      <span className="text-[10px] text-gray-500 block">{submittedPledge.donorCity ? `${submittedPledge.donorCity}, ` : ''}{submittedPledge.donorCountry}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase text-[9px] font-bold block">Fund / Category</span>
                    <span className="font-bold text-[#065F46]">{submittedPledge.category}</span>
                  </div>
                </div>

                <div className="bg-white p-3 border border-[#E5E1D8] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase text-gray-400 font-bold block">Amount Contributed</span>
                    <div className="text-lg font-serif font-bold text-[#D97706]">
                      {submittedPledge.currency} {submittedPledge.amount.toLocaleString()}
                    </div>
                  </div>
                  {submittedPledge.currency !== 'PKR' && (
                    <div className="text-right">
                      <span className="text-[9px] uppercase text-gray-400 font-bold block">PKR Equivalent</span>
                      <div className="text-sm font-mono font-bold text-[#065F46]">
                        PKR {submittedPledge.amountPkr.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                  <span>Receiving A/C: <strong className="text-gray-800">{submittedPledge.paymentMethod}</strong></span>
                  <span>Date: <strong className="text-gray-800">{submittedPledge.date}</strong></span>
                </div>

                {submittedPledge.donorBankName && (
                  <div className="text-[11px] text-gray-500 bg-white p-2 border border-[#E5E1D8]">
                    <span>Sender Bank: <strong className="text-[#065F46]">{submittedPledge.donorBankName}</strong></span>
                    {submittedPledge.donorAccountNumber && (
                      <span className="ml-2 font-mono">({submittedPledge.donorAccountNumber})</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSubmittedPledge(null);
                    closeDonateModal();
                  }}
                  className="bg-[#065F46] hover:bg-[#044E39] text-white font-bold px-8 py-3 text-xs uppercase tracking-widest transition-colors shadow-xs"
                >
                  {language === 'ur' ? 'مکمل اور بند کریں' : 'Done & Close'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: CHOOSE SENDING CURRENCY (GLOBAL / DOMESTIC) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#065F46] uppercase tracking-[0.2em] flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#065F46]" />
                    <span>{language === 'ur' ? '1. کرنسی منتخب کریں (Sending Currency)' : '1. Select Sending Currency'}</span>
                  </label>
                  {selectedCurrency !== 'PKR' && (
                    <span className="text-[10px] text-[#D97706] font-bold">
                      1 {activeCurrency.code} = {activeCurrency.rateToPkr} PKR
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {Object.values(SUPPORTED_CURRENCIES).map((curr) => {
                    const isSelected = selectedCurrency === curr.code;
                    return (
                      <button
                        type="button"
                        key={curr.code}
                        onClick={() => handleCurrencyChange(curr.code)}
                        className={`p-2 text-center border transition-all ${
                          isSelected
                            ? 'bg-[#065F46] text-white border-[#065F46] shadow-xs'
                            : 'bg-white text-[#111827] border-[#E5E1D8] hover:border-[#065F46]'
                        }`}
                      >
                        <div className="text-sm">{curr.flag}</div>
                        <div className="text-xs font-bold mt-0.5">{curr.code}</div>
                        <div className={`text-[9px] ${isSelected ? 'text-emerald-200' : 'text-gray-400'}`}>{curr.symbol}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: BANK & MOBILE ACCOUNT QUICK REPOSITORIES */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#065F46] uppercase tracking-[0.2em] flex items-center gap-2">
                    <Landmark className="w-4 h-4" />
                    <span>{language === 'ur' ? '2. تصدیق شدہ بینک اور والٹ تفصیلات' : '2. Verified Receiving Accounts'}</span>
                  </h4>
                  <span className="text-[10px] text-gray-400">Click &apos;Copy&apos; to paste in your banking app</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bankAccounts.map((b) => (
                    <div key={b.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-serif text-[#111827] text-sm">{b.bankName}</span>
                        <span className="text-[9px] bg-[#F8F9F5] text-[#065F46] border border-[#E5E1D8] font-bold uppercase tracking-widest px-2 py-0.5">
                          {b.currency || 'PKR / Wire'}
                        </span>
                      </div>
                      <div className="text-xs text-[#4B5563] space-y-1">
                        <div>
                          <span className="text-gray-400 uppercase tracking-widest text-[9px] font-bold">Title:</span>{' '}
                          <span className="font-bold text-[#111827]">{b.accountTitle}</span>
                        </div>
                        <div className="flex items-center justify-between font-mono bg-[#F8F9F5] px-2.5 py-1.5 border border-[#E5E1D8]">
                          <span className="text-xs font-bold text-[#065F46] truncate">IBAN: {b.iban}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(b.iban, b.id + '-iban')}
                            className="ml-2 text-[#065F46] hover:text-[#044E39] p-1 hover:bg-white rounded"
                            title="Copy IBAN"
                          >
                            {copiedId === b.id + '-iban' ? <Check className="w-3.5 h-3.5 text-[#065F46]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        {b.swiftCode && selectedCurrency !== 'PKR' && (
                          <div className="flex items-center justify-between text-[11px] pt-1">
                            <span className="text-gray-400 uppercase font-bold text-[9px]">SWIFT Code:</span>
                            <span className="font-mono font-bold text-[#111827]">{b.swiftCode}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Accounts (JazzCash / EasyPaisa / SadaPay) */}
                {selectedCurrency === 'PKR' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {mobilePayments.map((m) => (
                      <div key={m.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#D97706] p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#D97706] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-[#111827]">{m.provider}: <span className="font-mono text-[#065F46] font-bold">{m.accountNumber}</span></div>
                            <div className="text-[10px] text-gray-500">Title: {m.accountTitle}</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(m.accountNumber, m.id)}
                          className="text-[#D97706] hover:text-amber-800 p-1.5 hover:bg-[#FDFBF7] border border-[#E5E1D8] shrink-0"
                          title="Copy Number"
                        >
                          {copiedId === m.id ? <Check className="w-4 h-4 text-[#065F46]" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* STEP 3: DONATION CAUSE & MULTI-CURRENCY FORM */}
              <form onSubmit={handleSubmitPledge} className="space-y-4 pt-4 border-t border-[#E5E1D8]">
                <h4 className="text-xs font-bold text-[#065F46] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Coins className="w-4 h-4" />
                  <span>{language === 'ur' ? '3. عطیہ کی مد، رقم اور معلومات درج کریں' : '3. Donation Amount & Donor Information'}</span>
                </h4>

                {/* Categories */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((c) => {
                    const isSelected = selectedCategory === c.id;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`p-3 border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-[#065F46] text-white border-[#065F46] font-bold shadow-xs'
                            : 'bg-white text-[#4B5563] border-[#E5E1D8] hover:border-[#065F46]'
                        }`}
                      >
                        <div className="truncate font-serif">{language === 'ur' ? c.nameUr : c.nameEn}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Amount suggestions in Active Currency */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">
                      Select Amount in {activeCurrency.code} ({activeCurrency.symbol}):
                    </label>
                    {selectedCurrency !== 'PKR' && finalAmountInPkr > 0 && (
                      <span className="text-xs font-mono font-bold text-[#065F46]">
                        ≈ PKR {finalAmountInPkr.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeCurrency.suggestedAmounts.map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`px-4 py-2 text-xs font-bold border transition-all ${
                          selectedAmount === amt && !customAmount
                            ? 'bg-[#111827] text-white border-[#111827]'
                            : 'bg-white text-[#111827] border-[#E5E1D8] hover:border-[#065F46]'
                        }`}
                      >
                        {formatCurrency(amt, selectedCurrency)}
                      </button>
                    ))}
                    <div className="relative min-w-[140px] flex-1">
                      <input
                        type="number"
                        placeholder={`Other Amount (${activeCurrency.code})`}
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          if (e.target.value) setSelectedAmount(parseFloat(e.target.value) || 0);
                        }}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                      />
                    </div>
                  </div>
                </div>

                {/* Donor Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                      Donor Full Name *
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
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +92 300 1234567 or +44 7911 123456"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                      Donor City & Country
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City (e.g. London)"
                        value={donorCity}
                        onChange={(e) => setDonorCity(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                      />
                      <input
                        type="text"
                        placeholder="Country (e.g. UK)"
                        value={donorCountry}
                        onChange={(e) => setDonorCountry(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                      Darul Uloom Receiving Account *
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                    >
                      {bankAccounts.map((b) => (
                        <option key={b.id} value={`${b.bankName} (${b.accountTitle})`}>
                          {b.bankName} ({b.accountTitle}) {b.currency ? `[${b.currency}]` : ''}
                        </option>
                      ))}
                      {mobilePayments.map((m) => (
                        <option key={m.id} value={`${m.provider} (${m.accountNumber})`}>
                          {m.provider} - {m.accountNumber} ({m.accountTitle})
                        </option>
                      ))}
                      <option value="International Wire / SWIFT">International Bank Wire (SWIFT / IBAN)</option>
                      <option value="Raast ID Instant Transfer">Raast Instant Transfer</option>
                      <option value="Western Union / MoneyGram">Western Union / MoneyGram</option>
                      <option value="Cash at Sargodha Office">Cash at Darul Uloom Office</option>
                    </select>
                  </div>

                  {/* Donor's Own Bank & Account Details */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#065F46] block mb-1">
                      Your Bank / Wallet Name (Sender Bank)
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
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#065F46] block mb-1">
                      Your Sending Account / IBAN / Mobile No
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. PK36MEZN000... or 03001234567"
                      value={donorAccountNumber}
                      onChange={(e) => setDonorAccountNumber(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                      Transaction Slip Ref / Dua Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TXN-839210 • Special Dua for parents / Marhoomeen"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E1D8]">
                  <button
                    type="button"
                    onClick={closeDonateModal}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#4B5563] hover:text-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {isSubmitting ? 'Recording...' : `Record Pledge (${activeCurrency.code} ${finalAmountInSelectedCurrency.toLocaleString()})`}
                    </span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
