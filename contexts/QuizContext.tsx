import createContextHook from '@nkzw/create-context-hook';
import { useState, useCallback } from 'react';
import { QuizAnswers, initialQuizAnswers, calculateIsInIEP, determineResult, ResultScreenId } from '@/constants/quiz-data';

export const [QuizProvider, useQuiz] = createContextHook(() => {
  const [answers, setAnswers] = useState<QuizAnswers>(initialQuizAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps] = useState(10);

  const updateAnswer = useCallback(<K extends keyof QuizAnswers>(
    key: K,
    value: QuizAnswers[K]
  ) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setBirthDate = useCallback((month: string, year: string) => {
    const isInIEP = calculateIsInIEP(month, year);
    setAnswers((prev) => ({
      ...prev,
      birthMonth: month,
      birthYear: year,
      isInIEP,
    }));
  }, []);

  const toggleVAPreference = useCallback((preferenceId: string) => {
    setAnswers((prev) => {
      let newPreferences: string[];

      if (preferenceId === 'none_apply') {
        if (prev.vaPreferences.includes('none_apply')) {
          newPreferences = [];
        } else {
          newPreferences = ['none_apply'];
        }
      } else {
        const withoutNone = prev.vaPreferences.filter((p) => p !== 'none_apply');
        if (withoutNone.includes(preferenceId)) {
          newPreferences = withoutNone.filter((p) => p !== preferenceId);
        } else {
          newPreferences = [...withoutNone, preferenceId];
        }
      }

      return { ...prev, vaPreferences: newPreferences };
    });
  }, []);

  const getResult = useCallback((): ResultScreenId => {
    return determineResult(answers);
  }, [answers]);

  const resetQuiz = useCallback(() => {
    setAnswers(initialQuizAnswers);
    setCurrentStep(0);
  }, []);

  return {
    answers,
    currentStep,
    totalSteps,
    setCurrentStep,
    updateAnswer,
    setBirthDate,
    toggleVAPreference,
    getResult,
    resetQuiz,
  };
});