
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Page, S, C, Back, Btn } from './ui';
import { doctors } from '../../data/doctors';

type Props = {
  doctorName: string;
  onBack?: () => void;
  onHome?: () => void;
  onBook?: () => void;
};

export default function DoctorProfileScreen({
  doctorName,
  onBack,
  onHome,
  onBook,
}: Props) {
  const doctor = doctors.find(
    (item) => item.name === doctorName
  );

  if (!doctor) {
    return (
      <Page>
        <Back title="Doctor Profile" onPress={onBack} />

        <Text style={S.title}>
          Doctor not found
        </Text>

        <Btn title="Back to Doctors" onPress={onBack} />
      </Page>
    );
  }

  return (
    <Page>
      <Back
        title="Doctor Profile"
        onPress={onBack}
      />

      {/* Doctor photo */}
      <View style={styles.header}>
        {doctor.image ? (
          <Image
            source={{ uri: doctor.image }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar}>
            <Ionicons
              name="person-outline"
              size={60}
              color={C.blue}
            />
          </View>
        )}

        <Text style={styles.name}>
          {doctor.name}
        </Text>

        <Text style={styles.specialty}>
          {doctor.specialty}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons
            name="star"
            size={18}
            color="#F5A623"
          />

          <Text style={styles.rating}>
            {doctor.rating !== null
              ? doctor.rating.toFixed(1)
              : 'No rating'}
          </Text>

          <Text style={S.small}>
            ({doctor.reviews} reviews)
          </Text>
        </View>
      </View>

      {/* Statistics */}
      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Ionicons
            name="briefcase-outline"
            size={26}
            color={C.blue}
          />

          <Text style={styles.statValue}>
            {doctor.experience}
          </Text>

          <Text style={S.small}>
            Years experience
          </Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons
            name="star-outline"
            size={26}
            color={C.blue}
          />

          <Text style={styles.statValue}>
            {doctor.rating ?? '—'}
          </Text>

          <Text style={S.small}>
            Rating
          </Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons
            name="chatbubble-outline"
            size={26}
            color={C.blue}
          />

          <Text style={styles.statValue}>
            {doctor.reviews}
          </Text>

          <Text style={S.small}>
            Reviews
          </Text>
        </View>
      </View>

      {/* About Doctor */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          About Doctor
        </Text>

        <Text style={styles.description}>
          {doctor.name}
        </Text>

        <Text style={styles.description}>
          Specialty: {doctor.specialty}
        </Text>

        <Text style={styles.description}>
          Experience: {doctor.experience} years
        </Text>

        <Text style={styles.description}>
          City: {doctor.city}
        </Text>
      </View>

      {/* Clinic */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          Clinic Information
        </Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="business-outline"
            size={22}
            color={C.blue}
          />

          <Text style={styles.infoText}>
            {doctor.clinic}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={22}
            color={C.blue}
          />

          <Text style={styles.infoText}>
            {doctor.address}, {doctor.city}
          </Text>
        </View>
      </View>

      {/* Specialties */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          Specialties
        </Text>

        {doctor.specialty.split(',').map((item) => (
          <View key={item} style={styles.infoRow}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={C.blue}
            />

            <Text style={styles.infoText}>
              {item.trim()}
            </Text>
          </View>
        ))}
      </View>

      {/* Price */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          Consultation Price
        </Text>

        <Text style={styles.price}>
          {doctor.price !== null
            ? `${doctor.price.toLocaleString('ru-RU')} ₸`
            : 'Price on request'}
        </Text>

        <Text style={S.small}>
          Confirm the current price with the clinic.
        </Text>
      </View>

      {/* Navigation */}
      {onBook && (
        <Btn
          title="Book Appointment (Demo)"
          onPress={onBook}
        />
      )}

      <View style={{ height: 12 }} />

      <Btn
        title="Back to Doctors"
        onPress={onBack}
        secondary
      />

      <View style={{ height: 12 }} />

      <Btn
        title="Go to Home"
        onPress={onHome}
        secondary
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },

  avatar: {
    width: 115,
    height: 115,
    borderRadius: 58,
    backgroundColor: '#E8EEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  name: {
    color: C.ink,
    fontSize: 23,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },

  specialty: {
    color: C.blue,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 10,
  },

  rating: {
    color: C.ink,
    fontSize: 16,
    fontWeight: '700',
  },

  stats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#E8EEFF',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    gap: 6,
  },

  statValue: {
    color: C.blue,
    fontSize: 22,
    fontWeight: '800',
  },

  card: {
    backgroundColor: '#E8EEFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
  },

  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: C.ink,
    marginBottom: 12,
  },

  description: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 24,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },

  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 21,
  },

  price: {
    fontSize: 27,
    fontWeight: '800',
    color: C.blue,
    marginBottom: 8,
  },
});
