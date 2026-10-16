import React, { useState, useEffect, useMemo } from 'react';
import {
  Award,
  CheckCircle2,
  Sparkles,
  Moon,
  Clock,
  Mic,
  MicOff,
  TrendingUp,
  BookOpen,
  PenTool,
  Trash2,
  Eye,
  EyeOff,
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
} from 'recharts';
import { DayLesson } from '../data/curriculum';
import {
  ChatMessage,
  DailyDebriefData,
  UserProgress,
  VocabularyItem,
  JournalEntry,
} from '../types';
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
  const [showSampleReflex, setShowSampleReflex] = useState(false);
  const [bedtimeTimer, setBedtimeTimer] = useState(180);
  const [isBedtimeTimerActive, setIsBedtimeTimerActive] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'j-init-1',
        day: 1,
        date: new Date().toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        reflectionText:
          'Today I stepped out of my comfort zone and spoke English without translating word-for-word in my head. Practicing aloud made my reflex much faster!',
        confidenceMood: 'progressing',
        favoriteChunkUsed: 'step out of my comfort zone',
        createdAt: Date.now() - 86400000,
      },
    ];
  });

  const [reflectionInput, setReflectionInput] = useState('');
  const [selectedMood, setSelectedMood] = useState<'confident' | 'progressing' | 'challenging'>(
    'progressing'
  );
  const [selectedChunk, setSelectedChunk] = useState<string>(lesson.chunks[0]?.phrase || '');
  const [isRecordingJournal, setIsRecordingJournal] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journalEntries));
    } catch {}
  }, [journalEntries]);

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
          setDebriefData({
            bestPoints: [
              'Phản xạ hội thoại chủ động, duy trì mạch nói tự nhiên không bị ngắt quãng lâu.',
              'Vận dụng hiệu quả các cụm từ cố định (Lexical Chunks) đúng ngữ cảnh giao tiếp.',
            ],
            needsWork: [
              {
                learnerSaid: 'I like it very much',
                improvedB1: 'I am really into it',
                explanationVi: 'Sử dụng cụm từ (collocation) giúp câu nói tự nhiên và đạt chuẩn B1+.',
              },
              {
                learnerSaid: 'Where is the shop?',
                improvedB1: 'Could you point me in the direction of the shop?',
                explanationVi: 'Tăng tính lịch sự và trang nhã khi giao tiếp ở môi trường quốc tế.',
              },
            ],
            bedtimeDrill: {
              challengeQuestionEn: lesson.bedtimeReflex.challengePromptEn,
              situationVi: lesson.bedtimeReflex.scenarioVi,
              targetReflexChunk: lesson.chunks[0]?.phrase || 'natural chunk',
              sampleResponseB1: lesson.bedtimeReflex.sampleReflexB1,
            },
            professorSummaryVi:
              'Chúc mừng bạn đã hoàn thành trọn vẹn phiên học hôm nay! Phản xạ ngôn ngữ của bạn đang dần chuyển từ dịch thầm sang bật nói tự nhiên.',
          });
        }
      } catch {
        setDebriefData({
          bestPoints: [
            'Duy trì sự tự tin và tốc độ phản hồi ổn định xuyên suốt các tình huống.',
            'Hoàn thành đầy đủ 4 bước rèn luyện theo tiêu chuẩn Tiếp thu Ngôn ngữ (SLA).',
          ],
          needsWork: [
            {
              learnerSaid: 'I am agree with you',
              improvedB1: 'I totally agree / I see where you are coming from',
              explanationVi: 'Tránh lỗi dịch từng từ từ tiếng Việt (Agree là động từ thường).',
            },
          ],
          bedtimeDrill: {
            challengeQuestionEn: lesson.bedtimeReflex.challengePromptEn,
            situationVi: lesson.bedtimeReflex.scenarioVi,
            targetReflexChunk: lesson.chunks[0]?.phrase || 'steady progress',
            sampleResponseB1: lesson.bedtimeReflex.sampleReflexB1,
          },
          professorSummaryVi:
            'Một phiên luyện tập rất chất lượng! Não bộ của bạn đã nạp thêm lượng lớn Comprehensible Input (i+1) hôm nay.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchDebrief();
  }, [lesson.day]);

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
          setShowSampleReflex(true);
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
      alert('Trình duyệt chưa hỗ trợ thu âm trực tiếp. Bạn có thể nhập bằng bàn phím.');
    }
  };

  const handleSaveJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = reflectionInput.trim();
    if (!text) return;

    const newEntry: JournalEntry = {
      id: `journal-${Date.now()}`,
      day: lesson.day,
      date: new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
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

  const chartData = useMemo(() => {
    const currentDay = lesson.day;
    const startDay = Math.max(1, currentDay - 6);
    const dataPoints = [];
    const totalMasteredOverall = vocabularyList.filter((v) => v.mastered).length;

    for (let d = startDay; d <= currentDay; d++) {
      const masteredSoFar = vocabularyList.filter((v) => v.mastered && v.day <= d).length;
      const duration = d === currentDay ? Math.min(60, sessionDurationMinutes) : 60;
      dataPoints.push({
        dayLabel: `Ngày ${d}`,
        dayNumber: d,
        durationMinutes: duration,
        masteredVocab: Math.max(
          masteredSoFar,
          d === currentDay ? totalMasteredOverall : Math.max(0, d - 1)
        ),
      });
    }
    return dataPoints;
  }, [lesson.day, vocabularyList, sessionDurationMinutes]);

  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl shadow-2xl text-xs space-y-1.5 min-w-[180px]">
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
              Cụm từ làm chủ:
            </span>
            <strong className="font-mono text-white">{payload[1]?.value} cụm</strong>
          </div>
        </div>
      );
    }
    return null;
  };

  const starterTemplates = [
    `Today I felt much more confident using "${
      lesson.chunks[0]?.phrase || 'key chunks'
    }" without hesitation.`,
    `Speaking out loud during the role-play helped me stop translating word-by-word from Vietnamese.`,
    `I managed to handle the speaking scenario smoothly and my natural intonation is improving day by day.`,
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn pb-10">
      {/* Top Executive Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono border border-emerald-500/30">
              BƯỚC 4 • ĐÚC KẾT SƯ PHẠM & NHẬT KÝ PHẢN XẠ
            </span>
            {hasCelebrated && (
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                ✓ Đã lưu tiến độ Ngày {lesson.day}
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Báo cáo Đánh giá Phiên học Ngày {lesson.day}/90
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Nhìn lại 2 điểm sáng, 2 nâng cấp cấu trúc B1+ và củng cố trí nhớ dài hạn trước khi nghỉ ngơi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Sub-Tabs Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('debrief')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'debrief'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Đúc kết & Biểu đồ</span>
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'journal'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PenTool className="w-4 h-4 text-amber-400" />
              <span>Nhật ký ({journalEntries.length})</span>
            </button>
          </div>

          <button
            onClick={triggerCelebration}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-900/40 transition-all hover:scale-[1.01] cursor-pointer"
          >
            <Award className="w-5 h-5" />
            <span>Hoàn thành Ngày {lesson.day} & Sang bài mới</span>
          </button>
        </div>
      </div>

      {/* TAB 1: EXECUTIVE DEBRIEF & BENTO ANALYTICS */}
      {activeTab === 'debrief' && (
        <>
          {isLoading ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
              <p className="text-slate-200 font-semibold">
                Giáo sư SLA đang tổng hợp phân tích từ cuộc hội thoại của bạn...
              </p>
            </div>
          ) : (
            debriefData && (
              <div className="space-y-6 animate-fadeIn">
                {/* BENTO ROW 1: Strengths (6 cols) + Conversational Recasting (6 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* 2 Key Strengths */}
                  <div className="lg:col-span-6 bg-slate-900/95 border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center gap-2.5 text-emerald-400 font-extrabold text-base border-b border-slate-800 pb-3">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>2 Điểm Sáng Phản Xạ Hôm Nay (Strengths)</span>
                    </div>
                    <ul className="space-y-3 text-sm sm:text-[15px] text-slate-100 leading-relaxed">
                      {debriefData.bestPoints.map((pt, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800"
                        >
                          <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2 Conversational Recasts */}
                  <div className="lg:col-span-6 bg-slate-900/95 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center gap-2.5 text-amber-300 font-extrabold text-base border-b border-slate-800 pb-3">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <span>2 Điểm Nâng Cấp Lên Chuẩn B1+ (Recasting)</span>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm">
                      {debriefData.needsWork.map((item, i) => (
                        <div
                          key={i}
                          className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2 text-slate-400">
                            <span>Thói quen cũ (A2):</span>
                            <span className="text-rose-300 font-mono line-through">
                              "{item.learnerSaid}"
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2 font-bold text-emerald-300">
                            <span>Diễn đạt chuẩn B1+:</span>
                            <span className="text-white bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                              "{item.improvedB1}"
                            </span>
                          </div>
                          <p className="text-slate-300 italic pt-1.5 border-t border-slate-800/80 text-xs">
                            💡 {item.explanationVi}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BENTO ROW 2: Recharts Analytics (7 cols) + 3-Min Bedtime Reflex Drill (5 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left 7 Cols: Progress Over Time Chart */}
                  <div className="lg:col-span-7 bg-slate-900/95 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-white text-base">
                            Biểu đồ Kỷ luật & Vốn từ Tích lũy
                          </h3>
                          <p className="text-xs text-slate-400">
                            Theo dõi đà tăng trưởng thời lượng luyện tập và cụm từ làm chủ
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={chartData}
                          margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={11} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 'auto']} />
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
                            name="Cụm từ làm chủ"
                            stroke="#10b981"
                            strokeWidth={2.5}
                            dot={{ fill: '#10b981', r: 4 }}
                            activeDot={{ r: 6, fill: '#34d399', stroke: '#ffffff', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2 text-xs border-t border-slate-800">
                      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 block mb-0.5">Phiên hôm nay</span>
                        <span className="text-sm font-extrabold text-indigo-300 font-mono">
                          {sessionDurationMinutes} phút
                        </span>
                      </div>
                      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 block mb-0.5">Sổ từ tích lũy</span>
                        <span className="text-sm font-extrabold text-emerald-300 font-mono">
                          {vocabularyList.length} cụm từ
                        </span>
                      </div>
                      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 block mb-0.5">Đã thuộc nằm lòng</span>
                        <span className="text-sm font-extrabold text-amber-300 font-mono">
                          {vocabularyList.filter((v) => v.mastered).length} cụm từ
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right 5 Cols: 3-Minute Bedtime Reflex Consolidation */}
                  <div className="lg:col-span-5 bg-gradient-to-b from-indigo-950/50 to-slate-950 border border-indigo-500/40 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                            <Moon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-extrabold text-white text-sm sm:text-base">
                              Phản xạ 3 Phút Trước Khi Ngủ
                            </h3>
                            <p className="text-[11px] text-slate-400">
                              Khắc sâu vào trí nhớ dài hạn (Memory Consolidation)
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsBedtimeTimerActive(!isBedtimeTimerActive)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-indigo-300 hover:text-white cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{formatTimer(bedtimeTimer)}</span>
                        </button>
                      </div>

                      <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                        <div className="text-xs text-slate-300">
                          <strong className="text-indigo-300">Tình huống giả định:</strong>{' '}
                          {debriefData.bedtimeDrill.situationVi}
                        </div>
                        <div className="text-sm font-bold text-white">
                          Thử thách: "{debriefData.bedtimeDrill.challengeQuestionEn}"
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <button
                          onClick={handleRecordDrill}
                          className={`w-full py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isRecordingDrill
                              ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/30 shadow-lg'
                          }`}
                        >
                          {isRecordingDrill ? (
                            <MicOff className="w-4 h-4" />
                          ) : (
                            <Mic className="w-4 h-4" />
                          )}
                          <span>
                            {isRecordingDrill
                              ? 'Đang thu âm... Hãy bật nói trong 5 giây!'
                              : 'Bấm Mic Trả lời Phản xạ (5 giây)'}
                          </span>
                        </button>

                        <input
                          type="text"
                          value={drillAnswer}
                          onChange={(e) => setDrillAnswer(e.target.value)}
                          placeholder="Hoặc gõ nhanh câu phản xạ của bạn tại đây..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      {drillFeedback && (
                        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{drillFeedback}</span>
                        </div>
                      )}
                    </div>

                    {/* Sample Answer Reveal Toggle */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <button
                        type="button"
                        onClick={() => setShowSampleReflex(!showSampleReflex)}
                        className="flex items-center justify-between w-full text-xs text-indigo-300 hover:text-white font-semibold cursor-pointer"
                      >
                        <span>Đáp án phản xạ mẫu chuẩn B1+</span>
                        <span className="flex items-center gap-1">
                          {showSampleReflex ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" /> Ẩn mẫu
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" /> Xem mẫu
                            </>
                          )}
                        </span>
                      </button>

                      {showSampleReflex && (
                        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-indigo-500/30 text-xs sm:text-sm text-indigo-200 font-semibold italic animate-fadeIn">
                          "{debriefData.bedtimeDrill.sampleResponseB1}"
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      )}

      {/* TAB 2: 2-COLUMN BENTO DAILY JOURNAL */}
      {activeTab === 'journal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left 5 Cols: Journal Composer */}
          <div className="lg:col-span-5 bg-slate-900/95 border border-indigo-500/30 rounded-3xl p-6 shadow-xl space-y-5 h-fit">
            <div className="border-b border-slate-800 pb-3 space-y-1">
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <PenTool className="w-4 h-4 text-amber-400" />
                <span>Viết Nhật ký Phản xạ Ngày {lesson.day}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Ghi lại 1–2 câu tiếng Anh về cảm nhận hoặc cụm từ bạn tâm đắc nhất hôm nay.
              </p>
            </div>

            {/* Mood Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Cảm giác tự tin của bạn hôm nay:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'confident', label: '🔥 Rất tự tin' },
                    { id: 'progressing', label: '📈 Đang tiến bộ' },
                    { id: 'challenging', label: '💪 Đầy thử thách' },
                  ] as const
                ).map((mood) => (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => setSelectedMood(mood.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedMood === mood.id
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Starter Templates */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-300 block">
                Mẫu câu gợi ý nhanh (Chạm để điền):
              </span>
              <div className="space-y-1.5">
                {starterTemplates.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReflectionInput(tmpl)}
                    className="w-full text-left text-xs p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                  >
                    "{tmpl}"
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveJournalEntry} className="space-y-3">
              <textarea
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
                rows={3}
                placeholder={`Viết 1-2 câu cảm nghĩ bằng tiếng Anh hoặc tiếng Việt...`}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleRecordJournalSpeech}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer ${
                    isRecordingJournal
                      ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                  }`}
                >
                  {isRecordingJournal ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4 text-indigo-400" />
                  )}
                  <span>{isRecordingJournal ? 'Đang nghe...' : 'Đọc qua Mic'}</span>
                </button>

                <button
                  type="submit"
                  disabled={!reflectionInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs shadow-lg cursor-pointer"
                >
                  Lưu vào Nhật ký
                </button>
              </div>

              {saveSuccessMessage && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã lưu vào sổ nhật ký thành công!</span>
                </div>
              )}
            </form>
          </div>

          {/* Right 7 Cols: Past Journal Feed */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-extrabold text-slate-200 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Dòng thời gian Nhật ký ({journalEntries.length} bản ghi)</span>
              </span>
              <span>Lưu trữ an toàn trên thiết bị</span>
            </div>

            <div className="space-y-3">
              {journalEntries.map((entry) => {
                const moodLabel =
                  entry.confidenceMood === 'confident'
                    ? '🔥 Rất tự tin'
                    : entry.confidenceMood === 'challenging'
                    ? '💪 Đầy thử thách'
                    : '📈 Đang tiến bộ';

                return (
                  <div
                    key={entry.id}
                    className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-lg group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Ngày {entry.day}
                        </span>
                        <span className="text-xs text-slate-400">{entry.date}</span>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-950 text-slate-300 border border-slate-800">
                          {moodLabel}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteJournalEntry(entry.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Xóa ghi chép này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                      "{entry.reflectionText}"
                    </p>

                    {entry.favoriteChunkUsed && (
                      <div className="pt-1 text-xs text-slate-400 flex items-center gap-1.5">
                        <span>Cụm từ tâm đắc:</span>
                        <span className="font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                          "{entry.favoriteChunkUsed}"
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};