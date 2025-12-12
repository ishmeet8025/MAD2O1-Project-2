/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { loadTransactions } from '../utils/storage';

export default function ReportsScreen() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    (async () => {
      const tx = await loadTransactions();
      const byCategory = {};
      tx.forEach(t => {
        byCategory[t.category] = (byCategory[t.category] || 0) + Number(t.amount) * (t.type === 'expense' ? 1 : -1) * -1;
        // simple approach: income as positive, expense as positive in category totals
        if (t.type === 'income') byCategory[t.category] = (byCategory[t.category] || 0) + Number(t.amount);
      });
      setSummary(byCategory);
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Summary by Category</Text>
      {Object.keys(summary).length === 0 && <Text>No data yet.</Text>}
      {Object.entries(summary).map(([cat, total]) => (
        <View key={cat} style={styles.row}>
          <Text>{cat}</Text>
          <Text>${Number(total).toFixed(2)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' }
});
