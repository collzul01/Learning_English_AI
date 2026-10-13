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
