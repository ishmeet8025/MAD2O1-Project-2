import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { CATEGORIES } from '../../constants/categories';

export default function Add({ navigation }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const save = async () => {
    const t = title.trim();
    const a = amount.trim();

    if (!t || !a) return Alert.alert('Error', 'Please enter title and amount.');

    const parsed = Number(a);
    if (isNaN(parsed) || parsed <= 0)
      return Alert.alert('Error', 'Amount must be a positive number.');

    const tx = {
      id: Date.now().toString(),
      title: t,
      amount: parsed,
      type,
      category,
      date: new Date().toISOString()
    };

    const raw = await AsyncStorage.getItem('transactions');
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(tx);
    await AsyncStorage.setItem('transactions', JSON.stringify(list));

    Alert.alert("Saved", "Transaction added.");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />

      <Text style={styles.label}>Type</Text>
      <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
        <Picker.Item label="Expense" value="expense" />
        <Picker.Item label="Income" value="income" />
      </Picker>

      <Text style={styles.label}>Category</Text>
      <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
        {CATEGORIES.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>

      <Button title="Save" onPress={save} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  label: { marginTop:8, fontWeight:'600' },
  input: { borderWidth:1, padding:8, borderRadius:6, marginTop:4 },
  picker: { marginTop:4 }
});
