import { create } from 'zustand';

/**
 * useDatePickerStore
 *
 * This is a Zustand store that manages the state for a date picker component.
 * It includes options for recurrence patterns (daily, weekly, monthly, yearly),
 * custom values for intervals, specific days, and start/end dates.
 */
const useDatePickerStore = create((set) => ({
  recurrence: 'daily',       // The default recurrence pattern (e.g., daily, weekly, etc.)
  customValue: 1,            // The custom interval value (e.g., every 1 day, 2 weeks, etc.)
  startDate: null,           // Start date for the recurrence
  endDate: null,             // End date for the recurrence (optional)
  specificDays: [],          // Array to hold selected days for weekly recurrence
  nthDay: null,              // Nth day for monthly recurrence (e.g., 3rd day of the month)

  /**
   * setRecurrencePattern
   * Updates the recurrence pattern (daily, weekly, monthly, yearly, etc.).
   *
   * @param {string} pattern - The selected recurrence pattern.
   */
  setRecurrencePattern: (pattern) => set({ recurrence: pattern }),

  /**
   * setCustomValue
   * Sets the custom interval value (e.g., every 2 days, every 3 weeks).
   *
   * @param {number} value - The custom value for the recurrence interval.
   */
  setCustomValue: (value) => set({ customValue: value }),

  /**
   * setStartDate
   * Sets the start date for the recurrence.
   *
   * @param {Date} date - The start date.
   */
  setStartDate: (date) => set({ startDate: date }),

  /**
   * setEndDate
   * Sets the optional end date for the recurrence.
   *
   * @param {Date} date - The end date.
   */
  setEndDate: (date) => set({ endDate: date }),

  /**
   * setSpecificDays
   * Sets the specific days for weekly recurrence.
   *
   * @param {Array<string>} days - An array of day names (e.g., ['Mon', 'Wed', 'Fri']).
   */
  setSpecificDays: (days) => set({ specificDays: days }),

  /**
   * setNthDay
   * Sets the nth day for monthly recurrence (e.g., the 3rd day of the month).
   *
   * @param {number} day - The nth day of the month.
   */
  setNthDay: (day) => set({ nthDay: day }),
}));

export default useDatePickerStore;
