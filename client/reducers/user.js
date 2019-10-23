import { createSelector } from 'reselect';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constants/actionTypes";

export default (state = {}, action = {}) => {
    switch (action.type) {
    case USER_LOGGED_IN:
        return { user: action.user };
    case USER_LOGGED_OUT:
        return {};
    default:
        return state;
    }
};

export const loggedInUserSelector = state => state.user.user;

export const usersSelector = createSelector(
    [loggedInUserSelector],
    (loggedInUser) => ({
        loggedInUser,
    })
);
