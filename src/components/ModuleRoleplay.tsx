import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Languages,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { DayLesson } from '../data/curriculum';
import { ChatMessage, SuggestedResponse } from '../types';
import { audioEngine, SpeechRecognizer } from '../utils/audio';
import { analyzeGrammarText } from '../utils/grammarAnalysis';

interface ModuleRoleplayProps {
  lesson: DayLesson;
  messages: ChatMessage[];
  onSendMessage: (userText: string) => Promise<void>;
  isAiGenerating: boolean;
  onProceedToShadowing: () => void;
  voiceName: string;
  autoPlayAudio: boolean;
}

export const ModuleRoleplay: React.FC<ModuleRoleplayProps> = ({
  lesson,
  messages,
  onSendMessage,
  isAiGenerating,
  onProceedToShadowing,
  voiceName,
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [autoSendOnRelease, setAutoSendOnRelease] = useState(true);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [showTranslations, setShowTranslations] = useState(true);
  const [showGrammarInsight, setShowGrammarInsight] = useState(true);
  const [expandedBreakdownId, setExpandedBreakdownId] = useState<string | null>(null);
  const [activeTooltipText, setActiveTooltipText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognizerRef = useRef<SpeechRecognizer | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const liveTranscriptRef = useRef('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isHoldingKeyRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiGenerating]);

  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  useEffect(() => {
    liveTranscriptRef.current = liveTranscript;
  }, [liveTranscript]);

  const startRecording = useCallback(() => {
    if (isRecording || isAiGenerating) return;
    setLiveTranscript('');
    liveTranscriptRef.current = '';

    const recognizer = new SpeechRecognizer(
      (transcript) => {
        setLiveTranscript(transcript);
        setInputText(transcript);
      },
      () => setIsRecording(false),
      (listening) => setIsRecording(listening),
      true
    );

    if (recognizer.isSupported()) {
      recognizerRef.current = recognizer;
      audioEngine.playDing('click');
      recognizer.start();
    } else {
      alert('Trình duyệt chưa hỗ trợ thu âm trực tiếp. Bạn có thể nhập câu trả lời bằng bàn phím.');
    }
  }, [isRecording, isAiGenerating]);

  const stopRecording = useCallback(async () => {
    if (!isRecording) return;
    if (recognizerRef.current) {
      recognizerRef.current.stop();
      recognizerRef.current = null;
    }
    setIsRecording(false);

    setTimeout(async () => {
      const captured = liveTranscriptRef.current.trim();
      if (captured) {
        if (autoSendOnRelease) {
          setInputText('');
          setLiveTranscript('');
          await onSendMessage(captured);
        } else {
          setInputText(captured);
        }
      }
    }, 220);
  }, [isRecording, autoSendOnRelease, onSendMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && document.activeElement !== inputRef.current) {
        if (!isHoldingKeyRef.current && !isAiGenerating) {
          e.preventDefault();
          isHoldingKeyRef.current = true;
          startRecording();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isHoldingKeyRef.current) {
        e.preventDefault();
        isHoldingKeyRef.current = false;
        stopRecording();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [startRecording, stopRecording, isAiGenerating]);

  const handlePlayMessageAudio = (msg: ChatMessage) => {
    if (activeAudioId === msg.id) {
      audioEngine.stopAudio();
      setActiveAudioId(null);
      return;
    }
    setActiveAudioId(msg.id);
    audioEngine.speakText(msg.content, {
      voiceName,
      onEnd: () => setActiveAudioId(null),
      onError: () => setActiveAudioId(null),
    });
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text || isAiGenerating) return;
    setInputText('');
    setLiveTranscript('');
    await onSendMessage(text);
  };

  const handleSelectSuggestion = (suggestion: SuggestedResponse) => {
    setInputText(suggestion.text);
    inputRef.current?.focus();
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const latestAiMessage = [...messages].reverse().find((m) => m.role === 'assistant');
  const suggestions = latestAiMessage?.suggestions || [
    { level: 'A2', text: lesson.initialAiGreeting.suggestedA2, vietnamese: 'Trả lời đơn giản, trực tiếp' },
    { level: 'B1', text: lesson.initialAiGreeting.suggestedB1, vietnamese: 'Trả lời tự nhiên với cụm từ B1' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 animate-fadeIn">
      {/* Top Scenario & Controls Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold font-mono border border-indigo-500/30">
              BƯỚC 2 • NHẬP VAI PHẢN XẠ 1-ON-1
            </span>
            <span className="text-xs text-slate-300">
              Vai của AI: <strong className="text-white">{lesson.aiPersonaRole}</strong>
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-white">
            Tình huống: {lesson.titleVi}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-emerald-300">Mục tiêu:</strong> {lesson.roleplayGoal}
            </span>
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2 shrink-0">
          <button
            onClick={() => setShowGrammarInsight(!showGrammarInsight)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              showGrammarInsight
                ? 'bg-purple-600/20 text-purple-200 border-purple-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span>Soi ngữ pháp: {showGrammarInsight ? 'BẬT' : 'TẮT'}</span>
          </button>

          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              showTranslations
                ? 'bg-indigo-600/20 text-indigo-200 border-indigo-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Languages className="w-4 h-4 text-indigo-400" />
            <span>Dịch song ngữ: {showTranslations ? 'BẬT' : 'TẮT'}</span>
          </button>

          <button
            onClick={onProceedToShadowing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <span>Sang Bước 3: Nhại giọng</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2-COLUMN SPLIT: Left = Conversation Arena (8 cols) | Right = Teleprompter & Target Chunks (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* LEFT: Chat Arena */}
        <div className="lg:col-span-8 bg-slate-950/85 border border-slate-800 rounded-3xl flex flex-col h-[600px] shadow-2xl overflow-hidden">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              const isPlaying = activeAudioId === msg.id;
              const grammarAnalysis =
                !isUser && showGrammarInsight
                  ? analyzeGrammarText(
                      msg.content,
                      lesson.chunks.map((c) => c.phrase)
                    )
                  : null;
              const isBreakdownExpanded = expandedBreakdownId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isUser ? 'items-end' : 'items-start'
                  } space-y-1.5 animate-fadeIn`}
                >
                  <div className="flex items-center gap-2 text-xs text-slate-400 px-1 font-medium">
                    <span>{isUser ? 'Bạn' : lesson.aiPersonaRole}</span>
                    {!isUser && (
                      <button
                        onClick={() => handlePlayMessageAudio(msg)}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ${
                          isPlaying
                            ? 'text-indigo-400 bg-indigo-500/10 animate-pulse'
                            : 'hover:text-white hover:bg-slate-800'
                        }`}
                        title="Nghe lại câu thoại này"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Bubble with larger, comfortable 15px-16px font for 30-40yo eyes */}
                  <div
                    className={`max-w-[90%] sm:max-w-[84%] rounded-2xl p-4 sm:p-5 text-[15px] sm:text-base leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20 rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-100 shadow-lg rounded-tl-none'
                    }`}
                  >
                    {isUser || !showGrammarInsight || !grammarAnalysis ? (
                      <p className="font-medium whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="font-medium whitespace-pre-wrap leading-relaxed">
                        {grammarAnalysis.segments.map((seg, sIdx) => {
                          if (!seg.match) return <span key={sIdx}>{seg.text}</span>;
                          const { annotation } = seg.match;
                          const isTooltipActive = activeTooltipText === `${msg.id}-${sIdx}`;

                          return (
                            <span
                              key={sIdx}
                              onClick={() =>
                                setActiveTooltipText(isTooltipActive ? null : `${msg.id}-${sIdx}`)
                              }
                              className={`inline-block mx-0.5 px-1.5 py-0.5 rounded-lg border transition-all cursor-pointer relative group ${annotation.colorClass.bg} ${annotation.colorClass.border} ${annotation.colorClass.text}`}
                            >
                              <span className="font-semibold underline decoration-dotted underline-offset-4">
                                {seg.text}
                              </span>
                              <span
                                className={`ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-bold tracking-wider inline-block align-middle ${annotation.colorClass.badgeBg}`}
                              >
                                {annotation.label}
                              </span>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Vietnamese Subtitle */}
                    {!isUser && showTranslations && msg.vietnameseTranslation && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800 text-sm text-slate-300 italic">
                        "{msg.vietnameseTranslation}"
                      </div>
                    )}

                    {/* Grammar Breakdown Accordion */}
                    {!isUser &&
                      showGrammarInsight &&
                      grammarAnalysis &&
                      grammarAnalysis.foundAnnotations.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedBreakdownId(isBreakdownExpanded ? null : msg.id)
                            }
                            className="flex items-center justify-between w-full text-xs text-purple-300 hover:text-purple-200 font-semibold cursor-pointer"
                          >
                            <span className="flex items-center gap-1.5">
                              <GraduationCap className="w-4 h-4 text-purple-400" />
                              <span>
                                Giải thích Cấu trúc ({grammarAnalysis.foundAnnotations.length} điểm)
                              </span>
                            </span>
                            {isBreakdownExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>

                          {isBreakdownExpanded && (
                            <div className="mt-2.5 space-y-2 bg-slate-950/90 p-3 rounded-xl border border-slate-800 text-xs">
                              {grammarAnalysis.foundAnnotations.map((item, aIdx) => (
                                <div key={aIdx} className="flex items-start gap-2">
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 mt-0.5 ${item.annotation.colorClass.badgeBg}`}
                                  >
                                    {item.annotation.label}
                                  </span>
                                  <div>
                                    <span className="font-bold text-white">"{item.matchText}":</span>{' '}
                                    <span className="text-slate-300">{item.explanation}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                  </div>

                  {/* Recast Note (Gentle Error Correction) */}
                  {msg.recastNote && (
                    <div className="max-w-[90%] sm:max-w-[84%] bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 text-xs sm:text-sm text-amber-200 flex items-start gap-2.5 shadow-sm">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300">Gợi ý nâng cấp diễn đạt (B1+): </strong>
                        {msg.recastNote}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {isAiGenerating && (
              <div className="flex items-start gap-2 animate-pulse">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs sm:text-sm text-indigo-300 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span>Giáo sư AI đang lắng nghe và phản hồi...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Live Recording Banner */}
          {isRecording && (
            <div className="bg-rose-950/90 border-t border-rose-500/40 px-4 py-2.5 flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 bg-rose-600/30 border border-rose-500/40 px-2.5 py-1 rounded-full text-rose-200 text-xs font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  REC {formatTimer(recordingSeconds)}
                </span>
                <span className="text-xs sm:text-sm text-white font-medium truncate max-w-md">
                  {liveTranscript ? `"${liveTranscript}"` : 'Đang lắng nghe... Hãy nhìn sang khung Gợi ý bên phải nếu bạn bí từ!'}
                </span>
              </div>
              <button
                type="button"
                onClick={stopRecording}
                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
              >
                Gửi ngay
              </button>
            </div>
          )}

          {/* Bottom Voice & Text Input Bar */}
          <div className="p-3.5 bg-slate-900 border-t border-slate-800">
            <form onSubmit={handleSend} className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => (isRecording ? stopRecording() : startRecording())}
                className={`px-4 py-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                  isRecording
                    ? 'bg-rose-600 text-white border-rose-400 ring-4 ring-rose-500/30'
                    : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white border-indigo-400/30 shadow-md'
                }`}
                title="Bấm để nói hoặc giữ phím Space"
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4 animate-bounce" />
                    <span>Dừng & Gửi</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>Bấm để Nói</span>
                  </>
                )}
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isRecording
                    ? 'Đang thu âm trực tiếp từ Micro...'
                    : 'Nhập câu trả lời hoặc bấm nút "Bấm để Nói" (hoặc giữ phím Space)...'
                }
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isAiGenerating}
                className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all cursor-pointer shrink-0"
                title="Gửi tin nhắn"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-2">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mẹo: Bấm nút Mic hoặc nhấn giữ phím dài (Space) để nói rảnh tay.</span>
              </span>
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-200">
                <input
                  type="checkbox"
                  checked={autoSendOnRelease}
                  onChange={(e) => setAutoSendOnRelease(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600"
                />
                <span>Tự động gửi sau khi nói xong</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT: Anti-Freeze Teleprompter & Target Chunks Sidebar (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Teleprompter Suggested Responses */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Gợi ý Phản xạ (Chống bí từ)</span>
              </div>
              <span className="text-[11px] text-slate-400">Chạm để điền hoặc đọc theo</span>
            </div>

            <div className="space-y-3">
              {suggestions.map((sug, idx) => {
                const isB1 = sug.level === 'B1';
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(sug)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      isB1
                        ? 'bg-indigo-950/40 border-indigo-500/40 hover:border-indigo-400'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-bold font-mono ${
                          isB1
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isB1 ? 'Mức B1+ (Tự nhiên, Chuyên nghiệp)' : 'Mức A2 (Ngắn gọn, An toàn)'}
                      </span>
                      <span className="text-[11px] text-indigo-400 font-semibold">Chọn câu →</span>
                    </div>
                    <p className="text-sm sm:text-[15px] font-bold text-white leading-snug">
                      "{sug.text}"
                    </p>
                    <p className="text-xs text-slate-400 italic">"{sug.vietnamese}"</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Chunks Checklist for Today */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl flex-1">
            <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 border-b border-slate-800 pb-2.5 flex items-center justify-between">
              <span>Cụm từ mục tiêu cần dùng</span>
              <span className="font-mono text-[11px] text-slate-400">
                {lesson.chunks.length} cụm
              </span>
            </div>

            <div className="space-y-2.5">
              {lesson.chunks.map((c, idx) => {
                const usedInChat = messages.some(
                  (m) =>
                    m.role === 'user' &&
                    m.content.toLowerCase().includes(c.phrase.toLowerCase().split(' ')[0])
                );
                return (
                  <div
                    key={idx}
                    onClick={() => setInputText((prev) => `${prev} ${c.phrase}`.trim())}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      usedInChat
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-950/80 border-slate-800 hover:border-indigo-500/40 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm text-white">
                      <span>"{c.phrase}"</span>
                      {usedInChat && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="text-slate-400 mt-0.5">{c.meaningVi}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};