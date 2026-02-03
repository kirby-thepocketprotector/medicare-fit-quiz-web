import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClipboardList } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import OptionButton from '@/components/OptionButton';
import ContinueButton from '@/components/ContinueButton';
import { useQuiz } from '@/contexts/QuizContext';
import { VA_PREFERENCE_OPTIONS } from '@/constants/quiz-data';
import Colors from '@/constants/colors';

export default function Q03BScreen() {
  const router = useRouter();
  const { answers, toggleVAPreference, setCurrentStep } = useQuiz();

  const isValid = answers.vaPreferences.length > 0;
  const noneSelected = answers.vaPreferences.includes('none_apply');

  const handleContinue = () => {
    setCurrentStep(5);
    router.push('/quiz/q04');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuizHeader currentStep={5} totalSteps={10} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <ClipboardList size={20} color={Colors.primary} />
            </View>
            <Text style={styles.question}>Do any of the following apply to you?</Text>
            <Text style={styles.helperText}>
              This helps us understand whether your Medicare coverage should act mainly as backup to the VA, or give you broad access to doctors outside the VA if you need it.
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {VA_PREFERENCE_OPTIONS.map((option) => (
              <OptionButton
                key={option.id}
                label={option.label}
                selected={answers.vaPreferences.includes(option.id)}
                onPress={() => toggleVAPreference(option.id)}
                disabled={option.id !== 'none_apply' && noneSelected}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <ContinueButton onPress={handleContinue} disabled={!isValid} />
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
    padding: 20,
    paddingTop: 4,
  },
  headerSection: {
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  question: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
    lineHeight: 28,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  optionsContainer: {
    gap: 0,
  },
  buttonContainer: {
    marginTop: 24,
  },
});
