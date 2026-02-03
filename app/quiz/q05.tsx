import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Scale, User } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import ContinueButton from '@/components/ContinueButton';
import Colors from '@/constants/colors';

export default function Q05Screen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuizHeader currentStep={7} totalSteps={10} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.badge}>
            <Scale size={14} color={Colors.primary} />
            <Text style={styles.badgeText}>Understanding the tradeoffs</Text>
          </View>

          <Text style={styles.title}>
            Let&apos;s understand the cost and care tradeoffs between Medicare Advantage and Medigap.
          </Text>

          <Text style={styles.subtitle}>
            Instead of theory, let&apos;s follow two real stories.
          </Text>

          <View style={styles.personsContainer}>
            <View style={styles.personCard}>
              <View style={styles.personIconContainer}>
                <User size={28} color={Colors.primary} />
              </View>
              <Text style={styles.personName}>Sam</Text>
              <Text style={styles.personPlan}>has Medicare Advantage</Text>
            </View>

            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>vs.</Text>
            </View>

            <View style={styles.personCard}>
              <View style={styles.personIconContainer}>
                <User size={28} color={Colors.primary} />
              </View>
              <Text style={styles.personName}>Alex</Text>
              <Text style={styles.personPlan}>has Medigap</Text>
            </View>
          </View>

          <View style={styles.bottomText}>
            <Text style={styles.emphasisText}>Same illness. Same age.</Text>
            <Text style={styles.emphasisTextBold}>Very different experiences.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <ContinueButton 
              onPress={() => router.push('/quiz/q05a')} 
              label="See Sam's story"
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
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight + '15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    gap: 6,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  personsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  personCard: {
    alignItems: 'center',
    flex: 1,
  },
  personIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  personName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  personPlan: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  vsContainer: {
    paddingHorizontal: 8,
  },
  vsText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.textMuted,
  },
  bottomText: {
    alignItems: 'center',
  },
  emphasisText: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  emphasisTextBold: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  buttonContainer: {
    marginTop: 32,
    width: '100%',
  },
});