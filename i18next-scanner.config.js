/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const babel = require('@babel/core');
const snakeCase = require('lodash/snakeCase');

const options = JSON.parse(fs.readFileSync('.babelrc', 'utf8'));

module.exports = {
    options: {
        debug: true,
        sort: true,
        attr: false,
        trans: false,
        func: {
            list: ['t', 'i18n.t'],
            extensions: ['.js', '.jsx'],
        },
        lng: 'en',
        lngs: ['en', 'en'],
        ns: ['translation'],
        defaultNs: 'translation',
        defaultValue: (lng, ns, key) => '__NOT_TRANSLATED__',
        removeUnusedKeys: true,
        resource: {
            loadPath: 'i18n/locales/{{lng}}/{{ns}}.json',
            savePath: 'i18n/locales/{{lng}}/{{ns}}.json',
        },
        nsSeparator: ':',
        keySeparator: '.',
        interpolation: {
            prefix: '{{',
            suffix: '}}',
        },
    },
    transform: function customTransform(file, enc, done) {
        const parser = this.parser;
        const content = fs.readFileSync(file.path, enc);

        const code = babel.transform(content, options).code;
        parser.parseFuncFromString(code, (key) => {
            if (key.includes(' ')) {
                parser.set(`common.${snakeCase(key)}`, key);
            }
        });
        done();
    },
};
