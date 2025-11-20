// 선택 순서별 가중치
const SELECTION_WEIGHTS = [50, 30, 15, 5]; // 1순위, 2순위, 3순위, 4순위

interface MoodScore {
  energy: number;
  intimacy: number;
  creativity: number;
  nostalgia: number;
  depth: number;
  openness: number;
}

interface Option {
  id: string;
  emoji: string;
  title: string;
  subtitle?: string | null;
  description: string;
  tags: string[];
  moodScore: MoodScore;
}

interface CategorySelection {
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
  selections: {
    option: Option;
    order: number;
    weight: number;
  }[];
}

/**
 * 모든 선택을 바탕으로 통합 무드 프로필 계산
 */
export function calculateMoodProfile(selections: CategorySelection[]): MoodScore {
  const totalMoodScore: MoodScore = {
    energy: 0,
    intimacy: 0,
    creativity: 0,
    nostalgia: 0,
    depth: 0,
    openness: 0,
  };

  let totalWeight = 0;

  // 모든 카테고리의 모든 선택을 순회하며 가중치 적용
  selections.forEach((category) => {
    category.selections.forEach((selection) => {
      const weight = selection.weight / 100; // 퍼센트를 비율로 변환

      totalMoodScore.energy += selection.option.moodScore.energy * weight;
      totalMoodScore.intimacy += selection.option.moodScore.intimacy * weight;
      totalMoodScore.creativity += selection.option.moodScore.creativity * weight;
      totalMoodScore.nostalgia += selection.option.moodScore.nostalgia * weight;
      totalMoodScore.depth += selection.option.moodScore.depth * weight;
      totalMoodScore.openness += selection.option.moodScore.openness * weight;

      totalWeight += weight;
    });
  });

  // 카테고리 개수로 평균 내기
  const categoryCount = selections.length;
  if (categoryCount > 0) {
    totalMoodScore.energy /= categoryCount;
    totalMoodScore.intimacy /= categoryCount;
    totalMoodScore.creativity /= categoryCount;
    totalMoodScore.nostalgia /= categoryCount;
    totalMoodScore.depth /= categoryCount;
    totalMoodScore.openness /= categoryCount;
  }

  return totalMoodScore;
}

/**
 * 무드 프로필을 바탕으로 설명 생성
 */
export function generateMoodDescription(
  moodProfile: MoodScore,
  _selections: CategorySelection[]
): {
  summary: string;
  traits: string[];
  primaryDimensions: string[];
} {
  const dimensions = [
    { key: 'energy', value: moodProfile.energy, label: '에너지' },
    { key: 'intimacy', value: moodProfile.intimacy, label: '친밀도' },
    { key: 'creativity', value: moodProfile.creativity, label: '창의성' },
    { key: 'nostalgia', value: moodProfile.nostalgia, label: '시간성' },
    { key: 'depth', value: moodProfile.depth, label: '깊이' },
    { key: 'openness', value: moodProfile.openness, label: '개방성' },
  ];

  // 상위 3개 차원 찾기
  const sortedDimensions = [...dimensions].sort((a, b) => b.value - a.value);
  const primaryDimensions = sortedDimensions.slice(0, 3).map((d) => d.label);

  // 특성 설명 생성
  const traits: string[] = [];

  // 에너지
  if (moodProfile.energy >= 75) traits.push('역동적인');
  else if (moodProfile.energy >= 50) traits.push('활기찬');
  else if (moodProfile.energy >= 25) traits.push('차분한');
  else traits.push('고요한');

  // 친밀도
  if (moodProfile.intimacy >= 75) traits.push('내밀한');
  else if (moodProfile.intimacy >= 50) traits.push('친근한');
  else traits.push('공적인');

  // 창의성
  if (moodProfile.creativity >= 75) traits.push('독창적인');
  else if (moodProfile.creativity >= 50) traits.push('감각적인');
  else traits.push('전통적인');

  // 시간성
  if (moodProfile.nostalgia >= 75) traits.push('향수어린');
  else if (moodProfile.nostalgia >= 50) traits.push('클래식한');
  else traits.push('모던한');

  // 깊이
  if (moodProfile.depth >= 75) traits.push('진중한');
  else if (moodProfile.depth >= 50) traits.push('사색적인');
  else traits.push('경쾌한');

  // 개방성
  if (moodProfile.openness >= 75) traits.push('탐험적인');
  else if (moodProfile.openness >= 50) traits.push('호기심많은');
  else traits.push('익숙함을선호하는');

  // 요약 문장 생성
  const top1 = traits[0] || '독특한';
  const top2 = traits[1] || '감성적인';
  const top3 = traits[2] || '개성있는';

  const summary = `당신은 ${top1}, ${top2}, ${top3} 밤을 선호하시네요.`;

  return {
    summary,
    traits,
    primaryDimensions,
  };
}

/**
 * 가중치 배열 반환
 */
export function getWeightPercentages(): number[] {
  return SELECTION_WEIGHTS;
}
