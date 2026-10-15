import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Mic,
  MicOff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
  Languages,
  RotateCcw,
  Volume1,
  Activity,
  Layers,
  Lightbulb,
} from 'lucide-react';
import { DayLesson, LexicalChunk } from '../data/curriculum';
import { audioEngine, SpeechRecognizer } from '../utils/audio';
import {
  scorePronunciationRealtime,
  RealtimePronunciationResult,
} from '../utils/pronunciationScorer';

interface ModuleWarmupProps {
  lesson: DayLesson;
  onProceedToRoleplay: () => void;
  voiceName: string;
}

export const ModuleWarmup: React.FC<ModuleWarmupProps> = ({
  lesson,
  onProceedToRoleplay,
  voiceName,
}) => {
  const [selectedChunkIndex, setSelectedChunkIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1.0 | 0.8>(1.0);
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [selectedWordToken, setSelectedWordToken] = useState<{ word: string; meaning: string } | null>(null);

  // Spoken history and feedback per chunk
  const [chunkFeedback, setChunkFeedback] = useState<{
    [phrase: string]: {
      userSpoken: string;
      overallScore: number;
      tonePaceScore: number;
      articulationScore: number;
      feedbackNote: string;
    };
  }>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const recognizerRef = useRef<SpeechRecognizer | null>(null);

  const currentChunk: LexicalChunk = lesson.chunks[selectedChunkIndex] || lesson.chunks[0];
  const totalChunks = lesson.chunks.length;

  // Reset live transcript when chunk changes
  useEffect(() => {
    setLiveTranscript('');
    setSelectedWordToken(null);
  }, [selectedChunkIndex]);



  // Audio model playback
  const handlePlayModelAudio = (rate: number = playbackSpeed) => {
    if (!currentChunk || isPlayingAudio) return;
    setIsPlayingAudio(true);
    audioEngine.speakText(`${currentChunk.phrase}. ${currentChunk.example}`, {
      voiceName,
      rate,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  // Voice Interaction Hub: Toggle or Hold-to-speak with instant real-time scoring
  const startRecording = () => {
    if (isListening) return;
    setLiveTranscript('');
    audioEngine.playDing('click');

    const recognizer = new SpeechRecognizer(
      async (transcript, isFinal) => {
        setLiveTranscript(transcript);

        // Instant phonological evaluation computed in client memory (< 15ms)
        const instantScore = scorePronunciationRealtime(
          currentChunk.example,
          transcript,
          currentChunk.collocationTip || ''
        );

        if (isFinal) {
          setIsListening(false);
          recognizer.stop();
          recognizerRef.current = null;

          // 1. Instantly display accurate pronunciation and rhythm score (Zero lag!)
          setChunkFeedback((prev) => ({
            ...prev,
            [currentChunk.phrase]: {
              userSpoken: transcript,
              overallScore: instantScore.overallScore,
              tonePaceScore: instantScore.toneRhythmScore,
              articulationScore: instantScore.articulationScore,
              feedbackNote:
                instantScore.overallScore >= 80
                  ? 'Phát âm chuẩn xác! Khớp nhịp tự nhiên theo chuẩn B1.'
                  : 'Đã nhận diện đủ câu. Hãy chú ý nối âm và bật rõ phụ âm cuối.',
            },
          }));

          if (instantScore.overallScore >= 75) {
            audioEngine.playDing('success');
          }

          // 2. Asynchronously enrich feedback with AI notes in background without blocking
          setIsAnalyzing(true);
          try {
            const res = await fetch('/api/evaluate-speech', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                spokenText: transcript,
                referenceText: `${currentChunk.phrase}. ${currentChunk.example}`,
                context: `Practicing Lexical Chunk: ${currentChunk.phrase}`,
              }),
            });

            if (res.ok) {
              const data = await res.json();
              if (data.mentorCheerVi) {
                setChunkFeedback((prev) => {
                  const existing = prev[currentChunk.phrase];
                  if (!existing) return prev;
                  return {
                    ...prev,
                    [currentChunk.phrase]: {
                      ...existing,
                      feedbackNote: data.mentorCheerVi,
                    },
                  };
                });
              }
            }
          } catch {
            // Background enrichment failed silently; instant score is already shown
          } finally {
            setIsAnalyzing(false);
          }
        }
      },
      () => setIsListening(false),
      (listening) => setIsListening(listening),
      true // Continuous recognition enabled: pauses between words won't cut off speech!
    );

    if (recognizer.isSupported()) {
      recognizerRef.current = recognizer;
      setIsListening(true);
      recognizer.start();
    } else {
      alert('Vui lòng bật quyền Microphone trong trình duyệt để sử dụng tính năng nói.');
    }
  };

  const stopRecording = () => {
    if (recognizerRef.current) {
      // Instantly submit and evaluate whatever the user has spoken so far
      recognizerRef.current.forceSubmit();
      recognizerRef.current = null;
    }
    setIsListening(false);
  };

  const currentResult = chunkFeedback[currentChunk.phrase];

  // Tokenize example sentence for clickable word translation affordance
  const exampleWords = currentChunk.example.split(' ');

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-8">
      {/* Top Breadcrumb & Clean Chunk Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#161F30]/70 border border-[#26354D] rounded-2xl px-5 py-3.5 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
              Module 1 • Khởi động Mẫu câu
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-xs text-slate-300 font-medium">
            Mục tiêu: Nhận diện & phát âm cụm từ then chốt
          </span>
        </div>

        {/* Chunk Selector Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {lesson.chunks.map((c, idx) => {
            const isSelected = idx === selectedChunkIndex;
            const hasPracticed = !!chunkFeedback[c.phrase];

            return (
              <button
                key={idx}
                onClick={() => setSelectedChunkIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400'
                    : hasPracticed
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                    : 'bg-[#0B0F19] text-slate-400 border border-[#26354D] hover:text-white hover:bg-[#1E2B42]'
                }`}
              >
                <span>Cụm {idx + 1}</span>
                {hasPracticed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE DYNAMIC WORKSPACE (The Focused Learning Arena) */}
      <div className="bg-[#161F30] border border-[#26354D] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header & Controls */}
        <div className="flex items-center justify-between border-b border-[#26354D]/80 pb-5 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/20">
              Chunk {selectedChunkIndex + 1} of {totalChunks}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Collocation phản xạ tự nhiên
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Speed Selector */}
            <div className="flex items-center bg-[#0B0F19] rounded-xl border border-[#26354D] p-1 text-xs">
              <button
                onClick={() => setPlaybackSpeed(1.0)}
                className={`px-2.5 py-1 rounded-lg font-mono font-semibold transition-colors cursor-pointer ${
                  playbackSpeed === 1.0 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                1.0x
              </button>
              <button
                onClick={() => setPlaybackSpeed(0.8)}
                className={`px-2.5 py-1 rounded-lg font-mono font-semibold transition-colors cursor-pointer ${
                  playbackSpeed === 0.8 ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                0.8x Chậm
              </button>
            </div>

            {/* Subtitle Toggle */}
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                showSubtitles
                  ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                  : 'bg-[#0B0F19] text-slate-400 border-[#26354D]'
              }`}
              title="Bật/Tắt dịch nghĩa tiếng Việt"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{showSubtitles ? 'Dịch: BẬT' : 'Dịch: TẮT'}</span>
            </button>
          </div>
        </div>

        {/* ACTIVE LEARNING ARENA: Target Phrase & High Contrast Phonetics */}
        <div className="space-y-6 text-center sm:text-left">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                "{currentChunk.phrase}"
              </h1>
              {/* Play Native Audio Button */}
              <button
                onClick={() => handlePlayModelAudio(playbackSpeed)}
                disabled={isPlayingAudio}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer shadow-md ${
                  isPlayingAudio
                    ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse ring-4 ring-indigo-500/30'
                    : 'bg-[#1E2B42] hover:bg-indigo-600 text-indigo-300 hover:text-white border-[#26354D] hover:border-indigo-400'
                }`}
                title="Nghe phát âm chuẩn bản xứ"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Phonetic Transcription (IPA) */}
            {currentChunk.ipa && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm sm:text-base text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-0.5 rounded-lg font-medium">
                  {currentChunk.ipa}
                </span>
                <span className="text-xs text-slate-400">IPA chuẩn quốc tế</span>
              </div>
            )}
          </div>

          {/* Meaning & Usage Pill */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{currentChunk.meaningVi}</span>
            </div>

            {currentChunk.collocationTip && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{currentChunk.collocationTip}</span>
              </div>
            )}
          </div>

          {/* Context Sentence with Word-level Interactive Affordance */}
          <div className="bg-[#0B0F19]/90 border border-[#26354D] rounded-2xl p-5 space-y-3 relative group">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-[#26354D]/60 pb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Ngữ cảnh thực tế (Nhấp vào từ để xem gợi ý):
              </span>
              <button
                onClick={() => handlePlayModelAudio(1.0)}
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Volume1 className="w-3.5 h-3.5" />
                <span>Nghe cả câu</span>
              </button>
            </div>

            {/* Clickable Word Tokens */}
            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
              "{exampleWords.map((word, wIdx) => {
                const clean = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
                const isTarget = currentChunk.phrase.toLowerCase().includes(clean) && clean.length > 2;

                return (
                  <span
                    key={wIdx}
                    onClick={() =>
                      setSelectedWordToken({
                        word,
                        meaning: isTarget ? currentChunk.meaningVi : 'Từ vựng trong ngữ cảnh câu',
                      })
                    }
                    className={`inline-block mr-1.5 px-1 py-0.5 rounded cursor-pointer transition-colors ${
                      isTarget
                        ? 'text-indigo-300 font-bold bg-indigo-500/15 border-b-2 border-indigo-400 hover:bg-indigo-500/30'
                        : 'hover:text-white hover:bg-[#1E2B42]'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}"
            </p>

            {/* Vietnamese Translation Toggle */}
            {showSubtitles && (
              <p className="text-sm text-slate-400 italic pt-1 border-t border-[#26354D]/40">
                "{currentChunk.exampleVi}"
              </p>
            )}

            {/* Active word popup chip */}
            {selectedWordToken && (
              <div className="mt-2 text-xs bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 px-3 py-1.5 rounded-lg flex items-center justify-between animate-fadeIn">
                <span>
                  Từ chọn: <strong>{selectedWordToken.word}</strong> — {selectedWordToken.meaning}
                </span>
                <button
                  onClick={() => setSelectedWordToken(null)}
                  className="text-slate-400 hover:text-white font-mono text-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CENTRAL VOICE INTERACTION HUB (The Hero Component) */}
        <div className="mt-8 pt-8 border-t border-[#26354D]/80">
          <div className="bg-gradient-to-b from-[#1E2B42]/80 to-[#0B0F19] border border-[#26354D] rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
            {/* Status Pill */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isListening
                    ? 'bg-rose-500 animate-ping'
                    : isAnalyzing
                    ? 'bg-amber-400 animate-spin'
                    : 'bg-emerald-400'
                }`}
              />
              <span className="text-xs font-bold tracking-wider uppercase font-mono text-slate-300">
                {isListening
                  ? 'Đang lắng nghe giọng bạn...'
                  : isAnalyzing
                  ? 'Đang chấm điểm phát âm...'
                  : 'Trung tâm Luyện Giọng (Voice Interaction Hub)'}
              </span>
            </div>

            {/* Dynamic Animated Audio Waveform */}
            <div className="h-12 flex items-center justify-center gap-1.5 mb-6 px-4 w-full max-w-xs">
              {[12, 28, 45, 20, 36, 48, 22, 40, 16, 32, 44, 18].map((baseHeight, bIdx) => {
                const isActive = isListening || isPlayingAudio;
                const animatedHeight = isActive
                  ? Math.max(10, (baseHeight * (1 + (bIdx % 3) * 0.4)) % 44)
                  : 8;

                return (
                  <span
                    key={bIdx}
                    style={{ height: `${animatedHeight}px` }}
                    className={`w-1.5 rounded-full transition-all duration-150 ${
                      isListening
                        ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                        : isPlayingAudio
                        ? 'bg-indigo-400 shadow-[0_0_8px_#818cf8]'
                        : 'bg-slate-700'
                    }`}
                  />
                );
              })}
            </div>

            {/* Bold Tactile Voice Action Controller */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Push-to-Talk / Tap-to-Speak Hero Button */}
              <button
                type="button"
                onClick={isListening ? stopRecording : startRecording}
                className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base tracking-wide transition-all duration-300 select-none cursor-pointer shadow-2xl active:scale-95 ${
                  isListening
                    ? 'bg-rose-600 text-white shadow-rose-900/60 ring-4 ring-rose-500/40 animate-pulse'
                    : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:ring-2 hover:ring-indigo-400'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5 text-white animate-bounce" />
                    <span>Dừng & Nộp bài nói</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <span>Nhấn để Luyện Nói Cụm Này</span>
                  </>
                )}

                {/* Tactile Inner Border Glow */}
                <span className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />
              </button>

              {/* Native Voice Model Reference Button */}
              <button
                type="button"
                onClick={() => handlePlayModelAudio(playbackSpeed)}
                disabled={isPlayingAudio}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#161F30] hover:bg-[#1E2B42] text-slate-200 border border-[#26354D] text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md hover:border-indigo-500/50"
              >
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span>Nghe giọng mẫu ({playbackSpeed}x)</span>
              </button>
            </div>

            {/* Instant Speech Recognition Live Transcript Preview */}
            <div className="mt-5 w-full max-w-xl">
              {isListening ? (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-medium animate-fadeIn">
                  <span className="text-rose-400 font-mono font-bold mr-2">LIVE:</span>
                  {liveTranscript ? `"${liveTranscript}"` : 'Đang lắng nghe... Hãy nói to và tự tin!'}
                </div>
              ) : currentResult ? (
                <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#26354D] text-xs sm:text-sm text-slate-300">
                  <span className="text-slate-500 font-mono mr-2">Bạn vừa nói:</span>
                  <strong className="text-indigo-300 font-medium italic">
                    "{currentResult.userSpoken}"
                  </strong>
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Phản xạ tự nhiên: Nói cả câu mẫu để rèn ngữ điệu và phát âm chuẩn xác.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* INSTANT FEEDBACK DRAWER (Pronunciation Accuracy & Suggested Prime Responses) */}
        {currentResult && (
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#161F30] to-emerald-950/30 border border-emerald-500/40 shadow-xl space-y-3 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono">
                  {currentResult.overallScore}%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Chấm điểm Phản xạ & Phát âm</h4>
                  <p className="text-xs text-emerald-300 font-medium">{currentResult.feedbackNote}</p>
                </div>
              </div>

              {/* Sub-metrics */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-[#0B0F19] border border-[#26354D] text-slate-300">
                  Ngữ điệu: <strong className="text-emerald-400">{currentResult.tonePaceScore}%</strong>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0B0F19] border border-[#26354D] text-slate-300">
                  Bật âm: <strong className="text-cyan-400">{currentResult.articulationScore}%</strong>
                </span>
              </div>
            </div>

            {/* Quick-Action Response Suggestions (A2 vs B1 chips) */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400 font-bold block">
                Mẹo nạp phản xạ vào Module Role-play:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#0B0F19]/90 border border-[#26354D]">
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-800 text-slate-300 font-mono mr-1.5">
                    Level A2
                  </span>
                  <span className="text-slate-300">"I tried to do something new today."</span>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 font-mono mr-1.5">
                    Level B1+
                  </span>
                  <span className="text-indigo-200 font-medium">
                    "I really decided to <strong>{currentChunk.phrase}</strong> today."
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM STEPPER & NEXT ACTION BAR */}
        <div className="mt-8 pt-6 border-t border-[#26354D]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Chunk Prev/Next Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedChunkIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedChunkIndex === 0}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#0B0F19] hover:bg-[#1E2B42] disabled:opacity-40 text-slate-300 border border-[#26354D] text-xs font-medium transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Cụm trước</span>
            </button>

            <button
              onClick={() => setSelectedChunkIndex((prev) => Math.min(totalChunks - 1, prev + 1))}
              disabled={selectedChunkIndex === totalChunks - 1}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#0B0F19] hover:bg-[#1E2B42] disabled:opacity-40 text-slate-300 border border-[#26354D] text-xs font-medium transition-colors cursor-pointer"
            >
              <span>Cụm kế tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Call to Action (Next Step) */}
          <button
            onClick={onProceedToRoleplay}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-200 cursor-pointer active:scale-95 group"
          >
            <span>Tiếp tục: Sang Nhập vai 1-on-1 (25m)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
