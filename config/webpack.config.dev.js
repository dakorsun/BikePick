import webpack from 'webpack';
import path from 'path';

export default {
    /**
   * Parameter to enable webpack's built-in optimizations that correspond to each environment.
   *
   * See: https://webpack.js.org/concepts/#mode
   */
    mode: 'development',

    /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
    devtool: '#eval-source-map',

    /**
   * The entry point for the bundle
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
    entry: ['webpack-hot-middleware/client', '@babel/polyfill', './client/index.js'],

    /**
   * Options affecting the output of the compilation.
   *
   * See: http://webpack.github.io/docs/configuration.html#output
   */
    output: {
    /**
     * The output directory as absolute path (required).
     *
     * See: http://webpack.github.io/docs/configuration.html#output-path
     */
        path: __dirname,

        /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
        filename: 'bundle.js',

        /**
     * The publicPath specifies the public URL address of the output files
     * when referenced in a browser.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-publicpath
     */
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            request: 'browser-request',
        },
    },

    /**
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
    module: {
    /**
     * Rules for modules (configure loaders, parser options, etc.)
     *
     * See: https://webpack.js.org/configuration/module#module-rules
     */
        rules: [
            /**
       * Allows transpiling JavaScript files using Babel and webpack.
       *
       * See: https://github.com/babel/babel-loader
       */
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            env: {
                                development: {
                                    plugins: ['react-hot-loader/babel'],
                                },
                            },
                        },
                    },
                ],
                include: path.resolve(__dirname, '../client'),
            },

            /**
       * Adds CSS to the DOM by injecting a <style> tag
       * Process global styles
       * Note: resolve-url-loader require sourceMap option to be true
       *
       * See: https://github.com/webpack-contrib/style-loader
       */
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, '../client/styles'),
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },

            /**
       * CSS loader support for *.css files
       */
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')()],
                        },
                    },
                ],
            },

            // TODO https://www.npmjs.com/package/svg-sprite-loader (it supports SSR)
            // {
            //     test: /\.svg$/,
            //     use: [
            //         { loader: 'svg-sprite-loader', options: { ... } },
            //         'svg-fill-loader',
            //         'svgo-loader'
            //     ]
            // },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                    // Images larger than 10 KB won’t be inlined
                    limit: 10 * 1024,
                    // Remove quotes around the encoded URL –
                    // they’re rarely useful
                    noquotes: true,
                },
            },
            /**
       * File loader for webpack
       *
       * See: https://github.com/webpack-contrib/file-loader
       */
            {
                test: /\.(png|jpe?g|gif|woff|woff2|ttf|otf|eot|ico)$/,
                loader: 'file-loader',
                options: {
                    name: 'public/[name].[ext]',
                },
            },
        ],
    },

    /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
    plugins: [
    /**
     * Plugin: HotModuleReplacementPlugin
     * Description: Enables Hot Module Replacement, otherwise known as HMR.
     *
     * See: https://webpack.js.org/plugins/hot-module-replacement-plugin/
     */
        new webpack.HotModuleReplacementPlugin(),

        /**
     * Plugin: DefinePlugin
     * Description: The DefinePlugin allows you to create global constants which can be configured at compile time.
     * This can be useful for allowing different behavior between development builds and release builds.
     *
     * Environment helpers
     *
     * See: https://webpack.js.org/plugins/define-plugin/
     */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ],
};
