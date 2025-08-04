import express from 'express';
import { getUserInfoController, loginController, signupController, verifyEmailController, verifyOtpController } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const authRouter = express.Router();

authRouter.post('/signup', signupController);
authRouter.post('/verify-otp', verifyOtpController);
authRouter.get('/get-user-info',verifyToken,getUserInfoController);
authRouter.post('/verify-email',verifyEmailController);
authRouter.post('/login',loginController)

export default authRouter;
