import React from 'react';
import { render } from '@testing-library/react-native';
import ThemedText from '@/components/ThemedText';

describe('ThemedText', () => {
  it('renders correctly with children', () => {
    const { getByText } = render(<ThemedText>Test text</ThemedText>);
    expect(getByText('Test text')).toBeTruthy();
  });
});
