/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import useTransactions from '../../hooks/useTransactions';
import TransactionList from '../../components/TransactionList';

export default function Home({ navigation }) {
  const { transactions, loading } = useTransactions();

  const income = transactions.filter(t => t.type === 'income').reduce((s,a)=>s+Number(a.amount),0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s,a)=>s+Number(a.amount),0);
  const balance = income - expense;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Smart Budget Lite" />
      <View style={styles.summary}>
        <View style={styles.card}><Text style={styles.cardTitle}>Balance</Text><Text style={styles.cardValue}>${balance.toFixed(2)}</Text></View>
        <View style={styles.row}>
          <View style={styles.smallCard}><Text>Income</Text><Text>${income.toFixed(2)}</Text></View>
          <View style={styles.smallCard}><Text>Expense</Text><Text>${expense.toFixed(2)}</Text></View>
        </View>
      </View>
      <View style={styles.listHeader}>
        <Text style={{fontSize:16,fontWeight:'700'}}>Transactions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
          <Text style={{color:'#2563eb'}}>Add</Text>
        </TouchableOpacity>
      </View>
      <TransactionList data={transactions} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  summary: { padding: 16 },
  card: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  cardTitle: { color: '#64748b' },
  cardValue: { fontSize: 20, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  smallCard: { backgroundColor: '#fff', padding: 10, borderRadius: 8, width: '48%', borderWidth:1, borderColor:'#e2e8f0', alignItems:'center' },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 }
});
