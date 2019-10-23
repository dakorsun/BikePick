import { createSelector } from 'reselect';

import {
    LOADING_START,
    LOADING_STOP,
} from '../constants/actionTypes';

const INITIAL_STATE = {
    loading: false,
};

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
    case LOADING_START:
        return { loading: true };
    case LOADING_STOP:
        return { loading: false };
    default:
        return state;
    }
};

const isLoadingSelector = state => state.loading;

export const loadingStateSelector = createSelector(
    [isLoadingSelector],
    (isLoading) => ({
        isLoading: isLoading.loading,
    })
);
