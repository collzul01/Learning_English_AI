import React, { useRef } from 'react';
import { X, Sliders, Upload, RotateCcw, Eye, Moon, Sun, Sparkles } from 'lucide-react';
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateSettings({
          ...settings,
          customImage: reader.result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const applyPreset = (preset: 'focus' | 'warm' | 'cinema') => {
    if (preset === 'focus') {
      onUpdateSettings({
        ...settings,
        opacity: 0.18,
        blurPx: 12,
        brightness: 0.6,
        overlayMode: 'obsidian',
      });
    } else if (preset === 'warm') {
      onUpdateSettings({
        ...settings,
        opacity: 0.38,
        blurPx: 4,
        brightness: 0.75,
        overlayMode: 'obsidian',
      });
    } else {
      onUpdateSettings({
        ...settings,
        opacity: 0.52,
        blurPx: 2,
        brightness: 0.85,
        overlayMode: 'cinema',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">
                Không gian & Chống mỏi mắt (Eye-Comfort)
              </h2>
              <p className="text-xs text-slate-400">
                Tối ưu độ tương phản chữ và ánh sáng nền cho mắt khi học buổi tối
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Eye-Comfort Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">
            Chế độ hiển thị nhanh:
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => applyPreset('focus')}
              className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 text-left space-y-1 transition-all cursor-pointer"
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <div className="text-xs font-bold text-white">Đọc đêm dịu mắt</div>
              <div className="text-[11px] text-slate-400">Tương phản tối đa</div>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('warm')}
              className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-amber-500/40 text-left space-y-1 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div className="text-xs font-bold text-white">Đèn lồng ấm áp</div>
              <div className="text-[11px] text-slate-400">Cân bằng hài hòa</div>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('cinema')}
              className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-left space-y-1 transition-all cursor-pointer"
            >
              <Sun className="w-4 h-4 text-emerald-400" />
              <div className="text-xs font-bold text-white">Sống động</div>
              <div className="text-[11px] text-slate-400">Rõ hình nền gia đình</div>
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Độ rõ ảnh nền (Opacity)</span>
              <span className="font-mono text-indigo-300">{Math.round(settings.opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.75"
              step="0.02"
              value={settings.opacity}
              onChange={(e) =>
                onUpdateSettings({ ...settings, opacity: parseFloat(e.target.value) })
              }
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Độ làm mờ hậu cảnh (Blur)</span>
              <span className="font-mono text-indigo-300">{settings.blurPx}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={settings.blurPx}
              onChange={(e) =>
                onUpdateSettings({ ...settings, blurPx: parseInt(e.target.value, 10) })
              }
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Độ dịu sáng (Brightness)</span>
              <span className="font-mono text-indigo-300">
                {Math.round(settings.brightness * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.3"
              max="1.0"
              step="0.05"
              value={settings.brightness}
              onChange={(e) =>
                onUpdateSettings({ ...settings, brightness: parseFloat(e.target.value) })
              }
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Custom Family Photo Upload */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 text-indigo-400" />
            <span>Tải ảnh kỷ niệm gia đình lên</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateSettings(DEFAULT_BG_SETTINGS)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục mặc định</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            Áp dụng & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};