import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { data, language, showToast } = useApp();
  const settings = data?.settings;

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('General Inquiry');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('Please fill all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/public/contact-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, subject, message }),
      });

      if (res.ok) {
        setSubmitted(true);
        showToast('Inquiry sent successfully! We will get in touch shortly.', 'success');
      } else {
        showToast('Failed to send inquiry. Please call directly.', 'error');
      }
    } catch {
      showToast('Network error.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-2">
            Reach Out • Visit Our Campus
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'رابطہ و پتہ' : 'Contact & Campus Location'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur'
              ? 'دارالعلوم محمدیہ غوثیہ، نواب کالونی، سرگودھا کے دفاتر ہفتے کے ساتوں دن کھلے ہیں۔ داخلے، فلاحی امور یا عطیات کی تصدیق کے لیے تشریف لائیں یا فون پر رابطہ کریں۔'
              : 'Our administration office at Nawab Colony, Sargodha is open daily. Reach out for student admissions, Zakat consultations, Qurbani bookings, or general visits.'}
          </p>
        </div>

        {/* Contact Info & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-8 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-[#111827]">
                {language === 'ur' ? 'مرکزی دفتر' : 'Central Office'}
              </h3>

              <div className="space-y-4 text-xs text-[#4B5563]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#111827] uppercase tracking-widest text-[10px] block mb-0.5">Address:</span>
                    <span>{language === 'ur' ? settings?.addressUr : settings?.addressEn}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#111827] uppercase tracking-widest text-[10px] block mb-0.5">Phone Lines:</span>
                    <span dir="ltr">{settings?.phone1} / {settings?.phone2}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#111827] uppercase tracking-widest text-[10px] block mb-0.5">Email Inquiries:</span>
                    <span>{settings?.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#111827] uppercase tracking-widest text-[10px] block mb-0.5">Visiting Hours:</span>
                    <span>Saturday – Thursday: 8:00 AM to 5:00 PM</span>
                  </div>
                </div>
              </div>

              {settings?.whatsapp && (
                <div className="pt-4 border-t border-[#E5E1D8]">
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#065F46] hover:bg-[#044E39] text-white py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on Official WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E5E1D8] p-8 sm:p-10 space-y-6">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-[#065F46] text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#111827]">
                    {language === 'ur' ? 'آپ کا پیغام موصول ہو گیا ہے' : 'Thank You for Reaching Out'}
                  </h3>
                  <p className="text-xs text-[#4B5563] max-w-md mx-auto">
                    Our administration will respond to your message promptly. You may also visit the campus during office hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#111827] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-[#E5E1D8] pb-3">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#065F46] block mb-1">
                      Direct Message
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#111827]">
                      {language === 'ur' ? 'آن لائن رابطہ فارم' : 'Send an Inquiry / Admission Request'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Abdul Rehman"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs p-3 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Phone / WhatsApp *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 0300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs p-3 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="youremail@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-3 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Subject</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full text-xs p-3 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                      >
                        <option value="Admission Inquiry">Student Admission Inquiry</option>
                        <option value="Donation / Zakat Confirmation">Donation & Zakat Confirmation</option>
                        <option value="Qurbani Booking">Qurbani 2024 Booking</option>
                        <option value="Mosque Project Inquiry">Mosque Construction Inquiry</option>
                        <option value="General Inquiry">General Campus Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">Message / Questions *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your details or student information here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#111827] hover:bg-black text-white py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-[#D97706]" />
                    <span>{isSubmitting ? 'Sending...' : 'Transmit Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
