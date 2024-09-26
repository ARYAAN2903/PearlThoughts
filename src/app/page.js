'use client';

import CustomizationControls from '@/components/CustomizationControls';
import DateRangePicker from '@/components/DateRangePicker';
import MiniCalendarPreview from '@/components/MiniCalendarPreview';

/**
 * Home Component
 *
 * The main component that renders the Date Picker page.
 * It includes the CustomizationControls, DateRangePicker, and MiniCalendarPreview components,
 * all wrapped in a centered container with a clean layout.
 */
export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      {/* Container wrapping all the elements */}
      <div className="w-full max-w-5xl bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-h-[90vh] overflow-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-center mb-2 text-blue-900">
          Date Picker
        </h1>

        {/* Content Area: Each component is stacked vertically with reduced spacing */}
        <div className="space-y-1">
          <CustomizationControls />
          <DateRangePicker />
          <MiniCalendarPreview />
        </div>
      </div>
    </div>
  );
}
