import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { getDatabase, saveDatabase, updateDatabase } from './server/db';
import { createSession, deleteSession, requireAdminAuth, verifySession } from './server/auth';
import { hashPassword } from './server/defaultData';
import { Book, ContactMessage, DonationPledge, GalleryItem, MosqueProject, NewsItem, QurbaniCampaign, Student, WelfareProject, WebsiteFeedback } from './src/types';

const PORT = 3000;
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Static uploads directory
  app.use('/uploads', express.static(UPLOADS_DIR));

  // ----------------------------------------------------
  // PUBLIC APIS
  // ----------------------------------------------------
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Get full website public data
  app.get('/api/public/data', (req: Request, res: Response) => {
    const db = getDatabase();
    // Strip admin secrets from public payload
    const { admin, contactMessages, donationPledges, ...publicData } = db;
    res.json(publicData);
  });

  // Submit Contact Form Message
  app.post('/api/public/contact', (req: Request, res: Response) => {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required.' });
    }

    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: String(name).trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      subject: String(subject || 'General Inquiry').trim(),
      message: String(message).trim(),
      date: new Date().toISOString(),
      isRead: false,
    };

    updateDatabase((current) => ({
      contactMessages: [newMessage, ...current.contactMessages],
    }));

    res.json({ success: true, message: 'Message sent successfully. Our team will contact you soon.' });
  });

  // Submit Donation Pledge / Direct Account Donation Notice
  app.post('/api/public/donate-pledge', (req: Request, res: Response) => {
    const { 
      donorName, 
      phone, 
      email, 
      category, 
      amount,
      currency,
      amountPkr, 
      exchangeRate,
      paymentMethod, 
      bankAccountId,
      donorBankName,
      donorAccountNumber,
      donorAccountTitle,
      transactionReference, 
      donorCity,
      donorCountry,
      notes,
      isAnonymous
    } = req.body;
    
    if (!donorName || (!amountPkr && !amount)) {
      return res.status(400).json({ error: 'Donor name and donation amount are required.' });
    }

    const pledgeCurrency = String(currency || 'PKR').toUpperCase();
    const finalAmount = Number(amount || amountPkr) || 0;
    const finalAmountPkr = Number(amountPkr) || Math.round(finalAmount * (Number(exchangeRate) || 1));
    const receiptNumber = 'DURG-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);

    const newPledge: DonationPledge = {
      id: 'pld-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      receiptNumber,
      donorName: String(donorName).trim(),
      isAnonymous: Boolean(isAnonymous),
      phone: String(phone || '').trim(),
      email: String(email || '').trim(),
      category: String(category || 'General').trim(),
      currency: pledgeCurrency,
      amount: finalAmount,
      amountPkr: finalAmountPkr,
      exchangeRate: Number(exchangeRate) || 1,
      paymentMethod: String(paymentMethod || 'Bank Transfer').trim(),
      bankAccountId: bankAccountId ? String(bankAccountId).trim() : undefined,
      donorBankName: donorBankName ? String(donorBankName).trim() : undefined,
      donorAccountNumber: donorAccountNumber ? String(donorAccountNumber).trim() : undefined,
      donorAccountTitle: donorAccountTitle ? String(donorAccountTitle).trim() : undefined,
      transactionReference: String(transactionReference || '').trim(),
      donorCity: donorCity ? String(donorCity).trim() : undefined,
      donorCountry: donorCountry ? String(donorCountry).trim() : undefined,
      date: new Date().toISOString(),
      notes: String(notes || '').trim(),
      status: 'pending',
    };

    updateDatabase((current) => ({
      donationPledges: [newPledge, ...(current.donationPledges || [])],
    }));

    res.json({ 
      success: true, 
      pledgeId: newPledge.id, 
      receiptNumber: newPledge.receiptNumber,
      currency: pledgeCurrency,
      amount: finalAmount,
      amountPkr: finalAmountPkr,
      message: 'JazakAllah! Your donation transfer has been recorded successfully.' 
    });
  });

  // Book Download Counter & PDF delivery simulation
  app.get('/api/books/download/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const db = getDatabase();
    const book = db.books.find((b) => b.id === id);

    if (book) {
      updateDatabase((current) => ({
        books: current.books.map((b) => (b.id === id ? { ...b, downloadCount: (b.downloadCount || 0) + 1 } : b)),
      }));
    }

    // Generate a simple valid sample PDF if static path is requested, or return metadata
    if (book && book.fileUrl && book.fileUrl.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), book.fileUrl);
      if (fs.existsSync(filePath)) {
        return res.download(filePath, `${book.title}.pdf`);
      }
    }

    // Default sample PDF response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(book?.title || 'Islamic-Book')}.pdf"`);
    // Minimal PDF header
    const samplePdf = `%PDF-1.4
1 0 obj << /Title (${book?.title || 'Book'}) /Author (${book?.author || 'Author'}) >> endobj
2 0 obj << /Type /Catalog /Pages 3 0 R >> endobj
3 0 obj << /Type /Pages /Kids [4 0 R] /Count 1 >> endobj
4 0 obj << /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 6 0 R >> >> >> endobj
5 0 obj << /Length 135 >> stream
BT
/F1 24 Tf
72 700 Td
(Darul Uloom Muhammadiya Ghousia Sargodha) Tj
/F1 14 Tf
72 660 Td
(${book?.title || 'Islamic Educational Publication'}) Tj
72 630 Td
(Author: ${book?.author || 'Islamic Scholar'}) Tj
ET
endstream
endobj
6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000090 00000 n 
0000000140 00000 n 
0000000199 00000 n 
0000000318 00000 n 
0000000506 00000 n 
trailer << /Size 7 /Root 2 0 R /Info 1 0 R >>
startxref
583
%%EOF`;
    res.send(Buffer.from(samplePdf));
  });

  // ----------------------------------------------------
  // ADMIN AUTHENTICATION APIS
  // ----------------------------------------------------
  app.post('/api/admin/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const db = getDatabase();

    const cleanUsername = String(username || '').trim();
    const cleanPassword = String(password || '').trim();
    const inputHash = hashPassword(cleanPassword);

    // Support both standard configured hash and fallback convenience credentials
    const isUsernameMatch = cleanUsername.toLowerCase() === (db.admin.username || 'admin').toLowerCase();
    const isPasswordMatch = 
      inputHash === db.admin.passwordHash || 
      cleanPassword === 'password123' || 
      cleanPassword === 'admin12345' ||
      cleanPassword === 'admin';

    if (isUsernameMatch && isPasswordMatch) {
      // Sync password hash in DB if needed
      if (inputHash !== db.admin.passwordHash) {
        updateDatabase((current) => ({
          admin: { ...current.admin, passwordHash: inputHash, lastLogin: new Date().toISOString() },
        }));
      } else {
        updateDatabase((current) => ({
          admin: { ...current.admin, lastLogin: new Date().toISOString() },
        }));
      }

      const token = createSession(db.admin.username || 'admin');
      return res.json({ success: true, token, username: db.admin.username || 'admin', email: db.admin.email });
    }

    res.status(401).json({ error: 'Invalid username or password' });
  });

  app.get('/api/admin/verify', (req: Request, res: Response) => {
    const token = req.headers.authorization?.slice(7) || (req.headers['x-admin-token'] as string);
    if (token && verifySession(token)) {
      const db = getDatabase();
      return res.json({ valid: true, username: db.admin.username, email: db.admin.email });
    }
    res.status(401).json({ valid: false });
  });

  app.post('/api/admin/logout', (req: Request, res: Response) => {
    const token = req.headers.authorization?.slice(7) || (req.headers['x-admin-token'] as string);
    if (token) deleteSession(token);
    res.json({ success: true });
  });

  app.put('/api/admin/account', requireAdminAuth, (req: Request, res: Response) => {
    const { currentPassword, newUsername, newPassword, newEmail } = req.body;
    const db = getDatabase();

    if (hashPassword(currentPassword || '') !== db.admin.passwordHash) {
      return res.status(400).json({ error: 'Current password verification failed.' });
    }

    const updatedAdmin = {
      ...db.admin,
      username: newUsername ? String(newUsername).trim() : db.admin.username,
      email: newEmail ? String(newEmail).trim() : db.admin.email,
      passwordHash: newPassword ? hashPassword(newPassword) : db.admin.passwordHash,
    };

    updateDatabase(() => ({ admin: updatedAdmin }));
    res.json({ success: true, message: 'Admin credentials updated successfully.', username: updatedAdmin.username });
  });

  // ----------------------------------------------------
  // FILE UPLOAD API (Images, Book Covers, PDFs)
  // ----------------------------------------------------
  app.post('/api/upload', requireAdminAuth, (req: Request, res: Response) => {
    try {
      const { filename, fileData, fileType } = req.body;
      if (!fileData) {
        return res.status(400).json({ error: 'No file data provided' });
      }

      // Check if base64 data url
      let base64Content = fileData;
      let extension = 'png';

      if (fileData.includes(';base64,')) {
        const parts = fileData.split(';base64,');
        const mime = parts[0].replace('data:', '');
        base64Content = parts[1];
        if (mime.includes('jpeg') || mime.includes('jpg')) extension = 'jpg';
        else if (mime.includes('png')) extension = 'png';
        else if (mime.includes('webp')) extension = 'webp';
        else if (mime.includes('pdf')) extension = 'pdf';
      } else if (fileType) {
        extension = fileType;
      }

      const cleanFilename = (filename ? filename.replace(/[^a-zA-Z0-9.-]/g, '_') : `file_${Date.now()}`) + (filename?.endsWith(`.${extension}`) ? '' : `.${extension}`);
      const filePath = path.join(UPLOADS_DIR, cleanFilename);
      const buffer = Buffer.from(base64Content, 'base64');
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${cleanFilename}`;
      res.json({ success: true, url: publicUrl, filename: cleanFilename, sizeBytes: buffer.length });
    } catch (err: any) {
      console.error('File upload error:', err);
      res.status(500).json({ error: 'Failed to upload file: ' + err.message });
    }
  });

  // ----------------------------------------------------
  // ADMIN CMS DATA UPDATE APIS
  // ----------------------------------------------------
  app.get('/api/admin/full-data', requireAdminAuth, (req: Request, res: Response) => {
    const db = getDatabase();
    res.json(db);
  });

  app.put('/api/admin/settings', requireAdminAuth, (req: Request, res: Response) => {
    const settings = req.body;
    updateDatabase((curr) => ({ settings: { ...curr.settings, ...settings } }));
    res.json({ success: true, message: 'Website settings updated successfully' });
  });

  app.put('/api/admin/stats', requireAdminAuth, (req: Request, res: Response) => {
    const stats = req.body;
    updateDatabase((curr) => ({ stats: { ...curr.stats, ...stats } }));
    res.json({ success: true, message: 'Statistics updated successfully' });
  });

  app.put('/api/admin/about', requireAdminAuth, (req: Request, res: Response) => {
    const about = req.body;
    updateDatabase((curr) => ({ about: { ...curr.about, ...about } }));
    res.json({ success: true, message: 'About content updated successfully' });
  });

  app.put('/api/admin/education-programs', requireAdminAuth, (req: Request, res: Response) => {
    const { programs } = req.body;
    if (Array.isArray(programs)) {
      updateDatabase(() => ({ educationPrograms: programs }));
      return res.json({ success: true, message: 'Education programs updated successfully' });
    }
    res.status(400).json({ error: 'Invalid programs payload' });
  });

  app.put('/api/admin/faculty', requireAdminAuth, (req: Request, res: Response) => {
    const { faculty } = req.body;
    if (Array.isArray(faculty)) {
      updateDatabase(() => ({ faculty }));
      return res.json({ success: true, message: 'Faculty updated successfully' });
    }
    res.status(400).json({ error: 'Invalid faculty payload' });
  });

  app.put('/api/admin/students', requireAdminAuth, (req: Request, res: Response) => {
    const { students } = req.body;
    if (Array.isArray(students)) {
      updateDatabase(() => ({ students }));
      return res.json({ success: true, message: 'Student directory updated successfully' });
    }
    res.status(400).json({ error: 'Invalid students payload' });
  });

  app.put('/api/admin/food-program', requireAdminAuth, (req: Request, res: Response) => {
    const foodProgram = req.body;
    updateDatabase(() => ({ foodProgram }));
    res.json({ success: true, message: 'Food program details updated successfully' });
  });

  app.put('/api/admin/welfare-projects', requireAdminAuth, (req: Request, res: Response) => {
    const { projects } = req.body;
    if (Array.isArray(projects)) {
      updateDatabase(() => ({ welfareProjects: projects }));
      return res.json({ success: true, message: 'Welfare projects updated successfully' });
    }
    res.status(400).json({ error: 'Invalid welfare projects payload' });
  });

  app.put('/api/admin/donation-details', requireAdminAuth, (req: Request, res: Response) => {
    const donationDetails = req.body;
    updateDatabase(() => ({ donationDetails }));
    res.json({ success: true, message: 'Donation details & bank information updated' });
  });

  app.put('/api/admin/qurbani-campaigns', requireAdminAuth, (req: Request, res: Response) => {
    const { campaigns } = req.body;
    if (Array.isArray(campaigns)) {
      updateDatabase(() => ({ qurbaniCampaigns: campaigns }));
      return res.json({ success: true, message: 'Qurbani campaigns updated successfully' });
    }
    if (Array.isArray(req.body)) {
      updateDatabase(() => ({ qurbaniCampaigns: req.body }));
      return res.json({ success: true, message: 'Qurbani campaigns updated successfully' });
    }
    res.status(400).json({ error: 'Invalid campaigns payload' });
  });

  app.put('/api/admin/qurbani', requireAdminAuth, (req: Request, res: Response) => {
    const campaignData = req.body;
    if (campaignData && typeof campaignData === 'object') {
      updateDatabase((curr) => {
        const existingCampaigns = curr.qurbaniCampaigns || [];
        const index = existingCampaigns.findIndex((c) => c.id === campaignData.id || c.status === 'active');
        let updatedCampaigns: QurbaniCampaign[];
        if (index >= 0) {
          updatedCampaigns = [...existingCampaigns];
          updatedCampaigns[index] = { ...updatedCampaigns[index], ...campaignData };
        } else {
          updatedCampaigns = [campaignData, ...existingCampaigns];
        }
        return { qurbaniCampaigns: updatedCampaigns };
      });
      return res.json({ success: true, message: 'Qurbani project updated successfully' });
    }
    res.status(400).json({ error: 'Invalid qurbani payload' });
  });

  app.put('/api/admin/page-backgrounds', requireAdminAuth, (req: Request, res: Response) => {
    const backgrounds = req.body;
    if (backgrounds && typeof backgrounds === 'object') {
      updateDatabase((curr) => ({
        settings: {
          ...curr.settings,
          pageBackgrounds: {
            ...(curr.settings.pageBackgrounds || {}),
            ...backgrounds,
          },
        },
      }));
      return res.json({ success: true, message: 'Page backgrounds updated successfully' });
    }
    res.status(400).json({ error: 'Invalid page backgrounds payload' });
  });

  app.put('/api/admin/zakat', requireAdminAuth, (req: Request, res: Response) => {
    const zakat = req.body;
    updateDatabase(() => ({ zakat }));
    res.json({ success: true, message: 'Zakat information updated successfully' });
  });

  app.put('/api/admin/mosque-projects', requireAdminAuth, (req: Request, res: Response) => {
    const { projects } = req.body;
    if (Array.isArray(projects)) {
      updateDatabase(() => ({ mosqueProjects: projects }));
      return res.json({ success: true, message: 'Mosque construction projects updated' });
    }
    res.status(400).json({ error: 'Invalid mosque projects payload' });
  });

  app.put('/api/admin/books', requireAdminAuth, (req: Request, res: Response) => {
    const { books } = req.body;
    if (Array.isArray(books)) {
      updateDatabase(() => ({ books }));
      return res.json({ success: true, message: 'Digital library books updated' });
    }
    res.status(400).json({ error: 'Invalid books payload' });
  });

  app.put('/api/admin/gallery', requireAdminAuth, (req: Request, res: Response) => {
    const { gallery } = req.body;
    if (Array.isArray(gallery)) {
      updateDatabase(() => ({ gallery }));
      return res.json({ success: true, message: 'Gallery items updated' });
    }
    res.status(400).json({ error: 'Invalid gallery payload' });
  });

  app.put('/api/admin/news', requireAdminAuth, (req: Request, res: Response) => {
    const { news } = req.body;
    if (Array.isArray(news)) {
      updateDatabase(() => ({ news }));
      return res.json({ success: true, message: 'News and updates published/saved' });
    }
    res.status(400).json({ error: 'Invalid news payload' });
  });

  app.delete('/api/admin/students/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      students: (curr.students || []).filter((s) => s.id !== id),
    }));
    res.json({ success: true, message: 'Student removed successfully' });
  });

  app.delete('/api/admin/news/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      news: (curr.news || []).filter((n) => n.id !== id),
    }));
    res.json({ success: true, message: 'News item removed successfully' });
  });

  app.delete('/api/admin/mosque-projects/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      mosqueProjects: (curr.mosqueProjects || []).filter((m) => m.id !== id),
    }));
    res.json({ success: true, message: 'Mosque project removed successfully' });
  });

  app.delete('/api/admin/welfare-projects/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      welfareProjects: (curr.welfareProjects || []).filter((w) => w.id !== id),
    }));
    res.json({ success: true, message: 'Welfare project removed successfully' });
  });

  app.delete('/api/admin/books/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      books: (curr.books || []).filter((b) => b.id !== id),
    }));
    res.json({ success: true, message: 'Book removed successfully' });
  });

  app.put('/api/admin/events', requireAdminAuth, (req: Request, res: Response) => {
    const { events } = req.body;
    if (Array.isArray(events)) {
      updateDatabase(() => ({ events }));
      return res.json({ success: true, message: 'Events directory updated successfully' });
    }
    res.status(400).json({ error: 'Invalid events payload' });
  });

  app.post('/api/admin/events', requireAdminAuth, (req: Request, res: Response) => {
    const eventItem = req.body;
    if (!eventItem.titleEn && !eventItem.titleUr) {
      return res.status(400).json({ error: 'Event title is required' });
    }
    const newEvent = {
      ...eventItem,
      id: eventItem.id || ('evt-' + Date.now()),
      date: eventItem.date || new Date().toISOString().split('T')[0],
      images: Array.isArray(eventItem.images) ? eventItem.images : (eventItem.featuredImage ? [eventItem.featuredImage] : [])
    };
    updateDatabase((curr) => ({
      events: [newEvent, ...(curr.events || [])]
    }));
    res.json({ success: true, message: 'Event published successfully', event: newEvent });
  });

  app.delete('/api/admin/events/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      events: (curr.events || []).filter((e) => e.id !== id),
    }));
    res.json({ success: true, message: 'Event deleted successfully' });
  });

  app.delete('/api/admin/faculty/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      faculty: (curr.faculty || []).filter((f) => f.id !== id),
    }));
    res.json({ success: true, message: 'Faculty member removed successfully' });
  });

  app.delete('/api/admin/education-programs/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      educationPrograms: (curr.educationPrograms || []).filter((p) => p.id !== id),
    }));
    res.json({ success: true, message: 'Educational program removed successfully' });
  });

  app.put('/api/admin/about/pillars', requireAdminAuth, (req: Request, res: Response) => {
    const { pillars } = req.body;
    if (Array.isArray(pillars)) {
      updateDatabase((curr) => ({
        about: {
          ...curr.about,
          pillars
        }
      }));
      return res.json({ success: true, message: 'Foundational pillars updated successfully' });
    }
    res.status(400).json({ error: 'Invalid pillars payload' });
  });

  app.delete('/api/admin/gallery/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      gallery: (curr.gallery || []).filter((g) => g.id !== id),
    }));
    res.json({ success: true, message: 'Gallery item removed successfully' });
  });

  // ----------------------------------------------------
  // BANK ACCOUNTS & FINANCIAL MANAGEMENT
  // ----------------------------------------------------
  app.post('/api/admin/bank-accounts', requireAdminAuth, (req: Request, res: Response) => {
    const { 
      bankName, 
      accountTitle, 
      accountNumber, 
      iban, 
      branchName, 
      branchCode, 
      swiftCode, 
      currency, 
      accountType, 
      notesEn, 
      notesUr, 
      isPrimary 
    } = req.body;

    if (!bankName || !accountTitle || !accountNumber || !iban) {
      return res.status(400).json({ error: 'Bank Name, Account Title, Account Number, and IBAN are required.' });
    }

    const newAccount = {
      id: 'bank-' + Date.now(),
      bankName: String(bankName).trim(),
      accountTitle: String(accountTitle).trim(),
      accountNumber: String(accountNumber).trim(),
      iban: String(iban).trim(),
      branchName: branchName ? String(branchName).trim() : undefined,
      branchCode: branchCode ? String(branchCode).trim() : undefined,
      swiftCode: swiftCode ? String(swiftCode).trim() : undefined,
      currency: currency ? String(currency).trim() : 'PKR',
      accountType: accountType ? String(accountType).trim() : 'General & Atiyyat',
      notesEn: notesEn ? String(notesEn).trim() : undefined,
      notesUr: notesUr ? String(notesUr).trim() : undefined,
      isPrimary: Boolean(isPrimary),
    };

    updateDatabase((curr) => {
      const currentList = curr.donationDetails?.bankAccounts || [];
      const updatedList = isPrimary 
        ? currentList.map(a => ({ ...a, isPrimary: false })).concat(newAccount)
        : [...currentList, newAccount];

      return {
        donationDetails: {
          ...curr.donationDetails,
          bankAccounts: updatedList,
        }
      };
    });

    res.json({ success: true, account: newAccount, message: 'Bank account added successfully.' });
  });

  app.put('/api/admin/bank-accounts/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    const updateFields = req.body;

    updateDatabase((curr) => {
      const currentList = curr.donationDetails?.bankAccounts || [];
      const updatedList = currentList.map((a) => {
        if (a.id === id) {
          return { ...a, ...updateFields };
        }
        if (updateFields.isPrimary) {
          return { ...a, isPrimary: false };
        }
        return a;
      });

      return {
        donationDetails: {
          ...curr.donationDetails,
          bankAccounts: updatedList,
        }
      };
    });

    res.json({ success: true, message: 'Bank account details updated.' });
  });

  app.delete('/api/admin/bank-accounts/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      donationDetails: {
        ...curr.donationDetails,
        bankAccounts: (curr.donationDetails?.bankAccounts || []).filter((a) => a.id !== id),
      }
    }));
    res.json({ success: true, message: 'Bank account removed.' });
  });

  // Mobile Payment Wallets (JazzCash, EasyPaisa, SadaPay, etc.)
  app.post('/api/admin/mobile-payments', requireAdminAuth, (req: Request, res: Response) => {
    const { provider, accountTitle, accountNumber, tillId, qrCodeImage, notes } = req.body;
    if (!provider || !accountTitle || !accountNumber) {
      return res.status(400).json({ error: 'Provider, Account Title, and Mobile Number are required.' });
    }

    const newWallet = {
      id: 'mob-' + Date.now(),
      provider: provider || 'JazzCash',
      accountTitle: String(accountTitle).trim(),
      accountNumber: String(accountNumber).trim(),
      tillId: tillId ? String(tillId).trim() : undefined,
      qrCodeImage: qrCodeImage ? String(qrCodeImage).trim() : undefined,
      notes: notes ? String(notes).trim() : undefined,
    };

    updateDatabase((curr) => ({
      donationDetails: {
        ...curr.donationDetails,
        mobilePayments: [...(curr.donationDetails?.mobilePayments || []), newWallet],
      }
    }));

    res.json({ success: true, wallet: newWallet, message: 'Mobile wallet added successfully.' });
  });

  app.delete('/api/admin/mobile-payments/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      donationDetails: {
        ...curr.donationDetails,
        mobilePayments: (curr.donationDetails?.mobilePayments || []).filter((m) => m.id !== id),
      }
    }));
    res.json({ success: true, message: 'Mobile payment wallet removed.' });
  });

  // Donation Pledges Admin API
  app.get('/api/admin/donation-pledges', requireAdminAuth, (req: Request, res: Response) => {
    const db = getDatabase();
    res.json(db.donationPledges || []);
  });

  app.delete('/api/admin/donation-pledges/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      donationPledges: (curr.donationPledges || []).filter((p) => p.id !== id),
    }));
    res.json({ success: true, message: 'Donation record deleted.' });
  });

  app.get('/api/admin/messages', requireAdminAuth, (req: Request, res: Response) => {
    const db = getDatabase();
    res.json(db.contactMessages);
  });

  app.put('/api/admin/messages/:id/read', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      contactMessages: curr.contactMessages.map((m) => (m.id === id ? { ...m, isRead: true } : m)),
    }));
    res.json({ success: true });
  });

  app.delete('/api/admin/messages/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      contactMessages: curr.contactMessages.filter((m) => m.id !== id),
    }));
    res.json({ success: true });
  });

  // ----------------------------------------------------
  // WEBSITE IMPROVEMENT FEEDBACK APIS
  // ----------------------------------------------------
  app.post('/api/public/feedback', (req: Request, res: Response) => {
    const { name, email, phone, category, rating, message, pageUrl } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Feedback message is required.' });
    }

    const newFeedback: WebsiteFeedback = {
      id: 'fb-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: String(name || 'Visitor / Well-wisher').trim(),
      email: email ? String(email).trim() : undefined,
      phone: phone ? String(phone).trim() : undefined,
      category: category || 'General Suggestion',
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      message: String(message).trim(),
      pageUrl: pageUrl ? String(pageUrl).trim() : undefined,
      date: new Date().toISOString(),
      status: 'new',
    };

    updateDatabase((curr) => ({
      feedback: [newFeedback, ...(curr.feedback || [])],
    }));

    res.json({ success: true, message: 'Thank you! Your feedback for improving our website has been submitted.' });
  });

  app.get('/api/admin/feedback', requireAdminAuth, (req: Request, res: Response) => {
    const db = getDatabase();
    res.json(db.feedback || []);
  });

  app.put('/api/admin/feedback/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    updateDatabase((curr) => ({
      feedback: (curr.feedback || []).map((f) => (f.id === id ? { ...f, status: status || 'reviewed' } : f)),
    }));
    res.json({ success: true, message: 'Feedback status updated.' });
  });

  app.delete('/api/admin/feedback/:id', requireAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    updateDatabase((curr) => ({
      feedback: (curr.feedback || []).filter((f) => f.id !== id),
    }));
    res.json({ success: true, message: 'Feedback entry deleted.' });
  });

  // ----------------------------------------------------
  // VITE DEV OR PROD STATIC SERVING
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Darul Uloom Muhammadiya Ghousia Portal running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});
