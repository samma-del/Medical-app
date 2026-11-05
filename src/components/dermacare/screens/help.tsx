import React, { useState } from 'react';
import { Pressable, ScrollView, TextInput, View, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Chip, T } from '../ui';
import { colors } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function HelpHeader({ active, q, setQ }: { active: 'faq' | 'contact'; q: string; setQ: (v: string) => void }) {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  return (
    <View>
      <View style={{ backgroundColor: colors.primary, paddingTop: insets.top + 14, paddingHorizontal: 20, paddingBottom: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable onPress={() => nav.goBack()} hitSlop={10} style={{ width: 40 }}><Ionicons name="chevron-back" size={24} color="#fff" /></Pressable>
          <T style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Help Center</T>
          <View style={{ width: 40 }} />
        </View>
        <T style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 6, marginBottom: 14 }}>How Can We Help You?</T>
        <View style={{ height: 40, borderRadius: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 }}>
          <Ionicons name="search" size={18} color={colors.primary} />
          <TextInput value={q} onChangeText={setQ} placeholder="Search..." placeholderTextColor={colors.grey} style={{ flex: 1, marginLeft: 8, fontSize: 13 }} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingVertical: 14 }}>
        {(['faq', 'contact'] as const).map((k) => (
          <Pressable key={k} onPress={() => active !== k && nav.replace(k === 'faq' ? 'HelpFAQ' : 'HelpContact')}
            style={{ flex: 1, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: active === k ? colors.primary : colors.soft }}>
            <T style={{ fontSize: 14, fontWeight: '600', color: active === k ? '#fff' : colors.primary }}>{k === 'faq' ? 'FAQ' : 'Contact Us'}</T>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/* 13a. Help center - FAQ */
const topics = ['Popular Topic', 'General', 'Services'];
const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam.';
export function HelpFAQScreen() {
  const [topic, setTopic] = useState('Popular Topic');
  const [open, setOpen] = useState<number | null>(0);
  const [q, setQ] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HelpHeader active="faq" q={q} setQ={setQ} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 14 }}>
          {topics.map((t) => <Chip key={t} label={t} active={topic === t} onPress={() => setTopic(t)} style={{ height: 26, paddingHorizontal: 14 }} />)}
        </View>
        {[0, 1, 2, 3, 4, 5, 6].filter((i) => !q || 'lorem ipsum dolor sit amet?'.includes(q.toLowerCase())).map((i) => (
          <Pressable key={i} onPress={() => setOpen(open === i ? null : i)} style={{ backgroundColor: colors.soft, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <T style={{ flex: 1, fontSize: 12 }}>Lorem ipsum dolor sit amet?</T>
              <Ionicons name={open === i ? 'chevron-up' : 'chevron-down'} size={18} color={colors.primary} />
            </View>
            {open === i ? <T style={{ fontSize: 11, lineHeight: 17, marginTop: 10, color: '#333' }}>{body}</T> : null}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

/* 13b. Help center - Contact us */
const contacts: { icon: keyof typeof Ionicons.glyphMap; label: string; detail: string; url: string }[] = [
  { icon: 'headset', label: 'Customer Service', detail: '+1 (800) 123 4567', url: 'tel:+18001234567' },
  { icon: 'globe-outline', label: 'Website', detail: 'www.dermacare.app', url: 'https://www.dermacare.app' },
  { icon: 'logo-whatsapp', label: 'Whatsapp', detail: '+1 (800) 123 4567', url: 'https://wa.me/18001234567' },
  { icon: 'logo-facebook', label: 'Facebook', detail: 'facebook.com/dermacare', url: 'https://facebook.com' },
  { icon: 'logo-instagram', label: 'Instagram', detail: '@dermacare', url: 'https://instagram.com' },
];
export function HelpContactScreen() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<number | null>(null);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HelpHeader active="contact" q={q} setQ={setQ} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 6 }}>
        {contacts.map((c, i) => (
          <View key={c.label} style={{ marginBottom: 12 }}>
            <Pressable onPress={() => setOpen(open === i ? null : i)} style={{ flexDirection: 'row', alignItems: 'center', height: 44 }}>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={c.icon} size={17} color="#fff" />
              </View>
              <T style={{ flex: 1, marginLeft: 14, fontSize: 14, fontWeight: '600' }}>{c.label}</T>
              <Ionicons name={open === i ? 'chevron-up' : 'chevron-down'} size={18} color={colors.primary} />
            </Pressable>
            {open === i ? (
              <Pressable onPress={() => Linking.openURL(c.url).catch(() => {})} style={{ marginLeft: 46, marginTop: 2 }}>
                <T style={{ color: colors.primary, fontSize: 13 }}>{c.detail}</T>
              </Pressable>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
