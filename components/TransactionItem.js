/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TransactionItem({ item }) {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.category} • {new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <Text style={[styles.amount, item.type === 'expense' ? styles.expense : styles.income]}>
        {item.type === 'expense' ? '-' : '+'}${Number(item.amount).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontWeight: '600' },
  meta: { color: '#666', fontSize: 12 },
  amount: { fontWeight: '700', fontSize: 16 },
  expense: { color: '#dc2626' },
  income: { color: '#16a34a' }
});
