/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Button, StyleSheet, Alert } from 'react-native';
import { fetchRates } from '../utils/currency';

export default function SettingsScreen({ navigation }) {
  const [isDark, setIsDark] = useState(false);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    // fetch default rate on mount
    (async () => {
      try {
        const r = await fetchRates('USD', 'CAD');
        setRate(r);
      } catch (e) {
        console.warn('Rate fetch failed', e.message);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Dark Theme</Text>
        <Switch value={isDark} onValueChange={setIsDark} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Text>Latest USD → CAD rate: {rate ? rate : 'not available'}</Text>
        <Button title="Refresh Rate" onPress={async () => {
          try {
            const r = await fetchRates('USD','CAD');
            setRate(r);
            Alert.alert('Rate updated', String(r));
          } catch (e) {
            Alert.alert('Error', e.message);
          }
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});
