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
  CheckCircle2,
  Languages,
  Radio,
  AudioWaveform,
  GraduationCap,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { DayLesson } from '../data/curriculum';
import { ChatMessage, SuggestedResponse } from '../types';
import { audioEngine, SpeechRecognizer } from '../utils/audio';
import { analyzeGrammarText, GRAMMAR_TYPES } from '../utils/grammarAnalysis';

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
  autoPlayAudio,
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

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiGenerating]);

  // Recording duration timer
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isRecording]);

  // Keep ref in sync
  useEffect(() => {
    liveTranscriptRef.current = liveTranscript;
  }, [liveTranscript]);

  // Start Push-to-Talk Speech Recognition
  const startRecording = useCallback(() => {
    if (isRecording || isAiGenerating) return;

    setLiveTranscript('');
    liveTranscriptRef.current = '';

    const recognizer = new SpeechRecognizer(
      (transcript) => {
        setLiveTranscript(transcript);
        setInputText(transcript);
      },
      (error) => {
        console.warn('Speech recognition error:', error);
        setIsRecording(false);
      },
      (listening) => {
        setIsRecording(listening);
      },
      true // Continuous
    );

    if (recognizer.isSupported()) {
      recognizerRef.current = recognizer;
      audioEngine.playDing('click');
      recognizer.start();
    } else {
      alert('Trình duyệt của bạn không hỗ trợ Web Speech API. Bạn có thể nhập tin nhắn bằng bàn phím!');
    }
  }, [isRecording, isAiGenerating]);

  // Stop Push-to-Talk Speech Recognition and optionally send
  const stopRecording = useCallback(async () => {
    if (!isRecording) return;

    if (recognizerRef.current) {
      recognizerRef.current.stop();
      recognizerRef.current = null;
    }
    setIsRecording(false);

    // Wait a brief moment for final recognition buffer
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
    }, 200);
  }, [isRecording, autoSendOnRelease, onSendMessage]);

  // Keyboard shortcut: Spacebar for Push-to-Talk (when not typing in the text input)
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

  // Play audio for a specific message
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
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Get latest AI message suggestions
  const latestAiMessage = [...messages].reverse().find((m) => m.role === 'assistant');
  const suggestions = latestAiMessage?.suggestions || [
    { level: 'A2', text: lesson.initialAiGreeting.suggestedA2, vietnamese: 'Cách trả lời đơn giản A2' },
    { level: 'B1', text: lesson.initialAiGreeting.suggestedB1, vietnamese: 'Cách trả lời tự nhiên B1' },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Roleplay Context Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-semibold font-mono border border-indigo-500/30">
                MODULE 2 • 25 PHÚT
              </span>
              <span className="text-xs text-slate-400">
                AI Role: <span className="text-white font-medium">{lesson.aiPersonaRole}</span>
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Tình huống: {lesson.titleVi}
            </h3>
            <p className="text-xs text-slate-300">
              <strong className="text-indigo-300">Nhiệm vụ của bạn:</strong> {lesson.roleplayGoal}
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2 shrink-0">
            {/* Grammar Insight Toggle Button */}
            <button
              onClick={() => setShowGrammarInsight(!showGrammarInsight)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                showGrammarInsight
                  ? 'bg-purple-600/25 text-purple-200 border-purple-500/50 ring-1 ring-purple-500/30 shadow-sm'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-700'
              }`}
              title="Bật/Tắt chế độ soi cấu trúc ngữ pháp (Grammar Insight)"
            >
              <GraduationCap className={`w-3.5 h-3.5 ${showGrammarInsight ? 'text-purple-300' : 'text-slate-400'}`} />
              <span>Grammar Insight: {showGrammarInsight ? 'BẬT' : 'TẮT'}</span>
            </button>

            {/* Bilingual Toggle Button */}
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                showTranslations
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title="Bật/Tắt hiển thị bản dịch tiếng Việt"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{showTranslations ? 'Song ngữ: BẬT' : 'Song ngữ: TẮT'}</span>
            </button>

            {/* Next Module Button */}
            <button
              onClick={onProceedToShadowing}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <span>Sang Nghe & Nhại (15m)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grammar Insight Color-Coded Legend Bar (Active when showGrammarInsight is true) */}
      {showGrammarInsight && (
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl px-4 py-2.5 shadow-md animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-purple-300 font-bold">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Bản đồ Cấu trúc Ngữ pháp (Grammar Insight Legend):</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-medium text-[11px]">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                Thì & Trợ động từ
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Liên từ & Dẫn dắt
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Cụm từ Cố định (Chunks)
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                Mẫu Câu hỏi Mở
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Flow Area */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col h-[520px] shadow-2xl relative overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isPlaying = activeAudioId === msg.id;

            // Analyze grammar for AI messages if Grammar Insight is enabled
            const grammarAnalysis =
              !isUser && showGrammarInsight
                ? analyzeGrammarText(msg.content, lesson.chunks.map((c) => c.phrase))
                : null;

            const isBreakdownExpanded = expandedBreakdownId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5 animate-fadeIn`}
              >
                {/* Message Header */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1">
                  <span>{isUser ? 'Bạn (Learner A2→B1)' : lesson.aiPersonaRole}</span>
                  {!isUser && (
                    <button
                      onClick={() => handlePlayMessageAudio(msg)}
                      className={`p-1 rounded transition-colors ${
                        isPlaying ? 'text-indigo-400 animate-pulse' : 'hover:text-white'
                      }`}
                      title="Nghe giọng đọc của Giáo sư"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/20 rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-100 shadow-md rounded-tl-none'
                  }`}
                >
                  {/* Message Content: Regular or with Grammar Insight Overlays */}
                  {isUser || !showGrammarInsight || !grammarAnalysis ? (
                    <p className="font-medium whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="font-medium whitespace-pre-wrap leading-relaxed">
                      {grammarAnalysis.segments.map((seg, sIdx) => {
                        if (!seg.match) {
                          return <span key={sIdx}>{seg.text}</span>;
                        }

                        const { annotation } = seg.match;
                        const isTooltipActive = activeTooltipText === `${msg.id}-${sIdx}`;

                        return (
                          <span
                            key={sIdx}
                            onClick={() =>
                              setActiveTooltipText(isTooltipActive ? null : `${msg.id}-${sIdx}`)
                            }
                            className={`inline-block mx-0.5 px-1.5 py-0.5 rounded-lg border transition-all cursor-pointer relative group ${annotation.colorClass.bg} ${annotation.colorClass.border} ${annotation.colorClass.text}`}
                            title={annotation.explanationVi}
                          >
                            <span className="font-semibold underline decoration-dotted underline-offset-2">
                              {seg.text}
                            </span>
                            <span
                              className={`ml-1 text-[9px] font-mono px-1 py-0.1 rounded uppercase font-bold tracking-wider inline-block select-none align-middle ${annotation.colorClass.badgeBg}`}
                            >
                              {annotation.label}
                            </span>

                            {/* Floating Explanation Tooltip on hover or click */}
                            <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-950 text-slate-200 border border-slate-700 rounded-lg shadow-xl text-[11px] font-normal leading-snug z-30 pointer-events-none">
                              <span className="font-bold text-white block mb-0.5">
                                {annotation.labelVi}
                              </span>
                              {annotation.explanationVi}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Vietnamese Translation (Bilingual UI) */}
                  {!isUser && showTranslations && msg.vietnameseTranslation && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-xs text-slate-400 italic">
                      "{msg.vietnameseTranslation}"
                    </div>
                  )}

                  {/* Highlighted Chunks Tag */}
                  {msg.pedagogyHighlights && msg.pedagogyHighlights.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.pedagogyHighlights.map((chunk, ci) => (
                        <span
                          key={ci}
                          className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 text-[10px] font-mono border border-indigo-500/25"
                        >
                          ✨ {chunk}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Grammar Insight Breakdown Drawer for AI Messages */}
                  {!isUser && showGrammarInsight && grammarAnalysis && grammarAnalysis.foundAnnotations.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedBreakdownId(isBreakdownExpanded ? null : msg.id)
                        }
                        className="flex items-center justify-between w-full text-[11px] text-purple-300 hover:text-purple-200 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-1 font-semibold">
                          <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                          <span>
                            Phân tích Ngữ pháp ({grammarAnalysis.foundAnnotations.length} cấu trúc)
                          </span>
                        </span>
                        {isBreakdownExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isBreakdownExpanded && (
                        <div className="mt-2 space-y-1.5 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 text-[11px]">
                          {grammarAnalysis.foundAnnotations.map((item, aIdx) => (
                            <div key={aIdx} className="flex items-start gap-2">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold shrink-0 mt-0.5 ${item.annotation.colorClass.badgeBg}`}
                              >
                                {item.annotation.label}
                              </span>
                              <div className="space-y-0.5">
                                <span className="font-semibold text-slate-200">"{item.matchText}":</span>{' '}
                                <span className="text-slate-400">{item.explanation}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Conversational Recasting Notice (Pedagogical Feedback) */}
                {msg.recastNote && (
                  <div className="max-w-[88%] sm:max-w-[80%] bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 flex items-start gap-2 shadow-sm animate-fadeIn">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-300">
                        Phản hồi Sư phạm (Conversational Recasting):
                      </span>{' '}
                      {msg.recastNote}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isAiGenerating && (
            <div className="flex items-start gap-2 animate-pulse">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs text-indigo-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
                <span>Giáo sư SLA đang lắng nghe và phản hồi phản xạ...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Responses Drawer (Never Freeze - Không Tắc Ý) */}
        {suggestions && suggestions.length > 0 && (
          <div className="bg-slate-900/95 border-t border-slate-800/90 px-4 py-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1 text-indigo-300">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                Gợi ý phản xạ (Suggested Responses) - Bấm để dùng hoặc nói to:
              </span>
              <span className="text-slate-400">Chọn Level phù hợp với bạn</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map((sug, idx) => {
                const isB1 = sug.level === 'B1';
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(sug)}
                    className={`text-left p-2.5 rounded-xl border transition-all text-xs flex flex-col justify-between group cursor-pointer ${
                      isB1
                        ? 'bg-indigo-950/40 border-indigo-500/40 hover:bg-indigo-900/40 hover:border-indigo-400'
                        : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                          isB1
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isB1 ? 'B1 (Tự nhiên / Chunks)' : 'A2 (Đơn giản / Trực tiếp)'}
                      </span>
                      <span className="text-[10px] text-slate-400 group-hover:text-indigo-300 transition-colors">
                        Bấm để nạp câu ✍️
                      </span>
                    </div>
                    <p className="font-medium text-slate-200 line-clamp-2">"{sug.text}"</p>
                    <p className="text-[11px] text-slate-400 italic mt-0.5">"{sug.vietnamese}"</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Small Visual Indicator When Recording is Active */}
        {isRecording && (
          <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border-t border-rose-500/40 px-4 py-2.5 flex items-center justify-between gap-3 animate-fadeIn shadow-lg">
            {/* Left: Animated Recording Indicator & Waveform */}
            <div className="flex items-center gap-3">
              {/* Pulsing Red Dot & REC Label */}
              <div className="flex items-center gap-2 bg-rose-900/40 border border-rose-500/40 px-2.5 py-1 rounded-full text-rose-300 text-xs font-mono font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="tracking-wider">REC</span>
                <span className="text-white ml-1">{formatTimer(recordingSeconds)}</span>
              </div>

              {/* Animated Equalizer Waveform Bars */}
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-rose-400 rounded-full animate-pulse h-2" />
                <span className="w-1 bg-rose-500 rounded-full animate-pulse h-4" />
                <span className="w-1 bg-rose-400 rounded-full animate-pulse h-3" />
                <span className="w-1 bg-rose-500 rounded-full animate-pulse h-4" />
                <span className="w-1 bg-rose-400 rounded-full animate-pulse h-2" />
              </div>

              {/* Real-time Transcription Display */}
              <div className="text-xs text-rose-200 truncate max-w-[200px] sm:max-w-md">
                {liveTranscript ? (
                  <span className="italic font-medium text-white">"{liveTranscript}"</span>
                ) : (
                  <span className="text-rose-300/80">Đang lắng nghe... Hãy nói to bằng tiếng Anh!</span>
                )}
              </div>
            </div>

            {/* Right: Release Instruction & Cancel */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline-block text-[11px] text-rose-300/90 font-medium">
                {autoSendOnRelease ? 'Thả nút / Phím cách để gửi ngay' : 'Thả nút để hoàn tất'}
              </span>
              <button
                type="button"
                onClick={stopRecording}
                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                Xong
              </button>
            </div>
          </div>
        )}

        {/* Input & Push-to-Talk Controls Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            {/* Push-to-Talk Hold Button */}
            <div className="relative shrink-0">
              <button
                type="button"
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onMouseLeave={() => {
                  if (isRecording) stopRecording();
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  startRecording();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  stopRecording();
                }}
                onTouchCancel={(e) => {
                  e.preventDefault();
                  stopRecording();
                }}
                className={`px-3.5 py-3 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all select-none cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white border-rose-400 ring-4 ring-rose-500/40 scale-95 shadow-lg shadow-rose-900/50'
                    : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white border-indigo-500/40 shadow-md shadow-indigo-600/25 active:scale-95'
                }`}
                title="Giữ chuột/chạm hoặc giữ phím Cách (Space) để nói; Thả ra để gửi ngay"
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4 animate-bounce" />
                    <span>Đang nói... (Thả để gửi)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>Push to Talk</span>
                  </>
                )}
              </button>
            </div>

            {/* Text Input */}
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isRecording
                    ? 'Đang lắng nghe trực tiếp từ Micro...'
                    : 'Nhập câu trả lời hoặc giữ nút "Push to Talk" / phím Cách...'
                }
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isAiGenerating}
              className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all shrink-0 cursor-pointer shadow-md shadow-indigo-600/30"
              title="Gửi câu thoại"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {/* SLA Speaking Reminder Notice & Mode Toggles */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-1 pt-2 gap-2">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>
                Mẹo: Giữ nút <strong>Push to Talk</strong> hoặc giữ <strong>phím Cách (Space)</strong> để nói trực tiếp!
              </span>
            </span>

            <div className="flex items-center gap-2">
              <label
                className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-300"
                title="Tự động gửi câu trả lời ngay khi thả nút Push-to-Talk"
              >
                <input
                  type="checkbox"
                  checked={autoSendOnRelease}
                  onChange={(e) => setAutoSendOnRelease(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0 cursor-pointer"
                />
                <span>Tự động gửi khi thả nút</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

