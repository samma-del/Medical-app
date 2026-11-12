
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Alert, ScrollView
} from 'react-native';

type Props = {
  onBack?: () => void;
  onConfirm?: (reason: string) => void;
};

const reasons = [
  'Rescheduling',
  'Weather Conditions',
  'Unexpected Work',
  'Others'
];

export default function CancelAppointment({
  onBack, onConfirm
}: Props) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const handleCancel = () => {
    if (!reason) {
      Alert.alert('Select Reason', 'Please select a reason.');
      return;
    }

    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => onConfirm?.(
            reason === 'Others' && details.trim()
              ? details.trim()
              : reason
          )
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cancel Appointment</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>
          Please select the reason for cancelling your appointment.
          This helps us improve our services.
        </Text>

        {reasons.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.reason,
              reason === item && styles.selected
            ]}
            onPress={() => setReason(item)}
          >
            <View style={[
              styles.radio,
              reason === item && styles.radioActive
            ]}>
              {reason === item && <View style={styles.dot} />}
            </View>
            <Text style={styles.reasonText}>{item}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.description}>
          You can provide additional details about your cancellation.
        </Text>

        <TextInput
          style={styles.textarea}
          multiline
          placeholder="Enter Your Reason Here..."
          placeholderTextColor="#91A7E9"
          value={details}
          onChangeText={setDetails}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const BLUE = '#2864F6';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    padding: 20, gap: 18
  },
  back: { color: BLUE, fontSize: 32 },
  title: { color: BLUE, fontSize: 20, fontWeight: 'bold' },
  content: { paddingHorizontal: 25, paddingBottom: 40 },
  description: {
    fontSize: 12, color: '#777',
    lineHeight: 19, marginBottom: 18
  },
  reason: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, borderRadius: 20, marginBottom: 5
  },
  selected: { backgroundColor: '#CBD8FF' },
  radio: {
    width: 17, height: 17, borderRadius: 9,
    borderWidth: 1.5, borderColor: BLUE,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 10
  },
  radioActive: { borderColor: BLUE },
  dot: {
    width: 9, height: 9, borderRadius: 5,
    backgroundColor: BLUE
  },
  reasonText: { fontSize: 13, color: '#555' },
  textarea: {
    height: 130, backgroundColor: '#EDF2FF',
    borderRadius: 15, padding: 15,
    color: '#333', fontSize: 13
  },
  button: {
    backgroundColor: BLUE, borderRadius: 25,
    padding: 15, alignItems: 'center',
    marginTop: 40, alignSelf: 'center',
    width: '85%'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
