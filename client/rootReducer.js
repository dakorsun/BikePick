import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

import user from "./reducers/user";
import loading from "./reducers/loading";

export default combineReducers({
    user,
    loading,
    form: formReducer,
});
