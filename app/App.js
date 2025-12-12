/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

// app/App.js
// Entrypoint for the app folder (example for modular structure)
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function AppEntry() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>App Module Entry — replace with real entry (e.g. src/index.js)</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600' }
});
