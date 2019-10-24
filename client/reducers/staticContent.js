import admin from "./initialStore/admin";
import user from "./initialStore/user";
import common from "./initialStore/common";

import {STATIC_CONTENT_USER, STATIC_CONTENT_ADMIN, STATIC_CONTENT_DEFAULT} from "../constants/actionTypes";

export default (state = common, action = {}) => {
    switch (action.type) {

        case STATIC_CONTENT_USER:
            return user;

        case STATIC_CONTENT_ADMIN:
            return admin;

        case STATIC_CONTENT_DEFAULT:
            return common;

        default:
            return state;

    }
}
