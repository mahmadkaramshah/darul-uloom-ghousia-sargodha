import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Download, Search, FileText, User, Tag, ExternalLink } from 'lucide-react';

export const BooksView: React.FC = () => {
  const { data, language, showToast } = useApp();
  const books = data?.books || [];
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredBooks = books.filter((b) => {
    const cat = b.category || (b as any).categoryEn || '';
    const title = b.title || (b as any).titleEn || '';
    const titleUr = b.titleUr || (b as any).titleUr || title;
    const author = b.author || (b as any).authorEn || '';
    const authorUr = (b as any).authorUr || author;

    const matchesCat = selectedCategory === 'all' || cat.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      titleUr.includes(search) ||
      author.toLowerCase().includes(search.toLowerCase()) ||
      authorUr.includes(search);
    return matchesCat && matchesSearch;
  });

  const handleDownload = (bookTitle: string) => {
    showToast(`Downloading PDF: ${bookTitle}`, 'success');
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-[#E5E1D8] pb-10">
          <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest block mb-2">
            Classical Scholarly Treatises & Dars Manuals
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-tight mb-4">
            {language === 'ur' ? 'کتب لائبریری و علمی تصانیف' : 'Islamic Library & Scholarly Publications'}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {language === 'ur'
              ? 'دارالعلوم کی لائبریری میں تفسیر، حدیث، فقہ، اصول، تصوف اور عربی ادب کی قیمتی کتب کا ذخیرہ موجود ہے۔ شائقینِ علم کے لیے پی ڈی ایف کتب مفت ڈاؤن لوڈ کے لیے دستیاب ہیں۔'
              : 'Explore classical Islamic treatises, Dars-e-Nizami textbooks, Fatawa compendiums, and Quranic commentaries available for open study and PDF download.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#E5E1D8] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {['all', 'fiqh', 'quran', 'hadith', 'dars-e-nizami'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#111827] text-white border-[#111827]'
                    : 'bg-white text-[#4B5563] border-[#E5E1D8] hover:border-[#065F46]'
                }`}
              >
                {cat === 'all' ? 'All Books' : cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search book or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-[#F8F9F5] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => {
            const title = book.title || (book as any).titleEn || 'Book';
            const titleUr = book.titleUr || (book as any).titleUr || title;
            const author = book.author || (book as any).authorEn || 'Islamic Scholar';
            const authorUr = (book as any).authorUr || author;
            const cat = book.category || (book as any).categoryEn || 'General';
            const pages = book.pages || (book as any).pagesCount || 250;
            const size = book.fileSizeMb ? `${book.fileSizeMb} MB` : (book as any).fileSize || '12 MB';
            const lang = (book as any).languageEn || 'Arabic / Urdu';
            const desc = book.description || (book as any).descriptionEn || '';
            const descUr = (book as any).descriptionUr || desc;

            return (
              <div key={book.id} className="bg-white border border-[#E5E1D8] border-l-4 border-l-[#065F46] p-8 flex flex-col justify-between hover:border-[#065F46] transition-all space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] bg-[#F8F9F5] px-2.5 py-1 border border-[#E5E1D8]">
                      {cat}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {pages} Pages
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#111827]">
                    {language === 'ur' ? titleUr : title}
                  </h3>

                  <div className="text-xs text-[#6B7280] space-y-1">
                    <div>
                      <span className="font-semibold text-gray-400 uppercase tracking-widest text-[10px]">Author:</span>{' '}
                      <span className="font-serif font-bold text-[#111827]">{language === 'ur' ? authorUr : author}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-400 uppercase tracking-widest text-[10px]">Language:</span>{' '}
                      <span>{lang}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4B5563] leading-relaxed pt-2">
                    {language === 'ur' ? descUr : desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E1D8]">
                  <button
                    onClick={() => handleDownload(title)}
                    className="w-full bg-[#111827] hover:bg-black text-white py-2.5 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-[#D97706]" />
                    <span>Download Free PDF ({size})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
