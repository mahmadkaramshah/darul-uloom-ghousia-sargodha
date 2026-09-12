import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Star, 
  MessageSquareHeart, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const CATEGORIES = [
  { value: 'General Suggestion', labelEn: 'General Suggestion', labelUr: 'عمومی تجویز' },
  { value: 'Design & Usability', labelEn: 'Design & Reading Experience', labelUr: 'ڈیزائن اور پڑھنے کی سہولت' },
  { value: 'Content & Information', labelEn: 'Content & Books Information', labelUr: 'معلومات و کتب لائبریری' },
  { value: 'Islamic Accuracy & Arabic', labelEn: 'Islamic Accuracy & Proofreading', labelUr: 'شرعی و عربی درستگی' },
  { value: 'Mobile & Speed', labelEn: 'Mobile View & Speed', labelUr: 'موبائل ویو اور سپیڈ' },
];

export const WebsiteFeedbackSection: React.FC = () => {
  const { language, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [category, setCategory] = useState<any>('General Suggestion');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      showToast(language === 'ur' ? 'برائے مہربانی اپنی رائے یا تجویز تحریر فرمائیں۔' : 'Please enter your feedback or suggestion.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/public/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          category,
          rating,
          message: message.trim(),
          pageUrl: window.location.href,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        showToast(
          language === 'ur' 
            ? 'جزاک اللہ خیراً! آپ کی قیمتی رائے موصول ہو چکی ہے۔' 
            : 'JazakAllah Khair! Your website improvement feedback has been received.',
          'success'
        );
      } else {
        showToast('Failed to submit feedback. Please try again.', 'error');
      }
    } catch {
      showToast('Network error while submitting feedback', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setMessage('');
    setName('');
    setEmail('');
    setPhone('');
    setRating(5);
    setCategory('General Suggestion');
  };

  return (
    <section className="bg-[#F8F9F5] border-t border-b border-[#E5E1D8] py-8 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Toggleable / Collapsible Header */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group bg-white border border-[#E5E1D8] p-5 hover:border-[#065F46] transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-[#FDFBF7] border border-[#E5E1D8] text-[#065F46] group-hover:bg-[#065F46] group-hover:text-white transition-colors shrink-0">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706]">
                  {language === 'ur' ? 'ویب سائٹ بہتری' : 'Continuous Improvement'}
                </span>
                <span className="text-[9px] bg-[#F8F9F5] text-gray-500 border border-[#E5E1D8] px-1.5 py-0.5 font-bold uppercase">
                  Community Feedback
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#111827] group-hover:text-[#065F46] transition-colors">
                {language === 'ur' 
                  ? 'ویب سائٹ کو مزید بہتر بنانے کے لیے اپنی قیمتی رائے اور تجاویز دیں' 
                  : 'Help Us Improve: Share Your Website Suggestions & Feedback'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#065F46] group-hover:underline">
              {isOpen 
                ? (language === 'ur' ? 'فارم بند کریں' : 'Close Form') 
                : (language === 'ur' ? 'رائے درج کریں' : 'Give Feedback')}
            </span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-[#065F46]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#065F46]" />
            )}
          </div>
        </div>

        {/* Feedback Form Expansion */}
        {isOpen && (
          <div className="mt-4 bg-white border border-[#E5E1D8] p-6 sm:p-8 animate-in fade-in slide-in-from-top-2 duration-150">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-green-50 text-[#065F46] rounded-full flex items-center justify-center mx-auto border border-green-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-serif font-bold text-[#111827]">
                    {language === 'ur' ? 'جزاک اللہ خیراً کثیراً' : 'JazakAllah Khair for Your Valuable Feedback!'}
                  </h4>
                  <p className="text-xs text-[#4B5563] max-w-md mx-auto">
                    {language === 'ur' 
                      ? 'آپ کی مخلصانہ رائے اور تجاویز ہمارے منتظمین تک پہنچ چکی ہیں۔ ہم دارالعلوم کی ویب سائٹ کو مزید کارآمد بنانے کے لیے مسلسل کوشاں ہیں۔' 
                      : 'Your suggestions have been recorded and sent to our administrative team. We continuously review visitor feedback to enhance the digital portal.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-[#065F46] font-bold uppercase tracking-widest hover:underline pt-2 cursor-pointer"
                >
                  {language === 'ur' ? 'مزید کوئی تجویز ارسال کریں' : 'Submit another suggestion'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Rating Selection */}
                <div className="border-b border-[#E5E1D8] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#111827] block">
                      {language === 'ur' ? 'آپ کا مجموعی تاثر و تجربہ:' : 'Your Overall Website Experience:'}
                    </label>
                    <span className="text-[11px] text-gray-500">
                      {language === 'ur' ? 'ستاروں پر کلک کر کے ریٹنگ منتخب کریں' : 'Rate the website readability, speed, and design'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating !== null ? hoverRating : rating) >= star;
                      return (
                        <button
                          type="button"
                          key={star}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                          title={`${star} Star${star > 1 ? 's' : ''}`}
                        >
                          <Star 
                            className={`w-6 h-6 transition-colors ${
                              isFilled 
                                ? 'text-[#D97706] fill-[#D97706]' 
                                : 'text-gray-300'
                            }`} 
                          />
                        </button>
                      );
                    })}
                    <span className="text-xs font-bold font-mono text-[#D97706] ml-2">
                      {rating} / 5
                    </span>
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-2">
                    {language === 'ur' ? 'تجویز کا شعبہ / کیٹیگری:' : 'Feedback Topic / Category:'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        type="button"
                        key={cat.value}
                        onClick={() => setCategory(cat.value)}
                        className={`text-xs p-2.5 border text-center transition-all cursor-pointer ${
                          category === cat.value
                            ? 'bg-[#065F46] text-white border-[#065F46] font-bold shadow-xs'
                            : 'bg-[#FDFBF7] text-gray-700 border-[#E5E1D8] hover:border-gray-400'
                        }`}
                      >
                        {language === 'ur' ? cat.labelUr : cat.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message / Suggestions Text */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    {language === 'ur' ? 'آپ کی تجویز یا تاثرات (ضروری) *' : 'Your Detailed Feedback & Suggestions *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      language === 'ur'
                        ? 'مثال کے طور پر: موبائل ویو پر کتب لائبریری کے سرچ فلٹرز، نیا فیچر، عربی عبارات کی درستگی یا ڈیزائن کی بہتری...'
                        : 'e.g., Any suggestion regarding book downloads, mobile navigation, Arabic typography, or new features you would like to see...'
                    }
                    className="w-full text-xs sm:text-sm p-3 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46] leading-relaxed"
                  />
                </div>

                {/* Optional Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                      {language === 'ur' ? 'آپ کا نام (اختیاری)' : 'Your Name (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'ur' ? 'محمد علی' : 'e.g. Brother Ahmad'}
                      className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                      {language === 'ur' ? 'ای میل (اختیاری)' : 'Email Address (Optional)'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. user@example.com"
                      className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                      {language === 'ur' ? 'فون / واٹس ایپ (اختیاری)' : 'WhatsApp / Phone (Optional)'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full text-xs px-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
                    />
                  </div>
                </div>

                {/* Submit Row */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E5E1D8]">
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{language === 'ur' ? 'ہم ہر تجویز کا جائزہ لے کر ویب سائٹ کو بہتر بناتے ہیں۔' : 'Reviewed directly by the Darul Uloom digital administration.'}</span>
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#065F46] hover:bg-[#044E39] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? (language === 'ur' ? 'ارسال ہو رہا ہے...' : 'Sending...') : (language === 'ur' ? 'تجویز بھیجیں' : 'Submit Feedback')}</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
