
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity
} from 'react-native';

type Tab = 'Complete' | 'Upcoming' | 'Cancelled';

type Props = {
  onDetails?: () => void;
  onReview?: () => void;
  onCancel?: () => void;
  onRebook?: () => void;
  onBack?: () => void;
};

const doctors = [
  { id: 1, name: 'Dr. Olivia Turner, M.D.', specialty: 'Dermato-Endocrinology' },
  { id: 2, name: 'Dr. Alexander Bennett, Ph.D.', specialty: 'Dermato-Surgery' },
  { id: 3, name: 'Dr. Sophia Martinez, Ph.D.', specialty: 'Cosmetic Dermatology' },
  { id: 4, name: 'Dr. Alexander Clark, M.D.', specialty: 'Dermatology' }
];

export default function AllAppointments({
  onDetails, onReview, onCancel, onRebook, onBack
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Upcoming');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>All Appointment</Text>
      </View>

      <View style={styles.tabs}>
        {(['Complete', 'Upcoming', 'Cancelled'] as Tab[]).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeText
            ]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {doctors.map(doctor => (
          <View key={doctor.id} style={styles.card}>
            <View style={styles.doctorRow}>
              <View style={styles.avatar}>
                <Text style={{ fontSize: 25 }}>👩‍⚕️</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{doctor.name}</Text>
                <Text style={styles.specialty}>{doctor.specialty}</Text>
                <Text style={styles.rating}>★★★★★</Text>
              </View>
            </View>

            {activeTab === 'Upcoming' && (
              <>
                <Text style={styles.date}>March 24, Year  •  10:00 AM</Text>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.button} onPress={onDetails}>
                    <Text style={styles.buttonText}>Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={onCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {activeTab === 'Complete' && (
              <View style={styles.actions}>
                <TouchableOpacity style={styles.button} onPress={onRebook}>
                  <Text style={styles.buttonText}>Re-Book</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onReview}>
                  <Text style={styles.buttonText}>Add Review</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeTab === 'Cancelled' && (
              <TouchableOpacity style={styles.button} onPress={onReview}>
                <Text style={styles.buttonText}>Add Review</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const BLUE = '#2864F6';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    padding: 20, gap: 20
  },
  back: { color: BLUE, fontSize: 32 },
  title: { color: BLUE, fontSize: 20, fontWeight: 'bold' },
  tabs: {
    flexDirection: 'row', justifyContent: 'space-around',
    marginHorizontal: 20, marginBottom: 15
  },
  tab: {
    backgroundColor: '#D7E1FF', paddingVertical: 9,
    paddingHorizontal: 17, borderRadius: 25
  },
  activeTab: { backgroundColor: BLUE },
  tabText: { color: BLUE, fontSize: 12 },
  activeText: { color: '#fff' },
  list: { paddingHorizontal: 20, paddingBottom: 30 },
  card: {
    backgroundColor: '#CCD8FF', borderRadius: 16,
    padding: 14, marginBottom: 14
  },
  doctorRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#fff', justifyContent: 'center',
    alignItems: 'center', marginRight: 12
  },
  name: { color: BLUE, fontSize: 13, fontWeight: 'bold' },
  specialty: { color: '#555', fontSize: 10 },
  rating: { color: BLUE, fontSize: 12, marginTop: 4 },
  date: {
    color: '#555', fontSize: 11,
    backgroundColor: '#fff', borderRadius: 10,
    padding: 6, marginVertical: 8
  },
  actions: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 10, marginTop: 8
  },
  button: {
    backgroundColor: BLUE, paddingVertical: 8,
    paddingHorizontal: 20, borderRadius: 20,
    alignItems: 'center', flex: 1
  },
  buttonText: { color: '#fff', fontSize: 12, fontWeight: '600' }
});
