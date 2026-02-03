import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import QuestionHeader from '@/components/QuestionHeader';
import OptionButton from '@/components/OptionButton';
import { useQuiz } from '@/contexts/QuizContext';
import Colors from '@/constants/colors';

export default function Q02Screen() {
  const router = useRouter();
  const { answers, updateAnswer, setCurrentStep } = useQuiz();

  const handleSelect = (value: boolean) => {
    updateAnswer('hasPartAB', value);
    setCurrentStep(2);
    if (value) {
      router.push('/quiz/q02a');
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
            icon={Shield}
            question="Are you currently enrolled in both Medicare Part A and Part B?"
          />

          <View style={styles.optionsContainer}>
            <OptionButton
              label="Yes"
              selected={answers.hasPartAB === true}
              onPress={() => handleSelect(true)}
            />
            <OptionButton
              label="No"
              selected={answers.hasPartAB === false}
              onPress={() => handleSelect(false)}
            />
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
