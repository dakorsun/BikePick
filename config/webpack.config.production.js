import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
export default {
    mode: 'production',
    /**
   * The entry point for the bundle
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
    entry: {
        app: ['@babel/polyfill', './client/index.js'],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve('../client'), 'node_modules'],
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },

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
        path: path.resolve(__dirname, '../build'),

        /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
        filename: '[name].[hash].js',

        /**
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
     */
        sourceMapFilename: '[name].[hash].bundle.map',

        /**
     * The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
     */
        chunkFilename: '[id].[hash].chunk.js',

        /**
     * The publicPath specifies the public URL address of the output files
     * when referenced in a browser.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-publicpath
     */
        publicPath: '/',
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
                loader: 'babel-loader',
                exclude: [/node_modules/],
            },
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

            /**
       * Adds CSS to the DOM by injecting a <style> tag
       * Process global styles
       * Note: resolve-url-loader require sourceMap option to be true
       *
       * See: https://github.com/webpack-contrib/style-loader
       */
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, '../client/styles')],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                        },
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
                include: [path.resolve(__dirname, '../client/styles'), /node_modules/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
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
        ],
    },

    /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),

        /**
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),

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
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
};
