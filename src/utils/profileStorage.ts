import { UserProfile, VocabularyItem, JournalEntry, BackgroundSettings } from '../types';

const PROFILES_STORAGE_KEY = 'lingoreflex_profiles_v2';
const ACTIVE_PROFILE_KEY = 'lingoreflex_active_profile_id_v2';
const BG_SETTINGS_KEY = 'lingoreflex_bg_settings_v2';

// Default family profiles inspired by the uploaded family photo
export const DEFAULT_PROFILES: UserProfile[] = [
  {
    id: 'profile-dad',
    name: 'Bố',
    roleLabel: 'Phụ huynh',
    avatar: '👨‍💼',
    colorTheme: 'indigo',
    currentDay: 4,
    completedDays: [1, 2, 3],
    totalMinutesPracticed: 180,
    streakDays: 4,
    lastPracticeDate: new Date().toISOString().split('T')[0],
    voiceName: 'Kore',
    autoPlayAudio: true,
    createdAt: Date.now() - 4 * 86400000,
    lastActiveAt: Date.now(),
  },
  {
    id: 'profile-mom',
    name: 'Mẹ',
    roleLabel: 'Phụ huynh',
    avatar: '👩‍🏫',
    colorTheme: 'rose',
    currentDay: 2,
    completedDays: [1],
    totalMinutesPracticed: 60,
    streakDays: 2,
    lastPracticeDate: new Date().toISOString().split('T')[0],
    voiceName: 'Zephyr',
    autoPlayAudio: true,
    createdAt: Date.now() - 2 * 86400000,
    lastActiveAt: Date.now() - 86400000,
  },
  {
    id: 'profile-kid',
    name: 'Bé',
    roleLabel: 'Con gái',
    avatar: '👧',
    colorTheme: 'amber',
    currentDay: 1,
    completedDays: [],
    totalMinutesPracticed: 0,
    streakDays: 1,
    lastPracticeDate: new Date().toISOString().split('T')[0],
    voiceName: 'Puck',
    autoPlayAudio: true,
    createdAt: Date.now(),
    lastActiveAt: Date.now(),
  },
];

// Default Background Settings
export const DEFAULT_BG_SETTINGS: BackgroundSettings = {
  customImage: null, // If null, uses the built-in family lantern theme
  opacity: 0.38, // 38% opacity keeps the photo visible while text pops
  blurPx: 4, // 4px blur softens busy street details for maximum readability
  brightness: 0.75, // 75% brightness prevents harsh glare
  overlayMode: 'obsidian',
};

// Profile storage operations
export function getStoredProfiles(): UserProfile[] {
  try {
    const raw = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored profiles:', err);
  }
  // Initialize with defaults if empty
  saveStoredProfiles(DEFAULT_PROFILES);
  return DEFAULT_PROFILES;
}

export function saveStoredProfiles(profiles: UserProfile[]) {
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  } catch (err) {
    console.warn('Failed to save profiles:', err);
  }
}

export function getActiveProfileId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
  } catch {
    return null;
  }
}

export function setActiveProfileId(id: string) {
  try {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  } catch (err) {
    console.warn('Failed to save active profile id:', err);
  }
}

// Isolated Vocabulary storage per profile
export function getProfileVocab(profileId: string): VocabularyItem[] {
  try {
    const raw = localStorage.getItem(`lingoreflex_vocab_${profileId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    {
      id: `v-${profileId}-1`,
      phrase: 'step out of my comfort zone',
      day: 1,
      learnedAt: Date.now(),
      contextSnippet: 'I decided to join this club to step out of my comfort zone.',
      mastered: false,
    },
    {
      id: `v-${profileId}-2`,
      phrase: 'be really into something',
      day: 1,
      learnedAt: Date.now(),
      contextSnippet: "Lately, I've been really into acoustic music and photography.",
      mastered: false,
    },
  ];
}

export function saveProfileVocab(profileId: string, items: VocabularyItem[]) {
  try {
    localStorage.setItem(`lingoreflex_vocab_${profileId}`, JSON.stringify(items));
  } catch {}
}

// Isolated Journal storage per profile
export function getProfileJournal(profileId: string): JournalEntry[] {
  try {
    const raw = localStorage.getItem(`lingoreflex_journal_${profileId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveProfileJournal(profileId: string, entries: JournalEntry[]) {
  try {
    localStorage.setItem(`lingoreflex_journal_${profileId}`, JSON.stringify(entries));
  } catch {}
}

// Background settings storage
export function getStoredBgSettings(): BackgroundSettings {
  try {
    const raw = localStorage.getItem(BG_SETTINGS_KEY);
    if (raw) return { ...DEFAULT_BG_SETTINGS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_BG_SETTINGS;
}

export function saveStoredBgSettings(settings: BackgroundSettings) {
  try {
    localStorage.setItem(BG_SETTINGS_KEY, JSON.stringify(settings));
  } catch {}
}
