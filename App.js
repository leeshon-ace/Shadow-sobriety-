
// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function App() {
  const [mood, setMood] = useState('');
  const [cravings, setCravings] = useState('');
  const [sleep, setSleep] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'checkins'), {
        mood,
        cravings,
        sleep,
        notes,
        timestamp: Timestamp.now(),
      });
      Alert.alert('Success', 'Check-in saved!');
      setMood('');
      setCravings('');
      setSleep('');
      setNotes('');
    } catch (e) {
      console.error('Error adding document: ', e);
      Alert.alert('Error', 'Failed to save check-in.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Daily Check-In</Text>

      <Text style={styles.label}>Mood</Text>
      <TextInput
        style={styles.input}
        placeholder="How are you feeling?"
        value={mood}
        onChangeText={setMood}
      />

      <Text style={styles.label}>Cravings (Low/Med/High)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Low"
        value={cravings}
        onChangeText={setCravings}
      />

      <Text style={styles.label}>Sleep (hours)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 7.5"
        keyboardType="numeric"
        value={sleep}
        onChangeText={setSleep}
      />

      <Text style={styles.label}>Notes / Triggers</Text>
      <TextInput
        style={styles.input}
        placeholder="What helped or triggered you today?"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Button title="Save Check-In" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});
