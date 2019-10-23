import * as Cookies from 'js-cookie';

import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants/actionTypes';
import api from '../api';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user,
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT,
});

export const login = credentials => async (dispatch) => {
    const user = await api.user.login(credentials);
    Cookies.set('access_token', user.token);
    setAuthorizationHeader(user.token);
    return dispatch(userLoggedIn(user));
};

export const signup = userData => async (dispatch) => {
    const user = await api.user.signup(userData);
    Cookies.set('access_token', user.token);
    setAuthorizationHeader(user.token);
    return dispatch(userLoggedIn(user));
};

export const logout = () => dispatch => {
    Cookies.remove('access_token');
    setAuthorizationHeader();
    dispatch(userLoggedOut());
};

export const confirm = token => dispatch =>
    api.user.confirm(token).then(user => {
        Cookies.set('access_token', user.token);
        dispatch(userLoggedIn(user));
    });

export const resetPassword = data => () => api.user.resetPassword(data);
export const validateToken = token => () => api.user.validateToken(token);
export const resetPasswordRequest = ({ email }) => () => api.user.resetPasswordRequest(email);

export const me = () => dispatch => api.user.me().then(user => dispatch(userLoggedIn(user)));

export const updateUser = (updateFields) => dispatch =>
    api.user.update(updateFields).then(user => dispatch(userLoggedIn(user)));
