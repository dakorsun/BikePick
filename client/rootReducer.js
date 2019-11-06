import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

import user from "./reducers/user";
import loading from "./reducers/loading";
import staticContent from "./reducers/staticContent";
import test from "./reducers/test";


export default combineReducers({
    test,

    user,
    loading,
    form: formReducer,
    staticContent
});
