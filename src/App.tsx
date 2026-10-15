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
import { ProfileSelectionModal } from './components/ProfileSelectionModal';
import { BackgroundCustomizerModal } from './components/BackgroundCustomizerModal';
import { AppBackground } from './components/AppBackground';
import { getLessonForDay } from './data/curriculum';
import {
  ModuleStep,
  ChatMessage,
  UserProgress,
  VocabularyItem,
  UserProfile,
  BackgroundSettings,
} from './types';
import { audioEngine } from './utils/audio';
import {
  getStoredProfiles,
  saveStoredProfiles,
  getActiveProfileId,
  setActiveProfileId,
  getProfileVocab,
  saveProfileVocab,
  getStoredBgSettings,
  saveStoredBgSettings,
} from './utils/profileStorage';

const SETTINGS_KEY = 'lingoreflex_settings_v2';

export default function App() {
  // 1. Multi-User Profiles System
  const [profiles, setProfiles] = useState<UserProfile[]>(getStoredProfiles);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(() => {
    const activeId = getActiveProfileId();
    const stored = getStoredProfiles();
    if (activeId) {
      const match = stored.find((p) => p.id === activeId);
      if (match) return match;
    }
    return stored[0] || null;
  });

  // Modal to select user profile at start or on switch
  const [showProfileModal, setShowProfileModal] = useState<boolean>(() => {
    // Show profile modal at start if no active profile was saved or explicitly connected
    return !getActiveProfileId();
  });

  // 2. Background Settings (with family lantern theme & contrast adjustments)
  const [bgSettings, setBgSettings] = useState<BackgroundSettings>(getStoredBgSettings);
  const [showBgModal, setShowBgModal] = useState<boolean>(false);

  // 3. Current User's Progress
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const prof = currentProfile;
    if (prof) {
      return {
        currentDay: prof.currentDay || 1,
        completedDays: prof.completedDays || [],
        totalMinutesPracticed: prof.totalMinutesPracticed || 0,
        streakDays: prof.streakDays || 1,
        lastPracticeDate: prof.lastPracticeDate || new Date().toISOString().split('T')[0],
      };
    }
    return {
      currentDay: 1,
      completedDays: [],
      totalMinutesPracticed: 0,
      streakDays: 1,
      lastPracticeDate: new Date().toISOString().split('T')[0],
    };
  });

  // 4. Current User's Vocabulary List (Isolated per profile)
  const [vocabularyList, setVocabularyList] = useState<VocabularyItem[]>(() => {
    if (currentProfile) {
      return getProfileVocab(currentProfile.id);
    }
    return [];
  });

  // 5. System Settings
  const [voiceName, setVoiceName] = useState<string>(() => {
    return currentProfile?.voiceName || 'Kore';
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

  // 6. Navigation & Modals
  const [currentDay, setCurrentDay] = useState<number>(userProgress.currentDay || 1);
  const [currentStep, setCurrentStep] = useState<ModuleStep>('warmup');
  const [showInitialTrigger, setShowInitialTrigger] = useState<boolean>(false);
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

  // 7. Profile Selection Handler: 1-click jump to next lesson!
  const handleSelectProfile = (profile: UserProfile) => {
    setCurrentProfile(profile);
    setActiveProfileId(profile.id);

    // Calculate next lesson:
    // If completedDays is [1, 2, 3], automatically jumps to Day 4!
    const nextDay =
      profile.currentDay ||
      (profile.completedDays.length > 0
        ? Math.min(90, Math.max(...profile.completedDays) + 1)
        : 1);

    setCurrentDay(nextDay);
    setCurrentStep('warmup');

    const nextProgress: UserProgress = {
      currentDay: nextDay,
      completedDays: profile.completedDays || [],
      totalMinutesPracticed: profile.totalMinutesPracticed || 0,
      streakDays: profile.streakDays || 1,
      lastPracticeDate: profile.lastPracticeDate || new Date().toISOString().split('T')[0],
    };
    setUserProgress(nextProgress);

    // Load isolated vocabulary
    const userVocab = getProfileVocab(profile.id);
    setVocabularyList(userVocab);

    if (profile.voiceName) {
      setVoiceName(profile.voiceName);
    }

    setShowProfileModal(false);
    audioEngine.playDing('success');
  };

  // Create Profile Handler
  const handleCreateProfile = (data: {
    name: string;
    roleLabel: string;
    avatar: string;
    colorTheme: string;
  }) => {
    const newProfile: UserProfile = {
      id: `profile-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: data.name,
      roleLabel: data.roleLabel,
      avatar: data.avatar,
      colorTheme: data.colorTheme,
      currentDay: 1,
      completedDays: [],
      totalMinutesPracticed: 0,
      streakDays: 1,
      lastPracticeDate: new Date().toISOString().split('T')[0],
      voiceName: 'Kore',
      autoPlayAudio: true,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    };

    const updated = [...profiles, newProfile];
    setProfiles(updated);
    saveStoredProfiles(updated);
    handleSelectProfile(newProfile);
  };

  // Update Profile Handler
  const handleUpdateProfile = (id: string, updates: Partial<UserProfile>) => {
    setProfiles((prev) => {
      const nextList = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      saveStoredProfiles(nextList);
      if (currentProfile?.id === id) {
        setCurrentProfile((cp) => (cp ? { ...cp, ...updates } : null));
      }
      return nextList;
    });
  };

  // Delete Profile Handler
  const handleDeleteProfile = (id: string) => {
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    saveStoredProfiles(updated);

    if (currentProfile?.id === id) {
      if (updated.length > 0) {
        handleSelectProfile(updated[0]);
      } else {
        setShowProfileModal(true);
      }
    }
  };

  // Background Settings Update
  const handleUpdateBgSettings = (newSettings: BackgroundSettings) => {
    setBgSettings(newSettings);
    saveStoredBgSettings(newSettings);
  };

  // Extract & Store pedagogyHighlights into Vocabulary List
  const extractAndStoreHighlights = (
    highlights: string[],
    day: number,
    contextSnippet?: string
  ) => {
    if (!highlights || highlights.length === 0 || !currentProfile) return;
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
      // Save isolated for current profile
      saveProfileVocab(currentProfile.id, updated);
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

  // Persist vocabulary list per profile
  useEffect(() => {
    if (currentProfile) {
      saveProfileVocab(currentProfile.id, vocabularyList);
    }
  }, [vocabularyList, currentProfile]);

  // Save Settings
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

      if (data.pedagogyHighlights && data.pedagogyHighlights.length > 0) {
        extractAndStoreHighlights(data.pedagogyHighlights, currentDay, data.reply);
      }

      if (autoPlayAudio && aiReplyMessage.content) {
        audioEngine.speakText(aiReplyMessage.content, { voiceName });
      }
    } catch {
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

  // Complete current day: updates user progress and active profile
  const handleCompleteDay = () => {
    const isAlreadyCompleted = userProgress.completedDays.includes(currentDay);
    const nextCompleted = isAlreadyCompleted
      ? userProgress.completedDays
      : [...userProgress.completedDays, currentDay];

    const nextMinutes = userProgress.totalMinutesPracticed + 60;
    const nextStreak = userProgress.streakDays + (isAlreadyCompleted ? 0 : 1);
    const nextDay = Math.min(90, currentDay + 1);
    const todayStr = new Date().toISOString().split('T')[0];

    const nextProgress: UserProgress = {
      ...userProgress,
      completedDays: nextCompleted,
      totalMinutesPracticed: nextMinutes,
      streakDays: nextStreak,
      currentDay: nextDay,
      lastPracticeDate: todayStr,
    };

    setUserProgress(nextProgress);

    // Persist into currentProfile and profiles list
    if (currentProfile) {
      const updatedProfile: UserProfile = {
        ...currentProfile,
        currentDay: nextDay,
        completedDays: nextCompleted,
        totalMinutesPracticed: nextMinutes,
        streakDays: nextStreak,
        lastPracticeDate: todayStr,
        lastActiveAt: Date.now(),
      };
      setCurrentProfile(updatedProfile);

      setProfiles((prev) => {
        const nextList = prev.map((p) => (p.id === currentProfile.id ? updatedProfile : p));
        saveStoredProfiles(nextList);
        return nextList;
      });
    }
  };

  const handleSelectDayFromRoadmap = (day: number) => {
    setCurrentDay(day);
    setCurrentStep('warmup');
  };

  const handleResetProgress = () => {
    const resetProgress: UserProgress = {
      currentDay: 1,
      completedDays: [],
      totalMinutesPracticed: 0,
      streakDays: 1,
      lastPracticeDate: new Date().toISOString().split('T')[0],
    };
    setUserProgress(resetProgress);
    setCurrentDay(1);
    setCurrentStep('warmup');

    if (currentProfile) {
      const updatedProfile: UserProfile = {
        ...currentProfile,
        currentDay: 1,
        completedDays: [],
        totalMinutesPracticed: 0,
        streakDays: 1,
        lastPracticeDate: resetProgress.lastPracticeDate,
      };
      setCurrentProfile(updatedProfile);
      setProfiles((prev) => {
        const nextList = prev.map((p) => (p.id === currentProfile.id ? updatedProfile : p));
        saveStoredProfiles(nextList);
        return nextList;
      });
    }
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
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative">
      {/* Dynamic Background with Family Lantern Photo & Contrast Engine */}
      <AppBackground settings={bgSettings} />

      {/* Foreground Interactive Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with Profile Switcher & Background Controls */}
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
          currentProfile={currentProfile}
          onOpenProfileModal={() => setShowProfileModal(true)}
          onOpenBackgroundModal={() => setShowBgModal(true)}
        />

        {/* Main Workspace Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

        {/* Distraction-Free Footer */}
        <footer className="border-t border-[#26354D]/60 bg-[#0B0F19]/80 backdrop-blur-md py-4 text-center text-xs text-slate-400">
          <p>
            LingoReflex • Tài khoản học viên: <strong className="text-white">{currentProfile?.name || 'Chưa chọn'}</strong> • Ngày {currentDay}/90 • 60 phút phản xạ mỗi ngày
          </p>
        </footer>
      </div>

      {/* Multi-User Profile Selection Modal (Shows at start or when switching profiles) */}
      <ProfileSelectionModal
        isOpen={showProfileModal}
        profiles={profiles}
        currentProfileId={currentProfile?.id || null}
        onSelectProfile={handleSelectProfile}
        onCreateProfile={handleCreateProfile}
        onUpdateProfile={handleUpdateProfile}
        onDeleteProfile={handleDeleteProfile}
        canClose={!!currentProfile}
        onClose={() => setShowProfileModal(false)}
      />

      {/* Background & Text Legibility Customizer Modal */}
      <BackgroundCustomizerModal
        isOpen={showBgModal}
        onClose={() => setShowBgModal(false)}
        settings={bgSettings}
        onUpdateSettings={handleUpdateBgSettings}
      />

      {/* Initial Trigger Modal (if triggered) */}
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
