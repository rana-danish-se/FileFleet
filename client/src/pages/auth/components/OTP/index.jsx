import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const OTP = ({ setOtp, verifyOTP }) => {
  // Refs for each of the six inputs
  const inputs = Array.from({ length: 6 }, () => useRef(null));

const handleVerify = () => {
  const values = inputs.map(ref => ref.current?.value.trim());

  const hasEmpty = values.some(val => val === '' || val === undefined);
  const hasNonDigit = values.some(val => !/^\d$/.test(val));

  if (hasEmpty || hasNonDigit) {
    toast.error('Please enter all 6 valid digits of the OTP.');
    return;
  }

  const otpValue = values.join('');
  setOtp(otpValue);
  verifyOTP();
};


  // Optional: Auto-focus next input on typing
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && index < 5) {
      inputs[index + 1].current.focus();
    }
  };

  return (
    <div className="p-8 w-full rounded-md flex flex-col items-center justify-center bg-neutral-800 text-white px-4">
      <div className="text-center mb-8">
        <h4 className="text-2xl font-semibold mb-2 text-white">OTP Verification</h4>
        <p className="text-gray-400">Please check your email and enter the OTP below.</p>
      </div>

      <div className="flex gap-6">
        {/* First group of 3 */}
        <div className="flex gap-3">
          {inputs.slice(0, 3).map((ref, index) => (
            <input
              key={index}
              ref={ref}
              type="text"
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-center text-lg bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
        </div>

        {/* Second group of 3 */}
        <div className="flex gap-3">
          {inputs.slice(3, 6).map((ref, index) => (
            <input
              key={index + 3}
              ref={ref}
              type="text"
              maxLength={1}
              onChange={(e) => handleChange(e, index + 3)}
              className="w-12 h-12 text-center text-lg bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
        </div>
      </div>

      <Button onClick={handleVerify} className="mt-8 w-full max-w-xs cursor-pointer">
        Verify OTP
      </Button>
    </div>
  );
};

export default OTP;
