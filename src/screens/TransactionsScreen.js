/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { loadTransactions, deleteTransaction } from '../utils/storage';

export default function TransactionsScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);

  const refresh = async () => {
    const tx = await loadTransactions();
    setTransactions(tx);
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', refresh);
    return unsub;
  }, [navigation]);

  const onDelete = (id) => {
    Alert.alert('Delete', 'Delete this transaction?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: async () => { await deleteTransaction(id); refresh(); } }
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Add" onPress={() => navigation.navigate('Add')} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.title}>{item.title} ({item.category})</Text>
              <Text>{item.type} • ${Number(item.amount).toFixed(2)}</Text>
              <Text>{new Date(item.date).toLocaleString()}</Text>
            </View>
            <Button title="Delete" onPress={() => onDelete(item.id)} />
          </View>
        )}
        ListEmptyComponent={() => <Text style={{ marginTop: 20 }}>No transactions yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontWeight: 'bold' }
});
