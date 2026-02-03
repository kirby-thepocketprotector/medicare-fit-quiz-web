import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import QuestionHeader from '@/components/QuestionHeader';
import OptionButton from '@/components/OptionButton';
import ContinueButton from '@/components/ContinueButton';
import { useQuiz } from '@/contexts/QuizContext';
import Colors from '@/constants/colors';

export default function Q04Screen() {
  const router = useRouter();
  const { answers, updateAnswer, setCurrentStep } = useQuiz();
  const [selected, setSelected] = useState<boolean | null>(answers.hasMedicaid);

  const handleSelect = (value: boolean) => {
    setSelected(value);
    updateAnswer('hasMedicaid', value);
  };

  const handleContinue = () => {
    if (selected === null) return;
    
    setCurrentStep(6);
    
    if (selected === true) {
      router.push('/result/R03');
    } else {
      router.push('/quiz/q05');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuizHeader currentStep={6} totalSteps={10} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <QuestionHeader
            icon={ShieldCheck}
            question="Do you currently qualify for Medicaid?"
            subtext="Some Medicare plans are designed for people with Medicaid and can offer lower costs and extra benefits."
          />

          <View style={styles.optionsContainer}>
            <OptionButton
              label="Yes"
              selected={selected === true}
              onPress={() => handleSelect(true)}
              expandedContent="There are special Medicare plans designed just for you. These plans usually offer much lower costs and provide extra benefits that regular Medicare plans can't."
            />
            <OptionButton
              label="No"
              selected={selected === false}
              onPress={() => handleSelect(false)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <ContinueButton 
              onPress={handleContinue} 
              disabled={selected === null} 
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
  buttonContainer: {
    marginTop: 24,
  },
});
