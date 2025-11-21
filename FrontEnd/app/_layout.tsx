import * as NavigationBar from 'expo-navigation-bar';
import { Slot, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MiniProfile from '../components/MiniProfile';
import '../global.css';

export default function RootLayout() {
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();

  const isOnboarding = pathname.startsWith('/onboarding');
  const isAuth = pathname.startsWith('/auth');

  // Ẩn navigation bar Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync("inset-touch");
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Navbar */}
      {!(isOnboarding && isAuth) && (
        <View style={styles.navbar}>
          <Text style={styles.title}>Speed Rail</Text>

          <TouchableOpacity onPress={() => setShowProfile(prev => !prev)}>
            <Image
              source={require('../assets/images/avatar.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* MiniProfile */}
      {showProfile && !isOnboarding && (
        <MiniProfile onClose={() => setShowProfile(false)} />
      )}

      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  navbar: {
    height: 60,
    backgroundColor: '#59659A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
