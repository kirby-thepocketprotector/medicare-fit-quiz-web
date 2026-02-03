import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function ArticlePage() {
  const router = useRouter();

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              Why I Would Never Get a Medicare Advantage Plan
            </Text>
            <Text style={styles.subtitle}>
              And Recommend Medigap Instead
            </Text>
            <Text style={styles.byline}>
              By Jarret DiToro, {today}
            </Text>
          </View>

          <Image
            source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/9m3dbjudnhucru60sj818' }}
            style={styles.heroImage}
            contentFit="cover"
          />

          <View style={styles.content}>
            <Text style={styles.paragraph}>
              There are so many companies selling Medicare Advantage that it&apos;s very easy to fall for the pitch. Now don&apos;t get me wrong, there are people who SHOULD get a Medicare Advantage plan. We just don&apos;t want folks getting blinded by all the marketing, and to make an informed decision that makes sense for THEM, not for the big insurance companies. Here&apos;s how we advise our own clients.
            </Text>

            <Text style={styles.sectionHeader}>
              Why MediGap vs Medicare Advantage?
            </Text>

            <Text style={styles.paragraph}>
              Medicare Advantage plans cost $0 per month and include prescription drug plans at no extra cost, so they seem like a smart choice, right?
            </Text>

            <Text style={styles.paragraph}>
              Then why do we almost always recommend our clients avoid them if they can (with the exceptions we&apos;ll go into below)?
            </Text>

            <Text style={styles.paragraph}>
              It&apos;s simple. Medicare Advantage plans do two things we don&apos;t like: they restrict which doctors you can see to a list of providers they have negotiated deals with (and that list might not include the top-ranked specialist you want), and they usually force you to get approved for (and sometimes delay or deny) any expensive procedures before you can schedule them.
            </Text>

            <Text style={styles.paragraph}>
              Both of these tactics are designed to reduce cost to the big insurance companies, but could cost YOU critical time and critical care quality at the worst possible time for your health.
            </Text>

            <Text style={styles.paragraph}>
              Neither of these concerns apply to MediGap plans. Yes, you pay more for these plans (usually about $120-$200 a month in addition to your Part B premium) but what you get is priceless in our opinion: the ability to see any doctor that takes Medicare in the entire country (over 99% of all providers in the US) without a referral and on your timeline.
            </Text>

            <Text style={styles.paragraphBold}>
              When your health is on the line, we simply can&apos;t overstate how valuable that is.
            </Text>

            <Text style={styles.sectionHeader}>
              Does Medicare Advantage EVER Make Sense?
            </Text>

            <Text style={styles.paragraph}>
              Yes, it does, but not so often as to justify the nearly 50% of folks choosing it today. Here are situations where Medicare Advantage could make more sense:
            </Text>

            <View style={styles.highlightBox}>
              <Text style={styles.highlightTitle}>
                If you have Medicaid AND Medicare:
              </Text>
              <Text style={styles.highlightText}>
                For those on Medicaid and Medicare, a certain type of Medicare Advantage plan called a D-SNP plan joins the two programs together beautifully, provides a lot of benefits and won&apos;t cost you any monthly premium at all. The D-SNP plans are basically some of the most comprehensive health insurance packages seniors can have.
              </Text>
            </View>

            <View style={styles.highlightBox}>
              <Text style={styles.highlightTitle}>
                If you&apos;re a military veteran:
              </Text>
              <Text style={styles.highlightText}>
                Especially for those on TRICARE or any veteran who gets the majority of their care through the VA, there are specially designed plans that work very well for veterans, and provide money back onto your social security checks each month.
              </Text>
            </View>

            <View style={styles.highlightBox}>
              <Text style={styles.highlightTitle}>
                If you absolutely can&apos;t pay for MediGap:
              </Text>
              <Text style={styles.highlightText}>
                We question if this is in your long term financial interest, but if you can&apos;t swing it you can&apos;t swing it. In this case we would want to get really into the nitty gritty with you. Once we understand exactly which doctors you see, what pharmacy you use and which hospitals are near you, we can help you weed through all the plans to find one that includes what you need. But careful: networks change every year, so it&apos;s not a set it and forget it thing: we&apos;ll have to revisit this with you at least every year, possibly more.
              </Text>
            </View>

            <Text style={styles.sectionHeader}>
              The Importance of Your &quot;New to Medicare&quot; Window
            </Text>

            <Text style={styles.paragraph}>
              Here&apos;s something critical: You can always switch FROM MediGap TO Medicare Advantage without penalty. But going the other way? Not so easy.
            </Text>

            <Text style={styles.paragraph}>
              By law, insurers must offer the same MediGap pricing to everyone who&apos;s new to Medicare—but only during your first 6 months. Miss that window, and they can charge more or even refuse coverage.
            </Text>

            <Text style={styles.paragraphBold}>
              Make sure you understand your options before your new-to-Medicare window closes, after which insurances can legally deny you MediGap coverage.
            </Text>

            <Text style={styles.sectionHeader}>
              So Bottom Line: MediGap or Medicare Advantage - Which Should You Choose?
            </Text>

            <Text style={styles.paragraph}>
              The answer to this is so important we created a short quiz to help you get a clear, unbiased answer.
            </Text>

            <Text style={styles.paragraph}>
              It&apos;s based on your facts and needs, nobody else&apos;s. And it only takes 2 minutes.
            </Text>

            <TouchableOpacity
              style={styles.inlineCta}
              onPress={() => router.push('/splash')}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaText}>Take the 2-Minute Medicare Fit Quiz</Text>
            </TouchableOpacity>
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
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500' as const,
    color: Colors.primary,
    marginTop: 8,
  },
  byline: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 16,
  },
  heroImage: {
    width: width - 32,
    height: 220,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.backgroundDark,
  },
  content: {
    padding: 24,
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 26,
    color: Colors.text,
    marginBottom: 16,
  },
  paragraphBold: {
    fontSize: 17,
    lineHeight: 26,
    color: Colors.text,
    fontWeight: '600' as const,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
    marginTop: 24,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  highlightBox: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  inlineCta: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
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
});