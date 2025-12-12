/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Splash({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Home'), 1800);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Smart Budget Tracker Lite</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#fff' },
  logo: { width:120, height:120, marginBottom:20 },
  title: { fontSize:20, fontWeight:'700' }
});
