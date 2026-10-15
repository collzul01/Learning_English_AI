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
  AlertCircle,
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

  // Real-time Pronunciation Scoring State
  const [realtimeScore, setRealtimeScore] = useState<RealtimePronunciationResult | null>(null);
  const [liveTranscript, setLiveTranscript] = useState('');
  const recognizerRef = useRef<SpeechRecognizer | null>(null);

  const currentItem: ShadowingItem =
    lesson.shadowingDrills[selectedItemIndex] || lesson.shadowingDrills[0];



  // Reset or initialize real-time score when sentence changes
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
        recognizerRef.current.forceSubmit();
        recognizerRef.current = null;
      }
      setIsRecording(false);
      return;
    }

    setLiveTranscript('');
    audioEngine.playDing('click');

    const recognizer = new SpeechRecognizer(
      (transcript, isFinal) => {
        setLiveTranscript(transcript);

        // Compute real-time pronunciation and tone score on every speech token
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

          // 1. INSTANT RESULT (0ms latency, 100% reliable)
          // Deliver evaluation immediately without making the learner wait!
          const instantOverall = scoreResult.overallScore;
          const instantEval = {
            fluencyScore: instantOverall,
            cefrLevel: instantOverall >= 82 ? 'B1+' : instantOverall >= 60 ? 'B1' : 'A2',
            strengths: instantOverall >= 70
              ? ['Khớp nhịp tốt với câu mẫu bản ngữ', 'Phát âm rõ ràng các âm tiết chính']
              : ['Đã hoàn thành đọc cả câu', 'Ngữ điệu tự nhiên'],
            areasToImprove: scoreResult.wordScores.filter(w => w.status !== 'matched').slice(0, 2).map(w => `Luyện kỹ phát âm từ: "${w.targetWord}"`) || ['Thả lỏng khẩu hình ở từ cuối'],
            mentorCheerVi: instantOverall >= 80
              ? 'Xuất sắc! Bạn nhại giọng rất chuẩn bản ngữ.'
              : 'Rất tốt! Tiếp tục luyện tập câu này để tăng độ mượt.',
            realtimeMetrics: scoreResult,
          };

          setEvaluationResults((prev) => ({
            ...prev,
            [selectedItemIndex]: instantEval,
          }));

          if (instantOverall >= 70) {
            audioEngine.playDing('success');
          }

          // 2. Background Qualitative Linguistic Enrichment (Non-blocking)
          if (transcript.trim().length > 3) {
            setIsEvaluating(true);
            fetch('/api/evaluate-speech', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                spokenText: transcript,
                referenceText: currentItem.text,
                context: `Shadowing drill: ${currentItem.intonationTip}`,
              }),
            })
              .then((res) => (res.ok ? res.json() : null))
              .then((data) => {
                if (data) {
                  setEvaluationResults((prev) => ({
                    ...prev,
                    [selectedItemIndex]: {
                      ...data,
                      realtimeMetrics: scoreResult,
                    },
                  }));
                }
              })
              .catch(() => {})
              .finally(() => setIsEvaluating(false));
          }
        }
      },
      () => {
        setIsRecording(false);
        recognizerRef.current = null;
      },
      (listening) => setIsRecording(listening),
      true // Continuous listening
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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-semibold font-mono border border-indigo-500/30">
                MODULE 3 • 15 PHÚT
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                Chấm điểm Phát âm & Ngữ điệu Thời gian Thực
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Luyện Nghe sâu & Nhại giọng (Shadowing & Real-Time Pronunciation Studio)
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Nhại lại câu mẫu trực tiếp qua Micro, nhận phản hồi ngay lập tức về độ tròn vành rõ chữ (Articulation) và nhịp điệu (Tone).
            </p>
          </div>

          <button
            onClick={onProceedToDebrief}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all shrink-0 cursor-pointer"
          >
            <span>Sang Tổng kết & Phản hồi (10m)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sentence Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Câu {idx + 1}</span>
              {hasDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Shadowing Player Studio */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Target Sentence Card */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            <Headphones className="w-3.5 h-3.5" />
            <span>Mẫu chuẩn bản ngữ: {currentItem.speakerRole}</span>
          </div>

          {/* Interactive Word Alignment Display (Lights up in real-time as user speaks) */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-inner">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xl sm:text-2xl font-bold leading-relaxed">
              {realtimeScore && realtimeScore.wordScores.length > 0 ? (
                realtimeScore.wordScores.map((ws, wIdx) => {
                  let badgeColor = 'text-slate-400 border-slate-800 bg-slate-950/50';
                  if (ws.status === 'matched') {
                    badgeColor =
                      'text-emerald-300 border-emerald-500/50 bg-emerald-500/20 shadow-sm shadow-emerald-500/20 scale-105';
                  } else if (ws.status === 'partial') {
                    badgeColor = 'text-amber-300 border-amber-500/50 bg-amber-500/20';
                  }

                  return (
                    <span
                      key={wIdx}
                      className={`px-2 py-0.5 rounded-lg border transition-all inline-block ${badgeColor}`}
                    >
                      {ws.targetWord}
                    </span>
                  );
                })
              ) : (
                <span className="text-white">"{currentItem.text}"</span>
              )}
            </div>

            <p className="text-sm text-slate-400 italic mt-3">"{currentItem.translationVi}"</p>
          </div>
        </div>

        {/* Intonation & Phonology Guide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-xs space-y-1">
            <div className="text-indigo-400 font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Ngữ điệu & Trọng âm (Intonation):</span>
            </div>
            <p className="text-slate-300">{currentItem.intonationTip}</p>
          </div>

          {currentItem.linkingTip && (
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-xs space-y-1">
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Nối âm & Nuốt âm (Linking Sounds):</span>
              </div>
              <p className="text-slate-300">{currentItem.linkingTip}</p>
            </div>
          )}
        </div>

        {/* Audio Controls & Recording */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Speed Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => {
                setPlaybackSpeed(0.75);
                handlePlayModelAudio(0.75);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                playbackSpeed === 0.75
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Volume1 className="w-3.5 h-3.5" />
              <span>0.75x (Chậm rõ âm)</span>
            </button>
            <button
              onClick={() => {
                setPlaybackSpeed(1.0);
                handlePlayModelAudio(1.0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                playbackSpeed === 1.0
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>1.0x (Tự nhiên)</span>
            </button>
          </div>

          {/* Model Audio Play Button */}
          <button
            onClick={() => handlePlayModelAudio(playbackSpeed)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs border transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-indigo-600 text-white border-indigo-500 animate-pulse'
                : 'bg-slate-900 text-indigo-300 border-indigo-500/30 hover:bg-slate-800'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingAudio ? 'Đang phát...' : 'Nghe giọng mẫu'}</span>
          </button>

          {/* Record Shadowing Button */}
          <button
            onClick={handleToggleRecord}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer ${
              isRecording
                ? 'bg-rose-600 text-white ring-4 ring-rose-500/30 animate-pulse'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/30'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isRecording ? 'Đang nghe... Nhấp để Hoàn tất' : 'Bật Mic Nhại giọng (Shadowing)'}</span>
          </button>
        </div>

        {/* Real-time Pronunciation & Tone Scoring HUD (Active during recording) */}
        {isRecording && realtimeScore && (
          <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-rose-950/60 border border-rose-500/40 rounded-2xl p-5 max-w-2xl mx-auto space-y-4 animate-fadeIn shadow-2xl">
            {/* Live Scores Gauge */}
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold text-rose-300 font-mono tracking-wider">
                  LIVE PHONOLOGY SCORING
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Độ tròn vành (Articulation)</div>
                  <div className="text-sm font-bold font-mono text-emerald-400">
                    {realtimeScore.articulationScore}%
                  </div>
                </div>

                <div className="text-right pl-3 border-l border-slate-800">
                  <div className="text-[10px] text-slate-400">Ngữ điệu (Tone)</div>
                  <div className="text-sm font-bold font-mono text-indigo-400">
                    {realtimeScore.toneRhythmScore}%
                  </div>
                </div>
              </div>
            </div>

            {/* Live Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Điểm tổng hợp thời gian thực:</span>
                <span className="font-bold text-white font-mono">{realtimeScore.overallScore}/100</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, realtimeScore.overallScore)}%` }}
                />
              </div>
            </div>

            {/* Live Transcript & Feedback Subtitle */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Giọng nói nhận diện trực tiếp:</span>
                <span className="text-indigo-400 font-medium">{realtimeScore.toneFeedback.contour}</span>
              </div>
              <p className="text-white font-medium italic">
                {liveTranscript ? `"${liveTranscript}"` : 'Đang lắng nghe... Hãy bắt đầu đọc theo câu mẫu trên!'}
              </p>
            </div>

            {/* Quick Submit Button inside HUD */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 border-t border-rose-500/10">
              <span className="text-[11px] text-rose-300/80">
                ⚡ Đọc xong bấm nộp ngay để nhận điểm lập tức:
              </span>
              <button
                onClick={handleToggleRecord}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-900/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Hoàn thành câu & Xem điểm ngay</span>
              </button>
            </div>
          </div>
        )}

        {isEvaluating && (
          <div className="text-center py-3 text-xs text-indigo-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin text-indigo-400" />
            <span>Giáo sư SLA đang phân tích toàn diện ngữ điệu, nối âm và ngữ pháp...</span>
          </div>
        )}

        {/* Detailed SLA Pronunciation & Tone Breakdown Card (After Recording Completes) */}
        {currentEvaluation && !isEvaluating && (
          <div className="bg-slate-900/95 border border-indigo-500/40 rounded-2xl p-6 max-w-2xl mx-auto space-y-5 animate-fadeIn shadow-2xl">
            {/* Header Score Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">
                    Kết Quả Đánh Giá Phát Âm & Ngữ Điệu (Tone & Articulation)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Phân tích đối chiếu theo chuẩn CEFR và phương pháp Krashen i+1
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {currentEvaluation.cefrLevel || 'B1'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Điểm: {currentEvaluation.fluencyScore || currentEvaluation.realtimeMetrics?.overallScore || 85}/100
                </span>
              </div>
            </div>

            {/* Articulation & Tone Sub-Score Meters */}
            {currentEvaluation.realtimeMetrics && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Articulation Score Card */}
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Độ Tròn Vành Rõ Chữ (Articulation)
                    </span>
                    <span className="font-mono font-bold text-white">
                      {currentEvaluation.realtimeMetrics.articulationScore}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {currentEvaluation.realtimeMetrics.articulationFeedback.adviceVi}
                  </p>
                </div>

                {/* Tone & Rhythm Score Card */}
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-400 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      Ngữ Điệu & Trọng Âm (Tone)
                    </span>
                    <span className="font-mono font-bold text-white">
                      {currentEvaluation.realtimeMetrics.toneRhythmScore}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {currentEvaluation.realtimeMetrics.toneFeedback.adviceVi}
                  </p>
                </div>
              </div>
            )}

            {/* Spoken Text Display */}
            {spokenText && (
              <div className="text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-medium">Bản ghi giọng bạn vừa nói:</span>
                <p className="text-indigo-200 font-semibold italic text-sm">"{spokenText}"</p>
              </div>
            )}

            {/* Strengths & Actionable Improvements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Ưu điểm nổi bật:
                </span>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {currentEvaluation.strengths?.map((s: string, si: number) => (
                    <li key={si}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Điểm cần mài giũa thêm:
                </span>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {currentEvaluation.areasToImprove?.map((a: string, ai: number) => (
                    <li key={ai}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mentor Encouragement */}
            {currentEvaluation.mentorCheerVi && (
              <div className="pt-2 border-t border-slate-800 text-xs text-indigo-300 italic text-center">
                "{currentEvaluation.mentorCheerVi}"
              </div>
            )}

            {/* Re-record Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleToggleRecord}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Luyện lại câu này</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
