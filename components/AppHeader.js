import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppHeader({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    backgroundColor: '#3b82f6',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700'
  }
});
