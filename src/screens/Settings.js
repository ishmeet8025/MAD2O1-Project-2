/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Switch, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  const [dark, setDark] = useState(false);
  const [currency, setCurrency] = useState('CAD');
  const [rate, setRate] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('settings_v1');
        if (raw) {
          const s = JSON.parse(raw);
          setDark(!!s.dark);
          setCurrency(s.currency || 'CAD');
        }
      } catch (e) {}
    })();
  }, []);

  const saveSettings = async (next) => {
    const s = { dark, currency, ...next };
    setDark(s.dark);
    setCurrency(s.currency);
    await AsyncStorage.setItem('settings_v1', JSON.stringify(s));
  };

  const fetchRate = async () => {
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await res.json();
      const r = data.rates[currency];
      setRate(r);
      Alert.alert('Rate', `1 USD = ${r} ${currency}`);
    } catch (e) {
      Alert.alert('Error', 'Unable to fetch rate');
    }
  };

  return (
    <SafeAreaView style={{flex:1,padding:16}}>
      <Text style={{fontSize:18,fontWeight:'700'}}>Settings</Text>
      <View style={styles.row}>
        <Text>Dark Theme</Text>
        <Switch value={dark} onValueChange={val => saveSettings({dark: val})} />
      </View>
      <View style={{marginTop:12}}>
        <Text>Select currency (stored in settings)</Text>
        <View style={{marginTop:6}}>
          <Button title="Set CAD" onPress={() => saveSettings({currency:'CAD'})} />
          <View style={{height:8}} />
          <Button title="Set EUR" onPress={() => saveSettings({currency:'EUR'})} />
        </View>
        <View style={{marginTop:8}}>
          <Button title="Fetch USD rate" onPress={fetchRate} />
        </View>
        <Text style={{marginTop:8}}>Latest: {rate ? rate : 'not fetched'}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:12 }
});
