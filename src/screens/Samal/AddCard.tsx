
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Alert, ScrollView
} from 'react-native';

type Props = {
  onBack?: () => void;
  onSave?: (name: string, lastFour: string) => void;
};

export default function AddCard({ onBack, onSave }: Props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formatNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    setNumber(digits.replace(/(.{4})/g, '$1 ').trim());
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setExpiry(
      digits.length > 2
        ? digits.slice(0, 2) + '/' + digits.slice(2)
        : digits
    );
  };

  const handleSave = () => {
    const digits = number.replace(/\s/g, '');
    const [month, year] = expiry.split('/').map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    const validExpiry =
      expiry.length === 5 &&
      month >= 1 && month <= 12 &&
      (year > currentYear ||
        (year === currentYear && month >= currentMonth));

    if (!name.trim() || digits.length < 13 ||
        !validExpiry || cvv.length < 3) {
      Alert.alert('Invalid Details', 'Please check your card information.');
      return;
    }

    onSave?.(name.trim(), digits.slice(-4));
    setCvv('');
    Alert.alert('Success', 'Demo card information accepted.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Card</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.chip}>▤</Text>
          <Text style={styles.cardNumber}>
            {number || '0000 0000 0000 0000'}
          </Text>
          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.cardLabel}>Card Holder Name</Text>
              <Text style={styles.cardValue}>{name || 'John Doe'}</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expiry Date</Text>
              <Text style={styles.cardValue}>{expiry || '04/28'}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.label}>Card Holder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor="#91A7E9"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="0000 0000 0000 0000"
          placeholderTextColor="#91A7E9"
          keyboardType="number-pad"
          value={number}
          onChangeText={formatNumber}
          maxLength={19}
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              placeholderTextColor="#91A7E9"
              keyboardType="number-pad"
              value={expiry}
              onChangeText={formatExpiry}
              maxLength={5}
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="000"
              placeholderTextColor="#91A7E9"
              keyboardType="number-pad"
              secureTextEntry
              value={cvv}
              onChangeText={value =>
                setCvv(value.replace(/\D/g, '').slice(0, 4))
              }
              maxLength={4}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const BLUE = '#2864F6';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    padding: 20, gap: 20
  },
  back: { fontSize: 32, color: BLUE },
  title: { fontSize: 20, color: BLUE, fontWeight: 'bold' },
  content: { padding: 25, paddingBottom: 40, flexGrow: 1 },
  card: {
    backgroundColor: '#4478FF', borderRadius: 18,
    height: 190, padding: 22,
    justifyContent: 'space-between',
    marginBottom: 30
  },
  chip: { color: '#fff', fontSize: 26, alignSelf: 'flex-end' },
  cardNumber: {
    color: '#fff', fontSize: 20,
    letterSpacing: 2, fontWeight: 'bold'
  },
  cardBottom: {
    flexDirection: 'row', justifyContent: 'space-between'
  },
  cardLabel: { color: '#DCE6FF', fontSize: 10 },
  cardValue: { color: '#fff', fontSize: 13, marginTop: 5 },
  label: {
    color: '#333', fontSize: 13,
    fontWeight: 'bold', marginBottom: 8
  },
  input: {
    backgroundColor: '#EDF2FF', borderRadius: 25,
    paddingHorizontal: 17, height: 46,
    color: '#333', marginBottom: 22
  },
  row: { flexDirection: 'row', gap: 15 },
  half: { flex: 1 },
  button: {
    backgroundColor: BLUE, borderRadius: 25,
    padding: 15, alignItems: 'center',
    marginTop: 45
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
