import fs from 'fs';
import path from 'path';
import { AppDatabase } from '../src/types';
import { defaultDatabase } from './defaultData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const BACKUP_FILE = path.join(DATA_DIR, 'database.backup.json');

let dbMemory: AppDatabase | null = null;

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getDatabase(): AppDatabase {
  if (dbMemory) {
    return dbMemory;
  }

  ensureDataDirectory();

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Merge with defaults in case of missing keys
      dbMemory = {
        ...defaultDatabase,
        ...parsed,
        settings: { ...defaultDatabase.settings, ...(parsed.settings || {}) },
        stats: { ...defaultDatabase.stats, ...(parsed.stats || {}) },
        about: { 
          ...defaultDatabase.about, 
          ...(parsed.about || {}),
          pillars: (parsed.about?.pillars && parsed.about.pillars.length > 0) ? parsed.about.pillars : defaultDatabase.about.pillars,
        },
        foodProgram: { 
          ...defaultDatabase.foodProgram, 
          ...(parsed.foodProgram || {}),
          weeklySchedule: (parsed.foodProgram?.weeklySchedule && parsed.foodProgram.weeklySchedule.length > 0) ? parsed.foodProgram.weeklySchedule : defaultDatabase.foodProgram.weeklySchedule,
          sponsorshipPackages: (parsed.foodProgram?.sponsorshipPackages && parsed.foodProgram.sponsorshipPackages.length > 0) ? parsed.foodProgram.sponsorshipPackages : defaultDatabase.foodProgram.sponsorshipPackages,
        },
        events: (parsed.events && parsed.events.length > 0) ? parsed.events : defaultDatabase.events,
        faculty: (parsed.faculty && parsed.faculty.length > 0) ? parsed.faculty : defaultDatabase.faculty,
        educationPrograms: (parsed.educationPrograms && parsed.educationPrograms.length > 0) ? parsed.educationPrograms : defaultDatabase.educationPrograms,
        donationDetails: { ...defaultDatabase.donationDetails, ...(parsed.donationDetails || {}) },
        zakat: { ...defaultDatabase.zakat, ...(parsed.zakat || {}) },
        admin: { ...defaultDatabase.admin, ...(parsed.admin || {}) },
      };
      return dbMemory!;
    } catch (err) {
      console.error('Failed to parse database.json, initializing from default:', err);
    }
  }

  // If DB file doesn't exist or failed to parse, initialize with defaultDatabase
  dbMemory = JSON.parse(JSON.stringify(defaultDatabase));
  saveDatabase(dbMemory!);
  return dbMemory!;
}

export function saveDatabase(data: AppDatabase): void {
  ensureDataDirectory();
  dbMemory = data;
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    // Write atomic
    const tempFile = path.join(DATA_DIR, `database.temp.${Date.now()}.json`);
    fs.writeFileSync(tempFile, jsonStr, 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error writing to database.json:', err);
  }
}

export function updateDatabase(updater: (current: AppDatabase) => Partial<AppDatabase>): AppDatabase {
  const current = getDatabase();
  const updates = updater(current);
  const updated: AppDatabase = {
    ...current,
    ...updates,
  };
  saveDatabase(updated);
  return updated;
}
