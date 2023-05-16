export const AUTH_USER = "AUTH_USER";
export const AUTH_ERROR = 'AUTH_ERROR';
export const GET_USER = 'GET_USER';
export const USER_TOKENS = 'USER_TOKENS';
export const UPDATE_USER = 'UPDATE_USER';
export const USER_LOGOUT = 'USER_LOGOUT';

export const authAction = (payload) => ({ type: AUTH_USER, payload });
export const isErrorAction = (payload) => ({type: AUTH_ERROR, payload});
export const getUserAction = (payload) => ({type: GET_USER, payload});
export const getTokensAction = (payload) => ({type: USER_TOKENS, payload});
export const logoutAction = (payload) => ({type: USER_LOGOUT, payload});