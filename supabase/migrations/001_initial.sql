-- ============================================
-- 디지털무역 전략카드 웹앱 - 초기 DB 스키마
-- Supabase SQL Editor에서 실행하세요
-- ============================================

-- 1. 팀 테이블
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL DEFAULT substr(md5(random()::text), 1, 6),
  product_name TEXT,
  product_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 프로필 테이블 (Supabase Auth 연동)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT NOT NULL,
  school TEXT DEFAULT '동구고등학교',
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 카드 진행 상태
CREATE TABLE IF NOT EXISTS card_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  checklist_status JSONB DEFAULT '{}',
  completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, card_id)
);

-- 4. 카드 응답 (학생 입력)
CREATE TABLE IF NOT EXISTS card_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  texts JSONB DEFAULT '{}',
  images JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, card_id)
);

-- 5. AI 추천 결과 (카드 09용, Phase 3)
CREATE TABLE IF NOT EXISTS ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  input_summary JSONB,
  recommendation TEXT,
  strategy_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_responses ENABLE ROW LEVEL SECURITY;

-- 프로필: 본인 읽기/수정, 같은 팀원 읽기
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_select_team" ON profiles
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 팀: 팀원만 읽기, 누구나 생성
CREATE POLICY "teams_select_member" ON teams
  FOR SELECT USING (
    id IN (SELECT team_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "teams_insert" ON teams
  FOR INSERT WITH CHECK (true);

CREATE POLICY "teams_update_member" ON teams
  FOR UPDATE USING (
    id IN (SELECT team_id FROM profiles WHERE id = auth.uid())
  );

-- 카드 진행: 같은 팀만
CREATE POLICY "progress_team" ON card_progress
  FOR ALL USING (
    team_id IN (SELECT team_id FROM profiles WHERE id = auth.uid())
  );

-- 카드 응답: 같은 팀만
CREATE POLICY "responses_team" ON card_responses
  FOR ALL USING (
    team_id IN (SELECT team_id FROM profiles WHERE id = auth.uid())
  );

-- ============================================
-- 트리거: updated_at 자동 갱신
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER card_progress_updated
  BEFORE UPDATE ON card_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER card_responses_updated
  BEFORE UPDATE ON card_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- 새 유저 가입 시 프로필 자동 생성
-- ============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- Storage 버킷 (이미지 업로드용)
-- ============================================
-- Supabase Dashboard > Storage에서 'card-images' 버킷을 
-- Public으로 생성하세요.
