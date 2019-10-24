/* eslint-disable import/first */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import * as Cookies from 'js-cookie';
import _get from 'lodash/get';
import { I18nextProvider } from "react-i18next";

import App from './App';
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import { userLoggedIn, logout, me } from './actions/auth';
import configureStore from './store';
import i18n from '../i18n/client';

// import styles
import 'react-day-picker/lib/style.css';
import './styles/scss/fonts.scss';
import './styles/scss/index.scss';

const store = configureStore(window.initialState);
const authToken = Cookies.get('access_token');

// try to get user from state
if (_get(store.getState().user, 'user.email', false)) {
    setAuthorizationHeader(store.getState().user.user.token);
} else if (authToken) {
    try {
        const payLoad = decode(authToken);
        const user = {
            token: authToken,
            id: payLoad.id,
            email: payLoad.email,
            role: payLoad.role,
            confirmed: payLoad.confirmed,
        };
        store.dispatch(userLoggedIn(user));
        setAuthorizationHeader(authToken);
        store.dispatch(me());
    } catch (e) {
        store.dispatch(logout());
    }
}

ReactDOM.hydrate(
    <BrowserRouter>
        <Suspense fallback={'Loading...'}>
            <Provider store={store}>
                <I18nextProvider i18n={i18n}
                    initialI18nStore={window.initialI18nStore}
                    initialLanguage={window.initialLanguage}>
                    <App/>
                </I18nextProvider>
            </Provider>
        </Suspense>
    </BrowserRouter>,
    document.getElementById('root'),
);
