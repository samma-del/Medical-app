
import React from 'react';

import {
  Text,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { Page, S, C, Btn } from './ui';
import { doctors } from '../../data/doctors';

type Props = {
  onDoctors?: () => void;
  onProfile?: () => void;
  onDermacare?: () => void;
};

// Services

const services = [
  { icon: '✚', name: 'dermatology' },
  { icon: '♡', name: 'skinCare' },
  { icon: '☼', name: 'consultation' },
  { icon: '✦', name: 'treatment' },
];

export default function HomeScreen({
  onDoctors,
  onProfile,
  onDermacare,
}: Props) {

  // Подключение переводов

  const { t, i18n } = useTranslation();

  const locale =
    i18n.resolvedLanguage === 'kk'
      ? 'kk-KZ'
      : i18n.resolvedLanguage === 'ru'
      ? 'ru-KZ'
      : 'en-US';

  return (
    <Page>

      {/* HEADER */}

      <View style={[S.row, { marginBottom: 22 }]}>
        <View>
          <Text style={S.small}>
            {t('goodMorning')}
          </Text>

          <Text style={S.title}>
            {t('appName')}
          </Text>
        </View>

        <Pressable
          onPress={onProfile}
          style={styles.profile}
          accessibilityLabel={t('profile')}
        >
          <Text style={styles.profileIcon}>
            ☺
          </Text>
        </Pressable>
      </View>

      {/* BANNER */}

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          {t('skinCareBanner')}
        </Text>

        <Text style={styles.bannerText}>
          {t('skinCareDescription')}
        </Text>

        <Btn
          title={t('findADoctor')}
          onPress={onDoctors}
          secondary
        />
      </View>

      {/* OUR SERVICES */}

      <Text style={styles.heading}>
        {t('ourServices')}
      </Text>

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
              {t(service.name)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* TOP DOCTORS */}

      <Text style={styles.heading}>
        {t('topDoctors')}
      </Text>

      {doctors.slice(0, 3).map((doctor) => (
        <Pressable
          key={doctor.id}
          style={styles.doctorCard}
          onPress={onDoctors}
        >

          {/* Doctor avatar */}

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              ✚
            </Text>
          </View>

          {/* Doctor information */}

          <View style={{ flex: 1 }}>

            <Text style={styles.doctorName}>
              {doctor.name}
            </Text>

            <Text style={S.small}>
              {doctor.specialty}
            </Text>

            <Text style={S.small}>
              {t('experience')}:{' '}
              {doctor.experience} {t('years')}
            </Text>

            <Text style={S.small}>
              {t('rating')}:{' '}
              {doctor.rating !== null
                ? doctor.rating.toFixed(1)
                : t('noRating')}
            </Text>

            <Text style={S.small}>
              {doctor.clinic}
            </Text>

            <Text style={S.small}>
              {doctor.price !== null
                ? `${doctor.price.toLocaleString(locale)} ₸`
                : t('priceOnRequest')}
            </Text>

          </View>

          <Text style={styles.arrow}>
            ›
          </Text>

        </Pressable>
      ))}

      {/* ALL DOCTORS */}

      <Btn
        title={t('seeAllDoctors')}
        onPress={onDoctors}
      />

      {/* DERMACARE */}

      <Pressable
        onPress={onDermacare}
        style={styles.dermacareButton}
      >
        <Text style={styles.dermacareButtonText}>
          {t('openDermacare', {
            defaultValue: 'Open Dermacare',
          })}
        </Text>
      </Pressable>

    </Page>
  );
}

// STYLES

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
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
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

  dermacareButton: {
    backgroundColor: C.blue,
    paddingVertical: 16,
    borderRadius: 17,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  dermacareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

});
