interface MoodProfile {
  energy: number;
  intimacy: number;
  creativity: number;
  nostalgia: number;
  depth: number;
  openness: number;
}

interface MoodDescription {
  summary: string;
  traits: string[];
  primaryDimensions: string[];
}

interface CategorySelection {
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
  selections: any[];
}

/**
 * 텍스트를 주어진 최대 너비에 맞게 줄바꿈
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

/**
 * Canvas에 레이더 차트 그리기
 */
function drawRadarChart(
  ctx: CanvasRenderingContext2D,
  moodProfile: MoodProfile,
  centerX: number,
  centerY: number,
  radius: number
) {
  const dimensions = [
    { key: 'energy', label: '에너지', value: moodProfile.energy },
    { key: 'intimacy', label: '친밀도', value: moodProfile.intimacy },
    { key: 'creativity', label: '창의성', value: moodProfile.creativity },
    { key: 'nostalgia', label: '시간성', value: moodProfile.nostalgia },
    { key: 'depth', label: '깊이', value: moodProfile.depth },
    { key: 'openness', label: '개방성', value: moodProfile.openness },
  ];

  const angleStep = (Math.PI * 2) / dimensions.length;

  // 배경 그리드 그리기 (3단계)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;

  for (let level = 1; level <= 3; level++) {
    const r = (radius * level) / 3;
    ctx.beginPath();
    for (let i = 0; i <= dimensions.length; i++) {
      const angle = angleStep * i - Math.PI / 2;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }

  // 축 그리기
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  for (let i = 0; i < dimensions.length; i++) {
    const angle = angleStep * i - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  // 데이터 다각형 그리기
  ctx.fillStyle = 'rgba(255, 27, 141, 0.3)';
  ctx.strokeStyle = 'rgba(255, 27, 141, 1)';
  ctx.lineWidth = 4;

  ctx.beginPath();
  for (let i = 0; i <= dimensions.length; i++) {
    const dim = dimensions[i % dimensions.length];
    const angle = angleStep * i - Math.PI / 2;
    const value = (dim.value / 100) * radius;
    const x = centerX + value * Math.cos(angle);
    const y = centerY + value * Math.sin(angle);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 라벨 그리기
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < dimensions.length; i++) {
    const dim = dimensions[i];
    const angle = angleStep * i - Math.PI / 2;
    const labelRadius = radius + 50;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);

    ctx.fillText(dim.label, x, y);
  }
}

/**
 * 공유 이미지 생성 (1200 x 1400)
 */
export async function generateShareImage(
  moodProfile: MoodProfile,
  _selections: CategorySelection[],
  moodDescription: MoodDescription
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1400;
    const ctx = canvas.getContext('2d')!;

    // 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 0, 1400);
    gradient.addColorStop(0, '#0A0A0A');
    gradient.addColorStop(1, '#1A1A1A');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 1400);

    // 상단 - 로고 & 타이틀 (0-200px)
    ctx.fillStyle = '#FF1B8D';
    ctx.font = 'bold 60px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('밤사이 연결실', 600, 80);

    ctx.fillStyle = '#A855F7';
    ctx.font = '32px sans-serif';
    ctx.fillText('나의 밤 무드 프로필', 600, 140);

    // 무드 요약 (200-350px)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';

    const summaryLines = wrapText(ctx, moodDescription.summary, 1000);
    summaryLines.slice(0, 2).forEach((line, index) => {
      ctx.fillText(line, 600, 240 + index * 50);
    });

    // 레이더 차트 (350-900px)
    const chartCenterX = 600;
    const chartCenterY = 625;
    const chartRadius = 220;
    drawRadarChart(ctx, moodProfile, chartCenterX, chartCenterY, chartRadius);

    // 주요 특성 태그 (950-1150px)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('주요 특성', 600, 980);

    // 태그 배치
    const tags = moodDescription.traits.slice(0, 5);
    const tagSpacing = 180;
    const totalTagWidth = tags.length * tagSpacing - 40;
    let startX = (1200 - totalTagWidth) / 2;

    tags.forEach((trait, index) => {
      const x = startX + index * tagSpacing;
      const y = 1060;

      // 태그 배경
      ctx.fillStyle = '#FF1B8D';
      const tagWidth = 160;
      const tagHeight = 50;
      const radius = 25;

      ctx.beginPath();
      ctx.moveTo(x - tagWidth / 2 + radius, y - tagHeight / 2);
      ctx.lineTo(x + tagWidth / 2 - radius, y - tagHeight / 2);
      ctx.quadraticCurveTo(
        x + tagWidth / 2,
        y - tagHeight / 2,
        x + tagWidth / 2,
        y - tagHeight / 2 + radius
      );
      ctx.lineTo(x + tagWidth / 2, y + tagHeight / 2 - radius);
      ctx.quadraticCurveTo(
        x + tagWidth / 2,
        y + tagHeight / 2,
        x + tagWidth / 2 - radius,
        y + tagHeight / 2
      );
      ctx.lineTo(x - tagWidth / 2 + radius, y + tagHeight / 2);
      ctx.quadraticCurveTo(
        x - tagWidth / 2,
        y + tagHeight / 2,
        x - tagWidth / 2,
        y + tagHeight / 2 - radius
      );
      ctx.lineTo(x - tagWidth / 2, y - tagHeight / 2 + radius);
      ctx.quadraticCurveTo(
        x - tagWidth / 2,
        y - tagHeight / 2,
        x - tagWidth / 2 + radius,
        y - tagHeight / 2
      );
      ctx.closePath();
      ctx.fill();

      // 태그 텍스트
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`#${trait}`, x, y + 8);
    });

    // 하단 - URL (1300px)
    ctx.fillStyle = '#999999';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('simyacafe.com', 600, 1340);

    // Canvas를 데이터 URL로 변환
    const dataUrl = canvas.toDataURL('image/png');
    resolve(dataUrl);
  });
}

/**
 * 이미지를 클립보드에 복사
 */
export async function copyImageToClipboard(imageDataUrl: string): Promise<boolean> {
  try {
    // DataURL을 Blob으로 변환
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();

    // Clipboard API 사용
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);

    return true;
  } catch (error) {
    console.error('Failed to copy image to clipboard:', error);
    return false;
  }
}

/**
 * 이미지 다운로드
 */
export function downloadImage(imageDataUrl: string, filename: string = 'my-mood-profile.png') {
  const link = document.createElement('a');
  link.href = imageDataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
