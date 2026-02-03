import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import ContinueButton from '@/components/ContinueButton';
import Colors from '@/constants/colors';

export default function Q01AScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuizHeader currentStep={1} totalSteps={10} />
        
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Calendar size={20} color={Colors.primary} strokeWidth={2.5} />
            </View>

            <Text style={styles.headline}>
              You&apos;re in a very important enrollment window
            </Text>
          </View>

          <View style={styles.bodySection}>
            <View style={styles.paragraphRow}>
              <View style={styles.accentBar} />
              <Text style={styles.paragraph}>
                You&apos;re in your Initial Enrollment Period — a one-time window that lasts until 3 months after your 65th birthday when you have the most flexibility choosing Medicare coverage.
              </Text>
            </View>

            <View style={styles.paragraphRow}>
              <View style={styles.accentBar} />
              <Text style={styles.paragraph}>
                During this period, you can explore all types of plans, avoid late enrollment penalties, and lock in choices while your options are widest.
              </Text>
            </View>

            <View style={styles.paragraphRow}>
              <View style={styles.accentBar} />
              <Text style={styles.paragraph}>
                It&apos;s also the only time Medigap plans must accept you as-is — no health questions, higher pricing, or denials. After this window, those protections often disappear.
              </Text>
            </View>

            <View style={styles.highlightBox}>
              <Text style={styles.highlightText}>
                That&apos;s why now is the best time to understand your options, even if you don&apos;t plan to enroll right away.
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <ContinueButton onPress={() => router.push('/quiz/q02')} />
          </View>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  headerSection: {
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primary + '12',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  headline: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: Colors.text,
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  bodySection: {
    flex: 1,
  },
  paragraphRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  accentBar: {
    width: 3,
    backgroundColor: Colors.primary + '25',
    borderRadius: 2,
    marginRight: 12,
  },
  paragraph: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  highlightBox: {
    backgroundColor: Colors.primary + '08',
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  highlightText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  buttonContainer: {
    marginTop: 24,
  },
});
