import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sampleData from '../../assets/sample-data.json';

export default function Splash({ navigation }) {
  useEffect(() => {
    async function seed() {
      const raw = await AsyncStorage.getItem('transactions');
      if (!raw) {
        await AsyncStorage.setItem('transactions', JSON.stringify(sampleData));
      }
      setTimeout(() => navigation.replace('Home'), 1200);
    }
    seed();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Smart Budget Tracker Lite</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center' },
  logo: { width:110, height:110 },
  title: { marginTop:20, fontSize:18, fontWeight:'700' }
});
