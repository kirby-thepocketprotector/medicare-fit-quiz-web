import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface QuestionHeaderProps {
  icon: LucideIcon;
  question: string;
  subtext?: string;
}

export default function QuestionHeader({ icon: Icon, question, subtext }: QuestionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon size={24} color={Colors.primary} />
      </View>
      <Text style={styles.question}>{question}</Text>
      {subtext && <Text style={styles.subtext}>{subtext}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.primaryLight + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  question: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  subtext: {
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textSecondary,
    marginTop: 12,
  },
});