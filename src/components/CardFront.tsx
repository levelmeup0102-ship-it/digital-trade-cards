'use client';
import { CARD_COLORS } from '@/data/cardData';
import type { FlatCard, TopicCard, SubCard } from '@/types';

function GridPattern({ color, isTopic }: { color: string; isTopic: boolean }) {
  return (
    <div className="grid grid-cols-4 gap-1 w-full">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="aspect-square rounded"
          style={{ background: isTopic ? '#ccc' : color, opacity: isTopic ? 0.4 : 0.85 }} />
      ))}
    </div>
  );
}

export default function CardFront({ card }: { card: FlatCard }) {
  const color = CARD_COLORS[card.parentId].bg;
  const isTopic = card.type === 'topic';
  const data = card.data;

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 bg-white rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden">
      <div className="relative z-[1]">
        <div className="absolute -top-1 -left-1 w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-base z-[2]"
          style={{ background: color, boxShadow: `0 4px 12px ${color}66` }}>
          {card.parentId}
        </div>
        <div className="ml-11">
          <GridPattern color={color} isTopic={isTopic} />
        </div>
      </div>
      <div className="mt-4">
        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold mb-2"
          style={{ border: `1.5px solid ${color}`, color }}>
          {data.id}. 질문카드
        </span>
        {isTopic ? (
          <>
            <h3 className="text-lg font-black text-gray-900 leading-tight">{(data as TopicCard).title}</h3>
            <p className="text-[13px] font-extrabold text-gray-400 leading-tight">{(data as TopicCard).titleEn}</p>
          </>
        ) : (
          <h3 className="text-[15px] font-black text-gray-900 leading-snug">
            {(data as SubCard).question}
          </h3>
        )}
      </div>
    </div>
  );
}
