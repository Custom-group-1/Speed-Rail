import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserSave from './save';

// Mock PresentBox để dễ điều khiển onEdit/onDelete + hiển thị name
jest.mock('../../components/PresentBox', () => {
  return jest.fn((props) => {
    const React = require('react');
    const { View, Text, TouchableOpacity } = require('react-native');
    const { name, onEdit, onDelete } = props;
    return (
      <View testID={`preset-${name}`}>
        <Text>{name}</Text>
        <TouchableOpacity
          testID={`preset-${name}-edit`}
          onPress={onEdit}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID={`preset-${name}-delete`}
          onPress={onDelete}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  });
});

describe('UserSave Screen', () => {
  const setup = () => {
    const mockReplace = jest.fn();
    const mockUseRouter = jest.spyOn(require('expo-router'), 'useRouter');
    mockUseRouter.mockReturnValue({ replace: mockReplace });

    const utils = render(<UserSave />);

    return {
      ...utils,
      mockReplace,
      mockUseRouter,
    };
  };

  it('renders background, presets and choose button', () => {
    const { getByText, mockUseRouter } = setup();

    // Back button
    expect(getByText('←')).toBeTruthy();

    // 3 presets
    expect(getByText('Preset 1')).toBeTruthy();
    expect(getByText('Preset 2')).toBeTruthy();
    expect(getByText('Preset 3')).toBeTruthy();

    // Nút Chọn
    expect(getByText('Chọn')).toBeTruthy();

    mockUseRouter.mockRestore();
  });

  it('navigates back to /home when back arrow is pressed', () => {
    const { getByText, mockReplace, mockUseRouter } = setup();

    const backButton = getByText('←');
    fireEvent.press(backButton);

    expect(mockReplace).toHaveBeenCalledWith('/home');

    mockUseRouter.mockRestore();
  });

  it('navigates to /home when "Chọn" button is pressed', () => {
    const { getByText, mockReplace, mockUseRouter } = setup();

    const chooseButton = getByText('Chọn');
    fireEvent.press(chooseButton);

    expect(mockReplace).toHaveBeenCalledWith('/home');

    mockUseRouter.mockRestore();
  });

  it('allows selecting different presets (gọi handler setActivePreset)', () => {
    const { getByText, mockUseRouter } = setup();

    const preset1 = getByText('Preset 1');
    const preset2 = getByText('Preset 2');
    const preset3 = getByText('Preset 3');

    // Gọi onPress của từng preset (bao phủ onPress={() => setActivePreset(id)})
    expect(() => {
      fireEvent.press(preset1);
      fireEvent.press(preset2);
      fireEvent.press(preset3);
    }).not.toThrow();

    mockUseRouter.mockRestore();
  });

  it('triggers onEdit and onDelete handlers passed to PresetBox', () => {
    const { getByTestId, mockUseRouter } = setup();

    // Gọi onEdit / onDelete để cover luôn 2 function inline trong save.tsx
    const editPreset1 = getByTestId('preset-Preset 1-edit');
    const deletePreset1 = getByTestId('preset-Preset 1-delete');

    expect(() => {
      fireEvent.press(editPreset1);
      fireEvent.press(deletePreset1);
    }).not.toThrow();

    mockUseRouter.mockRestore();
  });
});
