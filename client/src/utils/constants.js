export const HOST = import.meta.env.VITE_SERVER_URL;


const AUTH_ROUTE='/api/user';

export const SIGN_UP_ROUTE=`${AUTH_ROUTE}/signup`;
export const SIGN_IN_ROUTE=`${AUTH_ROUTE}/login`;
export const VERIFY_OTP_ROUTE=`${AUTH_ROUTE}/verify-otp`
export const GET_USER_INFO=`${AUTH_ROUTE}/get-user-info`
export const VERIFY_EMAIL_ROUTE=`${AUTH_ROUTE}/verify-email`

