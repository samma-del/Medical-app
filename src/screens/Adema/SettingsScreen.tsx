
import React from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import {
  Page,
  Header,
  colors,
} from './AdemaUI';

type Props = {
  onBack?: () => void;
  onNotifications?: () => void;
  onLanguage?: () => void;
};

export default function SettingsScreen({
  onBack,
  onNotifications,
  onLanguage,
}: Props) {
  const { t, i18n } = useTranslation();

  const languageNames: Record<string, string> = {
    en: 'English',
    ru: 'Русский',
    kk: 'Қазақша',
  };

  const currentLanguage =
    languageNames[
      i18n.resolvedLanguage ?? 'en'
    ] ?? 'English';

  return (
    <Page>
      <Header
        title={t('settings')}
        onBack={onBack}
      />

      <Text style={styles.title}>
        {t('settings')}
      </Text>

      <Pressable
        style={styles.card}
        onPress={onNotifications}
      >
        <View style={styles.icon}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.blue}
          />
        </View>

        <Text style={styles.name}>
          {t('notificationSettings')}
        </Text>

        <Ionicons
          name="chevron-forward"
          size={22}
          color={colors.blue}
        />
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={onLanguage}
      >
        <View style={styles.icon}>
          <Ionicons
            name="language-outline"
            size={24}
            color={colors.blue}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.languageTitle}>
            {t('language')}
          </Text>

          <Text style={styles.description}>
            {currentLanguage}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color={colors.blue}
        />
      </Pressable>

      <Text style={styles.version}>
        Skin First
      </Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.ink,
    marginVertical: 22,
  },

  card: {
    backgroundColor: colors.light,
    borderRadius: 20,
    padding: 15,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  icon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },

  languageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },

  description: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 5,
  },

  version: {
    textAlign: 'center',
    color: colors.muted,
    marginTop: 35,
  },
});
