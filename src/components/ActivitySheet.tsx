'use client';
import { useState, useRef } from 'react';
import { CARD_COLORS } from '@/data/cardData';
import type { FlatCard, SubCard, CardResponse } from '@/types';

interface ActivitySheetProps {
  card: FlatCard;
  responses?: CardResponse;
  checkStates: Record<number, boolean>;
  onCheck: (i: number) => void;
  onSave: (data: CardResponse) => void;
  onClose: () => void;
}

export default function ActivitySheet({ card, responses, checkStates, onCheck, onSave, onClose }: ActivitySheetProps) {
  const color = CARD_COLORS[card.parentId].bg;
  const sub = card.data as SubCard;
  const [texts, setTexts] = useState<Record<number, string>>(responses?.texts || {});
  const [images, setImages] = useState<Record<number, { name: string; url: string }>>(responses?.images || {});
  const [saving, setSaving] = useState(false);
  const [activeUpload, setActiveUpload] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleText = (idx: number, val: string) => setTexts(p => ({ ...p, [idx]: val }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeUpload === null) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImages(p => ({ ...p, [activeUpload!]: { name: file.name, url: ev.target?.result as string } }));
      setActiveUpload(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSave = () => {
    setSaving(true);
    onSave({ texts, images });
    setTimeout(() => { setSaving(false); onClose(); }, 600);
  };

  const filled = Object.values(texts).filter(t => t?.trim()).length;
  const total = sub.checklist?.length || 0;

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex justify-center items-end"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-lg max-h-[92vh] bg-white rounded-t-2xl flex flex-col"
        style={{ animation: 'slideUp 0.35s ease-out' }}>

        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-extrabold"
              style={{ background: color }}>{card.parentId}</span>
            <div>
              <div className="text-sm font-extrabold text-gray-900">{sub.title}</div>
              <div className="text-[11px] text-gray-400">{sub.id} · 전략 작성</div>
            </div>
          </div>
          <button onClick={onClose}
            className="bg-gray-100 px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-200 transition">
            닫기
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28">
          {/* Question banner */}
          <div className="rounded-xl p-3 mb-5"
            style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
            <div className="text-[11px] font-bold mb-1" style={{ color }}>핵심 질문</div>
            <div className="text-sm font-extrabold text-gray-800 leading-snug">{sub.question}</div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300"
                style={{ width: `${total ? (filled / total) * 100 : 0}%`, background: color }} />
            </div>
            <span className="text-[11px] text-gray-400">{filled}/{total} 작성</span>
          </div>

          {/* Checklist items with input */}
          {sub.checklist.map((item, i) => (
            <div key={i} className="mb-4 rounded-xl border overflow-hidden transition-colors"
              style={{ borderColor: texts[i]?.trim() ? `${color}40` : '#eee' }}>
              <label className="flex items-start gap-2 cursor-pointer px-3 py-3"
                style={{ background: texts[i]?.trim() ? `${color}08` : '#fafafa' }}>
                <input type="checkbox" checked={checkStates[i] || false}
                  onChange={() => onCheck(i)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0"
                  style={{ accentColor: color }} />
                <span className="text-[13px] leading-snug font-semibold"
                  style={{
                    color: '#333',
                    textDecoration: checkStates[i] ? 'line-through' : 'none',
                    opacity: checkStates[i] ? 0.5 : 1,
                  }}>{item}</span>
              </label>

              <div className="px-3 pb-3">
                <textarea placeholder="여기에 답변을 작성하세요..."
                  value={texts[i] || ''}
                  onChange={(e) => handleText(i, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full min-h-[72px] px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] leading-relaxed text-gray-700 resize-y transition-colors font-[inherit]"
                  onFocus={(e) => (e.target.style.borderColor = color)}
                  onBlur={(e) => (e.target.style.borderColor = '#e8e8e8')} />

                <div className="flex items-center gap-2 mt-2">
                  <button onClick={(e) => { e.stopPropagation(); setActiveUpload(i); fileRef.current?.click(); }}
                    className="bg-gray-50 border border-dashed border-gray-300 rounded-md px-3 py-1.5 text-[11px] text-gray-500 hover:bg-gray-100 transition flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                    </svg>
                    이미지 첨부
                  </button>
                  {images[i] && (
                    <div className="flex items-center gap-1.5">
                      <img src={images[i].url} alt="" className="w-8 h-8 rounded object-cover" />
                      <span className="text-[11px] text-gray-400">{images[i].name}</span>
                      <button onClick={(e) => { e.stopPropagation(); setImages(p => { const n = { ...p }; delete n[i]; return n; }); }}
                        className="text-gray-300 hover:text-gray-500 text-sm px-0.5">x</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-2.5">
          <button onClick={onClose}
            className="flex-1 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl text-sm transition hover:bg-gray-200">
            취소
          </button>
          <button onClick={handleSave}
            className="flex-[2] py-3 text-white font-bold rounded-xl text-sm transition"
            style={{ background: saving ? '#4CAF50' : color }}>
            {saving ? '저장 완료!' : '저장하기'}
          </button>
        </div>

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
      </div>
    </div>
  );
}
