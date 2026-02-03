import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Clock, DollarSign, FileText } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import ContinueButton from '@/components/ContinueButton';
import Colors from '@/constants/colors';

const timelineSteps = [
  "Does not need to see the primary care doctor",
  "Alex can go directly to any GI specialist that takes Medicare.",
  "No waiting, preapprovals or referrals needed",
];

export default function Q05BScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuizHeader currentStep={9} totalSteps={10} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileCard}>
            <View style={styles.profileIconContainer}>
              <User size={24} color={Colors.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Alex, 68 — Original Medicare + Medigap</Text>
              <Text style={styles.profileDetail}>Pays $175 Monthly Premium</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>The problem:</Text>
            <Text style={styles.sectionText}>
              Alex develops severe abdominal pain and needs a GI specialist. Alex can go directly to the GI specialist.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alex&apos;s timeline:</Text>
            <View style={styles.timeline}>
              {timelineSteps.map((step, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineNumberContainer}>
                    <Text style={styles.timelineNumber}>{index + 1}</Text>
                  </View>
                  <Text style={styles.timelineText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.outcomeCard}>
            <View style={styles.outcomeRow}>
              <Clock size={20} color={Colors.textSecondary} />
              <View style={styles.outcomeContent}>
                <Text style={styles.outcomeLabel}>Outcome</Text>
                <Text style={styles.outcomeText}>Alex had care start immediately.</Text>
              </View>
            </View>
          </View>

          <View style={styles.costCard}>
            <View style={styles.outcomeRow}>
              <DollarSign size={20} color={Colors.textSecondary} />
              <View style={styles.outcomeContent}>
                <Text style={styles.outcomeLabel}>The Cost</Text>
                <Text style={styles.outcomeText}>
                  Alex paid the $514 deductible before her plan kicked in and paid the rest.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomLineCard}>
            <View style={styles.outcomeRow}>
              <FileText size={20} color={Colors.textSecondary} />
              <View style={styles.outcomeContent}>
                <Text style={styles.outcomeLabel}>Bottom Line</Text>
                <Text style={styles.outcomeText}>
                  Alex pays a $175 monthly premium, but when Alex needed care, Alex got it immediately and was able to choose any doctor with very low out of pocket costs.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <ContinueButton 
              onPress={() => router.push('/quiz/q05c')} 
              label="Let's See What Fits You Best"
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight + '12',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  profileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  profileDetail: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500' as const,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  timeline: {
    gap: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  timelineNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineNumber: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.textSecondary,
  },
  timelineText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    paddingTop: 3,
  },
  outcomeCard: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  costCard: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  bottomLineCard: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  outcomeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  outcomeContent: {
    flex: 1,
  },
  outcomeLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  outcomeText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  buttonContainer: {
    marginTop: 8,
  },
});