
import React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Page, S, C, Btn } from './ui';

type Props = {
  onDoctors?: () => void;
  onProfile?: () => void;
};

const services = [
  { icon: '✚', name: 'Dermatology' },
  { icon: '♡', name: 'Skin Care' },
  { icon: '☼', name: 'Consultation' },
  { icon: '✦', name: 'Treatment' },
];

const doctors = [
  { name: 'Dr. Sarah Wilson', rating: '4.9' },
  { name: 'Dr. Michael Brown', rating: '4.8' },
  { name: 'Dr. Emily Davis', rating: '4.9' },
];

export default function HomeScreen({
  onDoctors,
  onProfile,
}: Props) {
  return (
    <Page>
      <View style={[S.row, { marginBottom: 22 }]}>
        <View>
          <Text style={S.small}>Good morning!</Text>
          <Text style={S.title}>Skin First</Text>
        </View>

        <Pressable onPress={onProfile} style={styles.profile}>
          <Text style={styles.profileIcon}>☺</Text>
        </Pressable>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Your skin deserves care
        </Text>

        <Text style={styles.bannerText}>
          Book an appointment with trusted specialists.
        </Text>

        <Btn
          title="Find a Doctor"
          onPress={onDoctors}
          secondary
        />
      </View>

      <Text style={styles.heading}>Our Services</Text>

      <View style={styles.serviceGrid}>
        {services.map((service) => (
          <Pressable
            key={service.name}
            style={styles.serviceCard}
            onPress={onDoctors}
          >
            <Text style={styles.serviceIcon}>
              {service.icon}
            </Text>

            <Text style={styles.serviceName}>
              {service.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.heading}>Top Doctors</Text>

      {doctors.map((doctor) => (
        <Pressable
          key={doctor.name}
          style={styles.doctorCard}
          onPress={onDoctors}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>✚</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.doctorName}>
              {doctor.name}
            </Text>

            <Text style={S.small}>
              Dermatologist | Rating: {doctor.rating}
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>
      ))}

      <Btn
        title="See All Doctors"
        onPress={onDoctors}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: C.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 26,
    color: C.blue,
  },
  banner: {
    backgroundColor: C.blue,
    borderRadius: 20,
    padding: 22,
    marginBottom: 20,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },
  bannerText: {
    color: '#E4EBFF',
    marginTop: 8,
    lineHeight: 21,
  },
  heading: {
    color: C.ink,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 14,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: C.light,
    width: '48%',
    borderRadius: 17,
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    fontSize: 30,
    color: C.blue,
  },
  serviceName: {
    color: C.ink,
    fontWeight: '700',
    marginTop: 10,
  },
  doctorCard: {
    backgroundColor: C.light,
    borderRadius: 17,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: C.blue,
    fontSize: 23,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: C.ink,
    marginBottom: 5,
  },
  arrow: {
    color: C.blue,
    fontSize: 28,
  },
});
