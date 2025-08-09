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
export const GET_DOCUMENTS_ROUTE=`${FILES_ROUTE}/documents`;
export const GET_IMAGES_ROUTE=`${FILES_ROUTE}/images`;
export const GET_MEDIA_ROUTE=`${FILES_ROUTE}/media`;
export const GET_OTHERS_ROUTE=`${FILES_ROUTE}/others`;
export const RENAME_FILE_ROUTE=`${FILES_ROUTE}/rename-file`
export const DELETE_FILE_ROUTE=`${FILES_ROUTE}/delete-file`




