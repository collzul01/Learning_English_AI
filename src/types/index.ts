export type ModuleStep = 'warmup' | 'roleplay' | 'shadowing' | 'debrief';

export interface SuggestedResponse {
  level: 'A2' | 'B1';
  text: string;
  vietnamese: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  vietnameseTranslation?: string;
  recastNote?: string | null;
  suggestions?: SuggestedResponse[];
  pedagogyHighlights?: string[];
  audioBase64?: string;
  timestamp: number;
}

export interface DailyDebriefData {
  bestPoints: string[];
  needsWork: {
    learnerSaid: string;
    improvedB1: string;
    explanationVi: string;
  }[];
  bedtimeDrill: {
    challengeQuestionEn: string;
    situationVi: string;
    targetReflexChunk: string;
    sampleResponseB1: string;
  };
  professorSummaryVi: string;
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  totalMinutesPracticed: number;
  streakDays: number;
  lastPracticeDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string; // Emoji avatar e.g. '👨', '👩', '👧', '👦', '🎓', '🚀', '🌟', '☕'
  roleLabel?: string; // e.g. 'Bố', 'Mẹ', 'Bé', 'Học viên'
  colorTheme: string; // e.g. 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'purple'
  currentDay: number;
  completedDays: number[];
  totalMinutesPracticed: number;
  streakDays: number;
  lastPracticeDate: string;
  voiceName?: string;
  autoPlayAudio?: boolean;
  createdAt: number;
  lastActiveAt: number;
}

export interface BackgroundSettings {
  customImage: string | null; // data URL or custom image
  opacity: number; // 0.1 to 0.8 (default 0.35)
  blurPx: number; // 0 to 20px (default 6)
  brightness: number; // 0.3 to 1.0 (default 0.75)
  overlayMode: 'obsidian' | 'slate' | 'cinema'; // tint color
}

export interface VocabularyItem {
  id: string;
  phrase: string;
  day: number;
  learnedAt: number;
  contextSnippet?: string;
  mastered?: boolean;
}

export interface JournalEntry {
  id: string;
  day: number;
  date: string;
  reflectionText: string;
  confidenceMood?: 'confident' | 'progressing' | 'challenging';
  favoriteChunkUsed?: string;
  createdAt: number;
}
