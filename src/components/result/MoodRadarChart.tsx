import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface MoodProfile {
  energy: number;
  intimacy: number;
  creativity: number;
  nostalgia: number;
  depth: number;
  openness: number;
}

interface MoodRadarChartProps {
  moodProfile: MoodProfile;
}

export default function MoodRadarChart({ moodProfile }: MoodRadarChartProps) {
  const chartRef = useRef<any>(null);

  const data = {
    labels: ['에너지', '친밀도', '창의성', '시간성', '깊이', '개방성'],
    datasets: [
      {
        label: '나의 무드 프로필',
        data: [
          moodProfile.energy,
          moodProfile.intimacy,
          moodProfile.creativity,
          moodProfile.nostalgia,
          moodProfile.depth,
          moodProfile.openness,
        ],
        backgroundColor: 'rgba(255, 27, 141, 0.2)',
        borderColor: 'rgba(255, 27, 141, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(255, 27, 141, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 27, 141, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          color: '#999999',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          backdropColor: 'transparent',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 2,
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 2,
        },
        pointLabels: {
          color: '#FFFFFF',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          padding: 15,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        titleColor: '#FF1B8D',
        bodyColor: '#FFFFFF',
        borderColor: '#FF1B8D',
        borderWidth: 2,
        padding: 12,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
          weight: 'normal' as const,
        },
        callbacks: {
          label: function (context: any) {
            return `점수: ${context.parsed.r}`;
          },
        },
      },
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <Radar ref={chartRef} data={data} options={options} />
    </div>
  );
}
