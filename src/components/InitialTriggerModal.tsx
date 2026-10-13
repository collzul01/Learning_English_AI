import React, { useState } from 'react';
import { Sparkles, ArrowRight, Compass, Volume2, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface InitialTriggerModalProps {
  isOpen: boolean;
  onStartDay1: () => void;
  onExploreRoadmap: () => void;
}

export const InitialTriggerModal: React.FC<InitialTriggerModalProps> = ({
  isOpen,
  onStartDay1,
  onExploreRoadmap,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const englishGreeting =
    "Welcome! Today is Day 1 of your 90-day English speaking mastery journey. Are you ready to dive into your first topic, or would you like to explore a specific speaking scenario for today?";

  const handlePlayGreeting = () => {
    setIsPlayingAudio(true);
    audioEngine.speakText(englishGreeting, {
      voiceName: 'Kore',
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/50">
        {/* Glow decoration */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative">
          {/* Header Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              SLA Applied Linguistics • Krashen i+1 Core Engine
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-3">
            Hạt nhân Trí tuệ Giáo sư Hội thoại (Conversational AI Engine)
          </h2>

          {/* Bilingual Greeting Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 mb-6 space-y-3 shadow-inner">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-base sm:text-lg text-indigo-200 font-medium leading-relaxed">
                  "{englishGreeting}"
                </p>
                <p className="text-sm text-slate-400 italic">
                  "Hôm nay là Ngày 1 trong hành trình 90 ngày làm chủ tiếng Anh giao tiếp! Bạn đã sẵn sàng bắt đầu với chủ đề đầu tiên chưa, hay bạn muốn chọn một tình huống giao tiếp cụ thể cho ngày hôm nay?"
                </p>
              </div>

              <button
                onClick={handlePlayGreeting}
                className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                  isPlayingAudio
                    ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
                }`}
                title="Nghe phát âm lời chào"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                CEFR A2 bứt phá lên B1+
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Đúng 60 phút mỗi ngày
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Phản xạ không dịch nhẩm
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={onStartDay1}
              className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span>Bắt đầu Ngày 1: Phá vỡ rào cản</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreRoadmap}
              className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Khám phá Lộ trình 90 ngày</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
