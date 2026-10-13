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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 LingoReflex SLA Server running on port ${PORT}`);
});

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// 1. SLA 1-on-1 Conversational Role-Play Endpoint
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
    } = req.body;

    const systemInstruction = `
You are an Honorary Professor of Applied Linguistics, a world-leading expert in Second Language Acquisition (SLA), and a master Conversational AI Architect.
You are the Core Intelligent Engine for a personalized 1-on-1 English learning web application helping pre-intermediate learners (CEFR A2) break through to CEFR B1+ in a 90-day roadmap (60 minutes daily).

PEDAGOGICAL CORE PRINCIPLES:
1. Krashen's Comprehensible Input (i+1): Use 85% A2-accessible vocabulary/structures, plus 15% natural B1 lexical chunks to stimulate reflexes without frustrating the learner.
2. Conversational Recasting: When the learner makes grammatical or lexical errors, DO NOT rudely interrupt or scold them. Instead, naturally and subtly recast the correct structure into your conversational turn, and supply a gentle recastNote.
3. Spaced Repetition of Lexical Chunks: Recycle the lesson's target chunks naturally into the dialogue.
4. Fluency Over Accuracy First: Prioritize confidence, natural cadence, and immediate reflex over minor nitpicks.

CURRENT CONTEXT:
- Lesson Day: Day ${day}
- Scenario: ${scenario}
- Your Persona/Role: ${aiRole}
- Learner Role: ${userRole}
- Mission/Goal: ${roleplayGoal}
- Target Lexical Chunks to encourage: ${JSON.stringify(chunks)}

RESPONSE FORMAT REQUIREMENTS:
You MUST respond with valid JSON adhering to the specified schema:
- "reply": Your spoken conversational line in English. Keep it natural, warm, and bite-sized (2-3 sentences max) so the learner can speak often. End with an open-ended question or next scenario beat.
- "vietnameseTranslation": A concise, natural Vietnamese translation of your reply.
- "recastNote": If the user made any grammatical, pronunciation, or word-choice errors in their latest message, explain the correct way warmly in Vietnamese/English (e.g., "Mẹo phản xạ: Thay vì 'I like coffee very much', bạn có thể nói 'I'm really into coffee' để tự nhiên hơn!"). If no notable error, return null.
- "suggestions": Exactly two suggested responses the learner could use next:
  * One Level A2 option (simple, clear, direct) with its Vietnamese meaning.
  * One Level B1 option (idiomatic, native-like, using good chunks) with its Vietnamese meaning.
- "pedagogyHighlights": 1 or 2 key phrases or collocations used in your reply that the learner should notice.
`;

    // Format chat contents for Gemini
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: 'Hello! I am ready to start today\'s conversation.' }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: 'The natural conversational response in English (2-3 sentences max).',
            },
            vietnameseTranslation: {
              type: Type.STRING,
              description: 'Concise Vietnamese translation of the reply.',
            },
            recastNote: {
              type: Type.STRING,
              description: 'Warm conversational recasting note or null if no notable mistake.',
              nullable: true,
            },
            suggestions: {
              type: Type.ARRAY,
              description: 'Two suggested responses for the user.',
              items: {
                type: Type.OBJECT,
                properties: {
                  level: { type: Type.STRING, description: 'A2 or B1' },
                  text: { type: Type.STRING, description: 'Suggested response in English' },
                  vietnamese: { type: Type.STRING, description: 'Vietnamese translation' },
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
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Failed to generate conversational response',
      details: error?.message || String(error),
    });
  }
});

// 2. High-fidelity Speech Synthesis (TTS) via gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    // gemini-3.8-flash-lite-tts returns complete WAV audio (24kHz mono 16-bit)
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.slice(0, 350), // keep focused and snappy
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

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error('No audio data received from Gemini TTS');
    }

    return res.json({
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (error: any) {
    console.error('Error in /api/tts:', error);
    return res.status(500).json({
      error: 'TTS generation failed',
      details: error?.message || String(error),
    });
  }
});

// 3. Speech & Pronunciation Evaluation Endpoint (SLA Criteria)
app.post('/api/evaluate-speech', async (req, res) => {
  try {
    const { spokenText, referenceText = '', context = '' } = req.body;
    if (!spokenText) {
      return res.status(400).json({ error: 'spokenText is required' });
    }

    const prompt = `
You are an SLA Applied Linguistics assessor.
Analyze the learner's spoken input: "${spokenText}".
Reference target sentence (if shadowing drill): "${referenceText}".
Context: ${context}.

Evaluate based on:
1. Fluency & Confidence (estimated score 0-100)
2. CEFR level assessment of this utterance (A2, B1, or B1+)
3. Strengths: 2 specific positive observations
4. Actionable Improvements: 2 gentle tips on rhythm, linking sounds, or more natural word chunks.
5. Intonation & Linking note: Phonological advice on stress and connected speech.

Output strict JSON:
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
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
${JSON.stringify(conversationHistory.slice(-12))}

Generate the definitive Module 4 Debrief (Tổng kết & Phản hồi Sư phạm - 10 phút):
1. 2 Điểm làm tốt nhất (2 key strengths in fluency/participation)
2. 2 Lỗi phát âm hoặc dùng từ cần sửa kèm cách nói chuẩn B1 (2 targeted corrections/recasts)
3. 1 Bài tập thực hành phản xạ 3 phút trước khi ngủ (Bedtime Reflex Exercise): 1 quick scenario question in English with a model B1 reflex answer.
4. Lời nhận xét khích lệ sư phạm ngắn gọn bằng tiếng Việt.

Return strict JSON.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bestPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 key strengths demonstrated today',
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
              description: '2 specific recast improvements',
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
