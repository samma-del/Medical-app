
import React, { useState } from 'react';

import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { Page, S, C, Back } from './ui';
import { searchDoctors } from '../../data/doctors';
import { useFavorites } from '../../context/FavoritesContext';

type Props = {
  onBack?: () => void;
  onDoctor?: (name: string) => void;
};

type Gender = 'all' | 'female' | 'male';

export default function DoctorsScreen({
  onBack,
  onDoctor,
}: Props) {

  // Подключение переводов

  const { t, i18n } = useTranslation();

  const locale =
    i18n.resolvedLanguage === 'kk'
      ? 'kk-KZ'
      : i18n.resolvedLanguage === 'ru'
      ? 'ru-KZ'
      : 'en-US';

  // Поиск и фильтрация

  const [query, setQuery] = useState('');

  const [gender, setGender] =
    useState<Gender>('all');

  // Избранные врачи

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const filteredDoctors = searchDoctors(query).filter(
    (doctor) =>
      gender === 'all' ||
      doctor.gender === gender
  );

  return (
    <Page>

      {/* HEADER */}

      <Back
        title={t('doctors')}
        onPress={onBack}
      />

      <Text style={S.title}>
        {t('findDoctor')}
      </Text>

      <Text style={S.sub}>
        {t('doctorDescription')}
      </Text>

      {/* SEARCH */}

      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={22}
          color={C.blue}
        />

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t('searchDoctor')}
          placeholderTextColor="#8798B7"
          style={styles.searchInput}
        />

        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons
              name="close-circle"
              size={20}
              color={C.blue}
            />
          </Pressable>
        )}
      </View>

      {/* FILTERS */}

      <View style={styles.filters}>
        {(['all', 'female', 'male'] as const).map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setGender(item)}
              style={[
                styles.filter,
                gender === item &&
                  styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  gender === item &&
                    styles.activeFilterText,
                ]}
              >
                {t(item)}
              </Text>
            </Pressable>
          )
        )}
      </View>

      {/* SECTION TITLE */}

      <View style={styles.section}>
        <Text style={styles.heading}>
          {t('availableDoctors')}
        </Text>

        <Text style={S.small}>
          {t('doctorCount')}: {filteredDoctors.length}
        </Text>
      </View>

      {/* DOCTOR CARDS */}

      {filteredDoctors.map((doctor) => (
        <View
          key={doctor.id}
          style={styles.card}
        >
          <View style={styles.cardRow}>

            {/* Doctor photo */}

            {doctor.image ? (
              <Image
                source={{ uri: doctor.image }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatar}>
                <Ionicons
                  name="person-outline"
                  size={35}
                  color={C.blue}
                />
              </View>
            )}

            {/* Doctor information */}

            <View style={styles.info}>
              <Text style={styles.name}>
                {doctor.name}
              </Text>

              <Text style={styles.specialty}>
                {doctor.specialty}
              </Text>

              <Text style={S.small}>
                {t('experience')}:{' '}
                {doctor.experience} {t('years')}
              </Text>

              <Text style={S.small}>
                {t('clinic')}: {doctor.clinic}
              </Text>

              <Text style={S.small}>
                {t('address')}: {doctor.address}
              </Text>

              {/* Rating */}

              <View style={styles.ratingRow}>
                <Ionicons
                  name="star"
                  size={16}
                  color="#F5A623"
                />

                <Text style={S.small}>
                  {doctor.rating !== null
                    ? doctor.rating.toLocaleString(
                        locale,
                        {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        }
                      )
                    : t('noRating')}
                </Text>

                <Text style={S.small}>
                  ({t('reviews')}: {doctor.reviews})
                </Text>
              </View>

              {/* Consultation price */}

              <Text style={styles.price}>
                {doctor.price !== null
                  ? `${doctor.price.toLocaleString(locale)} ₸`
                  : t('priceOnRequest')}
              </Text>
            </View>

            {/* Favorite button */}

            <Pressable
              accessibilityLabel={
                isFavorite(doctor.id)
                  ? t('removeFavorite')
                  : t('addFavorite')
              }
              onPress={() =>
                toggleFavorite(doctor.id)
              }
              style={styles.heart}
            >
              <Ionicons
                name={
                  isFavorite(doctor.id)
                    ? 'heart'
                    : 'heart-outline'
                }
                size={25}
                color={
                  isFavorite(doctor.id)
                    ? '#E54865'
                    : C.blue
                }
              />
            </Pressable>

          </View>

          {/* View profile button */}

          <Pressable
            style={styles.profileButton}
            onPress={() =>
              onDoctor?.(doctor.name)
            }
          >
            <Text style={styles.buttonText}>
              {t('viewProfile')}
            </Text>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#FFFFFF"
            />
          </Pressable>

        </View>
      ))}

      {/* EMPTY SEARCH RESULT */}

      {filteredDoctors.length === 0 && (
        <View style={styles.empty}>
          <Ionicons
            name="search-outline"
            size={45}
            color={C.blue}
          />

          <Text style={styles.heading}>
            {t('noDoctorsFound')}
          </Text>
        </View>
      )}

      {/* FOOTER */}

      <Text style={styles.footer}>
        {t('almatyKazakhstan')}
      </Text>

      <Text style={styles.footer}>
        {t('confirmClinicInformation')}
      </Text>

    </Page>
  );
}

// STYLES

const styles = StyleSheet.create({

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EEFF',
    borderRadius: 17,
    paddingHorizontal: 14,
    marginVertical: 20,
    gap: 10,
  },

  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: C.ink,
  },

  filters: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },

  filter: {
    flex: 1,
    backgroundColor: '#E8EEFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 5,
    alignItems: 'center',
  },

  activeFilter: {
    backgroundColor: C.blue,
  },

  filterText: {
    color: C.blue,
    fontWeight: '700',
    textAlign: 'center',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },

  heading: {
    flexShrink: 1,
    fontSize: 19,
    fontWeight: '800',
    color: C.ink,
  },

  card: {
    backgroundColor: '#E8EEFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 14,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#CDD9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    flex: 1,
    gap: 5,
  },

  name: {
    fontSize: 15,
    fontWeight: '800',
    color: C.ink,
  },

  specialty: {
    fontSize: 13,
    color: C.blue,
    fontWeight: '600',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },

  price: {
    fontSize: 17,
    fontWeight: '800',
    color: C.blue,
  },

  heart: {
    padding: 3,
  },

  profileButton: {
    backgroundColor: C.blue,
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },

  footer: {
    textAlign: 'center',
    color: '#8798B7',
    fontSize: 12,
    marginTop: 12,
  },

});
