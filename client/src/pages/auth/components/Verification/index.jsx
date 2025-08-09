import { Button } from '@/components/ui/button';
import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import Email from '@/assets/Email.png';
import { apiClient } from '@/utils/apiClient';
import {
  RESET_PASSWORD_OTP_ROUTE,
  VERIFY_EMAIL_ROUTE,
} from '@/utils/constants';

const VerifyEmail = () => {
  const { userInfo, verifyOTP, state, userId, navigate } =
    useContext(AppContext);
  const [loading, setloading] = useState(false)
  // Refs for each of the six inputs
  const inputs = Array.from({ length: 6 }, () => useRef(null));

  const handleVerify = async () => {
    setloading(true);
    const values = inputs.map((ref) => ref.current?.value.trim());

    const hasEmpty = values.some((val) => val === '' || val === undefined);
    const hasNonDigit = values.some((val) => !/^\d$/.test(val));

    if (hasEmpty || hasNonDigit) {
      toast.error('Please enter all 6 valid digits of the OTP.');
      return;
    }

    const otpValue = values.join('');
    if (state !== 'Forget Password') {
      verifyOTP(otpValue, userInfo._id);
      setloading(false);
    } else {
      try {

        const res = await apiClient.post(RESET_PASSWORD_OTP_ROUTE, {
          otp: otpValue,
          userId,
        });
        if (res.status === 200) {
          toast.success(res.data.message);
          setloading(false);
          navigate('/reset-password');
        }else{
          toast.error(res.data.message);
          setloading(false);
        }
      } catch (error) {
        const message =
        error?.response?.data?.message || 'Something went wrong.';
        toast.error(message);
        setloading(false);
        toast.error('Please sign in again.');
      }
    }
  };
  useEffect(() => {
    const sendOtp = async () => {
      try {
        const res = await apiClient.post(VERIFY_EMAIL_ROUTE, {
          email: userInfo.email,
        });
        toast(res.data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (state !== 'Forget Password') {
      sendOtp();
    }
  }, []);
  // Optional: Auto-focus next input on typing
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && index < 5) {
      inputs[index + 1].current.focus();
    }
  };
  return (
    <div className="p-8 w-screen h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
      <div className="text-center flex flex-col items-center justify-center mb-8">
        <h4 className="text-4xl font-semibold mb-2 text-white">
          Check your Email
        </h4>
        <img src={Email} className="w-100 h-60" alt="" />
        <p className="text-gray-400 w-full sm:w-120">
          We have sent an OTP to{' '}
          <strong className="text-white">
            {userInfo ? userInfo.email : 'your email'}
          </strong>{' '}
          for verification. Please check your email and enter OTP below
        </p>
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

      <Button
        onClick={handleVerify}
        className="mt-8 w-full max-w-xs bg-gray-900 cursor-pointer"
      >
        {
          loading ? 'Verifying...' : 'Verify OTP'
        }
      </Button>
    </div>
  );
};

export default VerifyEmail;
