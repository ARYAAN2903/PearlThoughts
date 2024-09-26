'use client';

import { useState } from 'react';
import useDatePickerStore from '../store/useDatePickerStore';

/**
 * DateRangePicker
 *
 * This component provides input fields to allow the user to select a start and end date.
 * The selected dates are stored in both the local state and the Zustand store for global access.
 */
const DateRangePicker = () => {
  // Local state to manage the start and end dates in the component
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Zustand store actions to sync start and end dates with the global store
  const { setStartDate: setStoreStartDate, setEndDate: setStoreEndDate } = useDatePickerStore();

  /**
   * handleStartDateChange
   *
   * Updates the start date in both local state and the Zustand store when the user selects a new start date.
   *
   * @param {object} e - Event object from the date input field.
   */
  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);           // Update local start date
    setStoreStartDate(date);      // Update global start date in Zustand store
  };

  /**
   * handleEndDateChange
   *
   * Updates the end date in both local state and the Zustand store when the user selects a new end date.
   *
   * @param {object} e - Event object from the date input field.
   */
  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setEndDate(date);             // Update local end date
    setStoreEndDate(date);        // Update global end date in Zustand store
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-5xl"> {/* Wrapper with adjusted width */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Date Range</h3>

      {/* Flexbox layout for aligning start and end date inputs horizontally */}
      <div className="flex space-x-4 mb-4"> 
        {/* Start Date Input */}
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="YYYY-MM-DD"  // Placeholder for date format
          />
        </div>

        {/* End Date Input */}
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="YYYY-MM-DD"  // Placeholder for date format
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
