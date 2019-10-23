const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',

    name: 'server',

    /**
     * Specify target environment
     *
     * See: https://webpack.js.org/concepts/targets/
     */
    target: 'node',

    /**
     *  Exclude node_modules from the bundle
     */
    externals: [nodeExternals()],

    /**
     * The entry point for the bundle
     *
     * See: https://webpack.js.org/concepts/entry-points/
     */
    entry: {
        server: './server/index.js',
    },

    /**
     * Options affecting the output of the compilation.
     *
     * See: https://webpack.js.org/configuration/output/
     */
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../build'),
    },

    /**
     * Options affecting the output of the compilation.
     *
     * See: https://webpack.js.org/configuration/resolve/
     */
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve('../client'), 'node_modules'],
    },

    /**
     * Options affecting the normal modules.
     *
     * See: https://webpack.js.org/configuration/module/
     */
    module: {

        /**
         * Rules for modules (configure loaders, parser options, etc.)
         *
         * See: https://webpack.js.org/configuration/module/#module-rules
         */
        rules: [

            /**
             * Allows transpiling JavaScript files using Babel and webpack.
             *
             * See: https://github.com/babel/babel-loader
             */
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [/node_modules\/(?!redis-smq)/],
            },
        ],
    },

    node: {
        console: false,
        global: false,
        process: false,
        __filename: false,
        __dirname: false,
        Buffer: false,
        setImmediate: false,
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
    ],
};
