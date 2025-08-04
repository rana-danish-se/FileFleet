import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { sendOTPEmail } from '../utils/emailService.js';
import { generateOTP } from '../utils/otpGenerator.js';
import jwt from 'jsonwebtoken';

export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (!existingUser.isVerified) {
        return res
          .status(401)
          .json({
            message: 'User is registered but not verified.',
            user: existingUser,
          });
      }
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const plainOtp = generateOTP(); // e.g. 6-digit number
    const hashedOtp = await bcrypt.hash(plainOtp, 10);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      otpExpiresAt,
    });

    // Try sending OTP email
    try {
      await sendOTPEmail({
        to: email,
        subject: 'Verify your FileFleet account',
        text: `Your verification code is: ${plainOtp}`,
        html: `<p>Your verification code is: <strong>${plainOtp}</strong></p>`,
      });
    } catch (emailError) {
      console.error('❌ OTP email failed:', emailError);

      // Optional: delete user if email fails
      await User.findByIdAndDelete(newUser._id);

      return res.status(500).json({
        message: 'Failed to send verification email. Please try again.',
      });
    }

    // Respond to client
    res.status(201).json({
      message: 'User registered. Please verify the OTP sent to your email.',
      userId: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ message: 'User ID and OTP are required.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified.' });
    }

    if (!user.otp || !user.otpExpiresAt) {
      return res
        .status(400)
        .json({ message: 'No OTP found. Please request a new one.' });
    }

    if (user.otpExpiresAt < new Date()) {
      return res
        .status(400)
        .json({ message: 'OTP has expired. Please request a new one.' });
    }

    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // you can choose expiry
    );

    // ✅ Respond with token and user info
    return res.status(200).json({
      message: 'Email verified successfully.',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('OTP verification failed:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getUserInfoController = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided.' });
    }

    const user = await User.findById(userId).select(
      '-password -otp -otpExpiresAt'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user info:', error);
    return res
      .status(500)
      .json({ message: 'Server error while fetching user information.' });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email is already verified.' });
    }

    // Generate OTP
    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    await sendOTPEmail({
      to: email,
      subject: 'Your OTP Code - FileFleet',
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p><p>This code is valid for 15 minutes.</p>`,
    });

    return res.status(200).json({ message: 'OTP sent successfully to email.' });
  } catch (error) {
    console.error('Error verifying email:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Account doesn’t exist.' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: 'Please verify your email first.' ,user });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect email or password.' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Exclude password and otp fields before sending user data
    const { password: pwd, otp, otpExpiresAt, ...userData } = user.toObject();

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: userData,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
