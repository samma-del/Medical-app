import React, { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNav, Page, Person, T } from '../ui';
import { colors } from '../theme';

/* 15. Notification */
type N = { id: number; day: string; title: string; time: string; hl?: boolean; icon: keyof typeof Ionicons.glyphMap };
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tortor placerat.';
const data: N[] = [
  { id: 1, day: 'Today', title: 'Scheduled Appointment', time: '2H', icon: 'calendar-outline' },
  { id: 2, day: 'Today', title: 'Scheduled Change', time: '4H', icon: 'calendar-outline', hl: true },
  { id: 3, day: 'Today', title: 'Medical Notes', time: '6H', icon: 'document-text-outline' },
  { id: 4, day: 'Yesterday', title: 'Scheduled Appointment', time: '1D', icon: 'calendar-outline' },
  { id: 5, day: '15 April', title: 'Medical History Update', time: '5D', icon: 'medkit-outline' },
];
export function NotificationScreen() {
  const [items, setItems] = useState(data);
  const [showNew, setShowNew] = useState(true);
  const days = Array.from(new Set(items.map((i) => i.day)));
  return (
    <Page title="Notification" scroll={false}
      right={<Pressable onPress={() => setShowNew(!showNew)} style={{ height: 22, paddingHorizontal: 10, borderRadius: 11, backgroundColor: colors.soft, flexDirection: 'row', alignItems: 'center' }}>           <T style={{ color: colors.primary, fontSize: 11, fontWeight: '600' }}>New</T>           <Ionicons name="chevron-down" size={12} color={colors.primary} style={{ marginLeft: 3 }} />         </Pressable>}
      bottom={<BottomNav active={1} />}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        {days.map((d, di) => (
          <View key={d}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: di ? 10 : 0, marginBottom: 8 }}>
              <View style={{ paddingHorizontal: 18, height: 26, borderRadius: 13, backgroundColor: colors.soft, justifyContent: 'center' }}>
                <T style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>{d}</T>
              </View>
              {di === 0 ? <T style={{ marginLeft: 'auto', color: colors.primary, fontSize: 11, fontWeight: '700' }} onPress={() => setItems(items.map((i) => ({ ...i, hl: false })))}>Mark all</T> : null}
            </View>
            {items.filter((i) => i.day === d).map((n) => (
              <Pressable key={n.id} onPress={() => setItems(items.map((i) => ({ ...i, hl: i.id === n.id })))}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: -10, borderRadius: 10, backgroundColor: n.hl ? colors.soft : 'transparent' }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={n.icon} size={20} color="#fff" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <T style={{ fontSize: 14, fontWeight: '700' }}>{n.title}</T>
                  <T numberOfLines={2} style={{ fontSize: 10, color: '#555', lineHeight: 15, marginTop: 2 }}>{lorem}</T>
                </View>
                <T style={{ fontSize: 11, color: colors.grey, marginLeft: 8 }}>{n.time}</T>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </Page>
  );
}

/* 16. Message */
type Msg = { id: number; me?: boolean; text?: string; time: string; audio?: boolean };
const start: Msg[] = [
  { id: 1, me: true, text: lorem + ' Proin ac diam quam.', time: '09:30' },
  { id: 2, text: lorem, time: '09:32' },
  { id: 3, me: true, text: lorem + ' Aenean in sagittis magna.', time: '09:35' },
  { id: 4, audio: true, time: '09:40' },
  { id: 5, me: true, text: lorem, time: '09:44' },
];
export function MessageScreen() {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [msgs, setMsgs] = useState(start);
  const [text, setText] = useState('');
  const send = () => {
    if (!text.trim()) return;
    setMsgs([...msgs, { id: Date.now(), me: true, text: text.trim(), time: 'now' }]);
    setText('');
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ paddingTop: insets.top + 14, paddingHorizontal: 20, paddingBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
        <Pressable onPress={() => nav.goBack()} hitSlop={10}><Ionicons name="chevron-back" size={24} color={colors.primary} /></Pressable>
        <T style={{ flex: 1, marginLeft: 8, color: colors.primary, fontSize: 16, fontWeight: '700' }}>Dr. Olivia Turner</T>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {(['call', 'videocam'] as const).map((ic) => (
            <View key={ic} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={ic} size={15} color={colors.primary} />
            </View>
          ))}
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }} showsVerticalScrollIndicator={false}>
        {msgs.map((m) => (
          <View key={m.id} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '80%', marginBottom: 12 }}>
            {m.audio ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.softer, borderRadius: 18, padding: 8 }}>
                <Person size={30} />
                <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}><Ionicons name="play" size={12} color="#fff" /></View>
                <View style={{ width: 90, height: 3, borderRadius: 2, backgroundColor: colors.soft, marginHorizontal: 10 }} />
                <T style={{ fontSize: 10, color: colors.primary }}>0:12</T>
              </View>
            ) : (
              <View style={{ backgroundColor: m.me ? colors.soft : colors.softer, borderRadius: 14, borderBottomRightRadius: m.me ? 4 : 14, borderBottomLeftRadius: m.me ? 14 : 4, paddingHorizontal: 12, paddingVertical: 9 }}>
                <T style={{ fontSize: 11, lineHeight: 16 }}>{m.text}</T>
              </View>
            )}
            <T style={{ fontSize: 9, color: colors.primary, marginTop: 3, alignSelf: m.me ? 'flex-end' : 'flex-start' }}>{m.time}</T>
          </View>
        ))}
        <T style={{ fontSize: 10, color: colors.primary }}>Dr. Olivia is typing...</T>
      </ScrollView>
      <View style={{ marginHorizontal: 14, height: 48, borderRadius: 24, backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginBottom: 6 }}>
        <Ionicons name="attach" size={22} color="#fff" />
        <TextInput value={text} onChangeText={setText} onSubmitEditing={send} placeholder="Write here..." placeholderTextColor={colors.grey}
          style={{ flex: 1, height: 32, borderRadius: 16, backgroundColor: '#fff', marginHorizontal: 8, paddingHorizontal: 12, fontSize: 12 }} />
        <Ionicons name="mic" size={20} color="#fff" style={{ marginRight: 10 }} />
        <Pressable onPress={send} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="send" size={14} color={colors.primary} />
        </Pressable>
      </View>
      <BottomNav active={1} />
    </View>
  );
}
