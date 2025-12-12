/**
 * MAD201 - Project 2
 * Author: YOUR NAME - YOUR ID
 * Smart Budget Tracker Lite - main App entry
 *
 * This file configures navigation and provides app-wide theme state.
 */
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { StatusBar } from 'react-native';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  // Could load theme preference from AsyncStorage; kept simple for demo
  useEffect(() => {
    // placeholder for future theme load
  }, []);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Navigation isDark={isDark} setIsDark={setIsDark} />
    </NavigationContainer>
  );
}
