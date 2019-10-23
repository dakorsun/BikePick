import { LOADING_START, LOADING_STOP } from '../constants/actionTypes';

export const loadingStart = data => ({
    type: LOADING_START,
    data,
});

export const loadingStop = data => ({
    type: LOADING_STOP,
    data,
});
