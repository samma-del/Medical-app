
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView
} from 'react-native';

type Props = {
  onBack?: () => void;
  onAddCard?: () => void;
  onContinue?: (method: string) => void;
};

export default function PaymentMethod({
  onBack, onAddCard, onContinue
}: Props) {
  const [selected, setSelected] = useState('Card');

  const options = [
    { id: 'Apple Pay', icon: '◉' },
    { id: 'PayPal', icon: 'P' },
    { id: 'Google Pay', icon: 'G' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Payment Method</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.section}>Credit & Debit Card</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={onAddCard}
        >
          <Text style={styles.icon}>▣</Text>
          <Text style={styles.optionText}>Add New Card</Text>
          <Text style={styles.plus}>⊕</Text>
        </TouchableOpacity>

        <Text style={[styles.section, { marginTop: 35 }]}>
          More Payment Option
        </Text>

        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={() => setSelected(option.id)}
          >
            <Text style={styles.icon}>{option.icon}</Text>
            <Text style={styles.optionText}>{option.id}</Text>
            <View style={styles.radio}>
              {selected === option.id && <View style={styles.dot} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onContinue?.(selected)}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
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
  back: { color: BLUE, fontSize: 32 },
  title: { color: BLUE, fontSize: 20, fontWeight: 'bold' },
  content: { padding: 25, flexGrow: 1 },
  section: {
    color: '#333', fontSize: 15,
    fontWeight: 'bold', marginBottom: 12
  },
  option: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#EDF2FF',
    borderRadius: 25, padding: 13,
    marginBottom: 12
  },
  icon: { fontSize: 20, color: BLUE, width: 35 },
  optionText: { flex: 1, color: '#829DE8', fontSize: 14 },
  plus: { color: BLUE, fontSize: 22 },
  radio: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 1.5, borderColor: BLUE,
    justifyContent: 'center', alignItems: 'center'
  },
  dot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: BLUE
  },
  button: {
    backgroundColor: BLUE, padding: 15,
    borderRadius: 25, alignItems: 'center',
    marginHorizontal: 35, marginBottom: 25
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
