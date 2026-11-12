
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Alert, ScrollView
} from 'react-native';

type Props = {
  onBack?: () => void;
  onSubmit?: (rating: number, comment: string) => void;
};

export default function Review({ onBack, onSubmit }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!comment.trim()) {
      Alert.alert('Review', 'Please enter your comment.');
      return;
    }
    onSubmit?.(rating, comment.trim());
    Alert.alert('Thank You', 'Your review has been submitted.');
    setComment('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Review</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>
          Share your experience with your doctor.
          Your feedback helps improve our service.
        </Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>👩‍⚕️</Text>
        </View>

        <Text style={styles.name}>Dr. Olivia Turner, M.D.</Text>
        <Text style={styles.specialty}>Dermato-Endocrinology</Text>

        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
            >
              <Text style={[
                styles.star,
                star <= rating && styles.activeStar
              ]}>
                {star <= rating ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.textarea}
          placeholder="Enter Your Comment Here..."
          placeholderTextColor="#91A7E9"
          multiline
          textAlignVertical="top"
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Review</Text>
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
  content: {
    padding: 25, alignItems: 'center',
    paddingBottom: 40
  },
  description: {
    fontSize: 12, color: '#777',
    lineHeight: 18, alignSelf: 'stretch',
    marginBottom: 25
  },
  avatar: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: '#D4E0FF',
    alignItems: 'center', justifyContent: 'center'
  },
  avatarIcon: { fontSize: 55 },
  name: {
    color: BLUE, fontWeight: 'bold',
    fontSize: 18, marginTop: 18
  },
  specialty: { color: '#888', fontSize: 12, marginTop: 4 },
  stars: {
    flexDirection: 'row', marginVertical: 10,
    gap: 5
  },
  star: { fontSize: 27, color: '#A7B7D8' },
  activeStar: { color: BLUE },
  textarea: {
    backgroundColor: '#EDF2FF',
    width: '100%', height: 160,
    borderRadius: 15, padding: 15,
    fontSize: 13, color: '#333', marginTop: 20
  },
  button: {
    backgroundColor: BLUE, borderRadius: 25,
    width: '85%', padding: 15,
    alignItems: 'center', marginTop: 35
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
