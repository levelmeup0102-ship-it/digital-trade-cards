export interface CardColor {
  bg: string;
  name: string;
}

export interface SubCard {
  id: string;
  title: string;
  titleEn: string;
  difficulty: number;
  question: string;
  checklist: string[];
}

export interface TopicCard {
  id: string;
  title: string;
  titleEn: string;
  difficulty: number;
  overview: string;
  insightQ: string;
  subs: SubCard[];
}

export interface FlatCard {
  type: 'topic' | 'question';
  data: TopicCard | SubCard;
  parentId: string;
}

export interface CardResponse {
  texts: Record<number, string>;
  images: Record<number, { name: string; url: string }>;
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  school: string;
  team_id: string | null;
  role: 'student' | 'teacher' | 'admin';
}

export interface Team {
  id: string;
  name: string;
  join_code: string;
  product_name: string | null;
  product_description: string | null;
}

export interface CardProgressRow {
  id: string;
  team_id: string;
  card_id: string;
  checklist_status: Record<string, boolean>;
  completed: boolean;
}

export interface CardResponseRow {
  id: string;
  team_id: string;
  card_id: string;
  texts: Record<string, string>;
  images: Record<string, { name: string; url: string }>;
  created_by: string;
}
