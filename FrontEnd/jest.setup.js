// jest.setup.js
// Note: @testing-library/jest-native is deprecated, matchers are built into @testing-library/react-native

// Mock expo modules before other imports
jest.mock('expo-modules-core', () => ({
  requireNativeModule: jest.fn(() => ({})),
  requireOptionalNativeModule: jest.fn(() => ({})),
  requireNativeViewManager: jest.fn(() => 'View'),
  NativeModulesProxy: {},
  EventEmitter: class EventEmitter {
    addListener() { }
    removeListener() { }
  },
}));

// Mock expo winter (import.meta)
global.__ExpoImportMetaRegistry = {
  register: jest.fn(),
  getValue: jest.fn(),
};

// Mock structuredClone
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
}

// Mock expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {},
    manifest: {},
    appOwnership: 'standalone',
  },
  Constants: {
    expoConfig: {},
    manifest: {},
    appOwnership: 'standalone',
  },
}));

// Mock expo-font
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
  isLoading: jest.fn(() => false),
}));

// Mock @sentry/react-native
jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  setUser: jest.fn(),
  setTag: jest.fn(),
  reactNavigationIntegration: jest.fn(() => ({
    registerNavigationContainer: jest.fn(),
  })),
  wrap: jest.fn((component) => component),
  mobileReplayIntegration: jest.fn(),
  hermesProfilingIntegration: jest.fn(),
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const createIconMock = () => {
    return (props) => React.createElement(Text, props, props.name || 'icon');
  };

  return {
    AntDesign: createIconMock(),
    MaterialIcons: createIconMock(),
    EvilIcons: createIconMock(),
    FontAwesome: createIconMock(),
    Ionicons: createIconMock(),
  };
});

// Mock expo-navigation-bar
jest.mock('expo-navigation-bar', () => ({
  setVisibilityAsync: jest.fn(),
  setBehaviorAsync: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
  })),
  usePathname: jest.fn(() => '/'),
  useLocalSearchParams: jest.fn(() => ({})),
  Link: ({ children, href, ...props }) => {
    const React = require('react');
    return React.createElement('Text', { ...props, href }, children);
  },
  Redirect: jest.fn(),
  Stack: {
    Screen: jest.fn(),
  },
  Tabs: jest.fn(({ children }) => children),
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => { };

  return {
    ...Reanimated,
    useSharedValue: jest.fn((initialValue) => {
      let _value = initialValue;
      return {
        get value() { return _value; },
        set value(newValue) { _value = newValue; },
      };
    }),
    useAnimatedStyle: jest.fn((callback) => {
      // Execute the callback to cover the code
      try {
        return callback();
      } catch (e) {
        return {};
      }
    }),
    useAnimatedScrollHandler: jest.fn((handlers) => {
      // Return a function that will execute the onScroll handler
      return (event) => {
        if (handlers && handlers.onScroll) {
          try {
            handlers.onScroll(event);
          } catch (e) {
            // Ignore errors in test
          }
        }
      };
    }),
    withTiming: jest.fn((value) => value),
    withSpring: jest.fn((value) => value),
    interpolate: jest.fn((value, inputRange, outputRange) => {
      // Simple linear interpolation for testing
      if (!inputRange || !outputRange) return outputRange ? outputRange[0] : 0;
      return outputRange[0];
    }),
    Extrapolation: {
      CLAMP: 'clamp',
      EXTEND: 'extend',
      IDENTITY: 'identity',
    },
  };
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: jest.fn((component) => component),
    Directions: {},
  };
});



// Suppress console warnings during tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock setImmediate if not available
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (callback) => setTimeout(callback, 0);
}