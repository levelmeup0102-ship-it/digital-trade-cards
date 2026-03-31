'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { CARD_COLORS } from '@/data/cardData';

export default function Home() {
  const { user, profile, team, loading, signIn, signUp, createTeam, joinTeam } = useAuth();
  const [mode, setMode] = useState<'landing' | 'login' | 'register' | 'team'>('landing');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [teamMode, setTeamMode] = useState<'create' | 'join'>('create');
  const [isLoading, setIsLoading] = useState(false);

  const makeEmail = (id: string) => {
    const clean = id.replace(/\s/g, '').toLowerCase();
    return clean.includes('@') ? clean : clean + '@student.local';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (user && profile && team) {
    if (typeof window !== 'undefined') window.location.href = '/dashboard';
    return null;
  }

  if (user && profile && !team) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-black text-white mb-2 text-center">팀 설정</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            {profile.name}님, 팀을 만들거나 참여하세요
          </p>
          <div className="flex gap-2 mb-6">
            <button onClick={() => setTeamMode('create')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
                teamMode === 'create' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
              }`}>팀 만들기</button>
            <button onClick={() => setTeamMode('join')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
                teamMode === 'join' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
              }`}>팀 참여</button>
          </div>
          {teamMode === 'create' ? (
            <div>
              <input value={teamName} onChange={e => setTeamName(e.target.value)}
                placeholder="팀 이름 (예: 글로벌 드림팀)"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm mb-3 focus:border-cyan-400 transition" />
              <button onClick={async () => {
                try { setError(''); await createTeam(teamName); window.location.href = '/'; }
                catch (e: any) { setError(e.message); }
              }} disabled={!teamName.trim()}
                className="w-full py-3 bg-cyan-500 text-white font-bold rounded-xl disabled:opacity-40 transition">
                팀 만들기
              </button>
            </div>
          ) : (
            <div>
              <input value={joinCode} onChange={e => setJoinCode(e.target.value)}
                placeholder="참여 코드 6자리 입력"
                maxLength={6}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm mb-3 focus:border-cyan-400 transition text-center tracking-widest text-lg" />
              <button onClick={async () => {
                try { setError(''); await joinTeam(joinCode); window.location.href = '/'; }
                catch (e: any) { setError(e.message); }
              }} disabled={joinCode.length < 4}
                className="w-full py-3 bg-cyan-500 text-white font-bold rounded-xl disabled:opacity-40 transition">
                팀 참여하기
              </button>
            </div>
          )}
          {error && <p className="text-red-400 text-xs mt-3 text-center">{error}</p>}
        </div>
      </div>
    );
  }

  if (mode === 'login' || mode === 'register') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <div className="w-full max-w-sm">
          <button onClick={() => { setMode('landing'); setError(''); }} className="text-gray-500 text-sm mb-6 block">&larr; 돌아가기</button>
          <h2 className="text-xl font-black text-white mb-6">
            {mode === 'login' ? '로그인' : '회원가입'}
          </h2>

          {mode === 'register' && (
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="이름 (예: 정한영)"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm mb-3 focus:border-cyan-400 transition" />
          )}

          <input value={userId} onChange={e => setUserId(e.target.value)}
            placeholder="아이디 (영문, 예: hanrong0421)"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm mb-3 focus:border-cyan-400 transition" />

          <input value={password} onChange={e => setPassword(e.target.value)}
            type="password" placeholder="비밀번호 (6자 이상)"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm mb-3 focus:border-cyan-400 transition" />

          <button onClick={async () => {
            try {
              setError('');
              setIsLoading(true);
              const email = makeEmail(userId);
              if (mode === 'register') {
                await signUp(email, password, name || userId);
              } else {
                await signIn(email, password);
              }
              window.location.href = '/';
            } catch (e: any) {
              setError(e.message);
            } finally {
              setIsLoading(false);
            }
          }} disabled={!userId.trim() || !password.trim() || isLoading}
            className="w-full py-3 bg-cyan-500 text-white font-bold rounded-xl mt-2 transition hover:bg-cyan-600 disabled:opacity-50">
            {isLoading ? '처리 중...' : (mode === 'login' ? '로그인' : '가입하기')}
          </button>

          {error && <p className="text-red-400 text-xs mt-3 text-center">{error}</p>}

          <p className="text-gray-600 text-xs mt-4 text-center">
            {mode === 'login' ? '계정이 없나요? ' : '이미 계정이 있나요? '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-cyan-400 underline">
              {mode === 'login' ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 text-center max-w-md">
        <p className="text-[10px] tracking-[4px] text-gray-500 uppercase mb-2">Connect AI</p>
        <h1 className="text-3xl font-black text-white mb-3 leading-tight">
          디지털무역<br />전략카드
        </h1>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          카드게임으로 쉽게 진출전략을 만들어 보세요.<br />
          16개 주제, 64장의 전략 카드가 준비되어 있습니다.
        </p>
        <div className="flex justify-center gap-3 mb-10">
          {['01', '02', '03', '04', '05'].map((id, i) => (
            <div key={id} className="w-12 h-16 rounded-lg flex items-center justify-center text-white text-xs font-black shadow-lg"
              style={{
                background: CARD_COLORS[id].bg,
                transform: `rotate(${(i - 2) * 6}deg)`,
                boxShadow: `0 4px 16px ${CARD_COLORS[id].bg}44`,
              }}>
              {id}
            </div>
          ))}
        </div>
        <button onClick={() => setMode('login')}
          className="w-full py-4 bg-cyan-500 text-white font-bold rounded-2xl text-base shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-600 mb-3">
          로그인
        </button>
        <button onClick={() => setMode('register')}
          className="w-full py-4 bg-gray-800 text-gray-300 font-bold rounded-2xl text-base border border-gray-700 transition hover:bg-gray-700">
          새 계정 만들기
        </button>
        <p className="text-gray-600 text-[10px] mt-8">
          © 2025 CONNECT AI · 동구고등학교
        </p>
      </div>
    </div>
  );
}
