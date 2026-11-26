
import React from 'react';
import {
  Text,
  View,
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
  onServices?: () => void;
  onMale?: () => void;
};

export default function FavoriteDoctorsScreen({
  onBack,
  onDetails,
  onServices,
  onMale,
}: Props) {
  const {
    favoriteDoctors,
    toggleFavorite,
  } = useFavorites();

  return (
    <Page>
      <Header
        title="Favorite Doctors"
        onBack={onBack}
      />

      <Text style={S.title}>
        My Favorites
      </Text>

      <Text style={styles.subtitle}>
        Doctors you saved for quick access.
      </Text>

      <View style={styles.filters}>
        <Pressable
          style={styles.activeFilter}
        >
          <Text style={styles.activeText}>
            All Doctors
          </Text>
        </Pressable>

        <Pressable
          style={styles.filter}
          onPress={onServices}
        >
          <Text style={styles.filterText}>
            Services
          </Text>
        </Pressable>

        <Pressable
          style={styles.filter}
          onPress={onMale}
        >
          <Text style={styles.filterText}>
            Male Doctors
          </Text>
        </Pressable>
      </View>

      {favoriteDoctors.map((doctor) => (
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
                  size={28}
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
                Experience: {doctor.experience} years
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
            style={styles.heart}
          >
            <Ionicons
              name="heart"
              size={24}
              color="#E54865"
            />
          </Pressable>
        </View>
      ))}

      {favoriteDoctors.length === 0 && (
        <View style={styles.empty}>
          <Ionicons
            name="heart-outline"
            size={65}
            color={colors.blue}
          />

          <Text style={styles.emptyTitle}>
            No favorite doctors yet
          </Text>

          <Text style={styles.emptyText}>
            Open Doctors and tap the heart
            icon to save a specialist.
          </Text>

          <Button
            title="Go Back"
            onPress={onBack}
          />
        </View>
      )}

      <Button
        title="Favorite Services"
        onPress={onServices}
      />

      <Button
        title="Male Doctors"
        onPress={onMale}
        secondary
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 22,
  },

  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },

  filter: {
    flex: 1,
    backgroundColor: colors.light,
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: 'center',
  },

  activeFilter: {
    flex: 1,
    backgroundColor: colors.blue,
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: 'center',
  },

  activeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  filterText: {
    fontSize: 12,
    color: colors.blue,
    fontWeight: '700',
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
    fontSize: 13,
    fontWeight: '600',
  },

  heart: {
    padding: 8,
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 35,
    gap: 14,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.ink,
    textAlign: 'center',
  },

  emptyText: {
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 21,
  },
});
