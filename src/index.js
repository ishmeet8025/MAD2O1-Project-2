/**
 * Course: MAD201 - Project 2
 * Student: YOUR NAME HERE - YOUR ID HERE
 * Description: Smart Budget Tracker Lite - React Native (Expo)
 * This file is part of the project submission for MAD201.
 */

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { registerRootComponent } from 'expo';
import Home from './screens/Home';
import Transactions from './screens/Transactions';
import Add from './screens/Add';
import Settings from './screens/Settings';
import Splash from './screens/Splash';
import Reports from './screens/Reports';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsNav() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Transactions" component={Transactions} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={TabsNav} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Reports" component={Reports} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
