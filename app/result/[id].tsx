import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DollarSign,
  Pill,
  Smile,
  Gift,
  MapPin,
  Plane,
  Shield,
  Award,
  Stethoscope,
  Users,
  CreditCard,
  AlertTriangle,
  Phone,
  Check,
} from 'lucide-react-native';
import { useQuiz } from '@/contexts/QuizContext';
import { RESULT_CONTENT, ResultScreenId } from '@/constants/quiz-data';
import Colors from '@/constants/colors';

const iconMap: Record<string, React.ComponentType<any>> = {
  'dollar-sign': DollarSign,
  'pill': Pill,
  'smile': Smile,
  'gift': Gift,
  'map-pin': MapPin,
  'plane': Plane,
  'shield': Shield,
  'award': Award,
  'stethoscope': Stethoscope,
  'users': Users,
  'credit-card': CreditCard,
};

export default function ResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { answers, resetQuiz } = useQuiz();

  const resultId = id as ResultScreenId;
  const content = RESULT_CONTENT[resultId];
  const isEarlyExit = resultId === 'R08' || resultId === 'R09';

  if (!content) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.errorText}>Result not found</Text>
        </SafeAreaView>
      </View>
    );
  }

  const showMedicareOverride = answers.hasPartAB === false;

  const handleCallNow = () => {
    if (Platform.OS === 'web') {
      window.open('tel:+18001234567', '_self');
    } else {
      Linking.openURL('tel:+18001234567');
    }
  };

  const handleStartOver = () => {
    resetQuiz();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{content.subtitle}</Text>
          </View>

          <Text style={styles.title}>{content.title}</Text>

          {content.whyText ? (
            <View style={styles.section}>
              {content.whyHeader ? (
                <Text style={styles.sectionTitle}>{content.whyHeader}</Text>
              ) : null}
              <Text style={styles.sectionText}>{content.whyText}</Text>
            </View>
          ) : null}

          {content.benefits.length > 0 && (
            <>
              <Text style={styles.benefitsLabel}>These often include:</Text>

              <View style={styles.benefitsList}>
                {content.benefits.map((benefit, index) => {
                  const IconComponent = iconMap[benefit.icon] || DollarSign;
                  return (
                    <View key={index} style={styles.benefitItem}>
                      <View style={styles.benefitIconContainer}>
                        <IconComponent size={20} color={Colors.primary} />
                      </View>
                      <View style={styles.benefitContent}>
                        <Text style={styles.benefitTitle}>{benefit.title}</Text>
                        <Text style={styles.benefitDescription}>{benefit.description}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </>
          )}

          {content.importantNote ? (
            <View style={styles.importantBox}>
              <View style={styles.importantHeader}>
                <AlertTriangle size={18} color={Colors.warning} />
                <Text style={styles.importantTitle}>Important to Know</Text>
              </View>
              <Text style={styles.importantText}>{content.importantNote}</Text>
            </View>
          ) : null}

          {showMedicareOverride && !isEarlyExit ? (
            <View style={styles.overrideSection}>
              <Text style={styles.overrideTitle}>
                Important: You&apos;re not enrolled in Medicare yet - that&apos;s ok.
              </Text>
              <Text style={styles.overrideText}>
                Before you can enroll in a plan, you&apos;ll first need to be enrolled in Original Medicare (Part A &amp; Part B).
              </Text>
              <Text style={styles.overrideText}>
                If you don&apos;t have Part A &amp; B yet, you&apos;re actually right on time. We can help you understand when you&apos;re eligible, what deadlines matter, and get everything set up correctly.
              </Text>
              <Text style={styles.overrideText}>
                A quick call with a team member can walk you through the enrollment process and help you avoid penalties or coverage gaps.
              </Text>
            </View>
          ) : !isEarlyExit ? (
            <>
              <View style={styles.nextStepSection}>
                <Text style={styles.nextStepTitle}>
                  Next Step: {content.nextStepHeader}
                </Text>
                <Text style={styles.nextStepIntro}>{content.nextStepIntro}</Text>

                <View style={styles.nextStepList}>
                  {content.nextStepItems.map((item, index) => (
                    <View key={index} style={styles.nextStepItem}>
                      <View style={styles.checkContainer}>
                        <Check size={16} color={Colors.primary} strokeWidth={3} />
                      </View>
                      <View style={styles.nextStepContent}>
                        <Text style={styles.nextStepItemTitle}>{item.title}</Text>
                        <Text style={styles.nextStepItemDescription}>{item.description}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.freeHelpCard}>
                <Text style={styles.freeHelpTitle}>Our help is always free</Text>
                <Text style={styles.freeHelpText}>
                  Medicare plans cost the same whether you enroll with us or on your own. We never charge anything for our help.
                </Text>
              </View>
            </>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          {isEarlyExit && (
            <Text style={styles.ctaHeader}>
              {resultId === 'R08'
                ? 'Call now to get a quick report card on your plan and see how it ranks against every other plan in your county'
                : 'Call now to get a prescription drug plan report card and see if you could be saving money'}
            </Text>
          )}
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleCallNow}
            activeOpacity={0.8}
          >
            <Phone size={20} color={Colors.white} />
            <Text style={styles.ctaText}>
              {showMedicareOverride && !isEarlyExit
                ? 'Call us for help'
                : 'Call Now'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleStartOver}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>Start Over</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 140,
  },
  errorText: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 100,
  },
  badge: {
    backgroundColor: Colors.success + '15',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.success,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.text,
    lineHeight: 40,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 26,
    color: Colors.textSecondary,
  },
  benefitsLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
    marginBottom: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  benefitIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  importantBox: {
    backgroundColor: Colors.warning + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.warning + '30',
  },
  importantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  importantTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  importantText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  overrideSection: {
    backgroundColor: Colors.primaryLight + '10',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.primaryLight + '30',
  },
  overrideTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  overrideText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  nextStepSection: {
    marginBottom: 20,
  },
  nextStepTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  nextStepIntro: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  nextStepList: {
    gap: 16,
  },
  nextStepItem: {
    flexDirection: 'row',
    gap: 12,
  },
  checkContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryLight + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  nextStepContent: {
    flex: 1,
  },
  nextStepItemTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  nextStepItemDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  freeHelpCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  freeHelpTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 6,
  },
  freeHelpText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
  },
  ctaHeader: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600' as const,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  secondaryButtonText: {
    fontSize: 15,
    color: Colors.textMuted,
    fontWeight: '500' as const,
  },
});