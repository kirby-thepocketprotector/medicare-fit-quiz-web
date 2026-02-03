import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stethoscope } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import QuestionHeader from '@/components/QuestionHeader';
import OptionButton from '@/components/OptionButton';
import { useQuiz } from '@/contexts/QuizContext';
import Colors from '@/constants/colors';

export default function Q03AScreen() {
  const router = useRouter();
  const { answers, updateAnswer, setCurrentStep } = useQuiz();

  const handleSelect = (value: boolean) => {
    updateAnswer('usesVA', value);
    setCurrentStep(4);
    if (value) {
      router.push('/quiz/q03b');
    } else {
      router.push('/quiz/q04');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuizHeader currentStep={4} totalSteps={10} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <QuestionHeader
            icon={Stethoscope}
            question="Do you see your doctor through the VA?"
            subtext="Veterans use the VA in different ways. If the VA is where you get most of your care, Medicare can act more like a safety net. If you don't, your Medicare plan may need to do more of the heavy lifting."
          />

          <View style={styles.optionsContainer}>
            <OptionButton
              label="Yes"
              selected={answers.usesVA === true}
              onPress={() => handleSelect(true)}
              expandedContent="In this case, many people choose a Medicare plan that acts as backup—often with no added monthly cost. Some plans can even put money back on your social security check each month. The right fit depends on how much you rely on the VA versus how much flexibility you want outside it."
            />
            <OptionButton
              label="No"
              selected={answers.usesVA === false}
              onPress={() => handleSelect(false)}
              expandedContent="If you don't usually see doctors through the VA, your Medicare coverage will play a bigger role in where and how you get care."
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
