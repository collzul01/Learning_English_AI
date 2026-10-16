import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  Flame,
  Map,
  Settings,
  Play,
  Pause,
  BookOpen,
  Headphones,
  MessageSquare,
  Award,
  BookMarked,
  CheckCircle2,
  Sliders,
  ChevronDown,
} from 'lucide-react';
import { ModuleStep, UserProgress, UserProfile } from '../types';
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
  currentProfile: UserProfile | null;
  onOpenProfileModal: () => void;
  onOpenBackgroundModal: () => void;
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
  currentProfile,
  onOpenProfileModal,
  onOpenBackgroundModal,
}) => {
  const [paceMode, setPaceMode] = useState<'60m' | '30m' | '15m'>('60m');

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const durationMap = {
    '60m': { warmup: '10p', roleplay: '25p', shadowing: '15p', debrief: '10p' },
    '30m': { warmup: '5p', roleplay: '12p', shadowing: '8p', debrief: '5p' },
    '15m': { warmup: '3p', roleplay: '6p', shadowing: '4p', debrief: '2p' },
  };

  const steps: {
    id: ModuleStep;
    stepNumber: number;
    title: string;
    subtitle: string;
    duration: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'warmup',
      stepNumber: 1,
      title: 'Khởi động',
      subtitle: 'Cụm từ i+1',
      duration: durationMap[paceMode].warmup,
      icon: BookOpen,
    },
    {
      id: 'roleplay',
      stepNumber: 2,
      title: 'Phản xạ 1-1',
      subtitle: 'Nhập vai AI',
      duration: durationMap[paceMode].roleplay,
      icon: MessageSquare,
    },
    {
      id: 'shadowing',
      stepNumber: 3,
      title: 'Nhại giọng',
      subtitle: 'Chuẩn ngữ điệu',
      duration: durationMap[paceMode].shadowing,
      icon: Headphones,
    },
    {
      id: 'debrief',
      stepNumber: 4,
      title: 'Đúc kết',
      subtitle: 'Sửa lỗi & Nhật ký',
      duration: durationMap[paceMode].debrief,
      icon: Award,
    },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-2xl border-b border-slate-800/80 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3">
          {/* Left: Brand Identity & Quick Profile Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-amber-500 p-[1.5px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
            </div>

            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white">
                  LingoReflex
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  A2 → B1+
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Huấn luyện Phản xạ Thực chiến
              </span>
            </div>

            {/* Active Family / Learner Profile Pill */}
            {currentProfile && (
              <button
                onClick={onOpenProfileModal}
                className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-indigo-500/50 pl-2.5 pr-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group ml-1"
                title="Đổi hồ sơ người học (Không cần mật khẩu)"
              >
                <span className="text-base leading-none">{currentProfile.avatar || '👨‍💼'}</span>
                <div className="text-left">
                  <div className="font-bold text-slate-100 group-hover:text-white max-w-[95px] truncate leading-tight">
                    {currentProfile.name}
                  </div>
                  <div className="text-[10px] text-indigo-400 font-medium leading-tight">
                    Đổi hồ sơ
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-300" />
              </button>
            )}
          </div>

          {/* Center: Ergonomic 4-Step Daily Journey Stepper */}
          <nav aria-label="Lộ trình phiên học" className="hidden xl:flex items-center">
            <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner gap-1">
              {steps.map((st, idx) => {
                const Icon = st.icon;
                const isActive = currentStep === st.id;
                const isCompleted = idx < currentStepIndex;

                return (
                  <button
                    key={st.id}
                    onClick={() => onSelectStep(st.id)}
                    className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30 font-bold ring-1 ring-indigo-400/50'
                        : isCompleted
                        ? 'text-slate-200 hover:text-white hover:bg-slate-800/70 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        isActive
                          ? 'bg-white text-indigo-600'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : st.stepNumber}
                    </div>
                    <div className="text-left">
                      <div className="leading-tight">{st.title}</div>
                    </div>
                    <span
                      className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-indigo-800/70 text-indigo-100'
                          : 'bg-slate-950/80 text-slate-400'
                      }`}
                    >
                      {st.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right: Executive Control Cluster */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Adaptive Session Timer + Mode Selector */}
            <div className="hidden md:flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span className="font-mono font-bold text-sm text-white tracking-wider">
                  {formatTime(timerSecondsRemaining)}
                </span>
                <button
                  onClick={onToggleTimer}
                  title={isTimerRunning ? 'Tạm dừng đồng hồ' : 'Tiếp tục tính giờ'}
                  className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {isTimerRunning ? (
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
              </div>

              {/* Quick Pace Mode Toggle for Busy 30-40yo Learners */}
              <select
                value={paceMode}
                onChange={(e) => setPaceMode(e.target.value as '60m' | '30m' | '15m')}
                title="Chọn quỹ thời gian phù hợp với lịch trình hôm nay của bạn"
                className="bg-slate-950 text-indigo-300 border border-slate-800 rounded-lg px-2 py-1 text-[11px] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="60m">Chuyên sâu (60p)</option>
                <option value="30m">Tiêu chuẩn (30p)</option>
                <option value="15m">Bận rộn (15p)</option>
              </select>
            </div>

            {/* Streak Badge */}
            <div
              className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-xl text-amber-300 text-xs font-bold"
              title="Chuỗi ngày duy trì kỷ luật liên tục"
            >
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{userProgress.streakDays} ngày</span>
            </div>

            {/* Vocabulary Drawer Button */}
            <button
              onClick={onOpenVocabulary}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-800 hover:border-indigo-500/40 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              title="Mở Sổ tay Cụm từ Phản xạ"
            >
              <BookMarked className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Sổ từ</span>
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[11px] font-mono font-bold">
                {vocabularyCount}
              </span>
            </button>

            {/* 90-Day Roadmap Button */}
            <button
              onClick={onOpenRoadmap}
              className="flex items-center gap-2 bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-200 border border-indigo-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              title="Xem toàn bộ lộ trình 90 ngày"
            >
              <Map className="w-4 h-4 text-indigo-400" />
              <span>Ngày {currentLesson.day}/90</span>
            </button>

            {/* Visual Comfort & Settings Group */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
              <button
                onClick={onOpenBackgroundModal}
                className="p-2 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Tuỳ chỉnh ánh sáng nền & chống mỏi mắt"
              >
                <Sliders className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenSettings}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Cài đặt giọng đọc AI & hệ thống"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet / Mobile Stepper Bar */}
      <div className="xl:hidden border-t border-slate-800/80 bg-[#0B0F19]/95 overflow-x-auto px-4 py-2">
        <div className="flex items-center justify-between gap-1.5 min-w-[360px]">
          {steps.map((st) => {
            const isActive = currentStep === st.id;
            return (
              <button
                key={st.id}
                onClick={() => onSelectStep(st.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>
                  {st.stepNumber}. {st.title}
                </span>
                <span className="text-[11px] opacity-80 font-mono">({st.duration})</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};