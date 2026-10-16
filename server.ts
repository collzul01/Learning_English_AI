import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Shared Gemini client with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Resilient wrapper with automatic fallback on temporary 503 demand spikes
async function generateContentWithFallback(params: Parameters<typeof ai.models.generateContent>[0]) {
  const modelsToTry = [params.model || 'gemini-3.6-flash', 'gemini-3.6-flash', 'gemini-3.5-flash'];
  const uniqueModels = [...new Set(modelsToTry)];

  let lastError: any = null;
  for (const m of uniqueModels) {
    try {
      return await ai.models.generateContent({
        ...params,
        model: m,
      });
    } catch (err: any) {
      lastError = err;
      const isRecoverable =
        err?.status === 503 ||
        err?.code === 503 ||
        String(err?.message).includes('503') ||
        String(err?.message).includes('UNAVAILABLE') ||
        String(err?.message).includes('high demand');
      if (isRecoverable) {
        console.warn(`Demand spike on model ${m}, trying next resilient model...`);
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

// Bộ nhớ đệm TTS trên RAM (In-Memory TTS Cache) giúp triệt tiêu độ trễ phát âm thanh lặp lại
const ttsAudioCache = new Map<string, string>();
const MAX_TTS_CACHE_SIZE = 200;

function getTtsCacheKey(text: string, voiceName: string = 'Kore'): string {
  return `${voiceName}::${text.trim().slice(0, 350)}`;
}

async function synthesizeSpeechWithCache(text: string, voiceName: string = 'Kore'): Promise<string | null> {
  const cleanText = text.trim().slice(0, 350);
  if (!cleanText) return null;

  const cacheKey = getTtsCacheKey(cleanText, voiceName);
  const cached = ttsAudioCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: 'Warm, clear, natural spoken English pace for language learning',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
    if (base64Audio) {
      if (ttsAudioCache.size >= MAX_TTS_CACHE_SIZE) {
        const oldestKey = ttsAudioCache.keys().next().value;
        if (oldestKey) ttsAudioCache.delete(oldestKey);
      }
      ttsAudioCache.set(cacheKey, base64Audio);
    }

    return base64Audio;
  } catch (ttsErr: any) {
    const isQuotaExceeded =
      ttsErr?.status === 429 ||
      ttsErr?.code === 429 ||
      String(ttsErr?.message).includes('429') ||
      String(ttsErr?.message).includes('RESOURCE_EXHAUSTED');
    if (isQuotaExceeded) {
      console.warn('TTS quota reached for gemini-3.8-flash-lite-tts, falling back to browser SpeechSynthesis');
      return null;
    }
    throw ttsErr;
  }
}

// 1. SLA 1-on-1 Conversational Role-Play Endpoint (Upgraded with B1 Plot Twist & Pre-warmed TTS)
app.post('/api/chat', async (req, res) => {
  try {
    const {
      messages = [],
      day = 1,
      scenario = '',
      aiRole = 'Friendly conversation partner',
      userRole = 'English learner',
      roleplayGoal = '',
      chunks = [],
      voiceName = 'Kore',
    } = req.body;

    const userTurnsCount = messages.filter((m: { role: string }) => m.role === 'user').length;
    const isTwistTurn = userTurnsCount === 3 || userTurnsCount === 4;

    const systemInstruction = `
You are an Honorary Professor of Applied Linguistics, a world-leading expert in Second Language Acquisition (SLA), and a master Conversational AI Architect.
You are the Core Intelligent Engine for a personalized 1-on-1 English learning web application helping pre-intermediate learners (CEFR A2) break through to CEFR B1+ in a 90-day roadmap (60 minutes daily).

PEDAGOGICAL CORE PRINCIPLES:
1. Krashen's Comprehensible Input (i+1): Use 85% A2-accessible vocabulary/structures, plus 15% natural B1 lexical chunks to stimulate reflexes without frustrating the learner.
2. Conversational Recasting: When the learner makes grammatical or lexical errors, DO NOT rudely interrupt or scold them. Instead, naturally and subtly recast the correct structure into your conversational turn, and supply a concise, warm "recastNote" in Vietnamese.
3. Spaced Repetition & Active Chunk Tracking: Recycle the lesson's target chunks naturally into the dialogue. Encourage the learner to use them.
4. Swain's Pushed Output & Dynamic Plot Twist:
   ${
     isTwistTurn
       ? 'CRITICAL STAGE (PLOT TWIST): Introduce a friendly, realistic complication, unexpected detail, or polite counter-question in the scenario right now! Push the learner to explain a reason (using because/since/actually), negotiate an alternative, or solve a minor problem at a CEFR B1 level.'
       : 'Prioritize communicative confidence, natural cadence, and immediate reflex. Keep the conversation moving toward the mission goal.'
   }

CURRENT CONTEXT:
- Lesson Day: Day ${day}
- Scenario: ${scenario}
- Your Persona/Role: ${aiRole}
- Learner Role: ${userRole}
- Mission/Goal: ${roleplayGoal}
- Target Lexical Chunks to encourage: ${JSON.stringify(chunks)}
- Current Learner Turn Number: ${userTurnsCount}

RESPONSE FORMAT REQUIREMENTS:
You MUST respond with valid JSON adhering to the specified schema:
- "reply": Your spoken conversational line in English. Keep it natural, warm, and bite-sized (2 sentences max) so the learner can speak often. Always end with an engaging open-ended question or scenario prompt.
- "vietnameseTranslation": A concise, natural Vietnamese translation of your reply.
- "recastNote": If the user made any grammatical, word-choice, or unnatural phrasing errors in their latest message, explain the B1 upgrade warmly in Vietnamese (e.g., "Mẹo nâng cấp B1: Thay vì nói 'I very like...', bạn hãy phản xạ 'I'm really into...' sẽ tự nhiên như người bản xứ!"). If the user's sentence was already natural, return null.
- "suggestions": Exactly two suggested responses the learner could use next:
  * One Level A2 option (simple, clear, direct) with its Vietnamese communicative intent.
  * One Level B1 option (idiomatic, native-like, embedding at least one Target Lexical Chunk from the lesson) with its Vietnamese communicative intent.
- "pedagogyHighlights": 1 or 2 key phrases or collocations used in your reply that the learner should notice.
`;

    // Format chat contents for Gemini
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await generateContentWithFallback({
      model: 'gemini-3.6-flash',
      contents:
        contents.length > 0
          ? contents
          : [{ role: 'user', parts: [{ text: "Hello! I am ready to start today's conversation." }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: 'The natural conversational response in English (2 sentences max).',
            },
            vietnameseTranslation: {
              type: Type.STRING,
              description: 'Concise Vietnamese translation of the reply.',
            },
            recastNote: {
              type: Type.STRING,
              description: 'Warm conversational recasting note in Vietnamese or null if no notable mistake.',
              nullable: true,
            },
            suggestions: {
              type: Type.ARRAY,
              description: 'Two suggested responses for the user (A2 and B1).',
              items: {
                type: Type.OBJECT,
                properties: {
                  level: { type: Type.STRING, description: 'A2 or B1' },
                  text: { type: Type.STRING, description: 'Suggested response in English' },
                  vietnamese: { type: Type.STRING, description: 'Vietnamese communicative intent/meaning' },
                },
                required: ['level', 'text', 'vietnamese'],
              },
            },
            pedagogyHighlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '1-2 key collocations or chunks in this turn.',
            },
          },
          required: ['reply', 'vietnameseTranslation', 'suggestions'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');

    // Khởi tạo và lưu sẵn Audio vào Cache ngay trên Server để khi Frontend gọi /api/tts sẽ phát tức thì (0ms delay)
    let audioBase64: string | null = null;
    if (parsed.reply) {
      try {
        audioBase64 = await synthesizeSpeechWithCache(parsed.reply, voiceName);
      } catch (ttsErr) {
        console.warn('Pre-warm TTS warning:', ttsErr);
      }
    }

    return res.json({
      ...parsed,
      audioBase64,
    });
  } catch (error: any) {
    const isQuota =
      error?.status === 429 ||
      error?.code === 429 ||
      String(error?.message).includes('429') ||
      String(error?.message).includes('RESOURCE_EXHAUSTED');
    if (isQuota) {
      console.warn('API rate limit quota reached in /api/chat');
      return res.status(429).json({
        error: 'Hệ thống AI đang tạm bận vì giới hạn tần suất request (Rate Limit). Vui lòng thử lại sau vài giây!',
        isQuotaExceeded: true,
      });
    }
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Failed to generate conversational response',
      details: error?.message || String(error),
    });
  }
});

// 2. High-fidelity Speech Synthesis (TTS) via gemini-3.8-flash-lite-tts (With Instant RAM Cache)
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const base64Audio = await synthesizeSpeechWithCache(text, voiceName);
    if (!base64Audio) {
      return res.status(429).json({
        error: 'TTS quota limit reached',
        isQuotaExceeded: true,
      });
    }

    return res.json({
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (error: any) {
    const isQuota =
      error?.status === 429 ||
      error?.code === 429 ||
      String(error?.message).includes('429') ||
      String(error?.message).includes('RESOURCE_EXHAUSTED');
    if (isQuota) {
      console.warn('TTS quota reached in /api/tts, fallback to browser speech synthesis');
      return res.status(429).json({
        error: 'TTS quota exceeded',
        isQuotaExceeded: true,
      });
    }
    console.error('Error in /api/tts:', error);
    return res.status(500).json({
      error: 'TTS generation failed',
      details: error?.message || String(error),
    });
  }
});

// 3. Speech & Pronunciation Evaluation Endpoint (Supports both Transcript & Native Multimodal Audio)
app.post('/api/evaluate-speech', async (req, res) => {
  try {
    const { spokenText, referenceText = '', context = '', audioBase64 = null, mimeType = 'audio/webm' } = req.body;
    if (!spokenText && !audioBase64) {
      return res.status(400).json({ error: 'spokenText or audioBase64 is required' });
    }

    const prompt = `
You are an SLA Applied Linguistics and Phonology assessor.
Analyze the learner's spoken output.
Recognized Speech Transcript: "${spokenText || '(Analyze directly from attached audio)'}".
Reference Target Sentence (if drill): "${referenceText}".
Context: ${context}.

CRITICAL ASSESSMENT RULES:
- Compare the learner's spoken words against the reference sentence and communicative context.
- Be honest and constructive: if the transcript is missing key words from the target chunk or is incomplete, reflect that accurately in the score and tips.
- Evaluate based on:
  1. Fluency & Completeness Score (0-100)
  2. CEFR level assessment of this utterance (A2, B1, or B1+)
  3. Strengths: 2 specific positive observations (in Vietnamese)
  4. Actionable Improvements: 2 concrete tips on word chunking, linking sounds, or missing words (in Vietnamese)
  5. Phonological Tip: Advice on sentence stress and connected speech
  6. Mentor Cheer: Short encouraging comment in Vietnamese.

Output strict JSON:
`;

    const parts: any[] = [{ text: prompt }];
    if (audioBase64) {
      parts.push({
        inlineData: {
          mimeType,
          data: audioBase64,
        },
      });
    }

    const response = await generateContentWithFallback({
      model: 'gemini-3.6-flash',
      contents: [{ role: 'user', parts }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fluencyScore: { type: Type.INTEGER },
            cefrLevel: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            areasToImprove: { type: Type.ARRAY, items: { type: Type.STRING } },
            phonologicalTip: { type: Type.STRING },
            mentorCheerVi: { type: Type.STRING, description: 'Short encouraging cheer in Vietnamese' },
          },
          required: ['fluencyScore', 'cefrLevel', 'strengths', 'areasToImprove', 'mentorCheerVi'],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    return res.json(result);
  } catch (error: any) {
    const isQuota =
      error?.status === 429 ||
      error?.code === 429 ||
      String(error?.message).includes('429') ||
      String(error?.message).includes('RESOURCE_EXHAUSTED');
    if (isQuota) {
      console.warn('API rate limit quota reached in /api/evaluate-speech');
      return res.status(429).json({
        error: 'Đang đạt giới hạn tần suất chấm điểm (Rate Limit). Vui lòng thử lại sau vài giây!',
        isQuotaExceeded: true,
      });
    }
    console.error('Error in /api/evaluate-speech:', error);
    return res.status(500).json({
      error: 'Evaluation failed',
      details: error?.message || String(error),
    });
  }
});

// 4. Daily Pedagogical Debrief Endpoint (Module 4)
app.post('/api/generate-daily-debrief', async (req, res) => {
  try {
    const { day, conversationHistory = [], lessonTitle = '' } = req.body;

    const prompt = `
You are the SLA Professor reviewing the learner's 60-minute daily session for Day ${day}: "${lessonTitle}".
Session Conversation History:
${JSON.stringify(conversationHistory.slice(-14))}

Generate the definitive Module 4 Debrief (Tổng kết & Phản hồi Sư phạm - 10 phút) in Vietnamese:
1. 2 Điểm làm tốt nhất (2 key strengths in fluency, connector usage, or chunk application)
2. 2 Lỗi diễn đạt hoặc dùng từ cần nâng cấp từ A2 lên chuẩn B1 (2 targeted recasts based on the learner's actual messages)
3. 1 Bài tập thực hành phản xạ 3 phút trước khi ngủ (Bedtime Reflex Exercise): 1 quick scenario question in English with a model B1 reflex answer.
4. Lời nhận xét khích lệ sư phạm ngắn gọn, truyền cảm hứng bằng tiếng Việt.

Return strict JSON.
`;

    const response = await generateContentWithFallback({
      model: 'gemini-3.6-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bestPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 key strengths demonstrated today in Vietnamese',
            },
            needsWork: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  learnerSaid: { type: Type.STRING },
                  improvedB1: { type: Type.STRING },
                  explanationVi: { type: Type.STRING },
                },
                required: ['learnerSaid', 'improvedB1', 'explanationVi'],
              },
              description: '2 specific recast improvements from A2 to B1',
            },
            bedtimeDrill: {
              type: Type.OBJECT,
              properties: {
                challengeQuestionEn: { type: Type.STRING },
                situationVi: { type: Type.STRING },
                targetReflexChunk: { type: Type.STRING },
                sampleResponseB1: { type: Type.STRING },
              },
              required: ['challengeQuestionEn', 'situationVi', 'targetReflexChunk', 'sampleResponseB1'],
            },
            professorSummaryVi: { type: Type.STRING },
          },
          required: ['bestPoints', 'needsWork', 'bedtimeDrill', 'professorSummaryVi'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    const isQuota =
      error?.status === 429 ||
      error?.code === 429 ||
      String(error?.message).includes('429') ||
      String(error?.message).includes('RESOURCE_EXHAUSTED');
    if (isQuota) {
      console.warn('API rate limit quota reached in /api/generate-daily-debrief');
      return res.status(429).json({
        error: 'Đang đạt giới hạn tần suất tạo tổng kết (Rate Limit). Vui lòng thử lại sau vài giây!',
        isQuotaExceeded: true,
      });
    }
    console.error('Error in /api/generate-daily-debrief:', error);
    return res.status(500).json({
      error: 'Debrief generation failed',
      details: error?.message || String(error),
    });
  }
});

// Mount Vite middleware in development or static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 LingoReflex SLA Server running on port ${PORT}`);
  });
}

startServer();
