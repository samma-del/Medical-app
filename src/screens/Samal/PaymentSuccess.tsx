
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar
} from 'react-native';

type Props = {
  onBack?: () => void;
  onDone?: () => void;
};

export default function PaymentSuccess({
  onBack, onDone
}: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.back}>‹</Text>
      </TouchableOpacity>

      <View style={styles.center}>
        <View style={styles.checkCircle}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.congratulation}>Congratulation</Text>
        <Text style={styles.subtitle}>Payment is Successfully</Text>

        <View style={styles.receipt}>
          <Text style={styles.receiptTitle}>
            You have successfully booked an appointment at
          </Text>

          <Text style={styles.doctorName}>
            Dr. Olivia Turner, M.D.
          </Text>

          <View style={styles.dateRow}>
            <Text style={styles.date}>▣ March 24, Year</Text>
            <Text style={styles.date}>◷ 10:00 AM</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={onDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const BLUE = '#2864F6';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLUE },
  backButton: { position: 'absolute', top: 20, left: 25 },
  back: { fontSize: 34, color: '#fff' },
  center: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center', padding: 25
  },
  checkCircle: {
    width: 150, height: 150, borderRadius: 75,
    borderWidth: 5, borderColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 30
  },
  check: { color: '#fff', fontSize: 85, fontWeight: '300' },
  congratulation: {
    color: '#fff', fontSize: 28,
    fontWeight: 'bold', textAlign: 'center'
  },
  subtitle: {
    color: '#fff', fontSize: 16,
    marginTop: 5, marginBottom: 40
  },
  receipt: {
    borderWidth: 1, borderColor: '#fff',
    borderRadius: 15, padding: 20,
    width: '100%', alignItems: 'center'
  },
  receiptTitle: {
    color: '#fff', fontSize: 12,
    textAlign: 'center', lineHeight: 19
  },
  doctorName: {
    color: '#fff', fontWeight: 'bold',
    fontSize: 16, marginTop: 12
  },
  dateRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    width: '100%', marginTop: 12
  },
  date: { color: '#fff', fontSize: 12 },
  doneButton: {
    marginTop: 40, backgroundColor: '#fff',
    paddingVertical: 14, borderRadius: 25,
    width: '80%', alignItems: 'center'
  },
  doneText: { color: BLUE, fontWeight: 'bold' }
});
