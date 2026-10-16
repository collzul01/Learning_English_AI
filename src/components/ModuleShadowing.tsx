import React, { useState, useEffect, useRef } from 'react';
import {
  Headphones,
  Volume2,
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Volume1,
  Award,
  Activity,
  Layers,
} from 'lucide-react';
import { DayLesson, ShadowingItem } from '../data/curriculum';
import { audioEngine, SpeechRecognizer } from '../utils/audio';
import {
  scorePronunciationRealtime,
  RealtimePronunciationResult,
} from '../utils/pronunciationScorer';

interface ModuleShadowingProps {
  lesson: DayLesson;
  onProceedToDebrief: () => void;
  voiceName: string;
}

export const ModuleShadowing: React.FC<ModuleShadowingProps> = ({
  lesson,
  onProceedToDebrief,
  voiceName,
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.75 | 1.0>(1.0);
  const [userSpokenText, setUserSpokenText] = useState<{ [index: number]: string }>({});
  const [evaluationResults, setEvaluationResults] = useState<{ [index: number]: any }>({});
  const [isEvaluating, setIsEvaluating] = useState(false);

  const [realtimeScore, setRealtimeScore] = useState<RealtimePronunciationResult | null>(null);
  const [liveTranscript, setLiveTranscript] = useState('');

  const recognizerRef = useRef<SpeechRecognizer | null>(null);

  const currentItem: ShadowingItem =
    lesson.shadowingDrills[selectedItemIndex] || lesson.shadowingDrills[0];

  useEffect(() => {
    if (currentItem) {
      setRealtimeScore(scorePronunciationRealtime(currentItem.text, ''));
      setLiveTranscript('');
    }
  }, [selectedItemIndex, currentItem]);

  const handlePlayModelAudio = (rate: number = playbackSpeed) => {
    if (!currentItem) return;
    setIsPlayingAudio(true);
    audioEngine.speakText(currentItem.text, {
      voiceName,
      rate,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
        recognizerRef.current = null;
      }
      setIsRecording(false);
      return;
    }

    setLiveTranscript('');
    audioEngine.playDing('click');

    const recognizer = new SpeechRecognizer(
      async (transcript, isFinal) => {
        setLiveTranscript(transcript);

        const scoreResult = scorePronunciationRealtime(
          currentItem.text,
          transcript,
          currentItem.intonationTip
        );
        setRealtimeScore(scoreResult);

        if (isFinal) {
          setIsRecording(false);
          recognizer.stop();
          recognizerRef.current = null;

          setUserSpokenText((prev) => ({ ...prev, [selectedItemIndex]: transcript }));

          setIsEvaluating(true);
          try {
            const res = await fetch('/api/evaluate-speech', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                spokenText: transcript,
                referenceText: currentItem.text,
                context: `Shadowing drill: ${currentItem.intonationTip}`,
              }),
            });
            if (res.ok) {
              const data = await res.json();
              setEvaluationResults((prev) => ({
                ...prev,
                [selectedItemIndex]: {
                  ...data,
                  realtimeMetrics: scoreResult,
                },
              }));
              if (scoreResult.overallScore >= 75) {
                audioEngine.playDing('success');
              }
            }
          } catch {
            setEvaluationResults((prev) => ({
              ...prev,
              [selectedItemIndex]: {
                fluencyScore: scoreResult.overallScore,
                cefrLevel: scoreResult.overallScore >= 85 ? 'B1+' : 'B1',
                strengths: [
                  'Khớp nhịp điệu và tốc độ câu mẫu tốt',
                  'Phát âm rõ các cụm âm tiết trọng tâm',
                ],
                areasToImprove: ['Thả lỏng khẩu hình ở âm đuôi để nối âm mượt hơn'],
                mentorCheerVi: 'Bạn nhại giọng rất có hồn! Hãy duy trì nhịp điệu tự nhiên này.',
                realtimeMetrics: scoreResult,
              },
            }));
          } finally {
            setIsEvaluating(false);
          }
        }
      },
      () => {
        setIsRecording(false);
        recognizerRef.current = null;
      },
      (listening) => setIsRecording(listening),
      true
    );

    if (recognizer.isSupported()) {
      recognizerRef.current = recognizer;
      recognizer.start();
    } else {
      alert('Vui lòng cấp quyền Microphone trên trình duyệt để sử dụng tính năng nhại giọng.');
    }
  };

  const currentEvaluation = evaluationResults[selectedItemIndex];
  const spokenText = userSpokenText[selectedItemIndex];
  const completedCount = Object.keys(evaluationResults).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn pb-8">
      {/* Top Banner & Sentence Selector */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold font-mono border border-indigo-500/30">
              BƯỚC 3 • LUYỆN NGHE SÂU & NHẠI GIỌNG (SHADOWING)
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/25 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Chấm điểm Âm vị & Ngữ điệu Thời gian thực
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Đồng bộ Ngữ điệu Bản xứ ({completedCount}/{lesson.shadowingDrills.length} câu hoàn thành)
          </h2>
        </div>

        {/* Sentence Selector Pills */}
        <div className="flex items-center flex-wrap gap-2">
          {lesson.shadowingDrills.map((drill, idx) => {
            const isSelected = selectedItemIndex === idx;
            const hasDone = !!evaluationResults[idx];
            return (
              <button
                key={drill.id || idx}
                onClick={() => {
                  if (isRecording) handleToggleRecord();
                  setSelectedItemIndex(idx);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                    : hasDone
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>Câu mẫu {idx + 1}</span>
                {hasDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* EXECUTIVE BENTO 2-COLUMN STUDIO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN (7 Cols): Target Sentence Stage & Phonological Coaching */}
        <div className="lg:col-span-7 bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6">
          <div className="space-y-6">
            {/* Speaker Role & Speed Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <Headphones className="w-4 h-4 text-indigo-400" />
                <span>Giọng mẫu: {currentItem.speakerRole}</span>
              </div>

              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => {
                    setPlaybackSpeed(0.75);
                    handlePlayModelAudio(0.75);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    playbackSpeed === 0.75
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Volume1 className="w-3.5 h-3.5" />
                  <span>0.75x Chậm rõ âm</span>
                </button>
                <button
                  onClick={() => {
                    setPlaybackSpeed(1.0);
                    handlePlayModelAudio(1.0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    playbackSpeed === 1.0
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>1.0x Tự nhiên</span>
                </button>
              </div>
            </div>

            {/* Interactive Karaoke Word-Alignment Stage */}
            <div className="p-6 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-4 shadow-inner">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase tracking-wider text-indigo-400 font-bold">
                   Từng từ sẽ đổi màu xanh khi bạn đọc khớp âm:
                </span>
                <button
                  onClick={() => handlePlayModelAudio(playbackSpeed)}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe mẫu</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 text-2xl sm:text-3xl font-extrabold leading-relaxed py-2">
                {realtimeScore && realtimeScore.wordScores.length > 0 ? (
                  realtimeScore.wordScores.map((ws, wIdx) => {
                    let badgeColor = 'text-slate-200 border-slate-800 bg-slate-900/70';
                    if (ws.status === 'matched') {
                      badgeColor =
                        'text-emerald-300 border-emerald-500/50 bg-emerald-500/20 shadow-sm shadow-emerald-500/20 scale-[1.03]';
                    } else if (ws.status === 'partial') {
                      badgeColor = 'text-amber-300 border-amber-500/50 bg-amber-500/20';
                    }
                    return (
                      <span
                        key={wIdx}
                        className={`px-2.5 py-1 rounded-xl border transition-all inline-block ${badgeColor}`}
                      >
                        {ws.targetWord}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-white">"{currentItem.text}"</span>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-base text-slate-300 italic">
                "{currentItem.translationVi}"
              </div>
            </div>

            {/* Phonological & Intonation Coaching Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/80 border border-indigo-500/25 p-4 rounded-2xl space-y-1.5">
                <div className="text-indigo-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  <span>Ngữ điệu & Trọng âm (Intonation)</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {currentItem.intonationTip}
                </p>
              </div>

              <div className="bg-slate-950/80 border border-emerald-500/25 p-4 rounded-2xl space-y-1.5">
                <div className="text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Nối âm & Nhịp (Connected Speech)</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {currentItem.linkingTip ||
                    'Giữ luồng hơi liền mạch giữa các cụm từ, không đọc ngắt từng chữ rời rạc.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar inside Left Column */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => handlePlayModelAudio(playbackSpeed)}
              className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-sm border transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse'
                  : 'bg-slate-950 text-indigo-200 border-indigo-500/30 hover:bg-slate-800'
              }`}
            >
              <Volume2 className="w-5 h-5 text-indigo-400" />
              <span>{isPlayingAudio ? 'Đang phát giọng mẫu...' : 'Bước 1: Nghe kỹ Giọng mẫu'}</span>
            </button>

            <button
              onClick={handleToggleRecord}
              className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 text-white ring-4 ring-rose-500/30 animate-pulse'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/30'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span>
                {isRecording ? 'Đang thu âm... Bấm để Hoàn tất' : 'Bước 2: Bấm Mic Nhại giọng'}
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Real-Time Telemetry & SLA Evaluation Result */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-5">
          <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl flex-1 flex flex-col justify-between space-y-5">
            {/* Live Phonology Gauges */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isRecording
                        ? 'bg-rose-500 animate-ping'
                        : isEvaluating
                        ? 'bg-amber-400 animate-spin'
                        : 'bg-emerald-400'
                    }`}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300">
                    {isRecording
                      ? 'ĐANG PHÂN TÍCH SÓNG ÂM TRỰC TIẾP'
                      : 'BẢNG ĐO LƯỜNG ÂM VỊ & NGỮ ĐIỆU'}
                  </span>
                </div>
                {realtimeScore && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-extrabold text-xs border border-indigo-500/30">
                    Tổng: {realtimeScore.overallScore}/100
                  </span>
                )}
              </div>

              {/* Dual Meters: Articulation vs Tone */}
              {realtimeScore && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Tròn vành (Articulation)</span>
                      <span className="font-mono font-extrabold text-emerald-400 text-sm">
                        {realtimeScore.articulationScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(6, realtimeScore.articulationScore)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {realtimeScore.articulationFeedback.adviceVi}
                    </p>
                  </div>

                  <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Ngữ điệu (Tone)</span>
                      <span className="font-mono font-extrabold text-indigo-400 text-sm">
                        {realtimeScore.toneRhythmScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(6, realtimeScore.toneRhythmScore)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {realtimeScore.toneFeedback.adviceVi}
                    </p>
                  </div>
                </div>
              )}

              {/* Recognized Transcript Box */}
              <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Giọng nói nhận diện được:</span>
                  {realtimeScore && (
                    <span className="text-indigo-400 font-semibold">
                      {realtimeScore.toneFeedback.contour}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-white font-semibold italic">
                  {isRecording
                    ? liveTranscript
                      ? `"${liveTranscript}"`
                      : 'Đang lắng nghe... Hãy đọc to câu mẫu bên trái!'
                    : spokenText
                    ? `"${spokenText}"`
                    : 'Chưa có bản thu âm cho câu này.'}
                </p>
              </div>
            </div>

            {/* Detailed SLA Assessment Result */}
            {isEvaluating ? (
              <div className="py-8 text-center space-y-2 text-xs text-indigo-300">
                <Sparkles className="w-6 h-6 animate-spin text-indigo-400 mx-auto" />
                <p>Giáo sư SLA đang phân tích chi tiết độ nối âm và trọng âm...</p>
              </div>
            ) : currentEvaluation ? (
              <div className="space-y-3.5 pt-2 border-t border-slate-800 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-extrabold text-white">
                      Nhận xét Chuyên sâu từ Giáo sư
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Đạt chuẩn {currentEvaluation.cefrLevel || 'B1'}
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                    <span className="font-bold text-emerald-300 block">Điểm làm tốt:</span>
                    <ul className="list-disc list-inside text-slate-200 space-y-0.5">
                      {currentEvaluation.strengths?.map((s: string, si: number) => (
                        <li key={si}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
                    <span className="font-bold text-amber-300 block">Gợi ý tinh chỉnh:</span>
                    <ul className="list-disc list-inside text-slate-200 space-y-0.5">
                      {currentEvaluation.areasToImprove?.map((a: string, ai: number) => (
                        <li key={ai}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {currentEvaluation.mentorCheerVi && (
                  <p className="text-xs text-indigo-300 italic text-center pt-1">
                    "{currentEvaluation.mentorCheerVi}"
                  </p>
                )}

                <button
                  onClick={handleToggleRecord}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Thu âm lại câu này để đạt điểm tối đa</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300 space-y-1.5">
                <strong className="text-indigo-300 block">Phương pháp Shadowing chuẩn SLA:</strong>
                <p className="leading-relaxed">
                  1. Nghe giọng mẫu ở tốc độ <strong>0.75x</strong> hoặc <strong>1.0x</strong> để nắm vị trí nhấn trọng âm.<br />
                  2. Bấm nút <strong>Bấm Mic Nhại giọng</strong> và nói đuổi theo nhịp câu mẫu.
                </p>
              </div>
            )}
          </div>

          {/* Proceed to Final Step CTA */}
          <button
            onClick={onProceedToDebrief}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-900/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-indigo-200" />
              <div className="text-left">
                <div className="text-sm font-extrabold">Sang Bước 4: Đúc kết & Nhật ký (10p)</div>
                <div className="text-[11px] text-indigo-100 font-normal">
                  Xem phân tích lỗi sai, biểu đồ tiến độ và hoàn tất bài học
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};