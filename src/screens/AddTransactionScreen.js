/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { saveTransaction } from '../utils/storage';

export default function AddTransactionScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('General');

  const onSave = async () => {
    if (!title || !amount) {
      Alert.alert('Validation', 'Please provide title and amount.');
      return;
    }
    const tx = {
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString()
    };
    await saveTransaction(tx);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Salary, Coffee..." />
      <Text>Amount</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="0.00" keyboardType="numeric" />
      <Text>Type (income / expense)</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} placeholder="expense" />
      <Text>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Food, Salary..." />
      <Button title="Save" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 4 }
});
