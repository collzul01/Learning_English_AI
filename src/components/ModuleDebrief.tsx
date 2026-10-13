import React, { useState, useEffect, useMemo } from 'react';
import {
  Award,
  CheckCircle2,
  Sparkles,
  Moon,
  Clock,
  ArrowRight,
  Flame,
  Volume2,
  Mic,
  MicOff,
  RotateCcw,
  TrendingUp,
  BookMarked,
  BookOpen,
  PenTool,
  Calendar,
  Smile,
  Zap,
  Trash2,
  Heart,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { DayLesson } from '../data/curriculum';
import { ChatMessage, DailyDebriefData, UserProgress, VocabularyItem, JournalEntry } from '../types';
import { audioEngine, SpeechRecognizer } from '../utils/audio';

const JOURNAL_STORAGE_KEY = 'lingoreflex_journal_v1';

interface ModuleDebriefProps {
  lesson: DayLesson;
  messages: ChatMessage[];
  onCompleteDay: () => void;
  voiceName: string;
  userProgress?: UserProgress;
  vocabularyList?: VocabularyItem[];
  sessionDurationMinutes?: number;
}

export const ModuleDebrief: React.FC<ModuleDebriefProps> = ({
  lesson,
  messages,
  onCompleteDay,
  voiceName,
  userProgress,
  vocabularyList = [],
  sessionDurationMinutes = 60,
}) => {
  const [activeTab, setActiveTab] = useState<'debrief' | 'journal'>('debrief');
  const [debriefData, setDebriefData] = useState<DailyDebriefData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [drillAnswer, setDrillAnswer] = useState('');
  const [isRecordingDrill, setIsRecordingDrill] = useState(false);
  const [drillFeedback, setDrillFeedback] = useState<string | null>(null);
  const [bedtimeTimer, setBedtimeTimer] = useState(180); // 3 minutes = 180 seconds
  const [isBedtimeTimerActive, setIsBedtimeTimerActive] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Journaling state
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'j-init-1',
        day: 1,
        date: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' }),
        reflectionText:
          "Today I stepped out of my comfort zone and spoke English without translating word-for-word in my head. Practicing aloud made my tongue feel much lighter!",
        confidenceMood: 'progressing',
        favoriteChunkUsed: 'step out of my comfort zone',
        createdAt: Date.now() - 86400000,
      },
    ];
  });

  const [reflectionInput, setReflectionInput] = useState('');
  const [selectedMood, setSelectedMood] = useState<'confident' | 'progressing' | 'challenging'>('progressing');
  const [selectedChunk, setSelectedChunk] = useState<string>(lesson.chunks[0]?.phrase || '');
  const [isRecordingJournal, setIsRecordingJournal] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);

  // Persist Journal entries
  useEffect(() => {
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journalEntries));
    } catch {}
  }, [journalEntries]);

  // Load debrief from API
  useEffect(() => {
    async function fetchDebrief() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/generate-daily-debrief', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            day: lesson.day,
            conversationHistory: messages.map((m) => ({ role: m.role, content: m.content })),
            lessonTitle: lesson.titleEn,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setDebriefData(data);
        } else {
          // Fallback based on lesson data
          setDebriefData({
            bestPoints: [
              'Phản xạ hội thoại tích cực, không ngại mắc lỗi',
              'Đã vận dụng thành công các cụm từ then chốt vào câu trả lời',
            ],
            needsWork: [
              {
                learnerSaid: 'I like it very much',
                improvedB1: 'I am really into it',
                explanationVi: 'Sử dụng collocations để tự nhiên hơn theo chuẩn B1',
              },
              {
                learnerSaid: 'Where is the shop?',
                improvedB1: 'Could you point me to the shop?',
                explanationVi: 'Tăng tính lịch sự và linh hoạt trong giao tiếp',
              },
            ],
            bedtimeDrill: {
              challengeQuestionEn: lesson.bedtimeReflex.challengePromptEn,
              situationVi: lesson.bedtimeReflex.scenarioVi,
              targetReflexChunk: lesson.chunks[0]?.phrase || 'natural chunk',
              sampleResponseB1: lesson.bedtimeReflex.sampleReflexB1,
            },
            professorSummaryVi:
              'Chúc mừng bạn đã hoàn thành trọn vẹn 60 phút buổi học hôm nay! Phản xạ ngôn ngữ đang dần trở thành bản năng.',
          });
        }
      } catch {
        setDebriefData({
          bestPoints: [
            'Duy trì tinh thần tự tin và dòng suy nghĩ trôi chảy',
            'Hoàn thành đầy đủ 4 module theo giáo trình SLA',
          ],
          needsWork: [
            {
              learnerSaid: 'I am agree',
              improvedB1: 'I totally agree / I see your point',
              explanationVi: 'Tránh lỗi dịch từng từ từ tiếng Việt',
            },
          ],
          bedtimeDrill: {
            challengeQuestionEn: lesson.bedtimeReflex.challengePromptEn,
            situationVi: lesson.bedtimeReflex.scenarioVi,
            targetReflexChunk: lesson.chunks[0]?.phrase || 'steady progress',
            sampleResponseB1: lesson.bedtimeReflex.sampleReflexB1,
          },
          professorSummaryVi: 'Một buổi học xuất sắc! Não bộ của bạn đã tiếp nhận đủ Comprehensible Input hôm nay.',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchDebrief();
  }, [lesson.day]);

  // 3-Minute Bedtime Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (isBedtimeTimerActive && bedtimeTimer > 0) {
      interval = setInterval(() => {
        setBedtimeTimer((prev) => prev - 1);
      }, 1000);
    } else if (bedtimeTimer === 0) {
      setIsBedtimeTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isBedtimeTimerActive, bedtimeTimer]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    audioEngine.playDing('success');
    setHasCelebrated(true);
    onCompleteDay();
  };

  const handleRecordDrill = () => {
    if (isRecordingDrill) {
      setIsRecordingDrill(false);
      return;
    }

    const recognizer = new SpeechRecognizer(
      (transcript, isFinal) => {
        setDrillAnswer(transcript);
        if (isFinal) {
          setIsRecordingDrill(false);
          recognizer.stop();
          setDrillFeedback('Tuyệt vời! Bạn đã hoàn thành bài tập phản xạ 3 phút trước khi ngủ.');
          audioEngine.playDing('success');
        }
      },
      () => setIsRecordingDrill(false),
      (listening) => setIsRecordingDrill(listening)
    );

    if (recognizer.isSupported()) {
      setIsRecordingDrill(true);
      recognizer.start();
    }
  };

  // Record reflection via speech
  const handleRecordJournalSpeech = () => {
    if (isRecordingJournal) {
      setIsRecordingJournal(false);
      return;
    }

    const recognizer = new SpeechRecognizer(
      (transcript, isFinal) => {
        setReflectionInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        if (isFinal) {
          setIsRecordingJournal(false);
          recognizer.stop();
          audioEngine.playDing('click');
        }
      },
      () => setIsRecordingJournal(false),
      (listening) => setIsRecordingJournal(listening)
    );

    if (recognizer.isSupported()) {
      setIsRecordingJournal(true);
      recognizer.start();
    } else {
      alert('Trình duyệt chưa bật Microphone Web Speech API. Bạn có thể gõ trực tiếp nhật ký vào ô bên dưới!');
    }
  };

  // Save new reflection entry
  const handleSaveJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = reflectionInput.trim();
    if (!text) return;

    const newEntry: JournalEntry = {
      id: `journal-${Date.now()}`,
      day: lesson.day,
      date: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' }),
      reflectionText: text,
      confidenceMood: selectedMood,
      favoriteChunkUsed: selectedChunk || undefined,
      createdAt: Date.now(),
    };

    setJournalEntries((prev) => [newEntry, ...prev]);
    setReflectionInput('');
    setSaveSuccessMessage(true);
    audioEngine.playDing('success');

    setTimeout(() => {
      setSaveSuccessMessage(false);
    }, 3000);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  // Prepare Progress Over Time Chart Data for Recharts
  const chartData = useMemo(() => {
    const currentDay = lesson.day;
    const startDay = Math.max(1, currentDay - 6);
    const dataPoints = [];

    const totalMasteredOverall = vocabularyList.filter((v) => v.mastered).length;

    for (let d = startDay; d <= currentDay; d++) {
      const masteredSoFar = vocabularyList.filter(
        (v) => v.mastered && v.day <= d
      ).length;

      const duration = d === currentDay ? Math.min(60, sessionDurationMinutes) : 60;

      dataPoints.push({
        dayLabel: `Ngày ${d}`,
        dayNumber: d,
        durationMinutes: duration,
        masteredVocab: Math.max(masteredSoFar, d === currentDay ? totalMasteredOverall : Math.max(0, d - 1)),
      });
    }

    return dataPoints;
  }, [lesson.day, vocabularyList, sessionDurationMinutes]);

  // Custom Dark Recharts Tooltip
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 min-w-[170px]">
          <p className="font-bold text-white border-b border-slate-800 pb-1">{label}</p>
          <div className="flex items-center justify-between text-indigo-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              Thời lượng học:
            </span>
            <strong className="font-mono text-white">{payload[0]?.value} phút</strong>
          </div>
          <div className="flex items-center justify-between text-emerald-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Từ vựng đã thuộc:
            </span>
            <strong className="font-mono text-white">{payload[1]?.value} từ</strong>
          </div>
        </div>
      );
    }
    return null;
  };

  const starterTemplates = [
    `Today I felt much more confident using "${lesson.chunks[0]?.phrase || 'key chunks'}" without hesitation.`,
    `Speaking out loud during the role-play helped me stop translating word-by-word from Vietnamese.`,
    `I managed to handle the speaking scenario smoothly and my natural intonation is improving day by day.`,
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold font-mono border border-emerald-500/30">
                MODULE 4 • 10 PHÚT
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/20">
                Pedagogical Debrief & Daily Journal
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Tổng kết Sư phạm & Nhật ký Rèn luyện Ngày {lesson.day}
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Đánh giá thành quả sau 60 phút, nhận diện 2 điểm sáng, sửa lỗi và ghi lại 1-2 câu suy ngẫm mỗi ngày.
            </p>
          </div>

          <button
            onClick={triggerCelebration}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-900/40 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
          >
            <Award className="w-5 h-5" />
            <span>Hoàn thành Buổi học Ngày {lesson.day}!</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs: Debrief vs Journaling */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab('debrief')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'debrief'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Tổng kết & Biểu đồ Tiến độ</span>
        </button>

        <button
          onClick={() => setActiveTab('journal')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'journal'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <PenTool className="w-4 h-4 text-amber-400" />
          <span>Nhật ký Phản xạ (Daily Journal)</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-950/60 text-[10px] font-mono border border-slate-700">
            {journalEntries.length}
          </span>
        </button>
      </div>

      {/* TAB 1: DEBRIEF & PROGRESS CHART */}
      {activeTab === 'debrief' && (
        <>
          {isLoading ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
              <p className="text-slate-300 font-medium">Giáo sư SLA đang biên soạn bản nhận xét sư phạm chi tiết...</p>
            </div>
          ) : (
            debriefData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
                {/* 2 Best Points */}
                <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 space-y-3 shadow-lg">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>2 Điểm làm tốt nhất hôm nay (Strengths)</span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-200">
                    {debriefData.bestPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2 Key Corrections / Recasts */}
                <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 space-y-3 shadow-lg">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                    <Sparkles className="w-5 h-5" />
                    <span>2 Điểm cần sửa & Nâng cấp B1 (Conversational Recasting)</span>
                  </div>
                  <div className="space-y-2.5 text-xs text-slate-200">
                    {debriefData.needsWork.map((item, i) => (
                      <div key={i} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Cách nói cũ (A2):</span>
                          <span className="text-amber-400 font-medium font-mono line-through">"{item.learnerSaid}"</span>
                        </div>
                        <div className="flex items-center justify-between font-semibold text-emerald-400">
                          <span>Nâng cấp chuẩn B1:</span>
                          <span className="text-white bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                            "{item.improvedB1}"
                          </span>
                        </div>
                        <p className="text-slate-400 italic pt-1 border-t border-slate-800/80">
                          💡 {item.explanationVi}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recharts Progress Over Time Line Chart */}
                <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">
                          Biểu Đồ Tiến Độ Rèn Luyện & Vốn Từ Tích Lũy (Progress Over Time)
                        </h3>
                        <p className="text-xs text-slate-400">
                          Trực quan hóa thời lượng học 60 phút và số lượng cụm từ then chốt đã làm chủ qua từng ngày
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
                        <span className="w-3 h-0.5 bg-indigo-500 inline-block" />
                        <span>Thời lượng (phút)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <span className="w-3 h-0.5 bg-emerald-400 inline-block" />
                        <span>Từ đã thuộc (từ)</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart Canvas */}
                  <div className="w-full h-64 sm:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis
                          dataKey="dayLabel"
                          stroke="#64748b"
                          fontSize={11}
                          tickLine={false}
                        />
                        <YAxis
                          stroke="#64748b"
                          fontSize={11}
                          tickLine={false}
                          domain={[0, 'auto']}
                        />
                        <Tooltip content={<CustomChartTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="durationMinutes"
                          name="Thời lượng học (phút)"
                          stroke="#6366f1"
                          strokeWidth={2.5}
                          dot={{ fill: '#6366f1', r: 4 }}
                          activeDot={{ r: 6, fill: '#818cf8', stroke: '#ffffff', strokeWidth: 2 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="masteredVocab"
                          name="Từ vựng đã làm chủ"
                          stroke="#10b981"
                          strokeWidth={2.5}
                          dot={{ fill: '#10b981', r: 4 }}
                          activeDot={{ r: 6, fill: '#34d399', stroke: '#ffffff', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Chart Key Takeaways */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-slate-800/80">
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block mb-0.5">Thời lượng buổi hôm nay:</span>
                      <span className="text-sm font-bold text-indigo-300 font-mono">
                        {sessionDurationMinutes} phút / 60 phút
                      </span>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block mb-0.5">Tổng số từ vựng đã tích lũy:</span>
                      <span className="text-sm font-bold text-emerald-300 font-mono">
                        {vocabularyList.length} cụm từ
                      </span>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block mb-0.5">Từ vựng đã làm chủ (Mastered):</span>
                      <span className="text-sm font-bold text-amber-300 font-mono">
                        {vocabularyList.filter((v) => v.mastered).length} cụm từ
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3-Minute Bedtime Reflex Exercise */}
                <div className="md:col-span-2 bg-gradient-to-b from-indigo-950/50 to-slate-950 border border-indigo-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                        <Moon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">
                          Bài tập phản xạ 3 phút trước khi ngủ (Bedtime Reflex Drill)
                        </h3>
                        <p className="text-xs text-slate-400">
                          Thực hành phản xạ tức thì để não bộ củng cố trí nhớ dài hạn (Memory Consolidation) trong lúc ngủ.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-indigo-300">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{formatTimer(bedtimeTimer)}</span>
                      </div>
                      <button
                        onClick={() => setIsBedtimeTimerActive(!isBedtimeTimerActive)}
                        className="px-3 py-1 rounded-lg bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-medium transition-colors"
                      >
                        {isBedtimeTimerActive ? 'Tạm dừng' : 'Bật đếm giờ 3 phút'}
                      </button>
                    </div>
                  </div>

                  {/* Drill Prompt */}
                  <div className="space-y-2 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400">
                      <strong className="text-indigo-400">Ngữ cảnh:</strong> {debriefData.bedtimeDrill.situationVi}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      👉 Câu hỏi phản xạ: "{debriefData.bedtimeDrill.challengeQuestionEn}"
                    </div>
                  </div>

                  {/* Learner Speech Input */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <button
                      onClick={handleRecordDrill}
                      className={`px-4 py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 ${
                        isRecordingDrill
                          ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                      }`}
                    >
                      {isRecordingDrill ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-indigo-400" />}
                      <span>{isRecordingDrill ? 'Đang nghe... Nói ngay!' : 'Nói câu trả lời phản xạ'}</span>
                    </button>

                    <input
                      type="text"
                      value={drillAnswer}
                      onChange={(e) => setDrillAnswer(e.target.value)}
                      placeholder="Hoặc gõ câu trả lời phản xạ của bạn..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  {drillFeedback && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{drillFeedback}</span>
                    </div>
                  )}

                  {/* Model Reflex Answer */}
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1 text-xs">
                    <span className="text-slate-400 block font-medium">Câu mẫu phản xạ chuẩn B1+:</span>
                    <p className="text-indigo-200 font-semibold italic">"{debriefData.bedtimeDrill.sampleResponseB1}"</p>
                  </div>

                  {/* Professor Summary */}
                  <div className="text-center pt-2 text-xs text-slate-400 italic">
                    "{debriefData.professorSummaryVi}"
                  </div>
                </div>
              </div>
            )
          )}
        </>
      )}

      {/* TAB 2: DAILY JOURNAL */}
      {activeTab === 'journal' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Reflection Entry Creator Card */}
          <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    Ghi Chép Suy Ngẫm Ngày {lesson.day} (1-2 Sentence Reflection)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Tự đánh giá sự bứt phá phản xạ nói và cảm xúc học tập hôm nay
                  </p>
                </div>
              </div>

              {/* Confidence Mood Selector */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                {(
                  [
                    { id: 'confident', label: '🌟 Rất tự tin', color: 'text-amber-300' },
                    { id: 'progressing', label: '🚀 Đang tiến bộ', color: 'text-indigo-300' },
                    { id: 'challenging', label: '💪 Đã nỗ lực', color: 'text-emerald-300' },
                  ] as const
                ).map((mood) => (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => setSelectedMood(mood.id)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      selectedMood === mood.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Starter Templates */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Gợi ý mẫu câu suy ngẫm (Bấm để nạp):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {starterTemplates.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReflectionInput(tmpl)}
                    className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  >
                    "{tmpl}"
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveJournalEntry} className="space-y-3">
              <div className="relative">
                <textarea
                  value={reflectionInput}
                  onChange={(e) => setReflectionInput(e.target.value)}
                  rows={3}
                  placeholder={`Viết 1-2 câu cảm nghĩ về buổi học Ngày ${lesson.day}... (Ví dụ: "Hôm nay mình đã bắt đầu phản xạ tự nhiên hơn với cụm '${lesson.chunks[0]?.phrase}' và không còn ngập ngừng khi chào hỏi!")`}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  {/* Voice dictation button */}
                  <button
                    type="button"
                    onClick={handleRecordJournalSpeech}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                      isRecordingJournal
                        ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                  >
                    {isRecordingJournal ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-indigo-400" />}
                    <span>{isRecordingJournal ? 'Đang nghe... Nói ngay' : 'Đọc qua Mic'}</span>
                  </button>

                  {/* Highlighted chunk selection */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Cụm từ ghi dấu:</span>
                    <select
                      value={selectedChunk}
                      onChange={(e) => setSelectedChunk(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none"
                    >
                      {lesson.chunks.map((c, ci) => (
                        <option key={ci} value={c.phrase}>
                          {c.phrase}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {saveSuccessMessage && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4" />
                      Đã lưu nhật ký!
                    </span>
                  )}
                  <button
                    type="submit"
                    disabled={!reflectionInput.trim()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Lưu vào Nhật ký
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Past Journal Log Feed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Lịch sử Nhật ký Phản xạ ({journalEntries.length} ghi chép):
              </span>
              <span>Lưu bền vững trên trình duyệt</span>
            </div>

            <div className="space-y-3">
              {journalEntries.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
                  Chưa có ghi chép nhật ký nào. Hãy viết 1-2 câu suy ngẫm đầu tiên ở trên nhé!
                </div>
              ) : (
                journalEntries.map((entry) => {
                  const moodBadge =
                    entry.confidenceMood === 'confident'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : entry.confidenceMood === 'challenging'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';

                  const moodLabel =
                    entry.confidenceMood === 'confident'
                      ? '🌟 Rất tự tin'
                      : entry.confidenceMood === 'challenging'
                      ? '💪 Đã nỗ lực'
                      : '🚀 Đang tiến bộ';

                  return (
                    <div
                      key={entry.id}
                      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2 hover:border-slate-700 transition-all shadow-md group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            Ngày {entry.day}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{entry.date}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${moodBadge}`}
                          >
                            {moodLabel}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteJournalEntry(entry.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Xóa ghi chép này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-sm text-slate-100 font-medium leading-relaxed whitespace-pre-wrap">
                        "{entry.reflectionText}"
                      </p>

                      {entry.favoriteChunkUsed && (
                        <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-1">
                          <span>Cụm từ đã vận dụng:</span>
                          <span className="font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                            ✨ {entry.favoriteChunkUsed}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


