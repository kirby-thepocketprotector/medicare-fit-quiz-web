import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Clock,
  Calendar,
  Award,
  DollarSign,
  Stethoscope,
  Heart,
} from 'lucide-react-native';
import Colors from '@/constants/colors';

const features = [
  { icon: Calendar, label: 'Your eligibility & enrollment timing' },
  { icon: Award, label: 'Veteran and Medicaid status' },
  { icon: DollarSign, label: 'Your budget and cost preferences' },
  { icon: Stethoscope, label: 'Your doctor choice preferences' },
  { icon: Heart, label: 'Your health care needs' },
];

export default function SplashPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <View style={styles.badge}>
            <Clock size={12} color={Colors.primary} strokeWidth={2.5} />
            <Text style={styles.badgeText}>2 minutes</Text>
          </View>

          <Text style={styles.title}>
            This short quiz will help you decide between Medigap vs Medicare Advantage.
          </Text>

          <View style={styles.listSection}>
            <Text style={styles.listLabel}>It looks at:</Text>

            <View style={styles.featureList}>
              {features.map((feature, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.featureRow,
                    index < features.length - 1 && styles.featureRowBorder
                  ]}
                >
                  <feature.icon size={16} color={Colors.primary} strokeWidth={2} />
                  <Text style={styles.featureText}>{feature.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/quiz/q01')}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaText}>Start the quiz</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Takes about 2 minutes • No obligation
          </Text>
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
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 5,
    marginBottom: 16,
    opacity: 0.8,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: Colors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 28,
    letterSpacing: -0.3,
  },
  listSection: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  listLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  featureList: {
    gap: 0,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    gap: 12,
  },
  featureRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600' as const,
  },
  disclaimer: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 10,
  },
});
