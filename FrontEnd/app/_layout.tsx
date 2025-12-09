import * as NavigationBar from 'expo-navigation-bar';
import { Slot, usePathname, useNavigationContainerRef  } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MiniProfile from '../components/MiniProfile';
import '../global.css';
import * as Sentry from '@sentry/react-native';

const navigationIntegration = Sentry.reactNavigationIntegration();

Sentry.init({
  dsn: 'https://350ba636da458a1f7f461e67d216df94@o4510505015181312.ingest.us.sentry.io/4510505017475072',

  tracePropagationTargets: ["https://myproject.org", /^\/api\//],
  debug: true,

  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% transactions khi test
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 5000,


  // User Interaction Tracking
  enableUserInteractionTracing: true,


  // Profiling
  profilesSampleRate: 1.0,  // Chưa cần thêm liền
 
  // Session Replay
  replaysSessionSampleRate: 1.0, // Ghi lại 100% session khi test // Chưa cần thêm liền
  replaysOnErrorSampleRate: 1.0, // Ghi lại 100% khi có error // Chưa cần thêm liền

  // Integrations
  integrations: [
    // Mobile replay integration with minimal configuration
    // See: https://docs.sentry.io/platforms/react-native/session-replay/configuration/
    Sentry.mobileReplayIntegration({
      maskAllText: true,
      maskAllImages: true,
    }), // Chưa cần thêm liền
    navigationIntegration,
    Sentry.hermesProfilingIntegration({
      platformProfilers: true,
    }), // Chưa cần thêm liền
  ],
 
  // Privacy
  sendDefaultPii: false, // Không gửi thông tin cá nhân mặc định
  maxBreadcrumbs: 150,
 
  // Enable native crash handling
  enableNative: true,
  enableNativeCrashHandling: true,
  enableAutoPerformanceTracing: true,
 
  // Debug configuration
  _experiments: {
    captureFailedRequests: true,
  }, // Chưa cần thêm liền
});

function RootLayout() {
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

  // Đăng ký navigation container cho Sentry
  const ref = useNavigationContainerRef();
  useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);
  // Thiết lập user context cho analytics
  useEffect(() => {
    Sentry.setUser({id: "custom_group_1_test", email: "nguyen.nguyentuankhoi@hcmut.edu.vn" ,username: "speedrail_test"
    });
    Sentry.setTag("group", "nhom-4-nguoi");
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Navbar */}
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

      {/* MiniProfile */}
      {showProfile && !isOnboarding && (
        <MiniProfile onClose={() => setShowProfile(false)} />
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
});

export default Sentry.wrap(RootLayout);