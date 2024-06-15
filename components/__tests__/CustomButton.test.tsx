import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../CustomButton';

describe('CustomButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CustomButton title="Click me" onPress={() => {}} />);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<CustomButton title="Click me" onPress={onPressMock} />);
    fireEvent.press(getByText('Click me'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
