import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RootLayout from '../app/_layout';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
  })),
  usePathname: jest.fn(() => '/'),
  useNavigationContainerRef: jest.fn(() => ({})),
  Slot: () => null,
}));

describe('RootLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<RootLayout />);
    expect(getByText('Speed Rail')).toBeTruthy();
  });

  it('shows navbar on non-onboarding and non-auth pages', () => {
    (require('expo-router').usePathname as jest.Mock).mockReturnValue('/home');
    const { getByText } = render(<RootLayout />);
    expect(getByText('Speed Rail')).toBeTruthy();
  });

  it('hides navbar on onboarding page', () => {
    (require('expo-router').usePathname as jest.Mock).mockReturnValue('/onboarding');
    const { queryByText } = render(<RootLayout />);
    expect(queryByText('Speed Rail')).toBeNull();
  });

  it('hides navbar on auth page', () => {
    (require('expo-router').usePathname as jest.Mock).mockReturnValue('/auth/login');
    const { queryByText } = render(<RootLayout />);
    expect(queryByText('Speed Rail')).toBeNull();
  });
});