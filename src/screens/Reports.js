import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Reports() {
  const [summary, setSummary] = useState({ byCategory: {} });

  useEffect(() => {
    async function load() {
      const raw = await AsyncStorage.getItem('transactions');
      const tx = raw ? JSON.parse(raw) : [];
      const map = {};
      tx.forEach(t => {
        map[t.category] = (map[t.category] || 0) + Number(t.amount);
      });
      setSummary({ byCategory: map });
    }
    load();
  }, []);

  const total = Object.values(summary.byCategory).reduce((s,a)=>s+a,0);

  return (
    <ScrollView style={{padding:16}}>
      <Text style={styles.heading}>Reports</Text>
      {Object.entries(summary.byCategory).map(([cat, amt]) => {
        const pct = total ? (amt / total) * 100 : 0;
        return (
          <View key={cat} style={styles.row}>
            <Text>{cat}</Text>
            <Text>${amt.toFixed(2)} ({pct.toFixed(1)}%)</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize:18, fontWeight:'700', marginBottom:10 },
  row: { flexDirection:'row', justifyContent:'space-between', paddingVertical:8 }
});
