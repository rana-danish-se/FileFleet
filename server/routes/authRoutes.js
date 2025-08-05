import express from 'express';
import { getUserInfoController, loginController, resetPasswordController, setNewPasswordController, signupController, verifyEmailController, verifyOtpController, verifyResetPasswordOtpController } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const authRouter = express.Router();

authRouter.post('/signup', signupController);
authRouter.post('/verify-otp', verifyOtpController);
authRouter.get('/get-user-info',verifyToken,getUserInfoController);
authRouter.post('/verify-email',verifyEmailController);
authRouter.post('/login',loginController)
authRouter.post('/reset-password',resetPasswordController);
authRouter.post('/verify-password-otp', verifyResetPasswordOtpController);
authRouter.post("/set-new-password",setNewPasswordController);

export default authRouter;
