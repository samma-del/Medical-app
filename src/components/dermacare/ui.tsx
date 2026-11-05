import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from './theme';

export type IconName = keyof typeof Ionicons.glyphMap;

export function T({ style, ...p }: React.ComponentProps<typeof Text>) {
  return <Text {...p} style={[{ color: colors.text, fontSize: 14 }, style]} />;
}

/** Page with blue centered title + back chevron (Password Manager, Privacy Policy ...) */
export function Page({ title, children, right, scroll = true, bottom, pad = 24 }: {
  title: string; children?: React.ReactNode; right?: React.ReactNode; scroll?: boolean; bottom?: React.ReactNode; pad?: number;
}) {
  const insets = useSafeAreaInsets();
  const nav = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ paddingTop: insets.top + 14, paddingHorizontal: 20, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable onPress={() => nav.goBack()} hitSlop={10} style={s.hbtn}><Ionicons name="chevron-back" size={24} color={colors.primary} /></Pressable>
        <T style={{ color: colors.primary, fontSize: 18, fontWeight: '700' }}>{title}</T>
        <View style={s.hbtn} />
        {right ? <View style={{ position: 'absolute', right: 20, bottom: 20 }}>{right}</View> : null}
      </View>
      {scroll ? (
        <ScrollBody pad={pad}>{children}</ScrollBody>
      ) : <View style={{ flex: 1, paddingHorizontal: pad }}>{children}</View>}
      {bottom}
    </View>
  );
}
function ScrollBody({ children, pad }: { children: React.ReactNode; pad: number }) {
  const { ScrollView } = require('react-native');
  return <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: pad, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>{children}</ScrollView>;
}

export function PillButton({ title, onPress, style, light, disabled }: { title: string; onPress?: () => void; style?: ViewStyle; light?: boolean; disabled?: boolean }) {
  return (
    <Pressable onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [{ height: 48, borderRadius: 24, backgroundColor: light ? colors.soft : colors.primary, alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }, style]}>
      <T style={{ color: light ? colors.primary : '#fff', fontSize: 15, fontWeight: '600' }}>{title}</T>
    </Pressable>
  );
}

export function SoftField({ label, secure, trailing, ...p }: TextInputProps & { label?: string; secure?: boolean; trailing?: React.ReactNode }) {
  const [hide, setHide] = React.useState(!!secure);
  return (
    <View style={{ marginBottom: 18 }}>
      {label ? <T style={{ fontSize: 15, fontWeight: '700', marginBottom: 8 }}>{label}</T> : null}
      <View style={{ height: 48, borderRadius: 10, backgroundColor: colors.soft, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 }}>
        <TextInput {...p} secureTextEntry={hide} placeholderTextColor={colors.grey} style={{ flex: 1, fontSize: 14, color: colors.text, letterSpacing: hide ? 2 : 0 }} />
        {secure ? (
          <Pressable onPress={() => setHide(!hide)} hitSlop={8}><Ionicons name={hide ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.primary} /></Pressable>
        ) : trailing}
      </View>
    </View>
  );
}

export function Chip({ label, active, onPress, style }: { label: string; active?: boolean; onPress?: () => void; style?: ViewStyle }) {
  return (
    <Pressable onPress={onPress} style={[{ paddingHorizontal: 16, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: active ? colors.primary : colors.soft }, style]}>
      <T style={{ fontSize: 12, fontWeight: '600', color: active ? '#fff' : colors.primary }}>{label}</T>
    </Pressable>
  );
}

export function Person({ size, icon = 'person' }: { size: number; icon?: IconName }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Ionicons name={icon} size={size * 0.62} color={colors.primary} style={{ marginTop: size * 0.12 }} />
    </View>
  );
}

/** Blue rounded bottom navigation used on Notification / Message / Doctor / Schedule */
export function BottomNav({ active }: { active: 0 | 1 | 2 | 3 }) {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const tabs: { icon: IconName; to: string }[] = [
    { icon: 'home-outline', to: 'Profile' },
    { icon: 'chatbubble-outline', to: 'Message' },
    { icon: 'person-outline', to: 'DoctorProfile' },
    { icon: 'calendar-outline', to: 'Schedule' },
  ];
  return (
    <View style={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 10, paddingTop: 8, backgroundColor: '#fff' }}>
      <View style={{ height: 54, borderRadius: 27, backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 12 }}>
        {tabs.map((t, i) => (
          <Pressable key={t.to} onPress={() => i !== active && nav.navigate(t.to)} style={{ width: 44, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: i === active ? '#ffffff33' : 'transparent' }}>
            <Ionicons name={t.icon} size={24} color="#fff" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({ hbtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' } });
