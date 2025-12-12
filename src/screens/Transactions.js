/**
 * Course: MAD201 - Project 2
 * Student: Ishmeet Singh
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 */

import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Button, FlatList, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TransactionItem from '../../components/TransactionItem';

export default function Transactions({ navigation }) {
  const [transactions, setTransactions] = useState([]);

  const load = async () => {
    const raw = await AsyncStorage.getItem('transactions');
    setTransactions(raw ? JSON.parse(raw) : []);
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', load);
    load();
    return unsub;
  }, [navigation]);

  const del = (id) => {
    Alert.alert("Delete", "Delete this transaction?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          const next = transactions.filter(t => t.id !== id);
          setTransactions(next);
          await AsyncStorage.setItem('transactions', JSON.stringify(next));
        }
      }
    ]);
  };

  // ⭐ NEW: CLEAR ALL BUTTON
  const clearAll = () => {
    Alert.alert(
      "Clear All Transactions",
      "This will remove ALL your transactions. Continue?",
      [
        { text: "Cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.setItem("transactions", JSON.stringify([]));
            setTransactions([]);
          }
        }
      ]
    );
  };

  return (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ padding: 16, gap: 10 }}>
      <Button title="Add New Transaction" onPress={() => navigation.navigate('Add')} />

      <Button
        title="Clear All Transactions"
        color="#b91c1c"
        onPress={clearAll}
      />
    </View>

    <FlatList
      data={transactions}
      keyExtractor={i => i.id}
      renderItem={({ item }) => (
        <View style={styles.itemRow}>
          <TransactionItem item={item} />
          <TouchableOpacity style={styles.del} onPress={() => del(item.id)}>
            <Text style={{ color: "#fff" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={() => <Text style={{ padding: 16 }}>No transactions yet.</Text>}
    />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 },
  del: { backgroundColor: '#dc2626', padding: 8, borderRadius: 6 }
});
