import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DateRangePicker from '../../components/DateRangePicker';
import useDatePickerStore from '../../store/useDatePickerStore';

jest.mock('../../store/useDatePickerStore');

describe('DateRangePicker', () => {
  beforeEach(() => {
    useDatePickerStore.mockReturnValue({
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
    });
  });

  it('renders start and end date inputs', () => {
    const { getByLabelText } = render(<DateRangePicker />);
    expect(getByLabelText('Start Date')).toBeInTheDocument();
    expect(getByLabelText('End Date')).toBeInTheDocument();
  });

  it('updates start date in the store', () => {
    const setStartDate = jest.fn();
    useDatePickerStore.mockReturnValue({ setStartDate });

    const { getByLabelText } = render(<DateRangePicker />);
    fireEvent.change(getByLabelText('Start Date'), {
      target: { value: '2023-10-01' },
    });

    expect(setStartDate).toHaveBeenCalledWith('2023-10-01');
  });

  it('updates end date in the store', () => {
    const setEndDate = jest.fn();
    useDatePickerStore.mockReturnValue({ setEndDate });

    const { getByLabelText } = render(<DateRangePicker />);
    fireEvent.change(getByLabelText('End Date'), {
      target: { value: '2023-10-31' },
    });

    expect(setEndDate).toHaveBeenCalledWith('2023-10-31');
  });
});
