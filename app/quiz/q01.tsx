import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, ChevronDown } from 'lucide-react-native';
import QuizHeader from '@/components/QuizHeader';
import QuestionHeader from '@/components/QuestionHeader';
import WhyWeAskBox from '@/components/WhyWeAskBox';
import ContinueButton from '@/components/ContinueButton';
import { useQuiz } from '@/contexts/QuizContext';
import { MONTHS, YEARS } from '@/constants/quiz-data';
import Colors from '@/constants/colors';

export default function Q01Screen() {
  const router = useRouter();
  const { answers, setBirthDate, setCurrentStep } = useQuiz();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(answers.birthMonth);
  const [selectedYear, setSelectedYear] = useState<string | null>(answers.birthYear);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const isValid = selectedMonth !== null && selectedYear !== null;

  const handleContinue = () => {
    if (selectedMonth && selectedYear) {
      setBirthDate(selectedMonth, selectedYear);
      setCurrentStep(1);
      
      const monthIndex = MONTHS.indexOf(selectedMonth);
      const birthYear = parseInt(selectedYear, 10);
      const birthDate = new Date(birthYear, monthIndex, 1);
      const today = new Date();
      
      const turnedOrTurning65 = new Date(birthDate);
      turnedOrTurning65.setFullYear(birthDate.getFullYear() + 65);
      
      const iepStart = new Date(turnedOrTurning65);
      iepStart.setMonth(iepStart.getMonth() - 3);
      
      const iepEnd = new Date(turnedOrTurning65);
      iepEnd.setMonth(iepEnd.getMonth() + 3);
      
      const isInIEP = today >= iepStart && today <= iepEnd;
      
      if (isInIEP) {
        router.push('/quiz/q01a');
      } else {
        router.push('/quiz/q02');
      }
    }
  };

  const renderPickerModal = (
    visible: boolean,
    onClose: () => void,
    data: string[],
    onSelect: (item: string) => void,
    title: string
  ) => (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalDone}>Done</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.pickerItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.pickerItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuizHeader currentStep={1} totalSteps={10} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <QuestionHeader
            icon={Calendar}
            question="What month and year were you born?"
          />

          <View style={styles.pickersContainer}>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowMonthPicker(true)}
            >
              <Text style={[
                styles.pickerText,
                !selectedMonth && styles.pickerPlaceholder
              ]}>
                {selectedMonth || 'Select month'}
              </Text>
              <ChevronDown size={20} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowYearPicker(true)}
            >
              <Text style={[
                styles.pickerText,
                !selectedYear && styles.pickerPlaceholder
              ]}>
                {selectedYear || 'Select year'}
              </Text>
              <ChevronDown size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>

          <WhyWeAskBox
            content="This tells us if you're in or close to your Initial Enrollment Period (IEP), a critical time when MediGap providers cannot ask health questions, upcharge you, or deny you.

This is a very important one-time window. If you miss it, getting MediGap later can be difficult or even impossible."
          />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <ContinueButton onPress={handleContinue} disabled={!isValid} />
        </View>

        {renderPickerModal(
          showMonthPicker,
          () => setShowMonthPicker(false),
          MONTHS,
          setSelectedMonth,
          'Select Month'
        )}

        {renderPickerModal(
          showYearPicker,
          () => setShowYearPicker(false),
          YEARS,
          setSelectedYear,
          'Select Year'
        )}
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
  pickersContainer: {
    gap: 12,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 18,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  pickerText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  pickerPlaceholder: {
    color: Colors.textMuted,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  modalDone: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  pickerItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  pickerItemText: {
    fontSize: 16,
    color: Colors.text,
  },
});