import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Award } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import QuestionHeader from '@/components/QuestionHeader';
import OptionButton from '@/components/OptionButton';
import { useQuiz } from '@/contexts/QuizContext';
import Colors from '@/constants/colors';

export default function Q03Screen() {
  const router = useRouter();
  const { answers, updateAnswer, setCurrentStep } = useQuiz();

  const handleSelect = (value: boolean) => {
    updateAnswer('isVeteran', value);
    setCurrentStep(3);
    if (value) {
      router.push('/quiz/q03a');
    } else {
      router.push('/quiz/q04');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuizHeader currentStep={3} totalSteps={10} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <QuestionHeader
            icon={Award}
            question="Are you a U.S. armed services Veteran?"
            subtext="Veteran status doesn't automatically change what's best—but it can unlock additional benefits in plans specifically designed for veterans, like money back on your social security check every month. We'll factor this in as we go."
          />

          <View style={styles.optionsContainer}>
            <OptionButton
              label="Yes"
              selected={answers.isVeteran === true}
              onPress={() => handleSelect(true)}
            />
            <OptionButton
              label="No"
              selected={answers.isVeteran === false}
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
