/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';

export default function TransactionList({ data }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ paddingBottom: 32 }}
      ListEmptyComponent={() => <View style={styles.empty}><Text>No transactions found</Text></View>}
      renderItem={({ item }) => <TransactionItem item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  empty: { padding: 20, alignItems: 'center' }
});
