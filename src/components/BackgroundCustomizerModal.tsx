import React, { useRef } from 'react';
import {
  X,
  Sliders,
  Image as ImageIcon,
  Upload,
  RotateCcw,
  Sun,
  Eye,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { BackgroundSettings } from '../types';
import { DEFAULT_BG_SETTINGS } from '../utils/profileStorage';

interface BackgroundCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: BackgroundSettings;
  onUpdateSettings: (newSettings: BackgroundSettings) => void;
}

export const BackgroundCustomizerModal: React.FC<BackgroundCustomizerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onUpdateSettings({
          ...settings,
          customImage: dataUrl,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    onUpdateSettings(DEFAULT_BG_SETTINGS);
  };

  const handleUsePreset = () => {
    onUpdateSettings({
      ...settings,
      customImage: null, // Reset to the high-fidelity Family Lantern theme
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B0F19]/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#161F30] border border-[#26354D] rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#26354D] flex items-center justify-between bg-[#161F30]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Tùy Chỉnh Ảnh Nền & Độ Đọc Chữ</span>
              </h2>
              <p className="text-xs text-slate-400">
                Điều chỉnh độ sáng, độ mờ để chữ luôn sắc nét và dễ đọc nhất.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0B0F19] hover:bg-[#1E2B42] text-slate-400 hover:text-white border border-[#26354D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Image Source Selection */}
          <div className="space-y-3">
            <label className="font-semibold text-white block">1. Nguồn Ảnh Nền</label>
            <div className="grid grid-cols-2 gap-3">
              {/* Preset Button: Family Lantern Night */}
              <button
                type="button"
                onClick={handleUsePreset}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  !settings.customImage
                    ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-[#0B0F19] border-[#26354D] hover:bg-[#1E2B42]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">🏮</span>
                  {!settings.customImage && (
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-white block">Đêm Đèn Lồng Gia Đình</span>
                  <span className="text-[11px] text-slate-400">
                    Chủ đề ấm áp theo ảnh chụp
                  </span>
                </div>
              </button>

              {/* Upload Custom File (IMG_9105.HEIC or JPG/PNG) */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  settings.customImage
                    ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-[#0B0F19] border-[#26354D] hover:bg-[#1E2B42]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Upload className="w-5 h-5 text-indigo-400" />
                  {settings.customImage && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-white block">
                    {settings.customImage ? 'Đã tải ảnh riêng lên' : 'Tải ảnh từ máy'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Chọn ảnh IMG_9105 / JPG / PNG
                  </span>
                </div>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.heic,.HEIC"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Sliders: Blur, Opacity, Brightness */}
          <div className="space-y-4 bg-[#0B0F19]/80 p-4 rounded-2xl border border-[#26354D]">
            <h3 className="font-semibold text-white flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-400" />
              <span>2. Tinh Chỉnh Độ Mờ & Độ Tương Phản Đọc Chữ</span>
            </h3>

            {/* Độ mờ hậu cảnh (Blur) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span>Độ mờ ảnh nền (Blur):</span>
                <span className="font-mono font-bold text-indigo-300">
                  {settings.blurPx}px {settings.blurPx >= 4 ? '(Tối ưu cho mắt)' : ''}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                step="1"
                value={settings.blurPx}
                onChange={(e) =>
                  onUpdateSettings({ ...settings, blurPx: Number(e.target.value) })
                }
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Làm mờ nhẹ chi tiết hậu cảnh giúp mắt tập trung hoàn toàn vào nội dung bài học.
              </p>
            </div>

            {/* Độ đậm / Hiển thị ảnh nền (Opacity) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span>Độ hiển thị ảnh nền (Opacity):</span>
                <span className="font-mono font-bold text-indigo-300">
                  {Math.round(settings.opacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.75"
                step="0.05"
                value={settings.opacity}
                onChange={(e) =>
                  onUpdateSettings({ ...settings, opacity: Number(e.target.value) })
                }
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Mức 35% - 45% mang lại độ cân bằng hoàn hảo giữa thẩm mỹ và tính tập trung.
              </p>
            </div>

            {/* Độ sáng (Brightness) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span>Độ sáng ảnh (Brightness):</span>
                <span className="font-mono font-bold text-indigo-300">
                  {Math.round(settings.brightness * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.4"
                max="1.0"
                step="0.05"
                value={settings.brightness}
                onChange={(e) =>
                  onUpdateSettings({ ...settings, brightness: Number(e.target.value) })
                }
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Text Legibility Sample Preview Card */}
          <div className="space-y-2">
            <span className="font-semibold text-white block">3. Xem Thử Độ Rõ Nét Của Chữ:</span>
            <div className="p-4 rounded-2xl bg-[#161F30]/90 backdrop-blur-xl border border-[#26354D] space-y-1.5 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-white text-sm">
                  "step out of my comfort zone"
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40">
                  /step aʊt/
                </span>
              </div>
              <p className="text-slate-300 text-xs">
                Bước ra khỏi vùng an toàn của bản thân — <span className="text-emerald-400 font-semibold">Độ tương phản đạt chuẩn WCAG AAA</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B0F19] border-t border-[#26354D] flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E2B42] text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục mặc định tối ưu</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            Hoàn tất & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
