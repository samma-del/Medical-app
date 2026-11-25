
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
import { Page, S, C, Back } from './ui';
import { searchDoctors } from '../../data/doctors';

type Props = {
  onBack?: () => void;
  onDoctor?: (name: string) => void;
};

type Gender = 'all' | 'female' | 'male';

export default function DoctorsScreen({
  onBack,
  onDoctor,
}: Props) {
  const [query, setQuery] = useState('');
  const [gender, setGender] = useState<Gender>('all');

  const filteredDoctors = searchDoctors(query).filter(
    (doctor) =>
      gender === 'all' || doctor.gender === gender
  );

  return (
    <Page>
      <Back title="Doctors" onPress={onBack} />

      <Text style={S.title}>Find your doctor</Text>

      <Text style={S.sub}>
        Experienced specialists for your skin.
      </Text>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={22}
          color={C.blue}
        />

        <TextInput
          placeholder="Search doctor or specialty..."
          placeholderTextColor="#8798B7"
          value={query}
          onChangeText={setQuery}
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

      {/* Gender filter */}
      <View style={styles.filters}>
        {(['all', 'female', 'male'] as const).map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setGender(item)}
              style={[
                styles.filterButton,
                gender === item && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  gender === item &&
                    styles.activeFilterText,
                ]}
              >
                {item === 'all'
                  ? 'All'
                  : item === 'female'
                  ? 'Female'
                  : 'Male'}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.heading}>
          Available Doctors
        </Text>

        <Text style={S.small}>
          {filteredDoctors.length} doctors
        </Text>
      </View>

      {/* Doctors */}
      {filteredDoctors.map((doctor) => (
        <Pressable
          key={doctor.id}
          style={styles.card}
          onPress={() => onDoctor?.(doctor.name)}
        >
          <View style={styles.cardContent}>
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

            <View style={styles.info}>
              <Text style={styles.doctorName}>
                {doctor.name}
              </Text>

              <Text style={styles.specialty}>
                {doctor.specialty}
              </Text>

              <Text style={S.small}>
                Experience: {doctor.experience} years
              </Text>

              <View style={styles.infoRow}>
                <Ionicons
                  name="business-outline"
                  size={15}
                  color={C.blue}
                />

                <Text style={styles.detailText}>
                  {doctor.clinic}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons
                  name="location-outline"
                  size={15}
                  color={C.blue}
                />

                <Text style={styles.detailText}>
                  {doctor.address}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons
                  name="star"
                  size={16}
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

              <Text style={styles.price}>
                {doctor.price !== null
                  ? `${doctor.price.toLocaleString('ru-RU')} ₸`
                  : 'Price on request'}
              </Text>
            </View>
          </View>

          <View style={styles.profileButton}>
            <Text style={styles.profileButtonText}>
              View Profile
            </Text>

            <Ionicons
              name="chevron-forward"
              size={17}
              color="#FFFFFF"
            />
          </View>
        </Pressable>
      ))}

      {/* Empty search result */}
      {filteredDoctors.length === 0 && (
        <View style={styles.empty}>
          <Ionicons
            name="search-outline"
            size={48}
            color="#8798B7"
          />

          <Text style={styles.heading}>
            No doctors found
          </Text>

          <Text style={S.small}>
            Try another name or specialty.
          </Text>
        </View>
      )}

      <Text style={styles.footer}>
        Almaty, Kazakhstan
      </Text>

      <Text style={styles.footer}>
        Please confirm prices and availability
        directly with the clinic.
      </Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EEFF',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 18,
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

  filterButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#E8EEFF',
    borderRadius: 25,
    alignItems: 'center',
  },

  activeFilter: {
    backgroundColor: C.blue,
  },

  filterText: {
    color: C.blue,
    fontWeight: '600',
    fontSize: 14,
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  heading: {
    fontSize: 19,
    fontWeight: '800',
    color: C.ink,
  },

  card: {
    backgroundColor: '#E8EEFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#CDD9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    flex: 1,
    gap: 5,
  },

  doctorName: {
    color: C.ink,
    fontSize: 16,
    fontWeight: '700',
  },

  specialty: {
    color: C.blue,
    fontSize: 14,
    fontWeight: '600',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  detailText: {
    flex: 1,
    color: '#64748B',
    fontSize: 12,
  },

  rating: {
    color: C.ink,
    fontWeight: '700',
    fontSize: 14,
  },

  price: {
    color: C.blue,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 5,
  },

  profileButton: {
    backgroundColor: C.blue,
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  profileButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 45,
    gap: 12,
  },

  footer: {
    color: '#8798B7',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});
