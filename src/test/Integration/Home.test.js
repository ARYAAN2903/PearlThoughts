import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../../app/page';
import useDatePickerStore from '../../store/useDatePickerStore';

jest.mock('../../store/useDatePickerStore');

describe('Home Component Integration', () => {
  beforeEach(() => {
    useDatePickerStore.mockReturnValue({
      recurrencePattern: 'Daily',
      specificDays: [],
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
    });
  });

  it('renders the home page with all components', () => {
    const { getByText, getByLabelText } = render(<Home />);
    
    // Check if the header is rendered
    expect(getByText('Date Picker')).toBeInTheDocument();

    // Check if CustomizationControls is rendered
    expect(getByText('Recurrence Pattern')).toBeInTheDocument();

    // Check if DateRangePicker is rendered
    expect(getByLabelText('Start Date')).toBeInTheDocument();
    expect(getByLabelText('End Date')).toBeInTheDocument();

    // Check if MiniCalendarPreview is rendered
    expect(getByText('Calendar Preview')).toBeInTheDocument();
  });
});
