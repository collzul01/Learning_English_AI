/**
 * Real-time Pronunciation & Tone Scoring Utility (SLA Phonology Engine)
 */

export interface WordScore {
  targetWord: string;
  cleanTarget: string;
  status: 'matched' | 'partial' | 'missed' | 'pending';
  spokenWord?: string;
  similarity: number; // 0 to 1
}

export interface RealtimePronunciationResult {
  overallScore: number; // 0 - 100
  articulationScore: number; // 0 - 100
  toneRhythmScore: number; // 0 - 100
  toneFeedback: {
    contour: string; // e.g. "Lên giọng cuối câu ↗" or "Hạ giọng dứt khoát ↘"
    status: 'excellent' | 'good' | 'needs_work';
    adviceVi: string;
  };
  articulationFeedback: {
    matchedCount: number;
    totalCount: number;
    adviceVi: string;
  };
  wordScores: WordScore[];
  isCompleted: boolean;
}

// Clean string for word comparison (removes punctuation, lowercases)
export function cleanToken(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9']/g, '');
}

// Compute simple Levenshtein similarity (0 to 1)
export function calculateSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;

  const len1 = s1.length;
  const len2 = s2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  return Math.max(0, 1 - distance / maxLen);
}

/**
 * Evaluates real-time spoken transcript against a reference sentence
 */
export function scorePronunciationRealtime(
  targetSentence: string,
  spokenTranscript: string,
  intonationTip: string = ''
): RealtimePronunciationResult {
  const targetWords = targetSentence.trim().split(/\s+/);
  const spokenWords = spokenTranscript.trim().split(/\s+/).filter(Boolean);

  const cleanTargetWords = targetWords.map(cleanToken);
  const cleanSpokenWords = spokenWords.map(cleanToken);

  const wordScores: WordScore[] = [];
  let spokenIndex = 0;
  let totalSimilarity = 0;
  let matchedCount = 0;

  for (let i = 0; i < targetWords.length; i++) {
    const rawTarget = targetWords[i];
    const target = cleanTargetWords[i];

    if (spokenIndex < cleanSpokenWords.length) {
      const currentSpoken = cleanSpokenWords[spokenIndex];
      const sim = calculateSimilarity(target, currentSpoken);

      // Check next word for possible skip
      const nextSpoken =
        spokenIndex + 1 < cleanSpokenWords.length ? cleanSpokenWords[spokenIndex + 1] : null;
      const nextSim = nextSpoken ? calculateSimilarity(target, nextSpoken) : 0;

      if (sim >= 0.75) {
        wordScores.push({
          targetWord: rawTarget,
          cleanTarget: target,
          status: 'matched',
          spokenWord: currentSpoken,
          similarity: sim,
        });
        matchedCount++;
        totalSimilarity += 1.0;
        spokenIndex++;
      } else if (nextSim >= 0.75) {
        // User might have stumbled on a filler word
        wordScores.push({
          targetWord: rawTarget,
          cleanTarget: target,
          status: 'matched',
          spokenWord: nextSpoken || undefined,
          similarity: nextSim,
        });
        matchedCount++;
        totalSimilarity += 0.9;
        spokenIndex += 2;
      } else if (sim >= 0.45) {
        wordScores.push({
          targetWord: rawTarget,
          cleanTarget: target,
          status: 'partial',
          spokenWord: currentSpoken,
          similarity: sim,
        });
        totalSimilarity += 0.6;
        spokenIndex++;
      } else {
        wordScores.push({
          targetWord: rawTarget,
          cleanTarget: target,
          status: 'missed',
          similarity: 0,
        });
      }
    } else {
      wordScores.push({
        targetWord: rawTarget,
        cleanTarget: target,
        status: 'pending',
        similarity: 0,
      });
    }
  }

  // Calculate scores
  const wordsConsidered = Math.max(1, Math.min(spokenWords.length, targetWords.length));
  const completionRatio = Math.min(1.0, spokenWords.length / Math.max(1, targetWords.length));

  const articulationScore = Math.round(
    Math.min(100, Math.max(0, (totalSimilarity / Math.max(1, targetWords.length)) * 100))
  );

  // Tone & Rhythm analysis
  const isQuestion = targetSentence.trim().endsWith('?');
  const expectedTone = isQuestion ? 'Lên giọng cuối câu ↗ (Rising Tone)' : 'Hạ giọng dứt khoát ↘ (Falling Tone)';

  let toneStatus: 'excellent' | 'good' | 'needs_work' = 'good';
  let toneRhythmScore = 80;
  let toneAdviceVi = 'Nhịp điệu tự nhiên, giữ vững cao độ nhấn vào từ khóa.';

  if (completionRatio > 0.85 && articulationScore >= 80) {
    toneStatus = 'excellent';
    toneRhythmScore = Math.min(100, articulationScore + 8);
    toneAdviceVi = `Khớp nhịp xuất sắc! Bạn đã thể hiện đúng ${expectedTone}.`;
  } else if (completionRatio < 0.5) {
    toneStatus = 'needs_work';
    toneRhythmScore = Math.max(30, Math.round(articulationScore * 0.7));
    toneAdviceVi = 'Tốc độ hơi ngập ngừng. Hãy thả lỏng cơ hàm và phát âm liền mạch hơn.';
  } else {
    toneRhythmScore = Math.round(articulationScore * 0.9);
    toneAdviceVi = `Chú ý trọng âm câu: ${intonationTip || expectedTone}.`;
  }

  const overallScore = Math.round(articulationScore * 0.65 + toneRhythmScore * 0.35);

  return {
    overallScore,
    articulationScore,
    toneRhythmScore,
    toneFeedback: {
      contour: expectedTone,
      status: toneStatus,
      adviceVi: toneAdviceVi,
    },
    articulationFeedback: {
      matchedCount,
      totalCount: targetWords.length,
      adviceVi:
        matchedCount === targetWords.length
          ? 'Độ chuẩn xác âm vị (Phoneme clarity) đạt mức tuyệt hảo!'
          : `Đã phát âm rõ ${matchedCount}/${targetWords.length} từ. Chú ý các từ chưa bắt được âm.`,
    },
    wordScores,
    isCompleted: completionRatio >= 0.9,
  };
}
