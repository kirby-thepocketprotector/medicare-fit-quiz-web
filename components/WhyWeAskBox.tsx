import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Info } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface WhyWeAskBoxProps {
  title?: string;
  content: string;
}

export default function WhyWeAskBox({ title = 'Why We Ask', content }: WhyWeAskBoxProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Info size={16} color={Colors.primary} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight + '10',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.primaryLight + '20',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
});