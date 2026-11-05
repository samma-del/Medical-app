import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Page, PillButton, SoftField, T, Person } from '../ui';
import { colors } from '../theme';

/* 11. Password manager */
export function PasswordManagerScreen() {
  const nav = useNavigation();
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [again, setAgain] = useState('');
  const ok = cur.length > 0 && next.length >= 8 && next === again;
  return (
    <Page title="Password Manager" scroll={false}>
      <View style={{ flex: 1, paddingTop: 18 }}>
        <SoftField label="Current Password" secure value={cur} onChangeText={setCur} placeholder="Enter current password" />
        <T style={{ color: colors.primary, fontSize: 11, fontWeight: '600', alignSelf: 'flex-end', marginTop: -10, marginBottom: 18 }}>Forget Password?</T>
        <SoftField label="New Password" secure value={next} onChangeText={setNext} placeholder="At least 8 characters" />
        <SoftField label="Confirm New Password" secure value={again} onChangeText={setAgain} placeholder="Repeat new password" />
        {again.length > 0 && again !== next ? <T style={{ color: colors.red, fontSize: 12, marginTop: -10 }}>Passwords do not match</T> : null}
      </View>
      <View style={{ paddingBottom: 34 }}>
        <PillButton title="Change Password" disabled={!ok} onPress={() => nav.goBack()} />
      </View>
    </Page>
  );
}

/* 12. Privacy policy */
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a odio cursus lacus semper ultrices. Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt. Pellentesque malesuada eros semper ultrices.';
export function PrivacyPolicyScreen() {
  return (
    <Page title="Privacy Policy">
      <T style={{ color: colors.primary, fontSize: 10, marginBottom: 10 }}>Last Update: 14/08/2024</T>
      <T style={{ fontSize: 12, lineHeight: 19, marginBottom: 14 }}>{lorem}</T>
      <T style={{ fontSize: 12, lineHeight: 19, marginBottom: 22 }}>{lorem}</T>
      <T style={{ color: colors.primary, fontSize: 16, fontWeight: '700', marginBottom: 12 }}>Terms & Conditions</T>
      {[1, 2, 3, 4].map((n) => (
        <View key={n} style={{ flexDirection: 'row', marginBottom: 14 }}>
          <T style={{ fontSize: 12, width: 18, lineHeight: 19 }}>{n}.</T>
          <T style={{ flex: 1, fontSize: 12, lineHeight: 19 }}>{lorem}</T>
        </View>
      ))}
    </Page>
  );
}

/* My Profile (hub, also the background of Logout) */
const rows: { icon: keyof typeof Ionicons.glyphMap; label: string; to?: string }[] = [
  { icon: 'person', label: 'Doctor Profile', to: 'DoctorProfile' },
  { icon: 'calendar', label: 'Schedule', to: 'Schedule' },
  { icon: 'chatbubble-ellipses', label: 'Message', to: 'Message' },
  { icon: 'notifications', label: 'Notification', to: 'Notification' },
  { icon: 'lock-closed', label: 'Password Manager', to: 'PasswordManager' },
  { icon: 'shield-checkmark', label: 'Privacy Policy', to: 'PrivacyPolicy' },
  { icon: 'help', label: 'Help Center', to: 'HelpFAQ' },
  { icon: 'log-out', label: 'Logout', to: 'Logout' },
];
export function ProfileScreen() {
  const nav = useNavigation<any>();
  return (
    <Page title="My Profile" scroll={false}>
      <View style={{ alignItems: 'center', marginBottom: 14 }}>
        <View>
          <Person size={92} />
          <View style={{ position: 'absolute', right: 0, bottom: 4, width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' }}>
            <Ionicons name="pencil" size={11} color="#fff" />
          </View>
        </View>
        <T style={{ color: colors.primary, fontSize: 18, fontWeight: '700', marginTop: 10 }}>John Doe</T>
      </View>
      {rows.map((r) => (
        <Pressable key={r.label} onPress={() => r.to && nav.navigate(r.to)} style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginBottom: 6 }}>
          <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={r.icon} size={17} color={colors.primary} />
          </View>
          <T style={{ flex: 1, marginLeft: 14, fontSize: 14, fontWeight: '600' }}>{r.label}</T>
          <Ionicons name="chevron-forward" size={16} color={colors.grey} />
        </Pressable>
      ))}
    </Page>
  );
}

/* 14. Logout (sheet over My Profile) */
export function LogoutScreen() {
  const nav = useNavigation<any>();
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(31,91,255,0.55)' }}>
      <Pressable style={{ flex: 1 }} onPress={() => nav.goBack()} />
      <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 26, borderTopRightRadius: 26, paddingTop: 24, paddingBottom: 34, paddingHorizontal: 24, alignItems: 'center' }}>
        <T style={{ color: colors.primary, fontSize: 18, fontWeight: '700' }}>Logout</T>
        <T style={{ fontSize: 13, marginTop: 16, marginBottom: 22 }}>are you sure you want to log out?</T>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <PillButton title="Cancel" light onPress={() => nav.goBack()} style={{ width: 130, height: 44 }} />
          <PillButton title="Yes, Logout" onPress={() => nav.popToTop()} style={{ width: 130, height: 44 }} />
        </View>
      </View>
    </View>
  );
}
