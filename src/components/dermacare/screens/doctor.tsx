
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  BottomNav,
  PillButton,
} from '../ui';

import {
  doctors,
  Doctor,
} from '../../../data/doctors';

import {
  useBooking,
} from '../../../context/BookingContext';

import {
  useFavorites,
} from '../../../context/FavoritesContext';

const BLUE = '#2463FF';
const LIGHT = '#DCE4FF';
const SOFT = '#EAF0FF';
const INK = '#18213D';

const times = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '13:00',
  '13:30',
  '14:00',
  '15:00',
];

// DOCTOR PROFILE

export function DoctorProfileScreen() {
  const navigation = useNavigation<any>();

  const {
    selectedDoctor,
    setSelectedDoctor,
  } = useBooking();

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const openDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Pressable
          onPress={() => {
            if (selectedDoctor) {
              setSelectedDoctor(null);
            } else if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color={BLUE}
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Doctor Profile
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
      >
        {!selectedDoctor ? (
          <>
            <Text style={styles.title}>
              Select a Doctor
            </Text>

            {doctors.map((doctor) => (
              <Pressable
                key={doctor.id}
                style={styles.doctorCard}
                onPress={() => openDoctor(doctor)}
              >
                <View style={styles.smallAvatar}>
                  <Ionicons
                    name="person-outline"
                    size={28}
                    color={BLUE}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.doctorName}>
                    {doctor.name}
                  </Text>

                  <Text style={styles.description}>
                    {doctor.specialty}
                  </Text>

                  <Text style={styles.description}>
                    {doctor.clinic}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={BLUE}
                />
              </Pressable>
            ))}
          </>
        ) : (
          <>
            <View style={styles.profile}>

              {selectedDoctor.image ? (
                <Image
                  source={{
                    uri: selectedDoctor.image,
                  }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatar}>
                  <Ionicons
                    name="person-outline"
                    size={60}
                    color={BLUE}
                  />
                </View>
              )}

              <Text style={styles.name}>
                {selectedDoctor.name}
              </Text>

              <Text style={styles.specialty}>
                {selectedDoctor.specialty}
              </Text>

              <Text style={styles.description}>
                {selectedDoctor.experience} years experience
              </Text>

              <View style={styles.row}>
                <Ionicons
                  name="star"
                  size={20}
                  color="#F5A623"
                />

                <Text style={styles.description}>
                  {selectedDoctor.rating ?? 'No rating'}
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.heading}>
                Clinic Information
              </Text>

              <Text style={styles.description}>
                {selectedDoctor.clinic}
              </Text>

              <Text style={styles.description}>
                {selectedDoctor.address}
              </Text>

              <Text style={styles.description}>
                {selectedDoctor.city}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.heading}>
                Consultation Price
              </Text>

              <Text style={styles.price}>
                {selectedDoctor.price !== null
                  ? `${selectedDoctor.price.toLocaleString('ru-RU')} ₸`
                  : 'Price on request'}
              </Text>
            </View>

            <View style={styles.actions}>
              <Pressable
                style={styles.action}
                onPress={() =>
                  toggleFavorite(selectedDoctor.id)
                }
              >
                <Ionicons
                  name={
                    isFavorite(selectedDoctor.id)
                      ? 'heart'
                      : 'heart-outline'
                  }
                  size={25}
                  color={
                    isFavorite(selectedDoctor.id)
                      ? '#E54865'
                      : BLUE
                  }
                />

                <Text style={styles.actionText}>
                  Favorite
                </Text>
              </Pressable>

              <Pressable
                style={styles.action}
                onPress={() =>
                  navigation.navigate('Message', {
                    doctorId: selectedDoctor.id,
                  })
                }
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={25}
                  color={BLUE}
                />

                <Text style={styles.actionText}>
                  Message
                </Text>
              </Pressable>
            </View>

            <PillButton
              title="Book Appointment (Demo)"
              onPress={() =>
                navigation.navigate('Schedule')
              }
            />
          </>
        )}
      </ScrollView>

      <BottomNav active={2} />
    </View>
  );
}

// SCHEDULE

export function ScheduleScreen() {
  const navigation = useNavigation<any>();

  const {
    selectedDoctor,
    setSelectedDoctor,
    setBooking,
  } = useBooking();

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const [offset, setOffset] = useState(0);

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [time, setTime] =
    useState<string | null>(null);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');

  // Dynamic calendar

  const dates = Array.from(
    { length: 6 },
    (_, index) => {
      const date = new Date();

      date.setHours(0, 0, 0, 0);

      date.setDate(
        date.getDate() + 1 + offset + index
      );

      return date;
    }
  );

  const validAge =
    /^\d{1,3}$/.test(age) &&
    Number(age) > 0 &&
    Number(age) <= 120;

  const valid =
    selectedDoctor !== null &&
    selectedDate !== null &&
    time !== null &&
    name.trim().length >= 2 &&
    validAge &&
    gender !== '';

  const handleBooking = () => {
    if (
      !valid ||
      !selectedDoctor ||
      !selectedDate ||
      !time
    ) {
      return;
    }

    setBooking({
      id: Date.now().toString(),

      doctor: selectedDoctor,

      date: selectedDate.toLocaleDateString(
        'en-GB'
      ),

      time,

      patientName: name.trim(),

      age,

      gender,

      description: description.trim(),

      price: selectedDoctor.price,

      status: 'pending',
    });

    navigation.navigate('PaymentMethod');
  };

  return (
    <View style={styles.container}>

      {/* Header */}

      <View style={styles.header}>
        <Pressable
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('DoctorProfile');
            }
          }}
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color={BLUE}
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Schedule
        </Text>

        {selectedDoctor && (
          <>
            <Pressable
              style={styles.iconButton}
              onPress={() =>
                navigation.navigate('Message', {
                  doctorId: selectedDoctor.id,
                })
              }
            >
              <Ionicons
                name="chatbubble-outline"
                size={21}
                color={BLUE}
              />
            </Pressable>

            <Pressable
              style={styles.iconButton}
              onPress={() =>
                toggleFavorite(selectedDoctor.id)
              }
            >
              <Ionicons
                name={
                  isFavorite(selectedDoctor.id)
                    ? 'heart'
                    : 'heart-outline'
                }
                size={22}
                color={
                  isFavorite(selectedDoctor.id)
                    ? '#E54865'
                    : BLUE
                }
              />
            </Pressable>
          </>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >

        {/* Demo warning */}

        <View style={styles.notice}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={BLUE}
          />

          <Text style={styles.noticeText}>
            Demo booking. Dates and times are
            examples, not actual clinic availability.
            Use fictional patient information.
          </Text>
        </View>

        {/* Selected doctor */}

        {selectedDoctor ? (
          <View style={styles.card}>

            <Text style={styles.doctorName}>
              {selectedDoctor.name}
            </Text>

            <Text style={styles.specialty}>
              {selectedDoctor.specialty}
            </Text>

            <Text style={styles.description}>
              {selectedDoctor.clinic}
            </Text>

            <Text style={styles.description}>
              {selectedDoctor.address}
            </Text>

            <Text style={styles.price}>
              {selectedDoctor.price !== null
                ? `${selectedDoctor.price.toLocaleString('ru-RU')} ₸`
                : 'Price on request'}
            </Text>

            <Pressable
              onPress={() =>
                navigation.navigate('DoctorProfile')
              }
            >
              <Text style={styles.link}>
                Change Doctor
              </Text>
            </Pressable>

          </View>
        ) : (
          <>
            <Text style={styles.heading}>
              Select Doctor
            </Text>

            {doctors.map((doctor) => (
              <Pressable
                key={doctor.id}
                style={styles.doctorCard}
                onPress={() =>
                  setSelectedDoctor(doctor)
                }
              >
                <Text style={styles.doctorName}>
                  {doctor.name}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={BLUE}
                />
              </Pressable>
            ))}
          </>
        )}

        {/* Calendar */}

        <View style={styles.monthRow}>
          <Text style={styles.heading}>
            {dates[0].toLocaleDateString(
              'en-US',
              {
                month: 'long',
                year: 'numeric',
              }
            )}
          </Text>

          <View style={styles.row}>
            <Pressable
              disabled={offset === 0}
              onPress={() =>
                setOffset(
                  Math.max(0, offset - 6)
                )
              }
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={
                  offset === 0
                    ? '#B4C5FF'
                    : BLUE
                }
              />
            </Pressable>

            <Pressable
              onPress={() =>
                setOffset(offset + 6)
              }
            >
              <Ionicons
                name="chevron-forward"
                size={24}
                color={BLUE}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.calendar}>
          {dates.map((date) => {
            const active =
              selectedDate?.getTime() ===
              date.getTime();

            return (
              <Pressable
                key={date.toISOString()}
                onPress={() => {
                  setSelectedDate(date);
                  setTime(null);
                }}
                style={[
                  styles.day,
                  active && styles.active,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    active && styles.white,
                  ]}
                >
                  {date.toLocaleDateString(
                    'en-US',
                    { weekday: 'short' }
                  )}
                </Text>

                <Text
                  style={[
                    styles.dayNumber,
                    active && styles.white,
                  ]}
                >
                  {date.getDate()}
                </Text>

                <Text
                  style={[
                    styles.dayText,
                    active && styles.white,
                  ]}
                >
                  {date.toLocaleDateString(
                    'en-US',
                    { month: 'short' }
                  )}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Time */}

        <Text style={styles.heading}>
          Demo Time Slots
        </Text>

        <View style={styles.timeGrid}>
          {times.map((item) => (
            <Pressable
              key={item}
              disabled={!selectedDate}
              onPress={() => setTime(item)}
              style={[
                styles.timeButton,
                time === item && styles.active,
                !selectedDate && {
                  opacity: 0.5,
                },
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  time === item && styles.white,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Patient information */}

        <Text style={styles.heading}>
          Demo Patient Details
        </Text>

        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Test Patient"
          placeholderTextColor="#8798B7"
          style={styles.input}
        />

        <Text style={styles.label}>
          Age
        </Text>

        <TextInput
          value={age}
          onChangeText={setAge}
          placeholder="Age"
          placeholderTextColor="#8798B7"
          keyboardType="number-pad"
          maxLength={3}
          style={styles.input}
        />

        {age.length > 0 && !validAge && (
          <Text style={styles.error}>
            Enter a valid age.
          </Text>
        )}

        <Text style={styles.label}>
          Gender
        </Text>

        <View style={styles.genderRow}>
          {['Male', 'Female', 'Other'].map(
            (item) => (
              <Pressable
                key={item}
                onPress={() => setGender(item)}
                style={[
                  styles.genderButton,
                  gender === item &&
                    styles.active,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    gender === item &&
                      styles.white,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )
          )}
        </View>

        <Text style={styles.label}>
          Test appointment note (optional)
        </Text>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Demo consultation"
          placeholderTextColor="#8798B7"
          multiline
          maxLength={300}
          style={[
            styles.input,
            styles.textArea,
          ]}
        />

        {/* Booking summary */}

        {selectedDate && time && (
          <View style={styles.card}>
            <Text style={styles.heading}>
              Selected Appointment
            </Text>

            <Text style={styles.description}>
              Date: {selectedDate.toLocaleDateString('en-GB')}
            </Text>

            <Text style={styles.description}>
              Time: {time}
            </Text>

            <Text style={styles.description}>
              Doctor: {selectedDoctor?.name ?? 'Not selected'}
            </Text>

            <Text style={styles.price}>
              {selectedDoctor?.price != null
                ? `${selectedDoctor.price.toLocaleString('ru-RU')} ₸`
                : 'Price on request'}
            </Text>
          </View>
        )}

        <PillButton
          title="Continue to Demo Payment"
          disabled={!valid}
          onPress={handleBooking}
        />

      </ScrollView>

      <BottomNav active={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 10,
  },

  headerTitle: {
    flex: 1,
    fontSize: 20,
    color: BLUE,
    fontWeight: '800',
  },

  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    width: '100%',
    maxWidth: 650,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: INK,
    marginBottom: 20,
  },

  profile: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },

  avatar: {
    width: 115,
    height: 115,
    borderRadius: 58,
    backgroundColor: LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallAvatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    fontSize: 23,
    fontWeight: '800',
    textAlign: 'center',
    color: INK,
  },

  specialty: {
    color: BLUE,
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 5,
  },

  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SOFT,
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    gap: 12,
    justifyContent: 'space-between',
  },

  doctorName: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '800',
    color: INK,
  },

  card: {
    backgroundColor: SOFT,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    gap: 6,
  },

  heading: {
    color: BLUE,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },

  description: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 21,
  },

  price: {
    color: BLUE,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 8,
  },

  link: {
    color: BLUE,
    fontWeight: '700',
    marginTop: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  action: {
    flex: 1,
    backgroundColor: SOFT,
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    gap: 6,
  },

  actionText: {
    color: BLUE,
    fontWeight: '700',
  },

  notice: {
    flexDirection: 'row',
    backgroundColor: SOFT,
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
    gap: 8,
  },

  noticeText: {
    flex: 1,
    color: BLUE,
    fontSize: 12,
    lineHeight: 18,
  },

  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  calendar: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 24,
  },

  day: {
    flex: 1,
    borderRadius: 17,
    backgroundColor: LIGHT,
    paddingVertical: 13,
    alignItems: 'center',
    gap: 4,
  },

  dayText: {
    color: BLUE,
    fontSize: 13,
    fontWeight: '600',
  },

  dayNumber: {
    color: BLUE,
    fontSize: 20,
    fontWeight: '800',
  },

  active: {
    backgroundColor: BLUE,
  },

  white: {
    color: '#FFFFFF',
  },

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 9,
    marginBottom: 25,
  },

  timeButton: {
    width: '31.5%',
    backgroundColor: LIGHT,
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: INK,
    marginBottom: 8,
  },

  input: {
    backgroundColor: LIGHT,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 15,
    color: INK,
    marginBottom: 18,
  },

  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  genderRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },

  genderButton: {
    flex: 1,
    backgroundColor: LIGHT,
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: 11,
  },

  error: {
    color: '#DC2626',
    fontSize: 12,
    marginBottom: 15,
  },
});
