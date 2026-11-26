
import React, { useState } from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import FavoriteDoctorsScreen from './FavoriteDoctorsScreen';
import FavoriteDoctorDetailsScreen from './FavoriteDoctorDetailsScreen';
import FavoriteDoctorServicesScreen from './FavoriteDoctorServicesScreen';
import FavoriteMaleDoctorsScreen from './FavoriteMaleDoctorsScreen';
import FavoriteServicesScreen from './FavoriteServicesScreen';

import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import SettingsScreen from './SettingsScreen';
import NotificationSettingsScreen from './NotificationSettingsScreen';
import LanguageScreen from './LanguageScreen';

// Доступные экраны

type Screen =
  | 'favorites'
  | 'details'
  | 'doctorServices'
  | 'male'
  | 'services'
  | 'profile'
  | 'edit'
  | 'settings'
  | 'notifications'
  | 'language';

type Props = {
  onExit?: () => void;
};

// Верхнее меню

const tabs: {
  label: string;
  target: Screen;
}[] = [
  {
    label: 'favorites',
    target: 'favorites',
  },
  {
    label: 'services',
    target: 'services',
  },
  {
    label: 'profile',
    target: 'profile',
  },
  {
    label: 'settings',
    target: 'settings',
  },
];

export default function AdemaFlow({
  onExit,
}: Props) {

  // Подключение переводов

  const { t } = useTranslation();

  // Текущий экран

  const [screen, setScreen] =
    useState<Screen>('profile');

  // Выбранный врач

  const [selectedDoctorId, setSelectedDoctorId] =
    useState<number | undefined>(undefined);

  const [detailsFrom, setDetailsFrom] =
    useState<'favorites' | 'male'>('favorites');

  // Навигация

  const go = (next: Screen) => {
    setScreen(next);
  };

  // Открытие профиля врача

  const openDoctor = (
    id: number,
    from: 'favorites' | 'male'
  ) => {
    setSelectedDoctorId(id);
    setDetailsFrom(from);
    go('details');
  };

  // Отображение экранов

  const renderScreen = () => {
    switch (screen) {

      // FAVORITE DOCTORS

      case 'favorites':
        return (
          <FavoriteDoctorsScreen
            onBack={onExit}
            onDetails={(id) =>
              openDoctor(id, 'favorites')
            }
            onServices={() =>
              go('doctorServices')
            }
            onMale={() => go('male')}
          />
        );

      // DOCTOR DETAILS

      case 'details':
        return (
          <FavoriteDoctorDetailsScreen
            doctorId={selectedDoctorId}
            onBack={() => go(detailsFrom)}
            onServices={() => go('services')}
          />
        );

      // DOCTOR SERVICES

      case 'doctorServices':
        return (
          <FavoriteDoctorServicesScreen
            onBack={() => go('favorites')}
            onFavorites={() => go('services')}
          />
        );

      // MALE DOCTORS

      case 'male':
        return (
          <FavoriteMaleDoctorsScreen
            onBack={() => go('favorites')}
            onDetails={(id) =>
              openDoctor(id, 'male')
            }
          />
        );

      // FAVORITE SERVICES

      case 'services':
        return (
          <FavoriteServicesScreen
            onBack={() => go('favorites')}
          />
        );

      // MY PROFILE

      case 'profile':
        return (
          <ProfileScreen
            onBack={onExit}
            onEdit={() => go('edit')}
            onSettings={() => go('settings')}
          />
        );

      // EDIT PROFILE

      case 'edit':
        return (
          <EditProfileScreen
            onBack={() => go('profile')}
          />
        );

      // SETTINGS

      case 'settings':
        return (
          <SettingsScreen
            onBack={() => go('profile')}
            onNotifications={() =>
              go('notifications')
            }
            onLanguage={() =>
              go('language')
            }
          />
        );

      // NOTIFICATION SETTINGS

      case 'notifications':
        return (
          <NotificationSettingsScreen
            onBack={() => go('settings')}
          />
        );

      // LANGUAGE SETTINGS

      case 'language':
        return (
          <LanguageScreen
            onBack={() => go('settings')}
          />
        );

      // DEFAULT SCREEN

      default:
        return (
          <ProfileScreen
            onBack={onExit}
            onEdit={() => go('edit')}
            onSettings={() => go('settings')}
          />
        );
    }
  };

  return (
    <View style={styles.container}>

      {/* Верхнее меню */}

      <View style={styles.navigation}>
        {tabs.map((tab) => {

          const active =
            screen === tab.target ||

            (
              tab.target === 'profile' &&
              screen === 'edit'
            ) ||

            (
              tab.target === 'settings' &&
              (
                screen === 'notifications' ||
                screen === 'language'
              )
            ) ||

            (
              tab.target === 'favorites' &&
              [
                'details',
                'male',
                'doctorServices',
              ].includes(screen)
            );

          return (
            <Pressable
              key={tab.target}
              onPress={() => go(tab.target)}
              style={[
                styles.tab,
                active && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  active && styles.activeText,
                ]}
              >
                {t(tab.label)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Содержимое текущего экрана */}

      <View style={styles.content}>
        {renderScreen()}
      </View>

    </View>
  );
}

// СТИЛИ

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#EAF0FF',
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 5,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 25,
  },

  activeTab: {
    backgroundColor: '#2463FF',
  },

  tabText: {
    color: '#2463FF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },

  activeText: {
    color: '#FFFFFF',
  },

  content: {
    flex: 1,
  },

});
