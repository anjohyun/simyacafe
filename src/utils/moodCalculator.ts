import { MusicGenre, MoodScore } from '../data/genres';

// 선택 순서별 가중치
const WEIGHTS = [0.5, 0.3, 0.15, 0.05];

/**
 * 선택된 장르들을 바탕으로 무드 프로필 계산
 */
export function calculateMoodProfile(selectedGenres: MusicGenre[]): MoodScore {
  const moodDimensions: MoodScore = {
    energy: 0,
    intimacy: 0,
    creativity: 0,
    nostalgia: 0,
  };

  selectedGenres.forEach((genre, index) => {
    const weight = WEIGHTS[index] || 0;

    moodDimensions.energy += genre.moodScore.energy * weight;
    moodDimensions.intimacy += genre.moodScore.intimacy * weight;
    moodDimensions.creativity += genre.moodScore.creativity * weight;
    moodDimensions.nostalgia += genre.moodScore.nostalgia * weight;
  });

  return moodDimensions;
}

/**
 * 무드 프로필을 바탕으로 설명 텍스트 생성
 */
export function generateMoodDescription(
  moodProfile: MoodScore,
  selectedGenres: MusicGenre[]
): string {
  const { energy, intimacy, creativity, nostalgia } = moodProfile;

  // 에너지 레벨 분석
  let energyDesc = '';
  if (energy >= 75) energyDesc = '활발하고 에너지 넘치는';
  else if (energy >= 50) energyDesc = '적당히 활기찬';
  else energyDesc = '조용하고 차분한';

  // 친밀도 분석
  let intimacyDesc = '';
  if (intimacy >= 75) intimacyDesc = '감성적이고 사적인';
  else if (intimacy >= 50) intimacyDesc = '편안하고 친근한';
  else intimacyDesc = '공개적이고 활발한';

  // 창의성 분석
  let creativityDesc = '';
  if (creativity >= 75) creativityDesc = '실험적이고 독특한';
  else if (creativity >= 50) creativityDesc = '감각적이고 개성 있는';
  else creativityDesc = '친숙하고 대중적인';

  // 향수 레벨 분석
  let nostalgiaDesc = '';
  if (nostalgia >= 75) nostalgiaDesc = '복고적이고 추억이 담긴';
  else if (nostalgia >= 50) nostalgiaDesc = '클래식과 모던의 조화로운';
  else nostalgiaDesc = '트렌디하고 현대적인';

  const firstGenre = selectedGenres[0];
  const secondGenre = selectedGenres[1];

  return `당신은 ${firstGenre.title}(50%)과 ${secondGenre.title}(30%)의 조합으로
'${energyDesc}, ${intimacyDesc}' 밤을 선호하시네요.
${creativityDesc} 음악과 ${nostalgiaDesc} 감성이 어우러진
당신만의 무드를 찾았습니다!`;
}

/**
 * 가중치 퍼센티지 배열
 */
export function getWeightPercentages(): number[] {
  return WEIGHTS.map(w => w * 100);
}
