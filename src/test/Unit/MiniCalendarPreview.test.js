import React from 'react';
import { render } from '@testing-library/react';
import MiniCalendarPreview from '../../components/MiniCalendarPreview';

describe('MiniCalendarPreview', () => {
  it('renders the calendar preview', () => {
    const { getByText } = render(<MiniCalendarPreview />);
    expect(getByText('Calendar Preview')).toBeInTheDocument();
  });

  // Add more tests for calendar rendering logic based on state
});
