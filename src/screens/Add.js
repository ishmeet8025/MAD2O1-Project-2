/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { CATEGORIES } from '../../constants/categories';

export default function Add({ navigation }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const save = async () => {
    if (!title || !amount) return Alert.alert('Please enter title and amount');
    const tx = { id: Date.now().toString(), title, amount: Number(amount), type, category, date: new Date().toISOString() };
    try {
      const raw = await AsyncStorage.getItem('transactions');
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(tx);
      await AsyncStorage.setItem('transactions', JSON.stringify(list));
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Save failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Salary, Coffee..." />
      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="0.00" keyboardType="numeric" />
      <Text style={styles.label}>Type</Text>
      <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
        <Picker.Item label="Expense" value="expense" />
        <Picker.Item label="Income" value="income" />
      </Picker>
      <Text style={styles.label}>Category</Text>
      <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
        {CATEGORIES.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>
      <View style={{marginTop:12}}><Button title="Save" onPress={save} /></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  label: { marginTop:8, color:'#334155' },
  input: { borderWidth:1, borderColor:'#cbd5e1', padding:8, borderRadius:6, marginTop:4 },
  picker: { marginTop:8 }
});
