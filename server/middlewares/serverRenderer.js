import ReactDOMServer from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Helmet } from 'react-helmet';

import configureStore from '../../client/store';
import routes from '../../client/routes';
import appConfig from '../../config/appConfig';
import { userLoggedIn } from '../../client/actions/auth';
import { findUserById } from '../services/UserService';
import SSR from "../../client/ssr";

import common from '../../client/reducers/initialStore/common'
import admin from '../../client/reducers/initialStore/admin'
import user from '../../client/reducers/initialStore/user'

const renderView = (req, context, htmlData, url, store) => {
    const html = ReactDOMServer.renderToString(SSR(req.i18n, url, context, store));
    const helmet = Helmet.renderStatic();

    const i18nStore = {};
    req.i18n.languages.forEach(l => {
        i18nStore[l] = req.i18n.services.resourceStore.data[l];
    });
    const i18nLng = req.i18n.language;

    return (
        htmlData
            .replace('SERVER_RENDERED_TITLE', helmet.title.toString())
            .replace('SERVER_RENDERED_META', helmet.meta.toString())
            .replace('SERVER_RENDERED_I18N_STORE', JSON.stringify(i18nStore))
            .replace('SERVER_RENDERED_I18N_LNG', i18nLng)
            .replace('SERVER_RENDERED_HTML', html)
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/recipes/ServerRendering.html#security-considerations
            .replace('SERVER_RENDERED_STATE', JSON.stringify(store.getState()).replace(/</g, '\\u003c'))
    );
};

const matchRoutes = (path, store) => {
    const promises = [];

    routes.some(route => {
        const match = matchPath(path, route);
        if (match && route.loadData) {
            route.loadData.map(action => store.dispatch(action(match))).forEach(promise => promises.push(promise));
        }
        return match;
    });

    return Promise.all(promises);
};

const checkToken = async (req, store) => {
    const token = req.cookies.access_token;

    if (token) {
        return new Promise(resolve => {
            jwt.verify(token, appConfig.JWT_SECRET, async (err, decoded) => {
                if (!err) {
                    const user = await findUserById(decoded.id);
                    if (user) {
                        store.dispatch(userLoggedIn(user.toFullJSON()));
                    }
                    resolve();
                }
            });
        });
    }

    return null;
};

export default htmlData => async (req, res) => {
    const context = {};
    // optionally load static content (load a page even if there is some issues with static content)
    // const staticContent = {};
    // TODO contentful
    // try {
    //     staticContent = await loadStaticContent();
    // } catch (e) {
    //     console.error('Failed to load static content', e);
    // }
    try {
        const store = configureStore({staticContent: {admin, user, common}});
        // try to preload all the needed data, but still load page if some data can't be loaded on SSR phase
        try {
            await checkToken(req, store);
            await matchRoutes(req.path, store);
        } catch (e) {
            console.warn(e);
        }
        res.send(renderView(req, context, htmlData, req.url, store));
    } catch (e) {
        console.warn(e);
        // load "clean" page, rely on client-side rendering
        res.send(htmlData.replace('SERVER_RENDERED_HTML', '').replace('SERVER_RENDERED_STATE', JSON.stringify({})));
    }
};
