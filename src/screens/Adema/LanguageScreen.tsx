
import React, { useState } from 'react';

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

import {
  changeAppLanguage,
  AppLanguage,
} from '../../i18n';

type Props = {
  onBack?: () => void;
};

const languages: {
  code: AppLanguage;
  name: string;
  description: string;
  flag: string;
}[] = [
  {
    code: 'kk',
    name: 'Қазақша',
    description: 'Kazakh',
    flag: '🇰🇿',
  },
  {
    code: 'ru',
    name: 'Русский',
    description: 'Russian',
    flag: '🇷🇺',
  },
  {
    code: 'en',
    name: 'English',
    description: 'English',
    flag: '🇬🇧',
  },
];

export default function LanguageScreen({
  onBack,
}: Props) {
  const { t, i18n } = useTranslation();

  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const selectLanguage = async (
    code: AppLanguage
  ) => {
    if (busy) return;

    setBusy(true);
    setFailed(false);

    try {
      await changeAppLanguage(code);
    } catch (error) {
      setFailed(true);
      console.warn(error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Page>
      <Header
        title={t('language')}
        onBack={onBack}
      />

      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons
            name="language-outline"
            size={45}
            color={colors.blue}
          />
        </View>

        <Text style={styles.title}>
          {t('language')}
        </Text>

        <Text style={styles.subtitle}>
          {t('selectLanguage')}
        </Text>
      </View>

      {languages.map((language) => {
        const selected =
          i18n.resolvedLanguage ===
          language.code;

        return (
          <Pressable
            key={language.code}
            disabled={busy}
            onPress={() =>
              selectLanguage(language.code)
            }
            style={[
              styles.card,
              selected && styles.selectedCard,
            ]}
          >
            <Text style={styles.flag}>
              {language.flag}
            </Text>

            <View style={styles.info}>
              <Text style={styles.name}>
                {language.name}
              </Text>

              <Text style={styles.description}>
                {language.description}
              </Text>
            </View>

            <Ionicons
              name={
                selected
                  ? 'checkmark-circle'
                  : 'ellipse-outline'
              }
              size={27}
              color={colors.blue}
            />
          </Pressable>
        );
      })}

      {failed && (
        <Text style={styles.error}>
          {t('error')}
        </Text>
      )}

      <Pressable
        style={styles.saveButton}
        onPress={onBack}
        disabled={busy}
      >
        <Text style={styles.saveText}>
          {t('done')}
        </Text>
      </Pressable>
    </Page>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: 25,
    gap: 10,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  title: {
    color: colors.ink,
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 15,
  },

  selectedCard: {
    borderColor: colors.blue,
  },

  flag: {
    fontSize: 32,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
  },

  description: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 5,
  },

  saveButton: {
    backgroundColor: colors.blue,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  error: {
    color: '#DC2626',
    textAlign: 'center',
    marginVertical: 10,
  },
});
