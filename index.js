/**
 * Run express server
 */
require('@babel/register')({
    ignore: [ /(node_modules)/ ],
});

require('./server').default;
