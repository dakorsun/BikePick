import 'express-promise-router';
import chalk from 'chalk';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import Layer from 'express/lib/router/layer';
import serveStatic from 'serve-static';
import i18nextMiddleware from 'i18next-express-middleware';

import i18n from '../../i18n/ssr';
import appConfig from '../../config/appConfig';
import routes from '../routes';
import serverRenderer from '../middlewares/serverRenderer';

/**
 * Wraps express handlers in order to be able to use async routes and to catch exceptions by the express error handler
 */
const wrap = fn => (...args) => fn(...args).catch(args[2]);
const handleRequest = Layer.prototype.handle_request;
// eslint-disable-next-line no-unused-vars,func-names
Layer.prototype.handle_request = function (...args) {
    const skipList = ['i18nextMiddleware', 'expressRedisCache_Middleware'];
    if (!this.isWrapped && this.method && !skipList.includes(this.name)) {
        this.handle = wrap(this.handle); // this is the place where we wrap handlers
        this.isWrapped = true;
    }
    return handleRequest.apply(this, args);
};

export default (app) => {

    app.use('/locales', serveStatic('./i18n/locales', { index: false }));

    const i18nMiddleware = i18nextMiddleware.handle(i18n);
    if (appConfig.NODE_ENV !== 'production') {
        console.log(chalk.yellow('App is running in development mode'));

        const webpackConfig = require('../../config/webpack.config.dev').default;
        const webpackCompiler = require('webpack')(webpackConfig);

        app.use(require('webpack-dev-middleware')(webpackCompiler, {
            publicPath: webpackConfig.output.publicPath,
            quiet: false,
            noInfo: false,
            stats: {
                all: false,
            },
        }));
        app.use(require('webpack-hot-middleware')(webpackCompiler));

        const html = readFileSync(resolve('./public/index.html'), { encoding: 'utf8' })
            .replace('</body>', `<script type="text/javascript" src="/${webpackConfig.output.filename}"></script></body>`);

        app.use(serveStatic('./public', { index: false }));
        app.use((req, res, next) => require('../routes').default(req, res, next));
        app.use(i18nMiddleware);
        app.use((req, res, next) => require('../middlewares/serverRenderer').default(html)(req, res, next));

        require('./devWatcher').default(webpackCompiler);
    } else {
        const html = readFileSync(resolve('./build/index.html'), { encoding: 'utf8' });

        app.use(serveStatic('./build', { index: false, maxAge: '1d' }));
        app.use(routes);
        app.use(i18nMiddleware);
        app.use(serverRenderer(html));
    }
}
