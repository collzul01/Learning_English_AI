import React, { useState } from 'react';
import {
  X,
  Map,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
} from 'lucide-react';
import { CURRICULUM_DATA, getLessonForDay } from '../data/curriculum';
import { UserProgress } from '../types';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay: number;
  onSelectDay: (day: number) => void;
  userProgress: UserProgress;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({
  isOpen,
  onClose,
  currentDay,
  onSelectDay,
  userProgress,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<1 | 2 | 3>(1);

  if (!isOpen) return null;

  const monthRanges = {
    1: { start: 1, end: 30, title: 'Tháng 1: Phá vỡ rào cản & Sinh hoạt cơ bản', cefr: 'CEFR A2 → B1' },
    2: { start: 31, end: 60, title: 'Tháng 2: Mở rộng kết nối & Xử lý tình huống', cefr: 'CEFR B1' },
    3: { start: 61, end: 90, title: 'Tháng 3: Giao tiếp phản xạ & Hội thoại chuyên sâu', cefr: 'CEFR B1+' },
  };

  const daysInCurrentMonth: number[] = [];
  for (
    let d = monthRanges[selectedMonth].start;
    d <= monthRanges[selectedMonth].end;
    d++
  ) {
    daysInCurrentMonth.push(d);
  }

  const completionPercent = Math.round(
    (userProgress.completedDays.length / 90) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Lộ Trình 90 Ngày Làm Chủ Tiếng Anh Giao Tiếp
              </h2>
              <p className="text-xs text-slate-400">
                Phương pháp SLA Krashen i+1 • Mỗi ngày đúng 60 phút • A2 bứt phá lên B1+
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stats Summary */}
        <div className="bg-slate-950/80 px-5 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>
                Đã hoàn thành: <strong className="text-white">{userProgress.completedDays.length}/90 ngày</strong> ({completionPercent}%)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>Chuỗi đều đặn: <strong>{userProgress.streakDays} ngày</strong></span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-36 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all"
              style={{ width: `${Math.max(completionPercent, 4)}%` }}
            />
          </div>
        </div>

        {/* Month Selector Tabs */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center gap-2 overflow-x-auto">
          {([1, 2, 3] as const).map((m) => {
            const isSelected = selectedMonth === m;
            return (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center whitespace-nowrap ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25 ring-1 ring-indigo-400/40'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div>Tháng {m}</div>
                <div className="text-[10px] font-normal opacity-80 mt-0.5">
                  {monthRanges[m].cefr}
                </div>
              </button>
            );
          })}
        </div>

        {/* Month Description */}
        <div className="px-6 py-3 bg-indigo-950/20 border-b border-slate-800/80 text-xs text-indigo-300 flex items-center justify-between">
          <span>{monthRanges[selectedMonth].title}</span>
          <span className="font-mono text-slate-400">Ngày {monthRanges[selectedMonth].start} - {monthRanges[selectedMonth].end}</span>
        </div>

        {/* Days List / Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5">
          {daysInCurrentMonth.map((dayNum) => {
            const lesson = getLessonForDay(dayNum);
            const isCompleted = userProgress.completedDays.includes(dayNum);
            const isCurrent = currentDay === dayNum;

            return (
              <div
                key={dayNum}
                onClick={() => {
                  onSelectDay(dayNum);
                  onClose();
                }}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                  isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-600/10 ring-1 ring-indigo-500/30'
                    : isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500/60'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isCurrent
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : dayNum}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {lesson.titleVi}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
                          Đang học
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium line-clamp-1">
                      {lesson.titleEn} • {lesson.cefrFocus}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
                    <span>Học ngay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
