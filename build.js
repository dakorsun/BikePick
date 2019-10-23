/* eslint-disable */
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('@babel/register')({
    ignore: [ /(node_modules)/ ],
});

const webpack = require('webpack');
const config = require('./config/webpack.config.production').default;
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

function copyPublicFolder() {
    fs.copySync(path.resolve('./public'), path.resolve('./build'), {
        dereference: true,
        filter: file => file !== path.resolve('./public/index.html'),
    });
}

function build() {
    console.log('Creating an optimized production build...');

    fs.emptyDirSync(path.resolve('./build'));
    // Merge with the public folder
    copyPublicFolder();

    const compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) {
            console.error('Failed to compile.', err);
            process.exit(1);
        }
        const jsonStats = stats.toJson();

        if (stats.hasErrors()) {
            console.error('Failed to compile.');
            jsonStats.errors.forEach(e => console.error(e));
            process.exit(1);
        }

        if (stats.hasWarnings()) {
            console.log(chalk.yellow('Compiled with warnings.'));
            jsonStats.warnings.forEach(w => console.log(chalk.yellow((w))));
        }
    });
}

build();
