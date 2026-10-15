import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Play,
  Flame,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Edit2,
  Trash2,
  X,
  Plus,
  Award,
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileSelectionModalProps {
  isOpen: boolean;
  profiles: UserProfile[];
  currentProfileId: string | null;
  onSelectProfile: (profile: UserProfile) => void;
  onCreateProfile: (profileData: {
    name: string;
    roleLabel: string;
    avatar: string;
    colorTheme: string;
  }) => void;
  onUpdateProfile: (id: string, updates: Partial<UserProfile>) => void;
  onDeleteProfile: (id: string) => void;
  onClose?: () => void;
  canClose?: boolean;
}

const AVATAR_OPTIONS = [
  { emoji: '👨‍💼', label: 'Bố' },
  { emoji: '👩‍🏫', label: 'Mẹ' },
  { emoji: '👧', label: 'Bé gái' },
  { emoji: '👦', label: 'Bé trai' },
  { emoji: '👴', label: 'Ông' },
  { emoji: '👵', label: 'Bà' },
  { emoji: '🎓', label: 'Sinh viên' },
  { emoji: '🌟', label: 'Học viên' },
  { emoji: '🚀', label: 'Khám phá' },
  { emoji: '☕', label: 'Văn phòng' },
];

const THEME_OPTIONS = [
  { id: 'indigo', label: 'Indigo', bg: 'bg-indigo-600', ring: 'ring-indigo-500' },
  { id: 'emerald', label: 'Emerald', bg: 'bg-emerald-600', ring: 'ring-emerald-500' },
  { id: 'amber', label: 'Amber', bg: 'bg-amber-600', ring: 'ring-amber-500' },
  { id: 'rose', label: 'Rose', bg: 'bg-rose-600', ring: 'ring-rose-500' },
  { id: 'sky', label: 'Sky Blue', bg: 'bg-sky-600', ring: 'ring-sky-500' },
  { id: 'purple', label: 'Purple', bg: 'bg-purple-600', ring: 'ring-purple-500' },
];

export const ProfileSelectionModal: React.FC<ProfileSelectionModalProps> = ({
  isOpen,
  profiles,
  currentProfileId,
  onSelectProfile,
  onCreateProfile,
  onUpdateProfile,
  onDeleteProfile,
  onClose,
  canClose = false,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

  // New profile form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Thành viên');
  const [newAvatar, setNewAvatar] = useState('👨‍💼');
  const [newTheme, setNewTheme] = useState('indigo');

  if (!isOpen) return null;

  const handleStartCreate = () => {
    setNewName('');
    setNewRole('Thành viên');
    setNewAvatar('🌟');
    setNewTheme('indigo');
    setIsCreating(true);
  };

  const handleSaveNewProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onCreateProfile({
      name: newName.trim(),
      roleLabel: newRole.trim() || 'Thành viên',
      avatar: newAvatar,
      colorTheme: newTheme,
    });

    setIsCreating(false);
  };

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'rose':
        return {
          border: 'border-rose-500/40 hover:border-rose-500',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          glow: 'group-hover:shadow-[0_0_25px_rgba(244,63,94,0.25)]',
          btn: 'bg-rose-600 hover:bg-rose-500',
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/40 hover:border-emerald-500',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]',
          btn: 'bg-emerald-600 hover:bg-emerald-500',
        };
      case 'amber':
        return {
          border: 'border-amber-500/40 hover:border-amber-500',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          glow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]',
          btn: 'bg-amber-600 hover:bg-amber-500',
        };
      case 'sky':
        return {
          border: 'border-sky-500/40 hover:border-sky-500',
          badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
          glow: 'group-hover:shadow-[0_0_25px_rgba(14,165,233,0.25)]',
          btn: 'bg-sky-600 hover:bg-sky-500',
        };
      case 'purple':
        return {
          border: 'border-purple-500/40 hover:border-purple-500',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          glow: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]',
          btn: 'bg-purple-600 hover:bg-purple-500',
        };
      default:
        return {
          border: 'border-indigo-500/40 hover:border-indigo-500',
          badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
          glow: 'group-hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]',
          btn: 'bg-indigo-600 hover:bg-indigo-500',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B0F19]/85 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#161F30]/95 border border-[#26354D] rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-[#26354D] flex items-center justify-between bg-[#161F30]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                <span>Ai đang học hôm nay?</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Không cần mật khẩu
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Chọn tài khoản của bạn để vào học ngay bài tiếp theo đã lưu riêng cho bạn.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isCreating && (
              <button
                onClick={handleStartCreate}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Thêm người học</span>
              </button>
            )}

            {canClose && onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#0B0F19] hover:bg-[#1E2B42] text-slate-400 hover:text-white border border-[#26354D] transition-colors cursor-pointer"
                title="Đóng"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {/* Create Profile Form Modal View */}
          {isCreating ? (
            <form onSubmit={handleSaveNewProfile} className="max-w-lg mx-auto space-y-5 animate-fadeIn">
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-white">Tạo Hồ sơ Người học Mới</h3>
                <p className="text-xs text-slate-400">
                  Dành cho thành viên trong gia đình. Dữ liệu bài học, từ vựng và chuỗi ngày sẽ được lưu độc lập.
                </p>
              </div>

              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tên người học</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bố Tuấn, Mẹ Lan, Bé An..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-[#26354D] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Role / Tag */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Vai trò / Ghi chú</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Phụ huynh, Học sinh, Con gái..."
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-[#26354D] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Avatar Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Chọn Avatar đại diện</label>
                <div className="grid grid-cols-5 gap-2">
                  {AVATAR_OPTIONS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setNewAvatar(av.emoji);
                        if (!newRole || newRole === 'Thành viên') setNewRole(av.label);
                      }}
                      className={`p-3 rounded-2xl border text-2xl transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        newAvatar === av.emoji
                          ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-500 scale-105'
                          : 'bg-[#0B0F19] border-[#26354D] hover:bg-[#1E2B42]'
                      }`}
                    >
                      <span>{av.emoji}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{av.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Color Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Màu chủ đạo</label>
                <div className="flex items-center gap-3">
                  {THEME_OPTIONS.map((thm) => (
                    <button
                      key={thm.id}
                      type="button"
                      onClick={() => setNewTheme(thm.id)}
                      className={`w-8 h-8 rounded-full ${thm.bg} transition-all cursor-pointer flex items-center justify-center ${
                        newTheme === thm.id ? `ring-4 ${thm.ring} scale-110` : 'opacity-70 hover:opacity-100'
                      }`}
                      title={thm.label}
                    >
                      {newTheme === thm.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#26354D]">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#0B0F19] hover:bg-[#1E2B42] text-slate-400 hover:text-white border border-[#26354D] text-xs font-medium transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!newName.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Tạo & Bắt đầu học ngay</span>
                </button>
              </div>
            </form>
          ) : (
            /* Profiles Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profiles.map((profile) => {
                const isCurrent = profile.id === currentProfileId;
                const nextLessonDay = profile.currentDay || Math.min(90, profile.completedDays.length + 1);
                const themeCls = getThemeClasses(profile.colorTheme);

                return (
                  <div
                    key={profile.id}
                    className={`group relative bg-[#0B0F19]/90 border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-lg cursor-pointer ${
                      themeCls.border
                    } ${themeCls.glow} ${isCurrent ? 'ring-2 ring-indigo-500/50 bg-[#161F30]' : 'hover:bg-[#161F30]'}`}
                    onClick={() => onSelectProfile(profile)}
                  >
                    {/* Top Row: Avatar + Status */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        {/* Avatar Emoji */}
                        <div className="w-14 h-14 rounded-2xl bg-[#161F30] border border-[#26354D] flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
                          {profile.avatar || '👤'}
                        </div>

                        {/* Badges */}
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${themeCls.badge}`}
                          >
                            {profile.roleLabel || 'Thành viên'}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Đang học
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {profile.name}
                      </h3>

                      {/* Lesson Progress Status */}
                      <div className="mt-2 space-y-1.5 text-xs text-slate-300">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>Tiến độ 90 ngày:</span>
                          <span className="text-white font-bold">
                            {profile.completedDays.length}/90 ngày ({Math.round((profile.completedDays.length / 90) * 100)}%)
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-[#161F30] rounded-full overflow-hidden border border-[#26354D]/60">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                            style={{
                              width: `${Math.max(4, (profile.completedDays.length / 90) * 100)}%`,
                            }}
                          />
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400">
                          <div className="flex items-center gap-1 text-amber-400">
                            <Flame className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{profile.streakDays || 1}d streak</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1 text-indigo-300">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{profile.totalMinutesPracticed || 0}m đã học</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action: One-Click Jump to Next Day */}
                    <div className="mt-5 pt-3 border-t border-[#26354D]/70 flex items-center justify-between gap-2">
                      <div className="text-left">
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">
                          Bài học tiếp theo:
                        </span>
                        <strong className="text-xs text-indigo-300 font-bold">
                          Ngày {nextLessonDay}/90
                        </strong>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Delete Button (if not only 1 profile) */}
                        {profiles.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Bạn có chắc muốn xóa hồ sơ của "${profile.name}"?`)) {
                                onDeleteProfile(profile.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Xóa hồ sơ này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-md transition-all ${themeCls.btn}`}
                        >
                          <span>Vào học</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add New Profile Tile */}
              <button
                type="button"
                onClick={handleStartCreate}
                className="bg-[#0B0F19]/50 hover:bg-[#161F30]/80 border-2 border-dashed border-[#26354D] hover:border-indigo-500/60 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group min-h-[220px]"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 group-hover:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <span className="text-sm font-bold text-white group-hover:text-indigo-300 block">
                    Thêm người học mới
                  </span>
                  <span className="text-xs text-slate-400">
                    Bố, Mẹ, Bé hoặc thành viên khác
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-[#0B0F19] border-t border-[#26354D] text-center text-xs text-slate-400">
          💡 <span className="font-semibold text-slate-300">Ghi chú tiện lợi:</span> Không cần mật khẩu. Mỗi người chỉ cần chạm vào tên mình để tự động tiếp tục bài học cuối cùng đã hoàn thành!
        </div>
      </div>
    </div>
  );
};
