import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomizationControls from '../../components/CustomizationControls';
import useDatePickerStore from '../../store/useDatePickerStore';

jest.mock('../../store/useDatePickerStore');

describe('CustomizationControls', () => {
  beforeEach(() => {
    useDatePickerStore.mockReturnValue({
      recurrencePattern: 'Daily',
      specificDays: [],
      setRecurrencePattern: jest.fn(),
      setSpecificDays: jest.fn(),
    });
  });

  it('renders without crashing', () => {
    const { getByText } = render(<CustomizationControls />);
    expect(getByText('Recurrence Pattern')).toBeInTheDocument();
  });

  it('handles pattern change', () => {
    const setRecurrencePattern = jest.fn();
    useDatePickerStore.mockReturnValue({
      recurrencePattern: 'Daily',
      setRecurrencePattern,
    });

    const { getByLabelText } = render(<CustomizationControls />);
    fireEvent.change(getByLabelText('Recurrence Pattern'), {
      target: { value: 'Weekly' },
    });

    expect(setRecurrencePattern).toHaveBeenCalledWith('Weekly');
  });
});
