import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import App from "./App";

const SSR = (i18n, url, context, store) => (
    <I18nextProvider i18n={i18n}>
        <StaticRouter location={url} context={context}>
            <Provider store={store}>
                <App/>
            </Provider>
        </StaticRouter>
    </I18nextProvider>
);

export default SSR;
