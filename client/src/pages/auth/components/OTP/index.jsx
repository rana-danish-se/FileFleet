import React from 'react';
import { Button } from '@/components/ui/button';

const OTP = () => {
  return (
    <div className="p-8 w-full rounded-md flex flex-col items-center justify-center bg-neutral-800 text-white px-4">
      <div className="text-center mb-8">
        <h4 className="text-2xl font-semibold mb-2 text-white">OTP Verification</h4>
        <p className="text-gray-400">Please check your email and enter the OTP below.</p>
      </div>

      <div className="flex gap-6">
        {/* First group of 3 */}
        <div className="flex gap-3">
          <input
            type="number"
            maxLength={1}
            className="w-12 h-12 text-center text-lg bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            maxLength={1}
            className="w-12 h-12 text-center text-lg bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            maxLength={1}
            className="w-12 h-12 text-center text-lg bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Second group of 3 */}
        <div className="flex gap-3">
          <input
            type="number"
            maxLength={1}
            className="w-12 h-12 text-center text-lg bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            maxLength={1}
            className="w-12 h-12 text-center text-lg bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            maxLength={1}
            className="w-12 h-12 text-center text-lg bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <Button className="mt-8 w-full max-w-xs cursor-pointer">Verify OTP</Button>
    </div>
  );
};

export default OTP;
