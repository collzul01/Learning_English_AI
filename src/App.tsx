import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InitialTriggerModal } from './components/InitialTriggerModal';
import { ModuleWarmup } from './components/ModuleWarmup';
import { ModuleRoleplay } from './components/ModuleRoleplay';
import { ModuleShadowing } from './components/ModuleShadowing';
import { ModuleDebrief } from './components/ModuleDebrief';
import { RoadmapModal } from './components/RoadmapModal';
import { SettingsModal } from './components/SettingsModal';
import { VocabularyModal } from './components/VocabularyModal';
import { getLessonForDay } from './data/curriculum';
import { ModuleStep, ChatMessage, UserProgress, VocabularyItem } from './types';
import { audioEngine } from './utils/audio';

const STORAGE_KEY = 'lingoreflex_progress_v1';
const SETTINGS_KEY = 'lingoreflex_settings_v1';
const VOCAB_STORAGE_KEY = 'lingoreflex_vocab_v1';

export default function App() {
  // Saved progress in LocalStorage
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      currentDay: 1,
      completedDays: [],
      totalMinutesPracticed: 0,
      streakDays: 1,
      lastPracticeDate: new Date().toISOString().split('T')[0],
    };
  });

  // Persistent My Vocabulary List
  const [vocabularyList, setVocabularyList] = useState<VocabularyItem[]>(() => {
    try {
      const saved = localStorage.getItem(VOCAB_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'v-d1-1',
        phrase: 'step out of my comfort zone',
        day: 1,
        learnedAt: Date.now(),
        contextSnippet: 'I decided to join this club to step out of my comfort zone.',
        mastered: false,
      },
      {
        id: 'v-d1-2',
        phrase: 'be really into something',
        day: 1,
        learnedAt: Date.now(),
        contextSnippet: "Lately, I've been really into acoustic music and photography.",
        mastered: false,
      },
      {
        id: 'v-d1-3',
        phrase: 'to be honest with you',
        day: 1,
        learnedAt: Date.now(),
        contextSnippet: 'To be honest with you, I was a bit nervous at first.',
        mastered: false,
      },
    ];
  });

  // Settings
  const [voiceName, setVoiceName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.voiceName || 'Kore';
      }
    } catch {}
    return 'Kore';
  });

  const [autoPlayAudio, setAutoPlayAudio] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.autoPlayAudio !== false;
      }
    } catch {}
    return true;
  });

  // Navigation & Modals
  const [currentDay, setCurrentDay] = useState<number>(userProgress.currentDay || 1);
  const [currentStep, setCurrentStep] = useState<ModuleStep>('warmup');
  const [showInitialTrigger, setShowInitialTrigger] = useState<boolean>(true);
  const [showRoadmap, setShowRoadmap] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showVocabularyModal, setShowVocabularyModal] = useState<boolean>(false);

  // 60-Minute Session Master Timer
  const [timerSecondsRemaining, setTimerSecondsRemaining] = useState<number>(3600); // 60 mins
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Current Lesson Object
  const currentLesson = getLessonForDay(currentDay);

  // Module 2 Chat Messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);

  // Extract & Store pedagogyHighlights into Vocabulary List
  const extractAndStoreHighlights = (
    highlights: string[],
    day: number,
    contextSnippet?: string
  ) => {
    if (!highlights || highlights.length === 0) return;
    setVocabularyList((prev) => {
      const updated = [...prev];
      highlights.forEach((phrase) => {
        const cleanPhrase = phrase.trim();
        if (!cleanPhrase) return;
        const exists = updated.some(
          (item) => item.phrase.toLowerCase() === cleanPhrase.toLowerCase()
        );
        if (!exists) {
          updated.unshift({
            id: `vocab-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            phrase: cleanPhrase,
            day,
            learnedAt: Date.now(),
            contextSnippet: contextSnippet || `Được trích xuất từ buổi học Ngày ${day}`,
            mastered: false,
          });
        }
      });
      return updated;
    });
  };

  // Sync initial message & extract lesson chunks whenever currentDay changes
  useEffect(() => {
    const initialGreeting = currentLesson.initialAiGreeting;
    const initialHighlights = [currentLesson.chunks[0]?.phrase || 'natural English'];

    setMessages([
      {
        id: `greeting-${currentDay}`,
        role: 'assistant',
        content: initialGreeting.en,
        vietnameseTranslation: initialGreeting.vi,
        suggestions: [
          { level: 'A2', text: initialGreeting.suggestedA2, vietnamese: 'Trả lời đơn giản trực tiếp' },
          { level: 'B1', text: initialGreeting.suggestedB1, vietnamese: 'Trả lời tự nhiên như người bản xứ' },
        ],
        pedagogyHighlights: initialHighlights,
        timestamp: Date.now(),
      },
    ]);

    // Automatically store key chunks for this day
    if (currentLesson.chunks) {
      extractAndStoreHighlights(
        currentLesson.chunks.map((c) => c.phrase),
        currentDay,
        currentLesson.chunks[0]?.example
      );
    }

    setTimerSecondsRemaining(3600);
    setIsTimerRunning(true);
  }, [currentDay]);

  // Save Progress whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    } catch {}
  }, [userProgress]);

  // Save Vocabulary List whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(vocabularyList));
    } catch {}
  }, [vocabularyList]);

  // Save Settings whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ voiceName, autoPlayAudio }));
    } catch {}
  }, [voiceName, autoPlayAudio]);

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSecondsRemaining > 0) {
      interval = setInterval(() => {
        setTimerSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsRemaining]);

  // Handle User Message in Module 2 Roleplay
  const handleSendMessage = async (userText: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsAiGenerating(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          day: currentDay,
          scenario: currentLesson.scenarioDescription,
          aiRole: currentLesson.aiPersonaRole,
          userRole: currentLesson.userRole,
          roleplayGoal: currentLesson.roleplayGoal,
          chunks: currentLesson.chunks.map((c) => c.phrase),
        }),
      });

      if (!res.ok) {
        throw new Error('Chat generation failed');
      }

      const data = await res.json();
      const aiReplyMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "That's very interesting! Could you tell me more about that?",
        vietnameseTranslation: data.vietnameseTranslation || '',
        recastNote: data.recastNote || null,
        suggestions: data.suggestions || [
          { level: 'A2', text: 'I agree with you.', vietnamese: 'Tôi đồng ý với bạn.' },
          { level: 'B1', text: 'To be honest, that makes total sense to me.', vietnamese: 'Thành thật mà nói, điều đó hoàn toàn hợp lý với tôi.' },
        ],
        pedagogyHighlights: data.pedagogyHighlights || [],
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiReplyMessage]);

      // Automatically extract and store pedagogy highlights into persistent Vocabulary List
      if (data.pedagogyHighlights && data.pedagogyHighlights.length > 0) {
        extractAndStoreHighlights(data.pedagogyHighlights, currentDay, data.reply);
      }

      // Play audio automatically if enabled
      if (autoPlayAudio && aiReplyMessage.content) {
        audioEngine.speakText(aiReplyMessage.content, { voiceName });
      }
    } catch {
      // Graceful fallback
      const fallbackAi: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: "I completely understand what you mean! How has your experience been with that so far?",
        vietnameseTranslation: "Tôi hoàn toàn hiểu ý bạn! Trải nghiệm của bạn với điều đó từ trước tới giờ thế nào?",
        suggestions: [
          { level: 'A2', text: 'It has been quite good for me.', vietnamese: 'Nó khá tốt với tôi.' },
          { level: 'B1', text: 'To be completely honest, it has been quite a rewarding journey!', vietnamese: 'Thành thật mà nói, đó là một hành trình rất bổ ích!' },
        ],
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackAi]);
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Complete current day
  const handleCompleteDay = () => {
    setUserProgress((prev) => {
      const isAlreadyCompleted = prev.completedDays.includes(currentDay);
      const nextCompleted = isAlreadyCompleted
        ? prev.completedDays
        : [...prev.completedDays, currentDay];

      return {
        ...prev,
        completedDays: nextCompleted,
        totalMinutesPracticed: prev.totalMinutesPracticed + 60,
        streakDays: prev.streakDays + (isAlreadyCompleted ? 0 : 1),
        currentDay: Math.min(90, currentDay + 1),
      };
    });
  };

  const handleSelectDayFromRoadmap = (day: number) => {
    setCurrentDay(day);
    setCurrentStep('warmup');
  };

  const handleResetProgress = () => {
    setUserProgress({
      currentDay: 1,
      completedDays: [],
      totalMinutesPracticed: 0,
      streakDays: 1,
      lastPracticeDate: new Date().toISOString().split('T')[0],
    });
    setCurrentDay(1);
    setCurrentStep('warmup');
  };

  // Vocabulary handlers
  const handleToggleMastered = (id: string) => {
    setVocabularyList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, mastered: !item.mastered } : item))
    );
  };

  const handleRemoveVocabItem = (id: string) => {
    setVocabularyList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllVocab = () => {
    setVocabularyList([]);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        currentLesson={currentLesson}
        currentStep={currentStep}
        onSelectStep={setCurrentStep}
        timerSecondsRemaining={timerSecondsRemaining}
        isTimerRunning={isTimerRunning}
        onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
        onResetTimer={() => setTimerSecondsRemaining(3600)}
        userProgress={userProgress}
        vocabularyCount={vocabularyList.length}
        onOpenVocabulary={() => setShowVocabularyModal(true)}
        onOpenRoadmap={() => setShowRoadmap(true)}
        onOpenSettings={() => setShowSettings(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Render Current Module */}
        {currentStep === 'warmup' && (
          <ModuleWarmup
            lesson={currentLesson}
            onProceedToRoleplay={() => {
              setCurrentStep('roleplay');
              audioEngine.playDing('step');
            }}
            voiceName={voiceName}
          />
        )}

        {currentStep === 'roleplay' && (
          <ModuleRoleplay
            lesson={currentLesson}
            messages={messages}
            onSendMessage={handleSendMessage}
            isAiGenerating={isAiGenerating}
            onProceedToShadowing={() => {
              setCurrentStep('shadowing');
              audioEngine.playDing('step');
            }}
            voiceName={voiceName}
            autoPlayAudio={autoPlayAudio}
          />
        )}

        {currentStep === 'shadowing' && (
          <ModuleShadowing
            lesson={currentLesson}
            onProceedToDebrief={() => {
              setCurrentStep('debrief');
              audioEngine.playDing('step');
            }}
            voiceName={voiceName}
          />
        )}

        {currentStep === 'debrief' && (
          <ModuleDebrief
            lesson={currentLesson}
            messages={messages}
            onCompleteDay={handleCompleteDay}
            voiceName={voiceName}
            userProgress={userProgress}
            vocabularyList={vocabularyList}
            sessionDurationMinutes={Math.max(1, Math.round((3600 - timerSecondsRemaining) / 60))}
          />
        )}
      </main>

      {/* Clean Distraction-Free Footer */}
      <footer className="border-t border-[#26354D]/60 bg-[#0B0F19] py-4 text-center text-xs text-slate-500">
        <p>
          LingoReflex • Không gian luyện phản xạ tiếng Anh trực tiếp • 60 phút mỗi ngày bứt phá B1+
        </p>
      </footer>

      {/* Initial Trigger Modal (System Trigger Greeting) */}
      <InitialTriggerModal
        isOpen={showInitialTrigger}
        onStartDay1={() => {
          setShowInitialTrigger(false);
          setCurrentDay(1);
          setCurrentStep('warmup');
          audioEngine.playDing('click');
        }}
        onExploreRoadmap={() => {
          setShowInitialTrigger(false);
          setShowRoadmap(true);
        }}
      />

      {/* 90-Day Visual Roadmap Explorer */}
      <RoadmapModal
        isOpen={showRoadmap}
        onClose={() => setShowRoadmap(false)}
        currentDay={currentDay}
        onSelectDay={handleSelectDayFromRoadmap}
        userProgress={userProgress}
      />

      {/* Persistent My Vocabulary List Modal */}
      <VocabularyModal
        isOpen={showVocabularyModal}
        onClose={() => setShowVocabularyModal(false)}
        vocabularyList={vocabularyList}
        onToggleMastered={handleToggleMastered}
        onRemoveItem={handleRemoveVocabItem}
        onClearAll={handleClearAllVocab}
        voiceName={voiceName}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        voiceName={voiceName}
        onChangeVoice={setVoiceName}
        autoPlayAudio={autoPlayAudio}
        onToggleAutoPlay={() => setAutoPlayAudio(!autoPlayAudio)}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}

