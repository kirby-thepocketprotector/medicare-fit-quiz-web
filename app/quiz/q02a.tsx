import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import QuestionHeader from '@/components/QuestionHeader';
import OptionButton from '@/components/OptionButton';
import { useQuiz } from '@/contexts/QuizContext';
import { CurrentCoverageType } from '@/constants/quiz-data';
import Colors from '@/constants/colors';

const COVERAGE_OPTIONS: { id: CurrentCoverageType; label: string }[] = [
  { id: 'parts_ab_only', label: 'I just have Medicare Parts A and B' },
  { id: 'medicare_advantage', label: 'I already have a Medicare Advantage plan' },
  { id: 'medigap', label: 'I already have a Medigap / Supplement plan' },
];

export default function Q02aScreen() {
  const router = useRouter();
  const { answers, updateAnswer, setCurrentStep } = useQuiz();

  const handleSelect = (value: CurrentCoverageType) => {
    updateAnswer('currentCoverage', value);
    setCurrentStep(2);

    if (value === 'medicare_advantage') {
      router.push('/result/R08');
    } else if (value === 'medigap') {
      router.push('/result/R09');
    } else {
      router.push('/quiz/q03');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuizHeader currentStep={2} totalSteps={10} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <QuestionHeader
            icon={FileText}
            question="What kind of Medicare coverage do you have right now?"
            subtext="This helps us understand where you are in your Medicare journey. If you already have a plan, we can almost certainly save you money."
          />

          <View style={styles.optionsContainer}>
            {COVERAGE_OPTIONS.map((option) => (
              <OptionButton
                key={option.id}
                label={option.label}
                selected={answers.currentCoverage === option.id}
                onPress={() => handleSelect(option.id)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 8,
  },
  optionsContainer: {
    gap: 0,
  },
});
