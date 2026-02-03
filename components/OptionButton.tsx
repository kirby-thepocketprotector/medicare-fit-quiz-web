import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface OptionButtonProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
  expandedContent?: string;
  disabled?: boolean;
  showCheckmark?: boolean;
}

export default function OptionButton({
  label,
  selected = false,
  onPress,
  expandedContent,
  disabled = false,
  showCheckmark = true,
}: OptionButtonProps) {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    onPress();
    if (expandedContent && !selected) {
      setExpanded(true);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.container,
          selected && styles.containerSelected,
          disabled && styles.containerDisabled,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text
          style={[
            styles.label,
            selected && styles.labelSelected,
            disabled && styles.labelDisabled,
          ]}
        >
          {label}
        </Text>
        <View style={styles.rightContent}>
          {selected && showCheckmark && (
            <View style={styles.checkIcon}>
              <Check size={18} color={Colors.primary} strokeWidth={2.5} />
            </View>
          )}
          {expandedContent && selected && (
            <TouchableOpacity
              onPress={toggleExpand}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.expandToggle}
            >
              {expanded ? (
                <ChevronUp size={20} color={Colors.primary} />
              ) : (
                <ChevronDown size={20} color={Colors.primary} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {expandedContent && selected && expanded && (
        <View style={styles.expandedContainer}>
          <Text style={styles.expandedText}>{expandedContent}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  containerSelected: {
    backgroundColor: Colors.primaryLight + '10',
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  containerDisabled: {
    opacity: 0.4,
    borderColor: Colors.border,
  },
  label: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500' as const,
    flex: 1,
    lineHeight: 20,
    paddingRight: 8,
  },
  labelSelected: {
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  labelDisabled: {
    color: Colors.textMuted,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandToggle: {
    padding: 2,
  },
  expandedContainer: {
    backgroundColor: Colors.primaryLight + '10',
    borderRadius: 10,
    padding: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: Colors.primaryLight + '20',
  },
  expandedText: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
  },
});
