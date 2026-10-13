export interface GrammarAnnotation {
  type: 'tense_modal' | 'connector' | 'chunk' | 'question_pattern';
  label: string;
  labelVi: string;
  colorClass: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
  };
  explanationVi: string;
}

export interface GrammarMatch {
  start: number;
  end: number;
  text: string;
  annotation: GrammarAnnotation;
}

// Color palettes for Grammar Insight
export const GRAMMAR_TYPES: Record<string, GrammarAnnotation> = {
  tense_modal: {
    type: 'tense_modal',
    label: 'Tense / Modal',
    labelVi: 'Thì & Động từ Khiếm khuyết',
    colorClass: {
      bg: 'bg-indigo-500/15',
      border: 'border-indigo-500/40',
      text: 'text-indigo-300',
      badgeBg: 'bg-indigo-500/20 text-indigo-200 border-indigo-500/30',
    },
    explanationVi: 'Cấu trúc thì (Present Perfect, Continuous) hoặc trợ động từ khiếm khuyết (Could, Would, Should) thể hiện sự lịch sự và chính xác.',
  },
  connector: {
    type: 'connector',
    label: 'Connector / Marker',
    labelVi: 'Liên từ & Từ nối Hội thoại',
    colorClass: {
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/40',
      text: 'text-emerald-300',
      badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
    },
    explanationVi: 'Cụm liên kết (Discourse markers) giúp liên kết ý tưởng mượt mà, tránh câu văn rời rạc.',
  },
  chunk: {
    type: 'chunk',
    label: 'Lexical Chunk',
    labelVi: 'Cụm từ Cố định (Collocation)',
    colorClass: {
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/40',
      text: 'text-amber-300',
      badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
    },
    explanationVi: 'Khối ngữ nghĩa bản ngữ (Lexical Chunk) theo nguyên lý Krashen i+1 giúp nói không cần dịch nhẩm.',
  },
  question_pattern: {
    type: 'question_pattern',
    label: 'Question Pattern',
    labelVi: 'Mẫu Câu hỏi Mở / Lời mời Thoại',
    colorClass: {
      bg: 'bg-purple-500/15',
      border: 'border-purple-500/40',
      text: 'text-purple-300',
      badgeBg: 'bg-purple-500/20 text-purple-200 border-purple-500/30',
    },
    explanationVi: 'Mẫu câu hỏi mở (Open-ended question) dẫn dắt câu chuyện và khơi gợi phản xạ cho người học.',
  },
};

interface PatternRule {
  regex: RegExp;
  annotation: GrammarAnnotation;
  explanation: (match: string) => string;
}

// Curated grammar patterns for CEFR A2 -> B1 communication
const GRAMMAR_RULES: PatternRule[] = [
  // 1. Discourse Markers & Connectors
  {
    regex: /\b(To be honest|To be fair|To be completely honest|By the way|Actually|In fact|Although|Even though|However|On the other hand|On the flip side|Long story short|As a matter of fact|Speaking of which|Whenever you have a moment|Whenever you're ready|Whenever|Since|As long as|In case|If possible)\b/gi,
    annotation: GRAMMAR_TYPES.connector,
    explanation: (m) => `Từ nối / Khẩu ngữ dẫn dắt (${m}): Tạo nhịp điệu tự nhiên và thời gian suy nghĩ ý tiếp theo.`,
  },

  // 2. Tenses & Modals
  {
    regex: /\b(don't think we've met|haven't met|have met|have seen|have been|has been|I've been|we've been|I've noticed|I've heard|had been|had left|could you|could I|would you|would be|would like|should be|might be|shall we|can I get|can you tell|can't believe|is acting up|was wondering if|am trying to|are looking for)\b/gi,
    annotation: GRAMMAR_TYPES.tense_modal,
    explanation: (m) => `Thì / Trợ động từ (${m}): Thể hiện mức độ lịch thiệp và trạng thái hoàn thành / tiếp diễn trong văn cảnh.`,
  },

  // 3. Question / Inversion Patterns
  {
    regex: /\b(What brought you to|What can I get started for you|What did you think|How do your|How was everything|Are you looking for|Do you have any|Is there any chance|Would it be possible to|Got any fun plans|What actually happened)\b/gi,
    annotation: GRAMMAR_TYPES.question_pattern,
    explanation: (m) => `Mẫu câu hỏi mở (${m}): Mẫu câu tiêu chuẩn dùng để khơi gợi phản xạ hội thoại hai chiều.`,
  },

  // 4. Common B1 Collocations / Chunks
  {
    regex: /\b(step out of my comfort zone|step out of your comfort zone|really into|easy on the ice|easy on the sugar|for here or to go|to go|for here|within walking distance|you can't miss it|hang a left|hang a right|point me in the direction of|out of stock|wind down|early riser|night owl|catch of the day|split the bill|on the side|keep it low-key|tell me about it|catch up on|top up|loud and clear|second nature|game changer|touch base|dive right into)\b/gi,
    annotation: GRAMMAR_TYPES.chunk,
    explanation: (m) => `Cụm từ cố định (${m}): Collocation tự nhiên của người bản xứ giúp nói trôi chảy mà không ghép từng từ rời rạc.`,
  },
];

/**
 * Finds all grammar matches in a text block, avoiding overlapping matches.
 */
export function analyzeGrammarText(text: string, dynamicChunks: string[] = []): {
  segments: { text: string; match?: GrammarMatch }[];
  foundAnnotations: { matchText: string; annotation: GrammarAnnotation; explanation: string }[];
} {
  const matches: GrammarMatch[] = [];

  // Add dynamic lesson chunks to rules if provided
  const allRules: PatternRule[] = [...GRAMMAR_RULES];
  if (dynamicChunks.length > 0) {
    const chunkRegexStr = dynamicChunks
      .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    if (chunkRegexStr) {
      allRules.unshift({
        regex: new RegExp(`\\b(${chunkRegexStr})\\b`, 'gi'),
        annotation: GRAMMAR_TYPES.chunk,
        explanation: (m) => `Cụm từ mục tiêu của bài học (${m}): Vận dụng theo phương pháp Spaced Repetition.`,
      });
    }
  }

  // Scan text against all rules
  for (const rule of allRules) {
    rule.regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = rule.regex.exec(text)) !== null) {
      const start = m.index;
      const end = start + m[0].length;
      const matchText = m[0];

      // Avoid overlapping matches
      const overlaps = matches.some(
        (existing) =>
          (start >= existing.start && start < existing.end) ||
          (end > existing.start && end <= existing.end) ||
          (start <= existing.start && end >= existing.end)
      );

      if (!overlaps) {
        matches.push({
          start,
          end,
          text: matchText,
          annotation: {
            ...rule.annotation,
            explanationVi: rule.explanation(matchText),
          },
        });
      }
    }
  }

  // Sort matches by start index
  matches.sort((a, b) => a.start - b.start);

  // Split text into highlighted segments and normal segments
  const segments: { text: string; match?: GrammarMatch }[] = [];
  let currentIndex = 0;

  for (const match of matches) {
    if (match.start > currentIndex) {
      segments.push({
        text: text.slice(currentIndex, match.start),
      });
    }
    segments.push({
      text: match.text,
      match,
    });
    currentIndex = match.end;
  }

  if (currentIndex < text.length) {
    segments.push({
      text: text.slice(currentIndex),
    });
  }

  const foundAnnotations = matches.map((m) => ({
    matchText: m.text,
    annotation: m.annotation,
    explanation: m.annotation.explanationVi,
  }));

  return { segments, foundAnnotations };
}
