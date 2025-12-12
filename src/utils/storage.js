/**
 * AsyncStorage helper functions
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'transactions';

export async function loadTransactions() {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.warn('loadTransactions error', e);
    return [];
  }
}

export async function saveAll(txList) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(txList));
  } catch (e) {
    console.warn('saveAll error', e);
  }
}

export async function saveTransaction(tx) {
  const list = await loadTransactions();
  list.unshift(tx);
  await saveAll(list);
}

export async function deleteTransaction(id) {
  const list = await loadTransactions();
  const filtered = list.filter(t => t.id !== id);
  await saveAll(filtered);
}
