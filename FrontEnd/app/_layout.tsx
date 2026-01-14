import * as NavigationBar from 'expo-navigation-bar';
import { Slot, usePathname, useNavigationContainerRef  } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MiniProfile from '../components/MiniProfile';
import '../global.css';
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants'; // Thêm dòng này để kiểm tra Expo Go

const navigationIntegration = Sentry.reactNavigationIntegration();

// Kiểm tra xem có đang chạy trên Expo Go hay không
const isExpoGo = Constants.appOwnership === 'expo';

Sentry.init({
  dsn: 'https://350ba636da458a1f7f461e67d216df94@o4510505015181312.ingest.us.sentry.io/4510505017475072',

  tracePropagationTargets: ["https://myproject.org", /^\/api\//],
  debug: true,

  tracesSampleRate: 1.0, 
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 5000,
  enableUserInteractionTracing: true,

  profilesSampleRate: 1.0,  
  replaysSessionSampleRate: 1.0, 
  replaysOnErrorSampleRate: 1.0, 

  integrations: [
    // SỬA Ở ĐÂY: Chỉ chạy các tính năng native nếu KHÔNG PHẢI Expo Go
    ...(!isExpoGo ? [
      Sentry.mobileReplayIntegration({
        maskAllText: true,
        maskAllImages: true,
      }),
      Sentry.hermesProfilingIntegration({
        platformProfilers: true,
      }),
    ] : []),
    navigationIntegration,
  ],
  
  sendDefaultPii: false, 
  maxBreadcrumbs: 150,
  
  // SỬA Ở ĐÂY: Tắt hẳn native khi đang dev trên Expo Go để tránh lỗi "Native Client"
  enableNative: !isExpoGo,
  enableNativeCrashHandling: !isExpoGo,
  enableAutoPerformanceTracing: !isExpoGo,
  
  _experiments: {
    captureFailedRequests: true,
  }, 
});

function RootLayout() {
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();

  const isOnboarding = pathname.startsWith('/onboarding');
  const isAuth = pathname.startsWith('/auth');

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync("inset-touch");
    }
  }, []);

  const ref = useNavigationContainerRef();
  useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  useEffect(() => {
    Sentry.setUser({
      id: "custom_group_1_test", 
      email: "nguyen.nguyentuankhoi@hcmut.edu.vn",
      username: "speedrail_test"
    });
    Sentry.setTag("group", "nhom-4-nguoi");
  }, []);

  useEffect(() => {
    setShowProfile(false);
  }, [pathname]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {!(isOnboarding || isAuth) && (
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

      {showProfile && !isOnboarding && (
        <>
          <TouchableOpacity style={styles.fullOverlay} onPress={() => setShowProfile(false)} />
          <MiniProfile onClose={() => setShowProfile(false)} />
        </>
      )}

      <Slot />
    </View>
  );
};

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
  fullOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 8,
  },
});

export default Sentry.wrap(RootLayout);