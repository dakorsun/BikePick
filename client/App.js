import React from 'react';
import { Route, Switch } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import { useTranslation, getI18n } from "react-i18next";
import moment from "moment";

import routes from './routes';
import AuthRequired from './components/common/AuthRequired';
import Loading from './components/common/Loading';
import ScrollToTopOnRouterChange from './components/utils/ScrollToTopOnRouterChange';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HelmetWrapper from "./HelmetWarpper";

// i18n for moment JS
const language = getI18n().language;
moment.locale(language);

const App = () => {
    const { t } = useTranslation();

    return (
        <div className="container">
            <HelmetWrapper
                title={`${t('common.project_website')} - ${t('meta.title')}`}
                name={`${t('common.project_website')} - ${t('meta.name')}`}
                description={t('meta.description')}
            />
            <ScrollToTopOnRouterChange/>
            <Loading />
            <div>
                <Header/>
                <Switch>
                    {routes.map((route, i) => {
                        if (!_isEmpty(route.auth)) {
                            return (
                                <AuthRequired authorities={route.auth} key={route.key || i} {...route}>
                                    <Route {...route} />
                                </AuthRequired>
                            );
                        }

                        return <Route key={route.key || i} {...route} />;
                    })}
                </Switch>
                <Footer/>
            </div>
        </div>
    );
};

export default (process.env.NODE_ENV !== 'production' && module.hot ? require('react-hot-loader').hot(module)(App) : App);
