import {STATIC_CONTENT_ADMIN, STATIC_CONTENT_USER, STATIC_CONTENT_DEFAULT} from '../constants/actionTypes'

export const setAdminStaticContent = () => async dispatch => {
    return dispatch({type: STATIC_CONTENT_ADMIN})
};

export const setUserStaticContent = () => async dispatch => {
    return dispatch({type: STATIC_CONTENT_USER})
};

export const setDefaultStaticContent = () => async dispatch => {
    return dispatch({type: STATIC_CONTENT_DEFAULT})
}