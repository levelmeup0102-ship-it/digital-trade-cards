import type { CardColor, TopicCard, FlatCard } from '@/types';

export const CARD_COLORS: Record<string, CardColor> = {
  "01": { bg: "#00BCD4", name: "시안" },
  "02": { bg: "#1A237E", name: "네이비" },
  "03": { bg: "#009688", name: "틸" },
  "04": { bg: "#6A1B9A", name: "퍼플" },
  "05": { bg: "#F9A825", name: "앰버" },
  "06": { bg: "#546E7A", name: "슬레이트" },
  "07": { bg: "#4CAF50", name: "그린" },
  "08": { bg: "#880E4F", name: "마룬" },
  "09": { bg: "#E53935", name: "레드" },
  "10": { bg: "#00838F", name: "틸다크" },
  "11": { bg: "#00695C", name: "틸딥" },
  "12": { bg: "#4E342E", name: "브라운" },
  "13": { bg: "#E64A19", name: "오렌지" },
  "14": { bg: "#1565C0", name: "블루" },
  "15": { bg: "#2E7D32", name: "그린다크" },
  "16": { bg: "#1976D2", name: "블루라이트" },
};


export const TOPICS: TopicCard[] = [
  {
    id: "01", title: "시장 개요 및 정의", titleEn: "Market Overview & Definition", difficulty: 2,
    overview: "이 카드는 우리 제품이 속한 시장(산업)을 정의하고, 고객이 우리 제품을 언제, 왜 필요로 하는지를 이해하는 단계입니다.",
    insightQ: "우리 제품은 어떤 시장(산업)에 속하며, 고객은 어떤 이유로 우리를 선택할까?",
    subs: [
      { id: "01-1", title: "산업 코드와 포지셔닝", titleEn: "Industry Classification & Positioning", difficulty: 2,
        question: "수출할 때 사용되는 코드는 무엇이고, 우리 제품은 어떤 산업에 속할까?",
        checklist: ["우리 제품에 맞는 산업명을 찾아봤나요?","수출할 때 필요한 HS코드(품목분류)를 확인했나요?","같은 코드 내 대표 경쟁사를 조사했나요?","이 코드가 우리 제품의 인증·관세·유통에 어떤 영향을 주는지 정리했나요?"] },
      { id: "01-2", title: "JTBD 기반 고객 세그먼트", titleEn: "Jobs-to-be-Done Customer Segmentation", difficulty: 3,
        question: "고객은 언제, 왜 우리 제품을 필요로 할까?",
        checklist: ["고객이 우리 제품을 사용하는 상황을 2~3가지로 나눠봤나요?","각 상황에서 고객이 느끼는 불편함을 적었나요?","고객이 우리 제품을 선택하는 이유를 한문장으로 정리했나요?","비슷한 고객끼리 3개 그룹으로 정리했나요?"] },
      { id: "01-3", title: "시장 구조 & 플랫폼 흐름", titleEn: "Market Structure & Platform Flow", difficulty: 4,
        question: "우리 제품은 어떤 단계에서 사람들에게 소개되거나 팔리면 가장 좋을까?",
        checklist: ["생산→유통→판매→소비자 흐름을 간단히 그려봤나요?","우리 제품이 홍보되면 가장 효과적인 단계는?","그 단계에서 함께할 파트너를 적었나요?","작게 시도해볼 실험(PoC) 아이디어를 떠올려봤나요?"] },
    ]
  },
  {
    id: "02", title: "시장 규모 및 성장 전망", titleEn: "Market Size & Growth Outlook", difficulty: 3,
    overview: "이 카드는 우리가 속한 산업의 규모와 성장 가능성을 이해하는 단계입니다. 시장의 크기와 성장률을 통해 우리 산업의 기회와 방향을 파악할 수 있습니다.",
    insightQ: "우리 산업의 시장은 지금 얼마나 크며, 앞으로 어디까지 성장할 수 있을까요?",
    subs: [
      { id: "02-1", title: "시장 규모 분석", titleEn: "Market Size Analysis", difficulty: 2,
        question: "지금 우리 산업의 시장 규모는 얼마나 될까?",
        checklist: ["최근 3~5년 기준 글로벌 시장 규모를 찾아봤나요?","출처를 함께 표기했나요?","연평균 성장률(CAGR)을 계산하거나 인용했나요?","우리 제품이 속한 세부 시장을 한 줄로 정리했나요?"] },
      { id: "02-2", title: "성장 동인 분석", titleEn: "Growth Drivers", difficulty: 3,
        question: "우리 산업이 성장하는 이유는 무엇인가요?",
        checklist: ["산업의 성장을 이끄는 주요 요인을 3가지 이상 정리했나요?","기술·소비습관·정책·환경 등 다양한 요인을 포함했나요?","ESG, 디지털 전환 등 사회적 흐름을 고려했나요?","그 요인이 우리 제품과 어떻게 연결되는지 표현했나요?"] },
      { id: "02-3", title: "미래 성장 전망", titleEn: "Future Outlook", difficulty: 3,
        question: "앞으로 이 시장은 어떤 방향으로 성장할까요?",
        checklist: ["향후 3~5년 시장 성장률(CAGR)을 명시했나요?","가장 빠르게 성장할 나라를 정했나요?","ESG·디지털화·AI 등 미래 트렌드를 포함했나요?","우리가 진출할 수 있는 새로운 기회를 한 줄로 제시했나요?"] },
    ]
  },
  {
    id: "03", title: "시장 세분화 분석", titleEn: "Market Segmentation Analysis", difficulty: 3,
    overview: "이 카드는 시장에서 우리 제품과 가장 잘 맞는 고객 그룹을 찾는 단계입니다. 먼저 반응할 가능성이 높은 고객을 찾는 것이 중요합니다.",
    insightQ: "시장 중, 우리 제품을 가장 먼저 찾을 고객은 누구일까? 왜 우리를 선택할까?",
    subs: [
      { id: "03-1", title: "세분화 기준 설정", titleEn: "Setting Segmentation Criteria", difficulty: 2, question: "시장을 나누면 어떤 차이와 기회를 발견할 수 있을까?",
        checklist: ["시장을 나눌 수 있는 2~3가지 기준을 적었나요?","각 기준별로 고객의 특징을 한 줄로 정리했나요?","고객의 행동·관심·구매 이유의 차이가 보이나요?","그 차이가 우리 제품 전략에 어떤 기회를 줄 수 있나요?"] },
      { id: "03-2", title: "핵심 세그먼트 선정", titleEn: "Identifying Core Segment", difficulty: 3, question: "여러 고객 그룹 중, 우리 제품에 가장 잘 맞는 고객은 누구일까?",
        checklist: ["최소 3개의 고객 그룹을 구분했나요?","각 그룹의 크기와 구매력을 비교했나요?","우리 제품과 가장 잘 맞는 그룹을 표시했나요?","그 그룹이 우리 제품을 선택할 이유를 한 줄로 적었나요?"] },
      { id: "03-3", title: "타깃 전략 구체화", titleEn: "Targeting Strategy", difficulty: 4, question: "선택한 고객에게 어떤 방법으로 다가가면 관심을 가질까?",
        checklist: ["고객이 관심을 가지는 주제나 문제를 정리했나요?","맞는 홍보·판매 채널을 정했나요?","전달할 메시지나 표현을 구상했나요?","작게 시도해볼 캠페인 아이디어를 적었나요?"] },
    ]
  },
  {
    id: "04", title: "경쟁환경 분석", titleEn: "Competitive Landscape & Differentiation", difficulty: 3,
    overview: "이 카드는 우리가 속한 시장의 주요 경쟁자를 파악하고, 그들과 비교해 우리만의 강점(차별화 포인트)을 찾는 단계입니다.",
    insightQ: "우리는 누구와 경쟁하고 있으며, 어떤 점에서 차별화할 수 있을까?",
    subs: [
      { id: "04-1", title: "경쟁자 리스트업", titleEn: "Competitor Identification", difficulty: 2, question: "우리 시장에서 경쟁하고 있는 주요 기업은 누구일까?",
        checklist: ["우리 산업과 유사한 제품·서비스를 제공하는 기업 2~3곳을 찾았나요?","각 기업의 대표 제품명 또는 브랜드를 정리했나요?","주요 시장(국내/해외)을 구분했나요?","공신력 있는 출처에서 정보를 확인했나요?"] },
      { id: "04-2", title: "경쟁 구조 분석", titleEn: "Market Structure & Business Model", difficulty: 3, question: "경쟁사들은 어떤 방식으로 고객을 확보하고, 어떤 수익 구조로 운영될까?",
        checklist: ["각 경쟁사의 핵심 수익 구조를 정리했나요?","고객 확보 방식을 파악했나요?","파트너사·협업 모델 등 차별적 요소를 구분했나요?","경쟁사들의 공통된 성공요인을 한 줄로 요약했나요?"] },
      { id: "04-3", title: "차별화 전략 수립", titleEn: "Building Differentiation Strategy", difficulty: 4, question: "우리 제품은 경쟁사와 어떤 점에서 다를까?",
        checklist: ["우리 제품이 제공하는 핵심 가치를 한 문장으로 표현했나요?","경쟁사 대비 강점 2가지, 약점 1가지를 명확히 구분했나요?","차별화 요소를 구체적으로 제시했나요?","차별화 전략을 실행할 수 있는 행동 아이디어를 적었나요?"] },
    ]
  },
  {
    id: "05", title: "시장 동향 및 기회 요인 분석", titleEn: "Market Trends & Opportunity Analysis", difficulty: 3,
    overview: "이 카드는 시장에서 일어나는 정책·기술·소비 변화를 관찰하고, 그 안에서 우리가 대응할 새로운 기회 요인을 찾는 단계입니다.",
    insightQ: "시장이 빠르게 변하는 지금, 그 변화 속에서 우리가 잡을 수 있는 기회는 무엇일까?",
    subs: [
      { id: "05-1", title: "시장 변화 감지", titleEn: "Detecting Market Changes", difficulty: 2, question: "최근의 규제·기술·소비 변화가 우리 제품의 수출 타이밍이나 방향에 어떤 영향을 줄까?",
        checklist: ["최근 1~2년간 시장에서 주목받는 변화를 찾아봤나요?","이 변화가 우리 산업에 긍정적/부정적 영향을 주는 부분은?","고객의 구매 패턴이 이전과 달라진 점은?","변화가 일시적인 현상인지, 장기 트렌드인지 구분했나요?"] },
      { id: "05-2", title: "기회 요인 식별", titleEn: "Identifying Opportunities", difficulty: 3, question: "이 변화 속에서, 우리 산업에는 어떤 새로운 기회가 생길 수 있을까?",
        checklist: ["시장 변화가 만들어낸 새로운 수요나 틈새시장을 찾았나요?","그 기회가 나타나는 지역·고객·산업 분야를 정리했나요?","우리 제품이 그 기회를 활용할 수 있는 강점을 적었나요?","함께할 수 있는 협력사·파트너 후보를 조사했나요?"] },
      { id: "05-3", title: "변화 대응 전략", titleEn: "Strategy for Adapting to Change", difficulty: 4, question: "변화와 기회를 전략적으로 활용하려면 우리는 무엇을 조정하거나 새로 시도해야 할까?",
        checklist: ["현재 마케팅·판매 전략에서 즉시 조정할 부분은?","시장 변화를 검증하기 위한 작은 실험(PoC) 아이디어를 적었나요?","시장 데이터를 주기적으로 분석하거나 공유하는 체계가 있나요?","외부 파트너와 협력하거나 정보 교류할 수 있는 방법을 생각했나요?"] },
    ]
  },
  {
    id: "06", title: "규제 및 정책 환경 분석", titleEn: "Regulatory & Policy Environment Analysis", difficulty: 4,
    overview: "이 카드는 우리가 진출하려는 국가나 시장의 규제·정책 환경을 이해하는 단계입니다. 수출 절차, 인증 제도, 통관 기준 같은 규제를 파악하면 리스크를 줄이고 준비할 수 있는 힘이 생깁니다.",
    insightQ: "진출하려는 시장에서 마주할 규제는 무엇이며, 그 안에서 우리가 활용할 수 있는 협상 여지는 어디에 있을까?",
    subs: [
      { id: "06-1", title: "규제 요건 파악", titleEn: "Identify Key Regulatory Requirements", difficulty: 3, question: "우리가 진출하려는 시장에는 어떤 규제나 인증 제도가 있을까?",
        checklist: ["주요 법·제도(수입 인증, 안전 기준, 세관 절차 등)를 찾아봤나요?","필요한 인증서나 서류를 정리했나요?","미비한 정보도 함께 기록했나요?","규제 기관과 관련 부서를 함께 확인했나요?"] },
      { id: "06-2", title: "정책 변화 분석", titleEn: "Policy Trends & Shifts", difficulty: 4, question: "최근 3년간, 이 시장의 정책·규제 환경은 어떻게 바뀌었을까?",
        checklist: ["최근 3년 내 제·개정된 주요 법·정책 변화를 2~3가지 찾았나요?","인증 강화·완화, ESG, 디지털 규제 등 글로벌 트렌드를 구분했나요?","정책 변화가 우리 산업·제품에 미친 영향을 정리했나요?","앞으로 바뀔 가능성이 높은 규제 신호를 찾아봤나요?"] },
      { id: "06-3", title: "협상 및 대응 전략 수립", titleEn: "Building Negotiation & Adaptation Strategy", difficulty: 4, question: "규제를 완화하거나 우회하기 위해 우리가 활용할 수 있는 방법은 무엇일까?",
        checklist: ["규제 대응을 위한 단기 조치를 명시했나요?","정부 기관, 무역협회, 현지 파트너 등 협력 가능한 주체를 정리했나요?","FTA, 상호인정제도 등 규제 완화 제도를 조사했나요?","협상을 유리하게 이끌 수 있는 우리의 강점을 한 문장으로 표현했나요?"] },
    ]
  },
  {
    id: "07", title: "고객 인사이트 및 수요 분석", titleEn: "Customer Insight & Demand Analysis", difficulty: 4,
    overview: "이 카드는 고객이 우리 제품을 사용하고 반복 사용하는 이유를 이해하는 단계입니다. 고객의 문제(JTBD)와 감정을 알면, 지속적 관계(LTV)를 만들 수 있습니다.",
    insightQ: "고객은 무엇을 원하며, 왜 우리의 솔루션을 반복적으로 사용하게 될까?",
    subs: [
      { id: "07-1", title: "고객 정의 & JTBD 분석", titleEn: "Defining Customers & Their JTBDs", difficulty: 3, question: "우리의 고객은 누구이며, 무엇을 해결하려 할까?",
        checklist: ["주요 고객군을 3개 이상 구분했나요?","각 고객이 해결하고 싶은 일을 한 문장으로 적었나요?","구매 결정자와 실제 사용자를 구분했나요?","우리 제품이 고객의 핵심 니즈와 어떻게 연결되는지 이해했나요?"] },
      { id: "07-2", title: "감정 & 여정 분석", titleEn: "Emotion & Customer Journey Mapping", difficulty: 4, question: "고객은 어떤 감정을 느끼고, 어떤 순간이 가장 중요할까?",
        checklist: ["고객 여정을 3단계(인지→사용→반복)로 구분했나요?","각 단계에서 고객이 느끼는 감정을 정리했나요?","고객의 감정이 강하게 바뀌는 핵심 터치포인트를 표시했나요?","감정을 개선하거나 강화할 방법을 한 줄로 적었나요?"] },
      { id: "07-3", title: "재사용 & 수요 유지 전략", titleEn: "Retention & Lifetime Value Strategy", difficulty: 4, question: "고객이 우리 제품을 계속 사용하는 이유는 무엇일까?",
        checklist: ["고객이 우리 제품을 반복해서 사용하는 이유를 2가지 이상 적었나요?","그 이유가 기능적 가치인지 감정적 가치인지 구분했나요?","고객의 충성도를 높일 수 있는 구조를 구상했나요?","재사용을 촉진할 수 있는 실험 아이디어를 적었나요?"] },
    ]
  },
  {
    id: "08", title: "SWOT 분석 및 전략 도출", titleEn: "SWOT Analysis & Strategic Action Plan", difficulty: 4,
    overview: "이 카드는 지금까지의 시장·경쟁·고객 분석을 기반으로 우리의 내부 강점과 약점, 외부 기회와 위협을 정리해 실행 가능한 전략으로 연결하는 단계입니다.",
    insightQ: "우리의 강점·약점·기회·위협을 조합하면, 지금 어떤 전략을 실행해야 할까?",
    subs: [
      { id: "08-1", title: "내부 역량 파악", titleEn: "Analyzing Internal Strengths & Weaknesses", difficulty: 3, question: "우리의 강점과 약점은 무엇일까?",
        checklist: ["강점을 최소 3개 이상 구체적으로 적었나요?","약점을 명확히 했나요?","각 항목을 실제 사례나 근거와 함께 정리했나요?","약점을 개선하거나 보완할 아이디어를 적었나요?"] },
      { id: "08-2", title: "외부 요인 파악", titleEn: "Analyzing External Opportunities & Threats", difficulty: 4, question: "우리 산업의 기회와 위협은 무엇일까?",
        checklist: ["새로운 기회를 2개 이상 찾았나요?","위협 요인을 구체적으로 적었나요?","각 요인이 우리 산업에 주는 영향을 정리했나요?","기회와 위협 중 어디에 더 집중할지 표시했나요?"] },
      { id: "08-3", title: "전략 수립 및 실행 계획", titleEn: "Formulating Strategic Actions", difficulty: 5, question: "SWOT 4요소를 조합하면 우리는 어떤 전략을 세워야 할까?",
        checklist: ["강점을 활용해 기회를 잡는 전략(SO)을 적었나요?","약점을 개선하며 기회를 찾는 전략(WO)을 세웠나요?","강점을 활용해 위협을 줄이는 전략(ST)을 생각했나요?","약점을 보완하며 위협을 피하는 전략(WT)을 정리했나요?"] },
    ]
  },
  {
    id: "09", title: "전략 결론 및 AI 기반 자동 추천 제언", titleEn: "Strategic Conclusion & AI-Based Recommendation", difficulty: 5,
    overview: "이 카드는 지금까지의 분석을 바탕으로 전략적 결론을 실행 계획으로 전환하는 단계입니다. AI 분석 결과와 데이터 근거를 활용해 우선 진출국, 파트너, 실행 전략을 구체화합니다.",
    insightQ: "지금까지의 분석을 바탕으로, 우리는 어디로, 누구와, 어떻게 진출할까?",
    subs: [
      { id: "09-1", title: "우선시장 결정", titleEn: "Selecting the Priority Market", difficulty: 3, question: "지금 가장 먼저 진출해야 할 나라는 어디일까?",
        checklist: ["시장 규모·성장률·규제 난이도를 비교했나요?","PoC 성공률, 리스크, 비용 등을 함께 고려했나요?","우선 진출국 선정 기준(데이터 근거)을 명시했나요?","진출 1순위와 2순위를 정리했나요?"] },
      { id: "09-2", title: "협력 구조 설계", titleEn: "Partner & Execution Framework", difficulty: 4, question: "어떤 파트너와 협력하면 시장 진입이 가장 효과적일까?",
        checklist: ["현지 파트너(유통, OEM, JV 등) 후보를 조사했나요?","협력 방식을 구체적으로 정했나요?","각 파트너의 역할을 구분했나요?","단기(3~6개월)와 장기(1년 이상) 협력 전략을 구분했나요?"] },
      { id: "09-3", title: "AI 기반 전략 제언", titleEn: "AI-Driven Strategic Recommendation", difficulty: 5, question: "AI 분석 결과, 우리에게 가장 적합한 전략 시나리오는 무엇인가?",
        checklist: ["AI 분석을 통해 추천된 전략을 검토했나요?","OLI, Uppsala, CAGE 등 전략 중 하나를 선택했나요?","PoC 또는 파일럿을 통해 전략을 테스트할 계획이 있나요?","AI 추천 결과와 우리의 판단 차이를 명확히 기록했나요?"] },
    ]
  },
  {
    id: "10", title: "PoC 성공률 예측 분석", titleEn: "PoC Success Probability Analysis", difficulty: 5,
    overview: "PoC는 Proof of Concept의 줄임말이에요. 우리 아이디어가 실제로 시장에서 통할 수 있는지 시험해보는 과정을 말하죠. 이 카드는 여러 나라 중 PoC를 어디서 먼저 실행하면 좋을지 데이터를 근거로 판단하는 방법을 배우는 단계입니다.",
    insightQ: "여러 나라 중, PoC를 어디서 먼저 시도하면 좋을까? 그 판단은 감이 아니라 데이터로 가능할까?",
    subs: [
      { id: "10-1", title: "평가 기준 정하기", titleEn: "Setting Evaluation Criteria", difficulty: 3, question: "PoC 성공을 예측하려면 어떤 기준으로 살펴봐야 할까?",
        checklist: ["PoC 성공에 영향을 주는 요소를 5개 적었나요?","각 요소가 얼마나 중요한지 순서를 정했나요?","기준마다 점수를 매길 수 있도록 1~5단계를 정했나요?","나중에도 계속 쓸 수 있도록 표나 기록지를 만들어봤나요?"] },
      { id: "10-2", title: "데이터 비교하기", titleEn: "Comparing Data by Country", difficulty: 4, question: "후보 국가나 지역을 비교해봤을 때, 성공할 가능성이 가장 높은 곳은?",
        checklist: ["나라별로 PoC 성공률 기준에 따라 점수를 매겨봤나요?","우리가 중요하게 생각한 항목에 가중치를 줬나요?","점수를 표나 그래프로 정리했나요?","점수가 가장 높은 나라 Top3를 정했나요?"] },
      { id: "10-3", title: "PoC 우선전략 도출", titleEn: "Strategic Prioritization & Execution", difficulty: 5, question: "점수 결과를 보면, PoC를 어디서 먼저 시도하는 게 좋을까?",
        checklist: ["점수가 높은 나라를 '우선 PoC 국가'로 정했나요?","단기 PoC(테스트)와 장기 확장 단계를 구분했나요?","실행 계획(누구와, 언제, 어떻게)을 정리했나요?","실행 단계별 KPI를 정의했나요?"] },
    ]
  },
  {
    id: "11", title: "우선 진출국 및 벤치마킹 전략 제언", titleEn: "Priority Market & Benchmarking Strategy", difficulty: 4,
    overview: "이 카드는 PoC 결과와 시장 분석을 기반으로 먼저 진출할 국가를 결정하고, 그 시장의 경쟁사와 벤치마킹 전략을 구체화하는 단계입니다.",
    insightQ: "PoC 결과와 시장 정보를 종합했을 때, 가장 먼저 진출할 나라는 어디이며, 그 시장에서 어떻게 차별화할 수 있을까?",
    subs: [
      { id: "11-1", title: "우선 진출국 선정", titleEn: "Defining the Priority Market", difficulty: 3, question: "PoC 결과와 시장 데이터를 종합했을 때, 가장 먼저 진출해야 할 국가는?",
        checklist: ["후보 국가별 시장 규모·성장률·정책을 비교했나요?","PoC 허들을 평가했나요?","우선 진출국 1순위와 그 이유를 명시했나요?","데이터 근거(10번 카드 결과)를 반영했나요?"] },
      { id: "11-2", title: "벤치마킹 및 차별화 전략", titleEn: "Benchmarking & Differentiation Strategy", difficulty: 4, question: "그 시장의 경쟁 솔루션은 어떻게 작동하고, 우리는 어떻게 다를까?",
        checklist: ["현지 경쟁사의 제품·서비스 운영 방식을 조사했나요?","마케팅·유통·기술 측면의 차별화 요소를 2개 이상 정리했나요?","차별화 전략을 구체적으로 제시했나요?","정책·문화적 요인을 고려해 벤치마킹 포인트를 조정했나요?"] },
      { id: "11-3", title: "파트너·고객 확보 전략", titleEn: "Partner & Customer Acquisition Strategy", difficulty: 4, question: "해당 시장에서 어떤 파트너와 협력하면 진출이 가장 효과적일까?",
        checklist: ["각 진출국의 주요 타깃 고객군을 구분했나요?","현지 파트너 리스트를 작성했나요?","PoC 실행을 위한 초기 제안 메시지나 형식을 정했나요?","단기 제안과 장기 계약을 구분했나요?"] },
    ]
  },
  {
    id: "12", title: "나의 아이디어, 안전하게 지키기", titleEn: "Protecting Our Ideas & Brand Internationally", difficulty: 3,
    overview: "이 카드는 우리가 만든 아이디어, 기술, 이름(브랜드)을 다른 나라에서도 안전하게 보호하는 방법을 배우는 단계입니다.",
    insightQ: "내가 만든 아이디어와 이름(브랜드)은 해외에서도 안전하게 지켜질까?",
    subs: [
      { id: "12-1", title: "등록 현황 확인", titleEn: "Checking What's Protected", difficulty: 2, question: "우리의 아이디어와 브랜드는 해외에서도 등록되어 있을까?",
        checklist: ["우리 제품·서비스 이름이 해외에 등록되어 있나요?","등록 방법(특허, 상표, 디자인)을 알고 있나요?","해외에서도 등록을 도와주는 제도를 알고 있나요?","보호를 위해 도움을 줄 전문가·기관을 정했나요?"] },
      { id: "12-2", title: "아이디어 겹침 점검", titleEn: "Checking for Similar Ideas or Conflicts", difficulty: 3, question: "혹시 우리가 만든 아이디어가 이미 다른 나라에서 등록되어 있을 수도 있을까?",
        checklist: ["비슷한 제품이나 브랜드가 이미 다른 나라에서 쓰이고 있나요?","이름·로고·디자인이 겹치는 사례를 찾아봤나요?","내 아이디어가 기존 브랜드와 충돌하지 않도록 수정할 부분이 있나요?","'우리만의 차별 포인트'를 정리했나요?"] },
      { id: "12-3", title: "아이디어 보호 전략", titleEn: "Creating a Protection Plan", difficulty: 3, question: "누군가 우리 아이디어를 따라 하거나 베꼈다면 어떻게 막을 수 있을까?",
        checklist: ["내 아이디어를 지키는 방법을 알고 있나요?","협력자나 파트너와 아이디어 공유 시 주의할 점을 정리했나요?","저작권·특허 관련 지원 제도나 프로그램을 찾아봤나요?","'이건 내가 먼저 만들었다'는 증거를 보관하고 있나요?"] },
    ]
  },
  {
    id: "13", title: "온보딩 & 확장 전략", titleEn: "Onboarding & Expansion Strategy", difficulty: 2,
    overview: "이 카드는 우리가 만든 프로젝트나 아이디어를 다른 나라에서 실제로 시도하고 확장하는 단계입니다.",
    insightQ: "우리 프로젝트가 해외에서도 잘 작동하려면 누구와, 어디서, 어떤 방법으로 시작해야 할까?",
    subs: [
      { id: "13-1", title: "도움 네트워크 찾기", titleEn: "Building a Support Network", difficulty: 2, question: "우리 프로젝트를 도와줄 사람이나 기관은 누구일까?",
        checklist: ["도움을 받을 수 있는 기관을 정리했나요?","프로젝트에 관심을 가질 만한 사람을 찾았나요?","어떤 도움이 필요한지 적었나요?","연락 방법을 구체화했나요?"] },
      { id: "13-2", title: "테스트 시장 정하기", titleEn: "Choosing a Test Market", difficulty: 3, question: "우리 프로젝트를 처음 시도해볼 나라는 어디일까? 그 이유는 무엇일까?",
        checklist: ["첫 시도를 할 나라(또는 도시)를 정했나요?","현지 환경을 조사했나요?","그곳이 우리 프로젝트에 적합한 이유를 정리했나요?","학교나 기관과 함께 테스트할 기회를 찾았나요?"] },
      { id: "13-3", title: "확장 전략 만들기", titleEn: "Planning for Growth & Expansion", difficulty: 3, question: "한 나라에서 성공했다면, 다른 나라로 어떻게 확장할 수 있을까?",
        checklist: ["확장할 다음 나라를 정했나요?","다른 지역에서도 통할 수 있도록 디자인이나 내용을 조정했나요?","함께할 친구나 기관을 찾았나요?","SNS나 캠페인을 활용한 확산 아이디어를 적었나요?"] },
    ]
  },
  {
    id: "14", title: "우선 진출국 타깃기업 리스트", titleEn: "Priority Partner Targeting List", difficulty: 4,
    overview: "이 카드는 우선 진출 국가 안에서 실제 제안을 보낼 기업과 기관을 구체화하는 단계입니다.",
    insightQ: "우선 진출국에서, 우리는 어떤 기업에 먼저 제안하고 어떤 방식으로 접근해야 할까?",
    subs: [
      { id: "14-1", title: "파트너 리스트업", titleEn: "Building the Partner Database", difficulty: 3, question: "우선 진출국에서 실제로 제안을 보낼 기업은 누구일까?",
        checklist: ["PoC나 온보딩 단계에서 연결 가능한 기업·기관 5곳을 선정했나요?","각 기업의 유통 채널을 확인했나요?","실제 담당자·연락처를 확보했나요?","초기 컨택 가능성을 검토했나요?"] },
      { id: "14-2", title: "시너지 분석 및 제안 설계", titleEn: "Designing Synergy & Value Propositions", difficulty: 4, question: "우리 솔루션은 그 기업의 기술과 어떻게 시너지를 만들 수 있을까?",
        checklist: ["각 기업의 주요 제품·서비스·기술을 분석했나요?","우리 솔루션과 결합했을 때의 시너지 포인트를 정리했나요?","제안 메시지에 담을 핵심 가치를 명확히 했나요?","파트너가 얻을 이점을 포함했나요?"] },
      { id: "14-3", title: "제안 전략 수립", titleEn: "Strategic Communication & Approach Plan", difficulty: 4, question: "제안 메시지를 보낼 때, 어떤 방식과 언어로 접근하면 효과적일까?",
        checklist: ["제안 발송 시점을 고려했나요?","메시지 초안에 명확한 가치 제안이 담겼나요?","언어와 톤을 적절하게 조정했나요?","PoC나 미팅으로 이어질 Follow-up 구조를 설계했나요?"] },
    ]
  },
  {
    id: "15", title: "지속가능한 미래, 우리가 할 수 있는 일", titleEn: "SDG·ESG·CBAM", difficulty: 2,
    overview: "이 카드는 우리가 만든 아이디어나 제품이 환경과 사람에게 어떤 영향을 주는지 생각해보는 단계입니다.",
    insightQ: "우리 프로젝트는 환경과 사람 모두에게 긍정적인 영향을 주고 있을까?",
    subs: [
      { id: "15-1", title: "환경 영향 점검", titleEn: "Checking Environmental Impact", difficulty: 2, question: "우리 아이디어나 제품은 환경에 어떤 영향을 주나요?",
        checklist: ["우리 프로젝트가 환경에 주는 좋은 영향 2가지를 적었나요?","환경에 부담이 될 수 있는 부분을 찾았나요?","재활용, 절약, 친환경 대체 소재를 고려했나요?","탄소를 줄이기 위한 작은 실천 아이디어를 적었나요?"] },
      { id: "15-2", title: "사회적 가치 탐색", titleEn: "Exploring Social Value", difficulty: 2, question: "우리 아이디어는 사람과 사회에 어떤 도움을 주나요?",
        checklist: ["프로젝트가 사람들의 삶을 더 좋게 만드는 부분은?","학교·사회·다른 나라 친구들에게 어떤 도움이 될 수 있나요?","약자나 소외된 사람에게 접근 가능한가요?","우리의 아이디어가 세상을 더 나아지게 하는 이유를 한 문장으로 적었나요?"] },
      { id: "15-3", title: "지속가능 실행 전략", titleEn: "Planning for Long-Term Sustainability", difficulty: 3, question: "우리 프로젝트가 오래가려면, 환경과 사회를 함께 생각해야 하지 않을까?",
        checklist: ["환경 보호를 위한 실천 목표를 정했나요?","사회적 책임 활동을 포함했나요?","함께할 파트너를 찾았나요?","프로젝트를 1년 이상 이어갈 수 있는 계획을 세웠나요?"] },
    ]
  },
  {
    id: "16", title: "AI·사이버보안 & 안전한 사용 습관", titleEn: "AI · Cybersecurity", difficulty: 2,
    overview: "AI는 많은 도움을 주지만, 잘못 쓰면 개인정보 유출, 데이터 오용, 보안 사고가 일어날 수 있습니다. 이 카드는 AI를 사용할 때 데이터를 안전하게 보호하고, 사이버보안과 책임 있는 사용 습관을 함께 배우는 단계입니다.",
    insightQ: "AI를 쓸 때, 우리의 데이터와 정보는 얼마나 안전하게 지켜지고 있을까?",
    subs: [
      { id: "16-1", title: "데이터 보호 습관", titleEn: "Protecting Your Personal Information", difficulty: 2, question: "AI에게 정보를 입력할 때, 어떤 데이터는 절대 넣으면 안 될까?",
        checklist: ["이름·주소·전화번호 등 개인정보를 입력하지 않았나요?","친구나 가족의 정보를 대신 입력하지 않았나요?","계약서, 사진, 문서 등 민감한 자료를 업로드하지 않았나요?","AI가 요청하더라도 비밀이에요라고 멈출 수 있나요?"] },
      { id: "16-2", title: "AI 정보 검증", titleEn: "Checking the Truth of AI Answers", difficulty: 2, question: "AI가 알려준 내용은 항상 사실일까? 잘못된 정보를 어떻게 구별해야 할까?",
        checklist: ["AI가 제시한 내용을 바로 믿지 않고 다른 출처로 확인했나요?","공식 자료를 참고했나요?","AI가 만든 자료에 저작권이 포함되어 있지 않은지 확인했나요?","친구나 동료의 아이디어를 AI에 그대로 입력하지 않았나요?"] },
      { id: "16-3", title: "책임 있는 AI 활용 습관", titleEn: "Safe & Responsible AI Habits", difficulty: 3, question: "AI를 더 안전하게 활용하려면, 어떤 사이버보안 습관이 필요할까?",
        checklist: ["AI 계정을 사용할 때 2단계 인증을 설정했나요?","공유 계정이나 공공 기기에서 로그인하지 않았나요?","외부 문서를 전송할 때 암호나 링크 만료 기능을 사용했나요?","회사·학교의 AI 사용 규칙을 숙지하고 따르고 있나요?"] },
    ]
  },
];

export function buildCardList(): FlatCard[] {
  const cards: FlatCard[] = [];
  TOPICS.forEach((topic) => {
    cards.push({ type: 'topic', data: topic, parentId: topic.id });
    topic.subs.forEach((sub) => {
      cards.push({ type: 'question', data: sub, parentId: topic.id });
    });
  });
  return cards;
}

export const ALL_CARDS = buildCardList();
