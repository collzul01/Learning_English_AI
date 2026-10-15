import React from 'react';
import {
  X,
  Volume2,
  Sparkles,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  voiceName: string;
  onChangeVoice: (voice: string) => void;
  autoPlayAudio: boolean;
  onToggleAutoPlay: () => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  voiceName,
  onChangeVoice,
  autoPlayAudio,
  onToggleAutoPlay,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  const voices = [
    { id: 'Aoede', label: 'Aoede (Tự nhiên, Ngữ điệu Bản xứ & Rõ âm)', style: 'Giọng bản xứ tự nhiên, ngữ điệu truyền cảm nhất (Khuyên dùng)' },
    { id: 'Kore', label: 'Kore (Nữ tính, Ấm áp & Sư phạm)', style: 'Giọng chuẩn giáo sư ngôn ngữ học SLA' },
    { id: 'Zephyr', label: 'Zephyr (Nam tính, Tự nhiên & Trầm ấm)', style: 'Giọng giao tiếp đời sống hiện đại' },
    { id: 'Puck', label: 'Puck (Tươi vui, Năng động)', style: 'Giọng trẻ trung, phản xạ nhanh' },
    { id: 'Fenrir', label: 'Fenrir (Chững chạc, Quyết đoán)', style: 'Giọng đối thoại công sở & đàm phán' },
  ];

  const handleTestVoice = (voiceId: string) => {
    audioEngine.speakText("Hi there! I am your AI SLA English speaking coach. Let's make steady progress together!", {
      voiceName: voiceId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Cài Đặt Hệ Thống & Giọng Nói</h2>
              <p className="text-xs text-slate-400">Tùy biến hạt nhân âm thanh Gemini TTS & SLA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Selection */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 block">
            Giọng nói Trí tuệ Nhân tạo (Gemini TTS Prebuilt Voices):
          </label>
          <div className="space-y-2">
            {voices.map((v) => {
              const isSelected = voiceName === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => onChangeVoice(v.id)}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500 ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{v.label}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{v.style}</div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTestVoice(v.id);
                    }}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1 transition-colors"
                    title="Nghe thử giọng"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Thử</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Auto Play Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div>
            <span className="text-xs font-semibold text-white block">
              Tự động phát âm thanh khi AI phản hồi
            </span>
            <span className="text-[11px] text-slate-400">
              Giúp bạn luyện phản xạ nghe tự nhiên không cần bấm nút loa
            </span>
          </div>
          <button
            onClick={onToggleAutoPlay}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              autoPlayAudio ? 'bg-indigo-600' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                autoPlayAudio ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 4 SLA Core Principles Recap */}
        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-indigo-300">
            <BookOpen className="w-4 h-4" />
            <span>4 Trụ Cột Khoa Học Sư Phạm (SLA Framework)</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            1. <strong>Comprehensible Input (i+1)</strong>: 85% từ ngữ A2 thân thuộc + 15% nâng cấp B1.<br/>
            2. <strong>Conversational Recasting</strong>: Sửa lỗi tự nhiên không ngắt dòng tư duy.<br/>
            3. <strong>Spaced Repetition</strong>: Nhắc lại gián cách các collocations then chốt.<br/>
            4. <strong>Fluency over Accuracy</strong>: Tự tin và phản xạ tức thì là ưu tiên số một!
          </p>
        </div>

        {/* Danger zone / Reset */}
        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
          <button
            onClick={() => {
              if (confirm('Bạn có chắc muốn đặt lại toàn bộ tiến độ 90 ngày không?')) {
                onResetProgress();
                onClose();
              }
            }}
            className="text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại toàn bộ tiến độ</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
