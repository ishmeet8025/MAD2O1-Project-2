/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Reports() {
  const [summary, setSummary] = useState({ byCategory: {}, totals: { income:0, expense:0 } });

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('transactions');
        const tx = raw ? JSON.parse(raw) : [];
        const byCategory = {};
        let income = 0, expense = 0;
        tx.forEach(t => {
          const amt = Number(t.amount);
          if (t.type === 'income') income += amt;
          else expense += amt;
          byCategory[t.category] = (byCategory[t.category] || 0) + amt;
        });
        setSummary({ byCategory, totals: { income, expense } });
      } catch (e) {
        console.warn('Reports load error', e);
      }
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Reports — Summary</Text>
      <View style={styles.card}>
        <Text>Total Income: ${summary.totals.income.toFixed(2)}</Text>
        <Text>Total Expense: ${summary.totals.expense.toFixed(2)}</Text>
        <Text>Balance: ${(summary.totals.income - summary.totals.expense).toFixed(2)}</Text>
      </View>
      <Text style={styles.sub}>Totals by Category (text-only)</Text>
      {Object.keys(summary.byCategory).length === 0 && <Text>No data yet.</Text>}
      {Object.entries(summary.byCategory).map(([cat, total]) => (
        <View key={cat} style={styles.row}>
          <Text>{cat}</Text>
          <Text>${Number(total).toFixed(2)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding:16 },
  heading: { fontSize:18, fontWeight:'700', marginBottom:12 },
  card: { backgroundColor:'#f8fafc', padding:12, borderRadius:8, marginBottom:12 },
  sub: { fontWeight:'600', marginTop:8 },
  row: { flexDirection:'row', justifyContent:'space-between', paddingVertical:8, borderBottomWidth:1, borderColor:'#eee' }
});
