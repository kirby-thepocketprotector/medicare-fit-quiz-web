import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';

interface ContinueButtonProps {
  onPress: () => void;
  disabled?: boolean;
  label?: string;
}

export default function ContinueButton({
  onPress,
  disabled = false,
  label = 'Continue',
}: ContinueButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: Colors.backgroundDark,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600' as const,
  },
  textDisabled: {
    color: Colors.textMuted,
  },
});