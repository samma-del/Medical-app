
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView
} from 'react-native';

type Props = {
  onBack?: () => void;
  onPay?: () => void;
  onChangeMethod?: () => void;
};

export default function PaymentSummary({
  onBack, onPay, onChangeMethod
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.blueHeader}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.back}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Payment</Text>
        </View>
        <Text style={styles.price}>$ 100.00</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.doctorCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👩‍⚕️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.doctorName}>Dr. Olivia Turner, M.D.</Text>
            <Text style={styles.specialty}>Dermato-Endocrinology</Text>
            <Text style={styles.rating}>★★★★★</Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Date / Hour</Text>
          <Text style={styles.value}>March 24, Year / 10:00 AM</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>30 Minutes</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Booking For</Text>
          <Text style={styles.value}>Another Person</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>$100.00</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>30 Minutes</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>$100.00</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Payment Method</Text>
          <TouchableOpacity onPress={onChangeMethod}>
            <Text style={styles.value}>
              Card <Text style={{ color: '#2864F6' }}>Change</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={onPay}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const BLUE = '#2864F6';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  blueHeader: {
    backgroundColor: BLUE,
    paddingBottom: 30, borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  header: {
    flexDirection: 'row', alignItems: 'center',
    padding: 20, gap: 20
  },
  back: { fontSize: 32, color: '#fff' },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  price: {
    color: '#fff', fontSize: 34,
    fontWeight: 'bold', textAlign: 'center'
  },
  content: { padding: 22, paddingBottom: 40 },
  doctorCard: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10
  },
  avatar: {
    width: 65, height: 65, borderRadius: 33,
    backgroundColor: '#DCE6FF',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12
  },
  avatarText: { fontSize: 32 },
  doctorName: { color: BLUE, fontWeight: 'bold', fontSize: 15 },
  specialty: { color: '#777', fontSize: 11 },
  rating: { color: BLUE, fontSize: 13, marginTop: 5 },
  line: {
    height: 1, backgroundColor: '#B6C8FF',
    marginVertical: 20
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 13, alignItems: 'center'
  },
  label: { color: '#8BA5EC', fontSize: 12 },
  value: { color: '#333', fontSize: 12, fontWeight: '600' },
  button: {
    backgroundColor: BLUE, borderRadius: 25,
    padding: 15, alignItems: 'center',
    marginTop: 45, marginHorizontal: 10
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
