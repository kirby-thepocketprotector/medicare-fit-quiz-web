import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import OptionButton from '@/components/OptionButton';
import { useQuiz } from '@/contexts/QuizContext';
import { determineResult } from '@/constants/quiz-data';
import Colors from '@/constants/colors';

export default function Q05CScreen() {
  const router = useRouter();
  const { answers, updateAnswer } = useQuiz();

  const handleSelect = (choice: 'flexible' | 'lower_cost') => {
    updateAnswer('budgetChoice', choice);
    const updatedAnswers = { ...answers, budgetChoice: choice };
    const result = determineResult(updatedAnswers);
    console.log('[Q05C] Budget choice:', choice);
    console.log('[Q05C] Computed result:', result);
    router.push(`/result/${result}`);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuizHeader currentStep={10} totalSteps={10} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>
            Let&apos;s bring this story home and decide on a direction.
          </Text>

          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonCard}>
              <Text style={styles.cardTitle}>Medicare Advantage</Text>
              <Text style={styles.cardSubtitle}>Monthly premium focus</Text>
              <Text style={styles.cardDescription}>
                You will save money every month by paying $0 premium. That&apos;s real savings. And many plans come with valuable benefits like $0 Rx coverage and $1,000+ dental allowances.
              </Text>
              <Text style={styles.tradeoffLabel}>But you trade that off against:</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Minus size={14} color={Colors.textMuted} />
                  <Text style={styles.bulletText}>Restricted networks</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Minus size={14} color={Colors.textMuted} />
                  <Text style={styles.bulletText}>Possible care delays</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Minus size={14} color={Colors.textMuted} />
                  <Text style={styles.bulletText}>Copays up to ~$8,000 in a bad health year</Text>
                </View>
              </View>
            </View>

            <View style={styles.comparisonCard}>
              <Text style={styles.cardTitle}>Medigap</Text>
              <Text style={styles.cardSubtitle}>Flexibility focus</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Minus size={14} color={Colors.textMuted} />
                  <Text style={styles.bulletText}>Any Medicare doctor (~99% of ALL doctors in US)</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Minus size={14} color={Colors.textMuted} />
                  <Text style={styles.bulletText}>No delays</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Minus size={14} color={Colors.textMuted} />
                  <Text style={styles.bulletText}>Costs ~$500 in a bad health year</Text>
                </View>
              </View>
              <Text style={styles.tradeoffLabel}>But you pay:</Text>
              <Text style={styles.premiumText}>$150-$200 per month premium</Text>
            </View>
          </View>

          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              The Big question: Are you comfortable paying each month for the more robust coverage of MediGap, or do you want to save money every month and get help choosing the right $0 MAPD plan?
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            <OptionButton
              label="I can pay $150-$200/mo for more flexibility"
              selected={answers.budgetChoice === 'flexible'}
              onPress={() => handleSelect('flexible')}
            />
            <OptionButton
              label="I prefer lower monthly costs with less flexibility"
              selected={answers.budgetChoice === 'lower_cost'}
              onPress={() => handleSelect('lower_cost')}
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
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
    lineHeight: 32,
    marginBottom: 24,
    letterSpacing: -0.3,
  },
  comparisonContainer: {
    gap: 16,
    marginBottom: 24,
  },
  comparisonCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  tradeoffLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  bulletList: {
    gap: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  premiumText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  questionBox: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  questionText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  optionsContainer: {
    gap: 0,
  },
});
