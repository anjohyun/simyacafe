import { useState, useEffect } from 'react';
import { useMood } from '../contexts/MoodContext';
import { WelcomeScreen, QuizInterface, ResultScreen } from '../components/features/mood';

type QuizStep = 'welcome' | 'quiz' | 'result';

export default function MoodMatching() {
  const { quizResult, clearSelections } = useMood();
  const [currentStep, setCurrentStep] = useState<QuizStep>('welcome');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check if there's a saved result on mount
  useEffect(() => {
    if (quizResult) {
      setCurrentStep('result');
    }
  }, []);

  const handleStart = () => {
    clearSelections();
    transitionToStep('quiz');
  };

  const handleQuizComplete = () => {
    transitionToStep('result');
  };

  const handleReset = () => {
    clearSelections();
    transitionToStep('welcome');
  };

  const transitionToStep = (step: QuizStep) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      transition: 'opacity 0.3s ease',
      opacity: isTransitioning ? 0 : 1,
    }}>
      {currentStep === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {currentStep === 'quiz' && (
        <QuizInterface onComplete={handleQuizComplete} />
      )}

      {currentStep === 'result' && (
        <ResultScreen onReset={handleReset} />
      )}
    </div>
  );
}
