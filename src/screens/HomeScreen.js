/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { loadTransactions } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const tx = await loadTransactions();
      const income = tx.filter(t => t.type === 'income').reduce((s, a) => s + Number(a.amount), 0);
      const expense = tx.filter(t => t.type === 'expense').reduce((s, a) => s + Number(a.amount), 0);
      setTotals({ income, expense, balance: income - expense });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Income</Text>
        <Text style={styles.value}>${totals.income.toFixed(2)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Expenses</Text>
        <Text style={styles.value}>${totals.expense.toFixed(2)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Balance</Text>
        <Text style={styles.value}>${totals.balance.toFixed(2)}</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Add Transaction" onPress={() => navigation.navigate('Add')} />
        <Button title="View Reports" onPress={() => navigation.navigate('Reports')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center' },
  card: { width: '90%', padding: 16, borderRadius: 8, backgroundColor: '#f0f0f0', marginBottom: 12 },
  title: { fontSize: 16 },
  value: { fontSize: 22, fontWeight: 'bold' }
});
