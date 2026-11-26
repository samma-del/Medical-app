
import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  Page,
  Header,
  Button,
  colors,
  styles as S,
} from './AdemaUI';

import { useFavorites } from '../../context/FavoritesContext';

type Props = {
  onBack?: () => void;
  onDetails?: (id: number) => void;
};

export default function FavoriteMaleDoctorsScreen({
  onBack,
  onDetails,
}: Props) {
  const {
    favoriteDoctors,
    toggleFavorite,
  } = useFavorites();

  const maleDoctors = favoriteDoctors.filter(
    (doctor) => doctor.gender === 'male'
  );

  return (
    <Page>
      <Header
        title="Male Doctors"
        onBack={onBack}
      />

      <Text style={S.title}>
        Favorite Male Doctors
      </Text>

      <Text style={styles.subtitle}>
        Your saved male specialists.
      </Text>

      {maleDoctors.map((doctor) => (
        <View
          key={doctor.id}
          style={styles.card}
        >
          <Pressable
            style={styles.cardMain}
            onPress={() =>
              onDetails?.(doctor.id)
            }
          >
            {doctor.image ? (
              <Image
                source={{ uri: doctor.image }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatar}>
                <Ionicons
                  name="person-outline"
                  size={30}
                  color={colors.blue}
                />
              </View>
            )}

            <View style={styles.info}>
              <Text style={styles.name}>
                {doctor.name}
              </Text>

              <Text style={styles.description}>
                {doctor.specialty}
              </Text>

              <Text style={styles.description}>
                {doctor.clinic}
              </Text>

              <Text style={styles.description}>
                {doctor.experience} years experience
              </Text>

              <Text style={styles.rating}>
                Rating: {doctor.rating ?? 'No rating'}
              </Text>
            </View>
          </Pressable>

          <Pressable
            accessibilityLabel="Remove from favorites"
            onPress={() =>
              toggleFavorite(doctor.id)
            }
            style={{ padding: 8 }}
          >
            <Ionicons
              name="heart"
              size={24}
              color="#E54865"
            />
          </Pressable>
        </View>
      ))}

      {maleDoctors.length === 0 && (
        <View style={styles.empty}>
          <Ionicons
            name="person-outline"
            size={60}
            color={colors.blue}
          />

          <Text style={styles.name}>
            No saved male doctors
          </Text>

          <Text style={styles.subtitle}>
            Add male specialists to your favorites.
          </Text>
        </View>
      )}

      <Button
        title="All Favorites"
        onPress={onBack}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    marginVertical: 15,
    textAlign: 'center',
  },

  card: {
    backgroundColor: colors.light,
    borderRadius: 20,
    padding: 15,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    flex: 1,
    gap: 5,
  },

  name: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
  },

  description: {
    color: colors.muted,
    fontSize: 13,
  },

  rating: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 13,
  },

  empty: {
    paddingVertical: 40,
    alignItems: 'center',
    gap: 12,
  },
});
