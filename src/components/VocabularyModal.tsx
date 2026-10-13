import React, { useState } from 'react';
import {
  X,
  BookMarked,
  Volume2,
  CheckCircle2,
  Trash2,
  Search,
  Sparkles,
  Layers,
  Award,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { VocabularyItem } from '../types';
import { audioEngine } from '../utils/audio';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  vocabularyList: VocabularyItem[];
  onToggleMastered: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  voiceName: string;
}

export const VocabularyModal: React.FC<VocabularyModalProps> = ({
  isOpen,
  onClose,
  vocabularyList,
  onToggleMastered,
  onRemoveItem,
  onClearAll,
  voiceName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'learning' | 'mastered'>('all');
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter items
  const filteredList = vocabularyList.filter((item) => {
    const matchesSearch = item.phrase.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterMode === 'mastered') return matchesSearch && item.mastered;
    if (filterMode === 'learning') return matchesSearch && !item.mastered;
    return matchesSearch;
  });

  const masteredCount = vocabularyList.filter((v) => v.mastered).length;

  const handlePlayAudio = (phrase: string, id: string) => {
    setPlayingId(id);
    audioEngine.speakText(phrase, {
      voiceName,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  const currentFlashcard = filteredList[flashcardIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Sổ Từ Vựng Phản Xạ (My Vocabulary List)</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  {vocabularyList.length} cụm từ
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Tự động trích xuất từ các cấu trúc then chốt (Pedagogy Highlights) trong mỗi buổi học
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsFlashcardMode(!isFlashcardMode);
                setFlashcardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                isFlashcardMode
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isFlashcardMode ? 'Xem dạng Danh sách' : 'Luyện Flashcards'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Summary Bar */}
        <div className="bg-slate-950/80 px-5 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="text-slate-300">
              Tổng số từ: <strong className="text-white">{vocabularyList.length}</strong>
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Đã làm chủ: <strong>{masteredCount}</strong>
            </span>
            <span className="text-amber-400">
              Đang rèn luyện: <strong>{vocabularyList.length - masteredCount}</strong>
            </span>
          </div>

          {vocabularyList.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Bạn có chắc muốn xóa toàn bộ danh sách từ vựng đã lưu?')) {
                  onClearAll();
                }
              }}
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Xóa tất cả</span>
            </button>
          )}
        </div>

        {/* Flashcard Review Mode */}
        {isFlashcardMode ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6">
            {filteredList.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                Không có cụm từ nào để ôn tập trong bộ lọc hiện tại.
              </div>
            ) : (
              <>
                <div className="text-xs text-slate-400 font-mono">
                  Thẻ {flashcardIndex + 1} / {filteredList.length}
                </div>

                {/* Flip Card Container */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full max-w-md h-56 bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-xl hover:border-indigo-400 transition-all relative group select-none"
                >
                  <span className="absolute top-3 left-4 text-[10px] font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    Ngày {currentFlashcard.day}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(currentFlashcard.phrase, currentFlashcard.id);
                    }}
                    className="absolute top-3 right-4 p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                    "{currentFlashcard.phrase}"
                  </h3>

                  {isFlipped ? (
                    <div className="space-y-2 animate-fadeIn">
                      {currentFlashcard.contextSnippet && (
                        <p className="text-xs text-slate-300 italic max-w-xs">
                          "{currentFlashcard.contextSnippet}"
                        </p>
                      )}
                      <span className="text-[11px] text-emerald-400 font-medium block">
                        💡 Cụm từ then chốt đã vận dụng trong bài học
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-indigo-300 transition-colors">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Bấm vào thẻ để xem ngữ cảnh vận dụng
                    </span>
                  )}
                </div>

                {/* Flashcard Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Thẻ trước
                  </button>

                  <button
                    onClick={() => onToggleMastered(currentFlashcard.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      currentFlashcard.mastered
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{currentFlashcard.mastered ? 'Đã thuộc ✓' : 'Đánh dấu đã thuộc'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setFlashcardIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Thẻ kế tiếp
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* List Mode */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search & Filter Toolbar */}
            <div className="p-3.5 border-b border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm cụm từ..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-1 self-start sm:self-auto">
                {(['all', 'learning', 'mastered'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setFilterMode(mode)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      filterMode === mode
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode === 'all' ? 'Tất cả' : mode === 'learning' ? 'Đang học' : 'Đã làm chủ'}
                  </button>
                ))}
              </div>
            </div>

            {/* Vocabulary Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {filteredList.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <BookMarked className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-sm font-medium">Chưa có từ vựng nào trong danh sách.</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Khi bạn trò chuyện trong Module 2 (Nhập vai 1-on-1), các cụm từ then chốt được AI đánh dấu sẽ tự động lưu vào đây để ôn tập gián cách!
                  </p>
                </div>
              ) : (
                filteredList.map((item) => {
                  const isPlaying = playingId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        item.mastered
                          ? 'bg-slate-950/40 border-emerald-500/30'
                          : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white tracking-tight">
                            "{item.phrase}"
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                            Ngày {item.day}
                          </span>
                          {item.mastered && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              Đã làm chủ ✓
                            </span>
                          )}
                        </div>

                        {item.contextSnippet && (
                          <p className="text-xs text-slate-400 italic">
                            Ngữ cảnh: "{item.contextSnippet}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Audio Play Button */}
                        <button
                          onClick={() => handlePlayAudio(item.phrase, item.id)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer ${
                            isPlaying
                              ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
                          }`}
                          title="Nghe phát âm chuẩn"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Mastered Toggle Button */}
                        <button
                          onClick={() => onToggleMastered(item.id)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer ${
                            item.mastered
                              ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-emerald-300 hover:bg-slate-700'
                          }`}
                          title={item.mastered ? 'Bỏ đánh dấu' : 'Đánh dấu đã thuộc'}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Remove Item Button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-rose-400 hover:bg-slate-700 transition-all cursor-pointer"
                          title="Xóa từ khỏi danh sách"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
