# 디지털무역 전략카드 웹앱

CONNECT AI × 동구고등학교 · 디지털무역 전략구축 체험형 카드 게임

## 빠른 시작

### 1. Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com)에서 새 프로젝트 생성
2. **SQL Editor**에서 `supabase/migrations/001_initial.sql` 내용 전체를 복사하여 실행
3. **Storage**에서 `card-images` 이름의 **Public** 버킷 생성
4. **Settings > API**에서 `Project URL`과 `anon public` 키를 복사

### 2. 로컬 개발

```bash
# 프로젝트 클론
git clone https://github.com/YOUR_USERNAME/digital-trade-cards.git
cd digital-trade-cards

# 의존성 설치
npm install

# 환경변수 설정
cp .env.local.example .env.local
# .env.local 파일을 열어 Supabase URL과 ANON KEY 입력

# 개발 서버 시작
npm run dev
```

http://localhost:3000 에서 확인

### 3. Railway 배포

1. [railway.app](https://railway.app)에서 GitHub 연동
2. 이 레포지토리 선택
3. 환경변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL` = Supabase 프로젝트 URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Supabase anon key
4. Deploy 클릭 → 자동 빌드/배포

railway.json이 이미 설정되어 있어 별도 설정 불필요.

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 랜딩 (로그인/회원가입/팀설정)
│   ├── globals.css         # 글로벌 스타일
│   └── dashboard/
│       └── page.tsx        # 메인 카드 덱 화면
├── components/
│   ├── CardFront.tsx       # 카드 앞면
│   ├── CardBack.tsx        # 카드 뒷면 (체크리스트)
│   └── ActivitySheet.tsx   # 응답 입력 폼 (Step 3)
├── data/
│   └── cardData.ts         # 64장 카드 데이터
├── hooks/
│   ├── useAuth.ts          # 인증 + 팀 관리
│   └── useCardData.ts      # 카드 응답 저장/불러오기
├── lib/
│   └── supabase.ts         # Supabase 클라이언트
└── types/
    └── index.ts            # TypeScript 타입
```

## 주요 기능

- 64장 카드 (16주제 × 4장) 전체 데이터 포함
- 3D 카드 뒤집기 + 스와이프 네비게이션
- 체크리스트 인터랙션
- 응답 입력 폼 (텍스트 + 이미지)
- Supabase Auth 기반 로그인
- 팀 생성/참여 (초대 코드)
- 팀별 응답 DB 저장/불러오기
- RLS 기반 데이터 보안

## 파일 크기 제한

모든 소스 파일은 1,000줄 이내로 분할되어 있습니다.

## 라이선스

© 2025 CONNECT AI. All Rights Reserved.
