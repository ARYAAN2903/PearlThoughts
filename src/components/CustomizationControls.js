'use client';

import { useState, useEffect } from 'react';
import useDatePickerStore from '../store/useDatePickerStore';

/**
 * CustomizationControls
 *
 * This component provides user interface controls to customize the recurrence
 * pattern, interval, specific days, and nth day options for the date picker.
 * It uses the Zustand store to manage the date picker state.
 */
const CustomizationControls = () => {
  // Zustand store actions for updating recurrence patterns and custom values
  const { setRecurrencePattern, setCustomValue, setSpecificDays, setNthDay } = useDatePickerStore();

  // Local state for managing user inputs
  const [customInterval, setCustomInterval] = useState(1);        // Interval for custom recurrence
  const [selectedDays, setSelectedDays] = useState([]);           // Days selected for weekly recurrence
  const [nthDay, setNthDayValue] = useState('');                  // Nth day for monthly recurrence
  const [selectedRecurrence, setSelectedRecurrence] = useState(null); // Tracks the currently selected recurrence pattern

  /**
   * handleRecurrenceChange
   *
   * Updates the selected recurrence pattern both locally and in the Zustand store.
   *
   * @param {string} option - The selected recurrence pattern (daily, weekly, etc.).
   */
  const handleRecurrenceChange = (option) => {
    setRecurrencePattern(option);
    setSelectedRecurrence(option);  // Update local state to highlight the selected option
  };

  /**
   * handleIntervalChange
   *
   * Updates the custom interval value (for daily, weekly, etc.) both locally and in the Zustand store.
   *
   * @param {object} e - The event object from the input change.
   */
  const handleIntervalChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCustomInterval(value);
    setCustomValue(value);  // Update the value in Zustand store
  };

  /**
   * handleDaySelection
   *
   * Toggles the selection of a specific day for weekly recurrence. Updates both the local state and Zustand store.
   *
   * @param {string} day - The day (e.g., 'Mon', 'Tue') selected by the user.
   */
  const handleDaySelection = (day) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);  // Unselect day if already selected
      } else {
        return [...prev, day];  // Add day to selectedDays array
      }
    });
  };

  /**
   * handleNthDayChange
   *
   * Updates the nth day input both locally and in the Zustand store for monthly recurrence.
   *
   * @param {object} e - The event object from the input change.
   */
  const handleNthDayChange = (e) => {
    const value = e.target.value;
    setNthDayValue(value);
    setNthDay(value);  // Update the value in Zustand store
  };

  /**
   * useEffect - Updates the specificDays state in Zustand whenever selectedDays changes.
   */
  useEffect(() => {
    setSpecificDays(selectedDays);  // Sync local state with Zustand store
  }, [selectedDays, setSpecificDays]);

  return (
    <div className="bg-white p-2 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Recurrence Options</h3>

      {/* Recurrence Pattern Selection */}
      <div className="mb-2">
        <label className="block text-gray-700 font-medium mb-1">Choose Recurrence Pattern:</label>
        <div className="grid grid-cols-2 gap-2">
          {['daily', 'weekly', 'monthly', 'yearly'].map((recurrence) => (
            <button
              key={recurrence}
              onClick={() => handleRecurrenceChange(recurrence)}
              className={`py-1 px-2 rounded-lg transition text-sm ${
                selectedRecurrence === recurrence ? 'bg-blue-900 text-white' : 'bg-blue-500 text-white hover:bg-blue-900'
              }`}
            >
              {recurrence.charAt(0).toUpperCase() + recurrence.slice(1)} {/* Capitalize first letter */}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Interval Input */}
      <div className="flex mb-2 space-x-2">
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-1">Every X Period:</label>
          <input
            type="number"
            value={customInterval}
            onChange={handleIntervalChange}
            className="w-full p-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>

        {/* Nth Day Input */}
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-1">Select Nth Day:</label>
          <input
            type="number"
            value={nthDay}
            onChange={handleNthDayChange}
            className="w-full p-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="31"
          />
        </div>
      </div>

      {/* Specific Days Selection for Weekly Recurrence */}
      <div className="mb-2">
        <label className="block text-gray-700 font-medium mb-1">Select Specific Days:</label>
        <div className="flex space-x-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <button
              key={day}
              onClick={() => handleDaySelection(day)}
              className={`py-1 px-2 rounded-lg text-sm ${
                selectedDays.includes(day) ? 'bg-blue-900 text-white' : 'bg-blue-500 text-white hover:bg-blue-900'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizationControls;
