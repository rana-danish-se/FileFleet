import { useState } from 'react';
import SideComponent from './components/sidecomponent';
import { Eye, EyeOff } from 'lucide-react';
import OTP from './components/OTP';
import { Button } from '@/components/ui/button';

const Auth = () => {
  const [state, setState] = useState('Login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (state === 'Sign Up') {
      if (!validateSignup()) return;
      // sign up logic
    } else {
      // login logic
    }
  };

  const validateSignup = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    return true;
  };

  const toggleAuthState = () => {
    setState((prev) => (prev === 'Login' ? 'Sign Up' : 'Login'));
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex w-[100vw] h-[100vh] bg-slate-950">
      <div className="hidden lg:flex w-[35%]">
        <SideComponent />
      </div>

      <div className="px-10 flex gap-10 w-full md:w-[450px] flex-1 h-full flex-col text-white justify-center items-center">
        <h3 className="text-4xl font-semibold bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
          {state}
        </h3>
        {state !== 'Forget Password' ? (
          <form
            onSubmit={handleFormSubmit}
            className="flex w-full flex-col items-center justify-center gap-5"
          >
            {state === 'Sign Up' && (
              <div className="bg-gray-700 w-full md:w-[450px] p-4 relative">
                <span className="absolute text-sm text-zinc-400 top-2 left-3">
                  Username
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-none pt-2 w-full outline-none bg-transparent"
                />
              </div>
            )}
            <div className="bg-gray-700 p-4 w-full md:w-[450px] relative">
              <span className="absolute text-sm text-zinc-400 top-2 left-3">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-none pt-2 w-full outline-none bg-transparent"
              />
            </div>
            {/* Password field */}
            <div className="bg-gray-700 p-4 w-full md:w-[450px] relative">
              <span className="absolute text-sm text-zinc-400 top-2 left-3">
                Password
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-none pt-2 w-full outline-none bg-transparent pr-10"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-zinc-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {/* Confirm Password (Sign Up only) */}
            {state === 'Sign Up' && (
              <div className="bg-gray-700 p-4 w-full md:w-[450px] relative">
                <span className="absolute text-sm text-zinc-400 top-2 left-3">
                  Confirm Password
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-none pt-2 w-full outline-none bg-transparent pr-10"
                />
                <span
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-zinc-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
              </div>
            )}
            {state === 'Login' && (
              <div className="text-blue-400 w-full md:w-[450px] text-right">
                <span onClick={()=>setState("Forget Password")} className="cursor-pointer hover:text-white transition-all duration-300">
                  Forgot password?
                </span>
              </div>
            )}
            <button
              type="submit"
              className="bg-gray-800 w-full md:w-[450px] p-4 rounded-full hover:bg-gray-700 transition-all"
            >
              {state}
            </button>
            <div className="w-full mt-3 text-center text-neutral-600 text-lg md:w-[450px]">
              {state === 'Login' ? (
                <span>
                  Don't have an account?
                  <span
                    className="hover:text-neutral-300 cursor-pointer ml-1"
                    onClick={toggleAuthState}
                  >
                    Sign up
                  </span>
                </span>
              ) : (
                <span>
                  Already have an account?
                  <span
                    className="hover:text-neutral-300 cursor-pointer ml-1"
                    onClick={toggleAuthState}
                  >
                    Login
                  </span>
                </span>
              )}
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleFormSubmit}
            className="flex w-full flex-col items-center justify-center gap-5"
          >
            <div className="bg-gray-700 p-4 w-full md:w-[450px] relative">
              <span className="absolute text-sm text-zinc-400 top-2 left-3">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-none pt-2 w-full outline-none bg-transparent"
              />
            </div>

            <Button
              type="submit"
              className="bg-gray-800 w-full cursor-pointer md:w-[450px] p-4 rounded-full hover:bg-gray-700 transition-all"
            >
              Reset Password
            </Button>
            <Button
              onClick={()=>setState("Login")}
              className="bg-gray-800 w-full cursor-pointer md:w-[450px] p-4 rounded-full hover:bg-gray-700 transition-all"
            >
             Back to Login
            </Button>
          </form>
        )}
      </div>

      {showOTP && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-60 flex justify-center items-center z-50">
          <div className="rounded-xl shadow-2xl p-6 w-full max-w-md">
            <OTP />
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
