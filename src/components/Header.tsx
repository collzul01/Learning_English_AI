import React from 'react';
import {
  Sparkles,
  Clock,
  Flame,
  Map,
  Settings,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Headphones,
  MessageSquare,
  Award,
  BookMarked,
  CheckCircle2,
} from 'lucide-react';
import { ModuleStep, UserProgress } from '../types';
import { DayLesson } from '../data/curriculum';

interface HeaderProps {
  currentLesson: DayLesson;
  currentStep: ModuleStep;
  onSelectStep: (step: ModuleStep) => void;
  timerSecondsRemaining: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  userProgress: UserProgress;
  vocabularyCount: number;
  onOpenVocabulary: () => void;
  onOpenRoadmap: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLesson,
  currentStep,
  onSelectStep,
  timerSecondsRemaining,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  userProgress,
  vocabularyCount,
  onOpenVocabulary,
  onOpenRoadmap,
  onOpenSettings,
}) => {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const steps: {
    id: ModuleStep;
    stepNumber: number;
    title: string;
    duration: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'warmup', stepNumber: 1, title: 'Warm-up', duration: '10m', icon: BookOpen },
    { id: 'roleplay', stepNumber: 2, title: 'Role-play', duration: '25m', icon: MessageSquare },
    { id: 'shadowing', stepNumber: 3, title: 'Shadowing', duration: '15m', icon: Headphones },
    { id: 'debrief', stepNumber: 4, title: 'Debrief', duration: '10m', icon: Award },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-[#26354D]/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Minimalist Brand Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-white font-sans">
                LingoReflex
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                A2 → B1
              </span>
            </div>
          </div>

          {/* Center: Distraction-Free 4-Step Stepper (60-minute daily cycle) */}
          <nav aria-label="Daily 60-min Journey" className="hidden lg:flex items-center">
            <div className="flex items-center bg-[#161F30]/80 p-1 rounded-xl border border-[#26354D] shadow-inner">
              {steps.map((st, idx) => {
                const Icon = st.icon;
                const isActive = currentStep === st.id;
                const isCompleted = idx < currentStepIndex;

                return (
                  <button
                    key={st.id}
                    onClick={() => onSelectStep(st.id)}
                    className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold ring-1 ring-indigo-400/50'
                        : isCompleted
                        ? 'text-slate-300 hover:text-white hover:bg-[#1E2B42]/50'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#1E2B42]/40'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? 'bg-white text-indigo-600'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : st.stepNumber}
                    </div>

                    <span>{st.title}</span>

                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isActive
                          ? 'bg-indigo-700/80 text-indigo-100'
                          : 'bg-[#0B0F19] text-slate-400 group-hover:text-slate-300'
                      }`}
                    >
                      {st.duration}
                    </span>

                    {/* Active glowing indicator */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-indigo-300 rounded-full shadow-[0_0_8px_#818cf8]" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right: Gamified Widgets & Compact Session Status */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Session Timer (Compact HUD) */}
            <div className="hidden sm:flex items-center gap-2 bg-[#161F30]/90 border border-[#26354D] px-2.5 py-1 rounded-xl text-xs text-slate-300 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-mono font-bold text-white tracking-wider">
                {formatTime(timerSecondsRemaining)}
              </span>
              <button
                onClick={onToggleTimer}
                title={isTimerRunning ? 'Tạm dừng đồng hồ' : 'Tiếp tục tính giờ'}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#1E2B42] transition-colors cursor-pointer"
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
              </button>
            </div>

            {/* Streak Counter Widget */}
            <div
              className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl text-amber-400 text-xs font-semibold shadow-sm"
              title="Chuỗi ngày luyện tập liên tục"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{userProgress.streakDays}d</span>
            </div>

            {/* Saved Chunks Quick Drawer Trigger */}
            <button
              onClick={onOpenVocabulary}
              className="flex items-center gap-1.5 bg-[#161F30] hover:bg-[#1E2B42] text-slate-200 border border-[#26354D] px-2.5 sm:px-3 py-1 rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer group"
              title="Mở Sổ Từ Vựng Phản Xạ"
            >
              <BookMarked className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-300" />
              <span className="hidden sm:inline">Từ vựng</span>
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
                {vocabularyCount}
              </span>
            </button>

            {/* Day Selector (Roadmap) */}
            <button
              onClick={onOpenRoadmap}
              className="flex items-center gap-1.5 bg-[#161F30] hover:bg-[#1E2B42] text-white border border-[#26354D] px-2.5 sm:px-3 py-1 rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer"
              title="Xem bản đồ lộ trình 90 ngày"
            >
              <Map className="w-3.5 h-3.5 text-sky-400" />
              <span>Ngày {currentLesson.day}/90</span>
            </button>

            {/* Settings Trigger */}
            <button
              onClick={onOpenSettings}
              className="p-1.5 rounded-xl bg-[#161F30] hover:bg-[#1E2B42] text-slate-400 hover:text-white border border-[#26354D] transition-colors cursor-pointer"
              title="Cài đặt giọng nói & hệ thống"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Sub-Stepper */}
      <div className="lg:hidden border-t border-[#26354D]/60 bg-[#0B0F19] overflow-x-auto scrollbar-none px-4 py-1.5">
        <div className="flex items-center justify-between gap-1 min-w-[340px]">
          {steps.map((st) => {
            const isActive = currentStep === st.id;
            return (
              <button
                key={st.id}
                onClick={() => onSelectStep(st.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#161F30]'
                }`}
              >
                <span>{st.title}</span>
                <span className="text-[10px] text-slate-300 font-mono opacity-80">({st.duration})</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
