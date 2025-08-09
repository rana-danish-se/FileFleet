import React, { useContext, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import { toast } from 'sonner';
import { apiClient } from '@/utils/apiClient';
import { SET_NEW_PASSWORD_ROUTE } from '@/utils/constants';
import loader from "@/assets/assets/icons/loader-brand.svg";  

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userId, navigate } = useContext(AppContext);
  const [loading, setloading] = useState(false)

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      setloading(true);
      const res = await apiClient.post(SET_NEW_PASSWORD_ROUTE, {
        userId,
        password,
      });
      if (res.status === 200) {
        toast.success('Password reset successfully!');
        toast.success('You can now login with your new password.');
        setloading(false);
        navigate('/login');
      }
    } catch (error) {
      const { message } = error.response.data;
      toast.error(
        message || 'An error occurred while resetting your password.'
      );
      setloading(false);
    }
  };

  return (
    <div className="bg-gray-950 w-screen h-screen flex flex-col gap-5 text-white items-center justify-center">
      <h3 className="text-3xl font-bold">Reset Your Password</h3>

      <div className="flex flex-col justify-center items-center gap-5 w-full">
        {/* New Password */}
        <div className="relative w-full sm:w-[350px]">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-none outline-none text-white w-full rounded-md bg-gray-800 p-4 pr-12"
            placeholder="Enter new password"
          />
          <span
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative w-full sm:w-[350px]">
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-none outline-none text-white w-full rounded-md bg-gray-800 p-4 pr-12"
            placeholder="Confirm new password"
          />
          <span
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
      </div>

      <button
        onClick={handleResetPassword}
        disabled={loading}
        className="p-4 rounded-xl bg-gray-900 w-full flex gap-4 items-center justify-center sm:w-[350px] cursor-pointer"
      >
        {loading && <img src={loader} className='w-6 h-6 mr-2' alt="Loading" />}
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
