
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  Page,
  Header,
  Button,
  colors,
} from './AdemaUI';

import { getDoctorById } from '../../data/doctors';
import { useFavorites } from '../../context/FavoritesContext';

type Props = {
  doctorId?: number;
  onBack?: () => void;
  onServices?: () => void;
};

export default function FavoriteDoctorDetailsScreen({
  doctorId,
  onBack,
  onServices,
}: Props) {
  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const doctor =
    doctorId !== undefined
      ? getDoctorById(doctorId)
      : undefined;

  if (!doctor) {
    return (
      <Page>
        <Header
          title="Doctor Details"
          onBack={onBack}
        />

        <Text style={styles.heading}>
          Doctor not found
        </Text>

        <Button
          title="Go Back"
          onPress={onBack}
        />
      </Page>
    );
  }

  return (
    <Page>
      <Header
        title="Doctor Details"
        onBack={onBack}
      />

      <View style={styles.profile}>
        {doctor.image ? (
          <Image
            source={{ uri: doctor.image }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar}>
            <Ionicons
              name="person-outline"
              size={55}
              color={colors.blue}
            />
          </View>
        )}

        <Text style={styles.name}>
          {doctor.name}
        </Text>

        <Text style={styles.specialty}>
          {doctor.specialty}
        </Text>

        <Text style={styles.description}>
          Rating: {doctor.rating ?? 'No rating'}
          {'  |  '}
          {doctor.experience} years experience
        </Text>

        <Pressable
          style={styles.favoriteButton}
          onPress={() =>
            toggleFavorite(doctor.id)
          }
        >
          <Ionicons
            name={
              isFavorite(doctor.id)
                ? 'heart'
                : 'heart-outline'
            }
            size={22}
            color="#E54865"
          />

          <Text style={styles.favoriteText}>
            {isFavorite(doctor.id)
              ? 'Remove from Favorites'
              : 'Add to Favorites'}
          </Text>
        </Pressable>
      </View>

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

      <View style={styles.card}>
        <Text style={styles.heading}>
          Clinic Information
        </Text>

        <View style={styles.row}>
          <Ionicons
            name="business-outline"
            color={colors.blue}
            size={23}
          />

          <Text style={styles.rowText}>
            {doctor.clinic}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="location-outline"
            color={colors.blue}
            size={23}
          />

          <Text style={styles.rowText}>
            {doctor.address}, {doctor.city}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Specialties
        </Text>

        {doctor.specialty
          .split(',')
          .map((specialty) => (
            <View
              key={specialty}
              style={styles.row}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colors.blue}
              />

              <Text style={styles.rowText}>
                {specialty.trim()}
              </Text>
            </View>
          ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Consultation Price
        </Text>

        <Text style={styles.price}>
          {doctor.price !== null
            ? `${doctor.price.toLocaleString('ru-RU')} ₸`
            : 'Price on request'}
        </Text>

        <Text style={styles.description}>
          Confirm the current price with the clinic.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Rating and Reviews
        </Text>

        <View style={styles.row}>
          <Ionicons
            name="star"
            size={23}
            color="#F5A623"
          />

          <Text style={styles.rowText}>
            {doctor.rating ?? 'No rating'}
            {'  |  '}
            {doctor.reviews} reviews
          </Text>
        </View>
      </View>

      <Button
        title="View Favorite Services"
        onPress={onServices}
      />

      <Button
        title="Back to Favorites"
        onPress={onBack}
        secondary
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    marginVertical: 22,
    gap: 10,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 8,
  },

  specialty: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 23,
  },

  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 25,
    padding: 12,
    gap: 8,
    marginVertical: 10,
  },

  favoriteText: {
    fontSize: 13,
    color: colors.blue,
    fontWeight: '600',
  },

  card: {
    backgroundColor: colors.light,
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
  },

  heading: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 8,
  },

  rowText: {
    flex: 1,
    color: colors.muted,
    fontSize: 14,
  },

  price: {
    color: colors.blue,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },
});
