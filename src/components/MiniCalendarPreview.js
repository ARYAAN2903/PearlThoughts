'use client';

import { useState, useEffect } from 'react';
import useDatePickerStore from '../store/useDatePickerStore';

/**
 * MiniCalendarPreview Component
 * 
 * This component renders a mini calendar that displays recurring dates based on user-selected patterns.
 * It uses the global state from the useDatePickerStore to fetch configuration details and updates
 * the calendar whenever the relevant state changes.
 */
const MiniCalendarPreview = () => {
  const { recurrence, customValue, startDate, endDate, specificDays, nthDay } = useDatePickerStore();
  const [dates, setDates] = useState([]); // State to hold the generated recurring dates
  const [currentMonth, setCurrentMonth] = useState(new Date()); // State to track the currently displayed month

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Array representing the days of the week

  useEffect(() => {
    /**
     * Calculates recurring dates based on selected recurrence pattern and updates the dates state.
     */
    const calculateRecurringDates = () => {
      if (!startDate) return; // Exit if there is no start date

      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date(start.getFullYear() + 10, 11, 31); // Default end date
      const generatedDates = [];
      let currentDate = new Date(start);

      // Loop through dates until reaching the end date
      while (currentDate <= end) {
        // Daily recurrence
        if (recurrence === 'daily') {
          generatedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + customValue);
        } 
        // Weekly recurrence
        else if (recurrence === 'weekly') {
          const currentDay = daysOfWeek[currentDate.getDay()];
          if (specificDays.includes(currentDay)) {
            generatedDates.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 1);
          // Adjust current date based on custom value
          if (currentDate.getDay() === specificDays.length) {
            currentDate.setDate(currentDate.getDate() + (7 * (customValue - 1)));
          }
        } 
        // Monthly recurrence
        else if (recurrence === 'monthly') {
          const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
          for (let day = 1; day <= lastDayOfMonth; day++) {
            const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            if (specificDays.includes(daysOfWeek[dateToCheck.getDay()])) {
              generatedDates.push(new Date(dateToCheck));
            }
            if (nthDay && dateToCheck.getDate() === parseInt(nthDay)) {
              generatedDates.push(new Date(dateToCheck));
            }
          }
          currentDate.setMonth(currentDate.getMonth() + customValue);
        } 
        // Yearly recurrence
        else if (recurrence === 'yearly') {
          for (let month = 0; month < 12; month++) {
            const lastDayOfMonth = new Date(currentDate.getFullYear(), month + 1, 0).getDate();
            for (let day = 1; day <= lastDayOfMonth; day++) {
              const dateToCheck = new Date(currentDate.getFullYear(), month, day);
              if (specificDays.includes(daysOfWeek[dateToCheck.getDay()])) {
                generatedDates.push(new Date(dateToCheck));
              }
              if (nthDay && dateToCheck.getDate() === parseInt(nthDay)) {
                generatedDates.push(new Date(dateToCheck));
              }
            }
          }
          currentDate.setFullYear(currentDate.getFullYear() + customValue);
        }
      }

      setDates(generatedDates); // Update state with generated dates
    };

    calculateRecurringDates(); // Call the function to calculate recurring dates
  }, [recurrence, customValue, startDate, endDate, specificDays, nthDay]);

  /**
   * Compares two dates to check if they are the same.
   * 
   * @param {Date} date1 - The first date to compare.
   * @param {Date} date2 - The second date to compare.
   * @returns {boolean} - Returns true if both dates are the same, otherwise false.
   */
  const isSameDate = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  /**
   * Renders the calendar for the current month.
   * 
   * @returns {Array} - Returns an array of calendar cells (JSX elements).
   */
  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentMonth);
    firstDayOfMonth.setDate(1); // Set to the first day of the month
    const startDay = firstDayOfMonth.getDay(); // Get the day of the week for the first day
    const daysInMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0).getDate(); // Get the number of days in the month

    const calendarCells = [];

    // Add empty cells for the days before the first of the month
    for (let i = 0; i < startDay; i++) {
      calendarCells.push(<div key={`empty-${i}`} className="day empty-cell"></div>);
    }

    // Add cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(firstDayOfMonth);
      currentDate.setDate(day);
      const isRecurring = dates.some(date => isSameDate(date, currentDate)); // Check if the current date is recurring

      calendarCells.push(
        <div
          key={day}
          className={`p-2 text-center border ${isRecurring ? 'bg-blue-500 text-white' : ''}`} // Apply styles based on recurrence
        >
          {day}
        </div>
      );
    }

    return calendarCells; // Return the generated calendar cells
  };

  /**
   * Handles changing the displayed month.
   * 
   * @param {number} direction - The direction to change the month: -1 for previous, 1 for next.
   */
  const handleMonthChange = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth); // Update the current month state
  };

  /**
   * Handles changing the displayed year.
   * 
   * @param {number} direction - The direction to change the year: -1 for previous, 1 for next.
   */
  const handleYearChange = (direction) => {
    const newYear = new Date(currentMonth);
    newYear.setFullYear(currentMonth.getFullYear() + direction);
    setCurrentMonth(newYear); // Update the current month state
  };

  return (
    <div className="calendar-container p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Calendar Preview</h3>
      <div className="flex justify-between mb-4">
        <div>
          <button onClick={() => handleYearChange(-1)} className="ml-4 text-blue-500 text-2xl font-bold">&lt;&lt;</button>
          <button onClick={() => handleMonthChange(-1)} className="ml-2 text-blue-500 text-2xl font-bold">&lt;</button>
        </div>
        <span className="mx-4">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <div>
          <button onClick={() => handleMonthChange(1)} className="text-blue-500 text-2xl font-bold">&gt;</button>
          <button onClick={() => handleYearChange(1)} className="ml-4 text-blue-500 text-2xl font-bold">&gt;&gt;</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="day font-semibold text-center">{day}</div>
        ))}
        {renderCalendar()} {/* Render the calendar cells */}
      </div>
    </div>
  );
};

export default MiniCalendarPreview;
