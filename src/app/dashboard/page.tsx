'use client';
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCardData } from '@/hooks/useCardData';
import { ALL_CARDS, CARD_COLORS, TOPICS } from '@/data/cardData';
import CardFront from '@/components/CardFront';
import CardBack from '@/components/CardBack';
import ActivitySheet from '@/components/ActivitySheet';
import type { SubCard } from '@/types';

export default function Dashboard() {
  const { user, profile, team, loading: authLoading, signOut } = useAuth();
  const { responses, checkStates, saveResponse, toggleCheck, hasResponse } = useCardData(team?.id ?? null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const card = ALL_CARDS[currentIndex];
  const color = CARD_COLORS[card.parentId].bg;
  const currentTopicIdx = TOPICS.findIndex(t => t.id === card.parentId);
  const currentChecks = checkStates[card.data.id] || {};

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      if (typeof window !== 'undefined') window.location.href = '/';
    }
  }, [authLoading, user]);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < ALL_CARDS.length) {
      setCurrentIndex(idx);
      setIsFlipped(false);
      setSwipeOffset(0);
    }
  }, []);

  const handleCheck = (i: number) => toggleCheck(card.data.id, i);

  const handleSaveResponse = (data: any) => {
    saveResponse(card.data.id, data);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setSwipeOffset(e.touches[0].clientX - touchStart);
  };
  const onTouchEnd = () => {
    if (Math.abs(swipeOffset) > 60) {
      if (swipeOffset < 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
    }
    setSwipeOffset(0);
    setTouchStart(null);
  };

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showActivity) return;
      if (e.key === 'ArrowRight') goTo(currentIndex + 1);
      if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setIsFlipped(f => !f); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIndex, goTo, showActivity]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-[#1a1a2e] to-[#16213e] flex flex-col items-center px-4 py-5 relative overflow-hidden font-pretendard">
      {/* Background glow */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none transition-all duration-500"
        style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)` }} />

      {/* Header */}
      <div className="w-full max-w-md mb-4 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[10px] tracking-[3px] text-gray-500 uppercase">Connect AI</p>
            <h1 className="text-base font-extrabold text-white">디지털무역 전략카드</h1>
          </div>
          <div className="flex items-center gap-2">
            {team && (
              <span className="text-[10px] text-gray-500 bg-gray-800/50 px-2 py-1 rounded-md">
                {team.name} · {team.join_code}
              </span>
            )}
            <button onClick={() => setShowList(!showList)}
              className="bg-white/10 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-gray-300 backdrop-blur-sm hover:bg-white/15 transition">
              {showList ? '닫기' : '목록'}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-500 min-w-[50px]">{currentIndex + 1} / {ALL_CARDS.length}</span>
          <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / ALL_CARDS.length) * 100}%`, background: color }} />
          </div>
        </div>

        {/* Topic pills */}
        <div className="flex gap-1 mt-2.5 overflow-x-auto no-scrollbar pb-1">
          {TOPICS.map((t, i) => (
            <button key={t.id} onClick={() => goTo(ALL_CARDS.findIndex(c => c.data.id === t.id))}
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all"
              style={{
                background: currentTopicIdx === i ? CARD_COLORS[t.id].bg : 'rgba(255,255,255,0.08)',
                border: currentTopicIdx === i ? `2px solid ${CARD_COLORS[t.id].bg}` : '1px solid rgba(255,255,255,0.1)',
                color: currentTopicIdx === i ? '#fff' : '#888',
                boxShadow: currentTopicIdx === i ? `0 0 12px ${CARD_COLORS[t.id].bg}44` : 'none',
              }}>
              {t.id}
            </button>
          ))}
        </div>
      </div>

      {/* Card List Overlay */}
      {showList && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xl z-[100] overflow-y-auto p-4 pt-16">
          <button onClick={() => setShowList(false)}
            className="fixed top-4 right-4 bg-white/15 rounded-lg px-4 py-2 text-white text-sm z-10">닫기</button>
          <h2 className="text-lg font-extrabold text-white mb-4">전체 카드 목록</h2>
          {TOPICS.map((topic) => (
            <div key={topic.id} className="mb-4">
              <button onClick={() => { goTo(ALL_CARDS.findIndex(c => c.data.id === topic.id)); setShowList(false); }}
                className="w-full text-left rounded-xl p-3 mb-1.5 transition hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${CARD_COLORS[topic.id].bg}44` }}>
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-extrabold"
                    style={{ background: CARD_COLORS[topic.id].bg }}>{topic.id}</span>
                  <div>
                    <div className="text-sm font-extrabold text-white">{topic.title}</div>
                    <div className="text-[11px] text-gray-500">{topic.titleEn}</div>
                  </div>
                </div>
              </button>
              <div className="flex gap-1.5 pl-10">
                {topic.subs.map((sub) => (
                  <button key={sub.id} onClick={() => { goTo(ALL_CARDS.findIndex(c => c.data.id === sub.id)); setShowList(false); }}
                    className="rounded-md px-2.5 py-1 text-[11px] flex items-center gap-1 transition hover:bg-white/10"
                    style={{
                      background: hasResponse(sub.id) ? `${CARD_COLORS[topic.id].bg}22` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${hasResponse(sub.id) ? CARD_COLORS[topic.id].bg + '55' : 'rgba(255,255,255,0.08)'}`,
                      color: hasResponse(sub.id) ? CARD_COLORS[topic.id].bg : '#aaa',
                    }}>
                    {hasResponse(sub.id) && <span className="text-[9px]">&#10003;</span>}
                    {sub.id}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Card Area */}
      <div className="w-full max-w-[340px] relative z-10 cursor-pointer"
        style={{ aspectRatio: '70/95', perspective: 1200 }}
        onClick={() => !showActivity && setIsFlipped(f => !f)}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>

        {/* Stacked cards */}
        {[2, 1].map(offset => (
          <div key={offset} className="absolute rounded-2xl border border-white/5"
            style={{
              top: offset * 4, left: offset * 3, right: -offset * 3, bottom: -offset * 4,
              background: 'rgba(255,255,255,0.03)',
              transform: `rotate(${offset * 1.5}deg)`,
            }} />
        ))}

        {/* Flip card */}
        <div className="w-full h-full relative card-flip"
          style={{ transform: `rotateY(${isFlipped ? 180 : 0}deg) translateX(${swipeOffset * 0.3}px)`,
            transition: touchStart ? 'none' : undefined }}>
          <div className="card-face"><CardFront card={card} /></div>
          <div className="card-face card-face-back">
            <CardBack card={card} checkStates={currentChecks} onCheck={handleCheck}
              onOpenActivity={() => setShowActivity(true)} hasResponse={hasResponse(card.data.id)} />
          </div>
        </div>
      </div>

      {/* Hint text */}
      <p className="text-[11px] text-gray-600 mt-3 text-center relative z-10">
        {isFlipped ? (card.type === 'question' ? '전략 작성하기 버튼 클릭' : '뒷면 보는 중') : '탭하여 뒤집기'} · 스와이프로 이동
      </p>

      {/* Navigation */}
      <div className="flex gap-3 items-center mt-2 relative z-10">
        <button onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg border border-white/10 transition disabled:opacity-30"
          style={{ background: currentIndex === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.12)' }}>
          ‹
        </button>
        <div className="text-center min-w-[160px]">
          <div className="text-[13px] font-bold text-white">{card.data.title}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">
            {card.type === 'topic' ? '주제카드' : '질문카드'} · 난이도 {'●'.repeat(card.data.difficulty)}{'○'.repeat(5 - card.data.difficulty)}
          </div>
        </div>
        <button onClick={() => goTo(currentIndex + 1)} disabled={currentIndex === ALL_CARDS.length - 1}
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition disabled:opacity-30"
          style={{
            background: currentIndex === ALL_CARDS.length - 1 ? 'rgba(255,255,255,0.05)' : color,
            boxShadow: currentIndex < ALL_CARDS.length - 1 ? `0 4px 16px ${color}44` : 'none',
          }}>
          ›
        </button>
      </div>

      {/* Sub-card quick nav */}
      <div className="flex items-center gap-1.5 mt-4 relative z-10">
        {TOPICS[currentTopicIdx] && (
          <>
            <button onClick={() => goTo(ALL_CARDS.findIndex(c => c.data.id === TOPICS[currentTopicIdx].id))}
              className="px-2.5 py-1 rounded-md text-[10px] font-bold text-white transition"
              style={{
                background: card.data.id === TOPICS[currentTopicIdx].id ? color : 'rgba(255,255,255,0.06)',
                border: `1px solid ${card.data.id === TOPICS[currentTopicIdx].id ? color : 'rgba(255,255,255,0.1)'}`,
              }}>주제</button>
            {TOPICS[currentTopicIdx].subs.map((sub, i) => (
              <button key={sub.id} onClick={() => goTo(ALL_CARDS.findIndex(c => c.data.id === sub.id))}
                className="px-2.5 py-1 rounded-md text-[10px] font-bold text-white transition"
                style={{
                  background: card.data.id === sub.id ? color : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${card.data.id === sub.id ? color : 'rgba(255,255,255,0.1)'}`,
                }}>{i + 1}</button>
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-[10px] text-gray-700 text-center relative z-10">
        © 2025 CONNECT AI · 동구고등학교
        {profile && (
          <button onClick={signOut} className="ml-3 text-gray-600 underline hover:text-gray-400 transition">로그아웃</button>
        )}
      </div>

      {/* Activity Sheet */}
      {showActivity && card.type === 'question' && (
        <ActivitySheet card={card} responses={responses[card.data.id]}
          checkStates={currentChecks} onCheck={handleCheck}
          onSave={handleSaveResponse} onClose={() => setShowActivity(false)} />
      )}

      {/* Toast */}
      {savedToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#1a1a2e] border border-white/15 rounded-xl px-5 py-2.5 z-[300] flex items-center gap-2 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          <span className="text-[13px] text-white font-semibold">응답이 저장되었습니다</span>
        </div>
      )}
    </div>
  );
}
