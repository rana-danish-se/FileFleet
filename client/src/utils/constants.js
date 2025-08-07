export const HOST = import.meta.env.VITE_SERVER_URL;


const AUTH_ROUTE='/api/user';
const FILES_ROUTE='/api/files';

export const SIGN_UP_ROUTE=`${AUTH_ROUTE}/signup`;
export const SIGN_IN_ROUTE=`${AUTH_ROUTE}/login`;
export const VERIFY_OTP_ROUTE=`${AUTH_ROUTE}/verify-otp`
export const GET_USER_INFO=`${AUTH_ROUTE}/get-user-info`
export const VERIFY_EMAIL_ROUTE=`${AUTH_ROUTE}/verify-email`
export const RESET_PASSWORD_ROUTE=`${AUTH_ROUTE}/reset-password`;
export const RESET_PASSWORD_OTP_ROUTE=`${AUTH_ROUTE}/verify-password-otp`;
export const SET_NEW_PASSWORD_ROUTE=`${AUTH_ROUTE}/set-new-password`;

export const UPLOAD_FILES_ROUTE=`${FILES_ROUTE}/upload`;
export const GET_DASHBOARD_ROUTE=`${FILES_ROUTE}/get-dashboard`;




