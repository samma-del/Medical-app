
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar
} from 'react-native';

type Props = {
  onBack?: () => void;
};

export default function AppointmentDetails({ onBack }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your Appointment</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.doctorCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👩‍⚕️</Text>
          </View>
          <View>
            <Text style={styles.doctorName}>Dr. Olivia Turner, M.D.</Text>
            <Text style={styles.subtitle}>Dermato-Endocrinology</Text>
            <Text style={styles.rating}>★★★★★  5.0</Text>
          </View>
        </View>

        <View style={styles.dateRow}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>March 24, Year</Text>
            <Text style={styles.dateText}>Wed, 10:00 AM</Text>
          </View>
          <Text style={styles.check}>✓</Text>
          <Text style={styles.cross}>✕</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Booking For</Text>
          <Text style={styles.value}>Another Person</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>Jane Doe</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>30</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>Female</Text>
        </View>

        <View style={styles.line} />

        <Text style={styles.sectionTitle}>Problem</Text>
        <Text style={styles.description}>
          I have been experiencing skin irritation and redness
          for the past few days. I would like to consult a
          dermatologist about possible treatment options.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    padding: 20, gap: 20
  },
  back: { fontSize: 32, color: '#2864F6' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2864F6' },
  content: { padding: 20 },
  doctorCard: {
    backgroundColor: '#CED9FF', borderRadius: 16,
    padding: 15, flexDirection: 'row', alignItems: 'center'
  },
  avatar: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#fff', justifyContent: 'center',
    alignItems: 'center', marginRight: 12
  },
  avatarText: { fontSize: 30 },
  doctorName: { color: '#2864F6', fontWeight: 'bold', fontSize: 15 },
  subtitle: { color: '#555', fontSize: 11 },
  rating: { color: '#2864F6', marginTop: 5 },
  dateRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 22, gap: 10
  },
  dateBadge: {
    backgroundColor: '#2864F6', borderRadius: 8,
    padding: 10, flex: 1
  },
  dateText: { color: '#fff', fontSize: 12 },
  check: { color: '#2864F6', fontSize: 22 },
  cross: { color: '#2864F6', fontSize: 22 },
  line: {
    height: 1, backgroundColor: '#B5C8FF',
    marginVertical: 22
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 12
  },
  label: { color: '#777', fontSize: 13 },
  value: { color: '#333', fontSize: 13, fontWeight: '600' },
  sectionTitle: { color: '#777', fontSize: 13, marginBottom: 8 },
  description: { color: '#555', fontSize: 12, lineHeight: 19 }
});
