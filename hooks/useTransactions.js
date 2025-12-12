/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'tx_v1';

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(KEY);
      setTransactions(raw ? JSON.parse(raw) : []);
    } catch (e) {
      console.warn('useTransactions load error', e);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  async function add(tx) {
    const next = [tx, ...transactions];
    setTransactions(next);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
  }

  async function remove(id) {
    const next = transactions.filter(t => t.id !== id);
    setTransactions(next);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
  }

  return { transactions, loading, add, remove, reload: load };
}
