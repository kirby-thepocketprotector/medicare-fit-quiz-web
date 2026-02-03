import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface QuizHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export default function QuizHeader({ currentStep, totalSteps, onBack }: QuizHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>
          {currentStep} of {totalSteps}
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicator: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '500' as const,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: Colors.backgroundDark,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
});