'use client';
import { CARD_COLORS } from '@/data/cardData';
import type { FlatCard, TopicCard, SubCard } from '@/types';

function DifficultyDots({ level, max = 5 }: { level: number; max?: number }) {
  return <span className="tracking-wider">{'●'.repeat(level)}{'○'.repeat(max - level)}</span>;
}

interface CardBackProps {
  card: FlatCard;
  checkStates: Record<number, boolean>;
  onCheck: (i: number) => void;
  onOpenActivity?: () => void;
  hasResponse?: boolean;
}

export default function CardBack({ card, checkStates, onCheck, onOpenActivity, hasResponse }: CardBackProps) {
  const color = CARD_COLORS[card.parentId].bg;
  const isTopic = card.type === 'topic';
  const data = card.data;

  return (
    <div className="w-full h-full flex flex-col p-5 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-gray-500">카드번호 {data.id}</span>
        <span className="text-[11px] text-gray-400">
          난이도 <DifficultyDots level={data.difficulty} />
        </span>
      </div>
      <div className="w-full h-px mb-3" style={{ background: color }} />

      {isTopic ? (
        <>
          <h3 className="text-base font-black text-gray-900 mb-0.5">개념 및 중요성</h3>
          <p className="text-[11px] font-extrabold text-gray-400 mb-2.5">Overview & Why It Matters</p>
          <p className="text-[13px] leading-relaxed text-gray-700 mb-4">
            {(data as TopicCard).overview}
          </p>
          <h3 className="text-base font-black text-gray-900 mb-0.5">핵심 통찰 질문</h3>
          <p className="text-[11px] font-extrabold text-gray-400 mb-2">Insight Question</p>
          <p className="text-sm font-extrabold leading-snug text-gray-900">
            {(data as TopicCard).insightQ}
          </p>
        </>
      ) : (
        <>
          <h3 className="text-base font-black text-gray-900 mb-0.5">{(data as SubCard).title}</h3>
          <p className="text-[11px] font-bold text-gray-400 mb-3.5">{(data as SubCard).titleEn}</p>
          <h4 className="text-sm font-black text-gray-900 mb-2.5">체크 리스트</h4>
          <div className="flex flex-col gap-2 mb-4">
            {(data as SubCard).checklist.map((item, i) => (
              <label key={i} className="flex items-start gap-2 cursor-pointer text-[12.5px] leading-relaxed text-gray-700">
                <input type="checkbox" checked={checkStates[i] || false}
                  onChange={() => onCheck(i)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0"
                  style={{ accentColor: color }} />
                <span style={{
                  textDecoration: checkStates[i] ? 'line-through' : 'none',
                  opacity: checkStates[i] ? 0.5 : 1,
                }}>{item}</span>
              </label>
            ))}
          </div>

          {/* 전략 작성하기 버튼 */}
          {onOpenActivity && (
            <button onClick={(e) => { e.stopPropagation(); onOpenActivity(); }}
              className="w-full py-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition"
              style={{
                background: hasResponse ? `${color}15` : color,
                border: hasResponse ? `1.5px solid ${color}` : 'none',
                color: hasResponse ? color : '#fff',
              }}>
              {hasResponse ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  작성 완료 · 수정하기
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg>
                  전략 작성하기
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}
