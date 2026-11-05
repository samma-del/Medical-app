import React, { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNav, Chip, PillButton, Person, SoftField, T } from '../ui';
import { colors } from '../theme';

function TopRow({ title, chip }: { title?: string; chip?: string }) {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + 14, paddingHorizontal: 20, paddingBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
      <Pressable onPress={() => nav.goBack()} hitSlop={10}><Ionicons name="chevron-back" size={24} color={colors.primary} /></Pressable>
      {chip ? (
        <Pressable onPress={() => nav.navigate('Schedule')} style={{ marginLeft: 8, height: 26, paddingHorizontal: 14, borderRadius: 13, backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="calendar" size={12} color="#fff" /><T style={{ color: '#fff', fontSize: 12, fontWeight: '600', marginLeft: 6 }}>{chip}</T>
        </Pressable>
      ) : null}
      {title ? <T style={{ flex: 1, marginLeft: 8, color: colors.primary, fontSize: 16, fontWeight: '700' }}>{title}</T> : <View style={{ flex: 1 }} />}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {(['chatbubble', 'call', 'heart'] as const).map((ic) => (
          <Pressable key={ic} onPress={() => ic === 'chatbubble' && nav.navigate('Message')} style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={ic} size={14} color={colors.primary} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/* 17. Doctor profile */
const monthDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export function DoctorProfileScreen() {
  const [sel, setSel] = useState(22);
  const cells: (number | null)[] = [...Array(6).fill(null), ...Array.from({ length: 30 }, (_, i) => i + 1)];
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopRow chip="Schedule" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: colors.softer, borderRadius: 20, padding: 12, flexDirection: 'row', marginBottom: 12 }}>
          <View style={{ width: 150, height: 170, borderRadius: 16, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' }}>
            <Ionicons name="person" size={130} color={colors.primary} style={{ marginBottom: -18 }} />
          </View>
          <View style={{ flex: 1, marginLeft: 10, gap: 8 }}>
            <View style={{ backgroundColor: colors.soft, borderRadius: 14, padding: 8 }}>
              <T style={{ color: colors.primary, fontSize: 11, fontWeight: '700' }}>20 years experience</T>
            </View>
            <View style={{ backgroundColor: colors.primary, borderRadius: 14, padding: 10 }}>
              <T style={{ color: '#fff', fontSize: 10, lineHeight: 15 }}><T style={{ color: '#fff', fontWeight: '700', fontSize: 10 }}>Focus:</T> The impact of hormones on mental and physical health, with a patient-first approach.</T>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: colors.softer, borderRadius: 16, padding: 12, alignItems: 'center', marginBottom: 14 }}>
          <T style={{ color: colors.primary, fontSize: 15, fontWeight: '700' }}>Dr. Olivia Turner, M.D.</T>
          <T style={{ fontSize: 11, color: '#555', marginTop: 2 }}>Female Endocrinology</T>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.soft, borderRadius: 12, paddingHorizontal: 10, height: 24 }}>
              <Ionicons name="star" size={11} color={colors.primary} /><T style={{ fontSize: 11, marginLeft: 4, color: colors.primary, fontWeight: '600' }}>4.9</T>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.soft, borderRadius: 12, paddingHorizontal: 10, height: 24 }}>
              <Ionicons name="time" size={11} color={colors.primary} /><T style={{ fontSize: 11, marginLeft: 4, color: colors.primary, fontWeight: '600' }}>Mon - Sat / 9 AM - 4 PM</T>
            </View>
          </View>
        </View>
        <T style={{ color: colors.primary, fontSize: 14, fontWeight: '700', marginBottom: 6 }}>Profile</T>
        <T style={{ fontSize: 11, lineHeight: 17, marginBottom: 14 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a odio cursus lacus semper ultrices.</T>
        <View style={{ backgroundColor: colors.softer, borderRadius: 18, padding: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="chevron-back" size={14} color={colors.primary} />
            <T style={{ marginHorizontal: 14, fontSize: 12, fontWeight: '700', color: colors.primary }}>NOVEMBER 2026</T>
            <Ionicons name="chevron-forward" size={14} color={colors.primary} />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {monthDays.map((d) => <T key={d} style={{ width: '14.285%', textAlign: 'center', fontSize: 8, color: colors.grey, marginBottom: 6 }}>{d}</T>)}
            {cells.map((c, i) => (
              <Pressable key={i} disabled={!c} onPress={() => c && setSel(c)} style={{ width: '14.285%', height: 30, alignItems: 'center', justifyContent: 'center' }}>
                {c ? (
                  <View style={{ width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: sel === c ? colors.primary : 'transparent' }}>
                    <T style={{ fontSize: 11, color: sel === c ? '#fff' : colors.text }}>{c}</T>
                  </View>
                ) : null}
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomNav active={2} />
    </View>
  );
}

/* 18. Schedule */
const times = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '1:00 PM', '1:30 PM', '2:00 PM', '3:00 PM'];
const taken = ['9:30 AM', '2:00 PM'];
export function ScheduleScreen() {
  const nav = useNavigation<any>();
  const [day, setDay] = useState(24);
  const [time, setTime] = useState<string | null>(null);
  const [gender, setGender] = useState('Female');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);
  const days = [22, 23, 24, 25, 26, 27];
  const wd = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const ok = !!time && name.length > 0;
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopRow title="Dr. Olivia Turner, M.D." />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={{ alignSelf: 'flex-start', height: 28, paddingHorizontal: 14, borderRadius: 14, backgroundColor: colors.soft, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <T style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>Month</T><Ionicons name="chevron-down" size={13} color={colors.primary} style={{ marginLeft: 6 }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Ionicons name="chevron-back" size={16} color={colors.primary} />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 6 }}>
            {days.map((d, i) => (
              <Pressable key={d} onPress={() => { setDay(d); setDone(false); }} style={{ width: 40, height: 62, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: day === d ? colors.primary : colors.soft }}>
                <T style={{ fontSize: 10, color: day === d ? '#fff' : colors.primary }}>{wd[i]}</T>
                <T style={{ fontSize: 16, fontWeight: '700', color: day === d ? '#fff' : colors.primary, marginTop: 2 }}>{d}</T>
              </Pressable>
            ))}
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </View>
        <T style={{ color: colors.primary, fontSize: 14, fontWeight: '700', marginBottom: 8 }}>Available Time</T>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
          {times.map((t) => (
            <Chip key={t} label={t} active={time === t} onPress={() => !taken.includes(t) && (setTime(t), setDone(false))}
              style={{ width: '31%', height: 28, opacity: taken.includes(t) ? 0.4 : 1 }} />
          ))}
        </View>
        <T style={{ color: colors.primary, fontSize: 14, fontWeight: '700', marginBottom: 8 }}>Patient Details</T>
        <T style={{ fontSize: 12, fontWeight: '700', marginBottom: 6 }}>Full Name</T>
        <SoftField value={name} onChangeText={setName} placeholder="Jane Doe" />
        <T style={{ fontSize: 12, fontWeight: '700', marginBottom: 6, marginTop: -4 }}>Age</T>
        <SoftField value={age} onChangeText={setAge} placeholder="30" keyboardType="number-pad" />
        <T style={{ fontSize: 12, fontWeight: '700', marginBottom: 6, marginTop: -4 }}>Gender</T>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
          {['Male', 'Female', 'Other'].map((g) => <Chip key={g} label={g} active={gender === g} onPress={() => setGender(g)} style={{ height: 26 }} />)}
        </View>
        <T style={{ fontSize: 12, fontWeight: '700', marginBottom: 6 }}>Describe your problem</T>
        <TextInput value={desc} onChangeText={setDesc} multiline placeholder="Enter Your Problem Here..." placeholderTextColor={colors.grey}
          style={{ height: 90, borderRadius: 10, backgroundColor: colors.soft, padding: 12, fontSize: 12, textAlignVertical: 'top', marginBottom: 16 }} />
        {done ? (
          <View style={{ backgroundColor: colors.softer, borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            <T style={{ marginLeft: 10, flex: 1, fontSize: 12 }}>Booked: {wd[days.indexOf(day)]} {day}, {time} with Dr. Olivia Turner</T>
          </View>
        ) : null}
        <PillButton title={done ? 'Done' : 'Book Appointment'} disabled={!ok} onPress={() => (done ? nav.goBack() : setDone(true))} />
      </ScrollView>
      <BottomNav active={3} />
    </View>
  );
}
